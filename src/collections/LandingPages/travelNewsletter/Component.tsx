import React from 'react'

import type { TravelNewsletterBlock as TravelNewsletterBlockProps } from '@/payload-types'

import { TravelNewsletter } from '@/components/TravelLp/Newsletter'

export const TravelNewsletterBlock: React.FC<TravelNewsletterBlockProps> = ({
  form,
  heading,
  placeholder,
}) => (
  <TravelNewsletter
    // Only what the form needs is passed on to the client component.
    form={
      form && typeof form === 'object'
        ? {
            id: form.id,
            confirmationMessage: form.confirmationMessage,
            fields: form.fields,
            submitButtonLabel: form.submitButtonLabel,
          }
        : null
    }
    heading={heading}
    placeholder={placeholder}
  />
)
