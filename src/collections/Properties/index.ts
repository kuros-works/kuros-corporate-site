import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { revalidateProperty, revalidatePropertyDelete } from './hooks/revalidateProperty'

// 物件データ。不動産LPの propertyListings ブロックから relationship で参照する。
// select の選択肢は仮置き（初回の pnpm dev でDBに反映される前なら変更可）。
export const Properties: CollectionConfig = {
  slug: 'properties',
  labels: {
    singular: 'Property',
    plural: 'Properties',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    image: true,
    bedrooms: true,
    bathrooms: true,
    size: true,
  },
  admin: {
    defaultColumns: ['title', 'listingType', 'propertyType', 'price', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: '物件名',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'スラッグ',
      admin: {
        description: '一意になるよう手動で入力してください。',
        position: 'sidebar',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: '写真',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'bedrooms',
          type: 'number',
          label: 'ベッドルーム数',
          min: 0,
        },
        {
          name: 'bathrooms',
          type: 'number',
          label: 'バスルーム数',
          min: 0,
        },
        {
          name: 'size',
          type: 'number',
          label: '広さ',
          min: 0,
        },
      ],
    },
    {
      name: 'location',
      type: 'text',
      label: '所在地',
    },
    {
      name: 'price',
      type: 'number',
      label: '価格',
      min: 0,
    },
    {
      name: 'listingType',
      type: 'select',
      label: '取引種別',
      options: [
        {
          label: 'Rent',
          value: 'rent',
        },
        {
          label: 'Sale',
          value: 'sale',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'propertyType',
      type: 'select',
      label: '物件種別',
      options: [
        {
          label: 'House',
          value: 'house',
        },
        {
          label: 'Apartment',
          value: 'apartment',
        },
        {
          label: 'Condo',
          value: 'condo',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateProperty],
    afterDelete: [revalidatePropertyDelete],
  },
}
