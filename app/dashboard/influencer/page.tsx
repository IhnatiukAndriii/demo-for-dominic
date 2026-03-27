import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Campaign, Application } from '@/types'
import ApplyButton from './apply-button'

function formatCurrency(amount: number | null): string {
  if (amount === null) return '–'
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount)
}

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(dateStr))
}

function ApplicationStatusBadge({ status }: { status: Application['status'] }) {
  const map = {
    pending: { label: 'Ausstehend', className: 'bg-blue-100 text-blue-700' },
    approved: { label: 'Angenommen', className: 'bg-green-100 text-green-700' },
    rejected: { label: 'Abgelehnt', className: 'bg-red-100 text-red-700' },
  }
  const { label, className } = map[status]
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}

export default async function InfluencerDashboardPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'influencer') redirect('/login')

  // Fetch active campaigns (available to apply for)
  const { data: activeCampaigns } = await supabase
    .from('campaigns')
    .select('*, brand:profiles!brand_id(id, full_name, company_name)')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  // Fetch this influencer's applications
  const { data: myApplications } = await supabase
    .from('applications')
    .select('*, campaign:campaigns(id, title, description, budget, status, brand_id)')
    .eq('influencer_id', user.id)
    .order('created_at', { ascending: false })

  const campaigns = (activeCampaigns ?? []) as (Campaign & {
    brand: { id: string; full_name: string | null; company_name: string | null } | null
  })[]

  const applications = (myApplications ?? []) as (Application & {
    campaign: Campaign | null
  })[]

  // IDs of campaigns already applied for
  const appliedCampaignIds = new Set(applications.map((a) => a.campaign_id))

  const stats = [
    {
      label: 'Offene Kampagnen',
      value: campaigns.length,
      icon: (
        <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      bg: 'bg-brand-50',
    },
    {
      label: 'Meine Bewerbungen',
      value: applications.length,
      icon: (
        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      bg: 'bg-purple-50',
    },
    {
      label: 'Angenommen',
      value: applications.filter((a) => a.status === 'approved').length,
      icon: (
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: 'bg-green-50',
    },
    {
      label: 'Ausstehend',
      value: applications.filter((a) => a.status === 'pending').length,
      icon: (
        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: 'bg-amber-50',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Hallo, {profile.full_name ?? 'Influencer'} 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Entdecke Kampagnen und verwalte deine Bewerbungen
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${stat.bg}`}>{stat.icon}</div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide leading-tight">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-0.5">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Available campaigns */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Verfügbare Kampagnen</h2>
        {campaigns.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center py-14 px-4 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Keine Kampagnen verfügbar</h3>
            <p className="text-sm text-gray-500 max-w-xs">
              Aktuell gibt es keine offenen Kampagnen. Schau bald wieder vorbei.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {campaigns.map((campaign) => {
              const alreadyApplied = appliedCampaignIds.has(campaign.id)
              return (
                <div key={campaign.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                  {/* Card header */}
                  <div className="px-5 pt-5 pb-3 flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 leading-snug">{campaign.title}</h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 flex-shrink-0">
                        Aktiv
                      </span>
                    </div>
                    {campaign.brand && (
                      <p className="text-xs text-gray-500 mb-2">
                        von {campaign.brand.company_name ?? campaign.brand.full_name ?? 'Unbekannte Marke'}
                      </p>
                    )}
                    {campaign.description && (
                      <p className="text-sm text-gray-600 line-clamp-3">{campaign.description}</p>
                    )}
                  </div>
                  {/* Card footer */}
                  <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Budget</p>
                      <p className="text-sm font-semibold text-gray-900">{formatCurrency(campaign.budget)}</p>
                    </div>
                    <ApplyButton
                      campaignId={campaign.id}
                      influencerId={user.id}
                      alreadyApplied={alreadyApplied}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* My applications */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Meine Bewerbungen</h2>
        {applications.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center py-12 px-4 text-center">
            <p className="text-sm text-gray-500">
              Du hast dich noch auf keine Kampagne beworben.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Kampagne</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Budget</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Beworben am</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {applications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">
                          {application.campaign?.title ?? 'Unbekannte Kampagne'}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {formatCurrency(application.campaign?.budget ?? null)}
                      </td>
                      <td className="px-6 py-4">
                        <ApplicationStatusBadge status={application.status} />
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {formatDate(application.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
