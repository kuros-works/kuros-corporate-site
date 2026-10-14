/* eslint-disable @next/next/no-img-element -- CMS media URL and a static Figma asset */
import React from 'react'

import { playfair, rubik } from '@/components/TravelLp/fonts'
import { TravelSectionHeading } from '@/components/TravelLp/SectionHeading'
import { cn } from '@/utilities/ui'

// Figma: Travellian / Blog (1920px: 6:324, 768px: 36:634, 320px: 38:982)
// Section heading over a single post: photo with a 20% black layer, then the
// title, body and a coral Read More with an arrow. Read More is a link-less dummy.
// From xl the photo sits left of the text; below that it sits on top.
// The Figma breaks the title in two lines by hand; here it wraps on its own.
// Desktop values shrink with the viewport between xl and 1920px.

const asset = (name: string) => `/figma/travel/${name}`

type Props = {
  className?: string
  description?: string | null
  heading: string
  imageAlt?: string | null
  imageSrc: string
  postBody?: string | null
  postTitle: string
  readMoreLabel?: string | null
}

export const TravelBlog: React.FC<Props> = ({
  className,
  description,
  heading,
  imageAlt,
  imageSrc,
  postBody,
  postTitle,
  readMoreLabel,
}) => {
  const headingId = React.useId()

  return (
    <section
      aria-labelledby={headingId}
      // overflow-x-clip: nothing in here may widen the page.
      className={cn(
        rubik.className,
        'flex flex-col gap-[100px] overflow-x-clip px-4 py-20 md:px-5 xl:gap-[min(5.208vw,100px)] xl:px-[min(9.479vw,182px)] xl:py-[min(7.292vw,140px)]',
        className,
      )}
    >
      <TravelSectionHeading
        description={description}
        descriptionClassName="md:text-2xl"
        heading={heading}
        id={headingId}
        underlineClassName="w-[150px]"
      />

      <article className="flex flex-col gap-8 xl:flex-row xl:items-center xl:gap-[clamp(20px,1.667vw,32px)]">
        <div className="relative h-[314px] shrink-0 overflow-hidden rounded-[26px] bg-[#172432] md:h-[555px] xl:aspect-[762/873] xl:h-auto xl:w-[min(39.688vw,762px)]">
          {imageSrc && (
            <img
              alt={imageAlt || ''}
              className="absolute inset-0 size-full object-cover"
              src={imageSrc}
            />
          )}
          <div aria-hidden className="absolute inset-0 bg-black/20" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <h3
            className={cn(
              playfair.className,
              'text-[40px] leading-[normal] font-normal md:text-[54px] xl:text-[clamp(40px,2.813vw,54px)]',
            )}
          >
            {postTitle}
          </h3>
          {postBody && (
            <p className="text-lg leading-[42px] whitespace-pre-line xl:text-[clamp(18px,1.25vw,24px)] xl:leading-[2.167]">
              {postBody}
            </p>
          )}
          {readMoreLabel && (
            <p className="flex items-center gap-5 text-2xl leading-[52px] text-[#ff7757]">
              <span className="min-w-0">{readMoreLabel}</span>
              <img
                alt=""
                className="shrink-0"
                height={14.7279}
                src={asset('arrow-right-coral.svg')}
                width={28}
              />
            </p>
          )}
        </div>
      </article>
    </section>
  )
}
