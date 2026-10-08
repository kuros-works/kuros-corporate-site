import React from 'react'

import { RealEstateAccentBar } from '@/components/RealEstateAccentBar'
import { dmSans } from '@/components/SaasLp/fonts'
import { cn } from '@/utilities/ui'

import { FilterBar } from './FilterBar'
import { PropertyCard, type PropertyCardData } from './PropertyCard'

// 不動産LP「Find your next place to live」セクション。
// 構造優先の仮スタイル — 細部は後でFigmaと見比べて調整する。
// 絞り込みバー（FilterBar）は見た目だけで、絞り込み機能は未実装。

type Props = {
  className?: string
  description?: string | null
  heading: string
  properties: PropertyCardData[]
}

export const RealEstateListings: React.FC<Props> = ({
  className,
  description,
  heading,
  properties,
}) => (
  <section className={cn('container', className)} id="listings">
    <div className="mb-[60px] flex flex-col gap-3">
      {/* Figma: bar 0:193 (169×4) sits 17px above heading 0:192. */}
      <div>
        <RealEstateAccentBar />
        <h2
          className={cn(
            dmSans.className,
            'mt-[17px] text-4xl font-bold tracking-[-0.025em] text-black md:text-[50px] md:leading-[65px]',
          )}
        >
          {heading}
        </h2>
      </div>
      {description && <p className="max-w-2xl text-base text-neutral-600">{description}</p>}
    </div>
    {/* Figma: heading ends 60px above the bar, cards start 76px below it. */}
    <FilterBar className="mb-[76px]" />
    {properties.length > 0 && (
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <li key={property.id}>
            <PropertyCard property={property} />
          </li>
        ))}
      </ul>
    )}
  </section>
)
