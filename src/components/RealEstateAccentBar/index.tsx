import React from 'react'

import { cn } from '@/utilities/ui'

// Figma: Real Estate Template の見出し上のバー（nodes 0:95, 0:193, 0:409 など）。
// 169×4・角丸2px、#ffac12 から 94.964% 地点で黒（暗背景では透明）へのグラデーション。
// 幅が違う箇所（お客様の声 0:23 は 336px）は className で上書きする。

type Props = {
  className?: string
  onDark?: boolean
}

export const RealEstateAccentBar: React.FC<Props> = ({ className, onDark = false }) => (
  <div
    aria-hidden="true"
    className={cn(
      'h-1 w-[169px] rounded-[2px] bg-linear-to-r from-[#ffac12] to-[94.964%]',
      onDark ? 'to-transparent' : 'to-black',
      className,
    )}
  />
)
