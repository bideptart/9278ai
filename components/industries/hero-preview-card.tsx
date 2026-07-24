"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { INDUSTRIES } from "@/lib/industries"

const CYCLE_MS = 1000

/**
 * Hand-placed cluster geometry, in percentages of the square stage: `x`/`y` are
 * the bubble's centre, `size` its diameter. Spacing is tuned so no two spheres
 * touch even when the selected one swells, and the order matches INDUSTRIES so
 * bubble n always belongs to industry n.
 */
const CLUSTER = [
  { x: 50, y: 11, size: 20 }, // Real estate
  { x: 77, y: 22, size: 17 }, // Dental practices
  { x: 90, y: 46, size: 19 }, // Healthcare clinics
  { x: 76, y: 72, size: 17 }, // Home services
  { x: 50, y: 89, size: 20 }, // Restaurants
  { x: 24, y: 72, size: 17 }, // Automotive
  { x: 10, y: 46, size: 19 }, // Legal
  { x: 23, y: 22, size: 17 }, // Education
  { x: 37, y: 47, size: 22 }, // E-commerce
  { x: 64, y: 52, size: 18 }, // Fitness & wellness
] as const

/**
 * Fallback placement for any industry added beyond the hand-tuned ten — parks
 * the extras on an outer ring so the cluster degrades gracefully instead of
 * crashing on a missing CLUSTER entry.
 */
function fallbackSpot(i: number) {
  const angle = ((i * 137.5) % 360) * (Math.PI / 180)
  return { x: 50 + Math.cos(angle) * 44, y: 50 + Math.sin(angle) * 44, size: 16 }
}

/**
 * HeroPreviewCard
 * A cluster of ten blown-glass bubbles — one per industry — drifting like soap
 * spheres above the fold. The selected bubble fills with brand-red glass, swells,
 * picks up a sweeping halo, and raises its name plate. Selection auto-advances
 * once a second until a bubble is clicked, which pins it.
 */
export function HeroPreviewCard() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
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

  return (
    <div className="relative mx-auto w-[340px] max-w-full">
      {/* Warm bloom behind the cluster */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-4 -z-10 h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-primary/15 blur-[90px]"
      />

      {/* ---- Bubble cluster ---- */}
      <div className="relative mx-auto aspect-square w-full">
        {INDUSTRIES.map((it, i) => {
          const spot = CLUSTER[i] ?? fallbackSpot(i)
          const BubbleIcon = it.icon
          const active = i === index
          const showLabel = active || hovered === i

          return (
            <div
              key={it.slug}
              className={cn("absolute -translate-x-1/2 -translate-y-1/2", active ? "z-20" : "z-10")}
              style={{
                left: `${spot.x}%`,
                top: `${spot.y}%`,
                width: `${spot.size}%`,
                height: `${spot.size}%`,
              }}
            >
              <motion.div
                className="relative h-full w-full"
                animate={
                  reduced
                    ? undefined
                    : { y: ["0%", "-7%", "0%", "5%", "0%"], x: ["0%", "3%", "0%", "-3%", "0%"] }
                }
                transition={{
                  duration: 9 + (i % 4) * 1.6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 0.32,
                }}
              >
                {/* Halo + sweeping hairline, selected bubble only */}
                {active && (
                  <>
                    <motion.span
                      aria-hidden
                      className="pointer-events-none absolute -inset-[18%] -z-10 rounded-full bg-primary/30 blur-xl"
                      animate={reduced ? undefined : { opacity: [0.45, 0.85, 0.45], scale: [1, 1.12, 1] }}
                      transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                    <motion.span
                      aria-hidden
                      className="bubble-ring pointer-events-none absolute -inset-[9%] rounded-full"
                      animate={reduced ? undefined : { rotate: 360 }}
                      transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                  </>
                )}

                <motion.button
                  type="button"
                  onClick={() => selectIndustry(i)}
                  onPointerEnter={() => setHovered(i)}
                  onPointerLeave={() => setHovered((h) => (h === i ? null : h))}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered((h) => (h === i ? null : h))}
                  aria-label={`Show the ${it.name} playbook`}
                  aria-current={active ? "true" : undefined}
                  animate={{ scale: active ? 1.14 : showLabel ? 1.07 : 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className={cn(
                    "group relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-full",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    active ? "bubble-active text-white" : "bubble-glass text-primary/75 hover:text-primary",
                  )}
                >
                  {/* Specular catch-light */}
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute left-[18%] top-[13%] h-[24%] w-[32%] -rotate-[22deg] rounded-full blur-[3px]",
                      active ? "bg-white/60" : "bg-white/90",
                    )}
                  />
                  {/* Lower rim bounce-light */}
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute bottom-[10%] left-1/2 h-[10%] w-[42%] -translate-x-1/2 rounded-full blur-[4px]",
                      active ? "bg-white/25" : "bg-primary/20",
                    )}
                  />
                  <BubbleIcon className="relative h-[38%] w-[38%]" strokeWidth={1.6} aria-hidden />
                </motion.button>

                {/* Name plate */}
                <motion.span
                  aria-hidden
                  initial={false}
                  animate={{ opacity: showLabel ? 1 : 0, y: showLabel ? 0 : -4 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-none absolute left-1/2 top-[104%] z-30 -translate-x-1/2 whitespace-nowrap rounded-full border border-border/60 bg-background/90 px-2.5 py-0.5 font-serif text-[11px] tracking-wide text-foreground/80 shadow-sm backdrop-blur-sm"
                >
                  {it.name}
                </motion.span>
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
