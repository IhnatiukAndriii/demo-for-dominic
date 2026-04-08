import { useTranslations } from 'next-intl'
import Image from 'next/image'

const categories = [
  { id: 'beauty', img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=640&h=900&fit=crop' },
  { id: 'home', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=640&h=900&fit=crop' },
  { id: 'fitness', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=640&h=900&fit=crop' },
  { id: 'pets', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=640&h=900&fit=crop' },
  { id: 'fashion', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=640&h=900&fit=crop' },
  { id: 'food', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=640&h=900&fit=crop' },
  { id: 'family', img: 'https://images.unsplash.com/photo-1581952976147-5a2d15560349?w=640&h=900&fit=crop' },
  { id: 'tech', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=640&h=900&fit=crop' },
]

export default function CreatorCommunity() {
  const t = useTranslations('landing.creatorCommunity')

  return (
    <section id="creator-community" className="py-24 lg:py-32 bg-brand-orange-50/30">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center px-6 mb-16">
        <p className="tracking-widest text-sm text-brand-orange font-semibold mb-4">
          {t('label')}
        </p>
        <h2 className="text-4xl lg:text-6xl font-bold text-brand-navy mb-4 text-balance">
          {t('headline')}{' '}
          <span className="text-brand-orange italic">{t('headlineAccent')}</span>{' '}
          {t('headlineEnd')}
        </h2>
        <p className="text-lg text-brand-navy/70 max-w-2xl mx-auto">
          {t('subhead')}
        </p>
      </div>

      {/* Horizontal scroller */}
      <div className="overflow-x-auto pb-8 scroll-smooth snap-x snap-mandatory scrollbar-hide">
        <div className="flex gap-6 px-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex-shrink-0 snap-start w-[280px] lg:w-[320px] h-[440px] lg:h-[500px] rounded-3xl overflow-hidden relative group cursor-pointer"
            >
              {/* Background image */}
              <Image
                src={cat.img}
                alt=""
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#001830] via-[#001830]/60 to-transparent" />
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs tracking-widest text-brand-orange mb-2">
                  {t(`categories.${cat.id}.label`)}
                </p>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t(`categories.${cat.id}.title`)}
                </h3>
                <p className="text-sm text-white/80">
                  {t(`categories.${cat.id}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
