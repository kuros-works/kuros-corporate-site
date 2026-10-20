/* eslint-disable @next/next/no-img-element -- static decorative Figma asset */
import React from 'react'

import { dmSans } from '@/components/SaasLp/fonts'
import { cn } from '@/utilities/ui'

// Figma: Real Estate Template / Listings の Filter (node 0:171)。
// 見た目だけで、絞り込み機能は未実装（README「未実装の機能」）。
// 操作できるように見せないため button / select は使わず、フォーカスも受けない。
// 読み上げでも操作部品と誤解されないよう、まとめて aria-hidden にする。
// 右端（スマホ幅では下）の Search も同じ方針で、button ではなく span で見た目だけ作る。

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
    {/* Matches the CTA button (RealEstateCta): #ffac12, 70px tall, top-right corner 18px. */}
    <div className="flex items-center p-4 md:px-[25px] md:py-0">
      <span className="flex h-[70px] w-full items-center justify-center gap-[9px] rounded-tr-[18px] bg-[#ffac12] px-10 text-[17px] font-bold tracking-[-0.025em] text-black md:w-auto">
        Search
        <img alt="" height={10} src="/figma/real-estate/arrow-black.svg" width={20} />
      </span>
    </div>
  </div>
)
