"use client"

import { useState } from "react"
import { Globe2, PhoneForwarded, ShieldCheck } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"

const items = [
  {
    icon: PhoneForwarded,
    title: "Bring your own number",
    description:
      "Already have a carrier account? Connect it and your existing numbers route through 9278.ai instantly — no porting, no downtime.",
    // TODO: drop in the generated illustration once image credits are available.
    image: null,
  },
  {
    icon: Globe2,
    title: "Inbound and outbound",
    description:
      "One number, both directions. Trigger outbound campaigns or answer every incoming call automatically — same dashboard, same agent.",
    image: null,
  },
  {
    icon: ShieldCheck,
    title: "Carrier-grade voice",
    description:
      "Your provider's global network carries the call. We handle the brain. You keep the relationship, the billing, and the porting rights.",
    image: null,
  },
]

export function Connectivity() {
  const [active, setActive] = useState(0)
  const ActiveIcon = items[active].icon

  return (
    <section className="relative overflow-hidden border-t border-border/40 bg-muted/40">
      <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-10 md:px-6 md:pb-10 md:pt-14">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* LEFT: Copy + items */}
          <div className="lg:col-span-6">
            <ScrollReveal>
              <span className="ai-pill-violet">
                <Globe2 className="h-3 w-3" />
                Phone numbers
              </span>
              <h2 className="mt-4 text-balance text-3xl font-serif font-normal leading-[1.1] tracking-tight md:text-4xl">
                Your carrier account,{" "}
                <span className="text-primary">supercharged.</span>
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                We don't sell phone numbers. We connect to the carrier you already use — so your numbers, billing, and
                porting stay exactly where they are.
              </p>
            </ScrollReveal>

            <StaggerGroup className="mt-6 flex flex-col gap-2">
              {items.map((item, i) => {
                const Icon = item.icon
                return (
                  <StaggerItem key={item.title}>
                    <motion.div
                      onMouseEnter={() => setActive(i)}
                      className={`group card-glow relative flex items-start gap-4 rounded-2xl p-4 transition-colors ${
                        active === i ? "border-primary/30" : ""
                      }`}
                      whileHover={{ x: 6 }}
                      transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 transition-colors ${
                          active === i
                            ? "bg-primary text-primary-foreground ring-primary/30"
                            : "bg-primary/10 text-primary ring-primary/20"
                        }`}
                      >
                        <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold tracking-tight transition-colors group-hover:text-primary">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{item.description}</p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                )
              })}
            </StaggerGroup>
          </div>

          {/* RIGHT: swaps with whichever item is hovered */}
          <ScrollReveal className="lg:col-span-6">
            <div className="ring-gradient card-glow relative aspect-[4/3] overflow-hidden rounded-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  {items[active].image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={items[active].image}
                      alt={items[active].title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_50%,oklch(0.577_0.245_27.33/0.08),transparent_60%)]">
                      <span className="flex h-28 w-28 items-center justify-center rounded-3xl bg-primary/10 text-primary ring-1 ring-primary/20">
                        <ActiveIcon className="h-14 w-14" aria-hidden="true" />
                      </span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
