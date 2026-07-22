import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PricingPlans } from "@/components/pricing/pricing-plans"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FAQ_GROUPS } from "@/lib/faq"

export const metadata: Metadata = pageSeo({
  title: "Pricing — AI voice agents",
  description:
    "Simple, per-second voice pricing. Monthly or yearly plans with included minutes, multiple AI agents, and a phone number included. The same live pricing as get-started.",
  path: "/pricing",
})

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>
}) {
  const { canceled } = await searchParams
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ]}
      />

      {canceled && (
        <div className="border-b border-border/60 bg-card/40">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 text-sm text-muted-foreground md:px-6">
            <p>Checkout was canceled. You can pick a plan again whenever you&apos;re ready.</p>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(220,38,38,0.10),transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        />
        <div className="relative mx-auto w-full max-w-3xl px-4 py-20 text-center md:px-6 md:py-24">
          <ScrollReveal>
            <span className="ai-pill-magenta">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Pricing
            </span>
            <h1 className="mt-6 text-balance text-4xl font-serif font-normal leading-[1.05] tracking-tight md:text-6xl">
              Pricing built for <span className="text-primary">real conversations.</span>
            </h1>
            <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Per-second voice billing, included minutes, and a phone number in every plan. Pick a plan here and finish
              in seconds on get-started.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Live plans — same source as get-started */}
      <section id="plans" className="mx-auto w-full max-w-6xl px-4 pt-6 pb-16 md:px-6 md:pt-8 md:pb-20">
        <PricingPlans />
      </section>

      {/* Billing FAQ */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <ScrollReveal>
          <h2 className="text-balance text-center text-4xl font-serif font-normal leading-[1.1] tracking-tight md:text-5xl">
            Billing questions, <span className="text-primary">answered.</span>
          </h2>
          <p className="mx-auto mb-8 mt-4 max-w-xl text-pretty text-center text-sm leading-relaxed text-muted-foreground md:text-base">
            Straight answers on credit, billing cycles, and what happens when your minutes run out — no jargon, no
            surprise charges.
          </p>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {(FAQ_GROUPS.find((g) => g.id === "billing")?.items ?? [])
              .filter((item) =>
                [
                  "How does pricing work?",
                  "Do my voice minutes expire?",
                  "Are there any hidden fees?",
                  "Do you offer refunds?",
                  "Can I top up more than $100?",
                ].includes(item.q),
              )
              .map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="card-glow rounded-2xl border-0 px-5 transition-colors data-[state=open]:border data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline data-[state=open]:text-primary">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-pretty leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-24 md:px-6">
        <ScrollReveal className="rounded-2xl border border-border/60 bg-card/30 px-6 py-12 md:px-12 md:py-14">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h3 className="text-balance text-2xl font-serif font-normal tracking-tight md:text-3xl">
                Try before you commit. Talk to our agent now.
              </h3>
              <p className="mt-3 text-muted-foreground">
                See latency, voice quality, and conversation flow firsthand — then start only if you love it.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="btn-ai rounded-full text-primary-foreground">
                <Link href="/get-started">Get started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/#cta">Talk to an agent</Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <RelatedLinks
        variant="flip"
        heading="More on 9278.ai"
        description="Industry playbooks, FAQs, and the get-started flow."
        links={[
          {
            href: "/industries",
            title: "Industries we power",
            description: "Pre-tuned voice agents for ten verticals — and a configurable engine for everything else.",
          },
          {
            href: "/faq",
            title: "FAQ — billing, credit & compliance",
            description: "How credit, phone numbers, and concurrency work in practice.",
          },
          {
            href: "/get-started",
            title: "Launch your first agent",
            description: "Pick a plan, optionally add a number, and you’re live in minutes.",
          },
        ]}
      />

      <SiteFooter />
    </main>
  )
}
