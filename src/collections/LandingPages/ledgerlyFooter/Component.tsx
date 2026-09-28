import React from 'react'

import type { LedgerlyFooterBlock as LedgerlyFooterBlockProps } from '@/payload-types'

import { type FooterColumn, SaasFooter } from '@/components/SaasFooter'

import { mediaSrc } from '../mediaSrc'

const toColumn = (column: LedgerlyFooterBlockProps['company']): FooterColumn => ({
  links: (column.links ?? []).map(({ href, label }) => ({ href: href || undefined, label })),
  title: column.title,
})

export const LedgerlyFooterBlock: React.FC<LedgerlyFooterBlockProps> = ({
  company,
  copyright,
  description,
  disclaimer,
  help,
  logo,
  newsletterHeading,
  socialLinks,
}) => (
  <SaasFooter
    columns={[toColumn(company), toColumn(help)]}
    copyright={copyright ?? ''}
    description={description ?? ''}
    disclaimer={disclaimer ?? ''}
    logoSrc={mediaSrc(logo.image) || undefined}
    logoText={logo.text}
    newsletterHeading={newsletterHeading}
    socialLinks={{
      facebook: socialLinks?.facebook || undefined,
      github: socialLinks?.github || undefined,
      instagram: socialLinks?.instagram || undefined,
      twitter: socialLinks?.twitter || undefined,
    }}
  />
)
