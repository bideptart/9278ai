"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"
import { INDUSTRIES } from "@/lib/industries"

const ACCENTS = ["var(--primary)", "var(--ai-violet)", "var(--ai-magenta)", "var(--ai-mint)"]

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
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">At a glance</p>
            <h2 className="mt-2 text-balance font-serif text-2xl font-normal tracking-tight md:text-3xl">
              Ten playbooks, <span className="text-primary">one platform.</span>
            </h2>
          </div>
          <p className="max-w-xs text-pretty text-sm text-muted-foreground">
            Tap any card to jump straight to its playbook below.
          </p>
        </div>

        <StaggerGroup className="mt-14 grid gap-x-5 gap-y-20 sm:grid-cols-2 lg:grid-cols-5">
          {INDUSTRIES.map((industry, i) => {
            const Icon = industry.icon
            const accent = ACCENTS[i % ACCENTS.length]
            return (
              <StaggerItem key={industry.slug}>
                <Link href={`/industries/${industry.slug}`} className="group relative block h-full pt-4">
                  <span
                    aria-hidden
                    className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 -rotate-3 rounded-full px-4 py-2 text-[11px] font-semibold whitespace-nowrap text-white shadow-lg transition-transform duration-300 group-hover:rotate-0"
                    style={{ background: accent }}
                  >
                    {industry.name}
                  </span>

                  <div className="card-glow relative flex h-full flex-col items-center rounded-2xl px-5 pt-9 pb-8 text-center">
                    <span
                      className="absolute right-3 top-3 font-serif text-lg text-muted-foreground/20"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 flex-1 text-pretty text-[13px] leading-relaxed text-muted-foreground">
                      {industry.short}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      View playbook
                      <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </div>

                  <span
                    aria-hidden
                    className="ring-background absolute -bottom-6 left-1/2 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full shadow-lg ring-[5px] transition-transform duration-300 group-hover:scale-110"
                    style={{ background: accent }}
                  >
                    <Icon className="size-4 text-white" aria-hidden />
                  </span>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
