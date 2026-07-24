import { CtaPanel } from "@/components/ui/cta-panel"

export function FaqCta() {
  return (
    <CtaPanel
      title={
        <>
          Still have <span className="text-primary">a question?</span>
        </>
      }
      description="Talk to a live 9278.ai agent — yes, that's actually how we do support — or book 20 minutes with a solutions engineer."
      primary={{ label: "Get started", href: "/get-started", icon: "arrow" }}
      secondary={{ label: "View pricing", href: "/pricing", variant: "outline" }}
    />
  )
}
