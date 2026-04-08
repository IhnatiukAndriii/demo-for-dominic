import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { siteConfig } from '@/lib/site-config'

export default function MarketplaceMarquee() {
  const t = useTranslations('marketplaces')
  const logos = [...siteConfig.marketplaces, ...siteConfig.marketplaces]

  return (
    <section id="marketplace-marquee" className="bg-white py-12 lg:py-16">
      <p className="text-center text-xs lg:text-sm uppercase tracking-wider text-brand-navy/60 font-medium mb-8 lg:mb-10">
        {t('label')}
      </p>

      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {logos.map((mp, i) => (
            <div
              key={`${mp.name}-${i}`}
              className="mx-8 lg:mx-12 flex-shrink-0 flex items-center text-brand-navy/60 hover:text-brand-navy transition-colors"
            >
              <Image
                src={mp.logo}
                alt={mp.name}
                width={120}
                height={40}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
