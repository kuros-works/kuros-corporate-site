import type { Block } from 'payload'

export const TravelNewsletter: Block = {
  slug: 'travelNewsletter',
  dbName: 'lp_tv_news',
  interfaceName: 'TravelNewsletterBlock',
  labels: {
    singular: 'Travel Newsletter',
    plural: 'Travel Newsletter',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Our Newsletter',
      label: '見出し',
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      label: '登録フォーム',
      admin: {
        description:
          '欄のラベルと送信ボタンの文言は、フォーム側の設定を使います。空欄ならフォームを表示しません。',
      },
    },
    {
      name: 'placeholder',
      type: 'text',
      defaultValue: 'Enter your email',
      label: 'プレースホルダー',
    },
  ],
}
