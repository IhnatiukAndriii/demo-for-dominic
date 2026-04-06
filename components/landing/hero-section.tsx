import { useTranslations } from 'next-intl'
import { ArrowRight, Building2, Zap, Star } from 'lucide-react'
import Link from 'next/link'

function FlowIllustration() {
  const t = useTranslations('landing.hero')

  return (
    <div className="relative w-full overflow-x-auto">
      {/* Connecting line */}
      <div className="absolute top-1/2 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-brand-200 via-secondary-200 to-brand-200 -translate-y-1/2 hidden sm:block" />

      <div className="flex items-stretch justify-between gap-3 sm:gap-4">
        {/* Step 1: Brand */}
        <div className="relative flex-1 min-w-[80px] bg-white rounded-2xl border-2 border-brand-100 p-4 sm:p-5 shadow-md hover:shadow-lg transition-shadow">
          <div className="absolute -top-3 left-4 bg-brand-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            01
          </div>
          <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center mb-3">
            <Building2 className="w-5 h-5 text-brand-600" />
          </div>
          <p className="text-[10px] sm:text-xs font-semibold text-brand-600 uppercase tracking-wide mb-1">
            {t('flowBrand')}
          </p>
          <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">
            {t('flowBrandAction')}
          </p>
        </div>

        {/* Arrow */}
        <div className="flex items-center flex-shrink-0 relative z-10">
          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center shadow-sm">
            <ArrowRight className="w-3 h-3 text-gray-400" />
          </div>
        </div>

        {/* Step 2: Platform */}
        <div className="relative flex-1 min-w-[80px] bg-white rounded-2xl border-2 border-secondary-100 p-4 sm:p-5 shadow-md hover:shadow-lg transition-shadow">
          <div className="absolute -top-3 left-4 bg-secondary-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            02
          </div>
          <div className="w-10 h-10 bg-secondary-50 rounded-xl flex items-center justify-center mb-3">
            <Zap className="w-5 h-5 text-secondary-600" />
          </div>
          <p className="text-[10px] sm:text-xs font-semibold text-secondary-600 uppercase tracking-wide mb-1">
            {t('flowPlatform')}
          </p>
          <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">
            {t('flowPlatformAction')}
          </p>
        </div>

        {/* Arrow */}
        <div className="flex items-center flex-shrink-0 relative z-10">
          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center shadow-sm">
            <ArrowRight className="w-3 h-3 text-gray-400" />
          </div>
        </div>

        {/* Step 3: Influencer */}
        <div className="relative flex-1 min-w-[80px] bg-white rounded-2xl border-2 border-brand-100 p-4 sm:p-5 shadow-md hover:shadow-lg transition-shadow">
          <div className="absolute -top-3 left-4 bg-brand-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            03
          </div>
          <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center mb-3">
            <Star className="w-5 h-5 text-brand-600" />
          </div>
          <p className="text-[10px] sm:text-xs font-semibold text-brand-600 uppercase tracking-wide mb-1">
            {t('flowInfluencer')}
          </p>
          <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">
            {t('flowInfluencerAction')}
          </p>
          <p className="text-[10px] sm:text-xs text-green-600 font-medium mt-1.5 flex items-center gap-1">
            <span>💰</span>
            {t('flowRefund')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function HeroSection() {
  const t = useTranslations('landing.hero')

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-50 rounded-full opacity-40 translate-x-1/2 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-50 rounded-full opacity-30 -translate-x-1/3 translate-y-1/4" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 rounded-full border border-brand-100 mb-6 max-w-full">
              <span className="flex-shrink-0">🦊</span>
              <span className="truncate">{t('badge')}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-gray-900 leading-[1.15] tracking-tight mb-6 break-words">
              {t('headline')}
            </h1>

            {/* Subline */}
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-8 break-words">
              {t('subline')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://calendly.com/amzideal/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                {t('ctaBrand')}
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
              >
                {t('ctaInfluencer')}
              </Link>
            </div>
          </div>

          {/* Right: Flow illustration */}
          <div className="lg:pl-8">
            <FlowIllustration />

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 pt-6 border-t border-gray-100">
              {([t('trust1'), t('trust2'), t('trust3')] as string[]).map((label) => (
                <div key={label} className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-xs">✓</span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
