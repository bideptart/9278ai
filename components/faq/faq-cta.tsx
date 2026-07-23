"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CtaCard } from "@/components/ui/cta-card"

// Same red/black theme as the pricing page CTA — content and buttons stay FAQ's own.
export function FaqCta() {
  return (
    <CtaCard
      title="Still have a question?"
      description="Talk to a live 9278.ai agent — yes, that's actually how we do support — or book 20 minutes with a solutions engineer."
      imageSrc="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=2000"
      imageClassName="hidden"
      overlayClassName="[background-image:radial-gradient(circle_at_top_right,white,transparent_60%),linear-gradient(135deg,color-mix(in_oklch,var(--primary)_16%,white),color-mix(in_oklch,var(--primary)_6%,white))]"
      textClassName="text-neutral-900"
      descriptionClassName="text-neutral-500"
      actions={
        <>
          <Button asChild size="lg" className="h-14 rounded-full border border-black bg-black px-8 text-base text-white hover:bg-neutral-800">
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
        </>
      }
    />
  )
}
