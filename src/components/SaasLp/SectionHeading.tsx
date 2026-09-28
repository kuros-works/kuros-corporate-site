import React from 'react'

import { cn } from '@/utilities/ui'

// Shared section header for the SaaS LP (Figma: testmonials 9:470 / pricing
// 9:726): a green pill, a centered H2 and a lead paragraph. The lead sits in
// a 92px box on desktop, which is what spaces it from the content below.

type Props = {
  className?: string
  icon: React.ReactNode
  id: string
  label: string
  lead: React.ReactNode
  title: React.ReactNode
}

export const SectionHeading: React.FC<Props> = ({ className, icon, id, label, lead, title }) => (
  <div className={cn('flex w-full max-w-[1067px] flex-col items-center gap-4 text-center', className)}>
    <span className="inline-flex items-center gap-1 rounded-[32px] bg-[#171f05] px-3 py-2 text-sm leading-[16.8px] font-medium text-[#a3dc2f] ring-1 ring-[#364c09] ring-inset">
      <span className="relative size-4 shrink-0">{icon}</span>
      {label}
    </span>
    <h2
      className="max-w-[728px] text-[32px] leading-10 font-bold text-[#fbfbfb] md:text-[47.813px] md:leading-[48px]"
      id={id}
    >
      {title}
    </h2>
    <p className="text-base leading-[26px] text-[#9b9ca1] md:text-lg md:leading-[30px] xl:flex xl:h-[92px] xl:items-center">
      {lead}
    </p>
  </div>
)
