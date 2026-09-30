import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Property } from '../../../payload-types'

// 物件はどのLPから参照されているか追わず、/lp/[slug] 全体を再検証する。
// 再生成は次回アクセス時なので、LPの数が少ないうちはこれで十分。
export const revalidateProperty: CollectionAfterChangeHook<Property> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating landing pages for property: ${doc.slug}`)
    revalidatePath('/lp/[slug]', 'page')
  }

  return doc
}

export const revalidatePropertyDelete: CollectionAfterDeleteHook<Property> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath('/lp/[slug]', 'page')
  }

  return doc
}
