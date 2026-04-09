import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Star } from 'lucide-react'

const avatarUrls = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
]

const testimonialIds = ['1', '2', '3', '4', '5', '6'] as const

export default function Testimonials() {
  const t = useTranslations('landing.testimonials')

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="tracking-widest text-sm text-brand-orange font-semibold mb-4">
            {t('label')}
          </p>
          <h2 className="text-4xl lg:text-6xl font-bold text-brand-navy animate-fade-in-up">
            {t('headline')}{' '}
            <span className="text-brand-orange font-serif italic font-semibold">{t('headlineAccent')}</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonialIds.map((id, index) => (
            <div
              key={id}
              className="rounded-2xl p-8 border border-brand-orange-100 bg-brand-orange-50/30 hover:shadow-lg transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-brand-orange"
                    fill="currentColor"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="italic text-base text-brand-navy/80 mb-6">
                &ldquo;{t(`items.${id}.quote`)}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Image
                  unoptimized
                  src={avatarUrls[index]}
                  alt={t(`items.${id}.name`)}
                  width={48}
                  height={48}
                  className="rounded-full w-12 h-12 object-cover border-2 border-brand-orange/20"
                />
                <div>
                  <p className="font-semibold text-brand-navy text-sm">
                    {t(`items.${id}.name`)}
                  </p>
                  <p className="text-xs text-brand-navy/60">
                    {t(`items.${id}.role`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
