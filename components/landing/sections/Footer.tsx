import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const t = useTranslations('landing.footer')

  return (
    <footer id="footer" className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-6">
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

          <p className="text-sm text-center max-w-sm">
            {t('tagline')}
          </p>

          <nav className="flex items-center gap-6 text-sm">
            <Link href="/imprint" className="hover:text-white transition-colors">
              {t('imprint')}
            </Link>
            <span className="text-gray-700">&middot;</span>
            <Link href="/privacy" className="hover:text-white transition-colors">
              {t('privacy')}
            </Link>
            <span className="text-gray-700">&middot;</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              {t('contact')}
            </Link>
          </nav>

          <p className="text-xs text-gray-600">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
