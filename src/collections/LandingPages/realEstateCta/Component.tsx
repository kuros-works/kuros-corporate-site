import React from 'react'

import type { RealEstateCtaBlock as RealEstateCtaBlockProps } from '@/payload-types'

import { dmSans } from '@/components/SaasLp/fonts'
import { cn } from '@/utilities/ui'

// 構造優先の仮スタイル — Figmaに合わせた見た目は後続PRで入れる。
export const RealEstateCtaBlock: React.FC<RealEstateCtaBlockProps> = ({
  button,
  heading,
  highlight,
}) => (
  <section className={cn(dmSans.className, 'bg-black py-16 text-white')}>
    <div className="container flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
      <h2 className="text-3xl font-bold md:text-[42px]">
        {heading}
        {highlight && <span className="text-[#ffac12]"> {highlight}</span>}
      </h2>
      <a
        className="rounded-tr-[18px] bg-[#ffac12] px-10 py-6 text-[17px] font-bold text-black"
        href={button.href || undefined}
      >
        {button.label}
      </a>
    </div>
  </section>
)
