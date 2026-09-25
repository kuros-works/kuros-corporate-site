import type { Metadata } from 'next'

import React from 'react'

import { SaasBento } from '@/components/SaasBento'
import { SaasCta } from '@/components/SaasCta'
import { SaasFooter } from '@/components/SaasFooter'
import { SaasHeader } from '@/components/SaasHeader'
import { SaasHeroHeading } from '@/components/SaasHeroHeading'
import { HeroBadge } from '@/components/SaasHeroHeading/HeroBadge'
import { HeroDashboard } from '@/components/SaasHeroHeading/HeroDashboard'
import { HeroEmailForm } from '@/components/SaasHeroHeading/HeroEmailForm'
import { HeroMenu } from '@/components/SaasHeroHeading/HeroMenu'
import { HeroReview } from '@/components/SaasHeroHeading/HeroReview'
import { SaasPricing } from '@/components/SaasPricing'
import { SaasTestimonials } from '@/components/SaasTestimonials'

// Static portfolio LP (Figma: SaaS LP ポートフォリオ用 / "Finance Dark").
// Not CMS-driven — this static segment takes precedence over /lp/[slug],
// so a landing-pages doc with the slug "ledgerly" would be shadowed.
export default function LedgerlyPage() {
  return (
    <>
      <SaasHeader />
      {/* Figma puts the hero badge at y=200 under a 92px header, so xl:pt is 108 */}
      <main className="min-h-screen bg-[#1d1c20] px-4 pt-10 pb-16 md:pt-20 md:pb-24 xl:pt-[108px] xl:pb-[115px]">
        <div className="mb-[14px] flex justify-center">
          <HeroBadge />
        </div>
        <SaasHeroHeading className="mx-auto" />
        <HeroEmailForm className="mx-auto mt-8 md:mt-10 xl:mt-14" />
        <HeroReview className="mt-8 md:mt-12 xl:mt-[62px]" />
        <HeroDashboard className="mx-auto mt-8 md:mt-12 xl:mt-[63px]" />
        <div className="mt-6 flex justify-center md:mt-10 xl:mt-12">
          <HeroMenu />
        </div>
        <SaasBento className="mt-24 md:mt-32 xl:mt-[149px]" />
        <SaasTestimonials className="mt-24 md:mt-32 xl:mt-[200px]" />
        <SaasPricing className="mt-28 md:mt-40 xl:mt-[266px]" />
        <SaasCta className="mt-24 md:mt-32 xl:mt-[235px]" />
      </main>
      <SaasFooter />
    </>
  )
}

export const metadata: Metadata = {
  title: 'Ledgerly — Financial clarity for growing teams',
  description:
    'Track spend, automate approvals, and close the books faster — all in one place built for finance teams who move fast.',
}
