import type { Block } from 'payload'

export const TravelGallery: Block = {
  slug: 'travelGallery',
  dbName: 'lp_tv_gallery',
  interfaceName: 'TravelGalleryBlock',
  labels: {
    singular: 'Travel Gallery',
    plural: 'Travel Gallery',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Destination Gallery',
      label: '見出し',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Our photo gallery on trip',
      label: '説明文',
      admin: {
        description: '任意。空欄なら非表示。',
      },
    },
    {
      name: 'images',
      type: 'array',
      label: '写真',
      labels: {
        singular: '写真',
        plural: '写真',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: '画像',
        },
      ],
    },
  ],
}
