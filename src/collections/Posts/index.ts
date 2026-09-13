import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  CodeBlock,
  FixedToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { toKebabCase } from '../../utilities/toKebabCase'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Post',
    plural: 'Posts',
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
        description: '空欄で保存するとタイトルから自動生成されます。',
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (value) return value
            const title = (siblingData as { title?: string })?.title
            return title ? toKebabCase(title) : value
          },
        ],
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
