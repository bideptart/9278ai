import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { BlogExplorer } from "@/components/blog/blog-explorer"
import { BLOG_POSTS } from "@/lib/blog"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"

export const metadata: Metadata = pageSeo({
  title: "Blog",
  description:
    "Notes on building AI voice agents that sound human — product, engineering, platform, and compliance insights from the 9278.ai team.",
  path: "/blog",
})

export default function BlogIndexPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />

      {/* Hero */}
      <section className="relative flex min-h-[60svh] items-center overflow-hidden border-b border-border/50 py-12 md:min-h-[calc(100svh-4rem)] md:py-0">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(220,38,38,0.10),transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        />
        <div className="relative mx-auto w-full max-w-4xl px-4 text-center md:px-6">
          <ScrollReveal>
            <span className="ai-pill-magenta">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Blog
            </span>
            <h1 className="mt-6 text-balance text-4xl font-serif font-normal leading-[1.05] tracking-tight md:text-6xl">
              Notes on <span className="text-primary">voice AI.</span>
            </h1>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Product, engineering, platform, and compliance insights from the team building AI voice agents that
              actually sound human.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <BlogExplorer posts={BLOG_POSTS} />
      </section>

      <SiteFooter />
    </main>
  )
}
