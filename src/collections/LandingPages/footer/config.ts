import type { Field, TextFieldSingleValidation } from 'payload'

const validateURL: TextFieldSingleValidation = (value) => {
  if (!value) return 'URLを入力してください'
  try {
    new URL(value)
    return true
  } catch {
    return 'URL形式で入力してください（例: https://example.com）'
  }
}

export const landingPageFooter: Field = {
  name: 'footer',
  type: 'group',
  label: 'フッター',
  fields: [
    {
      name: 'address',
      type: 'text',
      required: true,
      label: '住所',
    },
    {
      name: 'tel',
      type: 'text',
      required: true,
      label: '電話番号',
    },
    {
      name: 'email',
      type: 'text',
      required: true,
      label: 'メールアドレス',
    },
    {
      name: 'externalLinks',
      type: 'array',
      label: '外部リンク',
      admin: {
        initCollapsed: true,
        description: '校舎HP、Instagram等の外部リンク。',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'ラベル',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
          validate: validateURL,
        },
      ],
    },
    {
      name: 'disclaimer',
      type: 'textarea',
      required: false,
      label: '注記',
      admin: {
        description: '架空ブランドを使ったデモページである旨の免責文言などを入力',
      },
    },
  ],
}
