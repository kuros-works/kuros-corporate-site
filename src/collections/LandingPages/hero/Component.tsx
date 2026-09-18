import React from 'react'

import type { LandingPage } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const LandingPageHero: React.FC<NonNullable<LandingPage['hero']>> = ({
  schoolPhoto,
  logo,
  taglines,
  links,
  tuition,
  access,
}) => {
  return (
    <div className="relative min-h-[70vh]">
      {schoolPhoto && typeof schoolPhoto === 'object' && (
        <Media
          fill
          imgClassName="-z-10 object-cover brightness-[0.55]"
          priority
          resource={schoolPhoto}
        />
      )}

      <div className="absolute inset-0 flex items-center">
        <div className="container flex flex-col items-start gap-6 text-white">
          {logo && typeof logo === 'object' && (
            <Media
              className="w-96"
              imgClassName="w-full h-auto drop-shadow-lg"
              resource={logo}
            />
          )}

          <div className="flex flex-col gap-1">
            {(taglines || []).map((row, i) => (
              <p key={i} className="text-2xl font-bold md:text-4xl">
                {row.text}
              </p>
            ))}
          </div>

          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-wrap gap-4">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} size="lg" />
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-col gap-1 text-sm">
            {tuition && <p>月謝: {tuition}</p>}
            {access && <p className="whitespace-pre-line">{access}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
