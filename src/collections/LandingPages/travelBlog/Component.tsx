import React from 'react'

import type { TravelBlogBlock as TravelBlogBlockProps } from '@/payload-types'

import { TravelBlog } from '@/components/TravelLp/Blog'
import { mediaSrc } from '../mediaSrc'

export const TravelBlogBlock: React.FC<TravelBlogBlockProps> = ({
  description,
  heading,
  image,
  postBody,
  postTitle,
  readMoreLabel,
}) => (
  <TravelBlog
    description={description}
    heading={heading}
    imageAlt={image && typeof image === 'object' ? image.alt : null}
    imageSrc={mediaSrc(image)}
    postBody={postBody}
    postTitle={postTitle}
    readMoreLabel={readMoreLabel}
  />
)
