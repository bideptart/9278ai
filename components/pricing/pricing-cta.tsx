import { CtaPanel } from "@/components/ui/cta-panel"

export function PricingCta() {
  return (
    <CtaPanel
      title={
        <>
          Try before you commit. <span className="text-primary">Talk to our agent now.</span>
        </>
      }
      description="See latency, voice quality, and conversation flow firsthand — then start only if you love it."
      primary={{ label: "Get started", href: "/get-started", icon: "arrow" }}
      secondary={{ label: "Talk to an agent", href: "/#cta", variant: "outline" }}
    />
  )
}
