import type { Block } from 'payload'

export const TravelFooter: Block = {
  slug: 'travelFooter',
  dbName: 'lp_tv_footer',
  interfaceName: 'TravelFooterBlock',
  labels: {
    singular: 'Travel Footer',
    plural: 'Travel Footer',
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
      name: 'copyright',
      type: 'text',
      defaultValue: 'Copyright © Tidewalk Journeys 2026 All rights reserved',
      label: 'コピーライト文言',
    },
    {
      name: 'columns',
      type: 'array',
      label: 'リンク列',
      maxRows: 2,
      labels: {
        singular: 'リンク列',
        plural: 'リンク列',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: '列見出し',
        },
        {
          name: 'links',
          type: 'array',
          label: 'リンク',
          labels: {
            singular: 'リンク',
            plural: 'リンク',
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
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: '連絡先',
      admin: {
        description: 'デモ用のダミーです。実在の連絡先は入れません。',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Contact Info',
          label: '列見出し',
        },
        {
          name: 'phone',
          type: 'text',
          defaultValue: '+1 202 555 0142',
          label: '電話番号',
        },
        {
          name: 'email',
          type: 'text',
          defaultValue: 'info@tidewalk.example',
          label: 'メールアドレス',
        },
        {
          name: 'address',
          type: 'text',
          defaultValue: '100 Example Street, Sampletown',
          label: '住所',
        },
      ],
    },
    {
      name: 'social',
      type: 'group',
      label: 'SNS',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Follow us on',
          label: '列見出し',
        },
      ],
    },
  ],
}
