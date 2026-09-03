import type { Metadata } from 'next/types'

import { WorkArchive } from '@/components/WorkArchive'
import { PageRange } from '@/components/PageRange'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const works = await payload.find({
    collection: 'works',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    sort: 'order',
    select: {
      title: true,
      slug: true,
      summary: true,
      category: true,
      techStack: true,
      coverImage: true,
      externalLink: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h3>Works</h3>
          <p>これまでに手がけた実績です。</p>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collectionLabels={{ plural: 'Works', singular: 'Work' }}
          currentPage={works.page}
          limit={12}
          totalDocs={works.totalDocs}
        />
      </div>

      <WorkArchive works={works.docs} />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Works | Kuro's Works`,
  }
}
