/* eslint-disable @next/next/no-img-element -- CMS media URL and a static Figma asset */
import React from 'react'

import { TravelCarousel } from '@/components/TravelLp/Carousel'
import { playfair, rubik } from '@/components/TravelLp/fonts'
import { TravelSectionHeading } from '@/components/TravelLp/SectionHeading'
import { cn } from '@/utilities/ui'

// Figma: Travellian / Destinations (1920px: 6:120, 768px: 36:465, 320px: 38:851)
// Section heading over a carousel of photo cards, each with a 10% coral layer
// and the name and location at the bottom. The cards are not links.
// The dark gradient behind the text is not in the Figma: it keeps the white
// text readable on bright photos.
// Below xl one card shows at a time, as in the Figma; its width stops at the
// 768px frame's 728px, so on wider tablets the next card peeks in.
// Desktop values shrink with the viewport between xl and 1920px.

const asset = (name: string) => `/figma/travel/${name}`

export type TravelDestination = {
  imageAlt?: string | null
  imageSrc: string
  location?: string | null
  title: string
}

type Props = {
  className?: string
  description?: string | null
  heading: string
  items?: TravelDestination[]
}

export const TravelDestinations: React.FC<Props> = ({
  className,
  description,
  heading,
  items = [],
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
        heading={
          <TravelSectionHeading
            description={description}
            heading={heading}
            id={headingId}
            underlineClassName="w-[227px] md:w-[365px]"
          />
        }
        label={heading}
      >
        {items.map(({ imageAlt, imageSrc, location, title }, index) => (
          <li
            className="relative flex h-[320px] w-full shrink-0 snap-start flex-col justify-end overflow-hidden rounded-2xl bg-[#172432] px-5 py-10 text-white md:h-[456px] md:max-w-[728px] md:rounded-[26px] xl:aspect-[497/661] xl:h-auto xl:w-[min(25.885vw,497px)] xl:px-6"
            key={index}
          >
            {imageSrc && (
              <img
                alt={imageAlt || ''}
                className="absolute inset-0 size-full object-cover"
                src={imageSrc}
              />
            )}
            <div aria-hidden className="absolute inset-0 bg-[#ff7757]/10" />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/55 to-transparent"
            />

            <div className="relative flex flex-col gap-[17px]">
              <h3
                className={cn(
                  playfair.className,
                  'text-2xl leading-[normal] font-medium md:text-[28px] xl:text-[clamp(22px,1.458vw,28px)]',
                )}
              >
                {title}
              </h3>
              {location && (
                <p className="flex items-center gap-4 text-lg leading-[normal] md:text-2xl xl:text-[clamp(18px,1.25vw,24px)]">
                  <span className="flex size-6 shrink-0 items-center justify-center">
                    <img alt="" height={24} src={asset('location.svg')} width={16.875} />
                  </span>
                  <span className="min-w-0 flex-1">{location}</span>
                </p>
              )}
            </div>
          </li>
        ))}
      </TravelCarousel>
    </section>
  )
}
