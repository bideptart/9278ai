"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { CalendarCheck, Utensils } from "lucide-react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { HighlightedShort } from "@/components/industries/highlighted-short"
import { getIndustry } from "@/lib/industries"

/** Two lanes of inbound requests, running in opposite directions. */
const LANE_A = [
  "Party of 4 · Fri 7:30",
  "Party of 2 · Sat 6:00",
  "Allergen · shellfish",
  "Party of 6 · Thu 8:15",
  "Hours · Sunday brunch",
  "Party of 3 · Fri 9:00",
]
const LANE_B = [
  "Private room · 12 guests",
  "Catering · office lunch",
  "Gift card balance",
  "Party of 8 · Sat 7:00",
  "Dress code",
  "Parking · valet",
]

/** Pixels per second each lane travels. */
const SPEED = 34

function Lane({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const offsetRef = useRef(0)

  useEffect(() => {
    let raf = 0
    let last = performance.now()
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const track = trackRef.current
      if (track) {
        // The list is rendered twice, so wrapping at half the width is seamless.
        const half = track.scrollWidth / 2
        if (half > 0) {
          offsetRef.current = (offsetRef.current + SPEED * dt) % half
          const x = reverse ? offsetRef.current - half : -offsetRef.current
          track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`
        }
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [reverse])

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div ref={trackRef} className="flex w-max gap-3 will-change-transform">
        {[...items, ...items].map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs text-neutral-700"
          >
            <span className="size-1.5 rounded-full bg-primary" aria-hidden />
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

/**
 * IndustryTicker
 *
 * The dinner-rush phone queue as two lanes of inbound requests streaming past —
 * the volume a host stand is fielding while the room fills. Centre-weighted and
 * full-bleed, with no card and no icon cluster, so it reads differently from
 * every other section on the page.
 *
 * Lanes are driven by an animation-frame loop writing `transform`, which also
 * keeps them moving where a CSS marquee would be suspended.
 */
export function IndustryTicker({ slug, index }: { slug: string; index: number }) {
  const industry = getIndustry(slug)
  if (!industry) return null
  const ordinal = String(index + 1).padStart(2, "0")

  return (
    <section
      id={industry.slug}
      className="relative scroll-mt-24 overflow-hidden border-b border-border/50 py-12 last:border-b-0 md:py-16"
    >
      <p
        aria-hidden
        className="pointer-events-none absolute -top-6 left-0 -z-10 select-none font-serif text-[6rem] leading-none text-foreground/[0.04] md:text-[8.5rem]"
      >
        {ordinal}
      </p>

      <ScrollReveal className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">{industry.name}</p>
        <h2 className="mt-4 text-balance font-serif text-3xl font-normal leading-[1.15] tracking-tight md:text-4xl">
          <Link
            href={`/industries/${industry.slug}`}
            className="transition-opacity hover:opacity-80"
          >
            <HighlightedShort industry={industry} />
          </Link>
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{industry.pitch}</p>
      </ScrollReveal>

      {/* Inbound lanes */}
      <ScrollReveal delay={0.08} className="mt-12 space-y-3">
        <Lane items={LANE_A} />
        <Lane items={LANE_B} reverse />
      </ScrollReveal>

      {/* Sample lines as pull-quotes across the width */}
      <ScrollReveal delay={0.12} className="mt-12">
        <div className="grid gap-4 md:grid-cols-3">
          {industry.sampleLines.map((line, i) => (
            <blockquote
              key={line}
              className="rounded-2xl border border-neutral-300 bg-white p-5 text-pretty text-[13px] leading-relaxed text-neutral-700"
            >
              <span className="mb-2 flex size-7 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
                {i === 1 ? (
                  <Utensils className="size-3.5" aria-hidden />
                ) : (
                  <CalendarCheck className="size-3.5" aria-hidden />
                )}
              </span>
              &ldquo;{line}&rdquo;
            </blockquote>
          ))}
        </div>
      </ScrollReveal>

    </section>
  )
}
