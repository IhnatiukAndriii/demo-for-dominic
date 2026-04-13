/**
 * FeaturedPublications section — currently disabled per client request.
 * Will be activated once Prüffuchs has real press coverage.
 *
 * To enable: import this component and render it in app/[locale]/page.tsx
 * between the Testimonials and FinalCTA sections.
 */

const PUBLICATIONS = [
  { name: 't3n', logo: '/publications/t3n.svg' },
  { name: 'Gründerszene', logo: '/publications/gruenderszene.svg' },
  { name: 'OMR', logo: '/publications/omr.svg' },
  { name: 'Horizont', logo: '/publications/horizont.svg' },
  { name: 'Deutsche Startups', logo: '/publications/deutsche-startups.svg' },
];

export function FeaturedPublications() {
  return (
    <section className="section-wash-orange py-20 lg:py-28 px-6 lg:px-10 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-brand-navy/60 uppercase tracking-wider mb-10">
          Featured in leading publications
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-16 opacity-60 grayscale">
          {PUBLICATIONS.map((pub) => (
            <div key={pub.name} className="text-2xl font-bold text-brand-navy/70">
              {pub.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
