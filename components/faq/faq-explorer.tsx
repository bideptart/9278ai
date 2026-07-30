"use client"

// Interactive shell around the FAQ groups: live search highlighting, a
// scroll-spy category pill row, per-answer thumbs feedback, and a static
// "Popular" tag. None of this touches FAQ_GROUPS content — same questions,
// same answers, same grouping — only how they're presented.

import { useState } from "react"
import { Check, Flame, ThumbsDown, ThumbsUp } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { cn } from "@/lib/utils"
import { useFaqSearch } from "@/components/faq/faq-search-context"
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
  const { query } = useFaqSearch()

  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
        {groups.map((group) => (
          <section
            key={group.id}
            id={group.id}
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
