import { DM_Sans, Inter } from 'next/font/google'

// Fonts for the SaaS LP portfolio sections (Figma: SaaS LP ポートフォリオ用).
// The design pins DM Sans' optical-size axis to 14 instead of letting it
// auto-scale with font size, so the axis is loaded and fixed via `dmSansOpsz`.
export const dmSans = DM_Sans({
  subsets: ['latin'],
  axes: ['opsz'],
  display: 'swap',
})

export const dmSansOpsz = '[font-variation-settings:"opsz"_14]'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
