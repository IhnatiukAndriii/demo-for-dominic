'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { buttonVariants } from '@/components/ui/button'
import { CALENDLY_URL } from '@/lib/site-config'
const ROTATION_INTERVAL_MS = 2500
const FADE_DURATION_MS = 200

const AVATAR_SRCS = [
  '/prueffuchs-creator-01.jpg',
  '/prueffuchs-creator-02.jpg',
  '/prueffuchs-creator-03.jpg',
]

export default function Hero() {
  const t = useTranslations('landing.hero')
  const rotatingKeywords = t.raw('rotatingKeywords') as string[]

  const [keywordIndex, setKeywordIndex] = useState(0)
  const [keywordVisible, setKeywordVisible] = useState(true)

  useEffect(() => {
    if (!rotatingKeywords || rotatingKeywords.length === 0) return
    const interval = setInterval(() => {
      setKeywordVisible(false)
      setTimeout(() => {
        setKeywordIndex((prev) => (prev + 1) % rotatingKeywords.length)
        setKeywordVisible(true)
      }, FADE_DURATION_MS)
    }, ROTATION_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [rotatingKeywords])

  const currentKeyword = rotatingKeywords?.[keywordIndex] ?? ''

  return (
    <section
      id="hero"
      className="hero-strong-wash relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden="true">
        <Image
          src="/marketplaces/amazon.svg"
          alt=""
          width={80}
          height={80}
          className="absolute top-10 left-16 w-14 opacity-60 drop-shadow-md"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <Image
          src="/marketplaces/otto.svg"
          alt=""
          width={80}
          height={80}
          className="absolute top-24 right-1/3 w-12 opacity-50 drop-shadow-md"
          style={{ transform: 'rotate(12deg)' }}
        />
        <Image
          src="/marketplaces/kaufland.svg"
          alt=""
          width={80}
          height={80}
          className="absolute bottom-24 left-1/4 w-16 opacity-55 drop-shadow-md"
          style={{ transform: 'rotate(-4deg)' }}
        />
        <Image
          src="/marketplaces/zalando.svg"
          alt=""
          width={80}
          height={80}
          className="absolute top-40 right-10 w-10 opacity-50 drop-shadow-md"
          style={{ transform: 'rotate(8deg)' }}
        />
        <Image
          src="/marketplaces/shopify.svg"
          alt=""
          width={80}
          height={80}
          className="absolute bottom-16 left-10 w-12 opacity-60 drop-shadow-md"
          style={{ transform: 'rotate(-12deg)' }}
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[40fr_60fr] gap-10 lg:gap-12 items-center">
          <div className="min-w-0 w-full z-10 lg:w-full">
            <h1 className="anim-fade-up text-5xl lg:text-6xl font-normal text-slate-900 leading-[1.1]">
              {t('headlinePrefix')}
              <span
                className="inline-block text-orange-500 transition-opacity duration-200"
                style={{
                  opacity: keywordVisible ? 1 : 0,
                  minWidth: '6ch',
                }}
              >
                {currentKeyword}
              </span>
            </h1>

            <p className="anim-fade-up delay-150 mt-6 text-lg lg:text-xl text-slate-600 max-w-xl">
              {t('subline')}
            </p>

            <div className="anim-fade-up delay-300 mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonVariants({ size: 'lg' })} h-12 px-6 text-base bg-orange-500 hover:bg-orange-600 text-white`}
              >
                {t('ctaPrimary')}
              </a>
              <Link
                href="/influencer"
                className={`${buttonVariants({ size: 'lg', variant: 'ghost' })} h-12 px-6 text-base text-slate-900 hover:bg-slate-100`}
              >
                {t('ctaSecondary')}
              </Link>
            </div>
          </div>

          <div className="relative min-w-0 flex justify-center lg:justify-end">
            <div className="relative w-full">
              <div className="anim-fade-scale delay-400 relative md:min-w-[600px] lg:min-w-[720px] lg:w-[56%] lg:max-w-[720px] max-w-[820px] rounded-2xl shadow-2xl overflow-hidden bg-white" style={{ width: '100%' }}>
                <Image
                  src="/hero-dashboard.png"
                  alt="Prüffuchs Dashboard"
                  width={1280}
                  height={900}
                  priority
                  className="w-full h-auto"
                />
              </div>

              <div className="anim-fade-up delay-700 absolute -bottom-6 left-6 flex items-center">
                {AVATAR_SRCS.map((src, i) => (
                  <Avatar key={src} src={src} index={i} />
                ))}
              </div>

              <div className="anim-fade-left delay-800 hidden md:block absolute -right-8 lg:-right-16 -bottom-4 lg:-bottom-8 w-32 lg:w-40 z-20">
                <Image
                  src="/prueffuchs-mascot-full.png"
                  alt="Prüffuchs Mascot"
                  width={500}
                  height={600}
                  priority
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 lg:h-16">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}

function Avatar({ src, index }: { src: string; index: number }) {
  const [errored, setErrored] = useState(false)
  return (
    <div
      className={`relative w-12 h-12 rounded-full ring-2 ring-white overflow-hidden bg-slate-200 ${
        index > 0 ? '-ml-3' : ''
      }`}
      style={{ zIndex: 10 - index }}
    >
      {!errored && (
        <Image
          src={src}
          alt=""
          width={48}
          height={48}
          className="w-full h-full object-cover"
          onError={() => setErrored(true)}
        />
      )}
    </div>
  )
}
