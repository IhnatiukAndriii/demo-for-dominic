import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Authentifizierung',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-950 via-brand-900 to-indigo-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      </div>

      {/* Logo/Brand area */}
      <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex flex-col items-center mb-8">
          <img src="/fox-mascot.png" alt="Prüffuchs Mascot" className="w-32 h-auto mb-4 drop-shadow-lg" />
          <div className="flex items-center gap-3">
            <img src="/fox-icon.png" alt="Prüffuchs" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-bold text-white tracking-tight">
              Prüffuchs
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
        {children}
      </div>

      {/* Footer */}
      <div className="relative mt-8 text-center">
        <p className="text-sm text-brand-300">
          © {new Date().getFullYear()} Prüffuchs. Alle Rechte vorbehalten.
        </p>
      </div>
    </div>
  )
}
