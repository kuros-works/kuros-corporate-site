import React from 'react'

import type { TravelHeroBlock as TravelHeroBlockProps } from '@/payload-types'

import { BookingForm } from '@/components/TravelLp/BookingForm'
import { TravelHero } from '@/components/TravelLp/Hero'
import { mediaSrc } from '../mediaSrc'

export const TravelHeroBlock: React.FC<TravelHeroBlockProps> = ({
  backgroundImage,
  form,
  heading,
  lead,
}) => (
  <TravelHero
    backgroundAlt={
      backgroundImage && typeof backgroundImage === 'object' ? backgroundImage.alt : null
    }
    backgroundSrc={mediaSrc(backgroundImage)}
    heading={heading}
    lead={lead}
  >
    {/* Only what the form needs is passed on to the client component. */}
    {form && typeof form === 'object' && (
      <BookingForm
        form={{
          id: form.id,
          confirmationMessage: form.confirmationMessage,
          fields: form.fields,
          submitButtonLabel: form.submitButtonLabel,
        }}
      />
    )}
  </TravelHero>
)
