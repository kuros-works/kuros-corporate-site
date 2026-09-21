import type { Metadata } from 'next/types'

import { ShowcaseArchive } from '@/components/ShowcaseArchive'
import { PageRange } from '@/components/PageRange'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const showcases = await payload.find({
    collection: 'showcases',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    sort: '-publishedDate',
    select: {
      title: true,
      slug: true,
      summary: true,
      thumbnail: true,
      usedCollection: true,
      publicUrl: true,
      relatedLinks: true,
      publishedDate: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h3>Showcases</h3>
          <p>これまでに手がけた制作実績です。</p>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collectionLabels={{ plural: 'Showcases', singular: 'Showcase' }}
          currentPage={showcases.page}
          limit={12}
          totalDocs={showcases.totalDocs}
        />
      </div>

      <ShowcaseArchive showcases={showcases.docs} />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Showcases | Kuro's Works`,
  }
}
