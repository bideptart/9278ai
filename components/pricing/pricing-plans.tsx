"use client"

// Marketing /pricing plan grid. Fetches the SAME live plans the get-started
// signup widget uses (https://voice.9278.ai/api/plans), so any pricing update
// in the portal is reflected here automatically. Each card deep-links into
// /get-started?plan=<id>&cycle=<cycle>, where checkout is completed.

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Check, Loader2 } from "lucide-react"
import { animate } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"
import { cn } from "@/lib/utils"

const PORTAL_BASE = "https://voice.9278.ai"

// Assumed average call length, used only to turn the "calls per month" slider
// into estimated minutes for the plan recommendation. Not billing-accurate.
const AVG_CALL_MINUTES = 4
const SLIDER_MIN = 50
const SLIDER_MAX = 3000

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
  const [calls, setCalls] = useState(300)

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

  const estimatedMinutes = calls * AVG_CALL_MINUTES
  // Split the slider's own range into equal thirds so Starter, Growth, and
  // Scale are each reachable — comparing against the plans' real minute
  // thresholds made Growth's recommendation window a sliver of the range.
  const recommendedPlan = useMemo(() => {
    if (!ordered.length) return null
    const third = (SLIDER_MAX - SLIDER_MIN) / ordered.length
    const idx = Math.min(ordered.length - 1, Math.floor((calls - SLIDER_MIN) / third))
    return ordered[idx]
  }, [ordered, calls])

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
      {/* Usage slider — recommends a plan and highlights it below */}
      <div className="card-glow mx-auto mb-10 max-w-xl rounded-2xl p-6 md:max-w-2xl">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-medium">How many calls do you get?</span>
          <span className="text-muted-foreground">~{calls.toLocaleString()} calls/mo</span>
        </div>
        <Slider
          value={[calls]}
          min={SLIDER_MIN}
          max={SLIDER_MAX}
          step={50}
          onValueChange={(v) => setCalls(v[0])}
        />
        {recommendedPlan && (
          <p className="mt-3 text-center text-sm text-muted-foreground">
            At ~{estimatedMinutes.toLocaleString()} min/mo, we&apos;d recommend{" "}
            <span className="font-medium text-primary">{recommendedPlan.label}</span>.
          </p>
        )}
      </div>

      {/* Billing cycle toggle */}
      <div className="mb-3 flex justify-center">
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
      <div className="mb-8 flex justify-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/[0.06] px-4 py-2 text-sm text-primary">
          <span>⏱️</span>
          <span>
            <strong>Per-second billing</strong> — pay only for the seconds you use.
          </span>
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid gap-8 md:grid-cols-3 md:gap-6 md:items-stretch lg:gap-8">
        {ordered.map((p) => {
          const price = priceFor(p)
          const featured = Boolean(p.tag)
          return (
            <Card
              key={p.id}
              className={cn(
                "flex flex-col shadow-md transition-all duration-300 hover:shadow-lg dark:hover:shadow-white/10",
                featured
                  ? "ring-2 ring-primary shadow-xl transform md:scale-[1.02] hover:scale-[1.04] dark:ring-primary/80 dark:shadow-primary/20"
                  : "hover:ring-2 hover:ring-primary hover:shadow-primary/20",
              )}
            >
              <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-bold">{p.label}</CardTitle>
                  {p.tag && (
                    <span className="whitespace-nowrap rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                      {p.tag}
                    </span>
                  )}
                </div>
                <CardDescription className="mt-0.5 text-xs">{p.sub}</CardDescription>
                <div className="mt-2">
                  <p className="text-2xl font-extrabold text-foreground">
                    {usd(price)}
                    <span className="ml-1 text-xs font-normal text-muted-foreground">
                      /{cycle === "yearly" ? "yr" : "mo"}
                    </span>
                  </p>
                  {cycle === "yearly" && (
                    <p className="mt-0.5 text-[11px] text-muted-foreground">Save {usd(yearlySavings(p))} vs monthly</p>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col p-4 pt-0">
                <div className="mb-2 text-[11px] text-muted-foreground">
                  {p.min.toLocaleString("en-US")} min · {usd(p.rate)}/min ·{" "}
                  {p.agents >= 999 ? "Unlimited" : `${p.agents} agents`}
                </div>
                <StaggerGroup className="mb-3 flex-1 list-none space-y-0">
                  {p.perks
                    .filter((perk) => !/phone number|concurrent call/i.test(perk))
                    .map((perk) => (
                      <StaggerItem key={perk}>
                        <div className="flex items-start space-x-2 py-1">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                          <span className="text-xs text-foreground">{perk}</span>
                        </div>
                      </StaggerItem>
                    ))}
                </StaggerGroup>
                <Button
                  asChild
                  size="sm"
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
        })}
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        All plans include real-time transcripts, recording, analytics, and unlimited test calls in the playground.
      </p>
    </div>
  )
}
