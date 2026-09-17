import React, { Fragment } from 'react'

import type { LandingPage } from '@/payload-types'

import { FeatureBlock } from '@/blocks/Feature/Component'

const blockComponents = {
  feature: FeatureBlock,
}

export const RenderLandingPageBlocks: React.FC<{
  blocks: NonNullable<LandingPage['layout']>
}> = ({ blocks }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block
        const Block = blockComponents[blockType as keyof typeof blockComponents]

        if (!Block) return null

        return (
          <div className="my-16" key={index}>
            <Block {...block} />
          </div>
        )
      })}
    </Fragment>
  )
}
