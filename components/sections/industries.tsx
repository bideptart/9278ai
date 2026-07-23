"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"
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

        <StaggerGroup className="mt-14 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {INDUSTRIES.map((industry, i) => {
            const Icon = industry.icon
            return (
              <StaggerItem key={industry.slug}>
                <Link href={`/industries/${industry.slug}`} className="group relative block">
                  {/* Offset shadow layer (like reference image) */}
                  <div
                    className="absolute inset-0 -bottom-2 -right-2 rounded-xl bg-red-300"
                    style={{ transform: "translate(4px, 4px)" }}
                  />
                  
                  {/* Flip card container */}
                  <div className="relative aspect-square rounded-xl perspective-1000">
                    <div className="relative w-full h-full preserve-3d transition-transform duration-600 group-hover:rotate-y-180">
                      
                      {/* Front of card */}
                      <div className="absolute inset-0 backface-hidden rounded-xl bg-red-600 p-6 flex flex-col items-center justify-center gap-5">
                        {/* Industry name (always visible on front) */}
                        <div className="flex flex-col items-center gap-4">
                          <div className="flex h-14 w-14 items-center justify-center rounded-lg">
                            <Icon className="size-7 text-white" aria-hidden />
                          </div>
                          <h3 className="text-lg font-semibold text-white text-center leading-tight">
                            {industry.name}
                          </h3>
                        </div>
                        {/* Number */}
                        <span className="text-xs font-semibold text-white/80 absolute top-4 right-4">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Back of card (shows on hover) */}
                      <div className="absolute inset-0 backface-hidden rounded-xl bg-red-700 p-5 rotate-y-180 flex flex-col justify-start gap-2 pt-8">
                        <p className="text-sm text-white/90 leading-relaxed text-center">
                          {industry.short}
                        </p>
                        <div className="flex items-center gap-1 text-xs font-medium text-white justify-center mt-2">
                          View playbook
                          <ArrowRight className="size-3" aria-hidden />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
