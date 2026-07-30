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
import { IndustryThread } from "@/components/industries/industry-thread"
import { IndustryPipeline } from "@/components/industries/industry-pipeline"
import { IndustryTicker } from "@/components/industries/industry-ticker"
import { MobileIndustryExplorer } from "@/components/industries/mobile-industry-explorer"
import { IndustriesCta } from "@/components/industries/industries-cta"
import { Industries } from "@/components/sections/industries"
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
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-12 pt-4 md:px-6 md:pb-16 md:pt-6">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8">
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
                <Button
                  asChild
                  size="lg"
                  className="group h-12 rounded-full bg-neutral-900 px-7 text-sm font-medium text-white hover:bg-neutral-800 has-[>svg]:px-7 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                >
                  <Link href="/get-started">
                    Get started <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border border-neutral-300 bg-white px-7 text-sm font-medium text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50 dark:border-white/20 dark:bg-transparent dark:text-white dark:hover:border-white/40 dark:hover:bg-white/5"
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

      <div className="py-8 sm:hidden">
        <MobileIndustryExplorer />
      </div>

      {/* Four long-form sections, each with its own composition — the two-column
          reel, a live transcript, a dispatch pipeline and an inbound ticker.
          The remaining industries are covered by the grid above and their own
          playbook pages. */}
      <div className="mx-auto hidden w-full max-w-6xl px-4 sm:block md:px-6">
        <IndustryRow slug="real-estate" index={0} />
        <IndustryThread slug="healthcare" index={1} />
        <IndustryPipeline slug="home-services" index={2} />
        <IndustryTicker slug="restaurants" index={3} />
      </div>

      <Ornament />

      <IndustriesCta />

      <RelatedLinks
        heading="Related guides"
        description="Explore pricing, FAQs, and the get-started flow used by thousands of teams."
        variant="flip"
        showNumber={false}
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
