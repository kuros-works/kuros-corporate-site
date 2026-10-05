/* eslint-disable @next/next/no-img-element -- static decorative Figma asset */
import React from 'react'

import { dmSans } from '@/components/SaasLp/fonts'
import { cn } from '@/utilities/ui'

// Figma: Real Estate Template / Footer (node 0:24) の CTA (0:63)。
// 見出し（0:65）と、グラデーションの強調語（0:66）、黄色のボタン（0:67）が横に並ぶ。
// 背景はフッターと共通（0:25）なので、ここでは持たない（RealEstateFooterFrame が敷く）。

// 0:66
const highlightGradient =
  'linear-gradient(159.17deg, rgb(255, 172, 18) 5.464%, rgb(200, 114, 36) 96.964%)'

type Props = {
  buttonHref?: string
  buttonLabel: string
  className?: string
  heading: string
  highlight?: string | null
}

export const RealEstateCta: React.FC<Props> = ({
  buttonHref,
  buttonLabel,
  className,
  heading,
  highlight,
}) => (
  <section
    className={cn(
      dmSans.className,
      'mx-auto flex w-full max-w-[1101px] flex-col items-start gap-8 px-4 text-white md:flex-row md:items-center md:justify-between',
      className,
    )}
  >
    <h2 className="text-3xl font-bold tracking-[-0.025em] md:text-[42px] md:leading-[55px]">
      {heading}
      {highlight && (
        <>
          {' '}
          {/* box-decoration-clone keeps the gradient on every line if it wraps. */}
          <span
            className="box-decoration-clone bg-clip-text text-transparent"
            style={{ backgroundImage: highlightGradient }}
          >
            {highlight}
          </span>
        </>
      )}
    </h2>

    {/* 0:68: 211×70, top-right corner 18px; 0:69: 40px in from the left, arrow 9px after the label. */}
    <a
      className="flex h-[70px] min-w-[211px] shrink-0 items-center gap-[9px] rounded-tr-[18px] bg-[#ffac12] px-10 text-[17px] font-bold tracking-[-0.025em] text-black"
      href={buttonHref}
    >
      {buttonLabel}
      <img alt="" height={10} src="/figma/real-estate/arrow-white.svg" width={20} />
    </a>
  </section>
)
