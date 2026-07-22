"use client"

import { Quote, Star, TrendingUp, Clock, PhoneCall } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"

const metrics = [
  { icon: PhoneCall, value: "2.4M+", label: "Calls handled / month" },
  { icon: Clock, value: "62%", label: "Average ops time saved" },
  { icon: TrendingUp, value: "3.1x", label: "Lift in qualified leads" },
]

const testimonials = [
  {
    metric: "Saved 60 hrs / week",
    metricAccent: "var(--ai-cyan)",
    quote:
      "Aria handles every inbound after-hours call now. We replaced an offshore answering service inside two weeks and our reply time dropped from 14 minutes to under one.",
    author: "Lina Okafor",
    role: "VP Operations",
    company: "Marlowe Realty",
    initial: "L",
  },
  {
    metric: "+38% conversion",
    metricAccent: "var(--ai-magenta)",
    quote:
      "The agent handles objections better than half my SDRs. Real interruptions, real follow-up questions — the prospects don't realize they're talking to AI until we tell them.",
    author: "Marcus Chen",
    role: "Head of Sales",
    company: "Northwind Solar",
    initial: "M",
  },
  {
    metric: "99.4% deflection",
    metricAccent: "var(--ai-violet)",
    quote:
      "We pointed our business number at 9278 and within a day it was triaging, scheduling, and updating our CRM on its own. The remaining 0.6% are the calls humans should handle anyway.",
    author: "Priya Anand",
    role: "Director of Support",
    company: "Glide Logistics",
    initial: "P",
  },
  {
    metric: "Live in 4 days",
    metricAccent: "var(--ai-mint)",
    quote:
      "I was quoted 6 months by an enterprise vendor. We had a working voice agent in production by day four — connected to our calendar, CRM, and existing phone number — at an order of magnitude less.",
    author: "Daniel Reyes",
    role: "CTO",
    company: "Bright Dental Group",
    initial: "D",
  },
]

export function Testimonials() {
  const reduced = useReducedMotion()
  return (
    <section id="testimonials" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full blur-[120px] [will-change:transform]"
        style={{ background: "var(--ai-cyan)", opacity: 0.035 }}
        animate={reduced ? undefined : { scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-8 md:px-6 md:pb-20 md:pt-10">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="ai-pill-magenta">
            <span className="h-1 w-1 rounded-full bg-accent" />
            Loved by operators
          </span>
          <h2 className="mt-6 text-balance text-4xl font-serif font-normal leading-[1.1] tracking-tight md:text-5xl">
            Teams shipping AI voice agents{" "}
            <span className="text-primary">that actually convert.</span>
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            From dental clinics to logistics ops, 9278.ai is answering, qualifying, and closing — 24/7, on the carrier you already use.
          </p>
        </ScrollReveal>

        {/* Metrics row */}
        <StaggerGroup className="mt-6 flex flex-wrap justify-center gap-2.5">
          {metrics.map((m) => {
            const Icon = m.icon
            return (
              <StaggerItem key={m.label}>
                <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card/60 py-1.5 pl-1.5 pr-3.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-xs font-medium whitespace-nowrap">
                    <span className="text-primary">{m.value}</span>{" "}
                    <span className="text-muted-foreground">{m.label}</span>
                  </p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>

        {/* Testimonial carousel — one row, drifting left, pauses on hover */}
        <ScrollReveal
          className="mt-6 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        >
          <div className={`flex w-max gap-6 ${reduced ? "" : "marquee"}`}>
            {(reduced ? testimonials : [...testimonials, ...testimonials]).map((t, i) => (
              <figure
                key={`${t.author}-${i}`}
                className="testimonial-card card-glow ring-gradient relative h-full w-[320px] shrink-0 rounded-2xl p-5 sm:w-[360px]"
              >
                <span className="scan-line" aria-hidden />
                <div className="relative flex items-start justify-between gap-4">
                  <span
                    className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wider"
                    style={{
                      color: t.metricAccent,
                      background: `color-mix(in oklch, ${t.metricAccent} 10%, transparent)`,
                      borderColor: `color-mix(in oklch, ${t.metricAccent} 28%, transparent)`,
                    }}
                  >
                    <TrendingUp className="h-3 w-3" />
                    {t.metric}
                  </span>
                  <Quote
                    className="h-6 w-6 shrink-0 text-foreground/15"
                    aria-hidden="true"
                  />
                </div>

                <blockquote className="relative mt-3 line-clamp-3 text-pretty text-sm leading-relaxed text-foreground/90">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <figcaption className="relative mt-4 flex items-center justify-between border-t border-border/40 pt-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ring-1"
                      style={{
                        background: `color-mix(in oklch, ${t.metricAccent} 14%, transparent)`,
                        color: t.metricAccent,
                        borderColor: `color-mix(in oklch, ${t.metricAccent} 30%, transparent)`,
                      }}
                    >
                      {t.initial}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold tracking-tight">{t.author}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {t.role} · {t.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-300">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
