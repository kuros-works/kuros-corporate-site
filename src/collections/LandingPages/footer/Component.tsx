import React from 'react'

import type { LandingPage } from '@/payload-types'

export const LandingPageFooter: React.FC<NonNullable<LandingPage['footer']>> = ({
  address,
  tel,
  email,
  externalLinks,
  disclaimer,
}) => {
  return (
    <footer className="border-border bg-card border-t">
      <div className="container flex flex-col gap-6 py-12 text-sm">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div className="flex flex-col gap-1">
            {address && <p>{address}</p>}
            {tel && <p>TEL: {tel}</p>}
            {email && <p>{email}</p>}
          </div>

          {Array.isArray(externalLinks) && externalLinks.length > 0 && (
            <ul className="flex flex-col gap-1 md:items-end">
              {externalLinks.map((item, i) => (
                <li key={i}>
                  <a
                    className="underline underline-offset-4 hover:no-underline"
                    href={item.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {disclaimer && (
          <p className="text-muted-foreground whitespace-pre-line">{disclaimer}</p>
        )}
      </div>
    </footer>
  )
}
