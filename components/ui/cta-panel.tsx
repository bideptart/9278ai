"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight, CalendarDays, Sparkles } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

/**
 * CtaPanel
 * The single source of truth for the site's closing CTA. This is the exact
 * layout and styling used by the homepage CTA — near-white card, drifting
 * glows, dot grid, "Live demo" pill, headline + description, two buttons, and a
 * trust strip — so every page's CTA renders identically. Pages pass their own
 * headline/description/buttons; the pill and trust strip default to the shared
 * homepage copy. Icons are string keys (not component props) so this client
 * component can be rendered from server pages.
 */
export type CtaAction = {
  label: string
  href?: string
  icon?: "arrow" | "calendar"
  variant?: "solid" | "outline"
}

const DEFAULT_TRUST = [
  "Sub-second latency",
  "Bring your own carrier",
  "Self-hosted control panel",
  "No contracts",
]

function ActionButton({ action }: { action: CtaAction }) {
  const solid = action.variant !== "outline"
  const className = solid
    ? "h-11 w-48 rounded-full border border-black bg-black px-6 text-sm text-white hover:bg-neutral-800 sm:w-auto"
    : "h-11 w-48 rounded-full border-black/15 bg-black/5 px-6 text-sm text-black hover:bg-black/10 sm:w-auto"

  const inner = (
    <>
      {action.icon === "calendar" && <CalendarDays className="mr-2 h-4 w-4" />}
      {action.label}
      {action.icon === "arrow" && <ArrowRight className="ml-1 h-4 w-4" />}
    </>
  )

  if (action.href) {
    return (
      <Button asChild size="lg" variant={solid ? "default" : "outline"} className={className}>
        <Link href={action.href}>{inner}</Link>
      </Button>
    )
  }
  return (
    <Button size="lg" variant={solid ? "default" : "outline"} className={className}>
      {inner}
    </Button>
  )
}

export function CtaPanel({
  id,
  eyebrow = "Live demo · No signup",
  title,
  description,
  primary,
  secondary,
  trustItems = DEFAULT_TRUST,
}: {
  id?: string
  eyebrow?: string
  title: ReactNode
  description: string
  primary: CtaAction
  secondary?: CtaAction
  trustItems?: string[]
}) {
  const reduced = useReducedMotion()
  return (
    <section id={id} className="relative overflow-hidden border-t border-border/40">
      <div className="relative mx-auto w-full max-w-7xl px-4 py-10 md:px-6 md:py-14">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[28px] border border-primary/15 px-6 py-6 shadow-[0_12px_28px_-18px_color-mix(in_oklch,var(--primary)_12%,transparent),0_4px_10px_-8px_color-mix(in_oklch,var(--primary)_7%,transparent)] md:px-8 md:py-8 [background-image:radial-gradient(circle_at_top_right,white,transparent_60%),linear-gradient(135deg,color-mix(in_oklch,var(--primary)_5%,white),color-mix(in_oklch,var(--primary)_2%,white))]">
            {/* Drifting glow */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/3 top-0 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px] [will-change:transform]"
              animate={reduced ? undefined : { x: [0, 60, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute right-1/4 bottom-0 -z-10 h-[24rem] w-[24rem] translate-x-1/2 translate-y-1/2 rounded-full bg-accent/[0.04] blur-[120px] [will-change:transform]"
              animate={reduced ? undefined : { x: [0, -40, 20, 0], y: [0, 30, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            {/* Subtle dot grid overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-dots opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
            />

            <div className="relative grid grid-cols-1 items-center gap-6 text-left md:grid-cols-2 md:gap-8">
              <div>
                <span className="ai-pill-cyan">
                  <Sparkles className="h-3 w-3" />
                  {eyebrow}
                </span>

                <h2 className="mt-5 text-balance text-4xl font-serif font-normal leading-[1.05] tracking-tight md:text-5xl">
                  {title}
                </h2>
                <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                  {description}
                </p>
              </div>

              <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:flex-wrap md:justify-end">
                <ActionButton action={primary} />
                {secondary && <ActionButton action={secondary} />}
              </div>
            </div>

            {/* Trust strip */}
            <div className="relative mt-8 grid grid-cols-2 gap-x-2 gap-y-3 text-[11px] tracking-tight text-muted-foreground sm:flex sm:flex-wrap sm:items-center sm:gap-x-8 sm:text-xs sm:tracking-normal">
              {trustItems.map((item) => (
                <span key={item} className="inline-flex items-center gap-2 whitespace-nowrap">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
