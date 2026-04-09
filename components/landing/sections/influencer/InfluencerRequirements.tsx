'use client'

import { useTranslations } from 'next-intl'
import { CheckCircle2 } from 'lucide-react'

const itemKeys = ['1', '2', '3', '4', '5'] as const

export default function InfluencerRequirements() {
  const t = useTranslations('landing.influencerRequirements')

  return (
    <section className="py-24 bg-white">
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

        <div className="max-w-3xl mx-auto">
          {itemKeys.map((key) => (
            <div
              key={key}
              className="flex items-center gap-4 py-4 border-b border-brand-orange-100"
            >
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
              <p className="text-base text-brand-navy/80 leading-relaxed">
                {t(`items.${key}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
