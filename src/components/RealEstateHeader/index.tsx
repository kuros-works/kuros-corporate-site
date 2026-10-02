/* eslint-disable @next/next/no-img-element -- CMS logo URL and static decorative Figma assets */
import React from 'react'

import { dmSans } from '@/components/SaasLp/fonts'
import { cn } from '@/utilities/ui'

// Figma: Real Estate Template / node 0:111 (Nav)
// Transparent row laid over the hero photo: logo, nav links and the yellow
// "Work with us" button across a 1069px row. The nav is hidden below lg.
// Light text only — the LP page places it on the hero (or a black strip).

const asset = (name: string) => `/figma/real-estate/${name}`

export type RealEstateNavItem = {
  href?: string
  label: string
}

type Props = {
  className?: string
  ctaHref?: string
  ctaLabel: string
  logoAlt?: string | null
  logoSrc?: string | null
  nav?: RealEstateNavItem[]
}

export const RealEstateHeader: React.FC<Props> = ({
  className,
  ctaHref,
  ctaLabel,
  logoAlt,
  logoSrc,
  nav = [],
}) => (
  <header className={cn(dmSans.className, 'pt-8 text-white', className)}>
    <div className="mx-auto flex h-[50px] w-full max-w-[1101px] items-center px-4">
      {logoSrc && <img alt={logoAlt || ''} className="h-[34px] w-auto" src={logoSrc} />}

      {nav.length > 0 && (
        <nav className="ml-auto hidden lg:block">
          <ul className="flex gap-[60px]">
            {nav.map(({ href, label }, index) => (
              <li key={index}>
                <a
                  className="text-[15px] font-bold tracking-[-0.025em] transition-opacity hover:opacity-70"
                  href={href}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <a
        className={cn(
          'ml-auto flex h-11 shrink-0 items-center justify-center gap-[9px] rounded-tr-[18px] bg-[#ffac12] px-6 text-[17px] font-bold tracking-[-0.025em] text-black transition-opacity hover:opacity-90 lg:h-[50px] lg:w-[211px] lg:px-0',
          nav.length > 0 && 'lg:ml-[60px]',
        )}
        href={ctaHref}
      >
        {ctaLabel}
        <img alt="" height={10} src={asset('arrow-black.svg')} width={20} />
      </a>
    </div>
  </header>
)
