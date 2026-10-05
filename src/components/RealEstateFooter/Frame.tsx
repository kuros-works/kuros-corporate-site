import React from 'react'

import { cn } from '@/utilities/ui'

// Figma: Real Estate Template / Footer (node 0:24) の背景（0:25）と区切り線（0:73）。
// Figma では CTA がフッターの中にあり、1枚の背景を共有している。LP では CTA と
// フッターが別のブロックなので、LPページがこの枠で両方を包む。

// 0:25
const backdropGradient =
  'linear-gradient(201.29deg, rgb(39, 26, 0) 0.448%, rgba(0, 0, 0, 0.982) 45.248%)'

// 80px above the CTA, 150px below the link columns.
export const RealEstateFooterFrame: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <div
    className={cn('bg-black pt-16 pb-16 lg:pt-20 lg:pb-[150px]', className)}
    style={{ backgroundImage: backdropGradient }}
  >
    {children}
  </div>
)

// 0:73: 1069px wide, white at 10%; 50px below the CTA, 60px above the logo row.
export const RealEstateFooterDivider: React.FC = () => (
  <div className="mx-auto w-full max-w-[1101px] px-4">
    <hr className="mt-10 mb-12 h-px border-0 bg-white/10 lg:mt-[50px] lg:mb-[60px]" />
  </div>
)
