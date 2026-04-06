import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Inter } from 'next/font/google'
import { routing } from '@/i18n/routing'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Prüffuchs',
    default: 'Prüffuchs – Influencer Marketing Plattform',
  },
  description:
    'Prüffuchs verbindet Marken mit Influencern für authentisches Marketing. Erstelle Kampagnen, finde die richtigen Creator und verwalte deine Kooperationen.',
  keywords: ['Influencer Marketing', 'Kampagnen', 'Creator', 'Marken', 'Kooperationen'],
  authors: [{ name: 'Prüffuchs' }],
  openGraph: {
    type: 'website',
    siteName: 'Prüffuchs',
  },
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'de' | 'en')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
