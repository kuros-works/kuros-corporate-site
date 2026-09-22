import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  CodeBlock,
  FixedToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'News',
    plural: 'News',
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
    excerpt: true,
    publishedDate: true,
    coverImage: true,
  },
  admin: {
    defaultColumns: ['title', 'publishedDate', 'updatedAt'],
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
      name: 'excerpt',
      type: 'textarea',
      label: '要約（一覧表示用）',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'アイキャッチ画像',
    },
    {
      name: 'content',
      type: 'richText',
      label: '本文',
      // Payload標準のデフォルト機能セット + 標準のコードブロック（BlocksFeature/CodeBlock）。
      // このバージョンではコードブロックは独立したCodeFeatureではなく、
      // BlocksFeatureに組み込む premade の CodeBlock になっている。
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
          BlocksFeature({ blocks: [CodeBlock()] }),
        ],
      }),
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
