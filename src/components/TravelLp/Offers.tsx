/* eslint-disable @next/next/no-img-element -- CMS media URL */
import React from 'react'

import { TravelCarousel } from '@/components/TravelLp/Carousel'
import { mulish, rubik } from '@/components/TravelLp/fonts'
import { TravelSectionHeading } from '@/components/TravelLp/SectionHeading'
import { TravelStars } from '@/components/TravelLp/Stars'
import { cn } from '@/utilities/ui'

// Figma: Travellian / Special Offer (1920px: 6:189, 768px: 36:649, 320px: 38:900)
// Right-aligned section heading (left-aligned on mobile) over a carousel of
// offer cards: photo with a 10% coral layer, then title, stars, description,
// price and a Details button on a cream panel. The button is a link-less dummy.
// From xl three cards fill the row and the arrows sit left of the heading;
// below that one card shows at a time, as in the Figma.
// Desktop values shrink with the viewport between xl and 1920px.

export type TravelOffer = {
  description?: string | null
  imageAlt?: string | null
  imageSrc: string
  price?: string | null
  title: string
}

type Props = {
  className?: string
  description?: string | null
  detailsLabel?: string | null
  heading: string
  items?: TravelOffer[]
  pricePrefix?: string | null
}

export const TravelOffers: React.FC<Props> = ({
  className,
  description,
  detailsLabel,
  heading,
  items = [],
  pricePrefix,
}) => {
  const headingId = React.useId()

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
      <TravelCarousel
        arrows="start"
        className="gap-y-[60px] md:gap-y-[100px]"
        heading={
          <TravelSectionHeading
            align="right"
            description={description}
            descriptionClassName="md:text-2xl"
            heading={heading}
            id={headingId}
            underlineClassName="w-[241px]"
          />
        }
        label={heading}
      >
        {items.map((item, index) => (
          <li
            className="flex w-full shrink-0 snap-start flex-col overflow-hidden rounded-[26px] bg-[#fff8f1] md:max-w-[728px] xl:w-[min(25.9vw,497.33px)]"
            key={index}
          >
            <div className="relative h-[286px] shrink-0 bg-[#172432] xl:h-[min(14.896vw,286px)]">
              {item.imageSrc && (
                <img
                  alt={item.imageAlt || ''}
                  className="absolute inset-0 size-full object-cover"
                  src={item.imageSrc}
                />
              )}
              <div aria-hidden className="absolute inset-0 bg-[#ff7757]/10" />
            </div>

            <div className="flex flex-1 flex-col gap-6 p-5 md:px-6 xl:py-[clamp(24px,2.083vw,40px)]">
              <div className="flex flex-col gap-2">
                <h3
                  className={cn(
                    mulish.className,
                    'text-[28px] leading-[normal] font-normal text-[#767e86] xl:text-[clamp(22px,1.458vw,28px)]',
                  )}
                >
                  {item.title}
                </h3>
                <TravelStars />
              </div>

              {item.description && (
                <p className="text-base leading-5 md:text-lg md:leading-[normal] xl:text-[clamp(15px,0.938vw,18px)]">
                  {item.description}
                </p>
              )}

              {(item.price || detailsLabel) && (
                // mt-auto: cards in a row share a height, the price row stays at the bottom.
                <div className="mt-auto flex flex-col items-start gap-5 md:flex-row md:flex-wrap md:items-center md:justify-between">
                  {item.price && (
                    <p className="flex flex-wrap items-center gap-x-2 leading-[normal]">
                      {pricePrefix && (
                        <span className="text-lg text-[#767e86] xl:text-[clamp(16px,1.042vw,20px)]">
                          {pricePrefix}
                        </span>
                      )}
                      <span className="text-[32px] text-[#ff7757] xl:text-[clamp(28px,2.083vw,40px)]">
                        {item.price}
                      </span>
                    </p>
                  )}
                  {detailsLabel && (
                    <span className="rounded-[12px] bg-[#ff7654] px-6 py-4 text-xl leading-[normal] text-white uppercase md:ml-auto xl:px-[clamp(24px,2.083vw,40px)] xl:py-[clamp(16px,1.042vw,20px)]">
                      {detailsLabel}
                    </span>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </TravelCarousel>
    </section>
  )
}
