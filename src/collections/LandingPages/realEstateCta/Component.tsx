import React from 'react'

import type { RealEstateCtaBlock as RealEstateCtaBlockProps } from '@/payload-types'

import { RealEstateCta } from '@/components/RealEstateCta'

export const RealEstateCtaBlock: React.FC<RealEstateCtaBlockProps> = ({
  button,
  heading,
  highlight,
}) => (
  <RealEstateCta
    buttonHref={button.href || undefined}
    buttonLabel={button.label}
    heading={heading}
    highlight={highlight}
  />
)
