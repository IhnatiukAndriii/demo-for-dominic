import type { Metadata } from 'next'

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
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
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
