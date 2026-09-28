import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React, { cache } from 'react'

import { RenderLandingPageBlocks } from '@/collections/LandingPages/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { cn } from '@/utilities/ui'

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

  const { header, hero, layout, closingCta, footer } = landingPage

  // Ledgerly blocks assume the static /lp/ledgerly <main>'s dark background and
  // 16px gutter (SaasTestimonials' -mx-4 track cancels it), so mirror them here.
  const isLedgerly = hero?.[0]?.blockType === 'ledgerlyHero'

  return (
    <article>
      {draft && <LivePreviewListener />}

      <RenderLandingPageBlocks blocks={header || []} />

      <RenderLandingPageBlocks blocks={hero || []} />

      <div className={cn('pt-16 pb-16', isLedgerly && 'bg-[#1d1c20] px-4')}>
        <RenderLandingPageBlocks blocks={layout || []} spaced />
      </div>

      <RenderLandingPageBlocks blocks={closingCta || []} />

      <RenderLandingPageBlocks blocks={footer || []} />
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
