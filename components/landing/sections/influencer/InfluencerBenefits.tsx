'use client'

import { useTranslations } from 'next-intl'
import { Gift, DollarSign, Sparkles, Users } from 'lucide-react'

const icons = [Gift, DollarSign, Sparkles, Users]
const cardKeys = ['freeProducts', 'fullRefund', 'creativeFreeedom', 'community'] as const

export default function InfluencerBenefits() {
  const t = useTranslations('landing.influencerBenefits')

  return (
    <section id="benefits" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="tracking-widest text-sm text-brand-orange font-semibold mb-4">
            {t('label')}
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-brand-navy">
            {t('headline')}{' '}
            <span className="text-brand-orange font-serif italic font-semibold">{t('headlineAccent')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardKeys.map((key, i) => {
            const Icon = icons[i]
            return (
              <div
                key={key}
                className="rounded-2xl p-8 border border-brand-orange-100 bg-brand-orange-50/30 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="text-lg font-bold text-brand-navy mb-2">
                  {t(`cards.${key}.title`)}
                </h3>
                <p className="text-sm text-brand-navy/70 leading-relaxed">
                  {t(`cards.${key}.description`)}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
