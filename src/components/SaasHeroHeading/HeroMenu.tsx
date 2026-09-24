import React from 'react'

import { dmSans, dmSansOpsz } from '@/components/SaasLp/fonts'
import { cn } from '@/utilities/ui'

// Figma: SaaS LP ポートフォリオ用 / node 9:723 (menu)
// Glass pill nav shown under the hero dashboard. Decorative for now: items
// render as plain text unless given an `href`.

type Item = {
  active?: boolean
  href?: string
  label: string
}

const defaultItems: Item[] = [
  { label: 'Product' },
  { label: 'Integration' },
  { label: 'Demo' },
  { label: 'Pricing' },
  { active: true, label: 'Login' },
]

type Props = {
  className?: string
  items?: Item[]
}

export const HeroMenu: React.FC<Props> = ({ className, items = defaultItems }) => {
  return (
    <nav
      aria-label="Product"
      className={cn(
        dmSans.className,
        dmSansOpsz,
        'flex max-w-full items-start justify-center rounded-[48px] border border-white bg-white/20 px-1.5 py-1.5 backdrop-blur-[32.65px] sm:px-2',
        className,
      )}
    >
      {items.map(({ active, href, label }) => {
        const classes = cn(
          'flex items-center justify-center rounded-[40px] px-2.5 py-2 text-[13px] leading-[normal] font-medium whitespace-nowrap sm:px-4 sm:py-2.5 sm:text-base md:px-[22px] md:py-3 md:text-lg',
          active ? 'bg-white text-[#1d1c20]' : 'text-white',
        )

        return href ? (
          <a className={classes} href={href} key={label}>
            {label}
          </a>
        ) : (
          <span className={classes} key={label}>
            {label}
          </span>
        )
      })}
    </nav>
  )
}
