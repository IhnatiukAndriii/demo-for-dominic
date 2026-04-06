'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/lib/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Globe } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
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

  const navLinks = [
    { href: '#brands', label: t('forBrands') },
    { href: '#influencers', label: t('forInfluencers') },
    { href: '#faq', label: t('faq') },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/fox-logo.png"
              alt="Prüffuchs"
              width={140}
              height={36}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={switchLocale}
              disabled={isPending}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50"
              aria-label={`Switch to ${locale === 'de' ? 'English' : 'Deutsch'}`}
            >
              <Globe className="w-4 h-4" />
              <span>{locale === 'de' ? 'EN' : 'DE'}</span>
            </button>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-gray-600">
                {t('login')}
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-brand-500 hover:bg-brand-600 text-white">
                {t('register')}
              </Button>
            </Link>
          </div>

          {/* Mobile: language + hamburger */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={switchLocale}
              disabled={isPending}
              className="flex items-center gap-1 px-2 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 rounded-lg transition-colors"
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
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
                    <Link href="/login" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full">
                        {t('login')}
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full bg-brand-500 hover:bg-brand-600 text-white">
                        {t('register')}
                      </Button>
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
