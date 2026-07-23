"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CalendarDays, Sparkles } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

export function CTA() {
  const reduced = useReducedMotion()
  return (
    <section id="cta" className="relative overflow-hidden border-t border-border/40">
      <div className="relative mx-auto w-full max-w-7xl px-4 py-10 md:px-6 md:py-14">
        <ScrollReveal>
          <div
            className="ring-gradient relative overflow-hidden rounded-[28px] border border-primary/35 px-6 py-6 shadow-[0_24px_60px_-20px_color-mix(in_oklch,var(--primary)_28%,transparent),0_8px_20px_-8px_color-mix(in_oklch,var(--primary)_16%,transparent)] md:px-8 md:py-8 [background-image:radial-gradient(circle_at_top_right,white,transparent_60%),linear-gradient(135deg,color-mix(in_oklch,var(--primary)_16%,white),color-mix(in_oklch,var(--primary)_6%,white))]"
          >
            {/* Drifting glow */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/3 top-0 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px] [will-change:transform]"
              animate={reduced ? undefined : { x: [0, 60, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute right-1/4 bottom-0 -z-10 h-[24rem] w-[24rem] translate-x-1/2 translate-y-1/2 rounded-full bg-accent/8 blur-[120px] [will-change:transform]"
              animate={reduced ? undefined : { x: [0, -40, 20, 0], y: [0, 30, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            {/* Subtle dot grid overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-dots opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
            />

            <div className="relative grid grid-cols-1 items-center gap-6 text-left md:grid-cols-2 md:gap-8">
              <div>
                <span className="ai-pill-cyan">
                  <Sparkles className="h-3 w-3" />
                  Live demo · No signup
                </span>

                <h2 className="mt-5 text-balance text-4xl font-serif font-normal leading-[1.05] tracking-tight md:text-5xl">
                  Hear it before{" "}
                  <span className="text-primary">you build it.</span>
                </h2>
                <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                  Talk to a live 9278.ai agent right now, see our pricing, or book a 20-minute walkthrough.
                </p>
              </div>

              <div className="flex w-full flex-wrap items-center gap-3 md:justify-end">
                <Button
                  size="lg"
                  className="h-14 rounded-full border border-black bg-black px-8 text-base text-white hover:bg-neutral-800"
                >
                  View pricing
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-full border-black/15 bg-black/5 px-8 text-base text-black hover:bg-black/10"
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Schedule a meeting
                </Button>
              </div>
            </div>

            {/* Trust strip */}
            <div className="relative mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Sub-second latency
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Bring your own carrier
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Self-hosted control panel
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                No contracts
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
