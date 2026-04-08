'use client'

import { useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

function DashboardMockup() {
  return (
    <div className="relative w-full max-w-[580px] h-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200/60">
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
        <div className="w-[120px] lg:w-[140px] bg-[#1e2d4a] flex-shrink-0 flex flex-col py-4 px-3">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 rounded-lg bg-[#E8882E] flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">PF</span>
            </div>
            <span className="text-white text-[10px] font-bold hidden lg:block">Prüffuchs</span>
          </div>

          {[
            { icon: '\u{1F4CA}', label: 'Dashboard', active: true },
            { icon: '\u{1F4E2}', label: 'Kampagnen', active: false },
            { icon: '\u{1F465}', label: 'Influencer', active: false },
            { icon: '\u{1F4B3}', label: 'Billing', active: false },
            { icon: '\u{2753}', label: 'Hilfe', active: false },
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
              <span className="text-2xl">{'\u{1F98A}'}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-3 lg:p-4 bg-[#f8f9fc] overflow-hidden">
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

          <div className="grid grid-cols-2 gap-2 mb-3">
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

export default function Hero() {
  const t = useTranslations('landing.hero')

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-brand-orange-50 via-brand-cream/30 to-brand-orange-100">
      {/* Subtle radial glows */}
      <div className="absolute top-[-100px] right-[-60px] w-[500px] h-[500px] rounded-full bg-brand-orange/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-40px] w-[400px] h-[400px] rounded-full bg-brand-cream/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-10 lg:gap-12 items-center">
          {/* Visual composition — shows first on mobile */}
          <div className="relative order-first lg:order-last min-w-0 flex justify-center lg:justify-end overflow-visible">
            <div className="relative flex items-end max-w-full gap-0">
              {/* Mascot — left side, next to dashboard */}
              <div className="relative z-20 -mr-4 flex-shrink-0 self-end hidden lg:block">
                <Image
                  src="/prueffuchs-mascot-full.png"
                  alt="Prüffuchs Mascot"
                  width={500}
                  height={600}
                  priority
                  className="w-[260px] h-auto"
                />
              </div>

              {/* Dashboard mockup — right side */}
              <div className="relative z-10 w-full sm:w-[400px] lg:w-[440px] flex-shrink min-w-0">
                <DashboardMockup />
              </div>
            </div>
          </div>

          {/* Text content — left column */}
          <div className="order-last lg:order-first min-w-0 w-full z-10">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 bg-brand-orange-50 text-brand-orange-700 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full border border-brand-orange-200 mb-6 shadow-sm">
              <span className="flex-shrink-0">{'\u{1F98A}'}</span>
              <span>{t('badge')}</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-navy leading-[1.1] tracking-tight mb-4">
              {t('headlineLine1Before')}{' '}
              <span className="text-brand-orange italic">{t('headlineAccent')}</span>
              <br />
              {t('headlineLine2')}
              <br />
              {t('headlineLine3')}
            </h1>

            {/* Tagline */}
            <p className="text-lg text-brand-navy italic mb-6">
              {t('tagline')}
            </p>

            {/* Subheadline */}
            <p className="text-lg text-brand-navy/70 leading-relaxed mb-8 max-w-xl">
              {t('subline')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://calendly.com/amzideal/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 bg-brand-orange hover:bg-brand-orange-600"
              >
                {t('ctaPrimary')}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://calendly.com/amzideal/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/80 hover:bg-white text-brand-navy font-semibold rounded-xl border-2 border-brand-orange-200 hover:border-brand-orange transition-all duration-200"
              >
                {t('ctaSecondary')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
