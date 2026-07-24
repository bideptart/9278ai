"use client"

// Shares search query + scroll-spy active section between the search bar
// (rendered in the hero) and the results list (rendered further down the
// page) without needing them to be the same component instance.

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { FaqGroup } from "@/lib/faq"

type FaqSearchContextValue = {
  query: string
  setQuery: (q: string) => void
  activeId: string
  groups: FaqGroup[]
}

const FaqSearchContext = createContext<FaqSearchContextValue | null>(null)

export function FaqSearchProvider({ groups, children }: { groups: FaqGroup[]; children: ReactNode }) {
  const [query, setQuery] = useState("")
  const [activeId, setActiveId] = useState(groups[0]?.id ?? "")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    )
    const elements = groups.map((g) => document.getElementById(g.id)).filter((el): el is HTMLElement => Boolean(el))
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [groups])

  return <FaqSearchContext.Provider value={{ query, setQuery, activeId, groups }}>{children}</FaqSearchContext.Provider>
}

export function useFaqSearch() {
  const ctx = useContext(FaqSearchContext)
  if (!ctx) throw new Error("useFaqSearch must be used within FaqSearchProvider")
  return ctx
}
