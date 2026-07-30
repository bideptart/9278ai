"use client"

import { useEffect, useRef, useState, type MouseEvent } from "react"
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
//
// The flip is click-triggered, not hover/focus-triggered: a click on the card
// body turns it by one more half-turn and it stays put until the next click
// (on the card, to keep turning, or outside it, which also settles it back to
// front) — never an ongoing/repeated animation from the pointer merely
// passing over it. The corner arrow icon is carved out of that turn so it
// still navigates immediately regardless of face, it's the one genuine "go"
// affordance on the card.
//
// Rotation is tracked as an ever-increasing turn count rather than a
// front/back boolean, so the card always spins the same direction — click,
// click, click keeps winding forward through back → front → back rather than
// the second click winding back the way it came.
function FlipCard({
  link,
  index,
  showNumber = true,
}: {
  link: RelatedLink
  index: number
  showNumber?: boolean
}) {
  const [turns, setTurns] = useState(0)
  const flipped = turns % 2 === 1
  const isDesktop = useIsDesktop()
  const cardRef = useRef<HTMLAnchorElement>(null)
  const number = String(index + 1).padStart(2, "0")
  const accent = ACCENTS[index % ACCENTS.length]

  // A click outside the card settles it back to the front face — by
  // finishing the turn already in progress, never spinning backward.
  useEffect(() => {
    if (!flipped) return
    const onPointerDown = (e: PointerEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) setTurns((t) => t + 1)
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [flipped])

  function handleCardClick(e: MouseEvent<HTMLAnchorElement>) {
    // The arrow badge is the real "go" control — let its click through to the
    // native anchor navigation untouched, whatever the current face.
    if ((e.target as HTMLElement).closest("[data-flip-nav]")) return
    e.preventDefault()
    setTurns((t) => t + 1)
  }

  const frontIconBadge = (
    <span
      data-flip-nav
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
      data-flip-nav
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
          className="relative flex min-h-[92px] w-full flex-col gap-1 overflow-hidden rounded-2xl p-3 outline-none"
          style={{
            backgroundImage:
              "linear-gradient(135deg, color-mix(in oklch, var(--primary) 16%, white), color-mix(in oklch, var(--primary) 6%, white))",
          }}
        >
          <div className="flex items-start justify-between">
            {showNumber && <span className="text-xl font-bold leading-none text-primary/20">{number}</span>}
            <span
              className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-md", !showNumber && "ml-auto")}
              style={{
                background: `color-mix(in oklch, ${accent} 12%, transparent)`,
                boxShadow: `0 6px 16px -4px color-mix(in oklch, ${accent} 45%, transparent)`,
                color: accent,
              }}
            >
              <ArrowUpRight className="h-3 w-3" aria-hidden />
            </span>
          </div>
          <div>
            <p className="text-xs font-bold tracking-tight text-neutral-900">{link.title}</p>
            <p className="mt-0.5 text-[10px] leading-snug text-neutral-500 line-clamp-2">{link.description}</p>
          </div>
        </Link>
      </li>
    )
  }

  return (
    <li style={{ perspective: "1200px" }}>
      <Link
        ref={cardRef}
        href={link.href}
        className={cn(
          "relative block w-full cursor-pointer outline-none transition-transform duration-700 will-change-transform",
          showNumber ? "h-56" : "h-[210px]",
        )}
        style={{ transformStyle: "preserve-3d", transform: `rotateY(${turns * 180}deg)` }}
        aria-pressed={flipped}
        onClick={handleCardClick}
      >
        {/* Front face — red gradient, shown at rest (matches the homepage how-it-works cards) */}
        <div
          className={cn(
            "absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-2xl p-6",
            showNumber ? "justify-between" : "justify-start gap-1",
          )}
          style={{
            backgroundImage:
              "linear-gradient(135deg, color-mix(in oklch, var(--primary) 16%, white), color-mix(in oklch, var(--primary) 6%, white))",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="flex items-start justify-between">
            {showNumber && <span className="text-6xl font-bold leading-none text-primary/20">{number}</span>}
            <span className={cn(!showNumber && "ml-auto")}>{frontIconBadge}</span>
          </div>
          <div>
            <p className="text-xl font-bold tracking-tight text-neutral-900">{link.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">{link.description}</p>
          </div>
        </div>
        {/* Back face — white card, revealed on hover */}
        <div
          className={cn(
            "step-card card-glow absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white p-6",
            showNumber ? "justify-between" : "justify-start gap-1",
          )}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex items-start justify-between">
            {showNumber && <span className="text-6xl font-bold leading-none text-muted-foreground/25">{number}</span>}
            <span className={cn(!showNumber && "ml-auto")}>{backIconBadge}</span>
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
  showNumber = true,
}: {
  heading?: string
  description?: string
  links: RelatedLink[]
  /** "flip" renders solid, 3D flip-on-hover cards (pricing & FAQ pages only). */
  variant?: "default" | "flip"
  /** Set false to drop the 01/02/03 numbering on flip cards. */
  showNumber?: boolean
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

      <ul className={cn("grid", variant === "flip" ? "gap-2 sm:gap-4 md:grid-cols-3" : "gap-4 md:grid-cols-2 lg:grid-cols-3")}>
        {links.map((l, i) =>
          variant === "flip" ? (
            <FlipCard key={l.href} link={l} index={i} showNumber={showNumber} />
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
