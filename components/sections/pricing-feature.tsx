"use client"

import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PricingPlans } from "@/components/pricing/pricing-plans"

export function PricingFeature() {
  return (
    <section id="pricing" className="relative overflow-hidden border-t border-border/40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[300px] bg-[radial-gradient(60%_60%_at_50%_0%,oklch(0.577_0.245_27.33/0.05),transparent_70%)]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-10 md:px-6 md:pb-10 md:pt-14">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="ai-pill-violet">
            <span className="h-1 w-1 rounded-full bg-accent" />
            Pricing
          </span>
          <h2 className="mt-6 text-balance text-4xl font-serif font-normal leading-[1.1] tracking-tight md:text-5xl">
            Fair pricing.{" "}
            <span className="text-primary">Pay only for what you talk.</span>
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground md:text-lg">
            Voice from $0.10 per minute. Top up with $20, $50, or $100 of credit, unlock up to 3 concurrent AI agents,
            and scale from a single line to a full call center — no contracts, no surprises.
          </p>
        </ScrollReveal>

        <div className="mt-10">
          <PricingPlans />
        </div>
      </div>
    </section>
  )
}
