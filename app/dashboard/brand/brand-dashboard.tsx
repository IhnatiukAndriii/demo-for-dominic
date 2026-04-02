'use client'

/* eslint-disable @next/next/no-img-element */

import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// ============ COLORS (fox theme: light blue + orange) ============
const BLUE = '#3B82F6'
const BLUE_MID = '#60A5FA'
const ORANGE = '#F97316'
const ORANGE_LIGHT = '#FB923C'
const AMBER = '#FBBF24'
const RED = '#EF4444'

// ============ MOCK DATA ============

const kpiCards = [
  {
    label: 'Total Influencers',
    value: '3,403',
    change: '+12%',
    sparkline: [40, 70, 45, 80, 60, 90, 75],
    color: BLUE,
  },
  {
    label: 'Active Campaigns',
    value: '3,206',
    change: '+8%',
    sparkline: [30, 50, 40, 60, 55, 70, 65],
    color: BLUE_MID,
  },
  {
    label: 'Total Revenue',
    value: '$125,004',
    change: '+18%',
    sparkline: [50, 60, 55, 75, 80, 85, 90],
    color: ORANGE,
  },
  {
    label: 'Completed Posts',
    value: '1,007',
    change: '+24',
    sparkline: [35, 45, 55, 50, 65, 60, 80],
    color: ORANGE_LIGHT,
  },
]

const donutData = [
  { name: 'Done', value: 2953, color: BLUE },
  { name: 'Pending', value: 32, color: AMBER },
  { name: 'Rejected', value: 15, color: RED },
]

const areaData = [
  { month: 'Jan', Comments: 1200, Likes: 3200, Impressions: 8500 },
  { month: 'Feb', Comments: 1800, Likes: 4100, Impressions: 9200 },
  { month: 'Mar', Comments: 1400, Likes: 3800, Impressions: 8800 },
  { month: 'Apr', Comments: 2200, Likes: 4600, Impressions: 11000 },
  { month: 'May', Comments: 2800, Likes: 5200, Impressions: 12500 },
  { month: 'Jun', Comments: 2400, Likes: 4800, Impressions: 11800 },
  { month: 'Jul', Comments: 3200, Likes: 5800, Impressions: 14000 },
  { month: 'Aug', Comments: 2900, Likes: 5400, Impressions: 13200 },
  { month: 'Sep', Comments: 3600, Likes: 6200, Impressions: 15500 },
]

const influencers = [
  { name: 'Sarah Johnson', followers: '245K', image: 'https://picsum.photos/seed/woman1/400/500' },
  { name: 'Lisa Chen', followers: '182K', image: 'https://picsum.photos/seed/woman2/400/500' },
  { name: 'Emma Williams', followers: '320K', image: 'https://picsum.photos/seed/woman3/400/500' },
  { name: 'Ana Rivera', followers: '156K', image: 'https://picsum.photos/seed/woman4/400/500' },
]

const sidebarNav = [
  { label: 'Dashboard', active: true },
  { label: 'Campaigns', active: false },
  { label: 'Applicants', active: false },
  { label: 'Billing', active: false },
  { label: 'Help', active: false },
]

// ============ ICONS ============

function DashboardIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  )
}

function CampaignsIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  )
}

function ApplicantsIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )
}

function BillingIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  )
}

function HelpIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

const navIcons: Record<string, () => React.JSX.Element> = {
  Dashboard: DashboardIcon,
  Campaigns: CampaignsIcon,
  Applicants: ApplicantsIcon,
  Billing: BillingIcon,
  Help: HelpIcon,
}

// ============ SUB-COMPONENTS ============

function SparklineBars({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  return (
    <div className="flex items-end gap-[3px] h-10">
      {data.map((value, i) => (
        <div
          key={i}
          className="w-[6px] rounded-sm"
          style={{
            height: `${(value / max) * 100}%`,
            backgroundColor: i === data.length - 1 ? color : `${color}40`,
          }}
        />
      ))}
    </div>
  )
}

// ============ MAIN COMPONENT ============

export default function BrandDashboard() {
  const total = donutData.reduce((s, d) => s + d.value, 0)
  const completionRate = Math.round((donutData[0].value / total) * 100)

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-[#F9FAFB]">
      {/* ===== SIDEBAR ===== */}
      <aside className="hidden lg:flex w-[260px] flex-col bg-white border-r border-gray-200 shrink-0">
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <img src="/fox-icon.png" alt="Prüffuchs" className="w-9 h-9 object-contain" />
            <span className="text-lg font-bold text-gray-900">Prüffuchs</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarNav.map((item) => {
            const Icon = navIcons[item.label]
            return (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  item.active
                    ? 'bg-[#EFF6FF] text-[#3B82F6]'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="px-4 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#EFF6FF] flex items-center justify-center">
              <span className="text-sm font-bold text-[#3B82F6]">D</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Dominic S.</p>
              <p className="text-xs text-gray-500">Brand Manager</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 overflow-auto">
        <div className="p-5 sm:p-6 lg:p-8 max-w-[1400px]">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Brand Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">
              Welcome back, Dominic. Here&apos;s what&apos;s happening with your campaigns.
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            {kpiCards.map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {card.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                  <span className="text-xs font-medium text-emerald-600 mt-0.5 inline-block">
                    {card.change}
                  </span>
                </div>
                <SparklineBars data={card.sparkline} color={card.color} />
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
            {/* Donut Chart */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-1">
                Campaign Completion
              </h2>
              <p className="text-xs text-gray-400 mb-4">Rate across all campaigns</p>

              <div className="relative">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={donutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={95}
                      paddingAngle={3}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                      stroke="none"
                    >
                      {donutData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {/* Center label overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900">{completionRate}%</p>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-5 mt-2">
                {donutData.map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-gray-500">{item.name}</span>
                    <span className="text-xs font-semibold text-gray-800">
                      {item.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Area Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Earned Media Value</h2>
                  <p className="text-xs text-gray-400">Monthly engagement overview</p>
                </div>
                <div className="flex items-center gap-4">
                  {[
                    { label: 'Comments', color: BLUE },
                    { label: 'Likes', color: ORANGE },
                    { label: 'Impressions', color: ORANGE_LIGHT },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-1.5">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs text-gray-500">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient id="gradComments" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={BLUE} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={BLUE} stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="gradLikes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={ORANGE} stopOpacity={0.25} />
                      <stop offset="100%" stopColor={ORANGE} stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="gradImpressions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={ORANGE_LIGHT} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={ORANGE_LIGHT} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#9CA3AF' }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#9CA3AF' }}
                    tickFormatter={(v: number) =>
                      v >= 1000 ? `${v / 1000}k` : String(v)
                    }
                    width={45}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      fontSize: '12px',
                      padding: '10px 14px',
                    }}
                    formatter={(value) => Number(value).toLocaleString()}
                  />
                  <Area
                    type="monotone"
                    dataKey="Impressions"
                    stroke={ORANGE_LIGHT}
                    fill="url(#gradImpressions)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="Likes"
                    stroke={ORANGE}
                    fill="url(#gradLikes)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="Comments"
                    stroke={BLUE}
                    fill="url(#gradComments)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Influencer Promotions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">
                Influencer Promotions
              </h2>
              <button className="text-xs font-medium text-[#3B82F6] hover:underline">
                View all
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {influencers.map((inf) => (
                <div
                  key={inf.name}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={inf.image}
                      alt={inf.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg
                          className="w-5 h-5 text-[#F97316] ml-0.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    {/* Name overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-semibold text-sm">{inf.name}</p>
                      <p className="text-white/80 text-xs">{inf.followers} followers</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
