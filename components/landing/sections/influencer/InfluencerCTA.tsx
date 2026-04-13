'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/lib/navigation'
import { buttonVariants } from '@/components/ui/button'

export default function InfluencerCTA() {
  const t = useTranslations('influencer.finalCta')

  return (
    <section className="bg-white py-20 lg:py-28 px-6 lg:px-10 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-normal text-slate-900 mb-8">
          {t('title')}
        </h2>

        <div className="flex justify-center">
          <Link
            href="/signup?role=creator"
            className={`${buttonVariants({ size: 'lg' })} h-12 px-6 text-base bg-orange-500 hover:bg-orange-600 text-white`}
          >
            {t('button')}
          </Link>
        </div>
      </div>
    </section>
  )
}
