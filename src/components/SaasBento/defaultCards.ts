// Card copy for SaasBento, in DOM order: top-left, top-center (large),
// top-right, bottom-left, bottom-right. Kept free of font/React imports so
// the LandingPages block config can use it as field defaults.

export type BentoCard = {
  description?: string | null
  heading: string
}

export type BentoCards = [BentoCard, BentoCard, BentoCard, BentoCard, BentoCard]

export const defaultCards = [
  {
    heading: 'Real-time spend tracking',
    description:
      "See exactly where every dollar goes the moment it's spent, no end-of-month surprises.",
  },
  {
    heading: 'Team expense management',
    description:
      'Set budgets by team, route approvals automatically, and keep everyone accountable.',
  },
  {
    heading: 'Effortless collaboration',
    description:
      'Finance, managers, and employees work from the same live numbers — no spreadsheets, no back-and-forth.',
  },
  {
    heading: 'Real-time accounting at your fingertips.',
    description:
      'Say goodbye to manual spreadsheets and endless email reminders. Ledgerly gives your team a live view of every transaction, the moment it happens.',
  },
  {
    heading: 'Optimise team spend, together',
    description:
      'Set budget limits, automate approvals, and give your staff the freedom to spend responsibly. Peace of mind for finance, clarity for everyone.',
  },
] satisfies BentoCards
