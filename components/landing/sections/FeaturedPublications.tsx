import { siteConfig } from '@/lib/site-config'

export default function FeaturedPublications() {
  if (!siteConfig.features.publicationsEnabled) {
    return null
  }

  return (
    <section id="featured-publications" className="py-24">
      <h2>FeaturedPublications placeholder</h2>
    </section>
  )
}
