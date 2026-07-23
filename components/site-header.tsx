"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const NAV = [
  { href: "/features", label: "Features" },
  { href: "/industries", label: "Industries" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
]

export function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="absolute inset-x-0 top-0 h-full border-b border-white/40 bg-gradient-to-b from-white/70 via-white/45 to-white/25 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.22)] backdrop-blur-2xl backdrop-saturate-200 dark:border-white/10 dark:from-white/10 dark:via-white/[0.05] dark:to-white/[0.02]" />
      {/* glossy bottom edge highlight */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent dark:via-white/20" />
      <div className="relative mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="9278.ai home">
          <Logo height={38} priority />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 rounded-full border border-white/50 bg-gradient-to-b from-white/55 to-white/20 px-2 py-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7),0_8px_24px_-8px_rgba(0,0,0,0.22)] backdrop-blur-2xl backdrop-saturate-200 dark:border-white/15 dark:from-white/10 dark:to-white/[0.04] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] md:flex"
        >
          {NAV.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative rounded-full px-4 py-1.5 text-sm transition-all hover:bg-card/80 hover:text-foreground ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden h-9 sm:inline-flex">
            <a href="https://voice.9278.ai/" target="_blank" rel="noopener noreferrer">
              Sign in
            </a>
          </Button>
          <Button asChild size="sm" className="group btn-ai h-9 rounded-full px-4">
            <Link href="/get-started">
              Get started
              <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="gap-0 border-b border-border/60 p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-20 items-center justify-between border-b border-border/40 px-4">
                <Link href="/" className="flex items-center gap-2" aria-label="9278.ai home">
                  <Logo height={34} />
                </Link>
              </div>

              <nav aria-label="Mobile" className="flex flex-col px-4 py-2">
                {NAV.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                  return (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`border-b border-border/30 py-4 text-base transition-colors last:border-0 hover:text-foreground ${
                          isActive ? "font-medium text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  )
                })}
              </nav>

              <div className="flex flex-col gap-4 border-t border-border/40 px-4 py-5">
                <SheetClose asChild>
                  <a
                    href="https://voice.9278.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Sign in
                  </a>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild size="lg" className="group btn-ai w-full rounded-full text-primary-foreground">
                    <Link href="/get-started">
                      Get started
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
