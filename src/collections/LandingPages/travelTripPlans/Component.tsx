import React from 'react'

import type { TravelTripPlansBlock as TravelTripPlansBlockProps } from '@/payload-types'

import { TravelTripPlans } from '@/components/TravelLp/TripPlans'
import { mediaSrc } from '../mediaSrc'

export const TravelTripPlansBlock: React.FC<TravelTripPlansBlockProps> = ({
  buttonLabel,
  description,
  heading,
  items,
}) => (
  <TravelTripPlans
    buttonLabel={buttonLabel}
    description={description}
    heading={heading}
    items={(items ?? []).map(({ category, duration, image, price, title }) => ({
      category,
      duration,
      imageAlt: image && typeof image === 'object' ? image.alt : null,
      imageSrc: mediaSrc(image),
      price,
      title,
    }))}
  />
)
