import React, { Fragment } from 'react'

import type { LandingPage } from '@/payload-types'

import { FeatureBlock } from '@/blocks/Feature/Component'
import { PricingBlock } from '@/blocks/Pricing/Component'
import { TestimonialBlock } from '@/blocks/Testimonial/Component'
import { TypishCtaBlock } from './closingCta/Component'
import { TypishFooterBlock } from './footer/Component'
import { TypishHeroBlock } from './hero/Component'
import { LedgerlyCtaBlock } from './ledgerlyCta/Component'
import { LedgerlyFeaturesBlock } from './ledgerlyFeatures/Component'
import { LedgerlyFooterBlock } from './ledgerlyFooter/Component'
import { LedgerlyHeaderBlock } from './ledgerlyHeader/Component'
import { LedgerlyHeroBlock } from './ledgerlyHero/Component'
import { PropertyListingsBlock } from './propertyListings/Component'
import { RealEstateFeatureBlock } from './realEstate/FeatureBlock'
import { RealEstateTestimonialBlock } from './realEstate/TestimonialBlock'
import { RealEstateCtaBlock } from './realEstateCta/Component'
import { RealEstateFooterBlock } from './realEstateFooter/Component'
import { RealEstateHeaderBlock } from './realEstateHeader/Component'
import { RealEstateHeroBlock } from './realEstateHero/Component'
import type { LandingPageTheme } from './theme'

const blockComponents = {
  feature: FeatureBlock,
  ledgerlyCta: LedgerlyCtaBlock,
  ledgerlyFeatures: LedgerlyFeaturesBlock,
  ledgerlyFooter: LedgerlyFooterBlock,
  ledgerlyHeader: LedgerlyHeaderBlock,
  ledgerlyHero: LedgerlyHeroBlock,
  pricing: PricingBlock,
  propertyListings: PropertyListingsBlock,
  realEstateCta: RealEstateCtaBlock,
  realEstateFooter: RealEstateFooterBlock,
  realEstateHeader: RealEstateHeaderBlock,
  realEstateHero: RealEstateHeroBlock,
  testimonial: TestimonialBlock,
  typishCta: TypishCtaBlock,
  typishFooter: TypishFooterBlock,
  typishHero: TypishHeroBlock,
}

// Per-theme replacements for shared blocks: same fields (so no schema change),
// different design. Blocks not listed here fall back to blockComponents.
const themeOverrides: { [T in LandingPageTheme]?: Partial<typeof blockComponents> } = {
  realEstate: {
    feature: RealEstateFeatureBlock,
    testimonial: RealEstateTestimonialBlock,
  },
}

type LandingPageBlock = NonNullable<
  LandingPage['header' | 'hero' | 'layout' | 'closingCta' | 'footer']
>[number]

export const RenderLandingPageBlocks: React.FC<{
  blocks: LandingPageBlock[]
  // Vertical gap around each block — used for the 特徴セクション list, not
  // for the single-block header/hero/CTA/footer sections.
  spaced?: boolean
  theme?: LandingPageTheme
}> = ({ blocks, spaced = false, theme = 'default' }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block
        const key = blockType as keyof typeof blockComponents
        const Block = themeOverrides[theme]?.[key] ?? blockComponents[key]

        if (!Block) return null

        // @ts-expect-error blockType narrows the lookup, but TS can't correlate it with the props union
        const rendered = <Block {...block} />

        return spaced ? (
          <div className="my-16" key={index}>
            {rendered}
          </div>
        ) : (
          <Fragment key={index}>{rendered}</Fragment>
        )
      })}
    </Fragment>
  )
}
