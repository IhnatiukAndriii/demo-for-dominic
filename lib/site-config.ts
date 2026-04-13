export const CALENDLY_URL = 'https://calendly.com/amzideal/30min'

export const siteConfig = {
  stats: {
    creators: { value: '500+', label: 'Creator in der Community' },
    campaigns: { value: '120+', label: 'Erfolgreiche Kampagnen' },
    refundTime: { value: '48h', label: 'Durchschnittliche Erstattungszeit' },
  },
  marketplaces: [
    { name: 'Amazon', logo: '/marketplaces/amazon.svg' },
    { name: 'Shopify', logo: '/marketplaces/shopify.svg' },
    { name: 'OTTO', logo: '/marketplaces/otto.svg' },
    { name: 'Kaufland', logo: '/marketplaces/kaufland.svg' },
    { name: 'eBay', logo: '/marketplaces/ebay.svg' },
    { name: 'Zalando', logo: '/marketplaces/zalando.svg' },
    { name: 'dm', logo: '/marketplaces/dm.svg' },
    { name: 'Rossmann', logo: '/marketplaces/rossmann.svg' },
  ],
  features: {
    publicationsEnabled: false,
  },
} as const;
