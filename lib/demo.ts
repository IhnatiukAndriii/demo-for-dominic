import type { Profile, Campaign } from '@/types'

export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

// ── Demo Users ──────────────────────────────────────────────
export const demoBrand: Profile = {
  id: 'demo-brand-001',
  role: 'brand',
  full_name: 'Dominic Schlierkamp',
  company_name: 'GlowUp Cosmetics',
  website: 'https://glowup-cosmetics.de',
  bio: 'Premium Naturkosmetik aus Berlin',
  avatar_url: null,
  created_at: '2025-11-15T10:00:00Z',
  updated_at: '2026-03-20T14:00:00Z',
}

export const demoInfluencer: Profile = {
  id: 'demo-influencer-001',
  role: 'influencer',
  full_name: 'Lena Müller',
  company_name: null,
  website: 'https://instagram.com/lena.lifestyle',
  bio: 'Lifestyle & Beauty Creator aus München · 120K Follower',
  avatar_url: null,
  created_at: '2025-12-01T09:00:00Z',
  updated_at: '2026-03-18T11:00:00Z',
}

export const demoAdmin: Profile = {
  id: 'demo-admin-001',
  role: 'admin',
  full_name: 'Admin Prüffuchs',
  company_name: 'Prüffuchs GmbH',
  website: null,
  bio: null,
  avatar_url: null,
  created_at: '2025-10-01T08:00:00Z',
  updated_at: '2026-03-25T16:00:00Z',
}

const demoInfluencer2: Profile = {
  id: 'demo-influencer-002',
  role: 'influencer',
  full_name: 'Max Fischer',
  company_name: null,
  website: 'https://youtube.com/@maxfischer',
  bio: 'Tech & Gadget Reviews · 85K Abonnenten',
  avatar_url: null,
  created_at: '2026-01-10T14:00:00Z',
  updated_at: '2026-03-22T09:00:00Z',
}

const demoBrand2: Profile = {
  id: 'demo-brand-002',
  role: 'brand',
  full_name: 'Sarah Weber',
  company_name: 'FitLife Nutrition',
  website: 'https://fitlife-nutrition.de',
  bio: 'Nahrungsergänzungsmittel & Sport',
  avatar_url: null,
  created_at: '2025-12-20T11:00:00Z',
  updated_at: '2026-03-19T10:00:00Z',
}

export const demoUsers: Profile[] = [demoBrand, demoBrand2, demoInfluencer, demoInfluencer2, demoAdmin]

// ── Demo Campaigns ──────────────────────────────────────────
export const demoCampaigns: (Campaign & { applications: { count: number }[], brand: { id: string; full_name: string | null; company_name: string | null } | null })[] = [
  {
    id: 'demo-campaign-001',
    brand_id: 'demo-brand-001',
    title: 'Sommer-Kollektion 2026 Launch',
    description: 'Wir suchen Beauty-Influencer für die Bewerbung unserer neuen Sommer-Kollektion mit nachhaltigen Inhaltsstoffen.',
    budget: 5000,
    status: 'active',
    requirements: 'Min. 10K Follower, Beauty/Lifestyle Nische',
    category: 'Beauty',
    deadline: '2026-05-01',
    created_at: '2026-03-01T10:00:00Z',
    updated_at: '2026-03-15T14:00:00Z',
    applications: [{ count: 3 }],
    brand: { id: 'demo-brand-001', full_name: 'Dominic Schlierkamp', company_name: 'GlowUp Cosmetics' },
  },
  {
    id: 'demo-campaign-002',
    brand_id: 'demo-brand-001',
    title: 'Instagram Reels — Hautpflege Routine',
    description: 'Kurze Reels (30-60 Sek.) die unsere 3-Schritt Hautpflegeroutine zeigen. Authentisch, nicht gescriptet.',
    budget: 2500,
    status: 'active',
    requirements: 'Instagram Creator, 5K+ Follower',
    category: 'Beauty',
    deadline: '2026-04-15',
    created_at: '2026-03-10T08:00:00Z',
    updated_at: '2026-03-10T08:00:00Z',
    applications: [{ count: 1 }],
    brand: { id: 'demo-brand-001', full_name: 'Dominic Schlierkamp', company_name: 'GlowUp Cosmetics' },
  },
  {
    id: 'demo-campaign-003',
    brand_id: 'demo-brand-001',
    title: 'Weihnachtsaktion 2025 (Abgeschlossen)',
    description: 'Geschenksets-Promotion über TikTok und Instagram Stories.',
    budget: 8000,
    status: 'completed',
    requirements: null,
    category: 'Lifestyle',
    deadline: '2025-12-20',
    created_at: '2025-11-20T10:00:00Z',
    updated_at: '2025-12-22T18:00:00Z',
    applications: [{ count: 7 }],
    brand: { id: 'demo-brand-001', full_name: 'Dominic Schlierkamp', company_name: 'GlowUp Cosmetics' },
  },
  {
    id: 'demo-campaign-004',
    brand_id: 'demo-brand-001',
    title: 'Produkttest — Neue Serum-Linie',
    description: 'Entwurf für Q3-Kampagne: Influencer testen unser neues Vitamin-C Serum über 4 Wochen.',
    budget: 3500,
    status: 'draft',
    requirements: 'Skincare-fokussierte Creator',
    category: 'Beauty',
    deadline: null,
    created_at: '2026-03-25T09:00:00Z',
    updated_at: '2026-03-25T09:00:00Z',
    applications: [{ count: 0 }],
    brand: { id: 'demo-brand-001', full_name: 'Dominic Schlierkamp', company_name: 'GlowUp Cosmetics' },
  },
  {
    id: 'demo-campaign-005',
    brand_id: 'demo-brand-002',
    title: 'Protein-Shake Challenge',
    description: '30-Tage Fitness-Challenge mit unserem neuen Protein-Shake. Tägliche Story-Updates erwünscht.',
    budget: 4000,
    status: 'active',
    requirements: 'Fitness/Sport Creator, aktive Community',
    category: 'Fitness',
    deadline: '2026-05-15',
    created_at: '2026-03-05T12:00:00Z',
    updated_at: '2026-03-05T12:00:00Z',
    applications: [{ count: 2 }],
    brand: { id: 'demo-brand-002', full_name: 'Sarah Weber', company_name: 'FitLife Nutrition' },
  },
]

// ── Demo Applications ───────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const demoApplications: any[] = [
  {
    id: 'demo-app-001',
    campaign_id: 'demo-campaign-001',
    influencer_id: 'demo-influencer-001',
    status: 'approved',
    message: 'Ich liebe Naturkosmetik und passe perfekt zu eurer Marke!',
    created_at: '2026-03-05T11:00:00Z',
    updated_at: '2026-03-07T14:00:00Z',
    campaign: { id: 'demo-campaign-001', title: 'Sommer-Kollektion 2026 Launch' },
    influencer: { id: 'demo-influencer-001', full_name: 'Lena Müller' },
  },
  {
    id: 'demo-app-002',
    campaign_id: 'demo-campaign-002',
    influencer_id: 'demo-influencer-001',
    status: 'pending',
    message: 'Hautpflege ist mein Lieblingsthema — würde mich freuen!',
    created_at: '2026-03-15T09:30:00Z',
    updated_at: '2026-03-15T09:30:00Z',
    campaign: { id: 'demo-campaign-002', title: 'Instagram Reels — Hautpflege Routine' },
    influencer: { id: 'demo-influencer-001', full_name: 'Lena Müller' },
  },
  {
    id: 'demo-app-003',
    campaign_id: 'demo-campaign-001',
    influencer_id: 'demo-influencer-002',
    status: 'pending',
    message: 'Habe Erfahrung mit Beauty-Produktreviews auf YouTube.',
    created_at: '2026-03-08T16:00:00Z',
    updated_at: '2026-03-08T16:00:00Z',
    campaign: { id: 'demo-campaign-001', title: 'Sommer-Kollektion 2026 Launch' },
    influencer: { id: 'demo-influencer-002', full_name: 'Max Fischer' },
  },
  {
    id: 'demo-app-004',
    campaign_id: 'demo-campaign-005',
    influencer_id: 'demo-influencer-002',
    status: 'rejected',
    message: null,
    created_at: '2026-03-12T10:00:00Z',
    updated_at: '2026-03-14T11:00:00Z',
    campaign: { id: 'demo-campaign-005', title: 'Protein-Shake Challenge' },
    influencer: { id: 'demo-influencer-002', full_name: 'Max Fischer' },
  },
  {
    id: 'demo-app-005',
    campaign_id: 'demo-campaign-001',
    influencer_id: 'demo-influencer-001',
    status: 'approved',
    message: null,
    created_at: '2026-03-02T08:00:00Z',
    updated_at: '2026-03-04T10:00:00Z',
    campaign: { id: 'demo-campaign-001', title: 'Sommer-Kollektion 2026 Launch' },
    influencer: { id: 'demo-influencer-001', full_name: 'Lena Müller' },
  },
]

export function getDemoProfile(role: 'brand' | 'influencer' | 'admin'): Profile {
  switch (role) {
    case 'brand': return demoBrand
    case 'influencer': return demoInfluencer
    case 'admin': return demoAdmin
  }
}

export function getDemoBrandCampaigns() {
  return demoCampaigns.filter(c => c.brand_id === demoBrand.id)
}

export function getDemoActiveCampaigns() {
  return demoCampaigns.filter(c => c.status === 'active')
}

export function getDemoInfluencerApplications() {
  return demoApplications.filter(a => a.influencer_id === demoInfluencer.id)
}
