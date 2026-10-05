import React from 'react'

import type { RealEstateFooterBlock as RealEstateFooterBlockProps } from '@/payload-types'

import { RealEstateFooter } from '@/components/RealEstateFooter'
import { mediaSrc } from '../mediaSrc'

export const RealEstateFooterBlock: React.FC<RealEstateFooterBlockProps> = ({
  columns,
  logo,
  socialLinks,
}) => (
  <RealEstateFooter
    columns={(columns ?? []).map(({ links, title }) => ({
      links: (links ?? []).map(({ href, label }) => ({ href: href || undefined, label })),
      title,
    }))}
    logoAlt={logo && typeof logo === 'object' ? logo.alt : null}
    logoSrc={mediaSrc(logo)}
    socialLinks={socialLinks ?? undefined}
  />
)
