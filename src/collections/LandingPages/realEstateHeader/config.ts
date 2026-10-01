import type { Block } from 'payload'

export const RealEstateHeader: Block = {
  slug: 'realEstateHeader',
  interfaceName: 'RealEstateHeaderBlock',
  labels: {
    singular: 'Real Estate Header',
    plural: 'Real Estate Header',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'ロゴ画像',
    },
    {
      name: 'nav',
      type: 'array',
      label: 'ナビゲーション',
      labels: {
        singular: 'ナビ項目',
        plural: 'ナビ項目',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'ラベル',
        },
        {
          name: 'href',
          type: 'text',
          label: 'リンク先',
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'CTAボタン',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          defaultValue: 'Work with us',
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
