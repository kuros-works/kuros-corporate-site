import type { Metadata } from 'next/types'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import ReactMarkdown from 'react-markdown'

import { Button } from '@/components/ui/button'
import { getAllPosts, getPostBySlug } from '@/utilities/posts'
import PageClient from './page.client'

export const dynamic = 'force-static'

const PLATFORM_LABELS: Record<string, string> = {
  qiita: 'Qiita',
  zenn: 'Zenn',
}

const platformLabel = (platform: string): string =>
  PLATFORM_LABELS[platform] ?? platform.charAt(0).toUpperCase() + platform.slice(1)

type Args = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }))
}

export default async function Post({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const { title, date, content, externalLinks } = post

  return (
    <article className="pt-24 pb-24">
      <PageClient />
      <div className="container max-w-3xl">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="mb-2">{title}</h1>
          <time className="text-sm text-muted-foreground" dateTime={date}>
            {date.replaceAll('-', '.')}
          </time>
        </div>

        <div className="prose dark:prose-invert max-w-none mt-8">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        {externalLinks && externalLinks.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {externalLinks.map((link) => (
              <Button asChild key={link.url} variant="outline">
                <Link href={link.url} rel="noopener noreferrer" target="_blank">
                  {platformLabel(link.platform)}で読む
                </Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const post = getPostBySlug(slug)

  if (!post) {
    return {}
  }

  return {
    title: `${post.title} | Kuro's Works`,
    description: post.summary || undefined,
  }
}
