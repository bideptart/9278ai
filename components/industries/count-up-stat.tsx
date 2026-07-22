"use client"

import { useEffect, useRef, useState } from "react"

const DURATION_MS = 1300

function runCount(value: number, onUpdate: (v: number) => void, onDone?: () => void) {
  const start = performance.now()
  let raf = 0
  const tick = (now: number) => {
    const progress = Math.min((now - start) / DURATION_MS, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    onUpdate(value * eased)
    if (progress < 1) {
      raf = requestAnimationFrame(tick)
    } else {
      onDone?.()
    }
  }
  raf = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(raf)
}

/**
 * CountUpStat
 * Animates a number from 0 up to its target value, keeping any
 * prefix/suffix (e.g. "<", "s", "M+", " min") static. Starts immediately if
 * the element is already in the viewport on mount (the common case for a
 * hero stat), otherwise falls back to IntersectionObserver for elements
 * that start off-screen.
 */
export function CountUpStat({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value)
      return
    }

    let cancelled = false
    let stopCount: (() => void) | undefined
    let observer: IntersectionObserver | undefined

    const start = () => {
      if (cancelled) return
      stopCount = runCount(value, setDisplay)
    }

    const rect = el.getBoundingClientRect()
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0

    if (alreadyVisible) {
      start()
    } else {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          observer?.disconnect()
          start()
        },
        { threshold: 0.2 },
      )
      observer.observe(el)
    }

    return () => {
      cancelled = true
      observer?.disconnect()
      stopCount?.()
    }
  }, [value])

  return (
    <span ref={ref}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  )
}
