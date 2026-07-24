"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CtaCard } from "@/components/ui/cta-card"

export function IndustriesCta() {
  return (
    <CtaCard
      title="Don't see your industry?"
      description="We've deployed agents in security, recruiting, property management, insurance, finance, and more. Tell us what calls eat your day and we'll have a prototype in 48 hours."
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
            <Link href="/get-started">
              Get started <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-11 w-48 rounded-full border-black/15 bg-black/5 px-6 text-sm text-black hover:bg-black/10 sm:h-14 sm:w-auto sm:px-8 sm:text-base"
          >
            <Link href="/pricing">View pricing</Link>
          </Button>
        </>
      }
    />
  )
}
