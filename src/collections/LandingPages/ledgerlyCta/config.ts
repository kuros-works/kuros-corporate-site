import type { Block, Field } from 'payload'

const button = (name: string, label: string): Field => ({
  name,
  type: 'group',
  label,
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      label: '文言',
    },
    {
      name: 'href',
      type: 'text',
      label: 'リンク先',
    },
  ],
})

export const LedgerlyCta: Block = {
  slug: 'ledgerlyCta',
  interfaceName: 'LedgerlyCtaBlock',
  labels: {
    singular: 'Ledgerly CTA',
    plural: 'Ledgerly CTA',
  },
  fields: [
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
      admin: {
        description: '任意。空欄なら非表示。',
      },
    },
    button('primaryButton', 'ボタン1（緑）'),
    button('secondaryButton', 'ボタン2（白）'),
  ],
}
