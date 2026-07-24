"use client"

import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"
import { Check } from "lucide-react"
import { INDUSTRIES } from "@/lib/industries"
import { cn } from "@/lib/utils"

const CYCLE_MS = 2000

/**
 * MobileIndustryExplorer
 * Mobile-only replacement for the stacked IndustryRow sections: a horizontally
 * scrollable pill strip of industry names, plus a single card below showing
 * just the active industry's name and its "What the agent does on day one"
 * checklist. Auto-advances every 2s (title + card together); tapping a pill
 * jumps straight to that industry, centers it in the strip, and pauses the
 * auto-advance. Desktop keeps the original full IndustryRow sections
 * untouched.
 */
export function MobileIndustryExplorer() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const stripRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const industry = INDUSTRIES[active]

  useEffect(() => {
    if (reduced || paused) return
    const id = setInterval(() => setActive((i) => (i + 1) % INDUSTRIES.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [reduced, paused])

  // Keep the active pill scrolled into view, whether it changed by auto-advance or a tap.
  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return
    const btn = strip.children[active] as HTMLElement | undefined
    btn?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
  }, [active])

  function selectIndustry(i: number) {
    setActive(i)
    setPaused(true)
  }

  return (
    <div className="sm:hidden">
      {/* Pill tab strip */}
      <div
        ref={stripRef}
        className="flex gap-2 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [mask-image:linear-gradient(to_right,transparent,black_20px,black_calc(100%-20px),transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {INDUSTRIES.map((it, i) => (
          <button
            key={it.slug}
            type="button"
            onClick={() => selectIndustry(i)}
            aria-pressed={i === active}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              i === active
                ? "border-primary bg-primary/10 text-primary"
                : "border-border/60 bg-card/40 text-muted-foreground",
            )}
          >
            {it.name}
          </button>
        ))}
      </div>

      {/* Centered detail card */}
      <div className="mx-4 mt-6 rounded-2xl border border-primary/35 bg-card/60 p-6 shadow-[0_24px_60px_-20px_color-mix(in_oklch,var(--primary)_28%,transparent),0_8px_20px_-8px_color-mix(in_oklch,var(--primary)_16%,transparent)]">
        <h3 className="text-balance text-center font-serif text-xl font-normal leading-snug tracking-tight text-foreground">
          {industry.short}
        </h3>

        <p className="mt-6 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
          What the agent does on day one
        </p>
        <div className="mt-4 space-y-1">
          {industry.jobs.map((job) => (
            <div key={job} className="flex items-start gap-3 rounded-lg px-2 py-1.5">
              <span className="mt-0.5 flex size-5 flex-none items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
                <Check className="size-3" aria-hidden />
              </span>
              <span className="text-sm leading-snug text-foreground/90">{job}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
