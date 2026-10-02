/* eslint-disable @next/next/no-img-element -- static decorative Figma asset */
import React from 'react'

import { dmSans } from '@/components/SaasLp/fonts'
import { cn } from '@/utilities/ui'

// Figma: Real Estate Template / Listings の Filter (node 0:171)。
// 見た目だけで、絞り込み機能は未実装（README「未実装の機能」）。
// 操作できるように見せないため button / select は使わず、フォーカスも受けない。
// 読み上げでも操作部品と誤解されないよう、まとめて aria-hidden にする。

const labels = ['Looking for', 'Location', 'Property Type', 'Price']

export const FilterBar: React.FC<{ className?: string }> = ({ className }) => (
  <div
    aria-hidden="true"
    className={cn(
      dmSans.className,
      // 0:172: 1070×120, white, 25px corners, shadow; 0:189–0:191: #e4e4e4 1px dividers.
      'flex flex-col divide-y divide-[#e4e4e4] rounded-[25px] bg-white shadow-[0_32px_34px_rgba(0,0,0,0.13)] md:h-[120px] md:flex-row md:divide-x md:divide-y-0',
      className,
    )}
  >
    {labels.map((label) => (
      <div className="flex h-16 flex-1 items-center gap-[9px] px-[30px] md:h-auto" key={label}>
        <span className="text-[17px] font-bold tracking-[-0.025em] text-black">{label}</span>
        <img alt="" height={8} src="/figma/real-estate/arrow-down.svg" width={12} />
      </div>
    ))}
  </div>
)
