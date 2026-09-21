'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { cn } from '@/utilities/ui'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /*
   * 最上部はヒーロー上の透明Header（headerThemeに従う）。
   * スクロール後は白背景セクション上でも読めるよう、ページ本来のテーマ色のソリッド背景にする。
   * backdrop-filter / transform は付けない（メニューのfixedオーバーレイがHeader内に閉じ込められるため）。
   * 高さも変えない（stickyは通常フローに場所を取るため、変えるとスクロール中にコンテンツがずれる）。
   */
  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-colors',
        scrolled && 'bg-background shadow-[0_1px_0_0_var(--border)]',
      )}
      {...(theme && !scrolled ? { 'data-theme': theme } : {})}
    >
      <div className="container">
        <div className="py-8 flex justify-between items-center relative z-30">
          <Link href="/">
            <Logo className="dark:invert" loading="eager" priority="high" />
          </Link>
          <HeaderNav data={data} />
        </div>
      </div>
    </header>
  )
}
