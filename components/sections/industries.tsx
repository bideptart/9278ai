"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"
import { INDUSTRIES } from "@/lib/industries"

/**
 * Faint contour lines echoing the illustration style — drawn by the card itself
 * (not baked into the image) so the artwork sits on a surface that belongs to
 * the card. Brand red at a whisper of opacity.
 */
function WaveLines() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 240 120"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-6 h-24 w-full text-primary opacity-[0.1]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      {[0, 12, 24, 36, 48].map((o, idx) => (
        <path
          key={o}
          d={`M-10 ${50 + o} C 55 ${28 + o}, 95 ${74 + o}, 135 ${50 + o} S 210 ${24 + o}, 250 ${48 + o}`}
          opacity={1 - idx * 0.14}
        />
      ))}
    </svg>
  )
}

export function Industries() {
  return (
    <section id="industries" className="relative overflow-hidden border-t border-border/40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-dots opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_72%)]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/50 pb-6">
          <div>
            <span className="ai-pill-magenta">
              <span className="h-1 w-1 rounded-full bg-accent" />
              At a glance
            </span>
            <h2 className="mt-2 text-balance font-serif text-2xl font-normal tracking-tight md:text-3xl">
              Ten playbooks, <span className="text-primary">one platform.</span>
            </h2>
          </div>
          <p className="max-w-xs text-pretty text-sm text-muted-foreground">
            Hover any card to read its playbook, then tap to open it.
          </p>
        </div>

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-5">
          {INDUSTRIES.map((industry, i) => (
            <StaggerItem key={industry.slug}>
              <Link
                href={`/industries/${industry.slug}`}
                aria-label={`Open the ${industry.name} playbook`}
                className="group mx-auto block aspect-[5/7] w-full max-w-[240px] sm:max-w-[180px] [perspective:1400px]"
              >
                <div className="relative h-full w-full transition-transform duration-700 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front — illustration composed onto the card */}
                  <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[22px] border border-primary/35 bg-gradient-to-b from-white to-[oklch(0.968_0.022_20)] shadow-[0_24px_60px_-20px_color-mix(in_oklch,var(--primary)_28%,transparent),0_8px_20px_-8px_color-mix(in_oklch,var(--primary)_16%,transparent)] transition-shadow duration-500 [backface-visibility:hidden] group-hover:shadow-[0_30px_66px_-20px_color-mix(in_oklch,var(--primary)_36%,transparent),0_10px_24px_-8px_color-mix(in_oklch,var(--primary)_20%,transparent)]">
                    <WaveLines />

                    {/* Number */}
                    <span className="absolute right-4 top-4 z-10 rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-bold tracking-wide text-primary ring-1 ring-primary/15">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Illustration */}
                    <div className="relative flex flex-1 items-center justify-center px-6 pt-6">
                      <Image
                        src={`/industries/${industry.slug}.png`}
                        alt={`${industry.name} illustration`}
                        fill
                        sizes="(max-width: 640px) 60vw, (max-width: 1280px) 24vw, 180px"
                        className="object-contain object-center transition-transform duration-500 group-hover:scale-105 [filter:drop-shadow(0_8px_14px_oklch(0.577_0.245_27.33_/_0.28))]"
                      />
                    </div>

                    {/* Name */}
                    <div className="relative px-3 pb-6 text-center">
                      <h3 className="text-balance text-base font-semibold leading-tight tracking-tight text-neutral-800">
                        {industry.name}
                      </h3>
                    </div>
                  </div>

                  {/* Back — red gradient playbook panel */}
                  <div
                    className="absolute inset-0 flex flex-col overflow-hidden rounded-[22px] border border-primary/35 p-5 text-white shadow-[0_24px_60px_-20px_color-mix(in_oklch,var(--primary)_28%,transparent),0_8px_20px_-8px_color-mix(in_oklch,var(--primary)_16%,transparent)] [backface-visibility:hidden] [transform:rotateY(180deg)]"
                    style={{
                      // Exact red sampled from the real-estate house walls (#E45444)
                      background: "linear-gradient(150deg, #EF6C5B 0%, #E45444 52%, #CE4C3D 100%)",
                    }}
                  >
                    <span aria-hidden className="pointer-events-none absolute inset-0 opacity-20 bg-lattice" />
                    <span className="relative text-xs font-bold tracking-widest text-white/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="relative mt-2 font-serif text-lg font-normal leading-tight">
                      {industry.name}
                    </h3>
                    <span aria-hidden className="relative mt-2 h-px w-8 bg-white/40" />
                    <p className="relative mt-3 text-[13px] leading-relaxed text-white/90">
                      {industry.short}
                    </p>
                    <span className="relative mt-4 inline-flex items-center gap-1 text-xs font-semibold text-white">
                      View playbook
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
