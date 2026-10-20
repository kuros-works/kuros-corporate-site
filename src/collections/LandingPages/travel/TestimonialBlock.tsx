import React from 'react'

import type { TestimonialBlock as TestimonialBlockProps } from '@/payload-types'

import { TravelTestimonials, type TravelTestimonial } from '@/components/TravelLp/Testimonials'
import { mediaSrc } from '../mediaSrc'

// The shared Testimonial block has no heading fields, so the travel design's
// heading and description (Figma 9:547 / 9:549) are fixed here. The copy
// differs from Figma after review.
const heading = 'Travelers’ Experiences'
const description = 'Hear from travelers who booked with us'

// The shared Testimonial block's data, drawn with the travel design. Swapped
// in by RenderLandingPageBlocks only when the LP's theme is travel.
export const TravelTestimonialBlock: React.FC<TestimonialBlockProps> = ({ testimonials }) => {
  const items = (testimonials ?? []).flatMap<TravelTestimonial>(({ avatar, name, quote, role }) => {
    const avatarSrc = mediaSrc(avatar)
    // Same rule as TestimonialBlock: an unpopulated or deleted avatar skips the card.
    if (!avatarSrc) return []

    return [{ avatarSrc, name, quote, role }]
  })

  return <TravelTestimonials description={description} heading={heading} testimonials={items} />
}
