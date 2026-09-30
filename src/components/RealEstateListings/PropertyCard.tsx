/* eslint-disable @next/next/no-img-element -- CMS media URL, sized by the card */
import { Bath, BedSingle, Frame } from 'lucide-react'
import React from 'react'

import { dmSans } from '@/components/SaasLp/fonts'
import { cn } from '@/utilities/ui'

// Figma: Real Estate Template (Flowbase) の物件カード (node 0:230)。
// アイコンは Streamline の SVG を使わず、lucide の近いもので代用している。

// Display shape for one card. Kept free of payload-types so the component
// can be previewed with static data, same as SaasBento's BentoCard.
export type PropertyCardData = {
  bathrooms?: number | null
  bedrooms?: number | null
  id: number | string
  imageAlt?: string | null
  imageSrc?: string | null
  size?: number | null
  title: string
}

const Spec: React.FC<{ icon: React.ReactNode; label: string; value?: number | null }> = ({
  icon,
  label,
  value,
}) => (
  <li className="flex h-[60px] items-center justify-center gap-2.5" title={label}>
    <span aria-hidden="true">{icon}</span>
    <span className="sr-only">{label}</span>
    <span className="text-[17px] font-bold tracking-[-0.025em]">{value ?? '—'}</span>
  </li>
)

export const PropertyCard: React.FC<{ property: PropertyCardData }> = ({ property }) => {
  const { bathrooms, bedrooms, imageAlt, imageSrc, size, title } = property

  return (
    <article
      className={cn(
        dmSans.className,
        'flex flex-col overflow-hidden rounded-[25px] bg-white text-black shadow-[0_32px_34px_rgba(0,0,0,0.13)]',
      )}
    >
      <div className="relative aspect-[336/266] overflow-hidden bg-neutral-100">
        {imageSrc && (
          <img alt={imageAlt || title} className="absolute inset-0 size-full object-cover" src={imageSrc} />
        )}
      </div>
      <h3 className="p-[30px] text-2xl font-bold tracking-[-0.025em]">{title}</h3>
      <ul className="grid grid-cols-3 divide-x divide-[#e4e4e4] border-t border-[#e4e4e4]">
        <Spec icon={<BedSingle className="size-3.5" />} label="Bedrooms" value={bedrooms} />
        <Spec icon={<Bath className="size-3.5" />} label="Bathrooms" value={bathrooms} />
        <Spec icon={<Frame className="size-3.5" />} label="Size" value={size} />
      </ul>
    </article>
  )
}
