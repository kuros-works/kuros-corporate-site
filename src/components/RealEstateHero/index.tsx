/* eslint-disable @next/next/no-img-element -- CMS media URL and static decorative Figma assets */
import React from 'react'

import { dmSans } from '@/components/SaasLp/fonts'
import { cn } from '@/utilities/ui'

// Figma: Real Estate Template / hero (nodes 0:106, 0:105, 0:110, 0:146–0:148)
// - 0:106: black rectangle under the photo → the section's bg-black.
// - 0:105: 1440×850 mask → the section is 850px tall and crops the photo.
// - 0:110: the photo is 1440×982 (its own ratio) with the 0:109 gradient on top,
//   so the photo layer keeps that ratio and is cut off at the section's bottom.
// The nav (RealEstateHeader) is laid over this section by the LP page.

const asset = (name: string) => `/figma/real-estate/${name}`

// 0:109, applied over the photo's full 1440×982 box like in Figma.
const photoGradient =
  'linear-gradient(193.02deg, rgba(0, 0, 0, 0) 15.307%, rgba(0, 0, 0, 0.838) 67.37%)'

type Props = {
  backgroundAlt?: string | null
  backgroundSrc?: string | null
  className?: string
  heading: string
  lead?: string | null
  listingsHref?: string
  listingsLabel: string
}

export const RealEstateHero: React.FC<Props> = ({
  backgroundAlt,
  backgroundSrc,
  className,
  heading,
  lead,
  listingsHref,
  listingsLabel,
}) => (
  <section
    className={cn(dmSans.className, 'relative overflow-hidden bg-black text-white lg:h-[850px]', className)}
  >
    <div className="absolute inset-x-0 top-0 aspect-[1440/982] min-h-full">
      {backgroundSrc && (
        <img
          alt={backgroundAlt || ''}
          className="absolute inset-0 size-full object-cover"
          src={backgroundSrc}
        />
      )}
      <div className="absolute inset-0" style={{ backgroundImage: photoGradient }} />
    </div>

    <div className="relative mx-auto flex h-full w-full max-w-[1101px] flex-col px-4 pt-36 lg:pt-[200px]">
      <h1 className="max-w-[519px] text-5xl leading-none font-bold tracking-[-0.025em] md:text-[80px] md:leading-[80px]">
        {heading}
      </h1>
      {lead && (
        <p className="mt-[22px] max-w-[428px] text-xl leading-7 tracking-[-0.025em] text-white/60">
          {lead}
        </p>
      )}

      <a
        className="mt-16 flex h-[100px] shrink-0 items-center gap-[15px] bg-white px-10 text-xl font-bold tracking-[-0.025em] text-black lg:mt-auto"
        href={listingsHref}
      >
        {listingsLabel}
        <img alt="" height={12} src={asset('arrow-yellow.svg')} width={24} />
      </a>
    </div>
  </section>
)
