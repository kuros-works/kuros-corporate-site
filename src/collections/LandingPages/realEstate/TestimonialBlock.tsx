import React from 'react'

import type { TestimonialBlock as TestimonialBlockProps } from '@/payload-types'

import {
  RealEstateTestimonials,
  type RealEstateTestimonial,
} from '@/components/RealEstateTestimonials'
import { mediaSrc } from '../mediaSrc'

// The shared Testimonial block's data, drawn with the real-estate design. Swapped
// in by RenderLandingPageBlocks only when the LP's theme is realEstate.
export const RealEstateTestimonialBlock: React.FC<TestimonialBlockProps> = ({ testimonials }) => {
  const items = (testimonials ?? []).flatMap<RealEstateTestimonial>(({ avatar, name, quote, role }) => {
    const avatarSrc = mediaSrc(avatar)
    // Same rule as TestimonialBlock: an unpopulated or deleted avatar skips the card.
    if (!avatarSrc) return []

    return [{ avatarSrc, name, quote, role }]
  })

  return <RealEstateTestimonials testimonials={items} />
}
