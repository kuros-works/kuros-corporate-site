/* eslint-disable @next/next/no-img-element -- CMS media URL */
import React from 'react'

import { TravelCarousel } from '@/components/TravelLp/Carousel'
import { rubik } from '@/components/TravelLp/fonts'
import { TravelSectionHeading } from '@/components/TravelLp/SectionHeading'
import { cn } from '@/utilities/ui'

// Figma: Travellian / Gallery (1920px: 9:492, 768px: 36:514, 320px: 38:1034)
// Section heading over a carousel of photos, each with a 20% black layer.
// From xl four photos fill the row and the second of every four sits higher.
// Below that the Figma stacks all four with the arrows underneath, so the row
// becomes a grid of four-photo columns and the arrows move a column at a time.
// Desktop values shrink with the viewport between xl and 1920px.

export type TravelGalleryImage = {
  imageAlt?: string | null
  imageSrc: string
}

type Props = {
  className?: string
  description?: string | null
  heading: string
  images?: TravelGalleryImage[]
}

export const TravelGallery: React.FC<Props> = ({ className, description, heading, images = [] }) => {
  const headingId = React.useId()

  return (
    <section
      aria-labelledby={headingId}
      // overflow-x-clip: the photo row must never widen the page.
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
            descriptionClassName="md:text-2xl"
            heading={heading}
            id={headingId}
            underlineClassName="w-full md:w-[283px]"
          />
        }
        label={heading}
        trackClassName="grid auto-cols-[100%] grid-flow-col grid-rows-4 xl:flex xl:items-center"
      >
        {images.map(({ imageAlt, imageSrc }, index) => (
          <li
            className={cn(
              'relative h-[320px] snap-start overflow-hidden rounded-[26px] bg-[#172432] md:h-[351px] xl:aspect-[365/570] xl:h-auto xl:w-[min(19vw,365px)] xl:shrink-0',
              // The row centers its photos, so this margin lifts the photo by half of it.
              index % 4 === 1 && 'xl:mb-[min(3.906vw,75px)]',
            )}
            key={index}
          >
            <img
              alt={imageAlt || ''}
              className="absolute inset-0 size-full object-cover"
              src={imageSrc}
            />
            <div aria-hidden className="absolute inset-0 bg-black/20" />
          </li>
        ))}
      </TravelCarousel>
    </section>
  )
}
