'use client'
import { cn } from '@/utilities/ui'
import React from 'react'

import type { Work } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardWorkData = Pick<
  Work,
  'slug' | 'title' | 'summary' | 'category' | 'techStack' | 'coverImage' | 'externalLink'
>

const categoryLabelMap: Record<string, string> = {
  'business-system': '業務システム（基幹・受注管理）',
  'cms-marketing': 'CMS・マーケティング基盤',
}

export const WorkCard: React.FC<{
  className?: string
  doc?: CardWorkData
}> = (props) => {
  const { className, doc } = props

  const { title, summary, category, techStack, coverImage, externalLink } = doc || {}

  const categoryLabel = category ? categoryLabelMap[category] || category : undefined

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
    >
      <div className="relative w-full aspect-video bg-muted">
        {!coverImage && (
          <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
            No image
          </div>
        )}
        {coverImage && typeof coverImage !== 'string' && (
          <Media resource={coverImage} size="33vw" fill imgClassName="object-cover" />
        )}
      </div>
      <div className="p-4">
        {categoryLabel && (
          <div className="uppercase text-sm mb-4 text-muted-foreground">{categoryLabel}</div>
        )}
        {title && (
          <div className="prose dark:prose-invert">
            <h3>
              {externalLink ? (
                <a
                  className="not-prose"
                  href={externalLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {title}
                </a>
              ) : (
                <span className="not-prose">{title}</span>
              )}
            </h3>
          </div>
        )}
        {summary && <p className="mt-2 text-sm">{summary}</p>}
        {techStack && Array.isArray(techStack) && techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
              >
                {tech.name}
              </span>
            ))}
          </div>
        )}
        {externalLink && (
          <p className="mt-3 text-sm text-black">
            Kuro&apos;s Order Management — 受注管理システムをクリックするとGitHubリポジトリに移動します
          </p>
        )}
      </div>
    </article>
  )
}
