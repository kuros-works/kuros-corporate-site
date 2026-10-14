import React from 'react'

import type { TravelOffersBlock as TravelOffersBlockProps } from '@/payload-types'

import { TravelOffers } from '@/components/TravelLp/Offers'
import { mediaSrc } from '../mediaSrc'

export const TravelOffersBlock: React.FC<TravelOffersBlockProps> = ({
  description,
  detailsLabel,
  heading,
  items,
  pricePrefix,
}) => (
  <TravelOffers
    description={description}
    detailsLabel={detailsLabel}
    heading={heading}
    items={(items ?? []).map(({ description, image, price, title }) => ({
      description,
      imageAlt: image && typeof image === 'object' ? image.alt : null,
      imageSrc: mediaSrc(image),
      price,
      title,
    }))}
    pricePrefix={pricePrefix}
  />
)
