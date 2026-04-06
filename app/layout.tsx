import type { ReactNode } from 'react'

// Root layout required by Next.js.
// HTML structure, fonts, and providers are defined in app/[locale]/layout.tsx.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children as unknown as React.ReactElement
}
