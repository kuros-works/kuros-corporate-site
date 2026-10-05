import type { Block } from 'payload'

export const Testimonial: Block = {
  slug: 'testimonial',
  interfaceName: 'TestimonialBlock',
  labels: {
    singular: '証言セクション',
    plural: '証言セクション',
  },
  fields: [
    {
      name: 'testimonials',
      type: 'array',
      dbName: 'lp_testimonials',
      required: true,
      minRows: 1,
      label: '証言',
      labels: {
        singular: '証言',
        plural: '証言',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: '氏名',
        },
        {
          name: 'role',
          type: 'text',
          label: '役職',
        },
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          label: '引用文',
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'アバター画像',
        },
        {
          name: 'avatarCover',
          type: 'upload',
          relationTo: 'media',
          label: 'アバター上に重ねる画像',
          admin: {
            description: '任意。アバターの上に少し大きく重ねて表示されます。',
          },
        },
      ],
    },
  ],
}
