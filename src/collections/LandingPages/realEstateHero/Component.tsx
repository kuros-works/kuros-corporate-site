import React from 'react'

import type { RealEstateHeroBlock as RealEstateHeroBlockProps } from '@/payload-types'

import { RealEstateHero } from '@/components/RealEstateHero'
import { mediaSrc, mediaSrcSet } from '../mediaSrc'

export const RealEstateHeroBlock: React.FC<RealEstateHeroBlockProps> = ({
  backgroundImage,
  heading,
  lead,
  listingsLink,
}) => (
  <RealEstateHero
    backgroundAlt={
      backgroundImage && typeof backgroundImage === 'object' ? backgroundImage.alt : null
    }
    backgroundHeight={
      backgroundImage && typeof backgroundImage === 'object'
        ? (backgroundImage.height ?? undefined)
        : undefined
    }
    // The photo fills the section's width, capped at the 1440px Figma frame.
    backgroundSizes="(min-width: 1440px) 1440px, 100vw"
    // Smaller variants first so a browser without srcset support doesn't fetch xlarge.
    backgroundSrc={mediaSrc(backgroundImage, ['large', 'medium', 'xlarge'])}
    backgroundSrcSet={mediaSrcSet(backgroundImage)}
    backgroundWidth={
      backgroundImage && typeof backgroundImage === 'object'
        ? (backgroundImage.width ?? undefined)
        : undefined
    }
    heading={heading}
    lead={lead}
    listingsHref={listingsLink.href || undefined}
    listingsLabel={listingsLink.label}
  />
)
