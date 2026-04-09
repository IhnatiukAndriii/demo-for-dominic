'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

const stepIds = [1, 2, 3, 4, 5, 6] as const

function DashboardScreen({ step }: { step: number }) {
  switch (step) {
    case 1:
      return (
        <div className="p-5">
          <h4 className="text-sm font-bold text-gray-900 mb-4">Neue Kampagne</h4>
          <div className="space-y-3">
            {[
              { label: 'Produkt', value: 'Bio Kaffeebohnen 1kg' },
              { label: 'Budget', value: '500 €' },
              { label: 'Zielgruppe', value: 'Food & Lifestyle' },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-[10px] text-gray-400 font-medium block mb-1">{f.label}</label>
                <div className="bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700 border border-gray-100">
                  {f.value}
                </div>
              </div>
            ))}
            <button className="w-full mt-2 bg-[#E07010] text-white text-sm font-semibold py-2.5 rounded-xl">
              Kampagne erstellen
            </button>
          </div>
        </div>
      )
    case 2:
      return (
        <div className="p-5">
          <h4 className="text-sm font-bold text-gray-900 mb-4">AI-Matching</h4>
          <div className="space-y-3">
            {[
              { name: 'Sarah M.', color: 'bg-pink-400', score: '98%' },
              { name: 'Tim K.', color: 'bg-blue-400', score: '94%' },
              { name: 'Lena W.', color: 'bg-purple-400', score: '89%' },
            ].map((c) => (
              <div key={c.name} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
                <div className={`w-9 h-9 rounded-full ${c.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {c.name[0]}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{c.name}</p>
                  <p className="text-[10px] text-gray-400">Micro-Influencer</p>
                </div>
                <span className="text-sm font-bold text-[#E07010]">{c.score}</span>
              </div>
            ))}
          </div>
        </div>
      )
    case 3:
      return (
        <div className="p-5">
          <h4 className="text-sm font-bold text-gray-900 mb-4">Bestellstatus</h4>
          <div className="space-y-4">
            {[
              { label: 'Bestellt', done: true },
              { label: 'Geliefert', done: true },
              { label: 'Getestet', done: false },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${s.done ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  {s.done ? '✓' : i + 1}
                </div>
                <span className={`text-sm font-medium ${s.done ? 'text-gray-900' : 'text-gray-400'}`}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      )
    case 4:
      return (
        <div className="p-5">
          <h4 className="text-sm font-bold text-gray-900 mb-4">Content erstellen</h4>
          <div className="grid grid-cols-3 gap-2">
            {['bg-brand-orange-100', 'bg-secondary-100', 'bg-brand-orange-50'].map((bg, i) => (
              <div key={i} className={`${bg} rounded-xl aspect-square flex items-center justify-center`}>
                <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-3 text-center">3 Content-Entwürfe bereit</p>
        </div>
      )
    case 5:
      return (
        <div className="p-5">
          <h4 className="text-sm font-bold text-gray-900 mb-4">Post veröffentlicht</h4>
          <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
            <div className="bg-brand-orange-50 h-32 flex items-center justify-center">
              <span className="text-3xl">📸</span>
            </div>
            <div className="p-3 flex items-center gap-4">
              <span className="text-sm">❤️ 847</span>
              <span className="text-sm">💬 32</span>
              <span className="text-sm">🔄 15</span>
            </div>
          </div>
        </div>
      )
    case 6:
      return (
        <div className="p-5 flex flex-col items-center justify-center min-h-[200px]">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <span className="text-2xl text-green-600">✓</span>
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-1">Auszahlung erfolgreich</h4>
          <p className="text-2xl font-bold text-[#E07010]">+24,90 €</p>
          <p className="text-xs text-gray-400 mt-2">Überwiesen an Sarah M.</p>
        </div>
      )
    default:
      return null
  }
}

export default function HowItWorks() {
  const t = useTranslations('landing.howItWorks')
  const [activeStep, setActiveStep] = useState(1)

  return (
    <section id="how-it-works" className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="tracking-widest text-sm text-brand-orange font-semibold mb-4">
            {t('label')}
          </p>
          <h2 className="text-4xl lg:text-6xl font-bold text-brand-navy animate-fade-in-up">
            {t('headline')}{' '}
            <span className="text-brand-orange font-serif italic font-semibold">{t('headlineAccent')}</span>
          </h2>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Steps */}
          <div className="space-y-1">
            {stepIds.map((id) => (
              <button
                key={id}
                onClick={() => setActiveStep(id)}
                className={`w-full text-left py-5 px-6 rounded-r-xl border-l-4 transition-all duration-200 ${
                  activeStep === id
                    ? 'border-brand-orange bg-brand-orange-50'
                    : 'border-transparent hover:bg-brand-orange-50/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      activeStep === id
                        ? 'bg-[#E07010] text-white'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {id}
                  </div>
                  <h3 className="text-lg font-semibold text-brand-navy">
                    {t(`step${id}.title`)}
                  </h3>
                </div>
                {activeStep === id && (
                  <p className="text-base text-brand-navy/70 mt-2 ml-12">
                    {t(`step${id}.description`)}
                  </p>
                )}
              </button>
            ))}
          </div>

          {/* Right: Dashboard preview — hidden on mobile */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200/60">
              {/* Browser dots */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>
                <span className="text-xs font-semibold text-gray-500 tracking-wide">Prüffuchs Dashboard</span>
                <div className="w-7 h-7 rounded-full bg-[#E07010] flex items-center justify-center text-[10px] font-bold text-white">PF</div>
              </div>
              {/* Dynamic content */}
              <div className="min-h-[340px]">
                <DashboardScreen step={activeStep} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
