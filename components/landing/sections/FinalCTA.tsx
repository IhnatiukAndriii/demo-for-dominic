import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CALENDLY_URL } from '@/lib/site-config'

export default function FinalCTA() {
  const t = useTranslations('landing.finalCta')

  return (
    <section
      id="final-cta"
      className="relative py-24 lg:py-32 bg-gradient-to-br from-brand-navy via-brand-navy-800 to-brand-navy-900 overflow-hidden"
    >
      {/* Decorative blur circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-orange/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Label */}
        <p className="tracking-widest text-sm text-brand-orange font-semibold mb-4">
          {t('label')}
        </p>

        {/* Headline */}
        <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
          {t('headline')}{' '}
          <span className="text-brand-orange font-serif italic font-semibold">{t('headlineAccent')}</span>
        </h2>

        {/* Subhead */}
        <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
          {t('subhead')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-orange text-white font-semibold text-lg hover:bg-brand-orange-600 transition-colors"
          >
            {t('ctaPrimary')}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold text-lg hover:border-white/60 transition-colors"
          >
            {t('ctaSecondary')}
          </a>
        </div>

        {/* Trust text */}
        <p className="text-sm text-white/50">
          {t('trust')}
        </p>
      </div>
    </section>
  )
}
