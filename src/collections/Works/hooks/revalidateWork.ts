import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Work } from '../../../payload-types'

export const revalidateWork: CollectionAfterChangeHook<Work> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published' || previousDoc?._status === 'published') {
      payload.logger.info(`Revalidating works list`)
      revalidatePath('/works')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Work> = ({ req: { context }, doc }) => {
  if (!context.disableRevalidate) {
    revalidatePath('/works')
  }

  return doc
}
