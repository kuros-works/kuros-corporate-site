import type { Block } from 'payload'

export const RealEstateCta: Block = {
  slug: 'realEstateCta',
  interfaceName: 'RealEstateCtaBlock',
  labels: {
    singular: 'Real Estate CTA',
    plural: 'Real Estate CTA',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Make your dreams a',
      label: '見出し',
    },
    {
      name: 'highlight',
      type: 'text',
      defaultValue: 'reality',
      label: '強調語',
      admin: {
        description: '見出しの後ろに色付きで続けて表示されます。空欄なら非表示。',
      },
    },
    {
      name: 'button',
      type: 'group',
      label: 'ボタン',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          defaultValue: 'Work with us',
          label: '文言',
        },
        {
          name: 'href',
          type: 'text',
          label: 'リンク先',
        },
      ],
    },
  ],
}
