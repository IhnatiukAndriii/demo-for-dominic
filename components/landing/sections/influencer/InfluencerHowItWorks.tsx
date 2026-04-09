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

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-center gap-8 md:gap-16">
          <div aria-hidden className="hidden md:block absolute top-10 left-[16%] right-[16%] border-t-2 border-dashed border-brand-orange/40 -z-10" />
          {steps.map((step, i) => (
            <div key={step} className="flex flex-col items-center text-center max-w-xs">
              <div className="relative z-10 w-16 h-16 rounded-full bg-brand-orange text-white text-2xl font-bold flex items-center justify-center mb-4 flex-shrink-0 ring-8 ring-brand-orange-50/30">
                {i + 1}
              </div>
              <h3 className="text-lg font-bold text-brand-navy mb-2">
                {t(`${step}.title`)}
              </h3>
              <p className="text-sm text-brand-navy/70 leading-relaxed">
                {t(`${step}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
