"use client"

// Marketing /pricing plan grid. Fetches the SAME live plans the get-started
// signup widget uses (https://voice.9278.ai/api/plans), so any pricing update
// in the portal is reflected here automatically. Each card deep-links into
// /get-started?plan=<id>&cycle=<cycle>, where checkout is completed.

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
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
      <div className="mb-3 mt-40 flex justify-center">
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
        <div className="flex flex-col items-center gap-1 rounded-2xl border border-primary/30 bg-primary/[0.06] px-4 py-3 text-center text-sm text-primary sm:flex-row sm:gap-2 sm:rounded-full sm:py-2">
          <span aria-hidden>⏱️</span>
          <span>
            <strong>Per-second billing</strong> — pay only for the seconds you use.
          </span>
        </div>
      </div>

      {/* Plan cards — 3-col grid on desktop, swipeable peek carousel on mobile */}
      <div className="hidden gap-8 md:grid md:grid-cols-3 md:gap-6 md:items-stretch lg:gap-8">
        {ordered.map((p) => renderCard(p))}
      </div>

      <div className="md:hidden">
        <div
          ref={carouselRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-[4%] pt-3 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ordered.map((p, i) => (
            <div key={p.id} className="w-[92%] shrink-0 snap-center">
              {renderCard(p, i === activeIndex)}
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
    </div>
  )

  function renderCard(p: Plan, emphasize = false) {
    const price = priceFor(p)
    const featured = Boolean(p.tag)
    return (
      <Card
        key={p.id}
        className={cn(
          "flex h-full flex-col shadow-md transition-all duration-300 hover:shadow-lg dark:hover:shadow-white/10",
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
              {usd(price)}
              <span className="ml-1 text-base font-normal text-muted-foreground">
                /{cycle === "yearly" ? "yr" : "mo"}
              </span>
            </p>
            {cycle === "yearly" && (
              <p className="mt-1 text-xs text-muted-foreground">Save {usd(yearlySavings(p))} vs monthly</p>
            )}
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
            <Link href={`/get-started?plan=${p.id}&cycle=${cycle}`}>
              {featured ? `Choose ${p.label}` : "Get started"}
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }
}
