"use client"

import Link from "next/link"
import {
  AudioLines,
  Hand,
  PhoneCall,
  Languages,
  Wrench,
  Repeat,
  ShieldCheck,
  Activity,
  Webhook,
  Mic,
  CalendarClock,
  Network,
  ArrowUpRight,
  ArrowRight,
  Zap,
  Sparkles,
} from "lucide-react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"

const trustPills = [
  { icon: Zap, label: "Sub-300ms latency" },
  { icon: Languages, label: "60+ languages" },
  { icon: PhoneCall, label: "Carrier-grade telephony" },
  { icon: ShieldCheck, label: "SOC 2-aligned" },
  { icon: Network, label: "Unlimited concurrency" },
]

const ACCENTS = [
  "var(--ai-cyan)",
  "var(--ai-violet)",
  "var(--ai-magenta)",
  "var(--ai-mint)",
] as const

const features = [
  {
    icon: AudioLines,
    title: "Sub-300ms latency",
    description:
      "Real-time WebRTC audio with a globally distributed media network. Conversations feel instant, never delayed.",
    tag: "Voice",
  },
  {
    icon: Hand,
    title: "Natural turn-taking",
    description:
      "Smart endpointing, barge-in, and interruption handling let your agent listen, pause, and respond like a person.",
    tag: "Voice",
  },
  {
    icon: PhoneCall,
    title: "Carrier-grade telephony",
    description:
      "Inbound and outbound PSTN calling over SIP. Connect your existing carrier and route calls intelligently across 60+ countries.",
    tag: "Telephony",
  },
  {
    icon: Languages,
    title: "Multilingual voices",
    description:
      "Speak naturally in dozens of languages and accents. Auto-detect the caller's language and switch mid-call when they do.",
    tag: "Voice",
  },
  {
    icon: Wrench,
    title: "Tools & function calling",
    description:
      "Look up CRMs, book calendars, take payments, query inventory — your agent uses the same APIs your team does.",
    tag: "Integrations",
  },
  {
    icon: Repeat,
    title: "Live transfer & handoff",
    description:
      "Warm-transfer to a human, swap between specialist agents, and pass full context — no repeating the customer.",
    tag: "Telephony",
  },
  {
    icon: Mic,
    title: "Background noise removal",
    description:
      "AI-powered noise and echo cancellation so callers from a busy street, café, or car still come through cleanly.",
    tag: "Voice",
  },
  {
    icon: Activity,
    title: "Live transcripts & analytics",
    description:
      "Every call streamed to text with speaker labels, sentiment, intents, and conversion events — searchable from day one.",
    tag: "Operations",
  },
  {
    icon: ShieldCheck,
    title: "Recording, redaction & compliance",
    description:
      "Configurable PII redaction, encrypted storage, retention controls, and SOC 2-aligned infrastructure out of the box.",
    tag: "Operations",
  },
  {
    icon: CalendarClock,
    title: "Scheduling & calendars",
    description:
      "Native Google, Outlook, and Calendly integrations. Book, reschedule, and confirm — all over voice.",
    tag: "Integrations",
  },
  {
    icon: Webhook,
    title: "Webhooks & APIs",
    description:
      "Trigger workflows on call start, transcript chunks, tool calls, or completion. Pipe data into your stack in real time.",
    tag: "Integrations",
  },
  {
    icon: Network,
    title: "Massive concurrency",
    description:
      "Scale from one call to thousands in parallel without provisioning servers. Burst capacity is built-in.",
    tag: "Operations",
  },
]

export function Features() {
  return (
    <>
      {/* Hero */}
      <section
        id="features-hero"
        className="relative flex items-center overflow-hidden border-t border-border/40 py-14 md:py-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(220,38,38,0.10),transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-12 lg:gap-8">
          <ScrollReveal className="lg:col-span-6 lg:self-start lg:-mt-10">
            <span className="ai-pill-magenta">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Features
            </span>
            <h1 className="mt-6 text-balance text-4xl font-serif font-normal leading-[1.05] tracking-tight md:text-6xl">
              Everything you need to ship a{" "}
              <span className="text-primary">real-world voice agent.</span>
            </h1>
            <p className="mt-6 text-pretty leading-relaxed text-muted-foreground md:text-lg">
              Real-time audio, telephony, integrations, and observability — production-ready, all in one platform.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="group btn-ai h-12 rounded-full px-7 transition-all">
                <Link href="/get-started">
                  Build your first agent
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group h-12 rounded-full border-border/70 bg-card/30 px-7 backdrop-blur-md hover:border-primary/50 hover:bg-card/50"
              >
                <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" aria-hidden="true" />
                Features
              </Button>
            </div>

            <StaggerGroup className="mt-5 flex flex-wrap gap-2.5">
              {trustPills.map((p) => {
                const Icon = p.icon
                return (
                  <StaggerItem key={p.label}>
                    <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card/60 py-1.5 pl-1.5 pr-3.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <p className="text-xs font-medium text-muted-foreground">{p.label}</p>
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerGroup>
          </ScrollReveal>

          {/* Live call mockup — phone and dashboard side by side, no overlap */}
          <ScrollReveal delay={0.1} className="lg:col-span-6">
            <div className="relative mx-auto h-[380px] w-full max-w-[500px]">
              {/* Floating feature icons — related to the subheading copy, drifting slowly */}
              {[
                { Icon: AudioLines, top: "14%", left: "9%", duration: 4.5, delay: 0 },
                { Icon: ShieldCheck, top: "7%", left: "50%", duration: 4.8, delay: 0.3 },
                { Icon: PhoneCall, top: "16%", left: "91%", duration: 5, delay: 0.6 },
                { Icon: Webhook, top: "92%", left: "8%", duration: 4.2, delay: 1.1 },
                { Icon: Activity, top: "90%", left: "92%", duration: 5.4, delay: 1.6 },
              ].map(({ Icon, top, left, duration, delay }, i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  className="absolute z-10 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/20 bg-card text-primary shadow-sm md:flex"
                  style={{ top, left }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay }}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </motion.span>
              ))}

              {/* Phone + dashboard cards */}
              <div className="absolute inset-0 flex items-center justify-center gap-5">
              {/* Phone card */}
              <div className="w-[210px] shrink-0 overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0f1a] shadow-2xl">
                <div className="flex items-center justify-between px-5 pt-5 text-xs text-white/40">
                  <span>9:41</span>
                  <span className="h-1.5 w-8 rounded-full bg-white/15" />
                </div>
                <div className="flex flex-col items-center gap-3 px-5 py-8 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-base font-semibold text-primary">
                    SC
                  </span>
                  <p className="text-base font-medium text-white">Sarah Chen</p>
                  <p className="text-xs text-white/40">00:18</p>
                  <div className="mt-2 flex h-8 items-center gap-[3px]">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const heights = [30, 60, 40, 85, 50, 70, 35, 90]
                      return (
                        <span
                          key={i}
                          className="voice-bar w-[3px] rounded-full bg-primary/70"
                          style={{
                            height: `${heights[i % heights.length]}%`,
                            animationDelay: `${(i * 90) % 900}ms`,
                          }}
                        />
                      )
                    })}
                  </div>
                  <span className="mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_20px_-6px_oklch(0.577_0.245_27.33/0.7)]">
                    <Mic className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
              </div>

              {/* Browser / dashboard card */}
              <div className="w-[260px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f1a] shadow-2xl md:w-[280px]">
                <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5">
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="ml-1 truncate font-mono text-[9px] text-white/40">app.9278.ai/agent</span>
                  <span className="ml-auto inline-flex items-center gap-1 text-[9px] font-medium text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Live
                  </span>
                </div>

                <div className="space-y-3 p-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
                      SC
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-white">Sarah Chen</p>
                      <p className="truncate text-[10px] text-white/40">+1 (312) 555-0188</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[9px] font-medium text-primary">
                      <Mic className="h-2.5 w-2.5" aria-hidden="true" />
                      Handling
                    </span>
                  </div>

                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
                    <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">Live transcript</p>
                    <div className="mt-1.5 flex h-6 items-center gap-[2.5px]">
                      {Array.from({ length: 18 }).map((_, i) => {
                        const heights = [20, 40, 65, 30, 80, 50, 90, 45, 35, 70]
                        return (
                          <span
                            key={i}
                            className="voice-bar w-[2px] rounded-full bg-primary/70"
                            style={{
                              height: `${heights[i % heights.length]}%`,
                              animationDelay: `${(i * 70) % 900}ms`,
                            }}
                          />
                        )
                      })}
                    </div>
                    <p className="mt-1.5 text-[10px] leading-relaxed text-white/70">
                      "Calling about a product demo for next week — about 15 people on our team…"
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2 text-[9px]">
                    <span className="text-white/40">Route → Sales Team</span>
                    <span className="inline-flex items-center gap-1 text-emerald-400">CRM synced ✓</span>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Grid — feature cards */}
      <section id="features" className="relative overflow-hidden border-t border-border/40">
        <div className="mx-auto w-full max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <StaggerGroup className="grid gap-5 sm:grid-cols-2">
          {features.map((f, i) => {
            const Icon = f.icon
            const accent = ACCENTS[i % ACCENTS.length]
            const number = String(i + 1).padStart(2, "0")
            return (
              <StaggerItem key={f.title}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-6 backdrop-blur-md transition-colors hover:border-border/80 md:p-7"
                >
                  {/* Left accent bar */}
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[3px] origin-bottom scale-y-50 transition-transform duration-500 group-hover:scale-y-100"
                    style={{ background: `linear-gradient(180deg, transparent, ${accent}, transparent)` }}
                  />
                  {/* Soft accent glow on hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 blur-[80px] transition-opacity duration-500 group-hover:opacity-40"
                    style={{ background: accent }}
                  />

                  <div className="relative flex items-start gap-5">
                    {/* Big numeric / icon block */}
                    <div className="relative flex shrink-0 flex-col items-center gap-2">
                      <span
                        className="font-mono text-[11px] font-medium uppercase tracking-[0.22em]"
                        style={{ color: accent }}
                      >
                        {number}
                      </span>
                      <span
                        className="relative flex h-12 w-12 items-center justify-center rounded-2xl ring-1"
                        style={{
                          background: `color-mix(in oklch, ${accent} 12%, transparent)`,
                          borderColor: `color-mix(in oklch, ${accent} 30%, transparent)`,
                          color: accent,
                        }}
                      >
                        <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                      </span>
                      <span
                        aria-hidden
                        className="h-10 w-px bg-gradient-to-b from-border/60 to-transparent"
                      />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider"
                          style={{
                            color: accent,
                            background: `color-mix(in oklch, ${accent} 10%, transparent)`,
                            borderColor: `color-mix(in oklch, ${accent} 28%, transparent)`,
                          }}
                        >
                          {f.tag}
                        </span>
                        <ArrowUpRight
                          className="h-4 w-4 -translate-y-0.5 translate-x-1 text-muted-foreground/60 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                          style={{ color: accent }}
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="mt-3 text-lg font-semibold tracking-tight">{f.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                    </div>
                  </div>
                </motion.article>
              </StaggerItem>
            )
          })}
          </StaggerGroup>
        </div>
      </section>
    </>
  )
}
