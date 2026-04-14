'use client'

import { useState, useEffect, useTransition } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname, Link, brandNav, creatorNav, type LandingNav, type NavItem, type NavGroup } from '@/lib/navigation'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

function isAnchorOrExternal(href: string, external?: boolean) {
  return Boolean(external) || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('http')
}

function NavLinkRenderer({
  item,
  className,
  onClick,
}: {
  item: NavItem
  className?: string
  onClick?: () => void
}) {
  if (isAnchorOrExternal(item.href, item.external)) {
    return (
      <a
        href={item.href}
        onClick={onClick}
        className={className}
        {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {item.label}
      </a>
    )
  }
  return (
    <Link href={item.href} onClick={onClick} className={className}>
      {item.label}
    </Link>
  )
}

function BrandDesktopNav({ nav }: { nav: LandingNav }) {
  return (
    <NavigationMenu className="max-w-none">
      <NavigationMenuList className="gap-1">
        {nav.groups.map((group) => (
          <NavigationMenuItem key={group.label}>
            <NavigationMenuTrigger className="text-base font-medium text-brand-navy/80 hover:text-brand-orange data-popup-open:text-brand-orange data-open:text-brand-orange">
              {group.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[260px]">
              <ul className="flex flex-col gap-1 p-2">
                {group.items.map((item) => (
                  <li key={`${group.label}-${item.label}`}>
                    <NavigationMenuLink
                      render={
                        <NavLinkRenderer
                          item={item}
                          className="block rounded-md px-3 py-2 text-sm font-medium text-brand-navy hover:bg-brand-orange-50 hover:text-brand-orange transition-colors"
                        />
                      }
                    />
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
        {nav.links.map((link) => (
          <NavigationMenuItem key={link.label}>
            <NavigationMenuLink
              render={
                <NavLinkRenderer
                  item={link}
                  className="inline-flex h-9 items-center rounded-lg px-2.5 text-base font-medium text-brand-navy/80 hover:text-brand-orange transition-colors"
                />
              }
            />
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function CreatorDesktopNav({ nav }: { nav: LandingNav }) {
  const categoryGroup: NavGroup | undefined = nav.groups[0]
  return (
    <nav className="flex items-center gap-2">
      {nav.links.map((link) => (
        <NavLinkRenderer
          key={link.label}
          item={link}
          className="px-3 py-2 text-base font-medium text-brand-navy/80 hover:text-brand-orange transition-colors"
        />
      ))}
      {categoryGroup && (
        <div className="relative group">
          <button
            type="button"
            className="inline-flex items-center gap-1 px-3 py-2 text-base font-medium text-brand-navy/80 hover:text-brand-orange transition-colors"
          >
            {categoryGroup.label}
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          </button>
          <div className="absolute left-0 top-full mt-2 min-w-[220px] rounded-lg bg-white shadow-lg ring-1 ring-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-150 z-50">
            <ul className="flex flex-col gap-1 p-2">
              {categoryGroup.items.map((item) => (
                <li key={item.label}>
                  <NavLinkRenderer
                    item={item}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-brand-navy hover:bg-brand-orange-50 hover:text-brand-orange transition-colors"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  )
}

export default function Navbar() {
  const t = useTranslations('landingNav')
  const tLegacy = useTranslations('landing.nav')
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

  const isCreatorView = pathname.startsWith('/influencer')
  const nav: LandingNav = isCreatorView ? creatorNav(t) : brandNav(t)

  const pillBase =
    'inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200'
  const pillActive = 'bg-brand-orange text-white shadow-sm'
  const pillInactive = 'bg-transparent text-brand-navy/70 hover:text-brand-navy'

  function goToBrand() {
    startTransition(() => {
      router.push('/')
    })
  }
  function goToCreator() {
    startTransition(() => {
      router.push('/influencer')
    })
  }

  return (
    <header
      data-view-toggle-host
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-white/70 backdrop-blur-md shadow-sm border-b border-brand-orange-100/50'
          : 'bg-white/70 backdrop-blur-md'
      }`}
    >
      <div className="hidden md:block border-b border-slate-100/80 bg-white/70 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-center">
          <div
            role="tablist"
            aria-label={isCreatorView ? t('toggleCreator') : t('toggleBrand')}
            className="inline-flex items-center gap-1 rounded-full bg-gray-100 p-1 view-toggle segmented"
            data-view-toggle
          >
            <button
              type="button"
              role="tab"
              aria-selected={!isCreatorView}
              onClick={goToBrand}
              disabled={isPending}
              className={`${pillBase} ${!isCreatorView ? pillActive : pillInactive}`}
            >
              {t('toggleBrand')}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={isCreatorView}
              onClick={goToCreator}
              disabled={isPending}
              className={`${pillBase} ${isCreatorView ? pillActive : pillInactive}`}
            >
              {t('toggleCreator')}
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-20">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              src="/prueffuchs-logo.png"
              alt="Prüffuchs"
              className="h-10 lg:h-12 w-auto"
            />
          </Link>

          <div className="hidden lg:flex flex-1 items-center justify-center">
            {isCreatorView ? <CreatorDesktopNav nav={nav} /> : <BrandDesktopNav nav={nav} />}
          </div>

          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <button
              onClick={switchLocale}
              disabled={isPending}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-brand-navy/70 hover:text-brand-orange rounded-lg transition-colors disabled:opacity-50"
              aria-label={`Switch to ${locale === 'de' ? 'English' : 'Deutsch'}`}
            >
              <Globe className="w-4 h-4" />
              <span>{locale === 'de' ? 'EN' : 'DE'}</span>
            </button>
            <NavLinkRenderer
              item={nav.ctaSecondary}
              className="px-4 py-2 text-base font-medium text-brand-navy hover:text-brand-orange transition-colors"
            />
            <NavLinkRenderer
              item={nav.ctaPrimary}
              className="px-5 py-2.5 text-base font-semibold text-white bg-brand-orange hover:bg-brand-orange-600 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            />
          </div>

          <div className="flex lg:hidden items-center gap-1">
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
                    aria-label={tLegacy('openMenu')}
                  />
                }
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </SheetTrigger>
              <SheetContent side="right" className="w-80 pt-16 overflow-y-auto">
                <div className="flex flex-col gap-4">
                  <div
                    role="tablist"
                    className="inline-flex items-center gap-1 rounded-full bg-gray-100 p-1 self-start view-toggle segmented"
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={!isCreatorView}
                      onClick={() => {
                        setMobileOpen(false)
                        goToBrand()
                      }}
                      className={`${pillBase} ${!isCreatorView ? pillActive : pillInactive}`}
                    >
                      {t('toggleBrand')}
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isCreatorView}
                      onClick={() => {
                        setMobileOpen(false)
                        goToCreator()
                      }}
                      className={`${pillBase} ${isCreatorView ? pillActive : pillInactive}`}
                    >
                      {t('toggleCreator')}
                    </button>
                  </div>

                  <nav className="flex flex-col gap-1">
                    {nav.links.map((link) => (
                      <NavLinkRenderer
                        key={link.label}
                        item={link}
                        onClick={() => setMobileOpen(false)}
                        className="px-3 py-2.5 text-base font-medium text-brand-navy hover:text-brand-orange rounded-lg transition-colors"
                      />
                    ))}
                    {nav.groups.map((group) => (
                      <div key={group.label} className="mt-2">
                        <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-navy/50">
                          {group.label}
                        </div>
                        <div className="flex flex-col">
                          {group.items.map((item) => (
                            <NavLinkRenderer
                              key={`${group.label}-${item.label}`}
                              item={item}
                              onClick={() => setMobileOpen(false)}
                              className="px-3 py-2 text-sm font-medium text-brand-navy/80 hover:text-brand-orange rounded-lg transition-colors"
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </nav>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
                    <NavLinkRenderer
                      item={nav.ctaSecondary}
                      onClick={() => setMobileOpen(false)}
                      className="w-full text-center px-5 py-2.5 text-base font-medium text-brand-navy hover:text-brand-orange border border-brand-orange-200 rounded-xl transition-colors"
                    />
                    <NavLinkRenderer
                      item={nav.ctaPrimary}
                      onClick={() => setMobileOpen(false)}
                      className="w-full text-center px-6 py-2.5 text-base font-semibold text-white bg-brand-orange hover:bg-brand-orange-600 rounded-xl shadow-md transition-all duration-200"
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
