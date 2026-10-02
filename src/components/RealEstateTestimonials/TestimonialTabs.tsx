'use client'

/* eslint-disable @next/next/no-img-element -- CMS media URL, sized by the avatar */
import React, { useId, useRef, useState } from 'react'

import { cn } from '@/utilities/ui'

// Figma: Real Estate Template / Quote (node 0:3) の引用文と人物タブ。
// Figma は静止画のみで、中央の人物（0:16）だけが黒背景になっている。これを
// 「選択中の人物」と読んで切り替え式にしたのは推測。外れていた場合は、この
// ファイルをやめて中央を選んだ状態の固定表示に戻せば済むようにしてある。
// 最初の表示は Figma と同じ（中央を選択）なので、JS なしの HTML も Figma どおり。

// Display shape for one person. Kept free of payload-types so the component
// can be previewed with static data, same as RealEstateListings.
export type RealEstateTestimonial = {
  avatarSrc?: string | null
  name: string
  quote: string
  role?: string | null
}

export const TestimonialTabs: React.FC<{ testimonials: RealEstateTestimonial[] }> = ({
  testimonials,
}) => {
  const [active, setActive] = useState(Math.min(1, testimonials.length - 1))
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const id = useId()

  if (testimonials.length === 0) return null

  const current = testimonials[active] ?? testimonials[0]

  // Tabs pattern: arrow keys move between people, Home / End jump to the ends.
  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = testimonials.length - 1
    const next =
      event.key === 'ArrowRight'
        ? (active + 1) % testimonials.length
        : event.key === 'ArrowLeft'
          ? (active - 1 + testimonials.length) % testimonials.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null
    if (next === null) return

    event.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <>
      {/* 0:22: 336px wide, 40px below the bar, 60px above the tabs. */}
      <blockquote
        aria-labelledby={`${id}-tab-${active}`}
        className="mx-auto mt-10 max-w-[336px] text-2xl font-bold tracking-[-0.025em] text-black"
        id={`${id}-panel`}
        role="tabpanel"
      >
        <p>{current.quote}</p>
      </blockquote>

      {/* 0:4 / 0:16 / 0:10: 336×141 each, the selected one black. */}
      <div
        className="mt-[60px] grid gap-[30px] md:grid-cols-3"
        onKeyDown={onKeyDown}
        role="tablist"
      >
        {testimonials.map(({ avatarSrc, name, role }, index) => {
          const selected = index === active

          return (
            <button
              aria-controls={`${id}-panel`}
              aria-selected={selected}
              className={cn(
                'flex h-[141px] cursor-pointer items-center gap-5 px-10 text-left text-[15px] tracking-[-0.025em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffac12]',
                selected ? 'bg-black text-white' : 'bg-white text-black',
              )}
              id={`${id}-tab-${index}`}
              key={index}
              onClick={() => setActive(index)}
              ref={(element) => {
                tabRefs.current[index] = element
              }}
              role="tab"
              tabIndex={selected ? 0 : -1}
              type="button"
            >
              <span className="relative size-[49px] shrink-0 overflow-hidden rounded-full bg-neutral-200">
                {avatarSrc && (
                  <img alt="" className="absolute inset-0 size-full object-cover" src={avatarSrc} />
                )}
              </span>
              <span className="flex min-w-0 flex-col gap-1">
                <span className="font-bold">{name}</span>
                {role && <span className="text-[#979797]">{role}</span>}
              </span>
            </button>
          )
        })}
      </div>
    </>
  )
}
