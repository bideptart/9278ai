import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Features } from "@/components/sections/features"
import { CtaPanel } from "@/components/ui/cta-panel"
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

        <CtaPanel
          title={
            <>
              Ready to hear it <span className="text-primary">for yourself?</span>
            </>
          }
          description="Spin up an agent in minutes and place a real test call — no credit card to try."
          primary={{ label: "Get started", href: "/get-started", icon: "arrow" }}
          secondary={{ label: "View pricing", href: "/pricing", variant: "outline" }}
        />

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
