import { faqs, services } from './data/content'

export const SITE_URL = 'https://www.greenideas.solutions'

// Strukturirani podaci (schema.org) koje Google koristi za "rich results"
// i za Knowledge Panel kada neko ukuca "Green Ideas".
export function structuredData() {
  const business = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': `${SITE_URL}/#business`,
    name: 'Green Ideas Solutions & Consulting',
    alternateName: ['Green Ideas', 'GreenIdeas', 'Green Ideas Beograd', 'Green Ideas solarni paneli'],
    legalName: 'Miljan Žikić PR inženjerske delatnosti i tehničko savetovanje',
    description:
      'Solarni paneli i solarni sistemi ključ u ruke: analiza, elaborat, nabavka opreme, ugradnja i papirologija za status kupac-proizvođač. On-grid i off-grid sistemi za kuće i firme u Beogradu i celoj Srbiji.',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logos/green-ideas-logo.jpg`,
    image: [`${SITE_URL}/media/hero-poster.jpg`, `${SITE_URL}/logos/green-ideas-logo.jpg`],
    telephone: '+381659133122',
    email: 'office@greenideas.solutions',
    vatID: '113971031',
    taxID: '113971031',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rudi Čajaveca 1B',
      addressLocality: 'Beograd',
      addressRegion: 'Zvezdara',
      addressCountry: 'RS',
    },
    areaServed: [
      { '@type': 'City', name: 'Beograd' },
      { '@type': 'Country', name: 'Srbija' },
    ],
    contactPoint: [
      { '@type': 'ContactPoint', telephone: '+381659133122', contactType: 'customer service', areaServed: 'RS', availableLanguage: ['sr', 'en'] },
      { '@type': 'ContactPoint', telephone: '+381645022442', contactType: 'sales', areaServed: 'RS', availableLanguage: ['sr', 'en'] },
    ],
    sameAs: ['https://www.instagram.com/greenideas_belgrade/'],
    knowsAbout: ['solarni paneli', 'solarni sistemi', 'solarne elektrane', 'kupac-proizvođač', 'on-grid', 'off-grid', 'fotonaponski sistemi'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Solarni paneli i solarni sistemi',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.body, serviceType: 'Ugradnja solarnih panela' },
      })),
    },
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: 'Green Ideas',
    alternateName: 'Green Ideas – solarni paneli',
    inLanguage: 'sr-Latn-RS',
    publisher: { '@id': `${SITE_URL}/#business` },
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return [business, website, faqPage]
    .map((obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`)
    .join('\n    ')
}
