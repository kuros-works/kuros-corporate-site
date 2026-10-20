'use client'

/* eslint-disable @next/next/no-img-element -- static decorative Figma asset */
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import React from 'react'

import type { Form } from '@/payload-types'

import RichText from '@/components/RichText'
import { playfair } from '@/components/TravelLp/fonts'
import { submitForm } from '@/components/TravelLp/submitForm'
import { cn } from '@/utilities/ui'

// Figma: Travellian / hero "Content Block" (1920px: 3:69, 768px: 36:407, 320px: 38:791)
// White card with the form-builder form's fields and the orange submit button:
// stacked below md, 2×2 with the button on the right from md, one row from xl.
// Dates use the browser's date input, so only selects get the Figma chevron.
// The demo notice under the fields is not in the Figma.
// Only text / number / select / date / email fields are rendered.
// Desktop values shrink with the viewport between xl and 1920px.

const asset = (name: string) => `/figma/travel/${name}`

export type BookingFormData = Pick<
  Form,
  'confirmationMessage' | 'fields' | 'id' | 'submitButtonLabel'
>

type FormField = NonNullable<Form['fields']>[number]

type SupportedField = Extract<
  FormField,
  { blockType: 'date' | 'email' | 'number' | 'select' | 'text' }
>

const supportedTypes = ['date', 'email', 'number', 'select', 'text']

const isSupported = (field: FormField): field is SupportedField =>
  supportedTypes.includes(field.blockType)

const card =
  'mx-4 rounded-2xl bg-white text-[#172432] md:mx-0 md:w-[85.8%] md:rounded-l-none md:rounded-r-[20px] xl:w-[min(100%-64px,max(76.72%,1100px))] xl:max-w-[1473px]'

const control = cn(
  playfair.className,
  'h-[30px] w-full min-w-0 rounded-none border-0 border-b border-black bg-transparent p-0 pb-[10px] text-sm leading-[normal] text-[#172432] outline-none focus-visible:border-[#ff7757] md:h-[32px] md:text-base xl:h-[37px] xl:text-[clamp(16px,1.04vw,20px)]',
)

type Props = {
  className?: string
  form: BookingFormData
}

export const BookingForm: React.FC<Props> = ({ className, form }) => {
  const id = React.useId()
  const [checkIn, setCheckIn] = React.useState('')
  const [error, setError] = React.useState<string>()
  const [submitted, setSubmitted] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)

  const fields = (form.fields ?? []).filter(isSupported)

  if (submitted) {
    return (
      <div aria-live="polite" className={cn(card, 'p-5 md:py-10 md:pr-8 md:pl-8', className)}>
        {form.confirmationMessage && (
          <RichText
            className="text-lg leading-[normal]"
            data={form.confirmationMessage as SerializedEditorState}
            enableGutter={false}
            enableProse={false}
          />
        )}
      </div>
    )
  }

  return (
    <form
      className={cn(
        card,
        'flex flex-col md:flex-row md:items-stretch md:gap-[100px] md:pl-8 xl:gap-[clamp(40px,5.2vw,100px)] xl:pl-[min(9.479vw,182px)]',
        className,
      )}
      onSubmit={async (e) => {
        e.preventDefault()
        if (submitting) return

        const data = new FormData(e.currentTarget)
        const values = Object.fromEntries(
          fields.map(({ name }) => [name, String(data.get(name) ?? '')]),
        )

        setError(undefined)
        setSubmitting(true)
        const result = await submitForm({ formID: form.id, values })
        setSubmitting(false)

        if (result.ok) setSubmitted(true)
        else setError(result.message)
      }}
    >
      <div className="min-w-0 flex-1 p-5 pb-10 md:self-center md:px-0 md:py-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4 xl:gap-[clamp(20px,2.08vw,40px)]">
          {fields.map((field) => {
            const fieldId = `${id}-${field.name}`
            const required = Boolean(field.required)

            return (
              <div className="flex min-w-0 flex-col gap-3" key={field.name}>
                <label
                  className="text-sm leading-[normal] whitespace-nowrap text-[#767e86] uppercase md:text-base"
                  htmlFor={fieldId}
                >
                  {field.label || field.name}
                </label>

                {field.blockType === 'select' ? (
                  <select
                    className={cn(
                      control,
                      'appearance-none bg-[url(/figma/travel/chevron-down.svg)] bg-[length:24px_24px] bg-[position:right_top] bg-no-repeat pr-8',
                    )}
                    defaultValue={field.defaultValue ?? ''}
                    id={fieldId}
                    name={field.name}
                    required={required}
                  >
                    {!field.defaultValue && <option value="">{field.placeholder ?? ''}</option>}
                    {(field.options ?? []).map(({ label, value }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                ) : field.blockType === 'date' ? (
                  <input
                    className={control}
                    defaultValue={field.defaultValue?.slice(0, 10) ?? undefined}
                    id={fieldId}
                    // Check out can't be earlier than check in.
                    min={field.name === 'checkOut' && checkIn ? checkIn : undefined}
                    name={field.name}
                    onChange={
                      field.name === 'checkIn' ? (e) => setCheckIn(e.target.value) : undefined
                    }
                    required={required}
                    type="date"
                  />
                ) : (
                  <input
                    className={control}
                    defaultValue={
                      field.blockType === 'email' ? undefined : (field.defaultValue ?? undefined)
                    }
                    id={fieldId}
                    name={field.name}
                    required={required}
                    type={field.blockType}
                  />
                )}
              </div>
            )
          })}
        </div>

        <p className="mt-6 text-sm leading-[normal] text-[#767e86]">
          This is a demo site. No bookings are accepted.
        </p>
        {error && (
          <p className="mt-2 text-sm leading-[normal] text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>

      <button
        className={cn(
          playfair.className,
          'flex w-full shrink-0 items-center gap-3 rounded-b-2xl bg-[#ff7757] px-5 py-10 text-left text-[36px] leading-[normal] text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#172432] disabled:opacity-70 md:w-[170px] xl:w-auto xl:min-w-[170px] md:rounded-l-none md:rounded-r-[20px] md:py-[60px]',
        )}
        disabled={submitting}
        type="submit"
      >
        <span className="min-w-0 flex-1 xl:whitespace-nowrap">{form.submitButtonLabel || 'Submit'}</span>
        <img alt="" className="shrink-0" height={14.7279} src={asset('arrow-right.svg')} width={22} />
      </button>
    </form>
  )
}
