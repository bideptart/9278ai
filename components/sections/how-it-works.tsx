"use client"

import { Wand2, BookOpen, Rocket } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"

const steps = [
  {
    icon: Wand2,
    label: "Step 01",
    title: "Design your agent",
    description:
      "Pick a voice, write the prompt, set guardrails. Describe the agent in plain English and ship it.",
    bullets: ["System prompt + personas", "Guardrails and conversation flow", "Plain-English agent definition"],
    pillClass: "ai-pill-cyan",
    accent: "var(--ai-cyan)",
  },
  {
    icon: BookOpen,
    label: "Step 02",
    title: "Connect your knowledge",
    description:
      "Point the agent at your knowledge base, FAQs, or product docs. It answers from your source of truth, not a generic model.",
    bullets: ["RAG over your knowledge base", "Live document sync", "Source citations on every answer"],
    pillClass: "ai-pill-violet",
    accent: "var(--ai-violet)",
  },
  {
    icon: Rocket,
    label: "Step 03",
    title: "Launch & scale",
    description:
      "Plug in your phone number, route inbound or outbound, and go live. Scale from one call to thousands without a queue.",
    bullets: ["Phone number routing (inbound + outbound)", "Real-time latency tracking", "Self-hosted control panel"],
    pillClass: "ai-pill-magenta",
    accent: "var(--ai-magenta)",
  },
]

export function HowItWorks() {
  const reduced = useReducedMotion()
  return (
    <section id="how-it-works" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]"
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-[28rem] w-[28rem] rounded-full blur-[120px] [will-change:transform]"
        style={{ background: "var(--ai-violet)", opacity: 0.04 }}
        animate={reduced ? undefined : { x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-1/4 -z-10 h-[28rem] w-[28rem] rounded-full blur-[120px] [will-change:transform]"
        style={{ background: "var(--ai-magenta)", opacity: 0.035 }}
        animate={reduced ? undefined : { x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-8 md:px-6 md:pb-20 md:pt-10">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="ai-pill-cyan">
            <span className="h-1 w-1 rounded-full bg-primary" />
            How it works
          </span>
          <h2 className="mt-6 text-balance text-4xl font-serif font-normal leading-[1.1] tracking-tight md:text-5xl">
            From idea to live agent in{" "}
            <span className="text-primary">three steps.</span>
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            No infra to spin up, no models to host. Design, connect, and launch — your first agent is taking calls before lunch.
          </p>
        </ScrollReveal>

        <div className="relative mt-4">
          <StaggerGroup className="grid gap-6 md:grid-cols-3 md:gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <StaggerItem key={step.title}>
                  <div className="group relative h-full sm:[perspective:1200px]">
                    <div className="relative h-full min-h-[320px] transition-transform duration-700 ease-out sm:[transform-style:preserve-3d] sm:group-hover:[transform:rotateY(180deg)] sm:min-h-[280px]">
                      {/* FRONT — red gradient, shown at rest */}
                      <div
                        className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl p-6 sm:[backface-visibility:hidden]"
                        style={{
                          backgroundImage:
                            "linear-gradient(135deg, color-mix(in oklch, var(--primary) 16%, white), color-mix(in oklch, var(--primary) 6%, white))",
                        }}
                      >
                        <div className="relative flex items-start justify-between">
                          <span
                            className="text-4xl font-bold tracking-tight text-primary/20 sm:text-6xl"
                            style={{ fontVariantNumeric: "tabular-nums" }}
                            aria-hidden="true"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                            style={{
                              background: `color-mix(in oklch, ${step.accent} 12%, transparent)`,
                              boxShadow: `0 6px 16px -4px color-mix(in oklch, ${step.accent} 45%, transparent)`,
                              color: step.accent,
                            }}
                          >
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                        </div>
                        <span className="sr-only">{step.label}</span>
                        <h3 className="relative mt-2 text-xl font-semibold tracking-tight">{step.title}</h3>
                        <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>

                        <ul className="relative mt-3 space-y-1.5 sm:mt-6 sm:space-y-2">
                          {step.bullets.map((b) => (
                            <li key={b} className="flex items-center gap-2 text-sm text-foreground/80">
                              <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: step.accent }} />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* BACK — white card, revealed on hover (desktop only; mobile shows front face only, no 3D transform) */}
                      <div className="step-card card-glow absolute inset-0 hidden flex-col overflow-hidden rounded-2xl bg-white p-6 sm:flex sm:[backface-visibility:hidden] sm:[transform:rotateY(180deg)]">
                        <span className="scan-line" aria-hidden />
                        <div className="relative flex items-start justify-between">
                          <span
                            className="text-4xl font-bold tracking-tight text-muted-foreground/25 sm:text-6xl"
                            style={{ fontVariantNumeric: "tabular-nums" }}
                            aria-hidden="true"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white"
                            style={{
                              background: "var(--primary)",
                              boxShadow: "0 6px 16px -4px color-mix(in oklch, var(--primary) 45%, transparent)",
                            }}
                          >
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                        </div>
                        <span className="sr-only">{step.label}</span>
                        <h3 className="relative mt-2 text-xl font-semibold tracking-tight">{step.title}</h3>
                        <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>

                        <ul className="relative mt-3 space-y-1.5 sm:mt-6 sm:space-y-2">
                          {step.bullets.map((b) => (
                            <li key={b} className="flex items-center gap-2 text-sm text-foreground/80">
                              <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: step.accent }} />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}
