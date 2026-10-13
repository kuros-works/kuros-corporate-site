'use client'

import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import React from 'react'

import type { Form } from '@/payload-types'

import RichText from '@/components/RichText'
import { playfair, rubik } from '@/components/TravelLp/fonts'
import { submitForm } from '@/components/TravelLp/submitForm'
import { cn } from '@/utilities/ui'

// Figma: Travellian / Newsletter (1920px: 9:693, 768px: 36:774, 320px: 38:1160)
// White card with the heading and a form-builder form's email field and
// submit button: stacked below md, field and button in a row from md, heading
// left of the form from xl.
// From xl the card lies across the end of the section above and the start of
// the footer (which keeps a 240px top padding for it); below that it sits
// between them, touching the footer.
// The tablet frame's 18px gutter is the other sections' 20px here.
// Only the form's first email field is rendered.
// The demo notice under the field is not in the Figma.
// Desktop values shrink with the viewport between xl and 1920px.

export type NewsletterFormData = Pick<
  Form,
  'confirmationMessage' | 'fields' | 'id' | 'submitButtonLabel'
>

type FormField = NonNullable<Form['fields']>[number]

type EmailField = Extract<FormField, { blockType: 'email' }>

const isEmail = (field: FormField): field is EmailField => field.blockType === 'email'

type Props = {
  className?: string
  form?: NewsletterFormData | null
  heading: string
  placeholder?: string | null
}

export const TravelNewsletter: React.FC<Props> = ({ className, form, heading, placeholder }) => {
  const id = React.useId()
  const headingId = `${id}-heading`
  const [error, setError] = React.useState<string>()
  const [submitted, setSubmitted] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)

  const field = form?.fields?.find(isEmail)

  return (
    <section
      aria-labelledby={headingId}
      // overflow-x-clip: nothing in here may widen the page.
      className={cn(
        rubik.className,
        'relative z-10 overflow-x-clip px-4 md:px-5 xl:-mt-[min(5.677vw,109px)] xl:-mb-[min(6.406vw,123px)] xl:px-0',
        className,
      )}
    >
      <div className="flex flex-col gap-[60px] rounded-[20px] bg-white px-5 py-10 text-[#767e86] drop-shadow-[0px_0px_2px_rgba(0,0,0,0.3)] md:rounded-[26px] md:px-10 xl:mx-auto xl:w-[min(65.729vw,1262px)] xl:flex-row xl:items-start xl:gap-[min(5.208vw,100px)] xl:px-[min(4.167vw,80px)] xl:py-[min(3.125vw,60px)]">
        <h2
          className={cn(
            playfair.className,
            'text-[40px] leading-[normal] font-normal md:text-[54px] xl:shrink-0 xl:text-[clamp(40px,3.333vw,64px)]',
          )}
          id={headingId}
        >
          {heading}
        </h2>

        {form && field && submitted && (
          <div aria-live="polite" className="min-w-0 xl:flex-1 xl:self-center">
            {form.confirmationMessage && (
              <RichText
                className="text-lg leading-[normal]"
                data={form.confirmationMessage as SerializedEditorState}
                enableGutter={false}
                enableProse={false}
              />
            )}
          </div>
        )}

        {form && field && !submitted && (
          <form
            className="flex min-w-0 flex-col xl:flex-1"
            onSubmit={async (e) => {
              e.preventDefault()
              if (submitting) return

              const data = new FormData(e.currentTarget)

              setError(undefined)
              setSubmitting(true)
              const result = await submitForm({
                formID: form.id,
                values: { [field.name]: String(data.get(field.name) ?? '') },
              })
              setSubmitting(false)

              if (result.ok) setSubmitted(true)
              else setError(result.message)
            }}
          >
            <div className="flex flex-col gap-8 md:flex-row md:items-end xl:gap-[clamp(16px,1.667vw,32px)]">
              <div className="flex min-w-0 flex-col gap-4 md:flex-1">
                <label className="text-xl leading-[normal]" htmlFor={`${id}-email`}>
                  {field.label || field.name}
                </label>
                <input
                  autoComplete="email"
                  className="w-full min-w-0 rounded-[12px] border-0 bg-[#ffe8d4] px-5 py-6 text-center text-xl leading-[normal] text-[#172432] outline-none placeholder:text-[#ff7757] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff7757] md:px-10 md:text-left xl:px-[clamp(20px,2.083vw,40px)]"
                  id={`${id}-email`}
                  name={field.name}
                  placeholder={placeholder ?? undefined}
                  // The server doesn't validate, so the address is always required here.
                  required
                  type="email"
                />
              </div>

              <button
                className="h-[73px] w-full shrink-0 rounded-[12px] bg-[#ff7757] px-5 text-xl leading-[normal] text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#172432] disabled:opacity-70 md:w-[163px] xl:w-[clamp(130px,8.49vw,163px)]"
                disabled={submitting}
                type="submit"
              >
                {form.submitButtonLabel || 'Subscribe'}
              </button>
            </div>

            <p className="mt-4 text-sm leading-[normal]">
              This is a demo site. No newsletters are sent.
            </p>
            {error && (
              <p className="mt-2 text-sm leading-[normal] text-red-600" role="alert">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
