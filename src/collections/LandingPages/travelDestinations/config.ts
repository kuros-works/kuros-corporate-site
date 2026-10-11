import type { Block } from 'payload'

export const TravelDestinations: Block = {
  slug: 'travelDestinations',
  dbName: 'lp_tv_dest',
  interfaceName: 'TravelDestinationsBlock',
  labels: {
    singular: 'Travel Destinations',
    plural: 'Travel Destinations',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Popular Destinations',
      label: '見出し',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Most popular destinations around the world, from historical places to natural wonders.',
      label: '説明文',
      admin: {
        description: '任意。空欄なら非表示。',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: '行き先',
      labels: {
        singular: '行き先',
        plural: '行き先',
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
          label: '名称',
        },
        {
          name: 'location',
          type: 'text',
          label: '所在地',
        },
      ],
    },
  ],
}
