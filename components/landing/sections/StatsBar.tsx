import { useTranslations } from 'next-intl'
import { siteConfig } from '@/lib/site-config'

const statKeys = ['creators', 'campaigns', 'refundTime'] as const

export default function StatsBar() {
  const t = useTranslations('stats')

  return (
    <section id="stats-bar" className="bg-brand-navy text-white py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-sm uppercase tracking-widest text-brand-orange mb-4">
          {t('label')}
        </p>
        <h2 className="text-center text-3xl lg:text-5xl font-bold mb-16">
          {t('headline')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {statKeys.map((key) => {
            const stat = siteConfig.stats[key]
            return (
              <div key={key} className="text-center">
                <div className="w-12 h-0.5 bg-brand-orange mx-auto mb-6" />
                <p className="text-5xl lg:text-7xl font-bold text-brand-orange">
                  {stat.value}
                </p>
                <p className="text-base lg:text-lg text-white/80 mt-3">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
