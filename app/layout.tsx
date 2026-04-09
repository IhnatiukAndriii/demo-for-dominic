import type { Metadata } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import { getLocale } from 'next-intl/server'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['400', '600', '700'],
  style: ['italic'],
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
  icons: {
    icon: '/prueffuchs-mascot-face.png',
    apple: '/prueffuchs-mascot-face.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Prüffuchs',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  return (
    <html lang={locale} className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans">
        {children}
      </body>
    </html>
  )
}
