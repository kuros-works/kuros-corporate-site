import { cn } from '@/utilities/ui'
import React from 'react'

import { WorkCard, CardWorkData } from '@/components/WorkCard'

export type Props = {
  works: CardWorkData[]
}

export const WorkArchive: React.FC<Props> = (props) => {
  const { works } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {works?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4 lg:col-span-6" key={index}>
                  <WorkCard className="h-full" doc={result} />
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
