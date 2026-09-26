import type { Block } from 'payload'

export const LedgerlyHeader: Block = {
  slug: 'ledgerlyHeader',
  interfaceName: 'LedgerlyHeaderBlock',
  labels: {
    singular: 'Ledgerly Header',
    plural: 'Ledgerly Header',
  },
  fields: [
    {
      name: 'nav',
      type: 'array',
      label: 'ナビゲーション',
      labels: {
        singular: 'ナビ項目',
        plural: 'ナビ項目',
      },
      admin: {
        description: 'PC表示のみ（lg以上）で表示されます。',
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
          name: 'dropdown',
          type: 'checkbox',
          defaultValue: false,
          label: '下向き矢印を表示',
        },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      required: true,
      defaultValue: 'Get started',
      label: 'CTAボタン文言',
    },
    {
      name: 'ctaHref',
      type: 'text',
      label: 'CTAボタンのリンク先',
    },
  ],
}
