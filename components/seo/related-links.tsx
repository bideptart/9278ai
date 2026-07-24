"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type RelatedLink = {
  href: string
  title: string
  description: string
}

// Rotates through the site's existing red-family accent tokens (already
// used for the homepage's "01/02/03" step cards) for the icon badge.
const ACCENTS = ["var(--ai-cyan)", "var(--ai-violet)", "var(--ai-magenta)"]

// perspective/preserve-3d/backface-visibility force a 3D compositing context
// that blurs text on mobile Safari/Chrome. Hover-flip has no touch equivalent
// anyway, so mobile renders a flat front-face card with no 3D transform at all.
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)")
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return isDesktop
}

// Tailwind v4 drops the group-hover:/group-focus-visible: variant prefix when
// combined with an arbitrary `transform:` property, compiling it into an
// unconditional rule (always rotated). Driving the flip from React state
// instead of a CSS-only :hover selector sidesteps that entirely.
function FlipCard({ link, index }: { link: RelatedLink; index: number }) {
  const [flipped, setFlipped] = useState(false)
  const isDesktop = useIsDesktop()
  const number = String(index + 1).padStart(2, "0")
  const accent = ACCENTS[index % ACCENTS.length]

  const frontIconBadge = (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
      style={{
        background: `color-mix(in oklch, ${accent} 12%, transparent)`,
        boxShadow: `0 6px 16px -4px color-mix(in oklch, ${accent} 45%, transparent)`,
        color: accent,
      }}
    >
      <ArrowUpRight className="h-4 w-4" aria-hidden />
    </span>
  )

  // Back face — solid brand red, white icon (matches the pricing-page testimonial cards)
  const backIconBadge = (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white"
      style={{
        background: "var(--primary)",
        boxShadow: "0 6px 16px -4px color-mix(in oklch, var(--primary) 45%, transparent)",
      }}
    >
      <ArrowUpRight className="h-4 w-4" aria-hidden />
    </span>
  )

  // Mobile: no perspective/preserve-3d/backface-visibility at all — a plain
  // flat card, since those 3D properties are what blur text on mobile browsers.
  if (!isDesktop) {
    return (
      <li>
        <Link
          href={link.href}
          className="relative flex h-56 w-full flex-col justify-between overflow-hidden rounded-2xl p-6 outline-none"
          style={{
            backgroundImage:
              "linear-gradient(135deg, color-mix(in oklch, var(--primary) 16%, white), color-mix(in oklch, var(--primary) 6%, white))",
          }}
        >
          <div className="flex items-start justify-between">
            <span className="text-6xl font-bold leading-none text-primary/20">{number}</span>
            {frontIconBadge}
          </div>
          <div>
            <p className="text-xl font-bold tracking-tight text-neutral-900">{link.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">{link.description}</p>
          </div>
        </Link>
      </li>
    )
  }

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
        {/* Front face — red gradient, shown at rest (matches the homepage how-it-works cards) */}
        <div
          className="absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl p-6"
          style={{
            backgroundImage:
              "linear-gradient(135deg, color-mix(in oklch, var(--primary) 16%, white), color-mix(in oklch, var(--primary) 6%, white))",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="flex items-start justify-between">
            <span className="text-6xl font-bold leading-none text-primary/20">{number}</span>
            {frontIconBadge}
          </div>
          <div>
            <p className="text-xl font-bold tracking-tight text-neutral-900">{link.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">{link.description}</p>
          </div>
        </div>
        {/* Back face — white card, revealed on hover */}
        <div
          className="step-card card-glow absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl bg-white p-6"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex items-start justify-between">
            <span className="text-6xl font-bold leading-none text-muted-foreground/25">{number}</span>
            {backIconBadge}
          </div>
          <div>
            <p className="text-xl font-bold tracking-tight text-neutral-900">{link.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">{link.description}</p>
          </div>
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
