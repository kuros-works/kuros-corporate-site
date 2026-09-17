import type { Field } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const landingPageHero: Field = {
  name: 'hero',
  type: 'group',
  label: 'ヒーロー',
  fields: [
    {
      name: 'schoolPhoto',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: '校舎写真',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'ロゴ',
    },
    {
      name: 'taglines',
      type: 'array',
      label: 'キャッチコピー（3行）',
      minRows: 3,
      maxRows: 3,
      defaultValue: [{ text: '' }, { text: '' }, { text: '' }],
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'テキスト',
        },
      ],
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
        label: 'CTAボタン',
      },
    }),
    {
      name: 'tuition',
      type: 'text',
      label: '月謝',
    },
    {
      name: 'access',
      type: 'textarea',
      label: 'アクセス',
    },
  ],
}
