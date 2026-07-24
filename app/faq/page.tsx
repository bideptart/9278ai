import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { FaqExplorer } from "@/components/faq/faq-explorer"
import { FaqCta } from "@/components/faq/faq-cta"
import { FAQ_GROUPS, FLAT_FAQ } from "@/lib/faq"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"

export const metadata: Metadata = pageSeo({
  title: "Frequently asked questions",
  description:
    "Answers on pricing, voice credit expiry, phone numbers, AI agents, compliance, and account access at 9278.ai.",
  path: "/faq",
})

export default function FaqPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ]}
      />
      <FaqJsonLd items={FLAT_FAQ} />

      <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden border-b border-border/50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(220,38,38,0.10),transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        />
        <div className="relative mx-auto w-full max-w-4xl px-4 md:px-6">
          <ScrollReveal className="text-center">
            <span className="ai-pill-magenta">
              <span className="h-1 w-1 rounded-full bg-accent" />
              FAQ
            </span>
            <h1 className="mt-6 text-balance text-4xl font-serif font-normal tracking-tight md:text-6xl">
              Everything you <span className="text-primary">wanted to know.</span>
            </h1>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Pricing, credit expiry, phone numbers, compliance, and account access — all in one place. Still stuck?
              The team replies within an hour during business days.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <FaqExplorer groups={FAQ_GROUPS} />

      <FaqCta />

      <RelatedLinks
        variant="flip"
        heading="Keep reading"
        description="The pages most teams visit right after the FAQ."
        links={[
          {
            href: "/pricing",
            title: "Pricing & per-minute rates",
            description: "Compare Starter, Growth and Scale top-ups and see the full phone-number rate card.",
          },
          {
            href: "/industries",
            title: "Industries — pre-tuned playbooks",
            description: "Real estate, dental, healthcare, home services, restaurants, automotive, and more.",
          },
          {
            href: "/get-started",
            title: "Get started in under 5 minutes",
            description: "Pick a plan, optionally add a phone number, and start a real test call.",
          },
        ]}
      />

      <SiteFooter />
    </main>
  )
}
