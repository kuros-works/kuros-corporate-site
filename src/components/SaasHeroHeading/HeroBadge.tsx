/* eslint-disable @next/next/no-img-element -- static decorative Figma asset */
import React from 'react'

import { dmSans, dmSansOpsz } from '@/components/SaasLp/fonts'
import { cn } from '@/utilities/ui'

// Figma: SaaS LP ポートフォリオ用 / node 4:4958 (Link)
// Announcement pill shown directly above the hero heading.
// Decorative by default; pass `href` to turn it into a link later.

type Props = {
  className?: string
  href?: string
  label?: string
  tag?: string
}

export const HeroBadge: React.FC<Props> = ({
  className,
  href,
  label = 'Introducing AI Automation',
  tag = 'New',
}) => {
  // The border is an inset ring (the design's ::after overlay) so it
  // doesn't add to the 33px height.
  const classes = cn(
    dmSans.className,
    dmSansOpsz,
    'inline-flex max-w-full items-center gap-2 rounded-[32px] bg-[#171f05] py-1 pr-2 pl-1 text-sm leading-[16.8px] font-medium ring-1 ring-[#364c09] ring-inset',
    href && 'transition-colors hover:bg-[#1f2a07]',
    className,
  )

  const content = (
    <>
      <span className="shrink-0 rounded-[64px] bg-[#a3dc2f] px-2 py-1 text-white">{tag}</span>
      <span className="flex min-w-0 items-center gap-2 text-[#a3dc2f]">
        <span className="truncate">{label}</span>
        <span className="flex size-4 shrink-0 items-center justify-center">
          <img alt="" height={10.5032} src="/figma/saas-hero/arrow-right.svg" width={12.5022} />
        </span>
      </span>
    </>
  )

  return href ? (
    <a className={classes} href={href}>
      {content}
    </a>
  ) : (
    <div className={classes}>{content}</div>
  )
}
