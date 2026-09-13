import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import { formatPostDate } from '@/utilities/formatPostDate'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

// Posts are fetched from the `posts` collection via Payload's Local API.
export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    depth: 0,
    limit: 100,
    overrideAccess: false,
    sort: '-publishedDate',
    select: {
      title: true,
      slug: true,
      excerpt: true,
      publishedDate: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h3>Blog</h3>
          <p>技術的な検証や開発の記録です。</p>
        </div>
      </div>

      <div className="container">
        {posts.length === 0 ? (
          <div className="prose dark:prose-invert max-w-none">
            <p>まだ記事がありません。</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8">
            {posts.map((post) => (
              <div className="col-span-4 lg:col-span-6" key={post.slug}>
                <article className="h-full border border-border rounded-lg overflow-hidden bg-card transition-colors hover:bg-accent">
                  <Link className="block p-6 no-underline" href={`/blog/${post.slug}`}>
                    {post.publishedDate && (
                      <time className="text-sm text-muted-foreground" dateTime={post.publishedDate}>
                        {formatPostDate(post.publishedDate)}
                      </time>
                    )}
                    <h3 className="mt-2 text-lg font-medium">{post.title}</h3>
                    {post.excerpt && (
                      <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
                    )}
                  </Link>
                </article>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Blog | Kuro's Works`,
  }
}
