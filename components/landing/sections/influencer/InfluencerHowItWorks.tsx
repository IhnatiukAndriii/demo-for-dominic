'use client'

import { useTranslations } from 'next-intl'

const steps = ['step1', 'step2', 'step3', 'step4'] as const

export default function InfluencerHowItWorks() {
  const t = useTranslations('influencer.howItWorks')

  return (
    <section id="how-it-works" className="bg-white py-20 lg:py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-normal text-slate-900 mb-4 text-center">
          {t('title')}
        </h2>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {steps.map((step, i) => (
            <div
              key={step}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:p-8"
            >
              <div className="w-10 h-10 rounded-full bg-orange-500 text-white font-semibold flex items-center justify-center mb-4">
                {i + 1}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {t(`${step}.title`)}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t(`${step}.body`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
