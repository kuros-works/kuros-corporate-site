import React from 'react'

import type { Media, TestimonialBlock as TestimonialBlockProps } from '@/payload-types'

import { SaasTestimonials, type Testimonial } from '@/components/SaasTestimonials'
import { getMediaUrl } from '@/utilities/getMediaUrl'

const mediaSrc = (resource: number | Media | null | undefined) =>
  resource && typeof resource === 'object' ? getMediaUrl(resource.url, resource.updatedAt) : ''

export const TestimonialBlock: React.FC<TestimonialBlockProps> = ({ testimonials }) => {
  const items = (testimonials ?? []).flatMap<Testimonial>(({ avatar, avatarCover, name, quote, role }) => {
    const avatarUrl = mediaSrc(avatar)
    // An unpopulated or deleted avatar would render a broken <img>, so skip the card.
    if (!avatarUrl) return []

    return [
      {
        avatar: avatarUrl,
        avatarCover: mediaSrc(avatarCover) || undefined,
        name,
        quote,
        role: role || undefined,
      },
    ]
  })

  return <SaasTestimonials testimonials={items} />
}
