import { CtaPanel } from "@/components/ui/cta-panel"

export function IndustriesCta() {
  return (
    <CtaPanel
      title={
        <>
          Don&apos;t see <span className="text-primary">your industry?</span>
        </>
      }
      description="We've deployed agents in security, recruiting, property management, insurance, finance, and more. Tell us what calls eat your day and we'll have a prototype in 48 hours."
      primary={{ label: "Get started", href: "/get-started", icon: "arrow" }}
      secondary={{ label: "View pricing", href: "/pricing", variant: "outline" }}
    />
  )
}
