/* eslint-disable @next/next/no-img-element -- CMS media URL, sized by the frame */
import React from 'react'

import type { RealEstateHeaderBlock as RealEstateHeaderBlockProps } from '@/payload-types'

import { dmSans } from '@/components/SaasLp/fonts'
import { cn } from '@/utilities/ui'
import { mediaSrc } from '../mediaSrc'

// 構造優先の仮スタイル — ヒーローへの重ね表示とFigmaに合わせた見た目は後続PRで入れる。
export const RealEstateHeaderBlock: React.FC<RealEstateHeaderBlockProps> = ({ cta, logo, nav }) => {
  const logoSrc = mediaSrc(logo)

  return (
    <header className={cn(dmSans.className, 'container flex items-center gap-8 py-8 text-black')}>
      {logoSrc && <img alt="" className="h-[34px] w-auto" src={logoSrc} />}
      {nav && nav.length > 0 && (
        <nav className="ml-auto hidden gap-14 lg:flex">
          {nav.map(({ href, label }, index) => (
            <a className="text-[15px] font-bold" href={href || undefined} key={index}>
              {label}
            </a>
          ))}
        </nav>
      )}
      <a
        className="ml-auto rounded-tr-[18px] bg-[#ffac12] px-10 py-3.5 text-[17px] font-bold lg:ml-0"
        href={cta.href || undefined}
      >
        {cta.label}
      </a>
    </header>
  )
}
