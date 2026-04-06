import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const t = useTranslations('landing.footer')

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/fox-logo-white.png"
              alt="Prüffuchs"
              width={140}
              height={36}
              className="h-9 object-contain"
              style={{ width: 'auto' }}
            />
          </Link>

          {/* Tagline */}
          <p className="text-sm text-center max-w-sm">
            {t('tagline')}
          </p>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/imprint" className="hover:text-white transition-colors">
              {t('imprint')}
            </Link>
            <span className="text-gray-700">·</span>
            <Link href="/privacy" className="hover:text-white transition-colors">
              {t('privacy')}
            </Link>
            <span className="text-gray-700">·</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              {t('contact')}
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-gray-600">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
