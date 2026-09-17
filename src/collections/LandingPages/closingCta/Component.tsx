import React from 'react'

import type { LandingPage } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

export const LandingPageClosingCta: React.FC<NonNullable<LandingPage['closingCta']>> = ({
  richText,
  links,
}) => {
  return (
    <div className="container">
      <div className="border-border bg-card flex flex-col items-center gap-8 rounded border p-8 text-center">
        {richText && <RichText data={richText} enableGutter={false} />}

        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-4">
            {links.map(({ link }, i) => (
              <li key={i}>
                <CMSLink {...link} size="lg" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
