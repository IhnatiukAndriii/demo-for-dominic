'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link } from '@/lib/navigation'
import { buttonVariants } from '@/components/ui/button'

export default function InfluencerHero() {
  const t = useTranslations('influencer.hero')
  const [creatorErrored, setCreatorErrored] = useState(false)

  return (
    <section className="section-wash-orange relative overflow-hidden py-24 lg:py-32 px-6 lg:px-10">
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-10 lg:gap-12 items-center">
          <div className="min-w-0 w-full z-10">
            <h1 className="anim-fade-up text-5xl lg:text-6xl font-normal text-slate-900 leading-[1.1]">
              {t('headline')}
            </h1>

            <p className="anim-fade-up delay-150 mt-6 text-lg lg:text-xl text-slate-600 max-w-xl">
              {t('subline')}
            </p>

            <div className="anim-fade-up delay-300 mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/signup?role=creator"
                className={`${buttonVariants({ size: 'lg' })} h-12 px-6 text-base bg-orange-500 hover:bg-orange-600 text-white`}
              >
                {t('ctaPrimary')}
              </Link>
              <a
                href="#how-it-works"
                className={`${buttonVariants({ size: 'lg', variant: 'ghost' })} h-12 px-6 text-base text-slate-900 hover:bg-slate-100`}
              >
                {t('ctaSecondary')}
              </a>
            </div>
          </div>

          <div className="relative min-w-0 flex justify-center lg:justify-end">
            <div className="relative w-full flex justify-center lg:justify-end">
              <div className="anim-fade-scale delay-400 relative w-[320px] h-[320px] lg:w-[400px] lg:h-[400px] rounded-full ring-4 ring-white shadow-2xl overflow-hidden bg-slate-200">
                {!creatorErrored && (
                  <Image
                    src="/prueffuchs-creator-01.jpg"
                    alt="Prüffuchs Creator"
                    fill
                    priority
                    sizes="(min-width: 1024px) 400px, 320px"
                    className="object-cover"
                    onError={() => setCreatorErrored(true)}
                  />
                )}
              </div>

              <div className="anim-fade-left delay-700 hidden md:block absolute -right-8 -bottom-4 w-44 lg:w-52">
                <Image
                  src="/prueffuchs-mascot-full.png"
                  alt="Prüffuchs Mascot"
                  width={500}
                  height={600}
                  priority
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
