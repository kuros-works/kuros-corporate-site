import React from 'react'

import type { TravelFooterBlock as TravelFooterBlockProps } from '@/payload-types'

import { TravelFooter } from '@/components/TravelLp/Footer'

export const TravelFooterBlock: React.FC<TravelFooterBlockProps> = ({
  columns,
  contact,
  copyright,
  logoText,
  social,
}) => (
  <TravelFooter
    columns={(columns ?? []).map(({ links, title }) => ({
      links: (links ?? []).map(({ href, label }) => ({ href: href || undefined, label })),
      title,
    }))}
    contact={contact}
    copyright={copyright}
    logoText={logoText}
    socialTitle={social?.title}
  />
)
