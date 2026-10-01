import type { Block } from 'payload'

export const RealEstateFooter: Block = {
  slug: 'realEstateFooter',
  interfaceName: 'RealEstateFooterBlock',
  labels: {
    singular: 'Real Estate Footer',
    plural: 'Real Estate Footer',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'ロゴ画像',
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'SNSリンク',
      admin: {
        description: 'URLが空欄のアイコンは表示されません。',
      },
      fields: [
        { name: 'facebook', type: 'text', label: 'Facebook' },
        { name: 'twitter', type: 'text', label: 'Twitter' },
        { name: 'instagram', type: 'text', label: 'Instagram' },
      ],
    },
    {
      name: 'columns',
      type: 'array',
      label: 'リンク列',
      maxRows: 3,
      labels: {
        singular: 'リンク列',
        plural: 'リンク列',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: '列見出し',
        },
        {
          name: 'links',
          type: 'array',
          label: 'リンク',
          labels: {
            singular: 'リンク',
            plural: 'リンク',
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
      ],
    },
  ],
}
