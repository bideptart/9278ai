import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Building2, PhoneIncoming, PhoneCall, Rocket } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"
import { AmbientGlow } from "@/components/industries/ambient-glow"
import { CountUpStat } from "@/components/industries/count-up-stat"
import { HeroPreviewCard } from "@/components/industries/hero-preview-card"
import { IndustryRow } from "@/components/industries/industry-row"
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

const STATS = [
  { value: 10, prefix: "", suffix: "", decimals: 0, label: "Industries covered", icon: Building2 },
  { value: 3, prefix: "<", suffix: "s", decimals: 0, label: "First-ring pickup", icon: PhoneIncoming },
  { value: 2.4, prefix: "", suffix: "M+", decimals: 1, label: "Calls handled monthly", icon: PhoneCall },
  { value: 5, prefix: "", suffix: " min", decimals: 0, label: "To go live", icon: Rocket },
]

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
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8">
            <ScrollReveal className="lg:col-span-7">
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

              <div className="mt-16" /> {/* Add spacing to push stat boxes down */}
              <StaggerGroup
                className="mt-4 grid grid-cols-2 gap-4 border-t border-border/40 pt-6"
                stagger={0.08}
              >
                {STATS.map((s) => {
                  const StatIcon = s.icon
                  return (
                    <StaggerItem key={s.label}>
                      <div className="group relative flex items-center gap-3 overflow-hidden rounded-xl p-3.5 transition-transform duration-300 hover:-translate-y-1 w-full min-h-[70px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                        <span
                          aria-hidden
                          className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-primary/0 blur-xl transition-all duration-500 group-hover:bg-primary/20"
                        />
                        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/15 text-primary ring-1 ring-primary/30 transition-all group-hover:ring-primary/50">
                          <StatIcon
                            className="size-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                            aria-hidden
                          />
                        </span>
                        <div className="relative min-w-0 flex-1">
                          <p className="font-serif text-xl text-primary">
                            <CountUpStat value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                          </p>
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  )
                })}
              </StaggerGroup>
            </ScrollReveal>

            <ScrollReveal delay={0.15} className="lg:col-span-5 flex justify-center items-start">
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

      <section className="mx-auto w-full max-w-7xl px-4 py-24 md:px-6">
        <div className="relative overflow-hidden rounded-[28px] px-6 py-10 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.5)] md:px-12 md:py-12" 
             style={{
               background: 'linear-gradient(90deg, #0f0404 0%, #2b0606 30%, #3f0909 50%, #2b0606 70%, #0f0404 100%)'
             }}>
          {/* More visible grid pattern */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,100,100,0.2) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,100,100,0.2) 1px, transparent 1px)
              `,
              backgroundSize: '35px 35px'
            }}
          />
          
          {/* Enhanced red glow accents */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 left-1/4 h-52 w-52 rounded-full bg-red-500/40 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-1/4 h-52 w-52 rounded-full bg-red-500/30 blur-3xl"
          />
          
          {/* More prominent border accents */}
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[28px] border border-red-500/40" />
          <div aria-hidden className="pointer-events-none absolute inset-3 rounded-[20px] border border-red-500/20" />
          <div aria-hidden className="pointer-events-none absolute inset-6 rounded-[14px] border border-white/10" />

          <div className="relative flex flex-col items-center gap-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div className="max-w-2xl">
              <h3 className="text-balance font-serif text-4xl font-normal leading-[1.1] tracking-tight text-white md:text-5xl">
                Don&apos;t see your industry?
              </h3>
              <div aria-hidden className="mt-4 flex items-center justify-center gap-2 md:justify-start">
                <span className="h-px w-16 bg-gradient-to-r from-transparent via-red-400 to-transparent" />
                <span className="size-3 rotate-45 bg-red-500" />
                <span className="h-px w-16 bg-gradient-to-l from-transparent via-red-400 to-transparent" />
              </div>
              <p className="mt-5 text-pretty leading-relaxed text-white/85 text-lg">
                We&apos;ve deployed agents in security, recruiting, property management, insurance, finance, and
                more. Tell us what calls eat your day and we&apos;ll have a prototype in 48 hours.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                asChild
                size="lg"
                className="group/btn relative h-14 overflow-hidden rounded-full bg-red-600 px-8 text-lg font-semibold text-white hover:bg-red-500 shadow-[0_6px_30px_-10px_rgba(220,38,38,0.7)] transition-all duration-300"
              >
                <Link href="/get-started">
                  <span className="relative z-10">Get started</span>
                  <ArrowRight className="relative z-10 ml-2 size-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full border-2 border-white/40 bg-white/5 px-8 text-lg font-semibold text-white backdrop-blur-md hover:bg-white/10 hover:border-white/60 transition-all duration-300"
              >
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <RelatedLinks
        heading="Related guides"
        description="Explore pricing, FAQs, and the get-started flow used by thousands of teams."
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
