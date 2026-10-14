import { Mulish, Playfair_Display, Rubik } from 'next/font/google'

// Fonts for the Travel LP sections (Figma: Travellian - Travel Agency Landing Page).
// Playfair Display for headings, Rubik for everything else.
// Mulish is only the Special Offer card title.
export const mulish = Mulish({
  subsets: ['latin'],
  display: 'swap',
})

export const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
})

export const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
})
