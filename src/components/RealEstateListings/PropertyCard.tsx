/* eslint-disable @next/next/no-img-element -- CMS media URL, sized by the card */
import { Bath, BedDouble, Ruler } from 'lucide-react'
import React from 'react'

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
  <li className="flex items-center gap-1.5" title={label}>
    <span aria-hidden="true" className="text-neutral-500">
      {icon}
    </span>
    <span className="sr-only">{label}</span>
    <span>{value ?? '—'}</span>
  </li>
)

export const PropertyCard: React.FC<{ property: PropertyCardData }> = ({ property }) => {
  const { bathrooms, bedrooms, imageAlt, imageSrc, size, title } = property

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <div className="aspect-[4/3] bg-neutral-100">
        {imageSrc && (
          <img alt={imageAlt || title} className="size-full object-cover" src={imageSrc} />
        )}
      </div>
      <div className="flex flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
        <ul className="flex items-center gap-5 text-sm text-neutral-700">
          <Spec icon={<BedDouble className="size-4" />} label="Bedrooms" value={bedrooms} />
          <Spec icon={<Bath className="size-4" />} label="Bathrooms" value={bathrooms} />
          <Spec icon={<Ruler className="size-4" />} label="Size" value={size} />
        </ul>
      </div>
    </article>
  )
}
