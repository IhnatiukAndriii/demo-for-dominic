'use client'

import { useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  const t = useTranslations('landing.hero')

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-brand-orange-50 via-brand-cream/30 to-brand-orange-100">
      {/* Subtle radial glows */}
      <div className="absolute top-[-100px] right-[-60px] w-[500px] h-[500px] rounded-full bg-brand-orange/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-40px] w-[400px] h-[400px] rounded-full bg-brand-cream/20 blur-3xl pointer-events-none" />

      {/* Floating decorative badges */}
      <div aria-hidden className="hidden lg:block">
        <div className="absolute top-[15%] left-[8%] w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl animate-float z-10 border border-brand-orange-100">
          {'\u{1F6D2}'}
        </div>
        <div className="absolute top-[12%] right-[8%] w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-xl animate-float-delayed z-10 border border-brand-orange-100">
          {'\u{2B50}'}
        </div>
        <div className="absolute bottom-[30%] left-[5%] w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-xl animate-float-slow z-10 border border-brand-orange-100">
          {'\u{1F4E6}'}
        </div>
        <div className="absolute bottom-[20%] left-[38%] w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl animate-float-delayed z-10 border border-brand-orange-100">
          {'\u{1F4AC}'}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-10 lg:gap-12 items-center">
          {/* Visual composition — shows first on mobile */}
          <div className="relative order-first lg:order-last min-w-0 flex justify-center lg:justify-end overflow-visible">
            <div className="relative flex items-end max-w-full gap-0">
              {/* Mascot — left side, next to dashboard */}
              <div className="relative z-20 -mr-12 flex-shrink-0 self-end hidden lg:block">
                <Image
                  src="/prueffuchs-mascot-full.png"
                  alt="Prüffuchs Mascot"
                  width={500}
                  height={600}
                  priority
                  className="w-[320px] h-auto"
                />
              </div>

              {/* Dashboard screenshot — right side */}
              <div className="relative z-10 w-full sm:w-[400px] lg:w-[560px] flex-shrink min-w-0">
                <div className="relative w-full rounded-2xl shadow-2xl overflow-hidden border border-gray-200/60 bg-white">
                  {/* Browser chrome bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#FF5F57]"></span>
                      <span className="w-3 h-3 rounded-full bg-[#FEBC2E]"></span>
                      <span className="w-3 h-3 rounded-full bg-[#28C840]"></span>
                    </div>
                    <span className="text-xs font-semibold text-gray-500 tracking-wide">
                      Prüffuchs Dashboard
                    </span>
                    <div className="w-7 h-7 rounded-full bg-brand-orange flex items-center justify-center text-[10px] font-bold text-white">
                      D
                    </div>
                  </div>

                  {/* Real dashboard screenshot */}
                  <Image
                    src="/hero-dashboard.png"
                    alt="Prüffuchs Dashboard — real product screenshot"
                    width={1280}
                    height={900}
                    priority
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text content — left column */}
          <div className="order-last lg:order-first min-w-0 w-full z-10">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 bg-brand-orange-50 text-brand-orange-700 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full border border-brand-orange-200 mb-6 shadow-sm">
              <span className="flex-shrink-0">{'\u{1F98A}'}</span>
              <span>{t('badge')}</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-navy leading-[1.1] tracking-tight mb-4">
              {t('headlineLine1Before')}{' '}
              <span className="text-brand-orange font-serif italic font-semibold">{t('headlineAccent')}</span>
              <br />
              {t('headlineLine2')}
              <br />
              {t('headlineLine3')}
            </h1>

            {/* Tagline */}
            <p className="text-lg text-brand-navy italic mb-6">
              {t('tagline')}
            </p>

            {/* Subheadline */}
            <p className="text-lg text-brand-navy/70 leading-relaxed mb-8 max-w-xl">
              {t('subline')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://calendly.com/amzideal/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 bg-brand-orange hover:bg-brand-orange-600"
              >
                {t('ctaPrimary')}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://calendly.com/amzideal/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/80 hover:bg-white text-brand-navy font-semibold rounded-xl border-2 border-brand-orange-200 hover:border-brand-orange transition-all duration-200"
              >
                {t('ctaSecondary')}
              </a>
            </div>
          </div>
        </div>
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full h-12 lg:h-16 text-white"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
        />
      </svg>
    </section>
  )
}
