import React from 'react'

import { dmSans, dmSansOpsz } from '@/components/SaasLp/fonts'
import { cn } from '@/utilities/ui'

// Figma: SaaS LP ポートフォリオ用 / node 4:5019

type Props = {
  className?: string
  heading?: string
  lead?: string
}

export const SaasHeroHeading: React.FC<Props> = ({
  className,
  heading = 'Financial clarity for growing teams',
  lead = 'Track spend, automate approvals, and close the books faster — all in one place built for finance teams who move fast.',
}) => {
  return (
    <div
      className={cn(
        dmSans.className,
        dmSansOpsz,
        'flex flex-col items-center gap-[15px] text-center break-words',
        className,
      )}
    >
      <h1 className="w-full max-w-[1088px] text-[40px] leading-[48px] font-bold text-white md:text-[56px] md:leading-[66px] lg:text-[72px] lg:leading-[84px]">
        {heading}
      </h1>
      <p className="w-full max-w-[880px] text-lg leading-[30px] font-normal text-[#9b9ca1] md:text-[22px] md:leading-[36px]">
        {lead}
      </p>
    </div>
  )
}
