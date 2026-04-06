import { getTranslations } from 'next-intl/server'
import { type Metadata } from 'next'
import Navbar from '@/components/landing/navbar'
import HeroSection from '@/components/landing/hero-section'
import HowItWorks from '@/components/landing/how-it-works'
import ForBrands from '@/components/landing/for-brands'
import ForInfluencers from '@/components/landing/for-influencers'
import FaqSection from '@/components/landing/faq-section'
import Footer from '@/components/landing/footer'

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
        <HeroSection />
        <HowItWorks />
        <ForBrands />
        <ForInfluencers />
        <FaqSection />
      </main>
      <Footer />
    </>
  )
}
