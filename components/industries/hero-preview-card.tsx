"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { INDUSTRIES } from "@/lib/industries"

const CYCLE_MS = 2000
const WHEEL_SIZE = 190
const ORBIT_RADIUS = 75
const TOP_JOBS_COUNT = 3

/**
 * HeroPreviewCard
 * A clickable "orbit wheel" for the Industries hero, presented inside a
 * slim mobile-device mockup — notch, side buttons, and a home indicator —
 * so it reads as a phone screenshot rather than a flat web card. All ten
 * industries ring the center emblem and auto-advance every two seconds;
 * clicking any orbit icon jumps straight to that industry and pauses the
 * auto-cycle so its short pitch and top day-one tasks stay put long enough
 * to read.
 */
export function HeroPreviewCard() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % INDUSTRIES.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [reduced, paused])

  function selectIndustry(i: number) {
    setIndex(i)
    setPaused(true)
  }

  const industry = INDUSTRIES[index]
  const Icon = industry.icon
  const ordinal = String(index + 1).padStart(2, "0")
  const total = String(INDUSTRIES.length).padStart(2, "0")
  const topJobs = industry.jobs.slice(0, TOP_JOBS_COUNT)

  return (
    <div className="relative mx-auto w-[320px] max-w-full">
      {/* Soft glow behind */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] rounded-full bg-primary/20 blur-[80px]"
      />

      <div className="relative flex flex-col items-center px-8 pb-10 pt-12 text-center">
        <div className="relative mx-auto flex items-center justify-center" style={{ height: WHEEL_SIZE + 40, width: WHEEL_SIZE + 40 }}>
          {INDUSTRIES.map((it, i) => {
            const angle = i * (360 / INDUSTRIES.length) - 90
            const rad = (angle * Math.PI) / 180
            const x = Math.cos(rad) * (ORBIT_RADIUS + 15)
            const y = Math.sin(rad) * (ORBIT_RADIUS + 15)
            const active = i === index
            const OrbitIcon = it.icon
            return (
              <div
                key={it.slug}
                className="absolute"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <motion.button
                  type="button"
                  onClick={() => selectIndustry(i)}
                  aria-label={`Show the ${it.name} playbook`}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "flex cursor-pointer items-center justify-center rounded-full border transition-all duration-500 ease-out hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                    active
                      ? "z-10 h-12 w-12 scale-100 border-primary/60 bg-primary/15 text-primary shadow-[0_0_20px_-5px_var(--primary)]"
                      : "h-10 w-10 scale-90 border-border/50 bg-card/70 text-muted-foreground/40 hover:scale-100 hover:bg-card",
                  )}
                  animate={reduced ? undefined : { y: [0, -5, 0] }}
                  transition={{
                    duration: 4 + (i % 3),
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: i * 0.15,
                  }}
                >
                  <OrbitIcon className={active ? "size-5" : "size-4"} aria-hidden />
                </motion.button>
              </div>
            )
          })}

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              key={industry.slug}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-20 w-20 items-center justify-center"
            >
              <motion.span
                aria-hidden
                className="absolute inset-0.5 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, var(--ai-cyan), var(--ai-violet), var(--ai-magenta), var(--ai-cyan))",
                  filter: "blur(16px)",
                  opacity: 0.8,
                }}
                animate={reduced ? undefined : { scale: [1, 1.2, 1] }}
                transition={{ duration: 2.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100" aria-hidden>
                <circle cx="50" cy="50" r="44" fill="none" stroke="var(--border)" strokeWidth="12" opacity="0.7" />
                {!reduced && !paused && (
                  <motion.circle
                    key={industry.slug}
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                  />
                )}
                {(reduced || paused) && (
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                )}
              </svg>
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-background ring-2 ring-primary/30">
                <Icon className="h-6 w-6 text-primary" aria-hidden />
              </span>
            </motion.div>
          </div>
        </div>

        <motion.div
          key={industry.slug}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <p className="font-serif text-xs uppercase tracking-[0.25em] text-muted-foreground/80">
            Playbook {ordinal} of {total}
          </p>
          <h3 className="text-aurora mt-2 text-balance font-serif text-2xl font-normal tracking-tight">
            {industry.name}
          </h3>
          <p className="mx-auto mt-2 line-clamp-2 max-w-[16rem] text-pretty text-base leading-relaxed text-muted-foreground">
            {industry.short}
          </p>

          <div className="mt-4 flex flex-col gap-2 text-left">
            {topJobs.map((job, i) => (
              <motion.div
                key={job}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                title={job}
                className="flex items-center gap-2 rounded-lg border border-border/50 bg-card/50 px-3 py-2"
              >
                <Check className="size-3.5 shrink-0 text-primary" aria-hidden />
                <span className="truncate text-sm leading-tight text-foreground/85">{job}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
