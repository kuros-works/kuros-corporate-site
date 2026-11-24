'use client'
/* eslint-disable @next/next/no-img-element -- static decorative Figma asset */
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { fields } from '@/blocks/Form/fields'
import { RealEstateAccentBar } from '@/components/RealEstateAccentBar'
import RichText from '@/components/RichText'
import { dmSans } from '@/components/SaasLp/fonts'
import { getClientSideURL } from '@/utilities/getURL'
import { trackLead } from '@/utilities/trackLead'
import { cn } from '@/utilities/ui'

// 不動産LP（Pinewick）の「Book a viewing」問い合わせフォーム。
// Forms コレクションの既存フォームを page.tsx が読み込んで渡す（ブロックではないのでスキーマは増えない）。
// ボタンの href を "#book-a-viewing" にすると、ここへ移動する。
// 入力欄は src/blocks/Form/ の部品をそのまま使い、見出しとボタンは RealEstateListings / RealEstateCta に合わせる。

// emails（通知先の設定）はクライアントに渡さない。
export type RealEstateViewingFormData = Pick<
  FormType,
  'confirmationMessage' | 'confirmationType' | 'fields' | 'redirect' | 'submitButtonLabel'
> & { id: number | string }

type Props = {
  className?: string
  form: RealEstateViewingFormData
  heading?: string
}

// 不動産LPは明るい配色に固定しているので、閲覧者がダークモードでも入力欄の色は
// ライトの値（globals.css の :root）のままにする。
const lightFieldVars =
  '[--foreground:oklch(14.5%_0_0deg)] [--muted-foreground:oklch(55.6%_0_0deg)] [--input:oklch(92.2%_0_0deg)] [--ring:oklch(70.8%_0_0deg)] [--primary:oklch(20.5%_0_0deg)] [--primary-foreground:oklch(98.5%_0_0deg)]'

// RealEstateCta の黄色のボタン（211×70、右上の角だけ18px）と同じ形。
const buttonClass =
  'flex h-[70px] min-w-[211px] shrink-0 items-center justify-center gap-[9px] rounded-tr-[18px] bg-[#ffac12] px-10 text-[17px] font-bold tracking-[-0.025em] text-black disabled:cursor-not-allowed disabled:opacity-60'

export const RealEstateViewingForm: React.FC<Props> = ({
  className,
  form,
  heading = 'Book a viewing',
}) => {
  const { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = form

  const formMethods = useForm()
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const router = useRouter()
  // Submission IDs already tracked, so a lead is sent once per submission.
  const trackedLeads = useRef(new Set<number | string>())

  const onSubmit = useCallback(
    async (data: Record<string, unknown>) => {
      setError(undefined)
      setIsLoading(true)

      const submissionData = Object.entries(data).map(([field, value]) => ({ field, value }))

      try {
        const res = await fetch(`${getClientSideURL()}/api/form-submissions`, {
          body: JSON.stringify({ form: formID, submissionData }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        })
        const json = await res.json().catch(() => null)

        if (!res.ok) {
          setIsLoading(false)
          setError(json?.errors?.[0]?.message || 'Something went wrong. Please try again.')
          return
        }

        setIsLoading(false)
        setHasSubmitted(true)

        // Only on res.ok, and before any redirect below.
        const submissionId = json?.doc?.id
        if (submissionId != null && !trackedLeads.current.has(submissionId)) {
          trackedLeads.current.add(submissionId)
          trackLead(submissionId)
        }

        if (confirmationType === 'redirect' && redirect?.url) {
          router.push(redirect.url)
        }
      } catch (err) {
        console.warn(err)
        setIsLoading(false)
        setError('Something went wrong. Please try again.')
      }
    },
    [confirmationType, formID, redirect, router],
  )

  return (
    <section
      className={cn(dmSans.className, 'container scroll-mt-8', lightFieldVars, className)}
      id="book-a-viewing"
    >
      <div className="mx-auto max-w-[760px]">
        <div className="mb-[60px]">
          <RealEstateAccentBar />
          <h2 className="mt-[17px] text-4xl font-bold tracking-[-0.025em] text-black md:text-[50px] md:leading-[65px]">
            {heading}
          </h2>
        </div>

        {hasSubmitted ? (
          // 送信完了。redirect のときは移動するまでの間だけ表示される。
          <div aria-live="polite" className="text-lg text-neutral-700">
            {confirmationType === 'message' && confirmationMessage ? (
              <RichText data={confirmationMessage} enableGutter={false} enableProse={false} />
            ) : (
              <p>Thank you. We&apos;ll be in touch shortly.</p>
            )}
          </div>
        ) : (
          <FormProvider {...formMethods}>
            <form
              className="flex flex-col gap-6 text-black"
              id={`viewing-form-${formID}`}
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              {form.fields?.map((field: FormFieldBlock, index) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                if (!Field) return null
                return (
                  <Field
                    key={index}
                    form={form}
                    {...field}
                    {...formMethods}
                    control={control}
                    errors={errors}
                    register={register}
                  />
                )
              })}

              {error && (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}

              <div className="flex">
                <button className={buttonClass} disabled={isLoading} type="submit">
                  {isLoading ? 'Sending…' : submitButtonLabel || 'Book a viewing'}
                  {!isLoading && (
                    <img
                      alt=""
                      height={10}
                      loading="lazy"
                      src="/figma/real-estate/arrow-white.svg"
                      width={20}
                    />
                  )}
                </button>
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </section>
  )
}
