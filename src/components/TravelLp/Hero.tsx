/* eslint-disable @next/next/no-img-element -- CMS media URL */
import React from 'react'

import { playfair, rubik } from '@/components/TravelLp/fonts'
import { cn } from '@/utilities/ui'

// Figma: Travellian / Hero Section (1920px: 3:57, 768px: 36:403, 320px: 38:787)
// One photo under a 30% black layer, with the heading and lead on the left.
// The header (TravelHeader) is laid over this section by the LP page, so the
// top padding leaves room for it. Without a photo the #172432 background shows.
// The section keeps the Figma heights (1210 / 789 / 1194px) so the booking
// form can be dropped in as `children` later. The slider dots are not built.
// Desktop values shrink with the viewport between xl and 1920px.

type Props = {
  backgroundAlt?: string | null
  backgroundSrc?: string | null
  // Booking form slot, rendered under the heading.
  children?: React.ReactNode
  className?: string
  heading: string
  lead?: string | null
}

export const TravelHero: React.FC<Props> = ({
  backgroundAlt,
  backgroundSrc,
  children,
  className,
  heading,
  lead,
}) => (
  <section
    className={cn(
      rubik.className,
      'relative min-h-[1210px] overflow-hidden bg-[#172432] pt-[198px] pb-[100px] text-white md:min-h-[789px] md:pt-[214px] xl:min-h-[min(62.19vw,1194px)] xl:pt-[min(14.74vw,283px)]',
      className,
    )}
  >
    {backgroundSrc && (
      <div className="absolute inset-0">
        <img
          alt={backgroundAlt || ''}
          className="absolute inset-0 size-full object-cover"
          src={backgroundSrc}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
    )}

    <div className="relative flex flex-col gap-4 px-4 md:px-5 xl:px-0 xl:pl-[min(9.479vw,182px)]">
      <h1
        className={cn(
          playfair.className,
          // text-balance: keeps a lone last word from dropping to its own line.
          'text-[40px] leading-[normal] font-normal text-balance md:text-[54px] xl:max-w-[min(52.08vw,1000px)] xl:text-[min(4.375vw,84px)]',
        )}
      >
        {heading}
      </h1>
      {lead && (
        <p className="text-lg leading-[normal] md:text-xl xl:text-[clamp(20px,1.25vw,24px)]">
          {lead}
        </p>
      )}
    </div>

    {children && (
      <div className="relative mt-[100px] xl:mt-[min(8.854vw,170px)]">{children}</div>
    )}
  </section>
)
