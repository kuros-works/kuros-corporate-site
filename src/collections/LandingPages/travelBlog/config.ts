import type { Block } from 'payload'

export const TravelBlog: Block = {
  slug: 'travelBlog',
  dbName: 'lp_tv_blog',
  interfaceName: 'TravelBlogBlock',
  labels: {
    singular: 'Travel Blog',
    plural: 'Travel Blog',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Our Blog',
      label: '見出し',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'An insight the incredible experience in the world',
      label: '説明文',
      admin: {
        description: '任意。空欄なら非表示。',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: '記事の画像',
    },
    {
      name: 'postTitle',
      type: 'text',
      required: true,
      defaultValue: 'Beautiful Italy Let’s travel',
      label: '記事のタイトル',
    },
    {
      name: 'postBody',
      type: 'textarea',
      label: '記事の本文',
    },
    {
      name: 'readMoreLabel',
      type: 'text',
      defaultValue: 'Read More',
      label: '続きを読むの文言',
      admin: {
        description: 'リンクなしのダミーです。空欄なら非表示。',
      },
    },
  ],
}
