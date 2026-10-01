import React from 'react'

import type { RealEstateHeaderBlock as RealEstateHeaderBlockProps } from '@/payload-types'

import { RealEstateHeader } from '@/components/RealEstateHeader'
import { mediaSrc } from '../mediaSrc'

export const RealEstateHeaderBlock: React.FC<RealEstateHeaderBlockProps> = ({ cta, logo, nav }) => (
  <RealEstateHeader
    ctaHref={cta.href || undefined}
    ctaLabel={cta.label}
    logoAlt={logo && typeof logo === 'object' ? logo.alt : null}
    logoSrc={mediaSrc(logo)}
    nav={(nav ?? []).map(({ href, label }) => ({ href: href || undefined, label }))}
  />
)
