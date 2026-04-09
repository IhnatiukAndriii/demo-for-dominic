'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/lib/navigation'

export default function InfluencerCTA() {
  const t = useTranslations('landing.influencerCta')

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-br from-brand-navy via-brand-navy-800 to-brand-navy-900 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-orange/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
          {t('headline')}{' '}
          <span className="text-brand-orange font-serif italic font-semibold">{t('headlineAccent')}</span>
        </h2>

        <div className="flex justify-center mb-8">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-orange text-white font-semibold text-lg hover:bg-brand-orange-600 transition-colors"
          >
            {t('cta')}
          </Link>
        </div>

        <p className="text-sm text-white/50">
          {t('trust')}
        </p>
      </div>
    </section>
  )
}
