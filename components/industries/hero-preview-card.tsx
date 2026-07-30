"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { INDUSTRIES } from "@/lib/industries"

/** How long a given industry holds the hub before the next one takes over. */
const CYCLE_MS = 2600
/** Orbit radius and node sizes, as a fraction of the square stage. */
const RING = 0.37
const SAT = 0.155
const HUB = 0.25
/** One full revolution of the ring. */
const REV_MS = 52000
/** Seconds for a call pulse to travel a spoke, inbound to the hub. */
const PULSE_S = 2.4

const N = INDUSTRIES.length
/** Every node renders at satellite size; the hub is scaled up from it, so the
 *  promotion to centre can be interpolated instead of snapping. */
const HUB_SCALE = HUB / SAT

/**
 * HeroPreviewCard
 *
 * A routing diagram rather than a decorative cluster: the selected industry sits
 * at the hub as the live agent, the other nine orbit it, and a pulse travels
 * inbound along each spoke — one call being handed to the agent. Selection
 * auto-advances; the promoted industry glides to the centre while the outgoing
 * one settles back into the ring and the rest shuffle round by one slot.
 *
 * Layout is written to `transform` from a single animation-frame loop rather
 * than expressed as CSS keyframes. Ten nodes, ten spokes and ten pulses all
 * derive from one clock that way, and it keeps running in browsers that suspend
 * CSS animation.
 */
export function HeroPreviewCard() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)

  const stageRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const lineRefs = useRef<(SVGLineElement | null)[]>([])
  const dotRefs = useRef<(SVGCircleElement | null)[]>([])
  const haloRef = useRef<SVGCircleElement | null>(null)

  // Read by the frame loop without re-subscribing it.
  const indexRef = useRef(0)
  const hoverRef = useRef<number | null>(null)
  // Eased offset from centre, in px, plus current scale.
  const posRef = useRef(INDUSTRIES.map(() => ({ x: 0, y: 0, s: 1 })))

  useEffect(() => {
    indexRef.current = index
  }, [index])
  useEffect(() => {
    hoverRef.current = hovered
  }, [hovered])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % N), CYCLE_MS)
    return () => clearInterval(id)
  }, [paused])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    let size = stage.clientWidth
    const ro = new ResizeObserver(() => {
      size = stage.clientWidth
    })
    ro.observe(stage)

    let raf = 0
    let running = true
    const started = performance.now()

    const frame = (now: number) => {
      const t = (now - started) / 1000
      const half = size / 2
      const radius = size * RING
      const spin = (t * 2 * Math.PI) / (REV_MS / 1000)
      const active = indexRef.current
      const hover = hoverRef.current

      for (let i = 0; i < N; i++) {
        const pos = posRef.current[i]
        const isHub = i === active

        // Slot 0..N-2 around the ring, ordered from the active node so the
        // arrangement stays stable as selection moves.
        const slot = (i - active + N) % N
        const angle = spin + ((slot - 1) / (N - 1)) * Math.PI * 2

        // A gentle bob per node keeps the ring from reading as a rigid gear.
        const bob = Math.sin(t * 0.7 + i * 1.31) * size * 0.012
        const targetX = isHub ? 0 : Math.cos(angle) * radius
        const targetY = isHub ? 0 : Math.sin(angle) * radius + bob
        const targetS = isHub ? HUB_SCALE : hover === i ? 1.14 : 1

        const k = 0.085
        pos.x += (targetX - pos.x) * k
        pos.y += (targetY - pos.y) * k
        pos.s += (targetS - pos.s) * k

        const node = nodeRefs.current[i]
        if (node) {
          node.style.transform = `translate(-50%, -50%) translate(${pos.x.toFixed(2)}px, ${pos.y.toFixed(2)}px) scale(${pos.s.toFixed(4)})`
          node.style.zIndex = isHub ? "30" : hover === i ? "25" : "20"
        }

        // Spoke from hub to this node, and the pulse running inbound along it.
        const line = lineRefs.current[i]
        const dot = dotRefs.current[i]
        const ax = half + pos.x
        const ay = half + pos.y
        if (line) {
          line.setAttribute("x1", String(half))
          line.setAttribute("y1", String(half))
          line.setAttribute("x2", ax.toFixed(2))
          line.setAttribute("y2", ay.toFixed(2))
          line.setAttribute("opacity", isHub ? "0" : hover === i ? "0.5" : "0.16")
        }
        if (dot) {
          // 1 → 0 so the pulse travels from the industry into the agent.
          const phase = 1 - (((t / PULSE_S + i * 0.41) % 1) + 1) % 1
          const px = ax + (half - ax) * (1 - phase)
          const py = ay + (half - ay) * (1 - phase)
          dot.setAttribute("cx", px.toFixed(2))
          dot.setAttribute("cy", py.toFixed(2))
          dot.setAttribute("opacity", isHub ? "0" : (Math.sin(Math.PI * phase) * 0.9).toFixed(3))
        }
      }

      // Hub halo breathing under the active bubble.
      if (haloRef.current) {
        const r = size * HUB * 0.5 * (1.08 + Math.sin(t * 1.6) * 0.07)
        haloRef.current.setAttribute("cx", String(half))
        haloRef.current.setAttribute("cy", String(half))
        haloRef.current.setAttribute("r", r.toFixed(2))
        haloRef.current.setAttribute("opacity", (0.16 + Math.sin(t * 1.6) * 0.06).toFixed(3))
      }

      if (running) raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)

    const io = new IntersectionObserver(
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
    io.observe(stage)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
    }
  }, [])

  function selectIndustry(i: number) {
    setIndex(i)
    setPaused(true)
  }

  return (
    <div className="relative mx-auto w-[340px] max-w-full lg:w-[420px] xl:w-[450px]">
      {/* Warm bloom behind the cluster */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-4 -z-10 aspect-square w-full -translate-x-1/2 rounded-full bg-primary/15 blur-[90px]"
      />

      <div ref={stageRef} className="relative mx-auto aspect-square w-full">
        {/* Spokes and call pulses */}
        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full">
          {/* Breathes under the hub — neutral, so the hub reads as a quiet
              focal ring rather than a red glow. */}
          <circle ref={haloRef} fill="none" stroke="oklch(0.2 0 0)" strokeWidth="1.5" />
          <g stroke="var(--primary)" strokeWidth="1.25" strokeLinecap="round">
            {INDUSTRIES.map((it, i) => (
              <line
                key={it.slug}
                ref={(el) => {
                  lineRefs.current[i] = el
                }}
                strokeDasharray="3 5"
              />
            ))}
          </g>
          <g fill="var(--primary)">
            {INDUSTRIES.map((it, i) => (
              <circle
                key={it.slug}
                ref={(el) => {
                  dotRefs.current[i] = el
                }}
                r="2.5"
              />
            ))}
          </g>
        </svg>

        {INDUSTRIES.map((it, i) => {
          const BubbleIcon = it.icon
          const active = i === index
          const showLabel = active || hovered === i

          return (
            <div
              key={it.slug}
              ref={(el) => {
                nodeRefs.current[i] = el
              }}
              className="absolute left-1/2 top-1/2 will-change-transform"
              style={{
                width: `${SAT * 100}%`,
                height: `${SAT * 100}%`,
                // First paint only, and constant across renders so React never
                // overwrites what the frame loop writes. Nodes start stacked at
                // the centre and the loop fans them out to the ring.
                transform: "translate(-50%, -50%) scale(1)",
              }}
            >
              <button
                type="button"
                onClick={() => selectIndustry(i)}
                onPointerEnter={() => setHovered(i)}
                onPointerLeave={() => setHovered((h) => (h === i ? null : h))}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered((h) => (h === i ? null : h))}
                aria-label={`Show the ${it.name} playbook`}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "group relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-full bubble-glass transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  active ? "text-white" : "text-neutral-700 hover:text-neutral-900",
                )}
              >
                {/* Soft coral fill — the base bubble stays .bubble-glass (white)
                    at all times; this overlay crossfades in only while the
                    bubble is the active hub, so the colour change is a smooth
                    opacity transition rather than an instant class swap. */}
                <span
                  aria-hidden
                  className="bubble-coral-fill pointer-events-none absolute inset-0 rounded-full transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ opacity: active ? 1 : 0 }}
                />
                {/* Specular catch-light */}
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute left-[18%] top-[13%] h-[24%] w-[32%] -rotate-[22deg] rounded-full blur-[3px] transition-colors duration-700",
                    active ? "bg-white/60" : "bg-white/90",
                  )}
                />
                {/* Lower rim bounce-light */}
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute bottom-[10%] left-1/2 h-[10%] w-[42%] -translate-x-1/2 rounded-full blur-[4px] transition-colors duration-700",
                    active ? "bg-white/25" : "bg-black/8",
                  )}
                />
                <BubbleIcon className="relative h-[38%] w-[38%]" strokeWidth={1.6} aria-hidden />
              </button>

              {/* Name plate — counter-scaled so it stays legible when the node
                  swells at the hub. The active hub's plate is a distinct,
                  more prominent style (larger, medium weight, solid white
                  pill) so the selected industry reads clearly; a hovered but
                  inactive node keeps the original quiet treatment. */}
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute left-1/2 top-[104%] z-30 -translate-x-1/2 whitespace-nowrap rounded-full backdrop-blur-sm transition-opacity duration-300",
                  showLabel ? "opacity-100" : "opacity-0",
                  active
                    ? "border border-neutral-200 bg-white px-3.5 py-1.5 font-sans text-sm font-semibold tracking-wide text-neutral-900 shadow-[0_6px_16px_-6px_rgb(0_0_0_/_0.18)]"
                    : "border border-border/60 bg-background/90 px-2.5 py-0.5 font-serif text-[11px] tracking-wide text-foreground/80 shadow-sm",
                )}
                style={active ? { transform: `translateX(-50%) scale(${1 / HUB_SCALE})` } : undefined}
              >
                {it.name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
