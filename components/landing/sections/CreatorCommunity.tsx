import { useTranslations } from 'next-intl'
import Image from 'next/image'

const categories = [
  { id: 'beauty', anchor: 'cat-beauty', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=640&h=900&fit=crop' },
  { id: 'home', anchor: 'cat-home', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=640&h=900&fit=crop' },
  { id: 'fitness', anchor: 'cat-fitness', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=640&h=900&fit=crop' },
  { id: 'pets', anchor: 'cat-pets', img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=640&h=900&fit=crop' },
  { id: 'fashion', anchor: 'cat-fashion', img: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=640&h=900&fit=crop' },
  { id: 'food', anchor: 'cat-food', img: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=640&h=900&fit=crop' },
  { id: 'family', anchor: 'cat-family', img: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=640&h=900&fit=crop' },
  { id: 'tech', anchor: 'cat-tech', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=640&h=900&fit=crop' },
]

export default function CreatorCommunity() {
  const t = useTranslations('landing.creatorCommunity')

  return (
    <section id="creator-community" className="bg-white py-20 lg:py-28 px-6 lg:px-10">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center px-6 mb-16">
        <p className="tracking-widest text-sm text-brand-orange font-semibold mb-4">
          {t('label')}
        </p>
        <h2 className="text-3xl lg:text-4xl font-normal text-slate-900 mb-4 text-balance animate-fade-in-up">
          {t('headline')}{' '}
          <span className="text-brand-orange font-serif italic font-semibold">{t('headlineAccent')}</span>{' '}
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
              id={cat.anchor}
              className="scroll-mt-24 flex-shrink-0 snap-start w-[280px] lg:w-[320px] h-[440px] lg:h-[500px] rounded-3xl overflow-hidden relative group cursor-pointer hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
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
