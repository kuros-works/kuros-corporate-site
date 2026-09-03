import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { revalidateDelete, revalidateWork } from './hooks/revalidateWork'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

// 実績のカテゴリ。将来LINE友だち登録時のセグメント選択肢と1対1対応させる想定。
// 値を増やす場合はここに1行足すだけでよい（interestsマスタに行を足す発想と同じ）。
const workCategoryOptions = [
  {
    label: '業務システム（基幹・受注管理）',
    value: 'business-system',
  },
  {
    label: 'CMS・マーケティング基盤',
    value: 'cms-marketing',
  },
]

export const Works: CollectionConfig = {
  slug: 'works',
  labels: {
    singular: 'Work',
    plural: 'Works',
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
    category: true,
    coverImage: true,
    externalLink: true,
  },
  admin: {
    defaultColumns: ['title', 'category', 'order', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: '実績名',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'summary',
              type: 'textarea',
              required: true,
              label: '概要（一覧カード表示用）',
              admin: {
                description: '一覧ページのカードに表示する短い説明文。2〜3文程度を想定。',
              },
            },
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              label: 'カバー画像',
              admin: {
                description: '一覧カード・OGP画像として使用。',
              },
            },
          ],
        },
        {
          label: 'Meta',
          fields: [
            {
              name: 'category',
              type: 'select',
              required: true,
              label: 'カテゴリ',
              options: workCategoryOptions,
              admin: {
                position: 'sidebar',
                description:
                  '将来のLINEセグメント選択肢と対応する分類。増やす場合はコード側にも選択肢を追加する。',
              },
            },
            {
              name: 'techStack',
              type: 'array',
              label: '使用技術',
              admin: {
                position: 'sidebar',
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'externalLink',
              type: 'text',
              required: true,
              label: '外部リンク（GitHub等）',
              admin: {
                position: 'sidebar',
                description: '一覧カードのリンク先。GitHubリポジトリ等の外部URL。',
              },
            },
            {
              name: 'order',
              type: 'number',
              label: '表示順',
              admin: {
                position: 'sidebar',
                description: '数字が小さいほど先に表示。空欄の場合は公開日順。',
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: '公開日',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
  ],
  hooks: {
    afterChange: [revalidateWork],
    afterDelete: [revalidateDelete],
  },
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
