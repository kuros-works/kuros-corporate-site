'use client'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Showcase } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardShowcaseData = Pick<
  Showcase,
  'slug' | 'title' | 'summary' | 'thumbnail' | 'usedCollection' | 'publicUrl' | 'relatedLinks' | 'publishedDate'
>

export const ShowcaseCard: React.FC<{
  className?: string
  doc?: CardShowcaseData
}> = (props) => {
  const { className, doc } = props

  const { slug, title, summary, thumbnail } = doc || {}

  const content = (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
    >
      <div className="relative w-full aspect-video bg-muted">
        {!thumbnail && (
          <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
            No image
          </div>
        )}
        {thumbnail && typeof thumbnail !== 'number' && (
          <Media resource={thumbnail} size="33vw" fill imgClassName="object-cover" />
        )}
      </div>
      <div className="p-4">
        {title && (
          <div className="prose dark:prose-invert">
            <h3 className="not-prose">{title}</h3>
          </div>
        )}
        {summary && <p className="mt-2 text-sm">{summary}</p>}
      </div>
    </article>
  )

  if (slug) {
    return (
      <Link className="block h-full" href={`/showcases/${slug}`}>
        {content}
      </Link>
    )
  }

  return content
}
