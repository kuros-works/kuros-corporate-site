import type { Block } from 'payload'

export const TravelTripPlans: Block = {
  slug: 'travelTripPlans',
  dbName: 'lp_tv_plans',
  interfaceName: 'TravelTripPlansBlock',
  labels: {
    singular: 'Travel Trip Plans',
    plural: 'Travel Trip Plans',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Trip Planners',
      label: '見出し',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        '20 years from now you will be more disappointed by the things that you didn’t do. Stop regretting and start travelling, start throwing off the bowlines.',
      label: '説明文',
      admin: {
        description: '任意。空欄なら非表示。',
      },
    },
    {
      name: 'buttonLabel',
      type: 'text',
      defaultValue: 'View all trip plans',
      label: 'ボタンの文言',
      admin: {
        description: 'リンクなしのダミーです。空欄なら非表示。',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'プラン',
      labels: {
        singular: 'プラン',
        plural: 'プラン',
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
          name: 'category',
          type: 'text',
          label: '種類',
          admin: {
            description: '例: Guided Tour',
          },
        },
        {
          name: 'price',
          type: 'text',
          label: '価格',
          admin: {
            description: '例: €99/Day',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'タイトル',
        },
        {
          name: 'duration',
          type: 'text',
          label: '期間',
          admin: {
            description: '例: 7 Days tour',
          },
        },
      ],
    },
  ],
}
