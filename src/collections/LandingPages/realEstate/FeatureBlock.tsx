import React from 'react'

import type { FeatureBlock as FeatureBlockProps } from '@/payload-types'

import { RealEstateFeature } from '@/components/RealEstateFeature'
import RichText from '@/components/RichText'
import { mediaSrc } from '../mediaSrc'

// The shared Feature block's data, drawn with the real-estate design. Swapped in
// by RenderLandingPageBlocks only when the LP's theme is realEstate.
export const RealEstateFeatureBlock: React.FC<FeatureBlockProps> = ({
  heading,
  body,
  image,
  imagePosition,
}) => (
  <RealEstateFeature
    body={
      body ? (
        // No prose: its dark:prose-invert would turn the text white on this
        // light-only LP when the viewer is in dark mode.
        <RichText className="[&>*+*]:mt-4" data={body} enableGutter={false} enableProse={false} />
      ) : null
    }
    heading={heading}
    imageAlt={image && typeof image === 'object' ? image.alt : null}
    imageSrc={mediaSrc(image)}
    variant={imagePosition === 'right' ? 'imageRight' : 'imageLeft'}
  />
)
