/* eslint-disable @next/next/no-img-element -- CMS media URL, sized by the frame */
import React from 'react'

import { dmSans } from '@/components/SaasLp/fonts'
import { cn } from '@/utilities/ui'

// 不動産LP「You're in good hands」系セクション（画像左／画像右／暗背景の中央寄せ）。
// Figma 未確認のため構造優先の仮スタイル — 細部は後でFigmaと見比べて調整する。
// LP全体がライト固定なので、テーマ変数（bg-card 等）は使わず色を直接指定する。

export type RealEstateFeatureVariant = 'imageLeft' | 'imageRight' | 'darkCentered'

type Props = {
  body?: React.ReactNode
  className?: string
  heading?: string
  imageAlt?: string | null
  imageSrc?: string | null
  variant?: RealEstateFeatureVariant
}

const defaultHeading = "You're in good hands"
const defaultBody = (
  <p>
    Our agents know every neighborhood we work in, so you get honest advice from the first
    viewing to the day you get your keys.
  </p>
)

export const RealEstateFeature: React.FC<Props> = ({
  body = defaultBody,
  className,
  heading = defaultHeading,
  imageAlt,
  imageSrc,
  variant = 'imageLeft',
}) => {
  const image = (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[25px] bg-neutral-100">
      {imageSrc && (
        <img alt={imageAlt || ''} className="absolute inset-0 size-full object-cover" src={imageSrc} />
      )}
    </div>
  )

  if (variant === 'darkCentered') {
    return (
      <section className={cn(dmSans.className, 'bg-[#1b1b1b] py-20 text-white', className)}>
        <div className="container flex flex-col items-center gap-10 text-center">
          <div className="flex max-w-2xl flex-col gap-4">
            <h2 className="text-3xl font-bold tracking-[-0.025em] md:text-4xl">{heading}</h2>
            {body && <div className="text-base text-neutral-300">{body}</div>}
          </div>
          {imageSrc && <div className="w-full max-w-4xl">{image}</div>}
        </div>
      </section>
    )
  }

  return (
    <section className={cn(dmSans.className, 'container text-black', className)}>
      <div
        className={cn(
          'grid items-center gap-10 md:grid-cols-2 md:gap-16',
          variant === 'imageRight' && 'md:[&>*:first-child]:order-2',
        )}
      >
        {image}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold tracking-[-0.025em] md:text-4xl">{heading}</h2>
          {body && <div className="text-base text-neutral-600">{body}</div>}
        </div>
      </div>
    </section>
  )
}
