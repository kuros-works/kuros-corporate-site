/* eslint-disable @next/next/no-img-element -- static decorative Figma asset */
import React from 'react'

import { dmSans, dmSansOpsz } from '@/components/SaasLp/fonts'
import { cn } from '@/utilities/ui'

// Figma: SaaS LP ポートフォリオ用 / node 1:482 (CTA)
// Dark panel with the headline and two CTAs on the left and a decorative
// photo inset 19px on the right (stacked below the copy on small screens).

type Props = {
  className?: string
  demoHref?: string
  demoLabel?: string
  videoHref?: string
  videoLabel?: string
}

const button =
  'flex h-[60px] w-full items-center justify-center rounded-full text-lg font-medium text-[#1d1c20] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-[240px]'

export const SaasCta: React.FC<Props> = ({
  className,
  demoHref = '#',
  demoLabel = 'Request Demo',
  videoHref = '#',
  videoLabel = 'Watch Video',
}) => {
  return (
    <section
      aria-labelledby="cta-heading"
      className={cn(
        dmSans.className,
        dmSansOpsz,
        'mx-auto flex w-full max-w-[1640px] flex-col gap-3 rounded-[28px] bg-[#0f0f0f] p-3 md:rounded-[40px] lg:flex-row lg:items-center lg:gap-8 lg:p-[19px]',
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col px-3 pt-8 pb-4 md:px-8 md:pt-12 lg:py-8 lg:pl-[60px] xl:pl-[60px]">
        <h2
          className="max-w-[776px] text-[40px] leading-[48px] font-bold text-white md:text-[56px] md:leading-[68px] xl:text-[72px] xl:leading-[86px]"
          id="cta-heading"
        >
          Let&apos;s bring clarity to your finances with Ledgerly
        </h2>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-[22px] xl:mt-14">
          <a className={cn(button, 'bg-[#a3dc2f]')} href={demoHref}>
            {demoLabel}
          </a>
          <a className={cn(button, 'bg-white')} href={videoHref}>
            {videoLabel}
          </a>
        </div>
      </div>

      {/* decorative; mirrored horizontally as in the design */}
      <div
        aria-hidden
        className="relative aspect-[589/562] w-full shrink-0 overflow-hidden rounded-[22px] md:rounded-[34px] lg:w-[36.8%] lg:max-w-[589px]"
      >
        <img
          alt=""
          className="absolute inset-0 size-full -scale-x-100 object-cover"
          src="/figma/saas-cta/photo.webp"
        />
      </div>
    </section>
  )
}
