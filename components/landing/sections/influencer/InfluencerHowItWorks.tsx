'use client'

import { useTranslations } from 'next-intl'

const steps = ['step1', 'step2', 'step3'] as const

export default function InfluencerHowItWorks() {
  const t = useTranslations('landing.influencerHowItWorksSimple')

  return (
    <section className="py-24 lg:py-32 bg-brand-orange-50/30">
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

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-8 lg:gap-0">
          {steps.map((step, i) => (
            <div key={step} className="flex flex-col lg:flex-row items-center gap-6 lg:gap-0">
              <div className="flex flex-col items-center text-center max-w-xs">
                <div className="w-16 h-16 rounded-full bg-brand-orange text-white text-2xl font-bold flex items-center justify-center mb-4 flex-shrink-0">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-brand-navy mb-2">
                  {t(`${step}.title`)}
                </h3>
                <p className="text-sm text-brand-navy/70 leading-relaxed">
                  {t(`${step}.description`)}
                </p>
              </div>

              {i < steps.length - 1 && (
                <div className="hidden lg:block w-24 border-t-2 border-dashed border-brand-orange/40 mx-6 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
