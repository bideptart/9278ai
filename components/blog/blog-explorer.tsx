"use client"

// "Browse by categories" block for the blog index: a search input plus
// category-pill filtering, driving the post grid below it.

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, CalendarDays, Clock, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { cn } from "@/lib/utils"
import { formatPostDate, type BlogPost } from "@/lib/blog"

export function BlogExplorer({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = useMemo(() => ["All", ...Array.from(new Set(posts.map((p) => p.category)))], [posts])

  const featured = posts.find((p) => p.featured) ?? posts[0]

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [posts, activeCategory, query])

  const isFiltering = activeCategory !== "All" || query.trim() !== ""
  const gridPosts = isFiltering ? filtered : filtered.filter((p) => p.slug !== featured.slug)

  return (
    <>
      <ScrollReveal>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Categories</span>
            <h2 className="mt-2 text-balance text-3xl font-serif font-normal tracking-tight md:text-4xl">
              Browse by categories
            </h2>
            <p className="mt-2 text-pretty text-muted-foreground">
              Guides, playbooks, and voice AI deep-dives across {categories.length - 1} topics.
            </p>
          </div>

          <form
            className="flex w-full max-w-md items-center gap-1 rounded-full border border-primary/40 bg-background p-1.5 shadow-[0_0_0_4px_color-mix(in_oklch,var(--primary)_10%,transparent),0_12px_30px_-12px_color-mix(in_oklch,var(--primary)_35%,transparent)] transition-shadow focus-within:border-primary/60 focus-within:shadow-[0_0_0_4px_color-mix(in_oklch,var(--primary)_16%,transparent),0_12px_30px_-12px_color-mix(in_oklch,var(--primary)_45%,transparent)] lg:max-w-sm"
            onSubmit={(e) => e.preventDefault()}
          >
            <Search className="ml-3 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, topics…"
              aria-label="Search blog"
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
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActiveCategory(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                activeCategory === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/60 bg-card/30 text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {!isFiltering && (
        <ScrollReveal className="mt-8">
          <Link
            href={`/blog/${featured.slug}`}
            className="card-glow group grid gap-6 rounded-2xl p-6 md:grid-cols-[1.4fr_1fr] md:p-8"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
                  {featured.category}
                </span>
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" /> {formatPostDate(featured.date)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {featured.readingMinutes} min read
                </span>
              </div>
              <h2 className="mt-4 text-balance text-2xl font-serif font-normal tracking-tight transition-colors group-hover:text-primary md:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{featured.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Read article
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
            {featured.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={featured.cover}
                alt={featured.title}
                className="hidden h-full w-full rounded-xl object-cover ring-1 ring-border/60 md:block"
              />
            ) : (
              <div
                aria-hidden
                className="hidden rounded-xl bg-[radial-gradient(120%_120%_at_20%_0%,rgba(220,38,38,0.14),transparent_60%)] ring-1 ring-border/60 md:block"
              />
            )}
          </Link>
        </ScrollReveal>
      )}

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {gridPosts.map((post) => (
          <ScrollReveal key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="card-glow group flex h-full flex-col overflow-hidden rounded-2xl">
              {post.cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.cover} alt={post.title} className="h-40 w-full object-cover" />
              )}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {post.readingMinutes} min
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <span className="mt-4 text-xs text-muted-foreground">{formatPostDate(post.date)}</span>
              </div>
            </Link>
          </ScrollReveal>
        ))}
        {gridPosts.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-muted-foreground">
            No articles match &ldquo;{query || activeCategory}&rdquo;.
          </p>
        )}
      </div>
    </>
  )
}
