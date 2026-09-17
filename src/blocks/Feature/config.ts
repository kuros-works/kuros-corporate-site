import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Feature: Block = {
  slug: 'feature',
  interfaceName: 'FeatureBlock',
  labels: {
    singular: '特徴セクション',
    plural: '特徴セクション',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: '見出し',
    },
    {
      name: 'body',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: '画像',
    },
    {
      name: 'imagePosition',
      type: 'select',
      label: '画像位置',
      defaultValue: 'left',
      options: [
        { label: '左', value: 'left' },
        { label: '右', value: 'right' },
      ],
    },
  ],
}
