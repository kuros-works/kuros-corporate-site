import React from 'react'

import { RealEstateAccentBar } from '@/components/RealEstateAccentBar'
import { dmSans } from '@/components/SaasLp/fonts'
import { cn } from '@/utilities/ui'

import { TestimonialTabs, type RealEstateTestimonial } from './TestimonialTabs'

// 不動産LP「お客様の声」セクション。
// Figma: Real Estate Template / Quote (node 0:3) — 見出しはなく、中央の列に
// アクセントバー（0:23, 336px）と大きな引用文1つ、その下に人物タブ3つ。
// 切り替え部分（推測）は TestimonialTabs にまとめてある。
// LP全体がライト固定なので、テーマ変数（bg-card 等）は使わず色を直接指定する。

export type { RealEstateTestimonial }

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

type Props = {
  className?: string
  testimonials?: RealEstateTestimonial[]
}

export const RealEstateTestimonials: React.FC<Props> = ({
  className,
  testimonials = defaultTestimonials,
}) => {
  if (testimonials.length === 0) return null

  return (
    <section className={cn(dmSans.className, 'mx-auto w-full max-w-[1101px] px-4', className)}>
      <RealEstateAccentBar className="mx-auto w-full max-w-[336px]" />
      <TestimonialTabs testimonials={testimonials} />
    </section>
  )
}
