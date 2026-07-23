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
        className={cn("relative w-full overflow-hidden rounded-[2rem] border border-primary/20 shadow-xl", className)}
        {...props}
      >
        <img
          src={imageSrc}
          alt=""
          className={cn("absolute inset-0 h-full w-full object-cover", imageClassName)}
          aria-hidden="true"
        />
        {/* Brand-red tinted overlay by default; pass overlayClassName to swap in another palette */}
        <div className={cn("absolute inset-0 bg-gradient-to-br from-black/80 via-primary/25 to-primary/70", overlayClassName)} />

        <motion.div
          className="relative z-10 grid h-full grid-cols-1 items-center gap-8 p-8 md:grid-cols-2 md:p-12 lg:p-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="flex flex-col items-start text-left text-white">
            <motion.h2 className="text-3xl font-serif font-normal tracking-tight md:text-4xl lg:text-5xl" variants={itemVariants}>
              {title}
            </motion.h2>
            <motion.p className="mt-4 max-w-xl text-lg text-neutral-200" variants={itemVariants}>
              {description}
            </motion.p>
          </div>

          <motion.div className="flex w-full max-w-md flex-col items-center justify-center md:justify-self-end" variants={itemVariants}>
            {actions ? (
              <div className="flex w-full flex-wrap items-center gap-3 sm:justify-end">{actions}</div>
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
