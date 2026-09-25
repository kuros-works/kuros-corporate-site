'use client'

import React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/utilities/ui'

// Figma: SaaS LP ポートフォリオ用 / node 9:1350 (Form)
// Static portfolio LP — there is no backend yet, so submit only runs the
// browser's email validation. Pass `onSubmit` to wire it up later.

type Props = {
  buttonLabel?: string
  className?: string
  onSubmit?: (email: string) => void
  placeholder?: string
}

export const NewsletterForm: React.FC<Props> = ({
  buttonLabel = 'Join',
  className,
  onSubmit,
  placeholder = 'Enter email address',
}) => {
  const id = React.useId()

  return (
    <form
      className={cn(
        'flex h-[55px] w-full overflow-hidden rounded-[8px] bg-[#242424] ring-white/20 focus-within:ring-2',
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
        className="h-full min-w-0 flex-1 rounded-none border-0 bg-transparent py-0 pr-4 pl-5 text-base leading-[22px] text-white shadow-none placeholder:text-white focus-visible:ring-0 focus-visible:outline-none md:text-base"
        id={id}
        name="email"
        placeholder={placeholder}
        required
        type="email"
      />
      <Button
        className="h-full w-[120px] shrink-0 rounded-none rounded-r-[8px] bg-[#a3dc2f] text-base leading-7 font-bold text-[#fafafa] shadow-none hover:bg-[#b1e64a] focus-visible:ring-white/40 sm:w-[175.551px]"
        size="clear"
        type="submit"
      >
        {buttonLabel}
      </Button>
    </form>
  )
}
