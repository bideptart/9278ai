"use client"

import type { CSSProperties, LucideIcon } from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { Activity, AudioLines, CircleCheck, Network, PhoneCall, Wrench } from "lucide-react"
import { cn } from "@/lib/utils"

const ADVANCE_MS = 3200
/** How long a card takes to travel from one rung of the deck to the next. */
const TRANSITION_MS = 620

/** Symmetric ease-in-out: the slide starts gently, accelerates, then settles. */
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

type Slide = {
  eyebrow: string
  icon: LucideIcon
  title: string
  description: string
  stat: string
  statLabel: string
  accent: string
}

const SLIDES: Slide[] = [
  {
    eyebrow: "Real-time voice",
    icon: AudioLines,
    title: "Answers Before They Blink",
    description:
      "WebRTC audio on a distributed media network. Callers hear a reply, not a pause.",
    stat: "<300ms",
    statLabel: "median response",
    accent: "var(--ai-cyan)",
  },
  {
    eyebrow: "Telephony",
    icon: PhoneCall,
    title: "Your Numbers, Your Carrier",
    description:
      "Inbound and outbound PSTN over SIP. Keep the carrier you already pay for.",
    stat: "60+",
    statLabel: "countries routed",
    accent: "var(--ai-violet)",
  },
  {
    eyebrow: "Integrations",
    icon: Wrench,
    title: "Acts, Not Just Talks",
    description:
      "Looks up the CRM, books the calendar, takes the payment — mid-call, on its own.",
    stat: "94%",
    statLabel: "resolved without a human",
    accent: "var(--ai-magenta)",
  },
  {
    eyebrow: "Observability",
    icon: Activity,
    title: "Every Call, On The Record",
    description:
      "Live transcripts with speaker labels, sentiment and intent — searchable from day one.",
    stat: "100%",
    statLabel: "of calls transcribed",
    accent: "var(--ai-mint)",
  },
  {
    eyebrow: "Scale",
    icon: Network,
    title: "No Queue, No Hold Music",
    description:
      "One call or ten thousand in parallel. Burst capacity is built in, not provisioned.",
    stat: "Unlimited",
    statLabel: "concurrent calls",
    accent: "var(--ai-cyan)",
  },
]

/** Depth ladder: how each card sits relative to the one in focus. The third
 *  rung is held fully transparent — it's the "off-deck" slot a card passes
 *  through as the loop wraps it from one edge to the other, so keeping it
 *  invisible both hides the wrap and stops far cards drifting into the copy. */
const DEPTH = [
  { x: 0, scale: 1, rotateY: 0, opacity: 1, z: 30 },
  { x: 44, scale: 0.85, rotateY: 18, opacity: 0.5, z: 20 },
  { x: 80, scale: 0.72, rotateY: 24, opacity: 0, z: 10 },
] as const

/** Small always-moving bar row inside each card — reuses the .wave-bar utility. */
function MiniWave({ accent }: { accent: string }) {
  return (
    <div aria-hidden className="flex h-6 items-center gap-[3px]">
      {Array.from({ length: 14 }).map((_, i) => {
        const ripple = 0.5 + 0.5 * Math.sin(i * 1.1 + Math.cos(i * 0.4) * 1.5)
        const max = 0.3 + 0.7 * ripple
        return (
          <span
            key={i}
            className="wave-bar block h-full w-[2.5px] rounded-full"
            style={
              {
                background: accent,
                "--wave-min": Math.round(max * 0.28 * 100) / 100,
                "--wave-max": Math.round(max * 100) / 100,
                "--wave-duration": `${1.3 + (i % 4) * 0.15}s`,
                "--wave-delay": `${-((i * 0.07) % 1.4)}s`,
              } as CSSProperties
            }
          />
        )
      })}
    </div>
  )
}

/** Where a card sits when `offset` places it on a given rung of the ladder. */
function targetFor(offset: number) {
  const rung = DEPTH[Math.min(Math.abs(offset), DEPTH.length - 1)]
  const dir = Math.sign(offset)
  return {
    x: rung.x * dir,
    scale: rung.scale,
    rotateY: -rung.rotateY * dir,
    opacity: Math.abs(offset) > 2 ? 0 : rung.opacity,
    z: rung.z,
  }
}

/** Signed distance from the focused card, wrapped so the deck loops. */
function offsetFrom(i: number, index: number) {
  let offset = i - index
  if (offset > SLIDES.length / 2) offset -= SLIDES.length
  if (offset < -SLIDES.length / 2) offset += SLIDES.length
  return offset
}

/**
 * HeroCarousel
 * A coverflow deck of capability cards. The card in focus sits flat and fully
 * lit; its neighbours fall back in Z, rotate away from the viewer and dim, so
 * the eye reads a stack receding into the page rather than a flat row.
 *
 * Motion is written to `transform` from a single animation-frame loop rather
 * than expressed as CSS keyframes or transitions. Two reasons: it lets the
 * settle-into-place easing and the idle float share one transform without
 * fighting each other, and it keeps running in browsers that suspend CSS
 * animation (OS "reduce motion", Chrome Energy Saver) where a keyframe deck
 * would sit frozen.
 *
 * One loop drives all five cards, and it parks itself whenever the deck scrolls
 * out of view or the tab is hidden.
 */
export function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const indexRef = useRef(0)
  // Base transform per card (float is layered on at paint time, not stored).
  const posRef = useRef(SLIDES.map((_, i) => ({ ...targetFor(offsetFrom(i, 0)) })))
  // A slide is a timed tween from `from` → `target`; these snapshot its ends.
  const fromRef = useRef(SLIDES.map((_, i) => ({ ...targetFor(offsetFrom(i, 0)) })))
  const targetRef = useRef(SLIDES.map((_, i) => ({ ...targetFor(offsetFrom(i, 0)) })))
  const transStartRef = useRef(0)
  const transDurRef = useRef(0) // 0 → no tween in flight, cards hold at target

  const go = useCallback((next: number) => setIndex((next + SLIDES.length) % SLIDES.length), [])

  // Whenever focus changes, open a fresh tween: capture where each card is now
  // and where it needs to land. A card whose slot wraps to the far edge would
  // otherwise slide the full width of the deck — snap those so they cross the
  // invisible off-deck rung instead of sweeping across the focused card.
  useEffect(() => {
    indexRef.current = index
    for (let i = 0; i < SLIDES.length; i++) {
      const target = targetFor(offsetFrom(i, index))
      const pos = posRef.current[i]
      const wraps = Math.abs(target.x - pos.x) > 150
      if (wraps) {
        const snapped = { ...target, opacity: 0 }
        posRef.current[i] = { ...snapped }
        fromRef.current[i] = snapped
      } else {
        fromRef.current[i] = { ...pos }
      }
      targetRef.current[i] = target
    }
    transStartRef.current = performance.now()
    transDurRef.current = TRANSITION_MS
  }, [index])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), ADVANCE_MS)
    return () => clearInterval(id)
  }, [paused])

  useEffect(() => {
    const deck = cardRefs.current[0]?.parentElement
    let raf = 0
    let running = true
    const started = performance.now()

    const frame = (now: number) => {
      const t = (now - started) / 1000

      // Progress along the current tween. Driven by wall-clock elapsed time, so
      // the slide lasts exactly TRANSITION_MS regardless of the display's
      // refresh rate — no faster on a 120Hz panel, no slower on a throttled tab.
      const raw = transDurRef.current > 0 ? (now - transStartRef.current) / transDurRef.current : 1
      const p = raw < 1 ? raw : 1
      const e = easeInOutCubic(p)

      for (let i = 0; i < SLIDES.length; i++) {
        const el = cardRefs.current[i]
        if (!el) continue

        const from = fromRef.current[i]
        const target = targetRef.current[i]
        const pos = posRef.current[i]

        // Interpolate the base transform along the eased curve. At p = 1 the
        // card lands exactly on target and holds there — it stops cleanly
        // rather than asymptotically creeping like the old damped approach.
        pos.x = from.x + (target.x - from.x) * e
        pos.scale = from.scale + (target.scale - from.scale) * e
        pos.rotateY = from.rotateY + (target.rotateY - from.rotateY) * e
        pos.opacity = from.opacity + (target.opacity - from.opacity) * e

        // Idle float. Each card gets its own phase so the deck breathes rather
        // than bobbing in unison; the focused card drifts a little further
        // since it has the most room and carries the eye.
        const focused = offsetFrom(i, indexRef.current) === 0
        const amp = focused ? 7 : 4
        const floatY = Math.sin(t * 0.62 + i * 1.27) * amp
        const floatX = Math.cos(t * 0.41 + i * 0.83) * (focused ? 3 : 2)
        const tilt = Math.sin(t * 0.37 + i * 1.09) * (focused ? 0.7 : 0.45)

        el.style.transform =
          `translate(calc(-50% + ${(pos.x + floatX * 0.1).toFixed(3)}%), calc(-50% + ${floatY.toFixed(2)}px)) ` +
          `scale(${pos.scale.toFixed(4)}) rotateY(${pos.rotateY.toFixed(2)}deg) rotate(${tilt.toFixed(2)}deg)`
        el.style.opacity = pos.opacity.toFixed(3)
        // Stack by current size so whichever card is visually largest wins the
        // overlap — keeps the incoming card above the outgoing one mid-slide.
        el.style.zIndex = String(Math.round(pos.scale * 100))
      }

      if (p >= 1) transDurRef.current = 0
      if (running) raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)

    // Stop the loop when the deck is off screen — nothing to paint, no reason
    // to burn frames on it.
    const io =
      deck && "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting && !running) {
                running = true
                raf = requestAnimationFrame(frame)
              } else if (!entry.isIntersecting && running) {
                running = false
                cancelAnimationFrame(raf)
              }
            },
            { rootMargin: "120px" },
          )
        : null
    if (deck && io) io.observe(deck)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io?.disconnect()
    }
  }, [])

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative h-[420px] w-full [perspective:1400px] sm:h-[460px]"
        role="group"
        aria-roledescription="carousel"
        aria-label="Platform capabilities"
      >
        {SLIDES.map((slide, i) => {
          const offset = offsetFrom(i, index)
          const Icon = slide.icon
          const focused = offset === 0
          // First-paint placement only. These values are derived from `i` alone,
          // never from `index`, so they are byte-identical on every render and
          // React leaves the style attribute untouched — letting the frame loop
          // own `transform` without the two overwriting each other.
          const initial = targetFor(offsetFrom(i, 0))

          return (
            <article
              key={slide.title}
              ref={(el) => {
                cardRefs.current[i] = el
              }}
              aria-hidden={!focused}
              className="absolute left-1/2 top-1/2 w-[280px] will-change-transform sm:w-[310px]"
              style={{
                transform: `translate(calc(-50% + ${initial.x}%), -50%) scale(${initial.scale}) rotateY(${initial.rotateY}deg)`,
                opacity: initial.opacity,
                zIndex: initial.z,
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className={cn(
                  "flex h-[340px] flex-col rounded-[26px] border bg-card/95 p-6 backdrop-blur-xl transition-shadow duration-500 sm:h-[370px]",
                  focused
                    ? "border-primary/25 shadow-[0_28px_60px_-30px_color-mix(in_oklch,var(--primary)_35%,transparent)]"
                    : "border-border/50 shadow-none",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-border/60 bg-background/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                    {slide.eyebrow}
                  </span>
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: slide.accent }}
                    aria-hidden
                  />
                </div>

                <span
                  className="mt-6 flex h-11 w-11 items-center justify-center rounded-2xl"
                  style={{
                    background: `color-mix(in oklch, ${slide.accent} 14%, transparent)`,
                    color: slide.accent,
                  }}
                  aria-hidden
                >
                  <Icon className="h-5 w-5" />
                </span>

                <h3 className="mt-5 text-balance text-xl font-semibold leading-tight tracking-tight">
                  {slide.title}
                </h3>
                <p className="mt-2 text-pretty text-[13px] leading-relaxed text-muted-foreground">
                  {slide.description}
                </p>

                <div className="mt-auto">
                  <MiniWave accent={slide.accent} />
                  <div className="mt-4 flex items-end justify-between border-t border-border/40 pt-4">
                    <div>
                      <p className="text-2xl font-semibold tracking-tight text-primary">
                        {slide.stat}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{slide.statLabel}</p>
                    </div>
                    <CircleCheck className="h-4 w-4 text-muted-foreground/50" aria-hidden />
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="mt-2 flex items-center justify-center gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show ${slide.title}`}
            aria-current={i === index ? "true" : undefined}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === index ? "w-7 bg-primary" : "w-1.5 bg-border hover:bg-primary/40",
            )}
          />
        ))}
      </div>
    </div>
  )
}
