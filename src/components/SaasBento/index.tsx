/* eslint-disable @next/next/no-img-element -- static decorative Figma assets */
import React from 'react'

import { dmSans, dmSansOpsz, inter } from '@/components/SaasLp/fonts'
import { cn } from '@/utilities/ui'

// Figma: SaaS LP ポートフォリオ用 / node 9:465 (bento-style)
// The mock UI inside each card (charts, invoices, avatars) is illustration —
// only the "Explore more" CTA is interactive.

const asset = (name: string) => `/figma/saas-bento/${name}`

const card = 'overflow-hidden rounded-[30px] border border-[#333] bg-[#161616]'

// Each avatar is a stack of layers exactly as in Figma: a base image clipped
// to the circle, then cover images on top.
const team = [
  ['team-1a.png', 'team-1b.jpg'],
  ['team-2a.png', 'team-2b.jpg', 'team-2c.jpg', 'team-2d.jpg', 'team-2e.jpg'],
  ['team-3a.png', 'team-3b.jpg', 'team-3c.jpg'],
  ['team-4a.png', 'team-4b.jpg', 'team-4c.jpg'],
  ['team-5a.png', 'team-5b.jpg'],
]

const invoices = [
  { icon: 'icon-pdf-pink.svg', name: 'John Client_download.Pdf', bar: 'w-full', dots: '' },
  { icon: 'icon-pdf-blue.svg', name: 'Michele Leos_download.Pdf', bar: 'w-full', dots: '' },
  { icon: 'icon-pdf-lime.svg', name: 'John Smith_download.Pdf', bar: 'w-[132px]', dots: 'mt-[9px]' },
]

const timeLabels = ['01:00PM', '02:00PM', '03:00PM', '04:00PM', '05:00PM']

const SmallFeature: React.FC<{ children: React.ReactNode; lead: string; title: string }> = ({
  children,
  lead,
  title,
}) => (
  <div className={cn(card, 'flex items-center justify-center px-6 py-8 xl:min-h-[496px]')}>
    <div className="flex w-full max-w-[298.68px] flex-col gap-8">
      <div className="flex flex-col items-center gap-[10px] text-center">
        <h3 className="text-[17.859px] leading-[25.2px] font-bold text-[#fbfbfb]">{title}</h3>
        <p className="text-base leading-[22.4px] text-[#9b9ca1]">{lead}</p>
      </div>
      {children}
    </div>
  </div>
)

type Props = {
  className?: string
  ctaHref?: string
  ctaLabel?: string
}

export const SaasBento: React.FC<Props> = ({
  className,
  ctaHref = '#',
  ctaLabel = 'Explore more',
}) => {
  return (
    <div
      className={cn(
        dmSans.className,
        dmSansOpsz,
        'mx-auto flex w-full max-w-[1502px] flex-col gap-[30px] break-words',
        className,
      )}
    >
      {/* top */}
      <div className="grid gap-[30px] md:grid-flow-dense md:grid-cols-2 xl:grid-cols-[352px_minmax(0,1fr)_352px] xl:gap-[31px]">
        <SmallFeature
          lead="See exactly where every dollar goes the moment it's spent, no end-of-month surprises."
          title="Real-time spend tracking"
        >
          <div
            aria-hidden
            className="relative h-[264px] w-full overflow-hidden rounded-[12px] border border-[#242424] bg-[#1a1a1a]"
          >
            <img
              alt=""
              className="absolute inset-x-0 top-[63px] bottom-0 h-[calc(100%-63px)] w-full"
              src={asset('analytics.png')}
            />
            <div className="relative flex items-center gap-2 px-[31px] pt-[31px]">
              <span className="flex size-6 items-center justify-center rounded-full border border-[#236456] bg-[#112220]">
                <img alt="" height={9.37685} src={asset('arrow-up.svg')} width={7.87736} />
              </span>
              <span className="text-sm leading-[19.6px] font-medium text-[#33c6ab]">14.12%</span>
            </div>
          </div>
        </SmallFeature>

        <div
          className={cn(
            card,
            'flex flex-col items-center gap-[18px] px-6 pt-8 pb-6 md:col-span-2 md:px-[37px] xl:col-span-1 xl:h-[496px]',
          )}
        >
          <div className="flex flex-col items-center gap-[10px] text-center">
            <h3 className="text-[28px] leading-[42px] font-bold text-white">Team expense management</h3>
            <p className="max-w-[495px] text-xl leading-[36px] text-[#828282]">
              Set budgets by team, route approvals automatically, and keep everyone accountable.
            </p>
          </div>
          <div
            aria-hidden
            className="relative aspect-[660/304] w-full max-w-[660px] rounded-[16px] bg-[#1a1a1a]"
          >
            <img
              alt=""
              className="absolute top-[8.55%] left-[3.96%] h-[65.46%] w-[91.75%]"
              height={199}
              src={asset('graph.svg')}
              width={605.553}
            />
            <div
              className={cn(
                inter.className,
                'absolute top-[80.26%] left-[4.28%] flex w-[88.49%] justify-between text-[8px] leading-5 font-medium text-[#828282]',
              )}
            >
              {timeLabels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
        </div>

        <SmallFeature
          lead="Finance, managers, and employees work from the same live numbers — no spreadsheets, no back-and-forth."
          title="Effortless collaboration"
        >
          <div aria-hidden className="relative mx-auto h-[264px] w-[264px]">
            <div className="absolute inset-0 rounded-full border border-[#242424] bg-[#171717]" />
            <div className="absolute inset-[28px] rounded-full border border-[#242424] bg-[#1a1a1a]" />
            <div className="absolute inset-0 flex items-center justify-center">
              {team.map(([base, ...covers]) => (
                <div className="relative -mr-[23px] size-12 last:mr-0" key={base}>
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    <img alt="" className="size-full" src={asset(base)} />
                  </div>
                  {covers.map((cover) => (
                    <img
                      alt=""
                      className="absolute inset-0 size-full rounded-full object-cover"
                      key={cover}
                      src={asset(cover)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </SmallFeature>
      </div>

      {/* below */}
      <div className="grid gap-[30px] xl:grid-cols-2">
        <div className={cn(card, 'flex flex-col px-6 pt-8 md:px-[36px] md:pt-[36px] xl:h-[496px]')}>
          <div className="flex flex-col gap-[10px]">
            <h3 className="text-[28px] leading-[42px] font-bold text-white">
              Real-time accounting at your fingertips.
            </h3>
            <p className="max-w-[660px] text-xl leading-[36px] text-[#828282]">
              Say goodbye to manual spreadsheets and endless email reminders. Ledgerly gives your
              team a live view of every transaction, the moment it happens.
            </p>
          </div>

          <div
            aria-hidden
            className="mt-6 flex flex-col gap-4 md:mt-2 md:flex-row-reverse md:items-end md:justify-between"
          >
            {/* invoice list */}
            <div className="flex w-full min-w-0 flex-col gap-[21px] rounded-[16px] bg-[#1a1a1a] px-[21px] py-[19px] md:mr-[12.5px] md:mb-[39px] md:max-w-[311px]">
              <p className="text-lg leading-5 font-medium text-white">MonthlyInvoice</p>
              {invoices.map(({ bar, dots, icon, name }) => (
                <div className="flex items-start justify-between gap-3" key={name}>
                  <div className="flex min-w-0 items-start gap-3">
                    <img alt="" className="shrink-0" height={44} src={asset(icon)} width={44} />
                    <div className="flex h-[42px] min-w-0 flex-col justify-end gap-[11px]">
                      <p className="truncate text-sm leading-[14px] text-white">{name}</p>
                      <div className={cn('h-2 max-w-full rounded-full bg-[#333]', bar)} />
                    </div>
                  </div>
                  <img
                    alt=""
                    className={cn('shrink-0', dots)}
                    height={12.5794}
                    src={asset('vector-more.svg')}
                    width={2.79542}
                  />
                </div>
              ))}
            </div>

            {/* receipt — runs off the card's bottom edge, as in the design */}
            <div className="relative h-[185px] w-full min-w-0 shrink-0 overflow-hidden rounded-t-[16px] bg-[#1a1a1a] md:max-w-[303px] md:shrink">
              <p className="absolute top-[27px] left-[22px] text-[30px] leading-10 font-bold whitespace-nowrap text-white">
                $3453.00
              </p>
              <img
                alt=""
                className="absolute top-[88px] left-[24px] max-w-none"
                height={1}
                src={asset('line.svg')}
                width={303}
              />
              <div className="absolute top-[116px] left-[23px] flex w-[243px] flex-col gap-[10px]">
                <div className="h-[10px] w-full rounded-full bg-[#333]" />
                <div className="h-[10px] w-full rounded-full bg-[#333]" />
                <div className="h-[10px] w-[160.123px] rounded-full bg-[#333]" />
              </div>
              <img
                alt=""
                className="absolute top-[191.2px] left-[20.2px] max-w-none"
                height={53.6}
                src={asset('avatar.png')}
                width={53.6}
              />
              <p className="absolute top-[195px] left-[80px] text-xl tracking-[-0.5px] whitespace-nowrap text-white">
                Ashley Cooper
              </p>
              <img
                alt=""
                className="absolute top-[227px] left-[79.88px] max-w-none"
                height={10}
                src={asset('stars.svg')}
                width={80.6789}
              />
              <div className="absolute top-[266px] left-[24px] h-7 w-[240px] text-xs leading-[14px] font-medium whitespace-nowrap text-white">
                <span className="absolute top-[7px] left-0">$500</span>
                <span className="absolute top-[7px] left-[67px]">$600</span>
                <span className="absolute top-0 left-[119px] h-7 w-[62px] rounded-full bg-[#a3dc2f]" />
                <span className="absolute top-[7px] left-[135px] text-black">$700</span>
                <span className="absolute top-[7px] left-[200px]">Others</span>
              </div>
              <img
                alt=""
                className="absolute top-[322px] left-[24px]"
                height={44}
                src={asset('icon-pdf-receipt.svg')}
                width={44}
              />
              <p className="absolute top-[328px] left-[80px] text-sm leading-[14px] whitespace-nowrap text-white">
                finance recipt_download.Pdf
              </p>
              <div className="absolute top-[353px] left-[80px] h-2 w-[132px] rounded-full bg-[#333]" />
            </div>
          </div>
        </div>

        <div
          className={cn(
            card,
            'flex flex-col items-start px-6 py-8 md:px-[51px] md:pt-[47px] md:pb-[48px] xl:h-[496px]',
          )}
        >
          <h3 className="text-[32px] leading-[44px] font-bold text-white md:text-5xl md:leading-[72px]">
            Optimise team spend, together
          </h3>
          <p className="mt-6 max-w-[631px] text-lg leading-[30px] text-[#828282] md:text-[22px] md:leading-[36px] xl:mt-auto">
            Set budget limits, automate approvals, and give your staff the freedom to spend
            responsibly. Peace of mind for finance, clarity for everyone.
          </p>
          <a
            className={cn(
              inter.className,
              'mt-8 inline-flex h-[60px] w-[200px] items-center justify-center rounded-full bg-white text-lg font-semibold text-[#1d1c20] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:mt-16',
            )}
            href={ctaHref}
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </div>
  )
}
