import type { LandingPage } from '@/payload-types'

export type LandingPageTheme = 'default' | 'ledgerly' | 'realEstate'

// Which design an LP renders with — decided in one place so page.tsx and the
// block renderer agree.
export const getLandingPageTheme = (
  landingPage: Pick<LandingPage, 'hero' | 'slug'>,
): LandingPageTheme => {
  if (landingPage.hero?.[0]?.blockType === 'ledgerlyHero') return 'ledgerly'
  if (landingPage.hero?.[0]?.blockType === 'realEstateHero') return 'realEstate'

  // Temporary: keeps the real-estate LP themed until its hero is set to
  // realEstateHero in the admin. Remove once that's done (PR5).
  if (landingPage.slug.startsWith('real-estate')) return 'realEstate'

  return 'default'
}
