'use client'

/* eslint-disable @next/next/no-img-element -- static decorative Figma assets */
import React from 'react'

import { rubik } from '@/components/TravelLp/fonts'
import { cn } from '@/utilities/ui'

// Figma: Travellian / Header (1920px: 3:58, 768px: 36:444, 320px: 49:225)
// Transparent row laid over the hero photo: logo, centered nav and
// Login / Sign up from xl up; logo and a hamburger below that.
// Light text only — the LP page places it on the hero (or a #172432 strip).
// The Figma logo is an image; this LP uses a text logo instead.
// The opened menu is not in the Figma — it lists the same items vertically.
// Login / Sign up are link-less dummies.

const asset = (name: string) => `/figma/travel/${name}`

// 182px at 1920px, shrinking with the viewport down to xl.
const desktopGutter = 'xl:px-[min(9.479vw,182px)]'

const signUpButton = 'rounded-[12px] bg-[#ff7757] px-8 py-5 leading-[normal] text-white'

export type TravelNavItem = {
  href?: string
  label: string
}

type Props = {
  className?: string
  loginLabel?: string | null
  logoText: string
  nav?: TravelNavItem[]
  signUpLabel?: string | null
}

export const TravelHeader: React.FC<Props> = ({
  className,
  loginLabel,
  logoText,
  nav = [],
  signUpLabel,
}) => {
  const [open, setOpen] = React.useState(false)
  const menuId = React.useId()
  const hasMenu = nav.length > 0 || Boolean(loginLabel) || Boolean(signUpLabel)

  return (
    <header className={cn(rubik.className, 'text-white', className)}>
      <div
        className={cn(
          'flex items-center justify-between gap-6 px-8 py-6 md:px-5 md:py-8',
          desktopGutter,
        )}
      >
        <p className="text-xl leading-none font-medium whitespace-nowrap md:text-[28px]">
          {logoText}
        </p>

        {nav.length > 0 && (
          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-8 text-lg leading-[normal] min-[1920px]:text-xl">
              {nav.map(({ href, label }, index) => (
                <li className="relative" key={index}>
                  <a
                    className={cn('transition-opacity hover:opacity-70', index === 0 && 'font-medium')}
                    href={href}
                  >
                    {label}
                  </a>
                  {index === 0 && (
                    <img
                      alt=""
                      className="absolute top-full left-0 mt-px h-[3px] w-full"
                      height={3}
                      src={asset('underline.svg')}
                      width={57}
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}

        {(loginLabel || signUpLabel) && (
          <div className="hidden shrink-0 items-center gap-9 text-lg leading-[normal] xl:flex min-[1920px]:text-xl">
            {loginLabel && <span>{loginLabel}</span>}
            {signUpLabel && <span className={signUpButton}>{signUpLabel}</span>}
          </div>
        )}

        {hasMenu && (
          <button
            aria-controls={menuId}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="size-[50px] shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white xl:hidden"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            <img alt="" height={50} src={asset('hamburger.svg')} width={50} />
          </button>
        )}
      </div>

      {hasMenu && (
        <div
          className={cn('bg-[#172432] px-8 pt-2 pb-8 md:px-5 xl:hidden', !open && 'hidden')}
          id={menuId}
        >
          {nav.length > 0 && (
            <nav aria-label="Main">
              <ul className="flex flex-col text-xl leading-[normal]">
                {nav.map(({ href, label }, index) => (
                  <li key={index}>
                    <a className="block py-3" href={href} onClick={() => setOpen(false)}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          {(loginLabel || signUpLabel) && (
            <div className="mt-4 flex flex-col items-start gap-5 text-xl leading-[normal]">
              {loginLabel && <span>{loginLabel}</span>}
              {signUpLabel && <span className={signUpButton}>{signUpLabel}</span>}
            </div>
          )}
        </div>
      )}
    </header>
  )
}
