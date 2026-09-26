import type { Block, Field } from 'payload'

const linkColumn = (name: string, label: string, defaultTitle: string): Field => ({
  name,
  type: 'group',
  label,
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: defaultTitle,
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
})

export const LedgerlyFooter: Block = {
  slug: 'ledgerlyFooter',
  interfaceName: 'LedgerlyFooterBlock',
  labels: {
    singular: 'Ledgerly Footer',
    plural: 'Ledgerly Footer',
  },
  fields: [
    {
      name: 'logo',
      type: 'group',
      label: 'ロゴ',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'ロゴ画像',
          admin: {
            description: '24×24で表示されます。空欄なら既定のロゴを使用。',
          },
        },
        {
          name: 'text',
          type: 'text',
          required: true,
          defaultValue: 'Ledgerly',
          label: 'ロゴ文字',
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: '説明文',
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'SNSリンク',
      admin: {
        description: 'URLが空欄のアイコンは表示されません。',
      },
      fields: [
        { name: 'twitter', type: 'text', label: 'Twitter' },
        { name: 'facebook', type: 'text', label: 'Facebook' },
        { name: 'instagram', type: 'text', label: 'Instagram' },
        { name: 'github', type: 'text', label: 'GitHub' },
      ],
    },
    linkColumn('company', 'Companyリンク列', 'Company'),
    linkColumn('help', 'Helpリンク列', 'Help'),
    {
      name: 'newsletterHeading',
      type: 'text',
      required: true,
      defaultValue: 'Subscribe to Newsletter',
      label: 'ニュースレター見出し',
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'コピーライト文言',
    },
    {
      name: 'disclaimer',
      type: 'textarea',
      label: '免責事項',
    },
  ],
}
