import { type NextRequest, NextResponse } from 'next/server'

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // In demo mode, skip all auth — let pages handle demo data directly
  if (DEMO_MODE) {
    // If visiting root, redirect to login (which has demo role picker)
    if (pathname === '/') {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  // ── Production mode: full Supabase auth ───────────────────
  const { updateSession } = await import('@/lib/supabase/middleware')
  const { supabaseResponse, user, supabase } = await updateSession(request)

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/signup', '/']
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith('/auth/')
  )

  // If user is not authenticated and tries to access protected routes
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // If user is authenticated, handle role-based redirects
  if (user) {
    // Fetch user profile to get role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    // If authenticated user visits login or signup, redirect to their dashboard
    if (pathname === '/login' || pathname === '/signup') {
      const url = request.nextUrl.clone()
      if (profile?.role) {
        url.pathname = `/dashboard/${profile.role}`
      } else {
        url.pathname = '/dashboard'
      }
      return NextResponse.redirect(url)
    }

    // If authenticated user visits root, redirect to their dashboard
    if (pathname === '/') {
      const url = request.nextUrl.clone()
      if (profile?.role) {
        url.pathname = `/dashboard/${profile.role}`
      } else {
        url.pathname = '/login'
      }
      return NextResponse.redirect(url)
    }

    // Role-based access control for dashboard routes
    if (pathname.startsWith('/dashboard/')) {
      const segments = pathname.split('/')
      const dashboardRole = segments[2] // e.g., 'brand', 'influencer', 'admin'

      if (
        dashboardRole &&
        profile?.role &&
        dashboardRole !== profile.role &&
        profile.role !== 'admin'
      ) {
        // Redirect to correct dashboard if accessing wrong role's dashboard
        const url = request.nextUrl.clone()
        url.pathname = `/dashboard/${profile.role}`
        return NextResponse.redirect(url)
      }

      // If accessing /dashboard without a sub-path, redirect to role dashboard
      if (pathname === '/dashboard' || pathname === '/dashboard/') {
        const url = request.nextUrl.clone()
        if (profile?.role) {
          url.pathname = `/dashboard/${profile.role}`
        } else {
          url.pathname = '/login'
        }
        return NextResponse.redirect(url)
      }
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
