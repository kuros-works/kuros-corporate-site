/* eslint-disable @next/next/no-img-element -- CMS media URL, sized by the avatar */
import React from 'react'

import { dmSans } from '@/components/SaasLp/fonts'
import { cn } from '@/utilities/ui'

// 不動産LP「お客様の声」セクション。
// Figma 未確認のため構造優先の仮スタイル — 細部は後でFigmaと見比べて調整する。
// LP全体がライト固定なので、テーマ変数（bg-card 等）は使わず色を直接指定する。

// Display shape for one card. Kept free of payload-types so the component
// can be previewed with static data, same as RealEstateListings.
export type RealEstateTestimonial = {
  avatarSrc?: string | null
  name: string
  quote: string
  role?: string | null
}

const defaultTestimonials: RealEstateTestimonial[] = [
  {
    name: 'Emma Collins',
    quote: '"They found us a home in a week and handled every bit of the paperwork."',
    role: 'Bought in 2025',
  },
  {
    name: 'Daniel Ortiz',
    quote: '"Honest, patient and always on time. I would not move without them."',
    role: 'Renting since 2024',
  },
  {
    name: 'Sofia Lindqvist',
    quote: '"The viewings were well planned and the price was exactly as promised."',
    role: 'Bought in 2024',
  },
]

const Card: React.FC<{ testimonial: RealEstateTestimonial }> = ({ testimonial }) => {
  const { avatarSrc, name, quote, role } = testimonial

  return (
    <figure className="flex h-full flex-col gap-6 rounded-[25px] bg-white p-[30px] shadow-[0_32px_34px_rgba(0,0,0,0.13)]">
      <blockquote className="text-lg leading-7 text-neutral-700">
        <p>{quote}</p>
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3">
        <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-neutral-200">
          {avatarSrc && <img alt="" className="absolute inset-0 size-full object-cover" src={avatarSrc} />}
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="font-bold tracking-[-0.025em]">{name}</span>
          {role && <span className="text-sm text-neutral-500">{role}</span>}
        </div>
      </figcaption>
    </figure>
  )
}

type Props = {
  className?: string
  heading?: string
  testimonials?: RealEstateTestimonial[]
}

export const RealEstateTestimonials: React.FC<Props> = ({
  className,
  heading = 'What our customers say',
  testimonials = defaultTestimonials,
}) => (
  <section className={cn(dmSans.className, 'container text-black', className)}>
    <h2 className="mb-10 text-center text-3xl font-bold tracking-[-0.025em] md:text-4xl">{heading}</h2>
    {testimonials.length > 0 && (
      <ul className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <li key={index}>
            <Card testimonial={testimonial} />
          </li>
        ))}
      </ul>
    )}
  </section>
)
