// types/product.ts
// Airtable Products tablosu domain tipleri

export type ProductCategory = 'Su Aritma' | 'TDS Metre' | 'Filtre'

export interface Product {
  id: string // Airtable record id
  name: string
  category: ProductCategory | string
  priceTry: number
  buzsuUrl: string
  suvesuArticle?: string
  active: boolean
  notes?: string
  // TASK-004 ile eklenecek alanlar — şimdilik opsiyonel
  sku?: string
  imageUrl?: string
  schemaDescription?: string
}

export interface ProductOverviewData {
  products: Product[]
  activeCount: number
  totalCount: number
  schemaReadyCount: number // sku + imageUrl + schemaDescription dolu olanlar
  source: 'mock' | 'airtable'
  lastUpdated: string
}
