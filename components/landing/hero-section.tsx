'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'

const MARKETPLACES = ['Amazon', 'Kaufland', 'Otto', 'eBay', 'Shopify']

function DashboardMockup() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden w-full max-w-md mx-auto">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-300" />
          <div className="w-3 h-3 rounded-full bg-yellow-300" />
          <div className="w-3 h-3 rounded-full bg-green-300" />
        </div>
        <span className="text-xs text-gray-400 ml-2 font-medium">Prüffuchs Dashboard</span>
      </div>

      <div className="flex" style={{ height: '320px' }}>
        {/* Mini sidebar */}
        <div className="w-12 bg-gray-900 flex flex-col items-center py-4 gap-4 flex-shrink-0">
          <div className="w-7 h-7 bg-[#E8882E] rounded-lg flex items-center justify-center text-white text-sm">
            🦊
          </div>
          <div className="w-6 h-px bg-gray-700 rounded" />
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-md"
              style={{ backgroundColor: i === 0 ? 'rgba(232,136,46,0.35)' : '#374151' }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 overflow-hidden">
          {/* KPI cards */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { label: 'Kampagnen', value: '12' },
              { label: 'Influencer', value: '847' },
              { label: 'Posts', value: '1.204' },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                <p className="text-gray-400 leading-none mb-1" style={{ fontSize: '9px' }}>
                  {kpi.label}
                </p>
                <p className="text-sm font-bold text-gray-800">{kpi.value}</p>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div className="mb-4">
            <p className="text-gray-400 mb-2" style={{ fontSize: '9px' }}>
              Performance (7 Tage)
            </p>
            <div className="flex items-end gap-1" style={{ height: '48px' }}>
              {[40, 65, 45, 80, 60, 90, 75].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm border border-gray-200"
                  style={{
                    height: `${h}%`,
                    backgroundColor: i === 5 ? '#E8882E' : '#EBF0F7',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Top influencers */}
          <div>
            <p className="text-gray-400 mb-2" style={{ fontSize: '9px' }}>
              Top Influencer
            </p>
            {[
              { name: 'Sarah M.', posts: '12 Posts', color: '#fce7f3' },
              { name: 'Tim K.', posts: '9 Posts', color: '#dbeafe' },
              { name: 'Lena W.', posts: '7 Posts', color: '#dcfce7' },
            ].map((inf) => (
              <div
                key={inf.name}
                className="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0"
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-gray-600 flex-shrink-0"
                  style={{ backgroundColor: inf.color, fontSize: '9px' }}
                >
                  {inf.name[0]}
                </div>
                <span className="text-gray-700 font-medium flex-1 text-xs">{inf.name}</span>
                <span className="font-medium text-xs" style={{ color: '#E8882E', fontSize: '10px' }}>
                  {inf.posts}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HeroSection() {
  const t = useTranslations('landing.hero')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      const timeout = setTimeout(() => {
        setCurrentIndex((i) => (i + 1) % MARKETPLACES.length)
        setVisible(true)
      }, 300)
      return () => clearTimeout(timeout)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden bg-[#EBF0F7]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text + CTAs */}
          <div className="min-w-0 w-full">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white text-brand-700 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 rounded-full border border-brand-100 mb-6 max-w-full shadow-sm">
              <span className="flex-shrink-0">🦊</span>
              <span className="truncate">{t('badge')}</span>
            </div>

            {/* Rotating headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-gray-900 leading-[1.15] tracking-tight mb-6 break-words w-full">
              {t('headlineStart')}{' '}
              <span
                style={{
                  color: '#E8882E',
                  display: 'inline-block',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0px)' : 'translateY(-6px)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                  minWidth: '5ch',
                }}
              >
                {MARKETPLACES[currentIndex]}
              </span>
              <br />{t('headlineSuffix')}
            </h1>

            {/* Subline */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 break-words w-full">
              {t('subline')}
            </p>

            {/* CTAs — brands only */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <a
                href="https://calendly.com/amzideal/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                style={{ backgroundColor: '#E8882E' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d4771f')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#E8882E')}
              >
                {t('ctaBrand')}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://calendly.com/amzideal/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
              >
                {t('ctaDemo')}
              </a>
            </div>
          </div>

          {/* Right: Dashboard mockup */}
          <div className="min-w-0 lg:pl-8">
            <DashboardMockup />
          </div>
        </div>
      </div>

      {/* Trusted by bar */}
      <div className="border-t border-blue-100 bg-white/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-4">
            {t('trustedByLabel')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {['Amazon', 'Shopify', 'Kaufland', 'Otto', 'eBay'].map((brand) => (
              <span key={brand} className="text-sm sm:text-base font-bold text-gray-300 tracking-wide">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
