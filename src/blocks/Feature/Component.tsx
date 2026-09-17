import React from 'react'

import type { FeatureBlock as FeatureBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const FeatureBlock: React.FC<FeatureBlockProps> = ({ heading, body, image, imagePosition }) => {
  const imageOnRight = imagePosition === 'right'

  return (
    <div className="container">
      <div
        className={cn(
          'grid items-center gap-10 md:grid-cols-2 md:gap-16',
          imageOnRight && 'md:[&>*:first-child]:order-2',
        )}
      >
        <div>
          {image && typeof image === 'object' && (
            <Media
              imgClassName="w-full rounded-2xl border border-border object-cover"
              resource={image}
            />
          )}
        </div>
        <div>
          {heading && <h3 className="text-2xl font-bold md:text-3xl">{heading}</h3>}
          {body && <RichText className="mt-4" data={body} enableGutter={false} />}
        </div>
      </div>
    </div>
  )
}
