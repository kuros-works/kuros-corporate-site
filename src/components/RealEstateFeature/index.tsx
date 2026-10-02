/* eslint-disable @next/next/no-img-element -- CMS media URL and static decorative Figma assets */
import React from 'react'

import { RealEstateAccentBar } from '@/components/RealEstateAccentBar'
import { dmSans } from '@/components/SaasLp/fonts'
import { cn } from '@/utilities/ui'

// 不動産LP「You're in good hands」系セクション。
// Figma: Real Estate Template
// - imageLeft:    Good Hands (node 0:405) — 写真 704×657 がページ左端まで広がり、右に本文。
// - imageRight:   Good Hands (node 0:156) — 左右を入れ替えた形。
// - darkCentered: Callout (node 0:92) — 暗い茶→黒のグラデ、中央寄せ、画像なし、黄色ボタン。
// LP全体がライト固定なので、テーマ変数（bg-card 等）は使わず色を直接指定する。

const asset = (name: string) => `/figma/real-estate/${name}`

// 0:93
const calloutGradient =
  'linear-gradient(205.4865deg, rgb(39, 26, 0) 0.448%, rgba(0, 0, 0, 0.982) 100.47%)'

export type RealEstateFeatureVariant = 'imageLeft' | 'imageRight' | 'darkCentered'

type Props = {
  body?: React.ReactNode
  buttonHref?: string | null
  buttonLabel?: string | null
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

// 0:163 / 0:412 (black, yellow arrow) and 0:98 (yellow, white arrow): 209×70,
// 40px side padding, top-right corner 18px.
const FeatureButton: React.FC<{ href?: string | null; label: string; onDark: boolean }> = ({
  href,
  label,
  onDark,
}) => (
  <a
    className={cn(
      'inline-flex h-[70px] items-center gap-[19px] rounded-tr-[18px] px-10 text-[17px] font-bold tracking-[-0.025em]',
      onDark ? 'bg-[#ffac12] text-black' : 'bg-black text-white',
    )}
    href={href || undefined}
  >
    {label}
    <img
      alt=""
      height={10}
      src={asset(onDark ? 'arrow-white.svg' : 'arrow-yellow-small.svg')}
      width={20}
    />
  </a>
)

export const RealEstateFeature: React.FC<Props> = ({
  body = defaultBody,
  buttonHref,
  buttonLabel,
  className,
  heading = defaultHeading,
  imageAlt,
  imageSrc,
  variant = 'imageLeft',
}) => {
  const onDark = variant === 'darkCentered'
  const button = buttonLabel ? (
    <FeatureButton href={buttonHref} label={buttonLabel} onDark={onDark} />
  ) : null

  // The Callout has no image, so one set on a 暗背景・中央寄せ section is not shown.
  if (onDark) {
    return (
      <section
        className={cn(dmSans.className, 'px-4 py-24 text-white lg:py-[150px]', className)}
        style={{ backgroundImage: calloutGradient }}
      >
        <div className="mx-auto flex max-w-[475px] flex-col items-center text-center">
          <RealEstateAccentBar onDark />
          <h2 className="mt-[17px] text-4xl font-bold tracking-[-0.025em] md:text-[50px] md:leading-[65px]">
            {heading}
          </h2>
          {body && (
            <div className="mt-5 max-w-[428px] text-xl leading-7 tracking-[-0.025em] text-white/60">
              {body}
            </div>
          )}
          {button && <div className="mt-[30px] flex">{button}</div>}
        </div>
      </section>
    )
  }

  const imageRight = variant === 'imageRight'

  return (
    <section
      className={cn(
        dmSans.className,
        'grid items-center gap-10 px-4 text-black lg:gap-[60px] lg:px-0',
        imageRight
          ? 'lg:grid-cols-[1fr_minmax(0,704px)] lg:pl-[max(1rem,calc((100%-1069px)/2))]'
          : 'lg:grid-cols-[minmax(0,704px)_1fr] lg:pr-[max(1rem,calc((100%-1069px)/2))]',
        className,
      )}
    >
      <div
        className={cn(
          'relative aspect-[704/657] overflow-hidden bg-neutral-100 shadow-[0_62px_54px_rgba(0,0,0,0.3)]',
          imageRight ? 'rounded-tl-[57px] lg:order-2' : 'rounded-tr-[57px]',
        )}
      >
        {imageSrc && (
          <img alt={imageAlt || ''} className="absolute inset-0 size-full object-cover" src={imageSrc} />
        )}
      </div>
      <div className="flex max-w-[474px] flex-col">
        <RealEstateAccentBar />
        <h2 className="mt-[17px] text-4xl font-bold tracking-[-0.025em] md:text-[50px] md:leading-[65px]">
          {heading}
        </h2>
        {body && (
          <div className="mt-5 text-xl leading-7 tracking-[-0.025em] text-black/60">{body}</div>
        )}
        {button && <div className="mt-[30px] flex">{button}</div>}
      </div>
    </section>
  )
}
