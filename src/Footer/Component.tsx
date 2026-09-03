import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const companyName = footerData?.companyName
  const address = footerData?.address
  const email = footerData?.email

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <div className="flex flex-col gap-3 md:items-end">
            <nav className="flex flex-col md:flex-row gap-4">
              {navItems.map(({ link }, i) => {
                return <CMSLink className="text-white" key={i} {...link} />
              })}
            </nav>
            {(companyName || address || email) && (
              <div className="flex flex-col gap-0.5 md:text-right">
                {companyName && <p className="font-bold">{companyName}</p>}
                {address && <p className="text-xs text-white">{address}</p>}
                {email && (
                  <p className="text-xs text-white">
                    <a href={`mailto:${email}`}>
                      {email}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container pb-8">
        <p className="text-xs text-white/50">
          &copy; {new Date().getFullYear()} Kuro&apos;s Works. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
