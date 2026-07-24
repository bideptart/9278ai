"use client"

// The search input + category pill row, split out of FaqExplorer so it can
// be rendered inside the hero section while still driving the results list
// further down the page via FaqSearchProvider.

import { ArrowRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useFaqSearch } from "@/components/faq/faq-search-context"

export function FaqSearchBar() {
  const { query, setQuery, activeId, groups } = useFaqSearch()

  return (
    <>
      <form
        className="mx-auto flex max-w-lg items-center gap-1 rounded-full border border-primary/40 bg-background p-1.5 shadow-[0_0_0_4px_color-mix(in_oklch,var(--primary)_10%,transparent),0_12px_30px_-12px_color-mix(in_oklch,var(--primary)_35%,transparent)] transition-shadow focus-within:border-primary/60 focus-within:shadow-[0_0_0_4px_color-mix(in_oklch,var(--primary)_16%,transparent),0_12px_30px_-12px_color-mix(in_oklch,var(--primary)_45%,transparent)]"
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
    </>
  )
}
