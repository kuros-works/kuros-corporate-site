import type { Metadata } from 'next/types'

import Link from 'next/link'
import React from 'react'

import { getAllPosts } from '@/utilities/posts'
import PageClient from './page.client'

export const dynamic = 'force-static'

// Posts are read from `content/posts/*.md` at build time (see src/utilities/posts.ts).
export default function Page() {
  const posts = getAllPosts()

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
                    <time className="text-sm text-muted-foreground" dateTime={post.date}>
                      {post.date.replaceAll('-', '.')}
                    </time>
                    <h3 className="mt-2 text-lg font-medium">{post.title}</h3>
                    {post.summary && (
                      <p className="mt-2 text-sm text-muted-foreground">{post.summary}</p>
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
