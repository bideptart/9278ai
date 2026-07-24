"use client"

import * as React from "react"
import { motion, type Variants } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"

interface CtaCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string
  title: string
  description: string
  inputPlaceholder?: string
  buttonText?: string
  onButtonClick?: (email: string) => void
  /** Custom actions (e.g. existing buttons/links) rendered instead of the email capture form. */
  actions?: React.ReactNode
  /** Overrides the default brand-red overlay gradient (e.g. for a grey/monochrome variant). */
  overlayClassName?: string
  /** Extra classes for the background image (e.g. desaturating it for a grey variant). */
  imageClassName?: string
  /** Overrides the default white title/description text color (e.g. for a light-background variant). */
  textClassName?: string
  /** Overrides the default light-grey description text color. */
  descriptionClassName?: string
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
}

const CtaCard = React.forwardRef<HTMLDivElement, CtaCardProps>(
  (
    {
      className,
      imageSrc,
      title,
      description,
      inputPlaceholder = "Email address",
      buttonText,
      onButtonClick,
      actions,
      overlayClassName,
      imageClassName,
      textClassName,
      descriptionClassName,
      ...props
    },
    ref,
  ) => {
    const [email, setEmail] = React.useState("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      onButtonClick?.(email)
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-[2rem] border border-primary/35 shadow-[0_24px_60px_-20px_color-mix(in_oklch,var(--primary)_28%,transparent),0_8px_20px_-8px_color-mix(in_oklch,var(--primary)_16%,transparent)]",
          className,
        )}
        {...props}
      >
        <img
          src={imageSrc}
          alt=""
          className={cn("absolute inset-0 h-full w-full object-cover", imageClassName)}
          aria-hidden="true"
        />
        {/* Brand-red tinted overlay by default; pass overlayClassName to swap in another palette */}
        <div className={cn("absolute inset-0", overlayClassName ?? "bg-gradient-to-br from-black/80 via-primary/25 to-primary/70")} />

        <motion.div
          className="relative z-10 grid h-full grid-cols-1 items-center gap-8 p-8 md:grid-cols-2 md:p-12 lg:p-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className={cn("flex flex-col items-start text-left text-white", textClassName)}>
            <motion.h2 className="text-3xl font-serif font-normal tracking-tight md:text-4xl lg:text-5xl" variants={itemVariants}>
              {title}
            </motion.h2>
            <motion.p className={cn("mt-4 max-w-xl text-lg text-neutral-200", descriptionClassName)} variants={itemVariants}>
              {description}
            </motion.p>
          </div>

          <motion.div className="flex w-full max-w-md flex-col items-center justify-center md:justify-self-end" variants={itemVariants}>
            {actions ? (
              <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-end">{actions}</div>
            ) : (
              <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:flex-row">
                <Input
                  type="email"
                  placeholder={inputPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 flex-grow border-white/20 bg-white/10 text-white placeholder:text-neutral-400 focus-visible:ring-primary"
                  aria-label={inputPlaceholder}
                  required
                />
                <Button type="submit" size="lg" className="btn-ai h-12 shrink-0 rounded-full text-primary-foreground">
                  {buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    )
  },
)

CtaCard.displayName = "CtaCard"

export { CtaCard }
