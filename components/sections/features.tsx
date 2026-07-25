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
  ArrowRight,
  Zap,
} from "lucide-react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"

const trustPills = [
  { icon: Zap, label: "Sub-300ms latency" },
  { icon: Languages, label: "60+ languages" },
  { icon: PhoneCall, label: "Carrier-grade telephony" },
  { icon: ShieldCheck, label: "SOC 2-aligned" },
  { icon: Network, label: "Unlimited concurrency" },
]

const floatingIcons = [
  {
    Icon: AudioLines,
    top: "4%",
    left: "-4%",
    duration: 4.5,
    delay: 0,
    title: "Real-time audio",
    description: "Sub-300ms WebRTC voice, no delay.",
    tooltip: "bottom",
  },
  {
    Icon: ShieldCheck,
    top: "10%",
    left: "50%",
    duration: 4.8,
    delay: 0.3,
    title: "SOC 2-aligned",
    description: "Encrypted, compliant by default.",
    tooltip: "bottom",
  },
  {
    Icon: PhoneCall,
    top: "6%",
    left: "104%",
    duration: 5,
    delay: 0.6,
    title: "Carrier-grade telephony",
    description: "Inbound & outbound calls over SIP.",
    tooltip: "bottom",
  },
  {
    Icon: Webhook,
    top: "102%",
    left: "-2%",
    duration: 4.2,
    delay: 1.1,
    title: "Webhooks & APIs",
    description: "Pipe call events into your stack.",
    tooltip: "top",
  },
  {
    Icon: Activity,
    top: "100%",
    left: "102%",
    duration: 5.4,
    delay: 1.6,
    title: "Live observability",
    description: "Transcripts, sentiment, analytics.",
    tooltip: "top",
  },
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

const featureCategories = ["All", "Voice", "Telephony", "Integrations", "Operations"] as const

export function Features() {
  const [activeIcon, setActiveIcon] = useState(0)
  const [activeCategory, setActiveCategory] = useState<(typeof featureCategories)[number]>("All")
  const [isCategoryPaused, setIsCategoryPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Auto-rotation is a desktop-only flourish — on mobile it just fights the user's thumb.
  // The "All" pill is hidden on mobile, so default to "Voice" there instead of an empty list.
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)")
    if (mql.matches) setActiveCategory((cur) => (cur === "All" ? "Voice" : cur))
    setIsMobile(mql.matches)
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (isCategoryPaused || isMobile) return
    const interval = setInterval(() => {
      setActiveCategory((cur) => {
        const idx = featureCategories.indexOf(cur)
        return featureCategories[(idx + 1) % featureCategories.length]
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [activeCategory, isCategoryPaused, isMobile])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIcon((cur) => (cur + 1) % floatingIcons.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

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

            <div className="mt-8 flex flex-nowrap items-center gap-2 sm:gap-3">
              <Button
                asChild
                size="lg"
                className="group btn-ai h-10 shrink-0 whitespace-nowrap rounded-full px-4 text-sm transition-all sm:h-12 sm:px-7 sm:text-base"
              >
                <Link href="/get-started">
                  Build your first agent
                  <ArrowRight className="ml-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="group h-10 shrink-0 whitespace-nowrap rounded-full border-border/70 bg-card/30 px-4 text-sm backdrop-blur-md hover:border-primary/50 hover:bg-card/50 sm:h-12 sm:px-7 sm:text-base"
              >
                <Link href="/contact">
                  <PhoneCall className="mr-1.5 h-3.5 w-3.5 shrink-0 transition-transform group-hover:rotate-12 sm:mr-2 sm:h-4 sm:w-4" aria-hidden="true" />
                  Talk to sales
                </Link>
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
            <div className="relative mx-auto h-[300px] w-full max-w-[500px] sm:h-[380px]">
              {/* Floating feature icons — related to the subheading copy, drifting slowly */}
              {floatingIcons.map(({ Icon, top, left, duration, delay, title, description }, i) => (
                <motion.span
                  key={i}
                  className="absolute z-20 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/20 bg-card text-primary shadow-sm md:flex"
                  style={{ top, left }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay }}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />

                  <AnimatePresence>
                    {activeIcon === i && (
                      <motion.div
                        role="tooltip"
                        initial={{ opacity: 0, y: 6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-30 w-32 -translate-x-1/2 rounded-lg border border-border/60 bg-popover/95 p-2 text-left shadow-xl backdrop-blur-md"
                      >
                        <p className="text-[10px] font-semibold text-foreground">{title}</p>
                        <p className="mt-0.5 text-[9px] leading-snug text-muted-foreground">{description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.span>
              ))}

              {/* Phone + dashboard cards */}
              <div className="absolute inset-0 flex items-center justify-center gap-2 px-2 sm:gap-5 sm:px-0">
              {/* Phone card */}
              <div className="w-[130px] shrink-0 overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-2xl sm:w-[210px] sm:rounded-[32px]">
                <div className="flex items-center justify-between px-3 pt-3 text-[9px] text-black/40 sm:px-5 sm:pt-5 sm:text-xs">
                  <span>9:41</span>
                  <span className="h-1 w-5 rounded-full bg-black/10 sm:h-1.5 sm:w-8" />
                </div>
                <div className="flex flex-col items-center gap-1.5 px-3 py-4 text-center sm:gap-3 sm:px-5 sm:py-8">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary sm:h-14 sm:w-14 sm:text-base">
                    SC
                  </span>
                  <p className="text-xs font-medium text-black sm:text-base">Sarah Chen</p>
                  <p className="text-[9px] text-black/40 sm:text-xs">00:18</p>
                  <div className="mt-1 flex h-5 items-center gap-[2px] sm:mt-2 sm:h-8 sm:gap-[3px]">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const heights = [30, 60, 40, 85, 50, 70, 35, 90]
                      return (
                        <span
                          key={i}
                          className="voice-bar w-[2px] rounded-full bg-primary/70 sm:w-[3px]"
                          style={{
                            height: `${heights[i % heights.length]}%`,
                            animationDelay: `${(i * 90) % 900}ms`,
                          }}
                        />
                      )
                    })}
                  </div>
                  <span className="mt-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_20px_-6px_oklch(0.577_0.245_27.33/0.7)] sm:mt-4 sm:h-12 sm:w-12">
                    <Mic className="h-3.5 w-3.5 sm:h-5 sm:w-5" aria-hidden="true" />
                  </span>
                </div>
              </div>

              {/* Browser / dashboard card */}
              <div className="w-[175px] shrink-0 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl sm:w-[260px] md:w-[280px]">
                <div className="flex items-center gap-1.5 border-b border-black/10 px-3 py-2.5">
                  <span className="h-2 w-2 rounded-full bg-black/10" />
                  <span className="h-2 w-2 rounded-full bg-black/10" />
                  <span className="h-2 w-2 rounded-full bg-black/10" />
                  <span className="ml-1 truncate font-mono text-[9px] text-black/40">app.9278.ai/agent</span>
                  <span className="ml-auto inline-flex items-center gap-1 text-[9px] font-medium text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                    Live
                  </span>
                </div>

                <div className="space-y-3 p-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
                      SC
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-black">Sarah Chen</p>
                      <p className="truncate text-[10px] text-black/40">+1 (312) 555-0188</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[9px] font-medium text-primary">
                      <Mic className="h-2.5 w-2.5" aria-hidden="true" />
                      Handling
                    </span>
                  </div>

                  <div className="rounded-lg border border-black/10 bg-black/[0.03] p-2.5">
                    <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-black/30">Live transcript</p>
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
                    <p className="mt-1.5 text-[10px] leading-relaxed text-black/70">
                      "Calling about a product demo for next week — about 15 people on our team…"
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 rounded-lg border border-black/10 bg-black/[0.03] px-2.5 py-2 text-[9px]">
                    <span className="text-black/40">Route → Sales Team</span>
                    <span className="inline-flex items-center gap-1 text-emerald-600">CRM synced ✓</span>
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
        <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-6 md:px-6 md:pb-28 md:pt-8">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="ai-pill-cyan">
              <span className="h-1 w-1 rounded-full bg-primary" />
              Capabilities
            </span>
            <h2 className="mt-3 text-balance text-4xl font-serif font-normal leading-[1.1] tracking-tight md:text-5xl">
              Every piece of the stack,{" "}
              <span className="text-primary">built in.</span>
            </h2>
            <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Voice, telephony, integrations, and observability — the twelve building blocks behind every production-ready agent.
            </p>
          </ScrollReveal>

          <div className="mt-6 flex flex-nowrap items-center justify-start gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:gap-2.5 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            {featureCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                  category === "All" ? "hidden sm:inline-flex" : ""
                } ${
                  activeCategory === category
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/60 bg-card/60 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div
            onMouseEnter={() => setIsCategoryPaused(true)}
            onMouseLeave={() => setIsCategoryPaused(false)}
            className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((f) => {
              const Icon = f.icon
              const isMatch = activeCategory === "All" || f.tag === activeCategory

              // Mobile: truly filter the list (no dimmed, still-occupying-space items), no animation.
              // The "All" pill is hidden on mobile, so "All" shows nothing instead of everything —
              // only a picked category (Voice/Telephony/Integrations/Operations) renders its list.
              if (isMobile) {
                if (activeCategory === "All" || !isMatch) return null
                return (
                  <div key={f.title} className="flex w-full flex-row items-start gap-3">
                    <Icon className="mt-1 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium tracking-tight">{f.title}</p>
                      <p className="text-xs leading-relaxed text-muted-foreground">{f.description}</p>
                    </div>
                  </div>
                )
              }

              // Desktop: original behaviour — every card stays in the grid, non-matching ones just dim.
              return (
                <motion.div
                  key={f.title}
                  animate={{ opacity: isMatch ? 1 : 0.25 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex w-full flex-row items-start gap-3"
                >
                  <Icon className="mt-1 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium tracking-tight">{f.title}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground">{f.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
