import type { Block, CollectionConfig, Field } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Feature } from '@/blocks/Feature/config'
import { Pricing } from '@/blocks/Pricing/config'
import { Testimonial } from '@/blocks/Testimonial/config'
import { TypishCta } from './closingCta/config'
import { TypishFooter } from './footer/config'
import { TypishHero } from './hero/config'
import { revalidateDelete, revalidateLandingPage } from './hooks/revalidateLandingPage'
import { LedgerlyCta } from './ledgerlyCta/config'
import { LedgerlyFeatures } from './ledgerlyFeatures/config'
import { LedgerlyFooter } from './ledgerlyFooter/config'
import { LedgerlyHeader } from './ledgerlyHeader/config'
import { LedgerlyHero } from './ledgerlyHero/config'
import { PropertyListings } from './propertyListings/config'
import { RealEstateCta } from './realEstateCta/config'
import { RealEstateFooter } from './realEstateFooter/config'
import { RealEstateHeader } from './realEstateHeader/config'
import { RealEstateHero } from './realEstateHero/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'

// A section that holds at most one block, so each LP picks its own design
// (Typish / Ledgerly / Real Estate) for the header, hero, closing CTA and footer.
const singleBlock = (name: string, blocks: Block[]): Field => ({
  name,
  type: 'blocks',
  blocks,
  maxRows: 1,
  admin: {
    initCollapsed: false,
  },
})

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
          label: 'Header',
          description: 'Typish LPではヘッダーを使わないため空のままで構いません。',
          fields: [singleBlock('header', [LedgerlyHeader, RealEstateHeader])],
        },
        {
          label: 'Hero',
          fields: [singleBlock('hero', [TypishHero, LedgerlyHero, RealEstateHero])],
        },
        {
          label: '特徴セクション',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [Feature, Testimonial, Pricing, LedgerlyFeatures, PropertyListings],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
        {
          label: 'クロージングCTA',
          fields: [singleBlock('closingCta', [TypishCta, LedgerlyCta, RealEstateCta])],
        },
        {
          label: 'Footer',
          fields: [singleBlock('footer', [TypishFooter, LedgerlyFooter, RealEstateFooter])],
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
