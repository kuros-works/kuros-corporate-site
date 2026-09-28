/* eslint-disable @next/next/no-img-element -- static decorative Figma assets */
import React from 'react'

import { dmSans, dmSansOpsz } from '@/components/SaasLp/fonts'
import { SectionHeading } from '@/components/SaasLp/SectionHeading'
import { cn } from '@/utilities/ui'

// Figma: SaaS LP ポートフォリオ用 / node 1:388 (Pricing)
// Three plan cards of equal height; each CTA is pinned to the card bottom.

const asset = (name: string) => `/figma/saas-pricing/${name}`

export type Plan = {
  cta: string
  ctaHref?: string
  description: string
  features: string[]
  name: string
  period?: string
  popular?: boolean
  price: string
  variant: 'basic' | 'pro' | 'enterprise'
}

const defaultPlans: Plan[] = [
  {
    cta: 'Get started',
    description: 'Core spend tracking and reporting for small teams getting started.',
    features: ['Real-time spend tracking', 'Up to 10 team members', 'Basic reporting', 'Email support'],
    name: 'Basic',
    period: '/month',
    price: '$49',
    variant: 'basic',
  },
  {
    cta: 'Get started',
    description: 'Automated approvals and advanced analytics for growing teams.',
    features: [
      'Everything in Basic',
      'Automated approval workflows',
      'Unlimited team members',
      'Advanced analytics & reporting',
      'Priority support',
    ],
    name: 'Pro',
    period: '/month',
    popular: true,
    price: '$149',
    variant: 'pro',
  },
  {
    cta: 'Contact Us',
    description: 'Custom integrations, security, and support tailored to your organization.',
    features: [
      'Everything in Pro',
      'Custom integrations',
      'Dedicated account manager',
      'SSO & advanced security',
      'Audit logs',
    ],
    name: 'Enterprise',
    price: 'Custom',
    variant: 'enterprise',
  },
]

const ctaStyles: Record<Plan['variant'], string> = {
  basic: 'bg-[#1f1f1f] text-[#fbfbfb] ring-1 ring-[#3b3b3b] ring-inset hover:bg-[#262626]',
  enterprise: 'bg-[#a3dc2f] text-[#1d1c20] hover:opacity-90',
  pro: 'bg-[#fbfbfb] text-[#0f0f0f] hover:opacity-90',
}

const PlanCard: React.FC<Plan> = ({
  cta,
  ctaHref = '#',
  description,
  features,
  name,
  period,
  popular,
  price,
  variant,
}) => (
  <article className="relative flex flex-col items-center rounded-[24px] bg-[#161616] px-6 pt-[72px] pb-10 ring-1 ring-[#242424] ring-inset md:px-10 lg:min-h-[791px]">
    {popular && (
      <span className="absolute top-[24.5px] right-[23.5px] inline-flex items-center gap-1 rounded-[32px] bg-[#112220] px-3 py-2 text-sm leading-[16.8px] font-medium text-[#33c6ab] ring-1 ring-[#236456] ring-inset">
        <span className="flex h-[16.8px] w-4 shrink-0 items-center justify-center">
          <img alt="" height={15.4056} src={asset('sparkle.svg')} width={14.4994} />
        </span>
        Popular
      </span>
    )}

    <div className="flex w-full flex-col items-center gap-6 text-center">
      <h3
        className={cn(
          'text-[32px] leading-[38.4px]',
          variant === 'basic' ? 'text-[#fbfbfb]' : 'text-[#a3dc2f]',
        )}
      >
        {name}
      </h3>
      <p className="max-w-[300.48px] text-base leading-[22.4px] text-[#9b9ca1]">{description}</p>
    </div>

    <p className="mt-12 flex h-[102px] items-end justify-center pb-[35px] font-medium">
      <span className="text-[40px] leading-8 text-white">{price}</span>
      {period && <span className="text-base leading-4 text-[#e0e0e0]">{period}</span>}
    </p>

    <div className="mt-12 h-px w-full bg-[#242424]" />

    <ul className="mt-12 flex w-full flex-col gap-2">
      {features.map((feature) => (
        <li className="flex items-start gap-2 text-base leading-[19.2px] text-[#fbfbfb]" key={feature}>
          <span className="relative mt-[1.6px] size-4 shrink-0">
            <img
              alt=""
              className="absolute top-[3.75px] left-[1.75px]"
              height={9.50189}
              src={asset('check.svg')}
              width={13.0039}
            />
          </span>
          {feature}
        </li>
      ))}
    </ul>

    <div className="mt-auto w-full pt-12">
      <a
        className={cn(
          'flex w-full items-center justify-center rounded-[64px] py-5 text-base leading-[19.2px] font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
          ctaStyles[variant],
        )}
        href={ctaHref}
      >
        {cta}
      </a>
    </div>
  </article>
)

type Props = {
  className?: string
  plans?: Plan[]
}

export const SaasPricing: React.FC<Props> = ({ className, plans = defaultPlans }) => {
  return (
    <section
      aria-labelledby="pricing-heading"
      className={cn(dmSans.className, dmSansOpsz, 'flex flex-col items-center', className)}
    >
      <SectionHeading
        icon={<img alt="" className="absolute inset-0" height={16} src={asset('tag.svg')} width={16} />}
        id="pricing-heading"
        label="Pricing"
        lead="Simple, transparent pricing that scales with your team. No hidden fees, no surprises."
        title="Find the right plan"
      />

      <div className="mt-10 grid w-full max-w-[440px] gap-8 md:mt-14 lg:max-w-[1261px] lg:grid-cols-3 xl:mt-[55px]">
        {plans.map((plan) => (
          <PlanCard key={plan.name} {...plan} />
        ))}
      </div>
    </section>
  )
}
