import type { Block } from 'payload'

export const TravelHeader: Block = {
  slug: 'travelHeader',
  dbName: 'lp_tv_header',
  interfaceName: 'TravelHeaderBlock',
  labels: {
    singular: 'Travel Header',
    plural: 'Travel Header',
  },
  fields: [
    {
      name: 'logoText',
      type: 'text',
      required: true,
      defaultValue: 'Tidewalk Journeys',
      label: 'ロゴ文字',
    },
    {
      name: 'nav',
      type: 'array',
      label: 'ナビゲーション',
      labels: {
        singular: 'ナビ項目',
        plural: 'ナビ項目',
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
    {
      name: 'loginLabel',
      type: 'text',
      defaultValue: 'Login',
      label: 'ログインの文言',
      admin: {
        description: 'リンクなしのダミーです。空欄なら非表示。',
      },
    },
    {
      name: 'signUpLabel',
      type: 'text',
      defaultValue: 'Sign up',
      label: '登録ボタンの文言',
      admin: {
        description: 'リンクなしのダミーです。空欄なら非表示。',
      },
    },
  ],
}
