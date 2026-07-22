"use client"

import Link from "next/link"
import {
  Check,
  Quote,
  Key,
  CalendarCheck,
  Smile,
  Pill,
  Stethoscope,
  Clock,
  Zap,
  Star,
  Wrench,
  FileText,
  ShieldCheck,
  BookOpen,
  Package,
  Truck,
  HeartPulse,
  type LucideIcon,
} from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"
import { getIndustry } from "@/lib/industries"

const VOICE_BAR_HEIGHTS = [5, 9, 13, 7, 10]

/** Splits text into characters that rise + fade in with a stagger, like a
 * film-reel caption resolving into focus. */
function RisingText({ text, baseDelay }: { text: string; baseDelay: number }) {
  const reduced = useReducedMotion()
  const chars = Array.from(text)
  if (reduced) return <>{text}</>
  return (
    <>
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: baseDelay + i * 0.012, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block" }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </>
  )
}

/** Two supplementary icons per industry, purely decorative — build a small
 * icon-cluster "illustration" around the industry's main icon. */
const ACCENT_ICONS: Record<string, [LucideIcon, LucideIcon]> = {
  "real-estate": [Key, CalendarCheck],
  dental: [Smile, CalendarCheck],
  healthcare: [Pill, Stethoscope],
  "home-services": [Clock, Zap],
  restaurants: [CalendarCheck, Star],
  automotive: [Wrench, Clock],
  legal: [FileText, ShieldCheck],
  education: [BookOpen, CalendarCheck],
  ecommerce: [Package, Truck],
  fitness: [CalendarCheck, HeartPulse],
}

export function IndustryRow({ slug, index, reverse }: { slug: string; index: number; reverse?: boolean }) {
  const industry = getIndustry(slug)
  if (!industry) return null
  const Icon = industry.icon
  const ordinal = String(index + 1).padStart(2, "0")
  const [AccentA, AccentB] = ACCENT_ICONS[slug] ?? [Check, Check]

  return (
    <section
      id={industry.slug}
      className={cn(
        "relative scroll-mt-24 border-b border-border/50 py-20 last:border-b-0 md:py-28",
        index % 2 === 1 && "bg-card/25",
      )}
    >
      <p
        aria-hidden
        className="pointer-events-none absolute -top-6 right-0 -z-10 select-none font-serif text-[6rem] leading-none text-foreground/[0.04] md:text-[8.5rem]"
      >
        {ordinal}
      </p>

      <div className={cn("grid items-start gap-12 md:grid-cols-2 md:gap-16", reverse && "md:[&>*:first-child]:order-2")}>
        <ScrollReveal>
          <div className="flex items-center gap-4">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center" aria-hidden>
              <span
                className="absolute inset-0 rounded-full opacity-50 blur-lg"
                style={{
                  background:
                    "conic-gradient(from 0deg, var(--ai-cyan), var(--ai-violet), var(--ai-magenta), var(--ai-mint), var(--ai-cyan))",
                }}
              />
              <span className="absolute -right-1.5 -top-1.5 flex size-7 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground/70 shadow-sm">
                <AccentA className="size-3.5" />
              </span>
              <span className="absolute -bottom-1.5 -left-1.5 flex size-7 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground/70 shadow-sm">
                <AccentB className="size-3.5" />
              </span>
              <span className="relative grid size-12 place-items-center rounded-2xl border border-border/60 bg-card text-primary shadow-sm">
                <Icon className="size-6" />
              </span>
            </div>
            <p className="text-xs font-medium uppercase tracking-widest text-primary">{industry.name}</p>
          </div>
          <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            <Link href={`/industries/${industry.slug}`} className="transition-colors hover:text-primary">
              {industry.short}
            </Link>
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{industry.pitch}</p>

          <p className="mt-8 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            What the agent does on day one
          </p>
          <StaggerGroup className="mt-3 space-y-3">
            {industry.jobs.map((job) => (
              <StaggerItem key={job}>
                <div className="flex items-start gap-3">
                  <Check className="mt-0.5 size-4 flex-none text-primary" aria-hidden />
                  <span className="text-sm leading-relaxed text-foreground/90">{job}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/get-started?industry=${industry.slug}`}
              className="btn-ai inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all"
            >
              Launch a {industry.name.toLowerCase()} agent
            </Link>
            <Link
              href={`/industries/${industry.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/30 px-5 py-2.5 text-sm text-foreground/90 backdrop-blur-md transition-colors hover:border-primary/40 hover:text-foreground"
            >
              Read the full {industry.name.toLowerCase()} playbook
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08} className="self-stretch">
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 240, damping: 20 }}
            className="card-glow ring-gradient industry-reel-sticky overflow-hidden rounded-2xl p-6 md:p-8"
          >
            <span className="scan-line" aria-hidden />
            <div className="relative flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                <Quote className="size-3.5 text-primary" aria-hidden />
                How it sounds on the call
              </span>
              <span className="flex h-3.5 items-end gap-[2px]" aria-hidden>
                {VOICE_BAR_HEIGHTS.map((h, i) => (
                  <span
                    key={i}
                    className="voice-bar w-[2px] rounded-full"
                    style={{
                      height: `${h}px`,
                      background: "linear-gradient(to top, var(--ai-cyan), var(--ai-magenta))",
                      animationDelay: `${i * 90}ms`,
                    }}
                  />
                ))}
              </span>
            </div>
            <div className="relative mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {industry.sampleLines.map((line, i) => {
                const ReelIcon = i === 0 ? AccentA : i === 2 ? AccentB : Icon
                const middle = i === 1
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div
                      animate={{ y: [0, middle ? -8 : 8, 0] }}
                      transition={{
                        duration: 4.5 + i * 0.4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 0.6 + i * 0.1,
                      }}
                      className="flex flex-col items-center gap-3 rounded-xl border border-border/40 bg-background/40 p-3 text-center"
                    >
                      {/* "Portrait" image, built from the industry's icon set instead of a photo */}
                      <div className="ring-gradient relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-md">
                        <span
                          aria-hidden
                          className="absolute inset-0"
                          style={{
                            background:
                              "conic-gradient(from 0deg, var(--ai-cyan), var(--ai-violet), var(--ai-magenta), var(--ai-mint), var(--ai-cyan))",
                          }}
                        />
                        <span className="absolute inset-[2px] rounded-full bg-background" />
                        <ReelIcon className="relative size-6 text-primary" aria-hidden />
                      </div>
                      <p className="text-pretty text-[11px] leading-relaxed text-foreground/90">
                        &ldquo;
                        <RisingText text={line} baseDelay={0.15 + i * 0.1} />
                        &rdquo;
                      </p>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
