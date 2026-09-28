import React from 'react'

import type { LedgerlyFeaturesBlock as LedgerlyFeaturesBlockProps } from '@/payload-types'

import { SaasBento } from '@/components/SaasBento'

export const LedgerlyFeaturesBlock: React.FC<LedgerlyFeaturesBlockProps> = ({
  card1,
  card2,
  card3,
  card4,
  card5,
}) => (
  <SaasBento
    cards={[card1, card2, card3, card4, card5]}
    ctaHref={card5.ctaHref || undefined}
    ctaLabel={card5.ctaLabel}
  />
)
