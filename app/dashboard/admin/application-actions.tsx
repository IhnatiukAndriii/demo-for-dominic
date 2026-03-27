'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ApplicationStatus } from '@/types'

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

interface ApplicationActionsProps {
  applicationId: string
  currentStatus: ApplicationStatus
}

export default function ApplicationActions({ applicationId, currentStatus }: ApplicationActionsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [status, setStatus] = useState<ApplicationStatus>(currentStatus)

  async function updateStatus(newStatus: ApplicationStatus) {
    setLoading(newStatus)

    if (DEMO_MODE) {
      setStatus(newStatus)
      setLoading(null)
      return
    }

    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()

    const { error } = await supabase
      .from('applications')
      .update({ status: newStatus })
      .eq('id', applicationId)

    if (!error) {
      setStatus(newStatus)
      router.refresh()
    }

    setLoading(null)
  }

  if (status === 'approved') {
    return (
      <button
        onClick={() => updateStatus('rejected')}
        disabled={loading !== null}
        className="text-xs text-red-600 hover:text-red-800 font-medium transition-colors disabled:opacity-50"
      >
        Ablehnen
      </button>
    )
  }

  if (status === 'rejected') {
    return (
      <button
        onClick={() => updateStatus('approved')}
        disabled={loading !== null}
        className="text-xs text-green-600 hover:text-green-800 font-medium transition-colors disabled:opacity-50"
      >
        Annehmen
      </button>
    )
  }

  // pending
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => updateStatus('approved')}
        disabled={loading !== null}
        className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 hover:bg-green-200 rounded transition-colors disabled:opacity-50"
      >
        {loading === 'approved' ? '...' : 'Annehmen'}
      </button>
      <button
        onClick={() => updateStatus('rejected')}
        disabled={loading !== null}
        className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded transition-colors disabled:opacity-50"
      >
        {loading === 'rejected' ? '...' : 'Ablehnen'}
      </button>
    </div>
  )
}
