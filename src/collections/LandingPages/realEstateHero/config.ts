import type { Block } from 'payload'

export const RealEstateHero: Block = {
  slug: 'realEstateHero',
  interfaceName: 'RealEstateHeroBlock',
  labels: {
    singular: 'Real Estate Hero',
    plural: 'Real Estate Hero',
  },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: '背景画像',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Beautiful homes made for you',
      label: '見出し',
    },
    {
      name: 'lead',
      type: 'textarea',
      label: 'リード文',
      admin: {
        description: '任意。空欄なら非表示。',
      },
    },
    {
      name: 'listingsLink',
      type: 'group',
      label: '物件一覧へのリンク',
      admin: {
        description: 'ヒーロー下端の白いバーに表示されます。',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          defaultValue: 'See all listings',
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
