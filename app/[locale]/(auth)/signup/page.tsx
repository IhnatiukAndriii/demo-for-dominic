'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { UserRole } from '@/types'

type SignupStep = 'credentials' | 'role'

export default function SignupPage() {
  const router = useRouter()
  const supabase = createClient()

  const [step, setStep] = useState<SignupStep>('credentials')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleCredentialsSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError('Das Passwort muss mindestens 8 Zeichen lang sein.')
      return
    }

    if (password !== passwordConfirm) {
      setError('Die Passwörter stimmen nicht überein.')
      return
    }

    setStep('role')
  }

  async function handleSignup() {
    if (!selectedRole) {
      setError('Bitte wähle eine Rolle aus.')
      return
    }

    setLoading(true)
    setError(null)

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: selectedRole,
        },
      },
    })

    if (signUpError) {
      if (signUpError.message.includes('already registered')) {
        setError('Diese E-Mail-Adresse ist bereits registriert.')
      } else {
        setError('Registrierung fehlgeschlagen. Bitte erneut versuchen.')
      }
      setLoading(false)
      return
    }

    if (data.user) {
      // Insert profile (also handled by DB trigger, but explicit is safer)
      await supabase.from('profiles').upsert({
        id: data.user.id,
        full_name: fullName,
        role: selectedRole,
      })

      router.push(`/dashboard/${selectedRole}`)
      router.refresh()
    }

    setLoading(false)
  }

  const roles: { value: UserRole; label: string; description: string; icon: React.ReactNode }[] = [
    {
      value: 'brand',
      label: 'Marke / Unternehmen',
      description: 'Erstelle Kampagnen, finde passende Influencer und verwalte deine Kooperationen.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      value: 'influencer',
      label: 'Influencer / Creator',
      description: 'Bewirb dich auf Kampagnen, baue dein Portfolio auf und verdiene mit deiner Reichweite.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-colors ${step === 'credentials' ? 'bg-brand-500 text-white' : 'bg-green-500 text-white'}`}>
          {step === 'role' ? (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          ) : '1'}
        </div>
        <div className={`h-0.5 w-8 rounded transition-colors ${step === 'role' ? 'bg-brand-400' : 'bg-white/20'}`} />
        <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-colors ${step === 'role' ? 'bg-brand-500 text-white' : 'bg-white/20 text-white'}`}>
          2
        </div>
      </div>

      {step === 'credentials' ? (
        <>
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-white">Konto erstellen</h1>
            <p className="mt-1.5 text-sm text-white/90">
              Tritt der Prüffuchs-Community bei
            </p>
          </div>

          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-white mb-1.5">
                Vollständiger Name
              </label>
              <input
                id="fullName"
                type="text"
                required
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Max Mustermann"
                className="block w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-white/30 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-colors"
              />
            </div>

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
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mindestens 8 Zeichen"
                className="block w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-white/30 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label htmlFor="passwordConfirm" className="block text-sm font-medium text-white mb-1.5">
                Passwort wiederholen
              </label>
              <input
                id="passwordConfirm"
                type="password"
                required
                autoComplete="new-password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
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
              className="w-full px-4 py-3 text-sm font-semibold text-white bg-brand-500 hover:bg-brand-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-400 transition-colors"
            >
              Weiter
            </button>
          </form>
        </>
      ) : (
        <>
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-white">Rolle auswählen</h1>
            <p className="mt-1.5 text-sm text-white/90">
              Wie möchtest du Prüffuchs nutzen?
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {roles.map((role) => (
              <button
                key={role.value}
                type="button"
                onClick={() => setSelectedRole(role.value)}
                className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                  selectedRole === role.value
                    ? 'border-brand-400 bg-brand-500/30'
                    : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                }`}
              >
                <div className={`flex-shrink-0 p-2 rounded-lg ${selectedRole === role.value ? 'bg-brand-400 text-white' : 'bg-white/10 text-white/90'}`}>
                  {role.icon}
                </div>
                <div>
                  <p className="font-semibold text-white">{role.label}</p>
                  <p className="text-sm text-white/90 mt-0.5">{role.description}</p>
                </div>
                {selectedRole === role.value && (
                  <div className="ml-auto flex-shrink-0 w-5 h-5 rounded-full bg-brand-400 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 mb-4 bg-red-500/20 border border-red-400/30 rounded-lg">
              <svg className="w-4 h-4 text-red-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep('credentials')}
              className="flex-1 px-4 py-3 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors"
            >
              Zurück
            </button>
            <button
              type="button"
              onClick={handleSignup}
              disabled={loading || !selectedRole}
              className="flex-1 flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-brand-500 hover:bg-brand-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Registrieren...
                </>
              ) : (
                'Registrieren'
              )}
            </button>
          </div>
        </>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-white/90">
          Bereits registriert?{' '}
          <Link
            href="/login"
            className="font-medium text-white hover:text-white underline underline-offset-2 transition-colors"
          >
            Jetzt anmelden
          </Link>
        </p>
      </div>
    </div>
  )
}
