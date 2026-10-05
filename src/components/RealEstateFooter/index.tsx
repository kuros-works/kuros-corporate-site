/* eslint-disable @next/next/no-img-element -- CMS logo URL and static decorative Figma assets */
import React from 'react'

import { dmSans } from '@/components/SaasLp/fonts'
import { cn } from '@/utilities/ui'

// Figma: Real Estate Template / Footer (node 0:24)
// - 0:26 / 0:50: ロゴ（128×34）の30px下にSNSアイコン（間隔40px）。
// - Group 11 ×3 (0:74, 0:80, 0:86): 幅115pxの列が274px間隔で、右端がコンテンツ幅の右端。
// 背景と区切り線は RealEstateFooterFrame / RealEstateFooterDivider（CTAと共有）。

export { RealEstateFooterDivider, RealEstateFooterFrame } from './Frame'

const asset = (name: string) => `/figma/real-estate/${name}`

export type RealEstateFooterColumn = {
  links: { href?: string; label: string }[]
  title: string
}

export type RealEstateSocialLinks = {
  facebook?: string | null
  instagram?: string | null
  twitter?: string | null
}

type Props = {
  className?: string
  columns?: RealEstateFooterColumn[]
  logoAlt?: string | null
  logoSrc?: string | null
  socialLinks?: RealEstateSocialLinks
}

// Sizes are the SVGs' own (0:52, 0:54, 0:58); the row is 22px tall and centers them.
const socialIcons: { icon: React.ReactNode; key: keyof RealEstateSocialLinks; label: string }[] = [
  {
    icon: <img alt="" className="h-[19.845px] w-[9.92331px]" src={asset('facebook.svg')} />,
    key: 'facebook',
    label: 'Facebook',
  },
  {
    icon: <img alt="" className="h-[17.875px] w-[22px]" src={asset('twitter.svg')} />,
    key: 'twitter',
    label: 'Twitter',
  },
  {
    // 004-instagram is three layers: the rounded frame (0:58), the lens (0:61)
    // and the dot (0:62), placed as in Figma.
    icon: (
      <span className="relative block size-[22px]">
        <img
          alt=""
          className="absolute top-0 left-0 size-[22px]"
          src={asset('instagram-frame.svg')}
        />
        <img
          alt=""
          className="absolute top-[5.5px] left-[5.5px] size-[11px]"
          src={asset('instagram-lens.svg')}
        />
        <img
          alt=""
          className="absolute top-[4.35px] left-[16.18px] size-[1.46575px]"
          src={asset('instagram-dot.svg')}
        />
      </span>
    ),
    key: 'instagram',
    label: 'Instagram',
  },
]

export const RealEstateFooter: React.FC<Props> = ({
  className,
  columns = [],
  logoAlt,
  logoSrc,
  socialLinks,
}) => {
  const socials = socialIcons.filter(({ key }) => socialLinks?.[key])

  return (
    <footer
      className={cn(
        dmSans.className,
        'mx-auto flex w-full max-w-[1101px] flex-col gap-12 px-4 text-[15px] tracking-[-0.025em] text-white md:flex-row md:justify-between',
        className,
      )}
    >
      <div className="flex flex-col gap-[30px]">
        {logoSrc && (
          <img alt={logoAlt || ''} className="h-[34px] w-auto self-start" src={logoSrc} />
        )}
        {socials.length > 0 && (
          <ul className="flex h-[22px] items-center gap-10">
            {socials.map(({ icon, key, label }) => (
              <li className="flex" key={key}>
                <a aria-label={label} href={socialLinks?.[key] || undefined}>
                  {icon}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {columns.length > 0 && (
        <div className="grid grid-cols-2 gap-x-12 gap-y-10 md:grid-cols-3 md:gap-x-16 lg:grid-cols-[repeat(3,minmax(115px,auto))] lg:gap-x-[159px]">
          {columns.map(({ links, title }, index) => (
            // 0:75–0:79: 20px lines, 10px apart.
            <div className="flex flex-col gap-2.5 leading-5" key={index}>
              <span className="font-bold">{title}</span>
              {links.map(({ href, label }, linkIndex) => (
                <a className="text-[#979797]" href={href} key={linkIndex}>
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </footer>
  )
}
