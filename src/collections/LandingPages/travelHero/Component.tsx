import React from 'react'

import type { TravelHeroBlock as TravelHeroBlockProps } from '@/payload-types'

import { TravelHero } from '@/components/TravelLp/Hero'
import { mediaSrc } from '../mediaSrc'

// The booking form (`form`) is not rendered yet.
export const TravelHeroBlock: React.FC<TravelHeroBlockProps> = ({
  backgroundImage,
  heading,
  lead,
}) => (
  <TravelHero
    backgroundAlt={
      backgroundImage && typeof backgroundImage === 'object' ? backgroundImage.alt : null
    }
    backgroundSrc={mediaSrc(backgroundImage)}
    heading={heading}
    lead={lead}
  />
)
