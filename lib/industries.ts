import {
  Home,
  Stethoscope,
  HeartPulse,
  Wrench,
  UtensilsCrossed,
  Car,
  Scale,
  GraduationCap,
  ShoppingBag,
  Dumbbell,
  type LucideIcon,
} from "lucide-react"

export type Industry = {
  slug: string
  name: string
  icon: LucideIcon
  short: string
  /** Verbatim substring of `short` to render in the brand accent colour
   * wherever `short` is used as a headline — never as body copy, where the
   * full line stays a single colour. Optional; headings fall back to plain
   * black text if unset or if the substring doesn't match. */
  shortHighlight?: string
  /** One tight sentence-pair of positioning — kept short so the section's left
   * column stays scannable. Also serves as the meta description upstream. */
  pitch: string
  /** Bullet points: things the agent does on day one. */
  jobs: string[]
  /** Representative phrases the agent handles well. Kept under ~50 characters
   * so every reel card renders in three lines or fewer at the same height. */
  sampleLines: string[]
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "real-estate",
    name: "Real estate",
    icon: Home,
    short:
      "Qualify buyer & seller leads 24/7, book showings, and follow up instantly when listings get hits.",
    shortHighlight: "follow up instantly",
    pitch:
      "Leads die when no one picks up in the first five minutes. 9278.ai answers instantly, qualifies buyers and sellers, and books showings on your calendar.",
    jobs: [
      "Answer Zillow, Redfin and website leads in under 3 seconds",
      "Qualify budget, timeline, financing, and motivation",
      "Book and reschedule showings on your team calendar",
      "Send listing follow-ups by SMS and email",
      "Hand warm buyers off to your top agent live on the call",
    ],
    sampleLines: [
      "Saw your inquiry on Maple — working with an agent?",
      "Are you pre-approved, or want a lender intro?",
      "Tuesday at 4 or Saturday at 11 for a showing?",
    ],
  },
  {
    slug: "dental",
    name: "Dental practices",
    icon: Stethoscope,
    short:
      "Confirm appointments, fill cancellations, and answer insurance & treatment questions.",
    pitch:
      "Front desks miss 20–40% of calls at lunch and after hours. 9278.ai picks up every one, fills cancellations, and routes only real emergencies to your team.",
    jobs: [
      "Confirm and reschedule cleanings, hygiene, and ortho visits",
      "Fill last-minute openings from your cancellation list",
      "Verify benefits and explain estimated patient cost",
      "Triage emergencies (toothache, broken crown) and warm-transfer",
      "Send pre-visit instructions and intake forms automatically",
    ],
    sampleLines: [
      "Confirming your cleaning tomorrow at 2:30?",
      "Your plan covers two cleanings a year — you're due.",
      "That sounds urgent. Getting Dr. Lee on now.",
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare clinics",
    icon: HeartPulse,
    short: "Patient intake, prescription refills, and reminder calls with a calm, HIPAA-aware bedside tone.",
    shortHighlight: "HIPAA-aware bedside tone",
    pitch:
      "Clinics drown in repetitive phone work. 9278.ai handles intake, refills, and follow-ups in a warm, paced bedside tone patients actually respond to.",
    jobs: [
      "New patient intake and demographic capture",
      "Prescription refill requests routed to pharmacy",
      "Post-discharge follow-up and symptom tracking",
      "Appointment reminders with re-confirmation flow",
      "Benefits and copay explanations",
    ],
    sampleLines: [
      "How is your pain today, on a scale of 0 to 10?",
      "I can refill your lisinopril at the CVS on Main.",
      "A nurse will call you back within ten minutes.",
    ],
  },
  {
    slug: "home-services",
    name: "Home services",
    icon: Wrench,
    short:
      "Capture after-hours service requests, dispatch techs, and never lose jobs to slow callbacks.",
    shortHighlight: "never lose jobs",
    pitch:
      "Contractors live and die by callback speed. 9278.ai answers every after-hours call, captures the job details, and books the right tech on your board.",
    jobs: [
      "After-hours emergency intake (no AC, no heat, water leak)",
      "Same-day vs scheduled job triage",
      "Direct booking on ServiceTitan, Housecall Pro, and Jobber",
      "Quote ranges based on job type and zip code",
      "Estimate-day reminders and arrival-window updates",
    ],
    sampleLines: [
      "No cold air since noon — marking this priority.",
      "Next window is 7–9pm, $129 plus parts. Lock it in?",
      "Mike is 22 minutes out. I'll text at the door.",
    ],
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    icon: UtensilsCrossed,
    short:
      "Take reservations, confirm parties, and answer hours & menu questions fluently.",
    shortHighlight: "menu questions fluently",
    pitch:
      "Phones during dinner rush are a tax on your hosts. 9278.ai takes reservations, confirms parties, and answers menu questions so the room comes first.",
    jobs: [
      "Reservation booking and modification on OpenTable / Resy",
      "Large-party and private-event qualification",
      "Hours, parking, and dress-code questions",
      "Allergen and dietary inquiries with menu lookups",
      "Catering and gift-card lead capture",
    ],
    sampleLines: [
      "A 4-top is open Friday at 7:30 or 8:45.",
      "Tagliatelle is egg-based, spaghetti is vegan.",
      "For a party of 12, I'd suggest the back room.",
    ],
  },
  {
    slug: "automotive",
    name: "Automotive",
    icon: Car,
    short:
      "Schedule service, follow up on test drives, and keep BDCs ringing 24/7.",
    pitch:
      "Dealerships still lose deals overnight. 9278.ai books service, follows up on test drives, and answers parts and trade-in questions around the clock.",
    jobs: [
      "Service appointment booking by VIN and mileage",
      "Test-drive follow-up and credit pre-qual",
      "Parts and warranty inquiries",
      "Trade-in valuation lead capture",
      "Loaner-vehicle dispatch coordination",
    ],
    sampleLines: [
      "Your Outback is due for its 30k service.",
      "Send me the VIN and I'll price your trade-in.",
      "Loaner confirmed for your Tuesday drop-off.",
    ],
  },
  {
    slug: "legal",
    name: "Legal",
    icon: Scale,
    short:
      "Intake new clients, qualify cases, and book consults without tying up paralegals.",
    pitch:
      "Firms live on intake. 9278.ai screens every call against your qualification rules, captures the facts attorneys need, and books the consult.",
    jobs: [
      "Practice-area routing and conflict checks",
      "Statute-of-limitations and jurisdiction screening",
      "Paid-consult booking with payment capture",
      "Document-collection reminders pre-consult",
      "Spanish-language intake out of the box",
    ],
    sampleLines: [
      "Was a police report filed after the accident?",
      "You're inside the two-year window in Texas.",
      "Antes de la consulta, necesito su identificación.",
    ],
  },
  {
    slug: "education",
    name: "Education",
    icon: GraduationCap,
    short:
      "Handle admissions, financial-aid follow-ups, and student calls without burning out counselors.",
    pitch:
      "Schools field hundreds of inquiries a day. 9278.ai handles first-touch outreach, chases aid documents, and re-engages students who stalled.",
    jobs: [
      "Inquiry-form follow-up within 60 seconds",
      "Application status checks and document chasing",
      "Financial-aid Q&A and FAFSA reminders",
      "Class-start reminders and orientation booking",
      "At-risk student check-ins between terms",
    ],
    sampleLines: [
      "Want me to walk you through the next steps?",
      "We're still missing your high-school transcript.",
      "The next term starts Jan 22 — still registering?",
    ],
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    icon: ShoppingBag,
    short:
      "Handle order status, returns, sizing, and more 24/7 in any language.",
    pitch:
      "Support volume spikes the moment a campaign lands. 9278.ai absorbs the surge — order status, returns, sizing — and escalates only the angry ones.",
    jobs: [
      "Order status and tracking updates",
      "Returns, exchanges, and warranty intake",
      "Sizing, fit, and product-recommendation Q&A",
      "Upsell and replenishment follow-up calls",
      "Win-back campaigns for lapsed customers",
    ],
    sampleLines: [
      "Your order is out for delivery today by 6pm.",
      "I'll send a return label. Refund to your card?",
      "The size 9 should fit better than the 8.5.",
    ],
  },
  {
    slug: "fitness",
    name: "Fitness & wellness",
    icon: Dumbbell,
    short: "Handle class bookings, memberships, and no-show recovery for studios & gyms.",
    pitch:
      "Studios fill classes by phone and SMS. 9278.ai books sessions, recovers no-shows, and wins back lapsed members for a fraction of an answering service.",
    jobs: [
      "Class and trainer booking on Mindbody, Mariana Tek, ClubReady",
      "Membership freeze, cancel, and upgrade requests",
      "No-show recovery within minutes of class end",
      "Trial-to-member upsell calls",
      "Win-back to lapsed members at month-end",
    ],
    sampleLines: [
      "You missed the 6am — want the 5pm spot tonight?",
      "Your trial ends Friday. Unlimited is $149.",
      "We can freeze your membership for up to 90 days.",
    ],
  },
]

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug)
}
