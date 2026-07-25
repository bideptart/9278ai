"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Phone, Infinity as InfinityIcon, Zap, Check, User, Bot } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { cn } from "@/lib/utils"

function ZeroLagIllustration() {
  const barCount = 56
  const bars = Array.from({ length: barCount }, (_, i) => {
    const mid = barCount / 2
    const dist = Math.abs(i - mid)
    // gentle bell curve with a bit of jitter so peaks don't look mechanical
    const jitter = (i % 3) * 6 - 6
    const base = 14 + Math.max(0, 58 - dist * 2.15) + jitter
    return Math.max(8, Math.min(96, base))
  })

  return (
    <div className="relative flex h-full w-full flex-col justify-center gap-5 overflow-hidden rounded-3xl bg-white px-8 py-8">
      {/* status row */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Analyzing live audio
        </span>
        <span className="font-mono text-[11px] tabular-nums text-muted-foreground">0ms latency</span>
      </div>

      {/* spectrum analyzer — bars stretch edge-to-edge */}
      <div className="flex h-36 w-full items-center gap-[3px]">
        {bars.map((h, i) => (
          <span
            key={i}
            className="voice-bar min-w-0 flex-1 shrink-0 rounded-full"
            style={{
              height: `${h}%`,
              animationDelay: `${(i * 70) % 1100}ms`,
              backgroundImage: "linear-gradient(180deg, var(--primary), color-mix(in oklch, var(--primary) 40%, transparent))",
            }}
          />
        ))}
      </div>

      {/* flowing waveform trace */}
      <svg viewBox="0 0 320 40" className="h-9 w-full" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M0 20 C 20 4, 40 36, 60 20 S 100 4, 120 20 S 160 36, 180 20 S 220 4, 240 20 S 280 36, 300 20 S 320 12, 320 20"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.75"
        />
      </svg>

      <div className="scan-line" />
    </div>
  )
}

function SmartInterruptIllustration() {
  const [phase, setPhase] = useState<"listening" | "understanding" | "responding">("listening")
  const callerBars = [30, 55, 40, 70, 45, 60, 35]

  useEffect(() => {
    setPhase("listening")
    const t1 = setTimeout(() => setPhase("understanding"), 900)
    const t2 = setTimeout(() => setPhase("responding"), 1400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const cutAt = 128
  const states: Array<{ key: typeof phase; label: string }> = [
    { key: "listening", label: "Listening" },
    { key: "understanding", label: "Understanding" },
    { key: "responding", label: "Responding" },
  ]

  return (
    <div className="relative flex h-full w-full flex-col justify-center gap-4 overflow-hidden rounded-[20px] bg-white px-6 py-6">
      {/* soft red gradient wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,color-mix(in_oklch,var(--primary)_7%,transparent),transparent_65%)]" />

      {/* status row */}
      <div className="relative flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Barge-in detected
        </span>
        <span className="font-mono text-[11px] tabular-nums text-muted-foreground">no dead air</span>
      </div>

      {/* left: human · center: collision moment · right: AI agent states */}
      <div className="relative flex flex-1 flex-col items-center justify-center gap-6">
        {/* center — waveform collision + glass barge-in card, scales to fill the square */}
        <div className="relative h-full w-full flex-1">
          <svg viewBox="0 0 320 140" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
            <path
              d={`M0 70 C 16 44, 32 96, 48 70 S 80 44, 96 70 S 112 90, ${cutAt} 70`}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className={cn("text-foreground/25 transition-opacity duration-500", phase !== "listening" && "opacity-40")}
            />
            <path
              d={`M0 70 L ${cutAt} 70`}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="3"
              strokeLinecap="round"
              opacity={phase === "responding" ? 0 : 0.3}
              className="transition-opacity duration-300"
            />
            <path
              d={`M${cutAt} 70 C ${cutAt + 16} 20, ${cutAt + 32} 120, ${cutAt + 48} 70 S ${cutAt + 80} 20, ${cutAt + 96} 70 S ${cutAt + 128} 112, ${cutAt + 160} 70`}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="3.5"
              strokeLinecap="round"
              className={cn("transition-opacity duration-300", phase === "responding" ? "opacity-95" : "opacity-0")}
            />
            <line x1={cutAt} y1="10" x2={cutAt} y2="130" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.45" />
          </svg>

          {/* collision glow burst */}
          <span
            className="pointer-events-none absolute top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-xl"
            style={{ left: `${(cutAt / 320) * 100}%` }}
          />
          <span
            className="pointer-events-none absolute top-2 flex h-3 w-3 -translate-x-1/2 items-center justify-center"
            style={{ left: `${(cutAt / 320) * 100}%` }}
          >
            <span className="pulse-ring absolute inline-flex h-2.5 w-2.5 rounded-full text-primary" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>

          {/* glassmorphism barge-in card */}
          <span
            className="absolute bottom-2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/60 bg-white/70 px-3 py-1.5 text-[11px] font-medium text-primary shadow-sm backdrop-blur-md"
            style={{ left: `${(cutAt / 320) * 100}%` }}
          >
            <Zap className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
            Barge-in
          </span>
        </div>

        {/* bottom row: human on the left, AI agent states on the right */}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F5F5F5] ring-1 ring-black/[0.06]">
              <User className="h-5 w-5 text-[#374151]" strokeWidth={2.25} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-medium text-foreground/80">You</p>
              <div className="mt-1 flex h-4 items-end gap-[2px]">
                {callerBars.map((h, i) => (
                  <span
                    key={i}
                    className={cn(
                      "w-[2px] rounded-full bg-foreground/30 transition-opacity duration-300",
                      phase === "listening" && "voice-bar",
                    )}
                    style={{ height: `${h}%`, animationDelay: `${(i * 90) % 700}ms`, opacity: phase === "listening" ? 1 : 0.3 }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex flex-col items-end gap-1">
              {states.map((s) => (
                <span
                  key={s.key}
                  className={cn(
                    "inline-flex items-center gap-1.5 text-[11px] font-medium transition-colors duration-300",
                    phase === s.key ? "text-primary" : "text-muted-foreground/50",
                  )}
                >
                  {s.label}
                  <span className={cn("h-1.5 w-1.5 rounded-full bg-current", phase === s.key && "animate-pulse")} />
                </span>
              ))}
            </div>
            <span
              className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-2 ring-white"
              style={{
                backgroundImage: "radial-gradient(circle at 35% 30%, color-mix(in oklch, var(--primary) 55%, white), var(--primary))",
                boxShadow: "0 4px 14px color-mix(in oklch, var(--primary) 40%, transparent)",
              }}
            >
              <Bot className="h-5 w-5 text-white" strokeWidth={2.25} aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>

      <p className="relative font-mono text-[11px] text-muted-foreground">Interrupts mid-sentence · Responds in &lt;300ms · No dead air</p>
    </div>
  )
}

function UnlimitedCapacityIllustration() {
  const ai = { x: 50, y: 50 }

  const polar = (r: number, i: number, count: number, startDeg: number) => {
    const angle = startDeg + (i / count) * 360
    const rad = (angle * Math.PI) / 180
    return { x: ai.x + r * Math.cos(rad), y: ai.y + r * Math.sin(rad) }
  }

  // Center → 1 AI core · ring 1 → 4 customers · ring 2 → 8 customers · ring 3 → 20+ fading toward the edges
  const ring1 = Array.from({ length: 4 }, (_, i) => polar(17, i, 4, -90))
  const ring2 = Array.from({ length: 8 }, (_, i) => polar(30, i, 8, -68))
  const ring3 = Array.from({ length: 20 }, (_, i) => polar(43, i, 20, -80))

  const curvedPath = (x: number, y: number, bend: number) => {
    const mx = (ai.x + x) / 2
    const my = (ai.y + y) / 2
    const dx = x - ai.x
    const dy = y - ai.y
    const len = Math.hypot(dx, dy) || 1
    const px = -dy / len
    const py = dx / len
    const ctrlX = mx + px * len * bend
    const ctrlY = my + py * len * bend
    return `M ${ai.x} ${ai.y} Q ${ctrlX.toFixed(2)} ${ctrlY.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)}`
  }

  const badgeClass =
    "absolute inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-white px-2.5 py-1.5 text-[10px] font-medium text-foreground/80 shadow-sm ring-1 ring-black/[0.06]"

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-white">
      {/* background: subtle dotted grid + soft glow behind the AI core + red ambient glow near the bottom */}
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_75%)]" />
      <div
        className="pointer-events-none absolute h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.14] blur-3xl"
        style={{ left: `${ai.x}%`, top: `${ai.y}%` }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-primary/[0.06] to-transparent" />

      {/* network — one AI core, curved lines out to customer avatars, scaling toward the edges */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {[...ring1, ...ring2].map((n, i) => (
          <path
            key={i}
            d={curvedPath(n.x, n.y, i % 2 === 0 ? 0.14 : -0.14)}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="0.5"
            strokeOpacity="0.3"
            strokeLinecap="round"
          />
        ))}
      </svg>

      {/* third ring — 20+ customers fading toward the edges, unlimited scale */}
      {ring3.map((n, i) => (
        <span
          key={i}
          className="dot-float absolute rounded-full bg-primary"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            width: 3.5,
            height: 3.5,
            opacity: 0.18 + (i % 3) * 0.09,
            animationDelay: `${(i * 110) % 1400}ms`,
            transform: "translate(-50%,-50%)",
          }}
        />
      ))}

      {/* second ring — 8 customers */}
      {ring2.map((n, i) => (
        <span
          key={i}
          className="absolute flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#F5F5F5] shadow-sm ring-1 ring-black/[0.06]"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <Phone className="h-2.5 w-2.5 text-[#374151]" strokeWidth={2.5} aria-hidden="true" />
          <span className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-emerald-500 ring-1 ring-white" />
        </span>
      ))}

      {/* first ring — 4 nearest customers */}
      {ring1.map((n, i) => (
        <span
          key={i}
          className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/[0.08]"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <Phone className="h-3 w-3 text-[#374151]" strokeWidth={2.5} aria-hidden="true" />
          <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
        </span>
      ))}

      {/* central AI voice core */}
      <span
        className="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ring-2 ring-white"
        style={{
          left: `${ai.x}%`,
          top: `${ai.y}%`,
          backgroundImage: "radial-gradient(circle at 35% 30%, color-mix(in oklch, var(--primary) 55%, white), var(--primary))",
          boxShadow:
            "0 0 0 6px color-mix(in oklch, var(--primary) 10%, transparent), 0 4px 18px color-mix(in oklch, var(--primary) 45%, transparent)",
        }}
      >
        <span className="pulse-ring absolute inline-flex h-full w-full rounded-full text-primary" />
        <Phone className="relative h-4 w-4 text-white" strokeWidth={2.5} aria-hidden="true" />
      </span>

      {/* floating UI badges */}
      <span className={cn(badgeClass, "left-3 top-3 text-primary")}>
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        Unlimited Capacity
      </span>
      <span className={cn(badgeClass, "right-3 top-3 font-mono tabular-nums")}>
        <Phone className="h-3 w-3 text-primary" strokeWidth={2.5} aria-hidden="true" />
        1,284 Active Calls
      </span>
      <span className={cn(badgeClass, "bottom-3 left-1/2 -translate-x-1/2")}>
        <InfinityIcon className="h-3 w-3 text-primary" strokeWidth={2.5} aria-hidden="true" />
        Scaling Automatically
      </span>
      <span className={cn(badgeClass, "bottom-3 left-3")}>
        <Zap className="h-3 w-3 text-primary" strokeWidth={2.5} aria-hidden="true" />
        0 sec Queue
      </span>
      <span className={cn(badgeClass, "bottom-3 right-3")}>
        <Check className="h-3 w-3 text-primary" strokeWidth={2.5} aria-hidden="true" />
        No Busy Signals
      </span>
    </div>
  )
}

const items = [
  {
    Illustration: ZeroLagIllustration,
    image: "/illustrations/zero-lag-conversations.png",
    title: "Zero-lag conversations",
    description:
      "Native audio-to-audio modeling delivers natural warmth and real-time fluidity. No robotic dead air, no awkward pauses while a transcription pipeline catches up. Every response streams back in under 300ms, so the rhythm of the call feels exactly like talking to a person who's actually listening — not waiting on a model to catch up.",
    fullBleed: true,
  },
  {
    Illustration: SmartInterruptIllustration,
    image: "/illustrations/smart-interruptions.png",
    title: "Smart interruptions",
    description:
      "Customers can talk over the agent at any moment. It stops, listens, and responds the way a real human would — not the way a chatbot pretends to. Barge-in detection kicks in instantly, so corrections, clarifications, and \"wait, actually\" moments never get talked over or ignored mid-sentence.",
    fullBleed: true,
  },
  {
    Illustration: UnlimitedCapacityIllustration,
    image: "/illustrations/unlimited-capacity.png",
    title: "Unlimited capacity",
    description:
      "Scale from one call to thousands simultaneously. No busy signals, no queue time, no per-seat math. Every caller gets the same agent, the same knowledge, and the same instant pickup — whether it's one call at 2am or a thousand during a product launch spike.",
    fullBleed: true,
  },
]

export function HumanExperience() {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduced || paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 2000)
    return () => clearInterval(id)
  }, [reduced, paused])

  const active = items[index]
  const Illustration = active.Illustration
  const next = () => setIndex((i) => (i + 1) % items.length)
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length)

  return (
    <section id="experience" className="relative overflow-hidden bg-muted/40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.03] blur-[110px] [will-change:transform]"
        animate={reduced ? undefined : { scale: [1, 1.18, 1] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-8 md:px-6 md:pb-14 md:pt-10">
        <ScrollReveal className="mx-auto max-w-4xl text-center">
          <span className="ai-pill-cyan">
            <span className="h-1 w-1 rounded-full bg-primary" />
            The human-kind experience
          </span>
          <h2 className="mt-3 text-balance font-serif font-normal leading-[1.15] tracking-tight text-[7.5vw] sm:whitespace-nowrap sm:text-4xl sm:leading-[1.1] md:text-5xl">
            Conversations indistinguishable from{" "}
            <span className="text-primary">your best agent.</span>
          </h2>
          <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            9278.ai skips the brittle speech-to-text and text-to-speech relay and runs on a single audio-native engine — so
            your callers hear pauses, emotion, and timing that feel right.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-8">
          <div className="grid items-start gap-4 lg:grid-cols-12 lg:gap-6">
            {/* LEFT: visual panel, swaps with the active item — below the text on mobile, back to the left column at lg+ */}
            <div className="order-2 lg:order-1 lg:col-span-6">
              <div
                className="experience-visual relative aspect-square w-full max-w-[300px] overflow-hidden rounded-3xl bg-white mx-auto lg:ml-auto lg:max-w-[320px] xl:max-w-[360px]"
                style={{ border: "1px solid rgba(0,0,0,0.65)", boxShadow: "0 10px 30px -12px rgba(0,0,0,0.12)" }}
              >
                {!active.image && (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.577_0.245_27.33/0.08),transparent_60%)]" />
                )}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex items-center justify-center bg-white"
                  >
                    {active.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={active.image}
                        alt={active.title}
                        className="h-full w-full object-contain p-3"
                      />
                    ) : active.fullBleed ? (
                      <div className="h-full w-full">
                        <Illustration />
                      </div>
                    ) : (
                      <span className="flex h-44 w-44 items-center justify-center rounded-3xl bg-primary/5 ring-1 ring-primary/15">
                        <Illustration />
                      </span>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT: content, arrows + dots to navigate manually — above the visual on mobile, back to the right column at lg+ */}
            <div
              className="order-1 lg:order-2 lg:col-span-6"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <span className="ai-pill-cyan">
                <span className="h-1 w-1 rounded-full bg-primary" />
                0{index + 1} / 0{items.length}
              </span>

              <div className="relative min-h-[290px] sm:min-h-[230px] md:min-h-[210px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-0 top-0"
                  >
                    <h3 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">{active.title}</h3>
                    <p className="mt-3 text-pretty leading-relaxed text-muted-foreground md:text-lg">
                      {active.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Desktop/tablet: separate round arrow buttons + dots */}
              <div className="mt-8 hidden items-center gap-3 sm:flex">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/40 text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/40 text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

                <div className="ml-2 flex items-center gap-1.5">
                  {items.map((item, i) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Go to ${item.title}`}
                      className={cn(
                        "h-1.5 shrink-0 rounded-full transition-colors",
                        i === index ? "w-6 bg-primary" : "w-1.5 bg-border",
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile: single pill — prev arrow, dots, next arrow, below the visual */}
            <div className="order-3 mt-2 flex items-center justify-center gap-4 rounded-full bg-card/40 px-4 py-2 sm:hidden">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous"
                className="flex h-6 w-6 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-primary"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-1.5">
                {items.map((item, i) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to ${item.title}`}
                    className={cn(
                      "h-1.5 shrink-0 rounded-full transition-colors",
                      i === index ? "w-6 bg-primary" : "w-1.5 bg-border",
                    )}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={next}
                aria-label="Next"
                className="flex h-6 w-6 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-primary"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
