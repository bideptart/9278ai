import type { Industry } from "@/lib/industries"

/**
 * Renders `industry.short` as a headline: plain black text with the
 * industry's chosen `shortHighlight` substring — if any, and if it actually
 * occurs verbatim in `short` — rendered in the brand accent colour. Matches
 * the black-heading-with-one-red-phrase pattern used by this page's own hero
 * ("Built for every kind of phone call.") rather than colouring the whole
 * line, which is what a `hover:text-primary` on the wrapping link used to do.
 */
export function HighlightedShort({ industry }: { industry: Pick<Industry, "short" | "shortHighlight"> }) {
  const { short, shortHighlight } = industry
  if (!shortHighlight) return <>{short}</>

  const i = short.indexOf(shortHighlight)
  if (i === -1) return <>{short}</>

  return (
    <>
      {short.slice(0, i)}
      <span className="text-primary">{shortHighlight}</span>
      {short.slice(i + shortHighlight.length)}
    </>
  )
}
