export type UserRole = 'brand' | 'influencer' | 'admin'

export type CampaignStatus = 'draft' | 'active' | 'completed'

export type ApplicationStatus = 'pending' | 'approved' | 'rejected'

export interface Profile {
  id: string
  role: UserRole
  full_name: string | null
  company_name: string | null
  website: string | null
  bio: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Campaign {
  id: string
  brand_id: string
  title: string
  description: string | null
  budget: number | null
  status: CampaignStatus
  requirements: string | null
  category: string | null
  deadline: string | null
  created_at: string
  updated_at: string
  // Joined fields
  brand?: Pick<Profile, 'id' | 'full_name' | 'company_name'>
  applications_count?: number
}

export interface Application {
  id: string
  campaign_id: string
  influencer_id: string
  status: ApplicationStatus
  message: string | null
  created_at: string
  updated_at: string
  // Joined fields
  campaign?: Campaign
  influencer?: Pick<Profile, 'id' | 'full_name' | 'bio' | 'website'>
}

export interface DashboardStats {
  totalCampaigns?: number
  activeCampaigns?: number
  totalApplications?: number
  pendingApplications?: number
  totalBrands?: number
  totalInfluencers?: number
  budgetTotal?: number
}
