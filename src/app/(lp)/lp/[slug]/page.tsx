import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React, { cache } from 'react'

import { LandingPageClosingCta } from '@/collections/LandingPages/closingCta/Component'
import { LandingPageFooter } from '@/collections/LandingPages/footer/Component'
import { LandingPageHero } from '@/collections/LandingPages/hero/Component'
import { RenderLandingPageBlocks } from '@/collections/LandingPages/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const landingPages = await payload.find({
    collection: 'landing-pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return landingPages.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  const landingPage = await queryLandingPageBySlug({ slug: decodedSlug })

  if (!landingPage) {
    notFound()
  }

  const { hero, layout, closingCta, footer } = landingPage

  return (
    <article>
      {draft && <LivePreviewListener />}

      {hero && <LandingPageHero {...hero} />}

      <div className="pt-16 pb-16">
        <RenderLandingPageBlocks blocks={layout || []} />
      </div>

      {closingCta && <LandingPageClosingCta {...closingCta} />}

      {footer && <LandingPageFooter {...footer} />}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const landingPage = await queryLandingPageBySlug({ slug: decodedSlug })

  return {
    title: landingPage?.title || 'Landing Page',
  }
}

const queryLandingPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'landing-pages',
    depth: 2,
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
