"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"
import { MouseGlowCard } from "@/components/animation/mouse-glow-card"
import { INDUSTRIES } from "@/lib/industries"

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

        <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {INDUSTRIES.map((industry, i) => {
            const Icon = industry.icon
            return (
              <StaggerItem key={industry.slug}>
                <MouseGlowCard className="h-full rounded-xl bg-card/40 p-5">
                  <Link href={`/industries/${industry.slug}`} className="group flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-accent/10 text-primary ring-1 ring-primary/20 transition-all group-hover:ring-primary/40">
                        <Icon
                          className="size-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="font-serif text-lg text-muted-foreground/30" aria-hidden>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-4 text-sm font-semibold tracking-tight transition-colors group-hover:text-primary">
                      {industry.name}
                    </h3>
                    <p className="mt-1.5 flex-1 text-pretty text-[13px] leading-relaxed text-muted-foreground">
                      {industry.short}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      View playbook
                      <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </Link>
                </MouseGlowCard>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
