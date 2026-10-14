import React from 'react'

import type { TravelDestinationsBlock as TravelDestinationsBlockProps } from '@/payload-types'

import { TravelDestinations } from '@/components/TravelLp/Destinations'
import { mediaSrc } from '../mediaSrc'

export const TravelDestinationsBlock: React.FC<TravelDestinationsBlockProps> = ({
  description,
  heading,
  items,
}) => (
  <TravelDestinations
    description={description}
    heading={heading}
    items={(items ?? []).map(({ image, location, title }) => ({
      imageAlt: image && typeof image === 'object' ? image.alt : null,
      imageSrc: mediaSrc(image),
      location,
      title,
    }))}
  />
)
