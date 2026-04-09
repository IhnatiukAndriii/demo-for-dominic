import { useTranslations } from 'next-intl'
import { siteConfig } from '@/lib/site-config'

const statKeys = ['creators', 'campaigns', 'refundTime'] as const

export default function StatsBar() {
  const t = useTranslations('stats')

  return (
    <section id="stats-bar" className="relative bg-brand-navy text-white py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-sm uppercase tracking-widest text-brand-orange mb-4">
          {t('label')}
        </p>
        <h2 className="text-center text-3xl lg:text-5xl font-bold mb-16 animate-fade-in-up">
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

        <div className="text-center mt-12">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-orange/15 border border-brand-orange/40 text-brand-orange text-sm font-semibold tracking-wider uppercase backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
            Launch-Phase · Werte werden täglich aktualisiert
          </span>
        </div>
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full h-12 lg:h-16 text-brand-orange-50"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
        />
      </svg>
    </section>
  )
}
