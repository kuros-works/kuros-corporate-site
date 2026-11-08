import type { Metadata } from 'next'

import type { Media, Page, Work, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

// Vercel Blob URLs are already absolute (https://...); only local paths need the server URL.
const toAbsoluteURL = (url: string, serverUrl: string) =>
  /^https?:\/\//.test(url) ? url : serverUrl + url

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url
    const imageUrl = ogUrl || image.url

    if (imageUrl) url = toAbsoluteURL(imageUrl, serverUrl)
  }

  return url
}

// 'home' (or no slug) is the site root; everything else is '/' + slug.
const getPagePath = (slug?: string | null) => (!slug || slug === 'home' ? '/' : `/${slug}`)

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Work> | null
  /** Path of the page (e.g. '/works/foo'). Defaults to one derived from doc.slug (Pages). */
  path?: string
}): Promise<Metadata> => {
  const { doc } = args
  const path = args.path ?? getPagePath(doc?.slug)

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title ? doc?.meta?.title + ` | Kuro's Works` : `Kuro's Works`

  return {
    alternates: {
      canonical: path,
    },
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: path,
    }),
    title,
  }
}
