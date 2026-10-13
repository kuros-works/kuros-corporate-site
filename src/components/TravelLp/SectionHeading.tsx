/* eslint-disable @next/next/no-img-element -- static decorative Figma asset */
import React from 'react'

import { playfair, rubik } from '@/components/TravelLp/fonts'
import { cn } from '@/utilities/ui'

// Figma: Travellian / section "Title block" (1920px: 6:151, 768px: 36:467, 320px: 38:853)
// Heading, a 3px coral line under it and an optional description.
// The line's width differs per section and per breakpoint in the Figma and
// doesn't follow the text, so each section passes it as `underlineClassName`.
// `align="right"` is the Special Offer layout: right-aligned from md up.
// Desktop values shrink with the viewport between xl and 1920px.

const asset = (name: string) => `/figma/travel/${name}`

type Props = {
  align?: 'left' | 'right'
  className?: string
  description?: string | null
  // Overrides the description's size where a section differs, e.g. 'md:text-2xl'.
  descriptionClassName?: string
  heading: string
  // Overrides the heading's size where a section differs, e.g. 'text-[48px]'.
  headingClassName?: string
  id?: string
  // Width of the line, e.g. 'w-[227px] md:w-[365px]'.
  underlineClassName: string
}

export const TravelSectionHeading: React.FC<Props> = ({
  align = 'left',
  className,
  description,
  descriptionClassName,
  heading,
  headingClassName,
  id,
  underlineClassName,
}) => (
  <div
    className={cn(
      rubik.className,
      'flex flex-col gap-8',
      align === 'right' && 'md:text-right',
      className,
    )}
  >
    <div className="flex flex-col">
      <h2
        className={cn(
          playfair.className,
          'text-[40px] leading-[normal] font-normal text-[#172432] md:text-[54px] xl:text-[clamp(54px,3.333vw,64px)]',
          headingClassName,
        )}
        id={id}
      >
        {heading}
      </h2>
      <img
        alt=""
        className={cn(
          'mt-[17px] h-[3px] max-w-full self-start',
          align === 'right' && 'md:self-end',
          underlineClassName,
        )}
        height={3}
        src={asset('underline.svg')}
        width={57}
      />
    </div>
    {description && (
      <p
        className={cn(
          'text-lg leading-[normal] text-[#767e86] md:text-xl xl:text-[clamp(20px,1.25vw,24px)]',
          descriptionClassName,
        )}
      >
        {description}
      </p>
    )}
  </div>
)
