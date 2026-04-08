import { getTranslations } from 'next-intl/server'
import { type Metadata } from 'next'
import Navbar from '@/components/landing/navbar'
import Hero from '@/components/landing/sections/Hero'
import MarketplaceMarquee from '@/components/landing/sections/MarketplaceMarquee'
import StatsBar from '@/components/landing/sections/StatsBar'
import PlatformFeatures from '@/components/landing/sections/PlatformFeatures'
import HowItWorks from '@/components/landing/sections/HowItWorks'
import CreatorCommunity from '@/components/landing/sections/CreatorCommunity'
import Testimonials from '@/components/landing/sections/Testimonials'
import FeaturedPublications from '@/components/landing/sections/FeaturedPublications'
import FinalCTA from '@/components/landing/sections/FinalCTA'
import FAQ from '@/components/landing/sections/FAQ'
import Footer from '@/components/landing/sections/Footer'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.landing' })

  const baseUrl = 'https://prueffuchs.de'
  const canonical = locale === 'de' ? baseUrl : `${baseUrl}/en`

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical,
      languages: {
        de: baseUrl,
        en: `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: canonical,
      siteName: 'Prüffuchs',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
    },
  }
}

export default async function LandingPage({ params }: Props) {
  await params

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarketplaceMarquee />
        <StatsBar />
        <PlatformFeatures />
        <HowItWorks />
        <CreatorCommunity />
        <Testimonials />
        <FeaturedPublications />
        <FinalCTA />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
