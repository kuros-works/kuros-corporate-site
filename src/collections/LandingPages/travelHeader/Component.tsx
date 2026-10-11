import React from 'react'

import type { TravelHeaderBlock as TravelHeaderBlockProps } from '@/payload-types'

import { TravelHeader } from '@/components/TravelLp/Header'

export const TravelHeaderBlock: React.FC<TravelHeaderBlockProps> = ({
  loginLabel,
  logoText,
  nav,
  signUpLabel,
}) => (
  <TravelHeader
    loginLabel={loginLabel}
    logoText={logoText}
    nav={(nav ?? []).map(({ href, label }) => ({ href: href || undefined, label }))}
    signUpLabel={signUpLabel}
  />
)
