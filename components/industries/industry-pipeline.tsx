"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { PhoneCall, ClipboardList, Truck, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { HighlightedShort } from "@/components/industries/highlighted-short"
import { getIndustry } from "@/lib/industries"

const STAGES = [
  { icon: PhoneCall, title: "Call lands", note: "07:41pm · after hours" },
  { icon: ClipboardList, title: "Job triaged", note: "priority · no heat" },
  { icon: Truck, title: "Tech dispatched", note: "Mike · van 4" },
  { icon: CheckCircle2, title: "Arrival confirmed", note: "ETA 22 min" },
] as const

const STAGE_MS = 2200

/**
 * IndustryPipeline
 *
 * A horizontal dispatch rail: one job walking left to right from the call
 * landing to the van pulling up, with a token sliding along the track between
 * stages. Full-bleed and horizontal by design, so it breaks the two-column
 * rhythm the neighbouring sections use.
 *
 * The token is positioned from an animation-frame loop rather than a CSS
 * transition so it keeps moving in browsers that suspend CSS animation.
 */
export function IndustryPipeline({ slug, index }: { slug: string; index: number }) {
  const industry = getIndustry(slug)
  const [stage, setStage] = useState(0)
  const stageRef = useRef(0)
  const tokenRef = useRef<HTMLSpanElement | null>(null)
  const posRef = useRef(0)

  useEffect(() => {
    stageRef.current = stage
  }, [stage])

  useEffect(() => {
    const id = setInterval(() => setStage((s) => (s + 1) % STAGES.length), STAGE_MS)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    let raf = 0
    const frame = () => {
      // Target sits at the centre of the active stage's column.
      const target = ((stageRef.current + 0.5) / STAGES.length) * 100
      posRef.current += (target - posRef.current) * 0.08
      if (tokenRef.current) {
        tokenRef.current.style.left = `${posRef.current.toFixed(3)}%`
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])

  if (!industry) return null
  const ordinal = String(index + 1).padStart(2, "0")

  return (
    <section
      id={industry.slug}
      className="relative scroll-mt-24 border-b border-border/50 py-12 last:border-b-0 md:py-16"
    >
      <p
        aria-hidden
        className="pointer-events-none absolute -top-6 right-0 -z-10 select-none font-serif text-[6rem] leading-none text-foreground/[0.04] md:text-[8.5rem]"
      >
        {ordinal}
      </p>

      {/* Header sits on one line rather than stacked, another break from the rest */}
      <ScrollReveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">{industry.name}</p>
          <h2 className="mt-4 text-balance font-serif text-3xl font-normal leading-[1.15] tracking-tight md:text-4xl">
            <Link
              href={`/industries/${industry.slug}`}
              className="transition-opacity hover:opacity-80"
            >
              <HighlightedShort industry={industry} />
            </Link>
          </h2>
        </div>
        <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">{industry.pitch}</p>
      </ScrollReveal>

      {/* Dispatch rail */}
      <ScrollReveal delay={0.08} className="mt-12">
        <div className="relative">
          {/* Track */}
          <div aria-hidden className="absolute inset-x-0 top-6 h-px bg-primary/15" />
          <span
            ref={tokenRef}
            aria-hidden
            className="absolute top-6 z-10 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_0_4px_rgb(255_255_255)]"
            style={{ left: "12.5%" }}
          />

          <ol className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {STAGES.map((s, i) => {
              const Icon = s.icon
              const done = i <= stage
              return (
                <li key={s.title} className="relative flex flex-col items-center text-center">
                  <span
                    className={cn(
                      "flex size-12 items-center justify-center rounded-full border bg-white transition-all duration-500",
                      i === stage
                        ? "border-primary text-primary shadow-[0_0_0_1px_color-mix(in_oklch,var(--primary)_35%,transparent),0_6px_16px_-6px_color-mix(in_oklch,var(--primary)_50%,transparent)]"
                        : done
                          ? "border-primary/45 text-primary/70"
                          : "border-primary/20 text-primary/35",
                      i === stage && "scale-110",
                    )}
                    aria-hidden
                  >
                    <Icon className="size-5" />
                  </span>
                  <p
                    className={cn(
                      "mt-4 text-sm font-medium transition-colors duration-500",
                      done ? "text-neutral-900" : "text-neutral-400",
                    )}
                  >
                    {s.title}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">
                    {s.note}
                  </p>
                  {industry.sampleLines[i] && (
                    <p
                      className={cn(
                        "mt-3 max-w-[220px] text-pretty text-[12px] leading-relaxed transition-opacity duration-500",
                        i === stage ? "text-neutral-700 opacity-100" : "text-neutral-400 opacity-60",
                      )}
                    >
                      &ldquo;{industry.sampleLines[i]}&rdquo;
                    </p>
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      </ScrollReveal>

    </section>
  )
}
