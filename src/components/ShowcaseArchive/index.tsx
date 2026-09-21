import { cn } from '@/utilities/ui'
import React from 'react'

import { ShowcaseCard, CardShowcaseData } from '@/components/ShowcaseCard'

export type Props = {
  showcases: CardShowcaseData[]
}

export const ShowcaseArchive: React.FC<Props> = (props) => {
  const { showcases } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {showcases?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4 lg:col-span-6" key={index}>
                  <ShowcaseCard className="h-full" doc={result} />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
