/* eslint-disable @next/next/no-img-element -- static Figma assets */
import React from 'react'

import { rubik } from '@/components/TravelLp/fonts'
import { cn } from '@/utilities/ui'

// Figma: Travellian / Footer (1920px: 9:702, 768px: 36:731, 320px: 38:1117)
// Dark band with the logo and copyright, the link columns, the contact info
// and the social icons: one row from xl, stacked below that.
// The 240px top padding from xl leaves room for the Newsletter card, which
// overlaps this footer's start in the Figma (9:693).
// The Figma logo is an image; this LP uses a text logo instead.
// The tablet frame's 32px gutter is the other sections' 20px here.
// Links without an href, the contact info and the social icons are link-less dummies.
// The credit line and the demo notice at the bottom are not in the Figma.
// Desktop values shrink with the viewport between xl and 1920px.

const asset = (name: string) => `/figma/travel/${name}`

const socialIcons = [
  { file: 'social-facebook.svg', label: 'Facebook' },
  { file: 'social-pinterest.svg', label: 'Pinterest' },
  { file: 'social-instagram.svg', label: 'Instagram' },
  { file: 'social-twitter.svg', label: 'Twitter' },
]

const columnTitle = 'text-2xl leading-[normal] font-medium xl:text-[clamp(20px,1.25vw,24px)]'
const columnList =
  'flex flex-col gap-3 text-lg leading-[normal] xl:text-[clamp(15px,0.938vw,18px)]'
const creditLink = 'underline underline-offset-2 transition-colors hover:text-white'

export type TravelFooterColumn = {
  links: { href?: string; label: string }[]
  title: string
}

type Props = {
  className?: string
  columns?: TravelFooterColumn[]
  contact?: {
    address?: string | null
    email?: string | null
    phone?: string | null
    title?: string | null
  }
  copyright?: string | null
  logoText: string
  socialTitle?: string | null
}

export const TravelFooter: React.FC<Props> = ({
  className,
  columns = [],
  contact,
  copyright,
  logoText,
  socialTitle,
}) => {
  const contactLines = [contact?.phone, contact?.email, contact?.address].filter(
    (line): line is string => Boolean(line),
  )

  return (
    <footer
      // overflow-x-clip: nothing in here may widen the page.
      className={cn(
        rubik.className,
        'overflow-x-clip bg-[#172432] px-4 py-20 text-white md:px-5 md:pt-[100px] md:pb-[140px] xl:px-[min(9.479vw,182px)] xl:pt-[min(12.5vw,240px)] xl:pb-[min(7.292vw,140px)]',
        className,
      )}
    >
      <div className="flex flex-col gap-[60px] xl:flex-row xl:items-start xl:justify-between xl:gap-[clamp(16px,1.667vw,32px)]">
        <div className="flex min-w-0 flex-col gap-4">
          <p className="text-[28px] leading-none font-medium">{logoText}</p>
          {copyright && (
            <p className="text-sm leading-[normal] xl:text-[clamp(12px,0.729vw,14px)]">
              {copyright}
            </p>
          )}
        </div>

        {columns.map(({ links, title }, index) => (
          <nav aria-label={title} className="flex min-w-0 flex-col gap-4 xl:shrink-0" key={index}>
            <h2 className={columnTitle}>{title}</h2>
            <ul className={columnList}>
              {links.map(({ href, label }, linkIndex) => (
                <li key={linkIndex}>
                  {href ? (
                    <a className="transition-opacity hover:opacity-70" href={href}>
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {(contact?.title || contactLines.length > 0) && (
          <div className="flex min-w-0 flex-col gap-4">
            {contact?.title && <h2 className={columnTitle}>{contact.title}</h2>}
            <ul className={cn(columnList, '[overflow-wrap:anywhere]')}>
              {contactLines.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex min-w-0 flex-col gap-4 xl:shrink-0">
          {socialTitle && <h2 className={columnTitle}>{socialTitle}</h2>}
          <ul className="flex items-center gap-6">
            {socialIcons.map(({ file, label }) => (
              // Every icon is 32px; the Figma gives Pinterest a 40px frame.
              <li
                className={cn(
                  file === 'social-pinterest.svg' && 'flex size-10 items-center justify-center',
                )}
                key={file}
              >
                <img alt={label} height={32} src={asset(file)} width={32} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-[60px] flex flex-col gap-2 text-sm leading-[normal] text-white/70">
        <p>
          Design based on{' '}
          <a
            className={creditLink}
            href="https://www.figma.com/community/file/1166671197078391550/travellian-travel-agency-landing-page"
            rel="noopener noreferrer"
            target="_blank"
          >
            &quot;Travellian - Travel Agency Landing Page&quot;
          </a>{' '}
          by Al Razi Siam (Figma Community), licensed under{' '}
          <a
            className={creditLink}
            href="https://creativecommons.org/licenses/by/4.0/"
            rel="noopener noreferrer"
            target="_blank"
          >
            CC BY 4.0
          </a>
          . Modified.
        </p>
        <p>This is a demo site. No bookings are accepted.</p>
      </div>
    </footer>
  )
}
