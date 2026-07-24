"use client"

import { useEffect, useState } from "react"
import {
  Globe2,
  PhoneForwarded,
  ShieldCheck,
  Phone,
  RefreshCw,
  BadgeCheck,
  PhoneIncoming,
  PhoneOutgoing,
  Users,
  Clock,
  Activity,
  Cloud,
  Brain,
  CreditCard,
  Zap,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"
import { cn } from "@/lib/utils"

/** Counts up from 0 to `target` once the component mounts. */
function useCountUp(target: number, duration = 1300) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return value
}

function CarrierPhoneMockup() {
  return (
    <motion.div
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-white"
      style={{ boxShadow: "0 24px 60px -28px rgba(0,0,0,0.18), 0 8px 24px -12px rgba(220,38,38,0.10)" }}
    >
      {/* faint grid + layered ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]"
        style={{
          backgroundSize: "28px 28px",
          backgroundImage:
            "linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.14] blur-[70px]" />
      <div className="pointer-events-none absolute -left-6 -top-10 h-40 w-40 rounded-full bg-primary/[0.06] blur-[60px]" />
      <div className="pointer-events-none absolute -right-6 -top-10 h-40 w-40 rounded-full bg-primary/[0.06] blur-[60px]" />
      <div className="pointer-events-none absolute -bottom-10 -left-6 h-40 w-40 rounded-full bg-primary/[0.06] blur-[60px]" />
      <div className="pointer-events-none absolute -bottom-10 -right-6 h-40 w-40 rounded-full bg-primary/[0.06] blur-[60px]" />

      {/* connector lines tying the zig-zagged badges to the phone */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <line x1="19%" y1="12%" x2="38%" y2="24%" stroke="url(#connGrad)" strokeWidth="1" strokeDasharray="3 4" />
        <line x1="81%" y1="36%" x2="62%" y2="40%" stroke="url(#connGrad)" strokeWidth="1" strokeDasharray="3 4" />
        <line x1="19%" y1="60%" x2="38%" y2="58%" stroke="url(#connGrad)" strokeWidth="1" strokeDasharray="3 4" />
        <line x1="81%" y1="84%" x2="62%" y2="74%" stroke="url(#connGrad)" strokeWidth="1" strokeDasharray="3 4" />
        <defs>
          <linearGradient id="connGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* iPhone bezel */}
      <div
        className="relative z-10 flex h-[320px] w-[172px] flex-col rounded-[2.25rem] bg-[#111] shadow-2xl"
        style={{ boxShadow: "inset 0 0 0 2px #3f3f46, inset 0 0 0 6px #000, 0 30px 60px -12px rgba(0,0,0,0.25)" }}
      >
        <div className="scan-line relative m-[6px] flex-1 overflow-hidden rounded-[1.9rem] bg-white text-foreground">
          {/* dynamic island */}
          <div className="absolute left-1/2 top-[7px] z-20 flex h-[17px] w-[68px] -translate-x-1/2 items-center justify-end rounded-full bg-black px-2">
            <span className="h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
          </div>

          <div className="flex h-full flex-col px-3.5 pb-5 pt-8">
            {/* status row */}
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">SIP Trunk</span>
              <span className="inline-flex items-center gap-1 text-[9px] font-medium text-emerald-600">
                <span className="h-1 w-1 rounded-full bg-emerald-600 animate-pulse" />
                Connected
              </span>
            </div>

            {/* glowing carrier ring */}
            <div className="relative mx-auto mt-6 flex h-20 w-20 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-primary/25" />
              <span className="pulse-ring absolute inline-flex h-14 w-14 rounded-full text-primary" />
              <span
                className="relative flex h-14 w-14 items-center justify-center rounded-full ring-2 ring-black/5"
                style={{
                  backgroundImage: "radial-gradient(circle at 35% 30%, color-mix(in oklch, var(--primary) 55%, white), var(--primary))",
                  boxShadow: "0 6px 18px color-mix(in oklch, var(--primary) 45%, transparent)",
                }}
              >
                <Phone className="h-5 w-5 text-white" strokeWidth={2.25} aria-hidden="true" />
              </span>
            </div>

            <p className="mt-4 text-center text-xs font-semibold tracking-tight text-foreground">+1 (415) 555-0182</p>
            <p className="mt-0.5 text-center text-[9px] text-muted-foreground">Ported in 4 min · zero downtime</p>

            {/* mini widgets */}
            <div className="mt-5 space-y-2">
              <div className="flex items-center gap-2 rounded-lg bg-black/[0.03] px-2.5 py-2 ring-1 ring-black/[0.05]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-[9px] font-medium text-foreground/70">Inbound routing active</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-black/[0.03] px-2.5 py-2 ring-1 ring-black/[0.05]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-[9px] font-medium text-foreground/70">Outbound campaigns live</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* floating glass badges — staggered zig-zag, alternating sides down the card */}
      <div className="absolute left-4 z-20 flex w-[164px] items-center gap-2.5 rounded-xl border border-black/[0.06] bg-white/85 px-3 py-2.5 backdrop-blur-md sm:left-6" style={{ top: "12%", boxShadow: "0 12px 28px -14px rgba(0,0,0,0.18)" }}>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
          <RefreshCw className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        </span>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[10px] font-semibold text-foreground">No porting downtime</p>
          <p className="truncate text-[9px] text-muted-foreground">Numbers stay live</p>
        </div>
      </div>

      <div className="absolute right-4 z-20 flex w-[164px] items-center gap-2.5 rounded-xl border border-black/[0.06] bg-white/85 px-3 py-2.5 backdrop-blur-md sm:right-6" style={{ top: "36%", boxShadow: "0 12px 28px -14px rgba(0,0,0,0.18)" }}>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
          <Globe2 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        </span>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[10px] font-semibold text-foreground">Global coverage</p>
          <p className="truncate text-[9px] text-muted-foreground">60+ countries</p>
        </div>
      </div>

      <div className="absolute left-4 z-20 flex w-[164px] items-center gap-2.5 rounded-xl border border-black/[0.06] bg-white/85 px-3 py-2.5 backdrop-blur-md sm:left-6" style={{ top: "60%", boxShadow: "0 12px 28px -14px rgba(0,0,0,0.18)" }}>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
          <Zap className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        </span>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[10px] font-semibold text-foreground">Instant activation</p>
          <p className="truncate text-[9px] text-muted-foreground">Live in minutes</p>
        </div>
      </div>

      <div className="absolute right-4 z-20 flex w-[164px] items-center gap-2.5 rounded-xl border border-black/[0.06] bg-white/85 px-3 py-2.5 backdrop-blur-md sm:right-6" style={{ top: "84%", boxShadow: "0 12px 28px -14px rgba(0,0,0,0.18)" }}>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
          <BadgeCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        </span>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[10px] font-semibold text-foreground">Carrier verified</p>
          <p className="truncate text-[9px] text-muted-foreground">Your billing, unchanged</p>
        </div>
      </div>
    </motion.div>
  )
}

function StatTile({
  icon: Icon,
  label,
  target,
  format,
}: {
  icon: typeof PhoneIncoming
  label: string
  target: number
  format: (v: number) => string
}) {
  const v = useCountUp(target)
  return (
    <div className="rounded-xl bg-black/[0.03] p-3 ring-1 ring-black/[0.05]">
      <Icon className="h-4 w-4 text-primary" strokeWidth={2.25} aria-hidden="true" />
      <p className="mt-1.5 text-base font-semibold leading-none tabular-nums text-foreground">{format(v)}</p>
      <p className="mt-1 truncate text-[10px] leading-none text-muted-foreground">{label}</p>
    </div>
  )
}

function InboundOutboundDashboardMockup() {
  const callVolume = [28, 40, 34, 52, 46, 60, 50, 66, 58, 72, 64, 78]
  const recentCalls = [
    { agent: "#CA-1025", type: "inbound", status: "Success" },
    { agent: "#CA-1026", type: "outbound", status: "Success" },
    { agent: "#CA-1027", type: "inbound", status: "Success" },
  ]

  const points = (vals: number[], w: number, h: number) =>
    vals
      .map((v, i) => `${(i / (vals.length - 1)) * w},${h - (v / 80) * h}`)
      .join(" ")

  return (
    <motion.div
      className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white"
      style={{ boxShadow: "0 24px 60px -28px rgba(0,0,0,0.18), 0 8px 24px -12px rgba(220,38,38,0.10)" }}
    >
      {/* faint grid + red ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]"
        style={{
          backgroundSize: "28px 28px",
          backgroundImage:
            "linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)",
        }}
      />
      <div className="pointer-events-none absolute -top-10 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-primary/[0.12] blur-[70px]" />

      <div className="relative z-10 flex h-full w-full flex-col gap-4 p-6">
        {/* title bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-[11px] font-bold text-white">9</span>
            <span className="text-sm font-semibold text-foreground/80">9278.ai · Dashboard</span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.04] px-2.5 py-1 text-[10px] font-medium text-emerald-600 ring-1 ring-black/[0.05]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
            Live
          </span>
        </div>

        {/* stat tiles */}
        <div className="grid grid-cols-4 gap-2.5">
          <StatTile icon={PhoneIncoming} label="Calls today" target={14285} format={(v) => Math.round(v).toLocaleString()} />
          <StatTile icon={Users} label="Active agents" target={712} format={(v) => Math.round(v).toString()} />
          <StatTile
            icon={Clock}
            label="Avg duration"
            target={194}
            format={(v) => `${Math.floor(v / 60)}:${String(Math.floor(v % 60)).padStart(2, "0")}`}
          />
          <StatTile icon={Activity} label="Uptime" target={99.85} format={(v) => `${v.toFixed(2)}%`} />
        </div>

        {/* call volume chart */}
        <div className="flex-1 rounded-xl bg-black/[0.03] p-3.5 ring-1 ring-black/[0.05]">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-foreground/60">Inbound + outbound call volume</p>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" /> In
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-black/20" /> Out
              </span>
            </div>
          </div>
          <svg viewBox="0 0 200 46" className="mt-2.5 h-16 w-full" preserveAspectRatio="none" aria-hidden="true">
            <polyline
              className="draw-line"
              points={points(callVolume, 200, 46)}
              pathLength={1}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              className="draw-line"
              points={points(callVolume.map((v) => v * 0.65 + 4), 200, 46)}
              pathLength={1}
              fill="none"
              stroke="rgba(0,0,0,0.18)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ animationDelay: "0.25s" }}
            />
          </svg>
        </div>

        {/* recent calls */}
        <div className="rounded-xl bg-black/[0.03] p-3.5 ring-1 ring-black/[0.05]">
          <p className="text-[11px] font-medium text-foreground/60">Recent calls</p>
          <div className="mt-2 space-y-1.5">
            {recentCalls.map((c) => {
              const TypeIcon = c.type === "inbound" ? PhoneIncoming : PhoneOutgoing
              return (
                <div key={c.agent} className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[11px] text-foreground/60">
                    <TypeIcon className="h-3 w-3 text-primary" aria-hidden="true" />
                    {c.agent}
                  </span>
                  <span className="text-[11px] text-emerald-600">{c.status}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function CarrierGradeVoiceMockup() {
  const [active, setActive] = useState(0)
  const destinations = [
    { icon: Phone, label: "+1 (415) 555-0182" },
    { icon: CreditCard, label: "Your billing, unchanged" },
    { icon: ShieldCheck, label: "Porting rights kept" },
  ]
  const fanPaths = ["M0,50 C40,50 60,16.6 100,16.6", "M0,50 L100,50", "M0,50 C40,50 60,83.4 100,83.4"]

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % destinations.length), 1600)
    return () => clearInterval(id)
  }, [destinations.length])

  return (
    <motion.div
      className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white"
      style={{ boxShadow: "0 24px 60px -28px rgba(0,0,0,0.18), 0 8px 24px -12px rgba(220,38,38,0.10)" }}
    >
      {/* faint grid + red ambient glow — matches the other dashboard mockups */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]"
        style={{
          backgroundSize: "28px 28px",
          backgroundImage:
            "linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.14] blur-[70px]" />

      <div className="relative z-10 flex h-full w-full flex-col gap-4 p-6">
        {/* title bar */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary ring-1 ring-primary/15">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Carrier-grade infrastructure
          </span>
          <span className="font-mono text-[10px] tabular-nums text-muted-foreground">carrier → AI → you</span>
        </div>

        {/* architecture flow card */}
        <div className="relative flex flex-1 items-center gap-1.5 overflow-hidden rounded-xl bg-black/[0.03] px-2 py-3 ring-1 ring-black/[0.05] sm:gap-3 sm:px-6 sm:py-8">
          {/* radiating signal rings behind the AI node — fills the vertical space with intent */}
          <span className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-primary/10" style={{ animationDuration: "2.6s" }} />
          <span className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-primary/10" style={{ animationDuration: "2.6s", animationDelay: "1.3s" }} />

          {/* left — global carrier network */}
          <div className="relative flex w-12 shrink-0 flex-col items-center gap-1 sm:w-24 sm:gap-2.5">
            <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/[0.06] sm:h-12 sm:w-12">
              <Cloud className="h-3 w-3 text-muted-foreground sm:h-5 sm:w-5" strokeWidth={2} aria-hidden="true" />
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-black/15 ring-2 ring-white sm:h-2 sm:w-2" />
              <span className="absolute -bottom-0.5 -left-0.5 h-1 w-1 rounded-full bg-black/15 ring-2 ring-white sm:h-1.5 sm:w-1.5" />
            </span>
            <span className="text-center text-[6.5px] font-medium leading-tight text-muted-foreground sm:text-[10px]">
              Global carrier network
            </span>
          </div>

          {/* connector 1 — carrier → AI, with a continuously flowing signal dot */}
          <div className="relative h-px w-3 shrink-0 sm:w-auto sm:flex-1" style={{ backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0.12), var(--primary))" }}>
            <svg className="absolute inset-x-0 top-1/2 h-3 w-full -translate-y-1/2 overflow-visible" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
              <circle r="1.8" fill="var(--primary)">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M0,5 L100,5" />
              </circle>
            </svg>
          </div>

          {/* center — AI voice engine */}
          <div className="relative flex shrink-0 flex-col items-center gap-1 sm:gap-2.5">
            <span
              className="relative flex h-9 w-9 items-center justify-center rounded-full ring-2 ring-white sm:h-16 sm:w-16"
              style={{
                backgroundImage: "radial-gradient(circle at 35% 30%, color-mix(in oklch, var(--primary) 55%, white), var(--primary))",
                boxShadow: "0 8px 22px color-mix(in oklch, var(--primary) 45%, transparent)",
              }}
            >
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full text-primary" />
              <Brain className="relative h-4 w-4 text-white sm:h-7 sm:w-7" strokeWidth={2.25} aria-hidden="true" />
            </span>
            <span className="whitespace-nowrap text-center text-[6.5px] font-semibold leading-tight text-primary sm:text-[10px]">
              AI voice engine
            </span>
          </div>

          {/* connector 2 — AI fans out into 3 lines, one per destination, lighting up in sequence */}
          <div className="relative h-24 w-4 shrink-0 sm:h-[192px] sm:w-16">
            <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {fanPaths.map((d, i) => (
                <path
                  key={d}
                  d={d}
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth={active === i ? 2.25 : 1.25}
                  vectorEffect="non-scaling-stroke"
                  opacity={active === i ? 1 : 0.22}
                  style={{ transition: "opacity 0.45s ease, stroke-width 0.45s ease" }}
                />
              ))}
              <circle key={`dot-${active}`} r="2.2" fill="var(--primary)">
                <animateMotion dur="1.6s" repeatCount="indefinite" path={fanPaths[active]} />
              </circle>
            </svg>
          </div>

          {/* right — business ownership layer, the active destination eases up in scale as its line lights */}
          <div className="flex h-24 min-w-0 flex-1 flex-col justify-between gap-1 sm:h-[192px] sm:w-48 sm:flex-none sm:gap-4">
            {destinations.map((d, i) => {
              const Icon = d.icon
              return (
                <motion.div
                  key={d.label}
                  animate={{ scale: active === i ? 1.06 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  style={{ transformOrigin: "left center" }}
                  className={cn(
                    "flex min-w-0 items-center gap-1 rounded-md bg-white px-1.5 py-1 ring-1 ring-black/[0.06] sm:gap-2 sm:rounded-lg sm:px-3 sm:py-2.5",
                    active === i ? "shadow-md" : "shadow-sm",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded sm:h-6 sm:w-6 sm:rounded-md transition-colors duration-300",
                      active === i ? "bg-primary/10" : "bg-black/[0.03]",
                    )}
                  >
                    <Icon
                      className={cn("h-2 w-2 sm:h-3.5 sm:w-3.5 transition-colors duration-300", active === i ? "text-primary" : "text-primary/60")}
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="min-w-0 text-[6.5px] font-medium leading-tight text-foreground/70 sm:whitespace-nowrap sm:text-[11px]">
                    {d.label}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="rounded-xl bg-black/[0.03] px-3.5 py-2.5 ring-1 ring-black/[0.05]">
          <p className="font-mono text-[11px] text-muted-foreground">
            Carrier handles the call · AI handles the intelligence · You keep control
          </p>
        </div>
      </div>
    </motion.div>
  )
}

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

function MockupFor({ index }: { index: number }) {
  if (index === 1) return <InboundOutboundDashboardMockup />
  if (index === 2) return <CarrierGradeVoiceMockup />
  return <CarrierPhoneMockup />
}

export function Connectivity() {
  const [active, setActive] = useState(0)
  // Mobile-only accordion: nothing expanded until the user taps a row.
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null)

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
                      onClick={() => setMobileExpanded((cur) => (cur === i ? null : i))}
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

                    {/* Mobile-only accordion — the matching mockup drops down right under the tapped row */}
                    <AnimatePresence initial={false}>
                      {mobileExpanded === i && (
                        <motion.div
                          key="mobile-mockup"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden lg:hidden"
                        >
                          <div
                            className="ring-gradient card-glow relative mt-3 overflow-hidden rounded-3xl"
                            style={{ height: [460, 300, 280][i] }}
                          >
                            <MockupFor index={i} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </StaggerItem>
                )
              })}
            </StaggerGroup>
          </div>

          {/* RIGHT: swaps with whichever item is hovered — desktop/tablet only; mobile uses the inline accordion above */}
          <ScrollReveal className="hidden lg:col-span-6 lg:block">
            <div className="ring-gradient card-glow relative min-h-[460px] overflow-hidden rounded-3xl sm:aspect-[4/3] sm:min-h-0">
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
                  ) : active === 1 ? (
                    <InboundOutboundDashboardMockup />
                  ) : active === 2 ? (
                    <CarrierGradeVoiceMockup />
                  ) : (
                    <CarrierPhoneMockup />
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
