'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

interface ApplyButtonProps {
  campaignId: string
  influencerId: string
  alreadyApplied: boolean
}

export default function ApplyButton({ campaignId, influencerId, alreadyApplied }: ApplyButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [applied, setApplied] = useState(alreadyApplied)

  async function handleApply() {
    if (applied) return
    setLoading(true)

    if (DEMO_MODE) {
      setApplied(true)
      setLoading(false)
      return
    }

    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()

    const { error } = await supabase.from('applications').insert({
      campaign_id: campaignId,
      influencer_id: influencerId,
      status: 'pending',
    })

    if (!error) {
      setApplied(true)
      router.refresh()
    }

    setLoading(false)
  }

  if (applied) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-100 rounded-lg">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Beworben
      </span>
    )
  }

  return (
    <button
      onClick={handleApply}
      disabled={loading}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Wird gesendet...
        </>
      ) : (
        <>Bewerben</>
      )}
    </button>
  )
}
