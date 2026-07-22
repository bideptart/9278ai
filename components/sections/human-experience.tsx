"use client"

import { useEffect, useState } from "react"
import { Waves, Hand, Infinity as InfinityIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { cn } from "@/lib/utils"

const items = [
  {
    icon: Waves,
    title: "Zero-lag conversations",
    description:
      "Native audio-to-audio modeling delivers natural warmth and real-time fluidity. No robotic dead air, no awkward pauses while a transcription pipeline catches up.",
  },
  {
    icon: Hand,
    title: "Smart interruptions",
    description:
      "Customers can talk over the agent at any moment. It stops, listens, and responds the way a real human would — not the way a chatbot pretends to.",
  },
  {
    icon: InfinityIcon,
    title: "Unlimited capacity",
    description:
      "Scale from one call to thousands simultaneously. No busy signals, no queue time, no per-seat math.",
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
  const Icon = active.icon
  const next = () => setIndex((i) => (i + 1) % items.length)
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length)

  return (
    <section id="experience" className="relative overflow-hidden">
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

      <div className="relative mx-auto w-full max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <ScrollReveal className="mx-auto max-w-4xl text-center">
          <span className="ai-pill-cyan">
            <span className="h-1 w-1 rounded-full bg-primary" />
            The human-kind experience
          </span>
          <h2 className="mt-6 whitespace-nowrap font-serif font-normal leading-[1.1] tracking-tight text-[6.6vw] sm:text-4xl md:text-5xl">
            Conversations indistinguishable from{" "}
            <span className="text-primary">your best agent.</span>
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            9278.ai skips the brittle speech-to-text and text-to-speech relay and runs on a single audio-native engine — so
            your callers hear pauses, emotion, and timing that feel right.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-16">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            {/* LEFT: visual panel, swaps with the active item */}
            <div className="lg:col-span-6">
              <div className="experience-visual card-glow relative h-[260px] overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.577_0.245_27.33/0.08),transparent_60%)]" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span className="flex h-28 w-28 items-center justify-center rounded-3xl bg-primary/10 text-primary ring-1 ring-primary/20">
                      <Icon className="h-14 w-14" aria-hidden="true" />
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT: content, arrows + dots to navigate manually */}
            <div
              className="lg:col-span-6"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <span className="ai-pill-cyan">
                <span className="h-1 w-1 rounded-full bg-primary" />
                0{index + 1} / 0{items.length}
              </span>

              <div className="relative min-h-[145px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-0 top-0"
                  >
                    <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">{active.title}</h3>
                    <p className="mt-3 text-pretty leading-relaxed text-muted-foreground md:text-lg">
                      {active.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-8 flex items-center gap-3">
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
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
