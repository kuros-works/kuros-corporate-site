import type { Media } from '@/payload-types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

// URL of a populated upload field, or '' when it's unset/unpopulated.
export const mediaSrc = (resource: number | Media | null | undefined) =>
  resource && typeof resource === 'object' ? getMediaUrl(resource.url, resource.updatedAt) : ''
