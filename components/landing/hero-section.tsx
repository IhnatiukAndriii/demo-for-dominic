'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

const MARKETPLACES = ['Amazon', 'Kaufland', 'Otto', 'eBay', 'Shopify']

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
              {t('headlineStart') + ' '}<span
                style={{
                  color: '#E8882E',
                  display: 'inline-block',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0px)' : 'translateY(-6px)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                  minWidth: '5ch',
                }}
              >{MARKETPLACES[currentIndex]}</span>{' ' + t('headlineSuffix')}
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

          {/* Right: Hero visual */}
          <div className="min-w-0 lg:pl-8">
            <Image
              src="/prueffuchs-hero-visual.png"
              alt="Prüffuchs Platform"
              width={580}
              height={480}
              priority
              className="w-full max-w-full lg:max-w-[580px] h-auto mx-auto"
            />
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
