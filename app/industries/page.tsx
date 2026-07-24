import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { AmbientGlow } from "@/components/industries/ambient-glow"
import { HeroPreviewCard } from "@/components/industries/hero-preview-card"
import { HeroStats } from "@/components/industries/hero-stats"
import { IndustryRow } from "@/components/industries/industry-row"
import { IndustriesCta } from "@/components/industries/industries-cta"
import { Industries } from "@/components/sections/industries"
import { INDUSTRIES } from "@/lib/industries"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"

export const metadata: Metadata = pageSeo({
  title: "Industries we power",
  description:
    "Pre-tuned AI voice agents for real estate, dental, healthcare, home services, restaurants, automotive, legal, education, e-commerce, and fitness — live in under 5 minutes.",
  path: "/industries",
})

export default function IndustriesPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ]}
      />

      <section className="relative overflow-hidden border-b border-border/50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(220,38,38,0.10),transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        />
        <AmbientGlow />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
            <ScrollReveal className="lg:col-span-6">
              <span className="ai-pill-magenta">
                <span className="h-1 w-1 rounded-full bg-accent" />
                Industries
              </span>
              <h1 className="mt-6 text-balance text-4xl font-serif font-normal leading-[1.05] tracking-tight md:text-6xl">
                Built for every kind of <span className="text-primary">phone call.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-sm leading-snug text-muted-foreground md:text-base">
                Pre-tuned scripts, integrations, and compliance guardrails for ten industries — and a configurable
                engine for everything else. Pick the workflow closest to yours and we&apos;ll have you live in under
                5 minutes.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="group btn-ai h-12 rounded-full px-7">
                  <Link href="/get-started">
                    Get started <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-border/70 bg-card/30 px-7 backdrop-blur-md hover:border-primary/50 hover:bg-card/50"
                >
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>

              <HeroStats />
            </ScrollReveal>

            <ScrollReveal delay={0.15} className="flex items-center justify-center lg:col-span-6 lg:justify-end lg:self-start lg:translate-x-8 xl:translate-x-16">
              <HeroPreviewCard />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Industries />

      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        {INDUSTRIES.map((industry, i) => (
          <IndustryRow key={industry.slug} slug={industry.slug} index={i} reverse={i % 2 === 1} />
        ))}
      </div>

      <Ornament />

      <IndustriesCta />

      <RelatedLinks
        heading="Related guides"
        description="Explore pricing, FAQs, and the get-started flow used by thousands of teams."
        variant="flip"
        links={[
          {
            href: "/pricing",
            title: "Pricing — voice from $0.10/min",
            description: "Three top-up tiers, transparent rates, and per-region phone-number pricing.",
          },
          {
            href: "/faq",
            title: "FAQ — credit, numbers, compliance",
            description: "60-day credit, monthly DIDs, HIPAA, TCPA, supported languages, and more.",
          },
          {
            href: "/get-started",
            title: "Launch your first agent",
            description: "Pick a plan, optionally provision a phone number, and you’re live in minutes.",
          },
        ]}
      />

      <SiteFooter />
    </main>
  )
}

function Ornament() {
  return (
    <div aria-hidden className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-4 md:px-6">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
      <span className="size-1.5 rotate-45 bg-primary/40" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
    </div>
  )
}
