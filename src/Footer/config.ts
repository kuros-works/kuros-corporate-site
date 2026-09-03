import type { GlobalConfig, TextFieldSingleValidation } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

const validateURL: TextFieldSingleValidation = (value) => {
  if (!value) return 'URLを入力してください'
  try {
    new URL(value)
    return true
  } catch {
    return 'URL形式で入力してください（例: https://example.com）'
  }
}

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      label: '屋号',
      required: true,
      defaultValue: "Kuro's Works",
    },
    {
      name: 'address',
      type: 'text',
      label: '住所',
      required: true,
      admin: {
        description: '郵便番号・番地まで含む正式な住所を入力してください。',
      },
    },
    {
      name: 'email',
      type: 'text',
      label: 'メールアドレス',
      required: true,
      defaultValue: 'info@kuros-works.com',
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'SNSリンク',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'プラットフォーム',
          required: true,
          options: [
            { label: 'LINE', value: 'line' },
            { label: 'X', value: 'x' },
            { label: 'Wantedly', value: 'wantedly' },
          ],
          admin: {
            description: '選択肢を増やす場合はコード側（Footer/config.ts）にも追加する。',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
          validate: validateURL,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
  versions: false,
}
