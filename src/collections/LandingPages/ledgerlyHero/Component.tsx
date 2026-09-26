import React from 'react'

import type { LedgerlyHeroBlock as LedgerlyHeroBlockProps } from '@/payload-types'

import { SaasHeroHeading } from '@/components/SaasHeroHeading'
import { HeroBadge } from '@/components/SaasHeroHeading/HeroBadge'
import { HeroDashboard } from '@/components/SaasHeroHeading/HeroDashboard'
import { HeroEmailForm } from '@/components/SaasHeroHeading/HeroEmailForm'
import { HeroMenu } from '@/components/SaasHeroHeading/HeroMenu'
import { HeroReview } from '@/components/SaasHeroHeading/HeroReview'

import { mediaSrc } from '../mediaSrc'

// Same composition and spacing as the static /lp/ledgerly hero.
export const LedgerlyHeroBlock: React.FC<LedgerlyHeroBlockProps> = ({
  badge,
  dashboard,
  emailForm,
  heading,
  lead,
  pillNav,
  review,
}) => {
  // An unpopulated or deleted avatar would render a broken <img>, so skip it.
  const avatars = (review?.avatars ?? []).flatMap(({ avatar, avatarCover }) => {
    const base = mediaSrc(avatar)
    if (!base) return []
    const cover = mediaSrc(avatarCover)
    return [cover ? [base, cover] : [base]]
  })
  const dashboardSrc = mediaSrc(dashboard)
  const menuItems = (pillNav ?? []).map(({ active, href, label }) => ({
    active: Boolean(active),
    href: href || undefined,
    label,
  }))

  return (
    <section className="bg-[#1d1c20] px-4 pt-10 pb-16 md:pt-20 md:pb-24 xl:pt-[108px]">
      {badge?.label && (
        <div className="mb-[14px] flex justify-center">
          <HeroBadge href={badge.href || undefined} label={badge.label} tag={badge.tag || ''} />
        </div>
      )}
      <SaasHeroHeading className="mx-auto" heading={heading} lead={lead ?? ''} />
      <HeroEmailForm
        buttonLabel={emailForm?.buttonLabel || undefined}
        className="mx-auto mt-8 md:mt-10 xl:mt-14"
        placeholder={emailForm?.placeholder || undefined}
      />
      {(avatars.length > 0 || review?.countBadge || review?.caption) && (
        <HeroReview
          avatars={avatars}
          caption={review?.caption ?? ''}
          className="mt-8 md:mt-12 xl:mt-[62px]"
          countBadge={review?.countBadge || undefined}
        />
      )}
      {dashboardSrc && typeof dashboard === 'object' && (
        <HeroDashboard
          alt={dashboard?.alt ?? ''}
          className="mx-auto mt-8 md:mt-12 xl:mt-[63px]"
          height={dashboard?.height ?? undefined}
          src={dashboardSrc}
          width={dashboard?.width ?? undefined}
        />
      )}
      {menuItems.length > 0 && (
        <div className="mt-6 flex justify-center md:mt-10 xl:mt-12">
          <HeroMenu items={menuItems} />
        </div>
      )}
    </section>
  )
}
