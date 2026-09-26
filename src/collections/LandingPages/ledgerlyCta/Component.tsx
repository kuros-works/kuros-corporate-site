import React from 'react'

import type { LedgerlyCtaBlock as LedgerlyCtaBlockProps } from '@/payload-types'

import { SaasCta } from '@/components/SaasCta'

export const LedgerlyCtaBlock: React.FC<LedgerlyCtaBlockProps> = ({
  heading,
  lead,
  primaryButton,
  secondaryButton,
}) => (
  <div className="bg-[#1d1c20] px-4 py-16 md:py-24 xl:pb-[115px]">
    <SaasCta
      demoHref={primaryButton.href || undefined}
      demoLabel={primaryButton.label}
      heading={heading}
      lead={lead || undefined}
      videoHref={secondaryButton.href || undefined}
      videoLabel={secondaryButton.label}
    />
  </div>
)
