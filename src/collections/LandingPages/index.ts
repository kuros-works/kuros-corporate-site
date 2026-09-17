import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Feature } from '@/blocks/Feature/config'
import { linkGroup } from '@/fields/linkGroup'
import { landingPageFooter } from './footer/config'
import { landingPageHero } from './hero/config'
import { revalidateDelete, revalidateLandingPage } from './hooks/revalidateLandingPage'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'

export const LandingPages: CollectionConfig = {
  slug: 'landing-pages',
  labels: {
    singular: 'Landing Page',
    plural: 'Landing Pages',
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
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'landing-pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [landingPageHero],
        },
        {
          label: '特徴セクション',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [Feature],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
        {
          label: 'クロージングCTA',
          fields: [
            {
              name: 'closingCta',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'richText',
                  type: 'richText',
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => {
                      return [
                        ...rootFeatures,
                        HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                      ]
                    },
                  }),
                  label: false,
                },
                linkGroup({
                  appearances: ['default', 'outline'],
                  overrides: {
                    maxRows: 2,
                  },
                }),
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [landingPageFooter],
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: '公開URL: /lp/[slug]',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateLandingPage],
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
