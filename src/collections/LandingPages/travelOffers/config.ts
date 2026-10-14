import type { Block } from 'payload'

export const TravelOffers: Block = {
  slug: 'travelOffers',
  dbName: 'lp_tv_offers',
  interfaceName: 'TravelOffersBlock',
  labels: {
    singular: 'Travel Offers',
    plural: 'Travel Offers',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Special Offer',
      label: '見出し',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Check out our special offer and discounts',
      label: '説明文',
      admin: {
        description: '任意。空欄なら非表示。',
      },
    },
    {
      name: 'pricePrefix',
      type: 'text',
      defaultValue: 'From',
      label: '価格の前の文言',
    },
    {
      name: 'detailsLabel',
      type: 'text',
      defaultValue: 'Details',
      label: '詳細ボタンの文言',
      admin: {
        description: 'リンクなしのダミーです。空欄なら非表示。',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'オファー',
      labels: {
        singular: 'オファー',
        plural: 'オファー',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: '画像',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'タイトル',
        },
        {
          name: 'description',
          type: 'textarea',
          label: '説明文',
        },
        {
          name: 'price',
          type: 'text',
          label: '価格',
          admin: {
            description: '例: €500',
          },
        },
      ],
    },
  ],
}
