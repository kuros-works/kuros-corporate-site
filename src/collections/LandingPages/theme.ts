import type { LandingPage } from '@/payload-types'

export type LandingPageTheme = 'default' | 'ledgerly' | 'realEstate'

// Which design an LP renders with — decided in one place so page.tsx and the
// block renderer agree.
export const getLandingPageTheme = (
  landingPage: Pick<LandingPage, 'hero' | 'slug'>,
): LandingPageTheme => {
  if (landingPage.hero?.[0]?.blockType === 'ledgerlyHero') return 'ledgerly'

  // Temporary: the real-estate LP has no hero block of its own yet, so match
  // on the slug. Switch to the hero's blockType once realEstateHero exists.
  if (landingPage.slug.startsWith('real-estate')) return 'realEstate'

  return 'default'
}
