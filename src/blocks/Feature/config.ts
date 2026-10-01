import type { Block, UploadFieldSingleValidation } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { upload } from 'payload/shared'

// Required unless the section is 暗背景・中央寄せ, which may have no image.
// Kept as validation instead of `required` so the DB column stays as it is.
const validateImage: UploadFieldSingleValidation = (value, options) => {
  const { imagePosition } = (options.siblingData ?? {}) as { imagePosition?: string | null }

  if (!value && imagePosition !== 'darkCentered') {
    return '画像を選択してください（「暗背景・中央寄せ」以外では必須です）'
  }

  return upload(value, options)
}

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
      label: '画像',
      validate: validateImage,
      admin: {
        description: '画像位置が「左」「右」のときは必須。「暗背景・中央寄せ」では任意です。',
      },
    },
    {
      name: 'imagePosition',
      type: 'select',
      label: '画像位置',
      defaultValue: 'left',
      options: [
        { label: '左', value: 'left' },
        { label: '右', value: 'right' },
        { label: '暗背景・中央寄せ', value: 'darkCentered' },
      ],
      admin: {
        description: '「暗背景・中央寄せ」は不動産LP用。他のLPでは「左」と同じ表示になります。',
      },
    },
    {
      name: 'button',
      type: 'group',
      label: 'ボタン',
      admin: {
        description: '任意。文言が空欄なら非表示。',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: '文言',
        },
        {
          name: 'href',
          type: 'text',
          label: 'リンク先',
        },
      ],
    },
  ],
}
