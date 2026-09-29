/* eslint-disable @next/next/no-img-element -- static decorative Figma assets */
import React from 'react'

import { dmSans, dmSansOpsz, inter } from '@/components/SaasLp/fonts'
import { cn } from '@/utilities/ui'

import { NewsletterForm } from './NewsletterForm'

// Figma: SaaS LP ポートフォリオ用 / node 9:1374 (footer)
// Full-bleed band: brand + socials, two link columns and the newsletter form,
// then the copyright / template credit / fictional-product notice.

const asset = (name: string) => `/figma/saas-footer/${name}`

type Link = { href?: string; label: string }

export type FooterColumn = { links: Link[]; title: string }

const defaultColumns: FooterColumn[] = [
  {
    links: [{ label: 'Service' }, { label: 'Resources' }, { label: 'About us' }],
    title: 'Company',
  },
  {
    links: [
      { label: 'Customer Support' },
      { label: 'Terms & Conditions' },
      { label: 'Privacy Policy' },
    ],
    title: 'Help',
  },
]

// Glyphs sit at the offsets used in Figma inside each 36px circle. Figma
// shows Facebook on the blue background; here that blue is the hover/focus
// state for every icon, and all four rest on gray.
const socials = [
  { h: 11.6129, icon: 'twitter.svg', key: 'twitter', label: 'Twitter', left: 11.62, top: 12.78, w: 14.3665 },
  { h: 15.6534, icon: 'facebook.svg', key: 'facebook', label: 'Facebook', left: 13.94, top: 10.46, w: 8.12903 },
  { h: 17.4202, icon: 'instagram.svg', key: 'instagram', label: 'Instagram', left: 9.29, top: 9.29, w: 17.4194 },
  { h: 16.2581, icon: 'github.svg', key: 'github', label: 'GitHub', left: 10.45, top: 9.29, w: 16.6626 },
] as const

export type SocialLinks = Partial<Record<(typeof socials)[number]['key'], string>>

type Props = {
  className?: string
  columns?: FooterColumn[]
  copyright?: string
  description?: string
  disclaimer?: string
  logoSrc?: string
  logoText?: string
  newsletterHeading?: string
  // Omitted: every icon links to "#". Given: only icons with a URL are shown.
  socialLinks?: SocialLinks
}

export const SaasFooter: React.FC<Props> = ({
  className,
  columns = defaultColumns,
  copyright = '© Copyright 2026, All Reserved by Ledgerly',
  description = 'Financial clarity for growing teams — track spend, automate approvals, and close the books faster.',
  disclaimer = 'This page is a fictional product demo built to showcase a Payload CMS implementation. It is not affiliated with any real company or service.',
  logoSrc = asset('logo.svg'),
  logoText = 'Ledgerly',
  newsletterHeading = 'Subscribe to Newsletter',
  socialLinks,
}) => {
  const visibleSocials = socials.flatMap((social) => {
    const href = socialLinks ? socialLinks[social.key] : '#'
    return href ? [{ ...social, href }] : []
  })


  return (
    <footer
      className={cn(
        dmSans.className,
        dmSansOpsz,
        'bg-[#0f0f0f] px-4 pt-12 md:pt-[98px]',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[1637px] flex-col items-center gap-10 py-10 md:gap-[46px] md:py-[47px]">
        <div aria-hidden className="relative h-0 w-full">
          <img
            alt=""
            className="absolute inset-x-0 -top-px h-px w-full max-w-none"
            height={1}
            src={asset('line.svg')}
            width={1637}
          />
        </div>

        <div className="grid w-full grid-cols-2 gap-x-6 gap-y-12 lg:flex lg:items-start lg:justify-between lg:gap-x-8">
          {/* brand */}
          <div className="col-span-2 flex min-w-0 flex-col gap-8 lg:max-w-[496px] lg:shrink">
            <a className="flex items-center gap-2" href="#">
              <img alt="" height={24} src={logoSrc} width={24} />
              <span
                className={cn(inter.className, 'text-2xl leading-[16.2px] font-semibold text-[#fbfbfb]')}
              >
                {logoText}
              </span>
            </a>
            <div className="flex flex-col gap-6">
              {description && (
                <p className="text-lg leading-[1.6] text-[#b9b3b3] opacity-90 md:text-xl">
                  {description}
                </p>
              )}
              <ul className="flex gap-3">
                {visibleSocials.map(({ h, href, icon, label, left, top, w }) => (
                  <li key={label}>
                    <a
                      aria-label={label}
                      className="group relative block size-9 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      href={href}
                    >
                      <img alt="" className="absolute inset-0" height={36} src={asset('social-bg.svg')} width={36} />
                      <img
                        alt=""
                        className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                        height={36}
                        src={asset('social-bg-active.svg')}
                        width={36}
                      />
                      <img
                        alt=""
                        className="absolute max-w-none"
                        height={h}
                        src={asset(icon)}
                        style={{ left, top }}
                        width={w}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {columns.map(({ links, title }) => (
            <nav aria-label={title} className="flex shrink-0 flex-col gap-8" key={title}>
              <p className="text-xl leading-none font-bold whitespace-nowrap text-[#fafafa]">{title}</p>
              <ul className="flex flex-col gap-6 text-base leading-none text-[#b9b3b3]">
                {links.map(({ href = '#', label }) => (
                  <li key={label}>
                    <a className="transition-colors hover:text-white" href={href}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* newsletter */}
          <div className="col-span-2 flex min-w-0 flex-col gap-8 lg:w-[487px] lg:shrink">
            <p className="text-xl leading-none font-bold text-[#fafafa]">{newsletterHeading}</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="flex w-full max-w-[600px] flex-col gap-1 text-center text-sm leading-5 tracking-[0.5px] text-[#fafafa]">
          {copyright && <p>{copyright}</p>}
          <p>
            Design based on{' '}
            <a
              className="underline underline-offset-2 transition-colors hover:text-white"
              href="https://www.figma.com/community/file/1360683197038417365/saas-landing-page-bento-ui"
              rel="noopener noreferrer"
              target="_blank"
            >
              &quot;SaaS Landing Page - Bento UI&quot; by sahin Alom (Figma Community)
            </a>
            , licensed under{' '}
            <a
              className="underline underline-offset-2 transition-colors hover:text-white"
              href="https://creativecommons.org/licenses/by/4.0/"
              rel="noopener noreferrer"
              target="_blank"
            >
              CC BY 4.0
            </a>
            . Modified.
          </p>
          {disclaimer && <p>{disclaimer}</p>}
        </div>
      </div>
    </footer>
  )
}
