"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Check } from "lucide-react"
import { INDUSTRIES } from "@/lib/industries"
import { cn } from "@/lib/utils"

const CYCLE_MS = 2000

// These industries' copy runs a touch longer than the rest, wrapping to extra
// lines and blowing past the shared card height — trim the type down a notch
// just for them so every card lands on the same height.
const TIGHT_SLUGS = new Set(["education", "legal", "real-estate", "dental"])

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
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const reduced = useReducedMotion()
  const industry = INDUSTRIES[active]

  useEffect(() => {
    if (reduced || paused) return
    const id = setInterval(() => setActive((i) => (i + 1) % INDUSTRIES.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [reduced, paused])

  // Keep the active pill scrolled into view within the strip only. Deliberately NOT
  // using btn.scrollIntoView() here — with block: "nearest" it still walks every
  // scrollable ancestor including the page itself, so whenever the auto-advance
  // interval changed `active` while this section was off-screen (e.g. the user had
  // scrolled back up to the hero), it would yank the whole page down to bring the
  // pill strip into view. Scrolling only the strip's own scrollLeft avoids that.
  useEffect(() => {
    const strip = stripRef.current
    const btn = strip?.children[active] as HTMLElement | undefined
    if (!strip || !btn) return
    const target = btn.offsetLeft - strip.clientWidth / 2 + btn.clientWidth / 2
    strip.scrollTo({ left: target, behavior: "smooth" })
  }, [active])

  useEffect(() => () => clearTimeout(resumeTimeoutRef.current), [])

  // Tapping a pill jumps there and briefly pauses the auto-advance so the tap
  // doesn't get immediately overridden — then resumes cycling from there.
  function selectIndustry(i: number) {
    setActive(i)
    setPaused(true)
    clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => setPaused(false), CYCLE_MS)
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
      <div className="relative mx-4 mt-6 min-h-[353px] overflow-hidden rounded-2xl border border-primary/35 bg-card/60 p-4 shadow-[0_24px_60px_-20px_color-mix(in_oklch,var(--primary)_28%,transparent),0_8px_20px_-8px_color-mix(in_oklch,var(--primary)_16%,transparent)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={industry.slug}
            initial={reduced ? undefined : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3
              className={cn(
                "text-left font-serif font-semibold leading-snug tracking-tight text-foreground",
                TIGHT_SLUGS.has(industry.slug) ? "text-lg" : "text-xl",
              )}
            >
              {industry.short}
            </h3>

            <p className="mt-4 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
              What the agent does on day one
            </p>
            <div className="mt-2">
              {industry.jobs.map((job) => (
                <div
                  key={job}
                  className={cn(
                    "flex items-start gap-3 rounded-lg px-1",
                    TIGHT_SLUGS.has(industry.slug) ? "py-0.5" : "py-1",
                  )}
                >
                  <span className="mt-0.5 flex size-5 flex-none items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Check className="size-3" aria-hidden />
                  </span>
                  <span
                    className={cn(
                      "text-foreground/90",
                      TIGHT_SLUGS.has(industry.slug) ? "text-[13px] leading-tight" : "text-sm leading-snug",
                    )}
                  >
                    {job}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
