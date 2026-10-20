import React from 'react'

import type { LedgerlyCtaBlock as LedgerlyCtaBlockProps } from '@/payload-types'

import { SaasCta } from '@/components/SaasCta'

// No top padding: page.tsx's layout wrapper already leaves 128px above. The
// bottom is tighter than the static page's 115px to close the gap to the footer.
export const LedgerlyCtaBlock: React.FC<LedgerlyCtaBlockProps> = ({
  heading,
  lead,
  primaryButton,
  secondaryButton,
}) => (
  <div className="bg-[#1d1c20] px-4 pb-12 md:pb-16">
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
