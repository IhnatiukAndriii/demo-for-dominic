import { getTranslations } from 'next-intl/server'
import { type Metadata } from 'next'
import Navbar from '@/components/landing/navbar'
import InfluencerHero from '@/components/landing/sections/influencer/InfluencerHero'
import MarketplaceMarquee from '@/components/landing/sections/MarketplaceMarquee'
import InfluencerBenefits from '@/components/landing/sections/influencer/InfluencerBenefits'
import InfluencerHowItWorks from '@/components/landing/sections/influencer/InfluencerHowItWorks'
import StatsBar from '@/components/landing/sections/StatsBar'
import InfluencerRequirements from '@/components/landing/sections/influencer/InfluencerRequirements'
import InfluencerCTA from '@/components/landing/sections/influencer/InfluencerCTA'
import Footer from '@/components/landing/sections/Footer'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.influencer' })

  const baseUrl = 'https://prueffuchs.de'
  const canonical = locale === 'de' ? `${baseUrl}/influencer` : `${baseUrl}/en/influencer`

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical,
      languages: {
        de: `${baseUrl}/influencer`,
        en: `${baseUrl}/en/influencer`,
      },
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: canonical,
      siteName: 'Prueffuchs',
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

export default async function InfluencerPage({ params }: Props) {
  await params

  return (
    <>
      <Navbar />
      <main>
        <InfluencerHero />
        <MarketplaceMarquee />
        <InfluencerBenefits />
        <InfluencerHowItWorks />
        <StatsBar />
        <InfluencerRequirements />
        <InfluencerCTA />
      </main>
      <Footer />
    </>
  )
}
