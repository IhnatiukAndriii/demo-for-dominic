'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

function DemoLoginPage() {
  const router = useRouter()

  const roles = [
    {
      value: 'brand' as const,
      label: 'Marke / Unternehmen',
      name: 'Dominic Schlierkamp',
      company: 'GlowUp Cosmetics',
      description: 'Dashboard mit Kampagnen, Budget-Übersicht und Bewerbungsverwaltung.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      value: 'influencer' as const,
      label: 'Influencer / Creator',
      name: 'Lena Müller',
      company: '120K Follower',
      description: 'Entdecke verfügbare Kampagnen, bewirb dich und verfolge deine Bewerbungen.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      value: 'admin' as const,
      label: 'Administrator',
      name: 'Admin Prüffuchs',
      company: 'Plattformverwaltung',
      description: 'Volle Übersicht: Nutzer, Kampagnen, Bewerbungen und Statistiken.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8">
      <div className="mb-2 text-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-4">
          DEMO MODUS
        </span>
        <h1 className="text-2xl font-bold text-white">Rolle auswählen</h1>
        <p className="mt-2 text-sm text-white/90">
          Wähle eine Rolle, um das Dashboard zu erkunden
        </p>
      </div>

      <div className="space-y-3 mt-6">
        {roles.map((role) => (
          <button
            key={role.value}
            type="button"
            onClick={() => router.push(`/dashboard/${role.value}`)}
            className="w-full flex items-start gap-4 p-4 rounded-xl border-2 border-white/20 bg-white/5 hover:border-brand-400 hover:bg-brand-500/20 text-left transition-all group"
          >
            <div className="flex-shrink-0 p-2.5 rounded-lg bg-white/10 text-white/90 group-hover:bg-brand-400 group-hover:text-white transition-colors">
              {role.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white">{role.label}</p>
              <p className="text-xs text-white mt-0.5">{role.name} · {role.company}</p>
              <p className="text-sm text-white/90 mt-1">{role.description}</p>
            </div>
            <svg className="w-5 h-5 text-white group-hover:text-white flex-shrink-0 mt-1 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/10 text-center">
        <p className="text-xs text-white">
          Dies ist eine Demo mit Testdaten. Keine echte Authentifizierung erforderlich.
        </p>
      </div>
    </div>
  )
}

function RealLoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('E-Mail oder Passwort ist falsch. Bitte erneut versuchen.')
      setLoading(false)
      return
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profile?.role) {
        router.push(`/dashboard/${profile.role}`)
      } else {
        router.push('/dashboard')
      }
    }

    router.refresh()
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-white">Willkommen zurück</h1>
        <p className="mt-2 text-sm text-white/90">
          Melde dich bei deinem Konto an
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white mb-1.5">
            E-Mail-Adresse
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@beispiel.de"
            className="block w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-white/30 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-colors"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white mb-1.5">
            Passwort
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="block w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-white/30 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-colors"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 px-4 py-3 bg-red-500/20 border border-red-400/30 rounded-lg">
            <svg className="w-4 h-4 text-red-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-brand-500 hover:bg-brand-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Anmelden...
            </>
          ) : (
            'Anmelden'
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-white/90">
          Noch kein Konto?{' '}
          <Link
            href="/signup"
            className="font-medium text-white hover:text-white underline underline-offset-2 transition-colors"
          >
            Jetzt registrieren
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return DEMO_MODE ? <DemoLoginPage /> : <RealLoginPage />
}
