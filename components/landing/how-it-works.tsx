import { useTranslations } from 'next-intl'
import { PlusSquare, ShoppingBag, Banknote } from 'lucide-react'

const stepIcons = [
  <PlusSquare key="1" className="w-7 h-7 text-brand-500" />,
  <ShoppingBag key="2" className="w-7 h-7 text-secondary-500" />,
  <Banknote key="3" className="w-7 h-7 text-brand-500" />,
]

export default function HowItWorks() {
  const t = useTranslations('landing.howItWorks')

  const steps = [
    {
      number: t('step1Number'),
      title: t('step1Title'),
      desc: t('step1Desc'),
      icon: stepIcons[0],
      accent: 'brand',
    },
    {
      number: t('step2Number'),
      title: t('step2Title'),
      desc: t('step2Desc'),
      icon: stepIcons[1],
      accent: 'secondary',
    },
    {
      number: t('step3Number'),
      title: t('step3Title'),
      desc: t('step3Desc'),
      icon: stepIcons[2],
      accent: 'brand',
    },
  ]

  return (
    <section className="bg-gray-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-500">
            {t('subtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Connector line (desktop only) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-gray-200 z-10" />
              )}

              {/* Number badge */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-5 ${
                step.accent === 'brand' ? 'bg-brand-50' : 'bg-secondary-50'
              }`}>
                {step.icon}
              </div>

              <div className={`text-5xl font-black mb-3 ${
                step.accent === 'brand' ? 'text-brand-100' : 'text-secondary-100'
              }`}>
                {step.number}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
