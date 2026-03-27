import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Profile, Campaign, Application } from '@/types'
import ApplicationActions from './application-actions'

function formatCurrency(amount: number | null): string {
  if (amount === null) return '–'
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount)
}

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(dateStr))
}

function RoleBadge({ role }: { role: Profile['role'] }) {
  const map = {
    brand: { label: 'Marke', className: 'bg-blue-100 text-blue-700' },
    influencer: { label: 'Influencer', className: 'bg-purple-100 text-purple-700' },
    admin: { label: 'Admin', className: 'bg-red-100 text-red-700' },
  }
  const { label, className } = map[role]
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}

function CampaignStatusBadge({ status }: { status: Campaign['status'] }) {
  const map = {
    draft: { label: 'Entwurf', className: 'bg-yellow-100 text-yellow-700' },
    active: { label: 'Aktiv', className: 'bg-green-100 text-green-700' },
    completed: { label: 'Abgeschlossen', className: 'bg-gray-100 text-gray-600' },
  }
  const { label, className } = map[status]
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  )
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

export default async function AdminDashboardPage() {
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

  if (!profile || profile.role !== 'admin') redirect('/login')

  // Fetch all data
  const [{ data: allUsers }, { data: allCampaigns }, { data: allApplications }] = await Promise.all([
    supabase.from('profiles').select('*').order('created_at', { ascending: false }),
    supabase
      .from('campaigns')
      .select('*, brand:profiles!brand_id(id, full_name, company_name)')
      .order('created_at', { ascending: false }),
    supabase
      .from('applications')
      .select('*, campaign:campaigns(id, title), influencer:profiles!influencer_id(id, full_name)')
      .order('created_at', { ascending: false }),
  ])

  const users = (allUsers ?? []) as Profile[]
  const campaigns = (allCampaigns ?? []) as (Campaign & {
    brand: { id: string; full_name: string | null; company_name: string | null } | null
  })[]
  const applications = (allApplications ?? []) as (Application & {
    campaign: { id: string; title: string } | null
    influencer: { id: string; full_name: string | null } | null
  })[]

  const totalBudget = campaigns.reduce((sum, c) => sum + (c.budget ?? 0), 0)

  const stats = [
    {
      label: 'Nutzer gesamt',
      value: users.length,
      sub: `${users.filter((u) => u.role === 'brand').length} Marken · ${users.filter((u) => u.role === 'influencer').length} Influencer`,
      icon: (
        <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      bg: 'bg-brand-50',
    },
    {
      label: 'Kampagnen',
      value: campaigns.length,
      sub: `${campaigns.filter((c) => c.status === 'active').length} aktiv`,
      icon: (
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      bg: 'bg-green-50',
    },
    {
      label: 'Bewerbungen',
      value: applications.length,
      sub: `${applications.filter((a) => a.status === 'pending').length} ausstehend`,
      icon: (
        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      bg: 'bg-purple-50',
    },
    {
      label: 'Gesamtbudget',
      value: formatCurrency(totalBudget),
      sub: 'alle Kampagnen',
      icon: (
        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: 'bg-amber-50',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin-Übersicht</h1>
        <p className="text-sm text-gray-500 mt-1">Plattformverwaltung und Statistiken</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2.5 rounded-lg ${stat.bg}`}>{stat.icon}</div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-0.5">{stat.value}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 pl-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Users table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">Alle Nutzer</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Rolle</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Registriert</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-sm text-gray-400">
                      Keine Nutzer gefunden
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-semibold text-brand-700">
                              {u.full_name?.charAt(0)?.toUpperCase() ?? '?'}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900 truncate max-w-[140px]">
                            {u.full_name ?? '–'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <RoleBadge role={u.role} />
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {formatDate(u.created_at)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Campaigns table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">Alle Kampagnen</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Titel</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Marke</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Budget</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {campaigns.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-sm text-gray-400">
                      Keine Kampagnen gefunden
                    </td>
                  </tr>
                ) : (
                  campaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900 truncate max-w-[140px]">{campaign.title}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs truncate max-w-[100px]">
                        {campaign.brand?.company_name ?? campaign.brand?.full_name ?? '–'}
                      </td>
                      <td className="px-4 py-3">
                        <CampaignStatusBadge status={campaign.status} />
                      </td>
                      <td className="px-4 py-3 text-gray-700 font-medium text-xs">
                        {formatCurrency(campaign.budget)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Applications table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Alle Bewerbungen</h2>
          <span className="text-sm text-gray-500">{applications.length} gesamt</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Influencer</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Kampagne</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Datum</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Aktion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-400">
                    Keine Bewerbungen gefunden
                  </td>
                </tr>
              ) : (
                applications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {application.influencer?.full_name ?? '–'}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {application.campaign?.title ?? '–'}
                    </td>
                    <td className="px-6 py-4">
                      <ApplicationStatusBadge status={application.status} />
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {formatDate(application.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <ApplicationActions
                        applicationId={application.id}
                        currentStatus={application.status}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
