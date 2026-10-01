/* eslint-disable @next/next/no-img-element -- CMS media URL, sized by the frame */
import React from 'react'

import type { RealEstateHeroBlock as RealEstateHeroBlockProps } from '@/payload-types'

import { dmSans } from '@/components/SaasLp/fonts'
import { cn } from '@/utilities/ui'
import { mediaSrc } from '../mediaSrc'

// 構造優先の仮スタイル — Figmaに合わせた見た目は後続PRで入れる。
export const RealEstateHeroBlock: React.FC<RealEstateHeroBlockProps> = ({
  backgroundImage,
  heading,
  lead,
  listingsLink,
}) => {
  const backgroundSrc = mediaSrc(backgroundImage)

  return (
    <section className={cn(dmSans.className, 'relative bg-neutral-900 text-white')}>
      {backgroundSrc && (
        <img alt="" className="absolute inset-0 size-full object-cover" src={backgroundSrc} />
      )}
      <div className="relative container flex flex-col gap-6 pt-32 pb-16">
        <h1 className="max-w-[520px] text-5xl font-bold md:text-[80px] md:leading-[80px]">
          {heading}
        </h1>
        {lead && <p className="max-w-[428px] text-xl leading-7 opacity-60">{lead}</p>}
        <a
          className="mt-10 rounded-tr-[25px] bg-white px-10 py-9 text-xl font-bold text-black"
          href={listingsLink.href || undefined}
        >
          {listingsLink.label}
        </a>
      </div>
    </section>
  )
}
