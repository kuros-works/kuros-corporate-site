import type { Metadata } from 'next'

import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import Script from 'next/script'
import React from 'react'

import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { cn } from '@/utilities/ui'
import { getServerSideURL } from '@/utilities/getURL'

import '../(frontend)/globals.css'

// Standalone root layout for one-off landing pages (e.g. /lp/[slug]).
// Deliberately does not render the corporate Header/Footer/AdminBar —
// landing pages are self-contained and not part of the corporate site nav.
export default async function LandingPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>{children}</Providers>
        <LandingPageAnalytics />
      </body>
    </html>
  )
}

// GA4 and the Meta Pixel, each loaded only when its ID is set. This root layout
// serves /lp/* only, so the corporate site ((frontend)) never gets these tags.
// IDs go through JSON.stringify so they can't break out of the inline script.
const LandingPageAnalytics = () => {
  const gaID = process.env.NEXT_PUBLIC_GA_ID?.trim()
  const pixelID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim()

  return (
    <>
      {gaID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaID)}`}
            strategy="afterInteractive"
          />
          <Script id="lp-gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', ${JSON.stringify(gaID)});`}
          </Script>
        </>
      )}

      {pixelID && (
        <Script id="lp-meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', ${JSON.stringify(pixelID)});
fbq('track', 'PageView');`}
        </Script>
      )}
    </>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
}
