'use client'

import { useTranslations } from 'next-intl'
import { CheckCircle, ShieldCheck, CreditCard, Lock, type LucideIcon } from 'lucide-react'

const requirementKeys = ['followers', 'engagement', 'location'] as const

const trustItems: Array<{ key: 'gdpr' | 'stripe' | 'verification'; Icon: LucideIcon }> = [
  { key: 'gdpr', Icon: ShieldCheck },
  { key: 'stripe', Icon: CreditCard },
  { key: 'verification', Icon: Lock },
]

export default function InfluencerRequirements() {
  const t = useTranslations('influencer.requirements')

  return (
    <section id="requirements" className="section-wash-cream py-20 lg:py-28 px-6 lg:px-10 scroll-mt-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-normal text-slate-900 mb-4 text-center">
          {t('title')}
        </h2>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <ul className="space-y-4">
            {requirementKeys.map((key) => (
              <li key={key} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-base text-slate-700 leading-relaxed">
                  {t(`items.${key}`)}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3 items-start lg:justify-end">
            {trustItems.map(({ key, Icon }) => (
              <div
                key={key}
                className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm"
              >
                <Icon className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-slate-700">
                  {t(`trust.${key}`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
