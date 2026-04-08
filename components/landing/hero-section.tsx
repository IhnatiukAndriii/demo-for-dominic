'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

const MARKETPLACES = ['Amazon', 'Kaufland', 'Otto', 'eBay', 'Shopify']

/* ── Inline SVG brand icons for floating effect ── */

function AmazonIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M29.2 30.8c-5.4 4-13.2 6.1-19.9 6.1-9.4 0-17.9-3.5-24.3-9.3-.5-.5-.1-1.1.5-.7 6.9 4 15.5 6.4 24.3 6.4 6 0 12.5-1.2 18.5-3.8.9-.4 1.7.6.9 1.3z" transform="translate(12 6)" fill="#FF9900"/>
      <path d="M24 14c0-1.7-.2-3.4-.5-4.8-.2-.7-.7-.7-.9 0-.3 1.4-.5 3.1-.5 4.8 0 5.8 2.5 9 6 9s6-3.2 6-9c0-1.7-.2-3.4-.5-4.8-.2-.7-.7-.7-.9 0-.3 1.4-.5 3.1-.5 4.8 0 3.7-1.3 5.5-3.1 5.5S24 17.7 24 14z" fill="#232F3E"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect x="8" y="8" width="32" height="32" rx="9" stroke="url(#ig)" strokeWidth="3" fill="none"/>
      <circle cx="24" cy="24" r="8" stroke="url(#ig)" strokeWidth="3" fill="none"/>
      <circle cx="35" cy="13" r="2.5" fill="url(#ig)"/>
      <defs>
        <linearGradient id="ig" x1="8" y1="40" x2="40" y2="8">
          <stop stopColor="#F58529"/><stop offset=".5" stopColor="#DD2A7B"/><stop offset="1" stopColor="#8134AF"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M33 8h-4.5v22a5.5 5.5 0 11-4.7-5.4v-4.7A10.2 10.2 0 1028.5 30V15.6A12.4 12.4 0 0038 18.5V13.8A9.3 9.3 0 0133 8z" fill="#000"/>
      <path d="M31 6h-4.5v22a5.5 5.5 0 11-4.7-5.4v-4.7A10.2 10.2 0 1026.5 28V13.6A12.4 12.4 0 0036 16.5V11.8A9.3 9.3 0 0131 6z" fill="#69C9D0"/>
      <path d="M32 7h-4.5v22a5.5 5.5 0 11-4.7-5.4v-4.7A10.2 10.2 0 1027.5 29V14.6A12.4 12.4 0 0037 17.5V12.8A9.3 9.3 0 0132 7z" fill="#EE1D52"/>
    </svg>
  )
}

function ShopifyIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M34.5 10.5s-.6-.1-.6-.1-.4-.4-.5-.5c-.1-.1-.3-.1-.4 0l-.7.3s-.5-1.3-1.3-2c-1-.9-2-.6-2.3-.5-.1 0-.2 0-.2-.1-.3-.4-.7-.8-1.1-1-.8-.5-1.9-.5-2.5.1-.2.2-.3.3-.5.6l-.8-.1c-.1 0-.2.1-.2.2l-1.8 13.8 7.6 1.4 4.1-1c0-.1-1.8-11-1.8-11.1z" fill="#95BF47"/>
      <path d="M30.8 10c-.1 0-.2 0-.3.1-.7.2-1.5.5-2.3.8 0-.1-.1-.2-.1-.3-.4-1.1-1-1.8-1.8-2-.2 0-.5.1-.7.2.8.2 1.3.9 1.6 1.8.1.2.1.4.2.6-.8.3-1.7.5-2.6.8.3-1.3.9-2.4 1.8-2.8.3-.1.5-.2.8-.1.6.1 1 .5 1.3 1 .1-.1.1-.1.1-.1z" fill="#5E8E3E"/>
      <path d="M32.5 11l-.1-.4c-.5.2-1 .3-1 .3l-1.8 13.8 4.7-.9S32.6 12.5 32.5 11z" fill="#fff" fillOpacity=".5"/>
      <path d="M26 33l-2.4 7.2s-1-.5-2.1-.5c-1.7 0-1.8 1.1-1.8 1.3 0 1.5 3.8 2 3.8 5.4 0 2.7-1.7 4.4-4 4.4" fill="none"/>
    </svg>
  )
}

function MetaIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M10.5 33c-2.5-4-3.5-7.5-3.5-10 0-4 1.5-6.5 3.5-6.5 1.5 0 3 1.5 5 5l2 3.5c2.5 4.5 4 6.5 6 6.5 3.5 0 6.5-4.5 6.5-11.5 0-5-2.5-10-8.5-10-7 0-13.5 7.5-13.5 16 0 4.5 1.5 8 4 11" stroke="#0081FB" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M37.5 33c2.5-4 3.5-7 3.5-10 0-4-1.5-6.5-3.5-6.5-1.5 0-3 1.5-5 5l-2 3.5" stroke="#0081FB" strokeWidth="3" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

/* ── Floating icon wrapper ── */
function FloatingIcon({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <div className={`absolute hidden lg:flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-lg ${className}`}>
      {children}
    </div>
  )
}

/* ── Dashboard Mockup ── */
function DashboardMockup() {
  return (
    <div className="relative w-full max-w-[580px] h-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200/60">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-xs font-semibold text-gray-500 tracking-wide">Prüffuchs Dashboard</span>
        <div className="w-7 h-7 rounded-full bg-[#E8882E] flex items-center justify-center text-[10px] font-bold text-white">D</div>
      </div>

      <div className="flex min-h-[340px] lg:min-h-[380px]">
        {/* Sidebar */}
        <div className="w-[120px] lg:w-[140px] bg-[#1e2d4a] flex-shrink-0 flex flex-col py-4 px-3">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 rounded-lg bg-[#E8882E] flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">PF</span>
            </div>
            <span className="text-white text-[10px] font-bold hidden lg:block">Prüffuchs</span>
          </div>

          {[
            { icon: '📊', label: 'Dashboard', active: true },
            { icon: '📢', label: 'Kampagnen', active: false },
            { icon: '👥', label: 'Influencer', active: false },
            { icon: '💳', label: 'Billing', active: false },
            { icon: '❓', label: 'Hilfe', active: false },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg mb-1 text-[10px] ${
                item.active
                  ? 'bg-[#E8882E]/20 text-[#E8882E] font-semibold'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <span className="text-xs">{item.icon}</span>
              <span className="hidden lg:inline">{item.label}</span>
            </div>
          ))}

          <div className="mt-auto">
            <div className="w-8 h-8 mx-auto opacity-30">
              <span className="text-2xl">🦊</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-3 lg:p-4 bg-[#f8f9fc] overflow-hidden">
          {/* KPI cards */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { label: 'Kampagnen', value: '12', change: '+3', color: 'text-green-600' },
              { label: 'Influencer', value: '847', change: '+24%', color: 'text-green-600' },
              { label: 'Posts', value: '1.204', change: '+18%', color: 'text-green-600' },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-white rounded-lg p-2 lg:p-2.5 border border-gray-100 shadow-sm">
                <div className="text-[8px] lg:text-[9px] text-gray-400 font-medium mb-1">{kpi.label}</div>
                <div className="text-sm lg:text-base font-bold text-gray-900">{kpi.value}</div>
                <div className={`text-[8px] lg:text-[9px] font-medium ${kpi.color}`}>{kpi.change}</div>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {/* Donut chart */}
            <div className="bg-white rounded-lg p-2 lg:p-3 border border-gray-100 shadow-sm flex flex-col items-center">
              <div className="text-[8px] lg:text-[9px] text-gray-400 font-medium mb-1.5 self-start">Erfolgsrate</div>
              <div className="relative w-16 h-16 lg:w-20 lg:h-20">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#f3f4f6" strokeWidth="3.5" />
                  <circle
                    cx="18" cy="18" r="14" fill="none"
                    stroke="#E8882E" strokeWidth="3.5"
                    strokeDasharray="86.2 87.96"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs lg:text-sm font-bold text-gray-900">98%</span>
                </div>
              </div>
            </div>

            {/* Area chart */}
            <div className="bg-white rounded-lg p-2 lg:p-3 border border-gray-100 shadow-sm">
              <div className="text-[8px] lg:text-[9px] text-gray-400 font-medium mb-1.5">Umsatz</div>
              <svg viewBox="0 0 160 60" className="w-full h-auto">
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E8882E" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#E8882E" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 50 Q20 45 40 38 T80 22 T120 28 T160 10 V60 H0Z"
                  fill="url(#areaGrad)"
                />
                <path
                  d="M0 50 Q20 45 40 38 T80 22 T120 28 T160 10"
                  fill="none" stroke="#E8882E" strokeWidth="2" strokeLinecap="round"
                />
                <g className="text-[6px]" fill="#9ca3af">
                  <text x="5" y="58" fontSize="6">Jan</text>
                  <text x="35" y="58" fontSize="6">Feb</text>
                  <text x="65" y="58" fontSize="6">Mär</text>
                  <text x="95" y="58" fontSize="6">Apr</text>
                  <text x="125" y="58" fontSize="6">Mai</text>
                  <text x="150" y="58" fontSize="6">Jun</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Top influencer list */}
          <div className="bg-white rounded-lg p-2 lg:p-3 border border-gray-100 shadow-sm">
            <div className="text-[8px] lg:text-[9px] text-gray-400 font-medium mb-2">Top Influencer</div>
            {[
              { name: 'Sarah M.', posts: 12, color: 'bg-pink-400', bar: 'w-full' },
              { name: 'Tim K.', posts: 9, color: 'bg-blue-400', bar: 'w-3/4' },
              { name: 'Lena W.', posts: 7, color: 'bg-purple-400', bar: 'w-7/12' },
            ].map((inf) => (
              <div key={inf.name} className="flex items-center gap-2 mb-1.5 last:mb-0">
                <div className={`w-5 h-5 lg:w-6 lg:h-6 rounded-full ${inf.color} flex items-center justify-center text-white text-[7px] lg:text-[8px] font-bold flex-shrink-0`}>
                  {inf.name[0]}
                </div>
                <span className="text-[9px] lg:text-[10px] text-gray-700 font-medium w-14 lg:w-16 flex-shrink-0">{inf.name}</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full bg-[#E8882E] rounded-full ${inf.bar}`} />
                </div>
                <span className="text-[8px] lg:text-[9px] text-gray-500 flex-shrink-0">{inf.posts} Posts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Trusted-by SVG logos ── */
function TrustedLogos({ label }: { label: string }) {
  const logos = [
    { name: 'Amazon', text: 'amazon', font: 'font-bold italic' },
    { name: 'Shopify', text: 'shopify', font: 'font-bold' },
    { name: 'Otto', text: 'OTTO', font: 'font-black' },
    { name: 'Kaufland', text: 'Kaufland', font: 'font-bold' },
    { name: 'eBay', text: 'eBay', font: 'font-bold italic' },
    { name: 'Zalando', text: 'ZALANDO', font: 'font-bold tracking-[0.2em]' },
    { name: 'DM', text: 'dm', font: 'font-black' },
    { name: 'Rossmann', text: 'ROSSMANN', font: 'font-bold' },
  ]

  const row = logos.map((logo) => (
    <span
      key={logo.name}
      className={`inline-flex items-center justify-center px-6 text-lg ${logo.font} text-gray-300 select-none whitespace-nowrap`}
      style={{ minWidth: 100 }}
    >
      {logo.text}
    </span>
  ))

  return (
    <div className="border-t border-blue-100 bg-white/60 py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-4 text-center">
          {label}
        </p>
      </div>
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {row}
          {row}
        </div>
      </div>
    </div>
  )
}

/* ── Main Hero Section ── */
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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EBF0F7] to-[#dce8f5]">
      {/* Decorative background circles */}
      <div className="absolute top-[-120px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[#3B82F6] opacity-[0.04] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-60px] w-[300px] h-[300px] rounded-full bg-[#3B82F6] opacity-[0.04] pointer-events-none" />
      <div className="absolute top-[40%] left-[60%] w-[200px] h-[200px] rounded-full bg-[#E8882E] opacity-[0.03] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left column ── */}
          <div className="relative min-w-0 w-full z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white text-brand-700 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 rounded-full border border-brand-100 mb-6 max-w-full shadow-sm">
              <span className="flex-shrink-0">🦊</span>
              <span className="truncate">{t('badge')}</span>
            </div>

            {/* Rotating headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-gray-900 leading-[1.15] tracking-tight mb-6 break-words w-full">
              {t('headlineStart') + ' '}
              <span
                className="inline-block"
                style={{
                  color: '#E8882E',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0px)' : 'translateY(-6px)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                  minWidth: '5ch',
                }}
              >
                {MARKETPLACES[currentIndex]}
              </span>
              {' ' + t('headlineSuffix')}
            </h1>

            {/* Subline */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 break-words w-full max-w-xl">
              {t('subline')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <a
                href="https://calendly.com/amzideal/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 bg-[#E8882E] hover:bg-[#d4771f]"
              >
                {t('ctaBrand')}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://calendly.com/amzideal/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
              >
                {t('ctaDemo')}
              </a>
            </div>

            {/* Floating platform icons */}
            <FloatingIcon className="top-0 right-0 lg:right-[-20px] rotate-[-8deg] z-20">
              <AmazonIcon />
            </FloatingIcon>
            <FloatingIcon className="top-20 right-[-40px] rotate-[6deg] z-20">
              <InstagramIcon />
            </FloatingIcon>
            <FloatingIcon className="bottom-20 left-[-30px] rotate-[-5deg] z-20">
              <TikTokIcon />
            </FloatingIcon>
            <FloatingIcon className="bottom-[-10px] left-[80px] rotate-[10deg] z-20">
              <ShopifyIcon />
            </FloatingIcon>
            <FloatingIcon className="top-[40%] right-[-50px] rotate-[-3deg] z-20">
              <MetaIcon />
            </FloatingIcon>
          </div>

          {/* ── Right column ── */}
          <div className="relative min-w-0 flex justify-center lg:justify-end">
            {/* Dashboard mockup */}
            <div className="relative w-full max-w-[580px]">
              <DashboardMockup />

              {/* Fox mascot overlapping bottom-left */}
              <div className="absolute -bottom-6 -left-8 lg:-bottom-8 lg:-left-12 z-30 w-[120px] lg:w-[180px]">
                <Image
                  src="/prueffuchs-mascot-full.png"
                  alt="Prüffuchs Mascot"
                  width={180}
                  height={220}
                  className="w-full h-auto drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted by scrolling bar */}
      <TrustedLogos label={t('trustedByLabel')} />
    </section>
  )
}
