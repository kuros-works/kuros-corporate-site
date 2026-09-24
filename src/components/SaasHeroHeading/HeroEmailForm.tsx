'use client'

import React from 'react'

import { dmSans, dmSansOpsz } from '@/components/SaasLp/fonts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/utilities/ui'

// Figma: SaaS LP ポートフォリオ用 / node 4:5020 (textbox)
// Static portfolio LP — there is no backend yet, so submit only runs the
// browser's email validation. Pass `onSubmit` to wire it up later.

type Props = {
  buttonLabel?: string
  className?: string
  onSubmit?: (email: string) => void
  placeholder?: string
}

export const HeroEmailForm: React.FC<Props> = ({
  buttonLabel = 'Book a Demo',
  className,
  onSubmit,
  placeholder = 'Enter your email address',
}) => {
  const id = React.useId()

  return (
    <form
      className={cn(
        dmSans.className,
        dmSansOpsz,
        'flex h-16 w-full max-w-[640px] items-center gap-2 rounded-full bg-[#242424] p-1.5 pl-5 ring-white/20 focus-within:ring-2 sm:h-[72px] sm:pl-[27px]',
        className,
      )}
      onSubmit={(e) => {
        e.preventDefault()
        const email = new FormData(e.currentTarget).get('email')
        if (typeof email === 'string') onSubmit?.(email)
      }}
    >
      <label className="sr-only" htmlFor={id}>
        Email address
      </label>
      <Input
        autoComplete="email"
        className="h-full min-w-0 flex-1 rounded-none border-0 bg-transparent px-0 py-0 text-[15px] leading-[30px] text-white shadow-none placeholder:text-[#7c7c7c] focus-visible:ring-0 focus-visible:outline-none sm:text-lg md:text-lg"
        id={id}
        name="email"
        placeholder={placeholder}
        required
        type="email"
      />
      <Button
        className="h-full shrink-0 rounded-full bg-[#f2f2f2] px-4 text-[15px] leading-[30px] font-bold text-[#1d1c20] shadow-none hover:bg-white focus-visible:ring-white/40 sm:w-[176px] sm:px-0 sm:text-lg"
        size="clear"
        type="submit"
      >
        {buttonLabel}
      </Button>
    </form>
  )
}
