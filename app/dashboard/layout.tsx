import { redirect } from 'next/navigation'
import Link from 'next/link'
import { DEMO_MODE, getDemoProfile } from '@/lib/demo'
import type { UserRole } from '@/types'
import LogoutButton from './logout-button'

export const dynamic = 'force-dynamic'

function getRoleLabel(role: UserRole): string {
  switch (role) {
    case 'brand':
      return 'Marke'
    case 'influencer':
      return 'Influencer'
    case 'admin':
      return 'Administrator'
  }
}

function getRoleBadgeClass(role: UserRole): string {
  switch (role) {
    case 'brand':
      return 'bg-blue-100 text-blue-800'
    case 'influencer':
      return 'bg-purple-100 text-purple-800'
    case 'admin':
      return 'bg-red-100 text-red-800'
  }
}

function NavLinks({ role }: { role: UserRole }) {
  const links = [
    {
      href: `/dashboard/${role}`,
      label: 'Übersicht',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
  ]

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          {link.icon}
          {link.label}
        </Link>
      ))}
    </>
  )
}

async function getLayoutData(pathname: string) {
  if (DEMO_MODE) {
    // Extract role from URL path
    const segments = pathname.split('/')
    const urlRole = segments[2] as UserRole | undefined
    const role = urlRole && ['brand', 'influencer', 'admin'].includes(urlRole)
      ? urlRole
      : 'brand'
    const profile = getDemoProfile(role)
    return { role, displayName: profile.full_name ?? 'Demo User', initials: (profile.full_name ?? 'D').charAt(0).toUpperCase() }
  }

  const { createClient } = await import('@/lib/supabase/server')
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  if (!profile) {
    redirect('/login')
  }

  const role = profile.role as UserRole
  const displayName = profile.full_name ?? user.email ?? '?'
  const initials = displayName.charAt(0).toUpperCase()
  return { role, displayName, initials }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // In demo mode we need to infer role from URL; use headers() to get pathname
  let pathname = '/dashboard/brand'
  if (DEMO_MODE) {
    const { headers } = await import('next/headers')
    const h = headers()
    // x-invoke-path or referer — Next.js sets x-invoke-path internally
    pathname = h.get('x-invoke-path') ?? h.get('x-next-url') ?? '/dashboard/brand'
  }

  const { role, displayName, initials } = await getLayoutData(pathname)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-900 tracking-tight">Prüffuchs</span>
              {DEMO_MODE && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-700">
                  DEMO
                </span>
              )}
            </div>

            {/* Navigation links */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLinks role={role} />
              {DEMO_MODE && (
                <>
                  <div className="w-px h-5 bg-gray-200 mx-1" />
                  {(['brand', 'influencer', 'admin'] as const).filter(r => r !== role).map(r => (
                    <Link
                      key={r}
                      href={`/dashboard/${r}`}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-400 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition-colors"
                    >
                      {r === 'brand' ? 'Marke' : r === 'influencer' ? 'Influencer' : 'Admin'}
                    </Link>
                  ))}
                </>
              )}
            </nav>

            {/* User info + logout */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2.5">
                <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center ring-2 ring-brand-200">
                  <span className="text-xs font-bold text-brand-700">{initials}</span>
                </div>
                <div className="hidden md:block leading-tight">
                  <p className="text-sm font-medium text-gray-900">{displayName}</p>
                  <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${getRoleBadgeClass(role)}`}>
                    {getRoleLabel(role)}
                  </span>
                </div>
              </div>

              <div className="w-px h-5 bg-gray-200 hidden sm:block" />

              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
