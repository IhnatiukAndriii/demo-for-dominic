import { useTranslations } from 'next-intl'
import { ShoppingCart, Camera, TrendingUp, ShieldCheck, Users } from 'lucide-react'

export default function PlatformFeatures() {
  const t = useTranslations('landing.platformFeatures')

  return (
    <section id="platform-features" className="py-24 lg:py-32 bg-gradient-to-b from-brand-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="tracking-widest text-sm text-brand-orange font-semibold mb-4">
            {t('label')}
          </p>
          <h2 className="text-4xl lg:text-6xl font-bold text-brand-navy">
            {t('headline')}{' '}
            <span className="text-brand-orange italic">{t('headlineAccent')}</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8">
          {/* Card 1: Real Purchases — tall, spans 2 cols and 2 rows */}
          <div className="lg:col-span-2 lg:row-span-2 rounded-3xl p-8 lg:p-10 border border-brand-orange-100 bg-white hover:border-brand-orange-200 hover:shadow-lg transition-all duration-300">
            <ShoppingCart className="w-10 h-10 text-brand-orange mb-5" />
            <h3 className="text-2xl font-bold text-brand-navy mb-3">
              {t('cards.realPurchases.title')}
            </h3>
            <p className="text-base text-brand-navy/70 mb-6">
              {t('cards.realPurchases.description')}
            </p>
            {/* Order receipt mockup */}
            <div className="bg-white border border-brand-orange-100 rounded-2xl p-5 mt-6 min-h-[8rem]">
              <p className="text-[10px] tracking-widest text-gray-400 font-semibold mb-3">BESTELLUNG #4521</p>
              <p className="text-sm text-brand-navy font-medium mb-3">
                Bio Kaffeebohnen 1kg <span className="text-gray-300">............</span> <span className="font-bold">24,90 €</span>
              </p>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  ✓ Verifiziert
                </span>
                <span className="text-xs text-gray-400">vor 2 Stunden</span>
              </div>
            </div>
          </div>

          {/* Card 2: UGC Content */}
          <div className="lg:col-span-2 rounded-3xl p-8 lg:p-10 border border-brand-orange-100 bg-white hover:border-brand-orange-200 hover:shadow-lg transition-all duration-300">
            <Camera className="w-10 h-10 text-brand-orange mb-5" />
            <h3 className="text-2xl font-bold text-brand-navy mb-3">
              {t('cards.ugc.title')}
            </h3>
            <p className="text-base text-brand-navy/70">
              {t('cards.ugc.description')}
            </p>
          </div>

          {/* Card 3: Ranking Boost */}
          <div className="lg:col-span-2 rounded-3xl p-8 lg:p-10 border border-brand-orange-100 bg-white hover:border-brand-orange-200 hover:shadow-lg transition-all duration-300">
            <TrendingUp className="w-10 h-10 text-brand-orange mb-5" />
            <h3 className="text-2xl font-bold text-brand-navy mb-3">
              {t('cards.ranking.title')}
            </h3>
            <p className="text-base text-brand-navy/70 mb-6">
              {t('cards.ranking.description')}
            </p>
            {/* Trend line SVG */}
            <svg viewBox="0 0 200 60" className="w-full h-20">
              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E07010" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#E07010" stopOpacity={0} />
                </linearGradient>
              </defs>
              <path d="M0 55 Q30 48 60 40 T120 20 T180 12 L200 8 V60 H0Z" fill="url(#trendGrad)" />
              <polyline
                points="0,55 30,48 60,40 90,30 120,20 150,15 180,12 200,8"
                fill="none"
                stroke="#E07010"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Card 4: Pay for Results */}
          <div className="lg:col-span-3 rounded-3xl p-8 lg:p-10 border border-brand-orange-100 bg-white hover:border-brand-orange-200 hover:shadow-lg transition-all duration-300">
            <ShieldCheck className="w-10 h-10 text-brand-orange mb-5" />
            <h3 className="text-2xl font-bold text-brand-navy mb-3">
              {t('cards.payForResults.title')}
            </h3>
            <p className="text-base text-brand-navy/70">
              {t('cards.payForResults.description')}
            </p>
          </div>

          {/* Card 5: DACH Network */}
          <div className="lg:col-span-3 rounded-3xl p-8 lg:p-10 border border-brand-orange-100 bg-white hover:border-brand-orange-200 hover:shadow-lg transition-all duration-300 relative">
            <div className="absolute top-6 right-6 text-2xl">🇩🇪 🇦🇹 🇨🇭</div>
            <Users className="w-10 h-10 text-brand-orange mb-5" />
            <h3 className="text-2xl font-bold text-brand-navy mb-3">
              {t('cards.dach.title')}
            </h3>
            <p className="text-base text-brand-navy/70">
              {t('cards.dach.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
