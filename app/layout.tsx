import type { Metadata } from 'next'
import './globals.css'

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
    locale: 'de_DE',
    siteName: 'Prüffuchs',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}
