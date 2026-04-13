'use client'

import { useTranslations } from 'next-intl'
import { Package, Wallet, CalendarCheck, type LucideIcon } from 'lucide-react'

const items: Array<{ key: 'authentic' | 'fair' | 'flexible'; Icon: LucideIcon }> = [
  { key: 'authentic', Icon: Package },
  { key: 'fair', Icon: Wallet },
  { key: 'flexible', Icon: CalendarCheck },
]

export default function InfluencerBenefits() {
  const t = useTranslations('influencer.benefits')

  return (
    <section id="benefits" className="section-wash-orange py-20 lg:py-28 px-6 lg:px-10 scroll-mt-16">
      <span id="categories" className="block scroll-mt-24" aria-hidden />
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-normal text-slate-900 mb-4 text-center">
          {t('title')}
        </h2>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ key, Icon }) => (
            <div
              key={key}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 p-6 lg:p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-5">
                <Icon className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t(`items.${key}.body`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
