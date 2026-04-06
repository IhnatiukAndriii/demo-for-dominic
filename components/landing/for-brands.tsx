import { useTranslations } from 'next-intl'
import { ShoppingCart, Camera, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react'

const benefitIcons = [
  <ShoppingCart key="1" className="w-6 h-6 text-brand-600" />,
  <Camera key="2" className="w-6 h-6 text-secondary-600" />,
  <TrendingUp key="3" className="w-6 h-6 text-secondary-600" />,
  <CheckCircle2 key="4" className="w-6 h-6 text-brand-600" />,
]

export default function ForBrands() {
  const t = useTranslations('landing.brands')

  const benefits = [
    {
      icon: benefitIcons[0],
      title: t('benefit1Title'),
      desc: t('benefit1Desc'),
      bg: 'bg-brand-50',
    },
    {
      icon: benefitIcons[1],
      title: t('benefit2Title'),
      desc: t('benefit2Desc'),
      bg: 'bg-secondary-50',
    },
    {
      icon: benefitIcons[2],
      title: t('benefit3Title'),
      desc: t('benefit3Desc'),
      bg: 'bg-secondary-50',
    },
    {
      icon: benefitIcons[3],
      title: t('benefit4Title'),
      desc: t('benefit4Desc'),
      bg: 'bg-brand-50',
    },
  ]

  return (
    <section id="brands" className="bg-white py-20 lg:py-28 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Left: header + pricing + CTA */}
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary-50 text-secondary-700 text-sm font-medium px-4 py-1.5 rounded-full border border-secondary-100 mb-5">
              <span>🏢</span>
              <span>{t('badge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-500 mb-8">
              {t('subtitle')}
            </p>

            {/* Pricing teaser */}
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 mb-8">
              <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg">💡</span>
              </div>
              <p className="text-sm font-medium text-gray-700">
                {t('pricingTeaser')}
              </p>
            </div>

            <a
              href="https://calendly.com/amzideal/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              {t('cta')}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Right: benefit cards */}
          <div className="mt-12 lg:mt-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="group bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-6 transition-all duration-200 hover:shadow-md"
              >
                <div className={`w-11 h-11 ${benefit.bg} rounded-xl flex items-center justify-center mb-4`}>
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1.5">{benefit.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
