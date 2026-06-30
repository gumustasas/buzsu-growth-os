// types/schema.ts
// Schema.org markup durum tipleri

export type SchemaType =
  | 'Organization'
  | 'WebSite'
  | 'BreadcrumbList'
  | 'CollectionPage'
  | 'FAQPage'
  | 'Product'
  | 'Offer'
  | 'Question'

export type SchemaStatus = 'present' | 'duplicate' | 'missing' | 'error'

export interface SchemaInventoryItem {
  type: SchemaType
  location: 'head' | 'body' | 'none'
  status: SchemaStatus
  note?: string
}

export interface SchemaOverviewData {
  url: string
  inventory: SchemaInventoryItem[]
  productSchemaPresent: boolean
  blockers: string[]
  source: 'mock' | 'html-audit'
  lastUpdated: string
}

export interface ProductJsonLd {
  '@context': 'https://schema.org'
  '@type': 'Product'
  name: string
  description?: string
  image?: string
  sku?: string
  brand: { '@type': 'Brand'; name: string }
  category?: string
  offers: {
    '@type': 'Offer'
    priceCurrency: 'TRY'
    price: string
    availability: string
    url: string
    seller?: { '@id': string }
  }
}
