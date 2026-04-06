import { type NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

const handleI18nRouting = createMiddleware(routing)

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Strip locale prefix to get the clean path for auth checks
  // e.g. /en/dashboard/brand → /dashboard/brand, /dashboard/brand → /dashboard/brand
  const pathnameWithoutLocale = pathname.replace(/^\/(de|en)(\/|$)/, '/').replace(/\/{2,}/g, '/') || '/'

  // ── Demo mode: skip auth, just handle i18n ─────────────────
  if (DEMO_MODE) {
    return handleI18nRouting(request)
  }

  // ── Production: Supabase session refresh ───────────────────
  const { updateSession } = await import('@/lib/supabase/middleware')
  const { supabaseResponse, user, supabase } = await updateSession(request)

  const publicRoutes = ['/login', '/signup', '/']
  const isPublicRoute = publicRoutes.some(
    (route) => pathnameWithoutLocale === route || pathnameWithoutLocale.startsWith('/auth/')
  )

  if (!user && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (pathnameWithoutLocale === '/login' || pathnameWithoutLocale === '/signup') {
      return NextResponse.redirect(new URL(
        profile?.role ? `/dashboard/${profile.role}` : '/dashboard',
        request.url
      ))
    }

    if (pathnameWithoutLocale === '/') {
      return NextResponse.redirect(new URL(
        profile?.role ? `/dashboard/${profile.role}` : '/login',
        request.url
      ))
    }

    if (pathnameWithoutLocale.startsWith('/dashboard/')) {
      const segments = pathnameWithoutLocale.split('/')
      const dashboardRole = segments[2]

      if (
        dashboardRole &&
        profile?.role &&
        dashboardRole !== profile.role &&
        profile.role !== 'admin'
      ) {
        return NextResponse.redirect(new URL(`/dashboard/${profile.role}`, request.url))
      }

      if (pathnameWithoutLocale === '/dashboard' || pathnameWithoutLocale === '/dashboard/') {
        return NextResponse.redirect(new URL(
          profile?.role ? `/dashboard/${profile.role}` : '/login',
          request.url
        ))
      }
    }
  }

  // ── No auth redirect — run i18n routing and merge Supabase cookies ──
  const intlResponse = handleI18nRouting(request)
  supabaseResponse.cookies.getAll().forEach((cookie) => {
    intlResponse.cookies.set(cookie.name, cookie.value, cookie)
  })
  return intlResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
