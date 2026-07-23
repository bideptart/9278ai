"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CtaCard } from "@/components/ui/cta-card"

// Grey/charcoal variant of the CTA card, kept separate from the red one used
// on /pricing per request.
export function FaqCta() {
  return (
    <CtaCard
      title="Still have a question?"
      description="Talk to a live 9278.ai agent — yes, that's actually how we do support — or book 20 minutes with a solutions engineer."
      imageSrc="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=2000"
      imageClassName="saturate-[0.25] contrast-[1.02] brightness-[0.95]"
      overlayClassName="bg-gradient-to-br from-black/90 via-neutral-700/70 to-neutral-500/60"
      actions={
        <>
          <Button asChild size="lg" className="h-13 rounded-full bg-neutral-200 px-8 text-base text-neutral-900 hover:bg-white">
            <Link href="/get-started">Get started</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-13 rounded-full border-white/25 bg-transparent px-8 text-base text-white hover:border-white/40 hover:bg-white/5"
          >
            <Link href="/pricing">View pricing</Link>
          </Button>
        </>
      }
    />
  )
}
