import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  CodeBlock,
  FixedToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const Showcases: CollectionConfig = {
  slug: 'showcases',
  labels: {
    singular: 'Showcase',
    plural: 'Showcases',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    summary: true,
    publishedDate: true,
    thumbnail: true,
  },
  admin: {
    defaultColumns: ['title', 'usedCollection', 'publishedDate', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'タイトル',
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
      name: 'summary',
      type: 'textarea',
      label: '要約（一覧表示用）',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'サムネイル画像',
    },
    {
      name: 'content',
      type: 'richText',
      label: '本文',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
          BlocksFeature({ blocks: [CodeBlock()] }),
        ],
      }),
    },
    {
      name: 'usedCollection',
      type: 'select',
      label: '使用コレクション',
      options: [
        {
          label: 'Landing Pages',
          value: 'landing-pages',
        },
      ],
      admin: {
        position: 'sidebar',
        description: '本実績で使用したコレクション。',
      },
    },
    {
      name: 'publicUrl',
      type: 'text',
      label: '公開URL',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'relatedLinks',
      type: 'array',
      label: '関連記事リンク',
      labels: {
        singular: '関連記事リンク',
        plural: '関連記事リンク',
      },
      admin: {
        description: 'Zenn / Qiita などの関連記事へのリンク。',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'ラベル',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
        },
      ],
    },
    {
      name: 'publishedDate',
      type: 'date',
      label: '公開日',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
        position: 'sidebar',
      },
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
