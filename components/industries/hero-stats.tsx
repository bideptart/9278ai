"use client"

import type { LucideIcon } from "lucide-react"
import { Building2, PhoneCall, PhoneIncoming, Rocket } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"
import { CountUpStat } from "@/components/industries/count-up-stat"

type Stat = {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
  icon: LucideIcon
}

/**
 * Lives here rather than in the page because the tiles are a Client Component —
 * Lucide icons are functions and cannot cross the server/client boundary as props.
 */
const STATS: Stat[] = [
  { value: 10, label: "Industries covered", icon: Building2 },
  { value: 3, prefix: "<", suffix: "s", label: "First-ring pickup", icon: PhoneIncoming },
  { value: 2.4, suffix: "M+", decimals: 1, label: "Calls handled monthly", icon: PhoneCall },
  { value: 5, suffix: " min", label: "To go live", icon: Rocket },
]

/**
 * HeroStats
 * Four square proof-points under the Industries hero copy. Idle motion is
 * deliberately quiet — a hairline halo turning behind each medallion and a
 * light sweep that crosses the face every few seconds, offset per tile so the
 * row shimmers in sequence rather than in unison. Hover lifts the card, brightens
 * the corner brackets, and floods the medallion with brand red.
 */
export function HeroStats() {
  const reduced = useReducedMotion()

  return (
    <StaggerGroup
      className="mt-2 grid grid-cols-4 gap-2 border-t border-border/40 pt-2 sm:gap-4"
      stagger={0.08}
    >
      {STATS.map((s, i) => {
        const Icon = s.icon
        return (
          <StaggerItem key={s.label}>
            <div className="group relative mx-auto aspect-square w-full max-w-[100px] overflow-hidden rounded-xl border border-primary/35 bg-card/80 sm:rounded-2xl shadow-[0_24px_60px_-20px_color-mix(in_oklch,var(--primary)_28%,transparent),0_8px_20px_-8px_color-mix(in_oklch,var(--primary)_16%,transparent)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/55 hover:shadow-[0_30px_66px_-20px_color-mix(in_oklch,var(--primary)_36%,transparent),0_10px_24px_-8px_color-mix(in_oklch,var(--primary)_20%,transparent)]">
              {/* Light sweep */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-primary/15 to-transparent"
                animate={reduced ? undefined : { x: ["0%", "400%"] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 4.5,
                  ease: "easeInOut",
                  delay: i * 0.55,
                }}
              />

              {/* Warm bloom that rises on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-primary/0 blur-2xl transition-all duration-500 group-hover:bg-primary/25"
              />

              {/* Classical corner brackets */}
              <span aria-hidden className="pointer-events-none absolute left-1.5 top-1.5 size-2 border-l border-t border-primary/25 transition-colors duration-500 group-hover:border-primary/70 sm:left-2.5 sm:top-2.5 sm:size-3" />
              <span aria-hidden className="pointer-events-none absolute right-1.5 top-1.5 size-2 border-r border-t border-primary/25 transition-colors duration-500 group-hover:border-primary/70 sm:right-2.5 sm:top-2.5 sm:size-3" />
              <span aria-hidden className="pointer-events-none absolute bottom-1.5 left-1.5 size-2 border-b border-l border-primary/25 transition-colors duration-500 group-hover:border-primary/70 sm:bottom-2.5 sm:left-2.5 sm:size-3" />
              <span aria-hidden className="pointer-events-none absolute bottom-1.5 right-1.5 size-2 border-b border-r border-primary/25 transition-colors duration-500 group-hover:border-primary/70 sm:bottom-2.5 sm:right-2.5 sm:size-3" />

              <div className="relative flex h-full flex-col items-center justify-center gap-1.5 px-1.5 text-center sm:gap-2.5 sm:px-2.5">
                {/* Medallion */}
                <span className="relative flex size-7 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/25 transition-colors duration-500 group-hover:bg-primary group-hover:ring-primary/60 sm:size-10">
                  <motion.span
                    aria-hidden
                    className="bubble-ring pointer-events-none absolute -inset-1 rounded-full"
                    animate={reduced ? undefined : { rotate: 360 }}
                    transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                  <Icon
                    className="relative size-3.5 text-primary transition-all duration-500 group-hover:scale-110 group-hover:text-primary-foreground sm:size-[18px]"
                    strokeWidth={1.7}
                    aria-hidden
                  />
                </span>

                <p className="font-serif text-sm leading-none text-primary sm:text-xl">
                  <CountUpStat value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                </p>

                <span className="sr-only">{s.label}</span>
              </div>
            </div>
          </StaggerItem>
        )
      })}
    </StaggerGroup>
  )
}
