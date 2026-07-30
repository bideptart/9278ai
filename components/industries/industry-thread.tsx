"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Check, Mic, Volume2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { HighlightedShort } from "@/components/industries/highlighted-short"
import { getIndustry } from "@/lib/industries"

/** Alternating turns. Agent lines come from the industry's own sample lines. */
const TURNS = [
  { from: "caller", text: "Hi — I need a refill on my blood pressure medication." },
  { from: "agent", useSample: 1 },
  { from: "caller", text: "That's the one. And my pain has been about a four today." },
  { from: "agent", useSample: 0 },
  { from: "caller", text: "Better than last week, but it still wakes me up." },
  { from: "agent", useSample: 2 },
] as const

const STEP_MS = 1400

/**
 * IndustryThread
 *
 * The call itself, played back turn by turn. Messages arrive on a loop with a
 * typing beat before each agent reply, so the section demonstrates the bedside
 * pacing the copy claims rather than describing it in a static card.
 *
 * Deliberately mirrored against the other rows: the transcript takes the left
 * column and the copy sits right, with the day-one list as a compact checklist
 * rather than a spaced-out bulleted column.
 */
export function IndustryThread({ slug, index }: { slug: string; index: number }) {
  const industry = getIndustry(slug)
  const [shown, setShown] = useState(1)

  useEffect(() => {
    const id = setInterval(() => setShown((n) => (n >= TURNS.length ? 1 : n + 1)), STEP_MS)
    return () => clearInterval(id)
  }, [])

  if (!industry) return null
  const ordinal = String(index + 1).padStart(2, "0")
  const typing = shown < TURNS.length && TURNS[shown]?.from === "agent"

  return (
    <section
      id={industry.slug}
      className="relative scroll-mt-24 border-b border-border/50 py-12 last:border-b-0 md:py-16"
    >
      <p
        aria-hidden
        className="pointer-events-none absolute -top-6 left-0 -z-10 select-none font-serif text-[6rem] leading-none text-foreground/[0.04] md:text-[8.5rem]"
      >
        {ordinal}
      </p>

      <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
        {/* Transcript — sticky while the copy column scrolls past, same
            treatment as the reel card in IndustryRow, just on the left. */}
        <ScrollReveal className="self-stretch">
          <div className="industry-reel-sticky rounded-2xl border border-neutral-300 bg-white p-5 md:p-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Live call · 01:12
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-neutral-600">
                <span className="size-1.5 rounded-full bg-primary" />
                Recording
              </span>
            </div>

            <ol className="mt-4 space-y-2.5">
              {TURNS.slice(0, shown).map((turn, i) => {
                const isAgent = turn.from === "agent"
                const text = isAgent && "useSample" in turn ? industry.sampleLines[turn.useSample] : turn.text
                return (
                  <li
                    key={i}
                    className={cn("flex items-start gap-2.5", isAgent ? "flex-row-reverse" : "flex-row")}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full",
                        isAgent ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-600",
                      )}
                      aria-hidden
                    >
                      {isAgent ? <Mic className="size-3" /> : <Volume2 className="size-3" />}
                    </span>
                    <p
                      className={cn(
                        "max-w-[80%] text-pretty rounded-2xl px-3 py-2 text-[12.5px] leading-relaxed",
                        isAgent
                          ? "rounded-tr-sm bg-neutral-100 text-neutral-900"
                          : "rounded-tl-sm border border-neutral-200 bg-white text-neutral-700",
                      )}
                    >
                      {text}
                    </p>
                  </li>
                )
              })}

              {typing && (
                <li className="flex flex-row-reverse items-center gap-2.5" aria-hidden>
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white">
                    <Mic className="size-3" />
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-2xl rounded-tr-sm bg-neutral-100 px-3 py-2.5">
                    <span className="dot-float size-1 rounded-full bg-neutral-500" />
                    <span
                      className="dot-float size-1 rounded-full bg-neutral-500"
                      style={{ animationDelay: "0.15s" }}
                    />
                    <span
                      className="dot-float size-1 rounded-full bg-neutral-500"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </span>
                </li>
              )}
            </ol>
          </div>
        </ScrollReveal>

        {/* Copy */}
        <ScrollReveal delay={0.08}>
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

          <ul className="mt-7 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {industry.jobs.map((job) => (
              <li key={job} className="flex items-start gap-2 text-[13px] leading-snug text-neutral-700">
                <Check className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
                {job}
              </li>
            ))}
          </ul>

        </ScrollReveal>
      </div>
    </section>
  )
}
