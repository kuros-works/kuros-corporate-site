/* eslint-disable @next/next/no-img-element -- static decorative Figma assets */
import React from 'react'

import { dmSans, dmSansOpsz, inter } from '@/components/SaasLp/fonts'
import { cn } from '@/utilities/ui'

// Figma: SaaS LP ポートフォリオ用 / node 4:3158 (header)
// Logo, centered nav and "Get started" across a 1320px row. The nav is
// hidden below lg; "Pages" only carries a decorative chevron (no dropdown).

const asset = (name: string) => `/figma/saas-header/${name}`

type NavItem = { dropdown?: boolean; href?: string; label: string }

const defaultNav: NavItem[] = [
  { label: 'Product' },
  { dropdown: true, label: 'Pages' },
  { label: 'Integrations' },
  { label: 'Blog' },
  { label: 'Pricing' },
]

type Props = {
  className?: string
  ctaHref?: string
  ctaLabel?: string
  nav?: NavItem[]
}

export const SaasHeader: React.FC<Props> = ({
  className,
  ctaHref = '#',
  ctaLabel = 'Get started',
  nav = defaultNav,
}) => {
  return (
    <header
      className={cn(
        dmSans.className,
        dmSansOpsz,
        'border-b-[0.8px] border-[#161616] bg-[#0f0f0f] px-4 py-3 md:px-10 md:py-5',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-6">
        <a className="flex shrink-0 items-center gap-2" href="#">
          <img alt="" height={18} src={asset('logo.svg')} width={18} />
          <span className={cn(inter.className, 'text-xl leading-[16.2px] font-semibold text-[#fbfbfb]')}>
            Ledgerly
          </span>
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-2 p-1">
            {nav.map(({ dropdown, href = '#', label }) => (
              <li key={label}>
                <a
                  className="flex items-center gap-1 p-2 text-lg leading-[22.4px] text-[#9b9ca1] transition-colors hover:text-white"
                  href={href}
                >
                  {label}
                  {dropdown && (
                    <span className="flex size-4 items-center justify-center">
                      <img alt="" height={6.50377} src={asset('chevron-down.svg')} width={11.5039} />
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          className="shrink-0 rounded-[64px] bg-[#1f1f1f] px-5 py-3 text-base leading-[19.2px] font-medium text-[#fbfbfb] ring-1 ring-[#3b3b3b] ring-inset transition-colors hover:bg-[#262626] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:px-6 md:py-4"
          href={ctaHref}
        >
          {ctaLabel}
        </a>
      </div>
    </header>
  )
}
