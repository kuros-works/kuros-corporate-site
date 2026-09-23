import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React, { cache } from 'react'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { formatPostDate } from '@/utilities/formatPostDate'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'showcases',
    depth: 0,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return docs.map(({ slug }) => ({ slug }))
}

const queryShowcaseBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'showcases',
    depth: 0,
    limit: 1,
    overrideAccess: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return docs[0] ?? null
})

export default async function Showcase({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const showcase = await queryShowcaseBySlug(slug)

  if (!showcase) {
    notFound()
  }

  const { title, publishedDate, content, publicUrl } = showcase

  return (
    <article className="pt-24 pb-24">
      <PageClient />
      <div className="container max-w-3xl">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="mb-2">{title}</h1>
          {publishedDate && (
            <time className="text-sm text-muted-foreground" dateTime={publishedDate}>
              {formatPostDate(publishedDate)}
            </time>
          )}
        </div>

        {publicUrl && (
          <Button asChild className="mt-6" variant="outline">
            <a href={publicUrl} rel="noopener noreferrer" target="_blank">
              実際のサイトを見る →
            </a>
          </Button>
        )}

        {content && <RichText className="mt-8" data={content} enableGutter={false} />}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const showcase = await queryShowcaseBySlug(slug)

  if (!showcase) {
    return {}
  }

  return {
    title: `${showcase.title} | Kuro's Works`,
    description: showcase.summary || undefined,
  }
}
