"use client"

// Marketing /pricing plan grid. Fetches the SAME live plans the get-started
// signup widget uses (https://voice.9278.ai/api/plans), so any pricing update
// in the portal is reflected here automatically. Each card deep-links into
// /get-started?plan=<id>&cycle=<cycle>, where checkout is completed.

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Check, ChevronLeft, ChevronRight, Loader2, TrendingUp, Clock, Rocket } from "lucide-react"
import { animate } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"
import { cn } from "@/lib/utils"

const PORTAL_BASE = "https://voice.9278.ai"

type Plan = {
  id: string
  label: string
  amount: number
  yearlyAmount: number
  yearlySavingsUsd?: number
  min: number
  rate: number
  agents: number
  tag: string | null
  sub: string
  perks: string[]
}

const usd = (n: number) =>
  "$" + Number(n || 0).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })

// Pulls a specific attribute (voice stack, support tier, SLA) out of a plan's
// perks list, so the comparison table stays in sync with whatever the portal
// API returns instead of hardcoding a second copy of the same data.
function perkMatching(perks: string[], pattern: RegExp) {
  return perks.find((perk) => pattern.test(perk)) ?? "—"
}

const COMPARISON_ROWS: Array<{
  label: string
  value: (p: Plan) => string
}> = [
  { label: "Included minutes", value: (p) => `${p.min.toLocaleString("en-US")} min` },
  { label: "Effective rate", value: (p) => `${usd(p.rate)}/min` },
  { label: "AI voice agents", value: (p) => (p.agents >= 999 ? "Unlimited" : String(p.agents)) },
  { label: "Voice stack", value: (p) => perkMatching(p.perks, /stack|premium/i) },
  { label: "Support", value: (p) => perkMatching(p.perks, /support|success manager/i) },
  { label: "SLA", value: (p) => (p.perks.some((perk) => /sla/i.test(perk)) ? "✓" : "—") },
]

const TESTIMONIALS = [
  {
    metric: "+38% conversion",
    quote: "The agent handles objections better than half my SDRs — prospects don't realize it's AI until we tell them.",
    author: "Marcus Chen",
    role: "Head of Sales, Northwind Solar",
    icon: TrendingUp,
    accent: "var(--ai-cyan)",
  },
  {
    metric: "Saved 60 hrs/week",
    quote: "Aria handles every inbound after-hours call now. Our reply time dropped from 14 minutes to under one.",
    author: "Lina Okafor",
    role: "VP Operations, Marlowe Realty",
    icon: Clock,
    accent: "var(--ai-violet)",
  },
  {
    metric: "Live in 4 days",
    quote: "I was quoted 6 months by an enterprise vendor. We had a working voice agent in production by day four.",
    author: "Daniel Reyes",
    role: "CTO, Bright Dental Group",
    icon: Rocket,
    accent: "var(--ai-magenta)",
  },
]

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(active ? target : 0)
  useEffect(() => {
    if (!active) {
      setValue(0)
      return
    }
    const controls = animate(0, target, {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(v),
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, active])
  return value
}

// Animates a displayed number from its previous value to a new one whenever
// it changes (e.g. the Monthly/Yearly toggle) — shows the exact value on
// first mount, only tweens on subsequent changes.
function useAnimatedNumber(target: number) {
  const [display, setDisplay] = useState(target)
  const prevTarget = useRef(target)
  useEffect(() => {
    if (prevTarget.current === target) return
    const from = prevTarget.current
    prevTarget.current = target
    const controls = animate(from, target, {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [target])
  return display
}

export function PricingPlans() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loadError, setLoadError] = useState<string | null>(null)
  const [cycle, setCycle] = useState<"monthly" | "yearly">("monthly")
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(`${PORTAL_BASE}/api/plans`).then((r) => r.json())
        if (!cancelled) setPlans(res.plans || [])
      } catch (e) {
        if (!cancelled) setLoadError((e as Error).message || "Could not load plans")
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const priceFor = (p: Plan) => (cycle === "yearly" ? p.yearlyAmount : p.amount)
  const yearlySavings = (p: Plan) => p.yearlySavingsUsd ?? Math.max(0, p.amount * 12 - p.yearlyAmount)

  // Display order: Starter (left) → Growth (middle) → Scale (right), regardless
  // of the order the portal API returns them in.
  const PLAN_ORDER = ["starter", "growth", "scale"]
  const ordered = useMemo(
    () => [...plans].sort((a, b) => PLAN_ORDER.indexOf(a.id) - PLAN_ORDER.indexOf(b.id)),
    [plans],
  )

  const recommendedPlan = useMemo(
    () => ordered.find((p) => p.tag) ?? ordered[0] ?? null,
    [ordered],
  )

  // Mobile plan carousel: swipeable, snap-to-card, with peeking side cards,
  // dot pagination, and prev/next arrows. Desktop keeps the 3-column grid.
  // offsetLeft is relative to the nearest *positioned* ancestor, which isn't
  // reliably the scroll container itself — use getBoundingClientRect deltas
  // instead so this works regardless of the offsetParent chain.
  const childScrollLeft = (el: HTMLDivElement, child: HTMLElement) =>
    child.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft

  const scrollToIndex = (idx: number) => {
    const el = carouselRef.current
    const child = el?.children[idx] as HTMLElement | undefined
    if (el && child) el.scrollTo({ left: childScrollLeft(el, child), behavior: "smooth" })
  }

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    const onScroll = () => {
      let closest = 0
      let min = Infinity
      Array.from(el.children).forEach((child, idx) => {
        const dist = Math.abs(childScrollLeft(el, child as HTMLElement) - el.scrollLeft)
        if (dist < min) {
          min = dist
          closest = idx
        }
      })
      setActiveIndex(closest)
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [ordered.length])

  const savingsTarget = recommendedPlan ? yearlySavings(recommendedPlan) : 0
  const animatedSavings = useCountUp(savingsTarget, cycle === "yearly" && Boolean(recommendedPlan))

  if (loadError) {
    return (
      <div className="mx-auto max-w-md rounded-lg border border-destructive/40 bg-destructive/10 p-6 text-center text-sm text-destructive">
        Couldn&apos;t load live pricing ({loadError}). Please refresh, or{" "}
        <Link href="/contact" className="underline">
          contact us
        </Link>
        .
      </div>
    )
  }

  if (plans.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading live pricing…
      </div>
    )
  }

  return (
    <div>
      {/* Billing cycle toggle */}
      <div className="mb-3 mt-6 flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 text-sm">
          <button
            type="button"
            onClick={() => setCycle("monthly")}
            className={cn(
              "rounded-full px-4 py-1.5 transition",
              cycle === "monthly" ? "bg-foreground text-background" : "text-muted-foreground",
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setCycle("yearly")}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-1.5 transition",
              cycle === "yearly" ? "bg-primary text-primary-foreground" : "text-muted-foreground",
            )}
          >
            Yearly
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px]",
                cycle === "yearly" ? "bg-white/20 text-white" : "bg-primary/10 text-primary",
              )}
            >
              Save 20%
            </span>
          </button>
        </div>
      </div>
      {cycle === "yearly" && recommendedPlan && (
        <p className="mb-8 text-center text-sm text-primary">
          Switching to yearly saves you {usd(animatedSavings)} on {recommendedPlan.label}.
        </p>
      )}
      {cycle === "monthly" && <div className="mb-8" />}

      {/* Per-second billing callout */}
      <div className="mb-8 flex justify-center px-4">
        <div className="flex flex-row items-start gap-2 rounded-full border border-primary/30 bg-primary/[0.06] px-4 py-2 text-left text-sm text-primary sm:items-center sm:text-center">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 sm:mt-0" aria-hidden />
          <span>
            <strong>Per-second billing</strong> — pay only for the seconds you use.
          </span>
        </div>
      </div>

      {/* Plan cards — 3-col grid on desktop, swipeable peek carousel on mobile */}
      <div className="hidden gap-8 md:grid md:grid-cols-3 md:gap-6 md:items-stretch lg:gap-8">
        {ordered.map((p) => (
          <PlanCard key={p.id} plan={p} cycle={cycle} price={priceFor(p)} savings={yearlySavings(p)} />
        ))}
      </div>

      <div className="md:hidden">
        <div
          ref={carouselRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-[4%] pt-3 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ordered.map((p, i) => (
            <div key={p.id} className="w-[92%] shrink-0 snap-center">
              <PlanCard
                plan={p}
                cycle={cycle}
                price={priceFor(p)}
                savings={yearlySavings(p)}
                emphasize={i === activeIndex}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous plan"
            onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            {ordered.map((p, i) => (
              <button
                key={p.id}
                type="button"
                aria-label={`Go to ${p.label}`}
                onClick={() => scrollToIndex(i)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === activeIndex ? "w-6 bg-primary" : "w-2 bg-border",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next plan"
            onClick={() => scrollToIndex(Math.min(ordered.length - 1, activeIndex + 1))}
            disabled={activeIndex === ordered.length - 1}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        All plans include real-time transcripts, recording, analytics, and unlimited test calls in the playground.
      </p>

      {/* Feature comparison table */}
      <div className="mt-16 flex justify-center">
        <span className="ai-pill-cyan">
          <span className="h-1 w-1 rounded-full bg-primary" />
          Comparison
        </span>
      </div>
      <h3 className="mt-6 text-balance text-center text-2xl font-serif font-normal tracking-tight md:text-3xl">
        Compare plans <span className="text-primary">side by side.</span>
      </h3>
      <p className="mx-auto mb-8 mt-4 max-w-xl text-pretty text-center text-sm leading-relaxed text-muted-foreground md:text-base">
        See exactly what you get at every tier — included minutes, effective rate, and support level, all in one
        view.
      </p>
      {/* Mobile: one stacked card per plan — no horizontal scroll needed */}
      <div className="space-y-4 md:hidden">
        {ordered.map((p) => (
          <div
            key={p.id}
            className="overflow-hidden rounded-2xl border border-primary/40"
          >
            <div className={cn("flex items-center justify-between px-4 py-3", p.tag ? "bg-primary/10" : "bg-card/40")}>
              <span className="font-semibold text-foreground">{p.label}</span>
              {p.tag && <span className="text-xs font-medium text-primary">{p.tag}</span>}
            </div>
            <dl>
              {COMPARISON_ROWS.map((row, i) => (
                <div
                  key={row.label}
                  className={cn(
                    "flex items-center justify-between border-t border-border/40 px-4 py-2.5 text-sm",
                    i % 2 === 1 && "bg-card/20",
                  )}
                >
                  <dt className="text-muted-foreground">{row.label}</dt>
                  <dd className="font-medium text-foreground">{row.value(p)}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      {/* Desktop: full comparison table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-border/60 md:block">
        <table className="w-full min-w-[560px] border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-card/40">
              <th className="p-4 font-medium text-muted-foreground">Feature</th>
              {ordered.map((p) => (
                <th
                  key={p.id}
                  className={cn(
                    "border-l border-border/60 p-4 text-center font-semibold text-foreground",
                    p.tag && "bg-primary/10",
                  )}
                >
                  {p.label}
                  {p.tag && <span className="ml-1.5 text-xs font-normal text-primary">{p.tag}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row, i) => (
              <tr
                key={row.label}
                className={cn("group border-b border-border/40 last:border-0", i % 2 === 1 && "bg-card/20")}
              >
                <td className="p-4 text-muted-foreground transition-colors group-hover:bg-primary/10">{row.label}</td>
                {ordered.map((p) => (
                  <td
                    key={p.id}
                    className={cn(
                      "border-l border-border/40 p-4 text-center text-foreground transition-colors group-hover:bg-primary/15",
                      p.tag && (i % 2 === 1 ? "bg-primary/10" : "bg-primary/5"),
                    )}
                  >
                    {row.value(p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Testimonials with quantified results — flips on hover, same as the how-it-works cards */}
      <div className="mt-8 grid gap-3 sm:mt-16 sm:gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((t) => {
          const Icon = t.icon
          return (
            <div key={t.author} className="group relative h-full [perspective:1200px]">
              <div className="relative h-full min-h-[160px] transition-transform duration-700 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] sm:min-h-[220px]">
                {/* FRONT — red gradient, shown at rest */}
                <div
                  className="absolute inset-0 flex h-full flex-col overflow-hidden rounded-2xl p-4 [backface-visibility:hidden] sm:p-6"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, color-mix(in oklch, var(--primary) 16%, white), color-mix(in oklch, var(--primary) 6%, white))",
                  }}
                >
                  <div className="relative flex items-start justify-between">
                    <span className="text-xs font-semibold sm:text-sm" style={{ color: t.accent }}>
                      {t.metric}
                    </span>
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg sm:h-9 sm:w-9"
                      style={{
                        background: `color-mix(in oklch, ${t.accent} 12%, transparent)`,
                        boxShadow: `0 6px 16px -4px color-mix(in oklch, ${t.accent} 45%, transparent)`,
                        color: t.accent,
                      }}
                    >
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="relative mt-2.5 text-xs leading-relaxed text-foreground sm:mt-4 sm:text-sm">&ldquo;{t.quote}&rdquo;</p>
                  <p className="relative mt-2.5 text-[11px] text-muted-foreground sm:mt-4 sm:text-xs">
                    {t.author} · {t.role}
                  </p>
                </div>

                {/* BACK — white card, revealed on hover */}
                <div className="step-card card-glow absolute inset-0 flex h-full flex-col overflow-hidden rounded-2xl bg-white p-4 [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-6">
                  <span className="scan-line" aria-hidden />
                  <div className="relative flex items-start justify-between">
                    <span className="text-xs font-semibold sm:text-sm" style={{ color: t.accent }}>
                      {t.metric}
                    </span>
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white sm:h-9 sm:w-9"
                      style={{
                        background: "var(--primary)",
                        boxShadow: "0 6px 16px -4px color-mix(in oklch, var(--primary) 45%, transparent)",
                      }}
                    >
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="relative mt-2.5 text-xs leading-relaxed text-foreground sm:mt-4 sm:text-sm">&ldquo;{t.quote}&rdquo;</p>
                  <p className="relative mt-2.5 text-[11px] text-muted-foreground sm:mt-4 sm:text-xs">
                    {t.author} · {t.role}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PlanCard({
  plan: p,
  cycle,
  price,
  savings,
  emphasize = false,
}: {
  plan: Plan
  cycle: "monthly" | "yearly"
  price: number
  savings: number
  emphasize?: boolean
}) {
  const featured = Boolean(p.tag)
  const animatedPrice = useAnimatedNumber(price)

  return (
    <Card
      className={cn(
        "flex h-full flex-col shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-white/10",
        featured
          ? "ring-2 ring-primary shadow-xl transform md:scale-[1.02] hover:scale-[1.04] dark:ring-primary/80 dark:shadow-primary/20"
          : "hover:ring-2 hover:ring-primary hover:shadow-primary/20",
        emphasize && "ring-2 ring-primary shadow-xl scale-[1.02]",
      )}
    >
      <CardHeader className="px-4 md:px-6">
        <div className="flex items-start justify-between">
          <CardTitle className="text-2xl font-bold">{p.label}</CardTitle>
          {p.tag && (
            <span className="whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              {p.tag}
            </span>
          )}
        </div>
        <CardDescription className="mt-1 text-sm">{p.sub}</CardDescription>
        <div className="mt-4">
          <p className="text-4xl font-extrabold text-foreground">
            {usd(animatedPrice)}
            <span className="ml-1 text-base font-normal text-muted-foreground">
              /{cycle === "yearly" ? "yr" : "mo"}
            </span>
          </p>
          {cycle === "yearly" && <p className="mt-1 text-xs text-muted-foreground">Save {usd(savings)} vs monthly</p>}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col px-4 md:px-6">
        <div className="mb-4 text-xs text-muted-foreground">
          {p.min.toLocaleString("en-US")} min · {usd(p.rate)}/min ·{" "}
          {p.agents >= 999 ? "Unlimited" : `${p.agents} agents`}
        </div>
        <StaggerGroup className="mb-6 flex-1 list-none space-y-0">
          {p.perks
            .filter((perk) => !/phone number|concurrent call/i.test(perk))
            .map((perk) => (
              <StaggerItem key={perk}>
                <div className="flex items-start space-x-3 py-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-sm text-foreground">{perk}</span>
                </div>
              </StaggerItem>
            ))}
        </StaggerGroup>
        <Button
          asChild
          size="lg"
          className={cn(
            "w-full rounded-full transition-all duration-200",
            featured
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 dark:shadow-primary/40"
              : "border border-input bg-muted text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground",
          )}
        >
          <Link href={`/get-started?plan=${p.id}&cycle=${cycle}`}>{featured ? `Choose ${p.label}` : "Get started"}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
