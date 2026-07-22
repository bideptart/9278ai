"use client"

import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * AmbientGlow
 * Two slow-drifting brand-color blobs used behind hero/CTA panels on the
 * Industries page. Isolated as a client component so pages that render it
 * (e.g. app/industries/page.tsx) can stay server components.
 */
export function AmbientGlow({
  className,
  variant = "brand",
}: {
  className?: string
  /** "brand" = red/amber blobs for light card backgrounds; "light" = soft white blobs for colored panels */
  variant?: "brand" | "light"
}) {
  const reduced = useReducedMotion()
  const blobA = variant === "light" ? "bg-white/20" : "bg-primary/10"
  const blobB = variant === "light" ? "bg-white/10" : "bg-accent/10"
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <motion.div
        className={cn(
          "absolute left-1/4 top-0 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full blur-[120px] [will-change:transform]",
          blobA,
        )}
        animate={reduced ? undefined : { x: [0, 50, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className={cn(
          "absolute right-1/4 bottom-0 h-[22rem] w-[22rem] translate-x-1/2 translate-y-1/3 rounded-full blur-[120px] [will-change:transform]",
          blobB,
        )}
        animate={reduced ? undefined : { x: [0, -40, 20, 0], y: [0, 30, -10, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </div>
  )
}
