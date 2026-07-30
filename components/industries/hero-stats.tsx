"use client"

import type { LucideIcon } from "lucide-react"
import { Building2, PhoneCall, PhoneIncoming, Rocket } from "lucide-react"
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
 * Four square proof-points under the Industries hero copy. Flat by design —
 * border, corner brackets, and medallion only, no glow or drop shadow. Hover
 * lifts the card, brightens the brackets, and floods the medallion with brand red.
 */
export function HeroStats() {
  return (
    <StaggerGroup
      className="mt-2 grid grid-cols-4 gap-2 border-t border-border/40 pt-2 sm:gap-4"
      stagger={0.08}
    >
      {STATS.map((s) => {
        const Icon = s.icon
        return (
          <StaggerItem key={s.label}>
            <div className="group relative mx-auto aspect-square w-full max-w-[100px] overflow-hidden rounded-xl border border-neutral-300 bg-card sm:rounded-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-neutral-400 hover:bg-neutral-100 dark:border-white/15 dark:hover:border-white/30 dark:hover:bg-white/5">
              {/* Classical corner brackets */}
              <span aria-hidden className="pointer-events-none absolute left-1.5 top-1.5 size-2 border-l border-t border-neutral-400 transition-colors duration-500 group-hover:border-neutral-700 dark:border-white/25 dark:group-hover:border-white/60 sm:left-2.5 sm:top-2.5 sm:size-3" />
              <span aria-hidden className="pointer-events-none absolute right-1.5 top-1.5 size-2 border-r border-t border-neutral-400 transition-colors duration-500 group-hover:border-neutral-700 dark:border-white/25 dark:group-hover:border-white/60 sm:right-2.5 sm:top-2.5 sm:size-3" />
              <span aria-hidden className="pointer-events-none absolute bottom-1.5 left-1.5 size-2 border-b border-l border-neutral-400 transition-colors duration-500 group-hover:border-neutral-700 dark:border-white/25 dark:group-hover:border-white/60 sm:bottom-2.5 sm:left-2.5 sm:size-3" />
              <span aria-hidden className="pointer-events-none absolute bottom-1.5 right-1.5 size-2 border-b border-r border-neutral-400 transition-colors duration-500 group-hover:border-neutral-700 dark:border-white/25 dark:group-hover:border-white/60 sm:bottom-2.5 sm:right-2.5 sm:size-3" />

              <div className="relative flex h-full flex-col items-center justify-center gap-1.5 px-1.5 text-center sm:gap-2.5 sm:px-2.5">
                {/* Medallion */}
                <span className="relative flex size-7 items-center justify-center rounded-full bg-neutral-100 ring-1 ring-neutral-200 transition-colors duration-500 group-hover:bg-white group-hover:ring-neutral-300 dark:bg-white/10 dark:ring-white/15 dark:group-hover:bg-white/15 dark:group-hover:ring-white/25 sm:size-10">
                  <Icon
                    className="relative size-3.5 text-neutral-700 transition-all duration-500 group-hover:scale-110 group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-white sm:size-[18px]"
                    strokeWidth={1.7}
                    aria-hidden
                  />
                </span>

                <p className="font-serif text-sm leading-none text-neutral-900 dark:text-white sm:text-xl">
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
