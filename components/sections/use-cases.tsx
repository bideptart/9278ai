"use client"

import { Headset, TrendingUp, Languages } from "lucide-react"
import { motion } from "motion/react"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"

const items = [
  {
    icon: Headset,
    title: "24/7 virtual front desk",
    description:
      "An always-on receptionist that greets every caller, answers FAQs from your knowledge base, and escalates only when needed.",
    tag: "Inbound",
    chips: [
      { word: "24/7 availability", top: "16%", left: "50%", rotate: -6 },
      { word: "Smart escalation", top: "31%", left: "66%", rotate: 4 },
    ],
  },
  {
    icon: TrendingUp,
    title: "Proactive growth",
    description:
      "Automate outbound lead generation, lead revival, and instant speed-to-lead callbacks — from one dashboard.",
    tag: "Outbound",
    chips: [
      { word: "+38% conversion", top: "16%", left: "48%", rotate: -6 },
      { word: "One dashboard", top: "31%", left: "68%", rotate: 4 },
    ],
  },
  {
    icon: Languages,
    title: "Multilingual fluency",
    description:
      "Auto-detects the caller's language and switches mid-conversation for a true local feel — no extra setup required.",
    tag: "Global",
    chips: [
      { word: "Hello", top: "16%", left: "58%", rotate: -6 },
      { word: "Привет", top: "31%", left: "76%", rotate: 4 },
    ],
  },
]

export function UseCases() {
  return (
    <section className="relative overflow-hidden border-t border-border/40">
      <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-8 md:px-6 md:pb-20 md:pt-10">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="ai-pill-cyan">
            <span className="h-1 w-1 rounded-full bg-primary" />
            Inbound & outbound
          </span>
          <h2 className="mt-6 text-balance text-4xl font-serif font-normal leading-[1.1] tracking-tight md:text-5xl">
            Inbound, outbound, and multilingual{" "}
            <span className="text-primary">— covered.</span>
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground md:text-lg">
            From the first hello to the follow-up that closes the deal — 9278.ai handles the entire call lifecycle.
          </p>
        </ScrollReveal>

        <StaggerGroup className="mt-4 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <StaggerItem key={item.title}>
                <div className="group relative h-full">
                  <motion.div
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className="usecase-card card-glow relative h-full overflow-hidden rounded-2xl p-8"
                  >
                    <Icon
                      className="pointer-events-none absolute -bottom-8 -right-8 h-36 w-36 text-primary/[0.06]"
                      aria-hidden="true"
                    />
                    {item.chips.map((c) => (
                      <span
                        key={c.word}
                        className="pointer-events-none absolute whitespace-nowrap rounded-md border border-primary/20 bg-primary/[0.06] px-1.5 py-0.5 text-[10px] font-medium text-primary/50"
                        style={{ top: c.top, left: c.left, transform: `rotate(${c.rotate}deg)` }}
                      >
                        {c.word}
                      </span>
                    ))}
                    <div className="relative flex items-start justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                        <Icon
                          className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="rounded-full border border-border/60 bg-card/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        {item.tag}
                      </span>
                    </div>
                    <p className="relative mt-6 text-xs font-mono text-muted-foreground/60">/ 0{i + 1}</p>
                    <h3 className="relative mt-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </motion.div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
