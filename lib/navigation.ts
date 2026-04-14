import { CALENDLY_URL } from '@/lib/site-config'

export { Link, redirect, usePathname, useRouter } from '@/i18n/routing'
export { CALENDLY_URL }

export type NavItem = {
  label: string
  href: string
  external?: boolean
}

export type NavGroup = {
  label: string
  items: NavItem[]
}

export type NavCta = {
  label: string
  href: string
  external?: boolean
}

export type LandingNav = {
  groups: NavGroup[]
  links: NavItem[]
  ctaPrimary: NavCta
  ctaSecondary: NavCta
}

type Translator = (key: string) => string

export function brandNav(t: Translator): LandingNav {
  return {
    groups: [
      {
        label: t('brand.platform'),
        items: [
          { label: t('brand.platformItems.influencerCampaigns'), href: '#feat-influencer-campaigns' },
          { label: t('brand.platformItems.verification'), href: '#feat-verification' },
          { label: t('brand.platformItems.campaignMgmt'), href: '#how-it-works' },
          { label: t('brand.platformItems.adminDashboard'), href: '#feat-admin-dashboard' },
        ],
      },
      {
        label: t('brand.solutions'),
        items: [
          { label: t('brand.solutionItems.amazon'), href: '#mp-amazon' },
          { label: t('brand.solutionItems.ottoKaufland'), href: '#mp-otto-kaufland' },
          { label: t('brand.solutionItems.zalando'), href: '#mp-zalando' },
          { label: t('brand.solutionItems.shopify'), href: '#mp-shopify' },
        ],
      },
      {
        label: t('brand.resources'),
        items: [
          { label: t('brand.resourceItems.faq'), href: '#faq' },
          { label: t('brand.resourceItems.contact'), href: 'mailto:team@prueffuchs.de', external: true },
          { label: t('brand.resourceItems.imprint'), href: '/impressum' },
        ],
      },
    ],
    links: [
      { label: t('brand.pricing'), href: '#pricing' },
    ],
    ctaPrimary: {
      label: t('brand.ctaPrimary'),
      href: CALENDLY_URL,
      external: true,
    },
    ctaSecondary: {
      label: t('login'),
      href: '/login',
    },
  }
}

export function creatorNav(t: Translator): LandingNav {
  return {
    groups: [
      {
        label: t('creator.categories'),
        items: [
          { label: t('creator.categoryItems.beauty'), href: '/#cat-beauty' },
          { label: t('creator.categoryItems.fashion'), href: '/#cat-fashion' },
          { label: t('creator.categoryItems.home'), href: '/#cat-home' },
          { label: t('creator.categoryItems.fitness'), href: '/#cat-fitness' },
          { label: t('creator.categoryItems.food'), href: '/#cat-food' },
          { label: t('creator.categoryItems.pets'), href: '/#cat-pets' },
        ],
      },
    ],
    links: [
      { label: t('creator.howItWorks'), href: '/influencer#how-it-works' },
      { label: t('creator.requirements'), href: '/influencer#requirements' },
    ],
    ctaPrimary: {
      label: t('creator.ctaPrimary'),
      href: '/signup?role=creator',
    },
    ctaSecondary: {
      label: t('login'),
      href: '/login',
    },
  }
}
