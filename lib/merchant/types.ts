// lib/merchant/types.ts
// Google Merchant Center API tipleri (products / productStatuses)

export interface MerchantConfig {
  merchantId: string
  clientEmail: string
  privateKey: string
}

export type MerchantItemStatus = 'approved' | 'disapproved' | 'pending' | 'expiring'

export interface MerchantProductStatus {
  productId: string
  sku?: string
  title: string
  status: MerchantItemStatus
  issues?: string[]
  priceTry?: number
}

export interface MerchantOverviewData {
  items: MerchantProductStatus[]
  approvedCount: number
  disapprovedCount: number
  priceMismatchCount: number // Airtable Price TRY ile MC price uyuşmazlığı
  source: 'mock' | 'merchant'
  lastUpdated: string
}
