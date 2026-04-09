import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

const socialIcons = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.84-.1z"/></svg>
  ),
}

export default function Footer() {
  const t = useTranslations('landing.footer')

  return (
    <footer id="footer" className="bg-brand-navy-900 text-white py-16 lg:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top: Logo + Social */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/prueffuchs-logo.png"
              alt="Prüffuchs"
              width={140}
              height={32}
              style={{ height: '32px', width: 'auto' }}
              className="object-contain brightness-0 invert"
            />
          </Link>
          <div className="flex items-center gap-4">
            {[
              { name: 'Instagram', icon: socialIcons.instagram, href: 'https://instagram.com/prueffuchsde' },
              { name: 'TikTok', icon: socialIcons.tiktok, href: '#' },
              { name: 'Facebook', icon: socialIcons.facebook, href: '#' },
              { name: 'LinkedIn', icon: socialIcons.linkedin, href: '#' },
              { name: 'YouTube', icon: socialIcons.youtube, href: '#' },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="text-white/60 hover:text-brand-orange transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-white/10" />

        {/* 6-column link grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* Für Brands */}
          <div>
            <h4 className="font-semibold text-sm mb-4">{t('columns.forBrands.title')}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">{t('columns.forBrands.platform')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('columns.forBrands.pricing')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('columns.forBrands.demo')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('columns.forBrands.caseStudies')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('columns.forBrands.faq')}</a></li>
            </ul>
          </div>

          {/* Für Creator */}
          <div>
            <h4 className="font-semibold text-sm mb-4">{t('columns.forCreators.title')}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">{t('columns.forCreators.signup')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('columns.forCreators.howItWorks')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('columns.forCreators.benefits')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('columns.forCreators.community')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('columns.forCreators.support')}</a></li>
            </ul>
          </div>

          {/* Unternehmen */}
          <div>
            <h4 className="font-semibold text-sm mb-4">{t('columns.company.title')}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">{t('columns.company.about')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('columns.company.team')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('columns.company.careers')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('columns.company.press')}</a></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{t('columns.company.contact')}</Link></li>
            </ul>
          </div>

          {/* Ressourcen */}
          <div>
            <h4 className="font-semibold text-sm mb-4">{t('columns.resources.title')}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">{t('columns.resources.blog')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('columns.resources.guides')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('columns.resources.webinars')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('columns.resources.partners')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('columns.resources.apiDocs')}</a></li>
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h4 className="font-semibold text-sm mb-4">{t('columns.legal.title')}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/imprint" className="hover:text-white transition-colors">{t('columns.legal.imprint')}</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">{t('columns.legal.privacy')}</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('columns.legal.terms')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('columns.legal.cookies')}</a></li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="font-semibold text-sm mb-4">{t('columns.contactCol.title')}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="mailto:hello@prueffuchs.de" className="hover:text-white transition-colors">{t('columns.contactCol.email')}</a></li>
              <li><span>{t('columns.contactCol.phone')}</span></li>
              <li><span>{t('columns.contactCol.address')}</span></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-white/10" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>{t('copyright')}</p>
          <p>{t('madeWith')}</p>
        </div>
      </div>
    </footer>
  )
}
