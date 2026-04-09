'use client'

import { useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/lib/navigation'

export default function InfluencerHero() {
  const t = useTranslations('landing.influencerHero')

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-cream/40 via-brand-orange-50 to-white">
      <div className="absolute top-[-100px] right-[-60px] w-[500px] h-[500px] rounded-full bg-brand-orange/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-40px] w-[400px] h-[400px] rounded-full bg-brand-cream/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Text content */}
          <div className="z-10">
            <div className="inline-flex items-center gap-2 bg-brand-orange-50 text-brand-orange-700 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full border border-brand-orange-200 mb-6 shadow-sm">
              <span className="flex-shrink-0">{'\u{1F98A}'}</span>
              <span>{t('badge')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-navy leading-[1.1] tracking-tight mb-4">
              {t('headline')}{' '}
              <span className="text-brand-orange font-serif italic font-semibold">{t('headlineAccent')}</span>
            </h1>

            <p className="text-lg text-brand-navy italic mb-4">
              {t('tagline')}
            </p>

            <p className="text-lg text-brand-navy/70 leading-relaxed mb-8 max-w-xl">
              {t('subhead')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 bg-brand-orange hover:bg-brand-orange-600"
              >
                {t('ctaPrimary')}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#benefits"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/80 hover:bg-white text-brand-navy font-semibold rounded-xl border-2 border-brand-orange-200 hover:border-brand-orange transition-all duration-200"
              >
                {t('ctaSecondary')}
              </a>
            </div>
          </div>

          {/* Visual — phone mockup + mascot */}
          <div className="relative hidden lg:flex justify-center items-end">
            {/* Mascot */}
            <div className="relative z-20 -mr-4 flex-shrink-0 self-end">
              <Image
                src="/prueffuchs-mascot-full.png"
                alt="Prueffuchs Mascot"
                width={440}
                height={528}
                priority
                className="w-[220px] h-auto"
              />
            </div>

            {/* Phone mockup */}
            <div className="relative z-10 w-[280px] rounded-3xl bg-white shadow-2xl border border-gray-200/60 overflow-hidden flex-shrink-0">
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-gray-400">Prueffuchs App</span>
                <div className="w-5 h-5 rounded-full bg-brand-orange flex items-center justify-center text-[8px] font-bold text-white">PF</div>
              </div>

              <div className="p-4 space-y-3">
                <div className="rounded-xl border border-gray-100 p-3 shadow-sm">
                  <div className="w-full h-28 bg-brand-orange-50 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-3xl">{'\u2615'}</span>
                  </div>
                  <p className="text-sm font-semibold text-brand-navy mb-1">Bio Kaffeebohnen Test</p>
                  <p className="text-xs text-gray-500 mb-3">Premium Coffee Co.</p>
                  <div className="w-full py-2 rounded-lg bg-brand-orange text-white text-center text-xs font-semibold">
                    Bewerben
                  </div>
                </div>

                <div className="rounded-xl border border-gray-100 p-3 shadow-sm opacity-60">
                  <div className="w-full h-12 bg-gray-50 rounded-lg mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-3/4 mb-1" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
