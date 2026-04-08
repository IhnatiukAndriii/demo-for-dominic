export const siteConfig = {
  stats: {
    creators: { value: '[XXX]', label: 'Creator in der Community' },
    campaigns: { value: '[XXX]', label: 'Abgeschlossene Kampagnen' },
    refundTime: { value: '[XXX]', label: 'Durchschnittliche Erstattungszeit' },
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
