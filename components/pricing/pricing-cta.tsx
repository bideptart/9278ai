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
      imageClassName="hidden"
      overlayClassName="[background-image:radial-gradient(circle_at_top_right,white,transparent_60%),linear-gradient(135deg,color-mix(in_oklch,var(--primary)_16%,white),color-mix(in_oklch,var(--primary)_6%,white))]"
      textClassName="text-neutral-900"
      descriptionClassName="text-neutral-500"
      actions={
        <>
          <Button
            asChild
            size="lg"
            className="h-11 w-48 rounded-full border border-black bg-black px-6 text-sm text-white hover:bg-neutral-800 sm:h-14 sm:w-auto sm:px-8 sm:text-base"
          >
            <Link href="/get-started">Get started</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-11 w-48 rounded-full border-black/15 bg-black/5 px-6 text-sm text-black hover:bg-black/10 sm:h-14 sm:w-auto sm:px-8 sm:text-base"
          >
            <Link href="/#cta">Talk to an agent</Link>
          </Button>
        </>
      }
    />
  )
}
