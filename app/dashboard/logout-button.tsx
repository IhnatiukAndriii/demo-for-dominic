'use client'

import { useRouter } from 'next/navigation'

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

export default function LogoutButtonClient() {
  const router = useRouter()

  async function handleLogout() {
    if (!DEMO_MODE) {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      await supabase.auth.signOut()
    }
    router.push('/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      title="Abmelden"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span className="hidden sm:inline">Abmelden</span>
    </button>
  )
}
