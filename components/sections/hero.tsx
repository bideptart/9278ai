"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { motion, type Variants } from "motion/react"
import { HeroCarousel } from "@/components/sections/hero-carousel"

export function Hero() {
  const word: Variants = {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  const headline = ["AI", "voice", "agents", "that"]

  return (
    <section className="relative overflow-hidden">
      {/* Background — deliberately just the hairline grid. The blurred colour
          blooms and the neural pattern that used to sit here competed with the
          card deck; the deck reads better against a plain surface. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <div className="relative mx-auto grid min-h-[calc(100svh-5rem)] w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-4 md:px-6 md:py-6 lg:grid-cols-12 lg:gap-x-20 xl:gap-x-24">
        {/* LEFT: Copy */}
        <div className="lg:col-span-7">
          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur-md sm:gap-3 sm:px-4"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="shrink-0 font-medium text-foreground/90">Live</span>
            <span className="h-3 w-px shrink-0 bg-border/80" />
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              v9278.audio-1
            </span>
            <span className="hidden h-3 w-px shrink-0 bg-border/80 sm:block" />
            <Sparkles className="hidden h-3.5 w-3.5 shrink-0 text-primary sm:block" aria-hidden="true" />
            <span className="hidden truncate sm:inline">Native audio · Sub-second latency · Self-hosted</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.07, delayChildren: 0.2 }}
            className="mt-5 text-balance text-4xl font-serif font-normal leading-[1.02] tracking-tight sm:text-5xl md:text-6xl"
          >
            {headline.map((w, i) => (
              <motion.span key={`h-${i}`} variants={word} className="mr-3 inline-block">
                {w}
              </motion.span>
            ))}
            <br className="hidden md:block" />
            <motion.span variants={word} className="mr-3 inline-block italic text-primary">
              actually
            </motion.span>
            <motion.span variants={word} className="mr-3 inline-block italic text-primary">
              sound
            </motion.span>
            <motion.span variants={word} className="mr-3 inline-block italic text-primary">
              human.
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground"
          >
            Build, launch, and scale voice agents on a self-hosted control panel. Native audio, real interruptions,
            and your own phone numbers — production-ready in an afternoon.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-6 flex flex-row flex-wrap items-center gap-3"
          >
            <Button
              size="lg"
              className="group relative h-11 overflow-hidden rounded-full bg-neutral-900 px-5 text-sm text-white transition-all hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 sm:h-12 sm:px-7 sm:text-base"
            >
              <span className="relative z-10">Build your first agent</span>
              <ArrowRight
                className="relative z-10 ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group h-11 rounded-full border-neutral-300 bg-white px-5 text-sm text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50 dark:border-white/20 dark:bg-transparent dark:text-white dark:hover:border-white/40 dark:hover:bg-white/5 sm:h-12 sm:px-7 sm:text-base"
            >
              <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" aria-hidden="true" />
              Features
            </Button>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.25 }}
            className="mt-8 flex flex-row flex-nowrap items-center gap-x-3 gap-y-3 border-t border-border/40 pt-5 sm:gap-x-10"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-2xl">&lt;300ms</p>
              <p className="truncate text-[8px] uppercase tracking-widest text-muted-foreground sm:text-xs">Sub-second latency</p>
            </div>
            <div className="h-8 w-px shrink-0 bg-border/60 sm:h-10" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-2xl">Self-hosted</p>
              <p className="truncate text-[8px] uppercase tracking-widest text-muted-foreground sm:text-xs">Your data, your stack</p>
            </div>
            <div className="h-8 w-px shrink-0 bg-border/60 sm:h-10" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-2xl">Unlimited</p>
              <p className="truncate text-[8px] uppercase tracking-widest text-muted-foreground sm:text-xs">Concurrent calls</p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Coverflow deck of capability cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-5 lg:pl-8 xl:pl-10"
        >
          <HeroCarousel />
        </motion.div>
      </div>

      {/* Carrier trust strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="relative border-t border-border/40 bg-background/50 px-4 py-6 md:px-6"
      >
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Connect your carrier account in two clicks
        </p>
      </motion.div>
    </section>
  )
}
