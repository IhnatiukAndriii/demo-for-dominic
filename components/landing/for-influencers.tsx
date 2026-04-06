import { useTranslations } from 'next-intl'
import { Gift, MousePointerClick, Wallet, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function ForInfluencers() {
  const t = useTranslations('landing.influencers')

  const benefits = [
    {
      icon: <Gift className="w-6 h-6 text-brand-600" />,
      title: t('benefit1Title'),
      desc: t('benefit1Desc'),
    },
    {
      icon: <MousePointerClick className="w-6 h-6 text-brand-600" />,
      title: t('benefit2Title'),
      desc: t('benefit2Desc'),
    },
    {
      icon: <Wallet className="w-6 h-6 text-brand-600" />,
      title: t('benefit3Title'),
      desc: t('benefit3Desc'),
    },
  ]

  const requirements = [
    t('req1'),
    t('req2'),
    t('req3'),
  ]

  return (
    <section id="influencers" className="bg-brand-50 py-20 lg:py-28 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Left: benefits */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white text-brand-700 text-sm font-medium px-4 py-1.5 rounded-full border border-brand-200 mb-5">
              <span>⭐</span>
              <span>{t('badge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {t('subtitle')}
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-white rounded-xl p-5 border border-brand-100 shadow-sm">
                  <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-500">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: requirements + CTA */}
          <div className="mt-12 lg:mt-0">
            <div className="bg-white rounded-2xl border border-brand-100 shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {t('requirementsTitle')}
              </h3>
              <ul className="space-y-3 mb-8">
                {requirements.map((req, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{req}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                {t('cta')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Social proof placeholder */}
            <p className="text-center text-sm text-gray-500 mt-4">
              🇩🇪 🇦🇹 &nbsp; Deutschland & Österreich
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
