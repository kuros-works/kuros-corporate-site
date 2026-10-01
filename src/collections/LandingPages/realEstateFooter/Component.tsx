/* eslint-disable @next/next/no-img-element -- CMS media URL, sized by the frame */
import React from 'react'

import type { RealEstateFooterBlock as RealEstateFooterBlockProps } from '@/payload-types'

import { dmSans } from '@/components/SaasLp/fonts'
import { cn } from '@/utilities/ui'
import { mediaSrc } from '../mediaSrc'

// 構造優先の仮スタイル — SNSアイコンとFigmaに合わせた見た目は後続PRで入れる。
export const RealEstateFooterBlock: React.FC<RealEstateFooterBlockProps> = ({
  columns,
  logo,
  socialLinks,
}) => {
  const logoSrc = mediaSrc(logo)
  const socials = [
    { href: socialLinks?.facebook, label: 'Facebook' },
    { href: socialLinks?.twitter, label: 'Twitter' },
    { href: socialLinks?.instagram, label: 'Instagram' },
  ].filter(({ href }) => href)

  return (
    <footer className={cn(dmSans.className, 'bg-black py-16 text-white')}>
      <div className="container flex flex-col gap-12 md:flex-row md:justify-between">
        <div className="flex flex-col gap-6">
          {logoSrc && <img alt="" className="h-[34px] w-auto self-start" src={logoSrc} />}
          {socials.length > 0 && (
            <ul className="flex gap-6 text-[15px]">
              {socials.map(({ href, label }) => (
                <li key={label}>
                  <a href={href || undefined}>{label}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
        {columns && columns.length > 0 && (
          <div className="grid grid-cols-2 gap-12 md:grid-cols-3 md:gap-24">
            {columns.map(({ links, title }, index) => (
              <div className="flex flex-col gap-2.5 text-[15px]" key={index}>
                <span className="font-bold">{title}</span>
                {(links ?? []).map(({ href, label }, linkIndex) => (
                  <a className="text-[#979797]" href={href || undefined} key={linkIndex}>
                    {label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </footer>
  )
}
