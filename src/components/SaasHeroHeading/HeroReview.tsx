/* eslint-disable @next/next/no-img-element -- static decorative Figma assets */
import React from 'react'

import { dmSans, dmSansOpsz } from '@/components/SaasLp/fonts'
import { cn } from '@/utilities/ui'

// Figma: SaaS LP ポートフォリオ用 / node 4:4999 (div.review)
// Social-proof row: overlapping avatars above a short caption. Decorative.

const asset = (name: string) => `/figma/saas-hero/${name}`

// Each avatar is a stack of layers exactly as in Figma: a base image clipped
// to the circle, then cover images on top.
const avatars = [
  ['avatar-1a.png', 'avatar-1b.jpg'],
  ['avatar-2a.png', 'avatar-2b.jpg'],
  ['avatar-3a.png', 'avatar-3b.jpg'],
  ['avatar-4a.png', 'avatar-4b.jpg', 'avatar-4c.jpg', 'avatar-4d.jpg', 'avatar-4e.jpg', 'avatar-4f.jpg'],
]

type Props = {
  caption?: string
  className?: string
}

export const HeroReview: React.FC<Props> = ({ caption = '2,400+ active teams', className }) => {
  return (
    <div className={cn(dmSans.className, dmSansOpsz, 'flex flex-col items-center gap-2', className)}>
      <div className="flex min-h-10 items-center justify-center px-2.5 py-1">
        {avatars.map(([base, ...covers]) => (
          <div className="relative -mr-3 size-8 last:mr-0" key={base}>
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <img alt="" className="size-full" src={asset(base)} />
            </div>
            {covers.map((cover) => (
              <img
                alt=""
                className="absolute inset-0 size-full rounded-full object-cover"
                key={cover}
                src={asset(cover)}
              />
            ))}
            <div className="absolute inset-0 rounded-full border border-white" />
          </div>
        ))}
      </div>
      <p className="text-[13.891px] leading-4 font-bold text-[#9b9ca1]">{caption}</p>
    </div>
  )
}
