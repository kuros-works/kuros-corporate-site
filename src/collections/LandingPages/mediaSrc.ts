import type { Media } from '@/payload-types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

type MediaSizeName = keyof NonNullable<Media['sizes']>

// URL of a populated upload field, or '' when it's unset/unpopulated.
// Pass `size` (one name, or several in order of preference) to get a resized
// variant. A size whose url is null/missing (e.g. xlarge when the original is
// narrower than 1920px, or files uploaded before the size existed) is skipped,
// and the original file is the final fallback.
export const mediaSrc = (
  resource: number | Media | null | undefined,
  size?: MediaSizeName | MediaSizeName[],
) => {
  if (!resource || typeof resource !== 'object') return ''

  const sizeNames = size === undefined ? [] : Array.isArray(size) ? size : [size]
  const sizedUrl = sizeNames.map((name) => resource.sizes?.[name]?.url).find(Boolean)

  return getMediaUrl(sizedUrl || resource.url, resource.updatedAt)
}

// Width-based variants that keep the original's aspect ratio. square and og
// are cropped and thumbnail is tiny, so none of them belong in a srcset.
const SRCSET_SIZE_NAMES = ['small', 'medium', 'large', 'xlarge'] as const

// `srcset` string for a populated upload field, or '' when it has nothing to
// offer. A size is skipped when its url/width is null, or when its file is not
// smaller than the original (re-encoded PNGs can come out heavier). The
// original file is always the widest candidate.
export const mediaSrcSet = (resource: number | Media | null | undefined) => {
  if (!resource || typeof resource !== 'object' || !resource.url || !resource.width) return ''

  const { filesize: originalSize, updatedAt, url: originalUrl, width: originalWidth } = resource
  const candidates = SRCSET_SIZE_NAMES.flatMap((name) => {
    const size = resource.sizes?.[name]
    if (!size?.url || !size.width || size.width >= originalWidth) return []
    if (originalSize && size.filesize && size.filesize >= originalSize) return []
    return [{ url: size.url, width: size.width }]
  })
  if (candidates.length === 0) return ''

  return [...candidates, { url: originalUrl, width: originalWidth }]
    .sort((a, b) => a.width - b.width)
    .map(({ url, width }) => `${getMediaUrl(url, updatedAt)} ${width}w`)
    .join(', ')
}
