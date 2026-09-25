import React, { Fragment } from 'react'

import type { LandingPage } from '@/payload-types'

import { FeatureBlock } from '@/blocks/Feature/Component'
import { PricingBlock } from '@/blocks/Pricing/Component'
import { TestimonialBlock } from '@/blocks/Testimonial/Component'

const blockComponents = {
  feature: FeatureBlock,
  pricing: PricingBlock,
  testimonial: TestimonialBlock,
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
            {/* @ts-expect-error blockType narrows the lookup, but TS can't correlate it with the props union */}
            <Block {...block} />
          </div>
        )
      })}
    </Fragment>
  )
}
