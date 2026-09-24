/* eslint-disable @next/next/no-img-element -- static decorative Figma asset */
import React from 'react'

import { cn } from '@/utilities/ui'

// Figma: SaaS LP ポートフォリオ用 / node 4:5036 (dashboard)
// Exported from Figma as a flat image rather than rebuilt in code — the
// cards and chart are illustration, not live data.

type Props = {
  className?: string
}

export const HeroDashboard: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('w-full max-w-[1536px]', className)}>
      <img
        alt=""
        className="h-auto w-full"
        decoding="async"
        height={747}
        src="/figma/saas-hero/dashboard.png"
        width={1536}
      />
    </div>
  )
}
