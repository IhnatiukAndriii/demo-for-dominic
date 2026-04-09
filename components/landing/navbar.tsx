'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { useRouter, usePathname, Link } from '@/lib/navigation'
import { Menu, X, Globe } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useTransition } from 'react'

export default function Navbar() {
  const t = useTranslations('landing.nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function switchLocale() {
    const next = locale === 'de' ? 'en' : 'de'
    startTransition(() => {
      router.replace(pathname, { locale: next })
    })
  }

  const anchorLinks = [
    { href: '#brands', label: t('forBrands') },
    { href: '#faq', label: t('faq') },
  ]

  const influencerLink = { href: '/influencer' as const, label: t('forInfluencers') }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-white/70 backdrop-blur-md shadow-sm border-b border-brand-orange-100/50'
          : 'bg-white/70 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[80px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              src="/prueffuchs-logo.png"
              alt="Prüffuchs"
              style={{ height: '56px', width: 'auto' }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <a
              href={anchorLinks[0].href}
              className="px-4 py-2 text-base font-medium text-brand-navy/70 hover:text-brand-orange transition-colors"
            >
              {anchorLinks[0].label}
            </a>
            <Link
              href={influencerLink.href}
              className="px-4 py-2 text-base font-medium text-brand-navy/70 hover:text-brand-orange transition-colors"
            >
              {influencerLink.label}
            </Link>
            <a
              href={anchorLinks[1].href}
              className="px-4 py-2 text-base font-medium text-brand-navy/70 hover:text-brand-orange transition-colors"
            >
              {anchorLinks[1].label}
            </a>
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={switchLocale}
              disabled={isPending}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-brand-navy/70 hover:text-brand-orange rounded-lg transition-colors disabled:opacity-50"
              aria-label={`Switch to ${locale === 'de' ? 'English' : 'Deutsch'}`}
            >
              <Globe className="w-4 h-4" />
              <span>{locale === 'de' ? 'EN' : 'DE'}</span>
            </button>
            <Link href="/login" className="px-5 py-2.5 text-base font-medium text-brand-navy hover:text-brand-orange transition-colors">
              {t('login')}
            </Link>
            <Link href="/signup" className="px-6 py-2.5 text-base font-semibold text-white bg-brand-orange hover:bg-brand-orange-600 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
              {t('register')}
            </Link>
          </div>

          {/* Mobile: language + hamburger */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={switchLocale}
              disabled={isPending}
              className="flex items-center gap-1 px-2 py-2 text-sm font-medium text-brand-navy/70 hover:text-brand-orange rounded-lg transition-colors"
              aria-label={`Switch to ${locale === 'de' ? 'English' : 'Deutsch'}`}
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs">{locale === 'de' ? 'EN' : 'DE'}</span>
            </button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                render={
                  <button
                    className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                    aria-label={t('openMenu')}
                  />
                }
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </SheetTrigger>
              <SheetContent side="right" className="w-72 pt-16">
                <nav className="flex flex-col gap-1">
                  <a
                    href={anchorLinks[0].href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-base font-medium text-brand-navy/70 hover:text-brand-orange rounded-lg transition-colors"
                  >
                    {anchorLinks[0].label}
                  </a>
                  <Link
                    href={influencerLink.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-base font-medium text-brand-navy/70 hover:text-brand-orange rounded-lg transition-colors"
                  >
                    {influencerLink.label}
                  </Link>
                  <a
                    href={anchorLinks[1].href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-base font-medium text-brand-navy/70 hover:text-brand-orange rounded-lg transition-colors"
                  >
                    {anchorLinks[1].label}
                  </a>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
                    <Link href="/login" onClick={() => setMobileOpen(false)} className="w-full text-center px-5 py-2.5 text-base font-medium text-brand-navy hover:text-brand-orange border border-brand-orange-200 rounded-xl transition-colors">
                      {t('login')}
                    </Link>
                    <Link href="/signup" onClick={() => setMobileOpen(false)} className="w-full text-center px-6 py-2.5 text-base font-semibold text-white bg-brand-orange hover:bg-brand-orange-600 rounded-xl shadow-md transition-all duration-200">
                      {t('register')}
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
