"use client"

// Interactive shell around the FAQ groups: live search highlighting, a
// scroll-spy category pill row, per-answer thumbs feedback, and a static
// "Popular" tag. None of this touches FAQ_GROUPS content — same questions,
// same answers, same grouping — only how they're presented.

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Check, Flame, Search, ThumbsDown, ThumbsUp } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { cn } from "@/lib/utils"
import type { FaqGroup } from "@/lib/faq"

// Deterministic "trending" flag seeded from the question text itself, so it's
// stable across renders/reloads without any real usage tracking.
function isPopular(q: string) {
  let hash = 0
  for (let i = 0; i < q.length; i++) hash = (hash * 31 + q.charCodeAt(i)) >>> 0
  return hash % 5 === 0
}

function highlightMatch(text: string, query: string) {
  const q = query.trim()
  if (!q) return text
  const idx = text.toLowerCase().indexOf(q.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-primary/20 text-foreground">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  )
}

function FeedbackButtons() {
  const [vote, setVote] = useState<"up" | "down" | null>(null)
  return (
    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
      <span>Was this helpful?</span>
      <button
        type="button"
        onClick={() => setVote("up")}
        aria-label="Yes, this was helpful"
        aria-pressed={vote === "up"}
        className={cn(
          "inline-flex h-7 w-7 items-center justify-center rounded-full border transition-colors",
          vote === "up" ? "border-primary text-primary" : "border-border/60 hover:border-primary/40 hover:text-foreground",
        )}
      >
        {vote === "up" ? (
          <Check className="h-3.5 w-3.5 animate-in zoom-in-50 duration-200" />
        ) : (
          <ThumbsUp className="h-3.5 w-3.5" />
        )}
      </button>
      <button
        type="button"
        onClick={() => setVote("down")}
        aria-label="No, this wasn't helpful"
        aria-pressed={vote === "down"}
        className={cn(
          "inline-flex h-7 w-7 items-center justify-center rounded-full border transition-colors",
          vote === "down" ? "border-primary text-primary" : "border-border/60 hover:border-primary/40 hover:text-foreground",
        )}
      >
        {vote === "down" ? (
          <Check className="h-3.5 w-3.5 animate-in zoom-in-50 duration-200" />
        ) : (
          <ThumbsDown className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  )
}

export function FaqExplorer({ groups }: { groups: FaqGroup[] }) {
  const [query, setQuery] = useState("")
  const [activeId, setActiveId] = useState(groups[0]?.id ?? "")
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    )
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [groups])

  return (
    <>
      {/* Search + category pill scroll-spy */}
      <ScrollReveal className="mt-36">
        <form
          className="mx-auto flex max-w-lg items-center gap-1 rounded-full border border-border/60 bg-background p-1.5 shadow-sm"
          onSubmit={(e) => {
            e.preventDefault()
            const q = query.trim().toLowerCase()
            if (!q) return
            const match = groups.flatMap((g) => g.items).find((item) => item.q.toLowerCase().includes(q))
            if (match) {
              const groupId = groups.find((g) => g.items.includes(match))?.id
              if (groupId) document.getElementById(groupId)?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
          }}
        >
          <Search className="ml-3 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions…"
            aria-label="Search FAQ"
            className="h-9 border-0 bg-transparent shadow-none focus-visible:ring-0"
          />
          <button
            type="submit"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Search
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </form>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {groups.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors",
                activeId === g.id
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-border/60 bg-card/30 text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {g.title}
            </a>
          ))}
        </div>
      </ScrollReveal>

      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24">
        {groups.map((group) => (
          <section
            key={group.id}
            id={group.id}
            ref={(el) => {
              sectionRefs.current[group.id] = el
            }}
            className="scroll-mt-24 border-b border-border/50 py-10 first:pt-0 last:border-b-0"
          >
            <ScrollReveal>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{group.title}</h2>
            </ScrollReveal>

            <ScrollReveal className="mt-6">
              <Accordion type="single" collapsible className="w-full space-y-3">
                {group.items.map((item, i) => {
                  const matches = query.trim() ? item.q.toLowerCase().includes(query.toLowerCase()) : true
                  return (
                    <AccordionItem
                      key={i}
                      value={`${group.id}-${i}`}
                      className={cn(
                        "card-glow rounded-2xl border-0 px-5 transition-colors data-[state=open]:border data-[state=open]:border-primary/30",
                        "transition-opacity duration-300",
                        !matches && "opacity-30",
                      )}
                    >
                      <AccordionTrigger className="text-left text-base font-medium hover:no-underline data-[state=open]:text-primary">
                        <span className="flex flex-wrap items-center gap-2">
                          {highlightMatch(item.q, query)}
                          {isPopular(item.q) && (
                            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                              <Flame className="h-3 w-3" /> Popular
                            </span>
                          )}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-pretty leading-relaxed text-muted-foreground">
                        {item.a}
                        <FeedbackButtons />
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </ScrollReveal>
          </section>
        ))}
      </div>
    </>
  )
}
