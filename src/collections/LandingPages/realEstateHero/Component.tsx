import React from 'react'

import type { RealEstateHeroBlock as RealEstateHeroBlockProps } from '@/payload-types'

import { RealEstateHero } from '@/components/RealEstateHero'
import { mediaSrc } from '../mediaSrc'

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
    backgroundSrc={mediaSrc(backgroundImage)}
    heading={heading}
    lead={lead}
    listingsHref={listingsLink.href || undefined}
    listingsLabel={listingsLink.label}
  />
)
