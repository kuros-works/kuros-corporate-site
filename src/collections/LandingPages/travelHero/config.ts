import type { Block } from 'payload'

export const TravelHero: Block = {
  slug: 'travelHero',
  dbName: 'lp_tv_hero',
  interfaceName: 'TravelHeroBlock',
  labels: {
    singular: 'Travel Hero',
    plural: 'Travel Hero',
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
      defaultValue: 'Start your unforgettable journey with us.',
      label: '見出し',
    },
    {
      name: 'lead',
      type: 'textarea',
      defaultValue: 'The best travel for your journey begins now',
      label: 'リード文',
      admin: {
        description: '任意。空欄なら非表示。',
      },
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      label: '予約フォーム',
      admin: {
        description:
          '欄のラベルと送信ボタンの文言は、フォーム側の設定を使います。空欄ならフォームを表示しません。',
      },
    },
  ],
}
