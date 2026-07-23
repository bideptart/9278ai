import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Features } from "@/components/sections/features"
import { Button } from "@/components/ui/button"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"

export const metadata: Metadata = pageSeo({
  title: "Features",
  description:
    "Sub-300ms latency, carrier-grade telephony, multilingual voices, tools & function calling, live transfer, transcripts, compliance and more — everything you need to ship a real-world AI voice agent.",
  path: "/features",
})

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
        ]}
      />

      <main className="flex-1">
        <Features />

        <section className="mx-auto w-full max-w-6xl px-4 pb-24 md:px-6">
          <div className="rounded-[28px] border border-primary/35 px-6 py-12 shadow-[0_24px_60px_-20px_color-mix(in_oklch,var(--primary)_28%,transparent),0_8px_20px_-8px_color-mix(in_oklch,var(--primary)_16%,transparent)] md:px-12 md:py-14 [background-image:radial-gradient(circle_at_top_right,white,transparent_60%),linear-gradient(135deg,color-mix(in_oklch,var(--primary)_16%,white),color-mix(in_oklch,var(--primary)_6%,white))]">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h3 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                  Ready to hear it for yourself?
                </h3>
                <p className="mt-3 text-muted-foreground">
                  Spin up an agent in minutes and place a real test call — no credit card to try.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-14 rounded-full border border-black bg-black px-8 text-base text-white hover:bg-neutral-800"
                >
                  <Link href="/get-started">Get started</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-full border-black/15 bg-black/5 px-8 text-base text-black hover:bg-black/10"
                >
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <RelatedLinks
          heading="Keep exploring"
          description="Where teams head next after the feature tour."
          variant="flip"
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
              href: "/faq",
              title: "Frequently asked questions",
              description: "Pricing, credits, phone numbers, compliance and account access — answered.",
            },
          ]}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
