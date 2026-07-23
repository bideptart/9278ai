"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CtaCard } from "@/components/ui/cta-card"

export function PricingCta() {
  return (
    <CtaCard
      title="Try before you commit. Talk to our agent now."
      description="See latency, voice quality, and conversation flow firsthand — then start only if you love it."
      imageSrc="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=2000"
      imageClassName="grayscale"
      overlayClassName="[background-image:linear-gradient(to_bottom_right,rgba(0,0,0,0.95),var(--primary))]"
      actions={
        <>
          <Button
            asChild
            size="lg"
            className="h-14 rounded-full border border-black bg-white px-8 text-base text-black hover:bg-neutral-200"
          >
            <Link href="/get-started">Get started</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-14 rounded-full border-white/30 bg-white/10 px-8 text-base text-white hover:bg-white/20"
          >
            <Link href="/#cta">Talk to an agent</Link>
          </Button>
        </>
      }
    />
  )
}
