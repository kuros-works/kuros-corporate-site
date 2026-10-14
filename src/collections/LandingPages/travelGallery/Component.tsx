import React from 'react'

import type { TravelGalleryBlock as TravelGalleryBlockProps } from '@/payload-types'

import { TravelGallery, type TravelGalleryImage } from '@/components/TravelLp/Gallery'
import { mediaSrc } from '../mediaSrc'

export const TravelGalleryBlock: React.FC<TravelGalleryBlockProps> = ({
  description,
  heading,
  images,
}) => {
  const items = (images ?? []).flatMap<TravelGalleryImage>(({ image }) => {
    const imageSrc = mediaSrc(image)
    // A photo is all a slide has, so an unpopulated or deleted one is skipped.
    if (!imageSrc) return []

    return [{ imageAlt: image && typeof image === 'object' ? image.alt : null, imageSrc }]
  })

  return <TravelGallery description={description} heading={heading} images={items} />
}
