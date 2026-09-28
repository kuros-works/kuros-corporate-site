import React from 'react'

import type { LedgerlyHeaderBlock as LedgerlyHeaderBlockProps } from '@/payload-types'

import { SaasHeader } from '@/components/SaasHeader'

export const LedgerlyHeaderBlock: React.FC<LedgerlyHeaderBlockProps> = ({ ctaHref, ctaLabel, nav }) => (
  <SaasHeader
    ctaHref={ctaHref || undefined}
    ctaLabel={ctaLabel}
    nav={(nav ?? []).map(({ dropdown, href, label }) => ({
      dropdown: Boolean(dropdown),
      href: href || undefined,
      label,
    }))}
  />
)
