/* eslint-disable @next/next/no-img-element -- static decorative Figma asset */
import React from 'react'

import { cn } from '@/utilities/ui'

// Figma: Travellian / "Rating" (1920px: 6:265, 768px: 36:667, 320px: 38:913)
// Five stars. Every card in the Figma shows all five and the CMS has no rating
// field, so this is decoration and hidden from assistive tech.

const asset = (name: string) => `/figma/travel/${name}`

export const TravelStars: React.FC<{ className?: string }> = ({ className }) => (
  <div aria-hidden className={cn('flex shrink-0 gap-1', className)}>
    {Array.from({ length: 5 }, (_, index) => (
      <img alt="" height={24} key={index} src={asset('star.svg')} width={24} />
    ))}
  </div>
)
