import React from 'react'

import type { PricingBlock as PricingBlockProps } from '@/payload-types'

import { type Plan, SaasPricing } from '@/components/SaasPricing'

export const PricingBlock: React.FC<PricingBlockProps> = ({ plans }) => {
  const items = (plans ?? []).map<Plan>(({ ctaHref, features, period, popular, ...plan }) => ({
    ...plan,
    ctaHref: ctaHref || undefined,
    features: (features ?? []).map(({ feature }) => feature),
    period: period || undefined,
    popular: Boolean(popular),
  }))

  return <SaasPricing plans={items} />
}
