"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
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

        <ScrollReveal className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="group btn-ai h-12 rounded-full px-7 transition-all">
            <Link href="/pricing">
              View full pricing
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-border/70 bg-card/30 px-7 backdrop-blur-md hover:border-primary/50">
            <Link href="/get-started">Get started</Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}
