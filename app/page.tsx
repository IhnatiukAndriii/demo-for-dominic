import { redirect } from 'next/navigation'
import { DEMO_MODE } from '@/lib/demo'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  if (DEMO_MODE) {
    redirect('/login')
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
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role) {
    redirect(`/dashboard/${profile.role}`)
  }

  redirect('/login')
}
