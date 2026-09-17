import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { LandingPage } from '../../../payload-types'

export const revalidateLandingPage: CollectionAfterChangeHook<LandingPage> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/lp/${doc.slug}`

      payload.logger.info(`Revalidating landing page at path: ${path}`)

      revalidatePath(path)
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/lp/${previousDoc.slug}`

      payload.logger.info(`Revalidating old landing page at path: ${oldPath}`)

      revalidatePath(oldPath)
    }
  }

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<LandingPage> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath(`/lp/${doc?.slug}`)
  }

  return doc
}
