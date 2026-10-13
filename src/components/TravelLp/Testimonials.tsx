/* eslint-disable @next/next/no-img-element -- CMS media URL */
import React from 'react'

import { TravelCarousel } from '@/components/TravelLp/Carousel'
import { playfair, rubik } from '@/components/TravelLp/fonts'
import { TravelSectionHeading } from '@/components/TravelLp/SectionHeading'
import { TravelStars } from '@/components/TravelLp/Stars'
import { cn } from '@/utilities/ui'

// Figma: Travellian / Testimonial (1920px: 9:543, 768px: 36:533, 320px: 38:1053)
// Section heading over a carousel of grey quote cards: a round avatar that
// sticks out of the card's top, the quote, stars, name and role. The arrows
// stay under the row at every size, at its right end from xl.
// The tablet frame's 32px gutter is the other sections' 20px here.
// The bottom padding from xl leaves room for the Newsletter card, which
// overlaps this section's end in the Figma (9:693).
// Desktop values shrink with the viewport between xl and 1920px.

export type TravelTestimonial = {
  avatarSrc: string
  name: string
  quote: string
  role?: string | null
}

type Props = {
  className?: string
  description?: string | null
  heading: string
  testimonials?: TravelTestimonial[]
}

export const TravelTestimonials: React.FC<Props> = ({
  className,
  description,
  heading,
  testimonials = [],
}) => {
  const headingId = React.useId()

  return (
    <section
      aria-labelledby={headingId}
      // overflow-x-clip: the card row must never widen the page.
      className={cn(
        rubik.className,
        'overflow-x-clip py-20 xl:pt-[min(7.292vw,140px)] xl:pb-[min(12.5vw,240px)]',
        className,
      )}
    >
      <TravelCarousel
        arrows="below"
        className="md:gap-y-[160px] xl:gap-y-[min(8.333vw,160px)]"
        heading={
          <TravelSectionHeading
            description={description}
            descriptionClassName="md:text-2xl"
            heading={heading}
            headingClassName="text-[48px]"
            id={headingId}
            underlineClassName="w-[347px]"
          />
        }
        label={heading}
        // The row clips what sticks out of it, so the avatars' 65px goes inside
        // as padding and the margin keeps the gap to the heading as it was.
        trackClassName="-mt-[65px] pt-[65px]"
      >
        {testimonials.map(({ avatarSrc, name, quote, role }, index) => (
          <li
            className="relative flex w-full shrink-0 snap-start flex-col items-start gap-5 rounded-[12px] bg-[#f5f6f7] px-5 pt-[60px] pb-8 text-[#767e86] md:w-[500px] md:max-w-full md:px-10 md:pb-10 xl:w-[min(34.531vw,663px)]"
            key={index}
          >
            <img
              alt=""
              className="absolute -top-[65px] left-5 size-[100px] rounded-full object-cover md:left-10"
              src={avatarSrc}
            />
            <blockquote className="text-lg leading-[23px]">{quote}</blockquote>
            <TravelStars />
            <div className="flex flex-col gap-1 leading-[normal]">
              <p className={cn(playfair.className, 'text-2xl leading-[normal]')}>{name}</p>
              {role && <p className="text-lg leading-[normal]">{role}</p>}
            </div>
          </li>
        ))}
      </TravelCarousel>
    </section>
  )
}
