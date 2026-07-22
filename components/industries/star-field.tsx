"use client"

import { motion, useReducedMotion } from "motion/react"
import { Star } from "lucide-react"

const STARS = [
  { top: "10%", left: "64%", size: 22, delay: 0, duration: 2.8 },
  { top: "72%", left: "74%", size: 16, delay: 0.5, duration: 3.2 },
  { top: "26%", left: "86%", size: 14, delay: 1, duration: 2.6 },
  { top: "55%", left: "92%", size: 18, delay: 1.5, duration: 3 },
  { top: "6%", left: "80%", size: 10, delay: 2, duration: 2.4 },
  { top: "84%", left: "58%", size: 14, delay: 0.8, duration: 3.4 },
  { top: "38%", left: "70%", size: 10, delay: 1.8, duration: 2.9 },
  { top: "16%", left: "56%", size: 9, delay: 1.2, duration: 3.1 },
]

/**
 * StarField
 * A scatter of small twinkling stars for the closing CTA — pairs with the
 * grid-line background to read as "stars and boxes" behind the content.
 */
export function StarField() {
  const reduced = useReducedMotion()
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {STARS.map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-white"
          style={{ top: s.top, left: s.left, filter: "drop-shadow(0 0 6px rgba(255,255,255,0.8))" }}
          animate={reduced ? undefined : { opacity: [0.45, 1, 0.45], scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: s.duration, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: s.delay }}
        >
          <Star size={s.size} fill="currentColor" strokeWidth={0} />
        </motion.span>
      ))}
    </div>
  )
}
