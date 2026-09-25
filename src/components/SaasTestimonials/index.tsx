/* eslint-disable @next/next/no-img-element -- static decorative Figma assets */
import React from 'react'

import { dmSans, dmSansOpsz } from '@/components/SaasLp/fonts'
import { SectionHeading } from '@/components/SaasLp/SectionHeading'
import { cn } from '@/utilities/ui'

// Figma: SaaS LP ポートフォリオ用 / node 9:722 (testmonials)
// Horizontally scrolling row of quote cards that bleeds off the right edge,
// as in the design. The arrow buttons are decorative unless given an `href`.

const asset = (name: string) => `/figma/saas-testimonials/${name}`

// Bare file names resolve to the bundled Figma assets; full URLs (Vercel Blob)
// and root-relative paths (Payload's /api/media/file/...) are used as-is.
const avatarSrc = (src: string) => (/^(https?:)?\/\/|^\//.test(src) ? src : asset(src))

export type Testimonial = {
  // Avatar layers exactly as in Figma: a base image, plus an optional
  // oversized cover that sits on top of it.
  avatar: string
  avatarCover?: string
  name: string
  quote: string
  role?: string
}

const defaultTestimonials: Testimonial[] = [
  {
    avatar: 'avatar-1a.png',
    avatarCover: 'avatar-1b.png',
    name: 'Rina Cortez',
    quote: '"Ledgerly cut our monthly close from five days to one."',
  },
  {
    avatar: 'avatar-2.png',
    name: 'Marcus Webb',
    quote: '"Finally, an expense tool our whole team actually uses."',
  },
  {
    avatar: 'avatar-3.png',
    name: 'Priya Nandan',
    quote: '"We caught overspending in week one. It paid for itself immediately."',
  },
]

const Card: React.FC<Testimonial> = ({ avatar, avatarCover, name, quote, role }) => (
  <figure className="relative flex min-h-[260px] w-[min(660px,calc(100vw-48px))] shrink-0 snap-start flex-col rounded-[20px] bg-[#161616] px-6 pt-8 pb-6 md:min-h-[313px] md:px-[39px] md:pt-[41px] md:pb-10">
    <blockquote className="text-xl leading-8 text-white md:text-[26px] md:leading-[42px]">
      <p>{quote}</p>
    </blockquote>

    <figcaption className="mt-auto flex items-start gap-[10px] pt-8 pr-20">
      <div className="relative mt-px size-[60px] shrink-0">
        <img alt="" className="absolute inset-0 size-full" height={60} src={avatarSrc(avatar)} width={60} />
        {avatarCover && (
          <img
            alt=""
            className="absolute top-[-5.5px] left-[-4.5px] max-w-none"
            height={69}
            src={avatarSrc(avatarCover)}
            width={69}
          />
        )}
      </div>
      <div className="flex min-w-0 flex-col">
        <span className="text-[22px] leading-[34px] tracking-[-0.65px] text-white md:text-[26px]">
          {name}
        </span>
        {role && <span className="text-base leading-6 text-[#9b9ca1]">{role}</span>}
        <img
          alt="5 out of 5 stars"
          className="mt-[6.81px]"
          height={14.6306}
          src={asset('stars.svg')}
          width={85.4383}
        />
      </div>
    </figcaption>

    {/* decorative closing quote mark: two rotated glyphs at 20% opacity. The
        source PNG is purple; Figma renders it near-white via a fill
        adjustment, reproduced here with brightness-0 + invert. */}
    <div
      aria-hidden
      className="absolute right-6 bottom-6 h-[48.067px] w-[67.522px] md:right-[43.48px] md:bottom-[45.93px]"
    >
      {[0, 35.478].map((left) => (
        <img
          alt=""
          className="absolute top-0 h-[48.067px] w-[32.044px] max-w-none rotate-180 object-cover opacity-20 brightness-0 invert"
          key={left}
          src={asset('quote.png')}
          style={{ left }}
        />
      ))}
    </div>
  </figure>
)

const Arrow: React.FC<{ direction: 'left' | 'right'; href?: string }> = ({ direction, href }) => {
  const classes = cn(
    'flex size-[60px] items-center justify-center rounded-full',
    direction === 'left' ? 'bg-[#222629]' : 'bg-[#a3dc2f]',
    href && 'transition-opacity hover:opacity-90',
  )
  const icon = <img alt="" height={24} src={asset(`arrow-${direction}.svg`)} width={24} />
  const label = direction === 'left' ? 'Previous testimonial' : 'Next testimonial'

  return href ? (
    <a aria-label={label} className={classes} href={href}>
      {icon}
    </a>
  ) : (
    <span aria-hidden className={classes}>
      {icon}
    </span>
  )
}

type Props = {
  className?: string
  nextHref?: string
  prevHref?: string
  testimonials?: Testimonial[]
}

export const SaasTestimonials: React.FC<Props> = ({
  className,
  nextHref,
  prevHref,
  testimonials = defaultTestimonials,
}) => {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className={cn(dmSans.className, dmSansOpsz, 'flex flex-col items-center', className)}
    >
      <SectionHeading
        icon={
          <img
            alt=""
            className="absolute top-[2.75px] left-[1.25px]"
            height={12.5}
            src={asset('chat.svg')}
            width={13.5}
          />
        }
        id="testimonials-heading"
        label="Testimonials"
        lead="Real teams, real results. Here's what finance leaders are saying about Ledgerly."
        title="What are people saying"
      />

      {/* Full-bleed track: cancels the page gutter and starts at the 1536px
          content column (192px at 1920) so cards run off the right edge. */}
      <div
        aria-label="Testimonials"
        className="-mx-4 mt-10 flex snap-x self-stretch snap-mandatory scroll-px-[max(16px,calc((100vw-1536px)/2))] gap-4 overflow-x-auto px-[max(16px,calc((100vw-1536px)/2))] [scrollbar-width:none] md:mt-14 md:gap-[30px] xl:mt-[86px] [&::-webkit-scrollbar]:hidden"
        role="region"
        tabIndex={0}
      >
        {testimonials.map((t) => (
          <Card key={t.name} {...t} />
        ))}
      </div>

      <div className="mt-10 flex gap-[14px] md:mt-14 xl:mt-[86px]">
        <Arrow direction="left" href={prevHref} />
        <Arrow direction="right" href={nextHref} />
      </div>
    </section>
  )
}
