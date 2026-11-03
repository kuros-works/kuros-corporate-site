import React from 'react'

import type { TestimonialBlock as TestimonialBlockProps } from '@/payload-types'

import { mediaSrc } from '@/collections/LandingPages/mediaSrc'
import { SaasTestimonials, type Testimonial } from '@/components/SaasTestimonials'

export const TestimonialBlock: React.FC<TestimonialBlockProps> = ({ testimonials }) => {
  // Avatars render at 60px, so the 300px thumbnail is plenty (originals can be MBs).
  const items = (testimonials ?? []).flatMap<Testimonial>(({ avatar, avatarCover, name, quote, role }) => {
    const avatarUrl = mediaSrc(avatar, 'thumbnail')
    // An unpopulated or deleted avatar would render a broken <img>, so skip the card.
    if (!avatarUrl) return []

    return [
      {
        avatar: avatarUrl,
        avatarCover: mediaSrc(avatarCover, 'thumbnail') || undefined,
        name,
        quote,
        role: role || undefined,
      },
    ]
  })

  return <SaasTestimonials testimonials={items} />
}
