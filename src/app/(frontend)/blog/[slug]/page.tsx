import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React, { cache } from 'react'

import RichText from '@/components/RichText'
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
    collection: 'posts',
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

const queryPostBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'posts',
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

export default async function Post({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const post = await queryPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const { title, publishedDate, content } = post

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

        {content && <RichText className="mt-8" data={content} enableGutter={false} />}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const post = await queryPostBySlug(slug)

  if (!post) {
    return {}
  }

  return {
    title: `${post.title} | Kuro's Works`,
    description: post.excerpt || undefined,
  }
}
