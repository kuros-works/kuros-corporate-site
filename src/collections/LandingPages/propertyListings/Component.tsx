import React from 'react'

import type {
  Property,
  PropertyListingsBlock as PropertyListingsBlockProps,
} from '@/payload-types'

import { RealEstateListings } from '@/components/RealEstateListings'
import { mediaSrc } from '../mediaSrc'

export const PropertyListingsBlock: React.FC<PropertyListingsBlockProps> = ({
  heading,
  description,
  properties,
}) => {
  // Unpopulated entries (bare IDs, e.g. a deleted property) are skipped.
  const populated = (properties || []).filter(
    (property): property is Property => typeof property === 'object' && property !== null,
  )

  return (
    <RealEstateListings
      description={description}
      heading={heading}
      properties={populated.map(({ id, title, image, bedrooms, bathrooms, size }) => ({
        bathrooms,
        bedrooms,
        id,
        imageAlt: image && typeof image === 'object' ? image.alt : null,
        imageSrc: mediaSrc(image),
        size,
        title,
      }))}
    />
  )
}
