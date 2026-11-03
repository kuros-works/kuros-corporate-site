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
