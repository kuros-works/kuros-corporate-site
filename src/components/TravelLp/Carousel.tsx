'use client'

/* eslint-disable @next/next/no-img-element -- static decorative Figma assets */
import React from 'react'

import { cn } from '@/utilities/ui'

// Figma: Travellian / Destinations "Arrow" and "Content"
// (1920px: 6:150 / 6:152, 768px: 36:472 / 36:477, 320px: 38:895 / 38:858)
// A heading slot, a horizontally scrolling row of slides and the two arrow
// buttons. From xl the arrows sit at the right of the heading and the row
// bleeds off the right edge; below that they are centered under the row.
// Scrolling is the browser's own (scroll snap), the arrows move one slide.
// The Figma has no disabled arrow: the side that can't move is faded.
// Slides are `<li>`s passed as children; each sets its own width and `snap-start`.
// `arrows="start"` is the Special Offer layout (6:190): from xl the arrows sit
// at the left and the heading takes the right. See `layouts` for 'below'.
// Desktop values shrink with the viewport between xl and 1920px.

const asset = (name: string) => `/figma/travel/${name}`

const arrowButton =
  'flex h-[60px] w-[66px] items-center justify-center rounded-[12px] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#172432] aria-disabled:cursor-default aria-disabled:opacity-40'

// Where the arrows go from xl up, as classes for the grid, the heading, the
// arrows and the row. 'below' is the Testimonial layout (9:550): they stay
// under the row, at its right end.
const layouts = {
  below: {
    arrows: 'xl:justify-self-end xl:pr-[min(9.479vw,182px)]',
    grid: '',
    heading: 'xl:px-[min(9.479vw,182px)]',
    track: '',
  },
  end: {
    arrows:
      'xl:col-start-2 xl:row-start-1 xl:self-end xl:justify-self-auto xl:pr-[min(9.479vw,182px)]',
    grid: 'xl:grid-cols-[minmax(0,1fr)_auto]',
    heading: 'xl:pr-0 xl:pl-[min(9.479vw,182px)]',
    track: 'xl:col-span-2',
  },
  start: {
    arrows:
      'xl:col-start-1 xl:row-start-1 xl:self-end xl:justify-self-auto xl:pl-[min(9.479vw,182px)]',
    grid: 'xl:grid-cols-[auto_minmax(0,1fr)]',
    heading: 'xl:col-start-2 xl:pr-[min(9.479vw,182px)] xl:pl-0',
    track: 'xl:col-span-2',
  },
}

type Props = {
  // Where the arrows go from xl up: either side of the heading, or under the row.
  arrows?: keyof typeof layouts
  children?: React.ReactNode
  className?: string
  // Rendered on the server and passed in (TravelSectionHeading).
  heading: React.ReactNode
  // Names the scrolling row for assistive tech.
  label: string
  // Overrides for the scrolling row, e.g. room for content that sticks out of the slides.
  trackClassName?: string
}

export const TravelCarousel: React.FC<Props> = ({
  arrows = 'end',
  children,
  className,
  heading,
  label,
  trackClassName,
}) => {
  const layout = layouts[arrows]

  const trackRef = React.useRef<HTMLUListElement>(null)
  const [canPrev, setCanPrev] = React.useState(false)
  const [canNext, setCanNext] = React.useState(true)

  const hasSlides = React.Children.count(children) > 0

  const update = React.useCallback(() => {
    const track = trackRef.current
    if (!track) return

    setCanPrev(track.scrollLeft > 1)
    setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 1)
  }, [])

  React.useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Also fires once on observe, which sets the initial state.
    const observer = new ResizeObserver(update)
    observer.observe(track)

    return () => observer.disconnect()
  }, [update])

  const move = (direction: -1 | 1) => {
    const track = trackRef.current
    if (!track) return

    const slide = track.firstElementChild
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    const step = slide ? slide.getBoundingClientRect().width + gap : track.clientWidth
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    track.scrollBy({ behavior: reduced ? 'auto' : 'smooth', left: direction * step })
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-y-[100px] xl:gap-x-8 xl:gap-y-[min(5.208vw,100px)]',
        layout.grid,
        className,
      )}
    >
      <div className={cn('row-start-1 min-w-0 px-4 md:px-5', layout.heading)}>{heading}</div>

      {hasSlides && (
        <div className={cn('row-start-3 flex gap-10 justify-self-center', layout.arrows)}>
          <button
            aria-disabled={!canPrev}
            aria-label="Previous"
            className={arrowButton}
            onClick={() => move(-1)}
            type="button"
          >
            <img
              alt=""
              className="max-w-none rotate-90"
              height={66}
              src={asset('carousel-prev.svg')}
              width={60}
            />
          </button>
          <button
            aria-disabled={!canNext}
            aria-label="Next"
            className={arrowButton}
            onClick={() => move(1)}
            type="button"
          >
            <img
              alt=""
              className="max-w-none -rotate-90"
              height={66}
              src={asset('carousel-next.svg')}
              width={60}
            />
          </button>
        </div>
      )}

      {hasSlides && (
        <ul
          aria-label={label}
          className={cn(
            'row-start-2 flex min-w-0 snap-x snap-mandatory scroll-pl-4 gap-8 overflow-x-auto px-4 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-[#172432] md:scroll-pl-5 md:px-5 xl:scroll-pl-[min(9.479vw,182px)] xl:gap-[clamp(20px,1.667vw,32px)] xl:px-[min(9.479vw,182px)] [&::-webkit-scrollbar]:hidden',
            layout.track,
            trackClassName,
          )}
          onScroll={update}
          ref={trackRef}
          tabIndex={0}
        >
          {children}
        </ul>
      )}
    </div>
  )
}
