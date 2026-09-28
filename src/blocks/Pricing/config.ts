import type { Block } from 'payload'

export const Pricing: Block = {
  slug: 'pricing',
  interfaceName: 'PricingBlock',
  labels: {
    singular: '料金プランセクション',
    plural: '料金プランセクション',
  },
  fields: [
    {
      name: 'plans',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'プラン',
      labels: {
        singular: 'プラン',
        plural: 'プラン',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'プラン名',
        },
        {
          name: 'price',
          type: 'text',
          required: true,
          label: '価格',
          admin: {
            description: '例: $49 / Custom',
          },
        },
        {
          name: 'period',
          type: 'text',
          label: '期間',
          admin: {
            description: '例: /month（空欄なら非表示）',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: '説明',
        },
        {
          name: 'features',
          type: 'array',
          required: true,
          minRows: 1,
          label: '機能一覧',
          labels: {
            singular: '機能',
            plural: '機能',
          },
          fields: [
            {
              name: 'feature',
              type: 'text',
              required: true,
              label: '機能',
            },
          ],
        },
        {
          name: 'popular',
          type: 'checkbox',
          defaultValue: false,
          label: '「Popular」バッジを表示',
        },
        {
          name: 'variant',
          type: 'select',
          required: true,
          defaultValue: 'basic',
          label: 'デザイン',
          options: [
            { label: 'Basic', value: 'basic' },
            { label: 'Pro', value: 'pro' },
            { label: 'Enterprise', value: 'enterprise' },
          ],
        },
        {
          name: 'cta',
          type: 'text',
          required: true,
          label: 'ボタン文言',
        },
        {
          name: 'ctaHref',
          type: 'text',
          label: 'ボタンのリンク先',
        },
      ],
    },
  ],
}
