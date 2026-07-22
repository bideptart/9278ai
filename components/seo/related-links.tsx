"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type RelatedLink = {
  href: string
  title: string
  description: string
}

// Rotates through the site's existing red-family accent tokens (already
// used for the homepage's "01/02/03" step cards) for the flip-card back face.
const ACCENTS = ["var(--ai-cyan)", "var(--ai-violet)", "var(--ai-magenta)"]

// Tailwind v4 drops the group-hover:/group-focus-visible: variant prefix when
// combined with an arbitrary `transform:` property, compiling it into an
// unconditional rule (always rotated). Driving the flip from React state
// instead of a CSS-only :hover selector sidesteps that entirely.
function FlipCard({ link, index }: { link: RelatedLink; index: number }) {
  const [flipped, setFlipped] = useState(false)
  const number = String(index + 1).padStart(2, "0")
  const accent = ACCENTS[index % ACCENTS.length]

  const glow = (color: string, corner1: string, corner2: string) => ({
    backgroundImage: `radial-gradient(circle at ${corner1}, color-mix(in oklch, ${color} 45%, transparent) 0%, transparent 28%), radial-gradient(circle at ${corner2}, color-mix(in oklch, ${color} 45%, transparent) 0%, transparent 28%)`,
  })

  const CardFace = ({ tint }: { tint: string }) => (
    <div className="flex h-full w-full flex-col justify-between p-6">
      <div className="flex items-start justify-between">
        <span className="text-6xl font-bold leading-none" style={{ color: `color-mix(in oklch, ${tint} 20%, transparent)` }}>
          {number}
        </span>
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `color-mix(in oklch, ${tint} 10%, transparent)` }}
        >
          <ArrowUpRight className="h-4 w-4" style={{ color: tint }} aria-hidden />
        </span>
      </div>
      <div>
        <p className="text-xl font-bold tracking-tight text-neutral-900">{link.title}</p>
        <p className="mt-2 text-sm leading-relaxed text-neutral-500">{link.description}</p>
      </div>
    </div>
  )

  return (
    <li style={{ perspective: "1200px" }}>
      <Link
        href={link.href}
        className="relative block h-56 w-full outline-none transition-transform duration-700 will-change-transform"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        onFocus={() => setFlipped(true)}
        onBlur={() => setFlipped(false)}
      >
        {/* Front face — white card, red corner glows (top-right / bottom-left) */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl bg-white"
          style={{
            ...glow("#DC2626", "100% 0%", "0% 100%"),
            boxShadow: "0 8px 24px -12px rgba(0,0,0,0.18)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <CardFace tint="#DC2626" />
        </div>
        {/* Back face — same layout, per-card accent glow mirrored to the opposite corners */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl bg-white"
          style={{
            ...glow(accent, "0% 0%", "100% 100%"),
            boxShadow: "0 8px 24px -12px rgba(0,0,0,0.18)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <CardFace tint={accent} />
        </div>
      </Link>
    </li>
  )
}

/**
 * Site-wide internal-linking module. Each landing page renders one of these
 * to push link equity to siblings (industries → pricing → FAQ → get-started).
 */
export function RelatedLinks({
  heading = "Keep exploring 9278.ai",
  description = "Related guides, pricing, and use cases curated for the calls you take.",
  links,
  variant = "default",
}: {
  heading?: string
  description?: string
  links: RelatedLink[]
  /** "flip" renders solid, 3D flip-on-hover cards (pricing & FAQ pages only). */
  variant?: "default" | "flip"
}) {
  return (
    <section aria-labelledby="related-heading" className="mx-auto w-full max-w-6xl px-4 pb-24 md:px-6">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <h2 id="related-heading" className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
            {heading}
          </h2>
          <p className="mt-2 max-w-2xl text-pretty text-sm text-muted-foreground md:text-base">{description}</p>
        </div>
      </div>

      <ul className={cn("grid", variant === "flip" ? "gap-6 md:grid-cols-3 md:gap-8" : "gap-4 md:grid-cols-2 lg:grid-cols-3")}>
        {links.map((l, i) =>
          variant === "flip" ? (
            <FlipCard key={l.href} link={l} index={i} />
          ) : (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group flex h-full flex-col justify-between gap-4 rounded-xl border border-border/60 bg-card/30 p-5 transition-colors hover:border-primary/40 hover:bg-card/50"
              >
                <div>
                  <p className="text-base font-medium tracking-tight group-hover:text-foreground">{l.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{l.description}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs text-primary">
                  Read more
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </li>
          ),
        )}
      </ul>
    </section>
  )
}
