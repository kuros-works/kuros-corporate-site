/* eslint-disable @next/next/no-img-element -- static decorative Figma assets */
import React from 'react'

import { dmSans, dmSansOpsz } from '@/components/SaasLp/fonts'
import { cn } from '@/utilities/ui'

// Figma: SaaS LP ポートフォリオ用 / node 4:4999 (div.review)
// Social-proof row: overlapping avatars above a short caption. Decorative.

const asset = (name: string) => `/figma/saas-hero/${name}`

// Bare file names resolve to the bundled Figma assets; full URLs (Vercel Blob)
// and root-relative paths (Payload's /api/media/file/...) are used as-is.
const layerSrc = (src: string) => (/^(https?:)?\/\/|^\//.test(src) ? src : asset(src))

// Each avatar is a stack of layers exactly as in Figma: a base image clipped
// to the circle, then cover images on top.
const defaultAvatars = [
  ['avatar-1a.png', 'avatar-1b.jpg'],
  ['avatar-2a.png', 'avatar-2b.jpg'],
  ['avatar-3a.png', 'avatar-3b.jpg'],
  ['avatar-4a.png', 'avatar-4b.jpg', 'avatar-4c.jpg', 'avatar-4d.jpg', 'avatar-4e.jpg', 'avatar-4f.jpg'],
]

type Props = {
  avatars?: string[][]
  caption?: string
  className?: string
  // Optional "+N" style chip appended after the avatars (not in the Figma).
  countBadge?: string
}

export const HeroReview: React.FC<Props> = ({
  avatars = defaultAvatars,
  caption = '2,400+ active teams',
  className,
  countBadge,
}) => {
  return (
    <div className={cn(dmSans.className, dmSansOpsz, 'flex flex-col items-center gap-2', className)}>
      <div className="flex min-h-10 items-center justify-center px-2.5 py-1">
        {avatars.map(([base, ...covers], i) => (
          <div className="relative -mr-3 size-8 last:mr-0" key={i}>
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <img alt="" className="size-full" src={layerSrc(base)} />
            </div>
            {covers.map((cover) => (
              <img
                alt=""
                className="absolute inset-0 size-full rounded-full object-cover"
                key={cover}
                src={layerSrc(cover)}
              />
            ))}
            <div className="absolute inset-0 rounded-full border border-white" />
          </div>
        ))}
        {countBadge && (
          <span className="relative flex h-8 min-w-8 items-center justify-center rounded-full border border-white bg-[#a3dc2f] px-1.5 text-[11px] leading-none font-bold text-[#1d1c20]">
            {countBadge}
          </span>
        )}
      </div>
      {caption && <p className="text-[13.891px] leading-4 font-bold text-[#9b9ca1]">{caption}</p>}
    </div>
  )
}
