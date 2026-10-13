'use client'

/* eslint-disable @next/next/no-img-element -- CMS media URL */
import React from 'react'

import { playfair, rubik } from '@/components/TravelLp/fonts'
import { TravelSectionHeading } from '@/components/TravelLp/SectionHeading'
import { TravelStars } from '@/components/TravelLp/Stars'
import { cn } from '@/utilities/ui'

// Figma: Travellian / Trip planners (1920px: 6:382, 768px: 36:597, 320px: 38:997)
// Section heading with a button on two offset squares, and the plan cards:
// photo with a 20% black layer over category, price, title, stars and duration.
// The button is a link-less dummy and there are no arrows at any size.
// Below xl everything stacks and every card shows its text.
// From xl the heading sits left of a row that bleeds off the right edge and
// scrolls sideways; only one card shows its text there (the second one in the
// Figma) and hovering, focusing or tapping a card moves that to it. The other
// cards keep their text for assistive tech.
// Desktop values shrink with the viewport between xl and 1920px.

export type TravelTripPlan = {
  category?: string | null
  duration?: string | null
  imageAlt?: string | null
  imageSrc: string
  price?: string | null
  title: string
}

type Props = {
  buttonLabel?: string | null
  className?: string
  description?: string | null
  heading: string
  items?: TravelTripPlan[]
}

const meta = 'text-lg leading-[normal] md:text-2xl xl:text-[clamp(14px,0.938vw,18px)]'

export const TravelTripPlans: React.FC<Props> = ({
  buttonLabel,
  className,
  description,
  heading,
  items = [],
}) => {
  const headingId = React.useId()
  const [active, setActive] = React.useState(items.length > 1 ? 1 : 0)

  return (
    <section
      aria-labelledby={headingId}
      // overflow-x-clip: the card row must never widen the page.
      className={cn(
        rubik.className,
        'overflow-x-clip py-20 xl:py-[min(7.292vw,140px)]',
        className,
      )}
    >
      <div className="flex flex-col gap-20 px-4 md:px-5 xl:flex-row xl:items-center xl:gap-[min(4.896vw,94px)] xl:pr-0 xl:pl-[min(9.479vw,182px)]">
        {/* 6px wider than the Figma's 394px (and the gap 6px narrower) so the
            64px heading, which is exactly 394px wide there, can't wrap. */}
        <div className="flex min-w-0 flex-col items-start gap-8 xl:w-[clamp(340px,20.833vw,400px)] xl:shrink-0">
          <TravelSectionHeading
            className="self-stretch"
            description={description}
            descriptionClassName="md:text-lg xl:text-lg"
            heading={heading}
            id={headingId}
            underlineClassName="w-[231px]"
          />
          {buttonLabel && (
            <div className="relative max-w-full pt-[14.5px] pr-[18px] pb-4 pl-[14px] xl:ml-[26px]">
              <span aria-hidden className="absolute top-0 left-0 size-[43px] bg-[#172432]" />
              <span aria-hidden className="absolute right-0 bottom-0 size-[43px] bg-[#767e86]" />
              <span className="relative block rounded-[12px] bg-[#ff7757] p-5 text-lg leading-[normal] text-white">
                {buttonLabel}
              </span>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <ul
            aria-label={heading}
            className="flex min-w-0 flex-col gap-10 [scrollbar-width:none] xl:flex-1 xl:flex-row xl:items-center xl:gap-[clamp(20px,1.667vw,32px)] xl:overflow-x-auto xl:pr-[min(9.479vw,182px)] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((item, index) => (
              <li
                className="relative flex flex-col rounded-[26px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#ff7757] xl:w-[clamp(240px,15.625vw,300px)] xl:shrink-0"
                key={index}
                onClick={() => setActive(index)}
                onFocus={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                tabIndex={0}
              >
                <div className="relative h-[320px] shrink-0 overflow-hidden rounded-[26px] bg-[#172432] md:h-[350px] xl:aspect-[300/399] xl:h-auto">
                  {item.imageSrc && (
                    <img
                      alt={item.imageAlt || ''}
                      className="absolute inset-0 size-full object-cover"
                      src={item.imageSrc}
                    />
                  )}
                  <div aria-hidden className="absolute inset-0 bg-black/20" />
                </div>

                {/* xl:sr-only takes the text out of the layout, so the row's
                    height comes from the one card that shows it. */}
                <div className={cn('flex flex-col gap-3 py-5', index !== active && 'xl:sr-only')}>
                  {(item.category || item.price) && (
                    <p className={cn(meta, 'flex flex-wrap justify-between gap-x-4')}>
                      {item.category && <span className="uppercase">{item.category}</span>}
                      {item.price && <span className="ml-auto">{item.price}</span>}
                    </p>
                  )}
                  <h3
                    className={cn(
                      playfair.className,
                      'text-[28px] leading-[normal] font-semibold md:text-[32px] xl:text-[clamp(20px,1.458vw,28px)]',
                    )}
                  >
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                    <TravelStars />
                    {item.duration && <p className={cn(meta, 'ml-auto')}>{item.duration}</p>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
