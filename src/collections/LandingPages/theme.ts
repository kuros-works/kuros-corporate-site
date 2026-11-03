import type { LandingPage } from '@/payload-types'

export type LandingPageTheme = 'default' | 'ledgerly' | 'realEstate' | 'travel'

// Which design an LP renders with — decided in one place so page.tsx and the
// block renderer agree.
export const getLandingPageTheme = (
  landingPage: Pick<LandingPage, 'hero' | 'slug'>,
): LandingPageTheme => {
  if (landingPage.hero?.[0]?.blockType === 'ledgerlyHero') return 'ledgerly'
  if (landingPage.hero?.[0]?.blockType === 'realEstateHero') return 'realEstate'
  if (landingPage.hero?.[0]?.blockType === 'travelHero') return 'travel'

  // Temporary: keeps the real-estate LP themed until its hero is set to
  // realEstateHero in the admin. Remove once that's done (PR5).
  if (landingPage.slug.startsWith('real-estate')) return 'realEstate'

  return 'default'
}

// The LP layout declares <html lang="en">; only the Typish LP (Setagaya) is Japanese.
export const getLandingPageLang = (landingPage: Pick<LandingPage, 'hero'>): 'en' | 'ja' =>
  landingPage.hero?.[0]?.blockType === 'typishHero' ? 'ja' : 'en'
