import type { Block } from 'payload'

export const LedgerlyHero: Block = {
  slug: 'ledgerlyHero',
  interfaceName: 'LedgerlyHeroBlock',
  labels: {
    singular: 'Ledgerly Hero',
    plural: 'Ledgerly Hero',
  },
  fields: [
    {
      name: 'badge',
      type: 'group',
      label: 'バッジ',
      admin: {
        description: '文言が空欄ならバッジ自体を表示しません。',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          defaultValue: 'New',
          label: 'タグ',
        },
        {
          name: 'label',
          type: 'text',
          label: '文言',
        },
        {
          name: 'href',
          type: 'text',
          label: 'リンク先',
        },
      ],
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: '見出し',
    },
    {
      name: 'lead',
      type: 'textarea',
      label: 'リード文',
    },
    {
      name: 'emailForm',
      type: 'group',
      label: 'メールフォーム',
      fields: [
        {
          name: 'placeholder',
          type: 'text',
          required: true,
          defaultValue: 'Enter your email address',
          label: 'プレースホルダー',
        },
        {
          name: 'buttonLabel',
          type: 'text',
          required: true,
          defaultValue: 'Book a Demo',
          label: 'ボタン文言',
        },
      ],
    },
    {
      name: 'review',
      type: 'group',
      label: 'レビュー',
      fields: [
        {
          name: 'avatars',
          type: 'array',
          label: 'アバター',
          labels: {
            singular: 'アバター',
            plural: 'アバター',
          },
          fields: [
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
                description: '任意。アバターの上に同じサイズで重ねて表示されます。',
              },
            },
          ],
        },
        {
          name: 'countBadge',
          type: 'text',
          label: '人数バッジ',
          admin: {
            description: '例: +2k（空欄なら非表示）。アバターの右端に丸いバッジで表示されます。',
          },
        },
        {
          name: 'caption',
          type: 'text',
          label: 'キャプション',
        },
      ],
    },
    {
      name: 'dashboard',
      type: 'upload',
      relationTo: 'media',
      label: 'ダッシュボード画像',
    },
    {
      name: 'pillNav',
      type: 'array',
      label: 'ピルナビ',
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
        {
          name: 'active',
          type: 'checkbox',
          defaultValue: false,
          label: '強調表示（白背景）',
        },
      ],
    },
  ],
}
