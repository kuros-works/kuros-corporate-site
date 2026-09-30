import type { Block } from 'payload'

export const PropertyListings: Block = {
  slug: 'propertyListings',
  interfaceName: 'PropertyListingsBlock',
  labels: {
    singular: 'Property Listings',
    plural: 'Property Listings',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: '見出し',
      defaultValue: 'Find your next place to live',
    },
    {
      name: 'description',
      type: 'textarea',
      label: '説明文',
      admin: {
        description: '任意。空欄なら非表示。',
      },
    },
    {
      name: 'properties',
      type: 'relationship',
      relationTo: 'properties',
      hasMany: true,
      maxRows: 6,
      label: '表示する物件',
      admin: {
        description: '最大6件。並び順がそのまま表示順になります。',
      },
    },
  ],
}
