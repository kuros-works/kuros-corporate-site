import type { Block, Field } from 'payload'

import { defaultCards } from '@/components/SaasBento/defaultCards'

const cardFields = (index: number): Field[] => [
  {
    name: 'heading',
    type: 'text',
    required: true,
    label: '見出し',
    defaultValue: defaultCards[index].heading,
  },
  {
    name: 'description',
    type: 'textarea',
    label: '説明文',
    defaultValue: defaultCards[index].description,
    admin: {
      description: '任意。空欄なら非表示。',
    },
  },
]

const card = (index: number, label: string, extraFields: Field[] = []): Field => ({
  name: `card${index + 1}`,
  type: 'group',
  label,
  fields: [...cardFields(index), ...extraFields],
})

export const LedgerlyFeatures: Block = {
  slug: 'ledgerlyFeatures',
  interfaceName: 'LedgerlyFeaturesBlock',
  labels: {
    singular: 'Ledgerly Features',
    plural: 'Ledgerly Features',
  },
  fields: [
    card(0, 'カード1（左上）'),
    card(1, 'カード2（中央・大）'),
    card(2, 'カード3（右上）'),
    card(3, 'カード4（左下）'),
    card(4, 'カード5（右下・ボタン付き）', [
      {
        name: 'ctaLabel',
        type: 'text',
        required: true,
        label: 'ボタン文言',
        defaultValue: 'Explore more',
      },
      {
        name: 'ctaHref',
        type: 'text',
        label: 'ボタンのリンク先',
        admin: {
          description: '任意。空欄なら # 。',
        },
      },
    ]),
  ],
}
