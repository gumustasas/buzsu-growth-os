// lib/gsc/types.ts
// Google Search Console API tipleri (searchAnalytics.query)

export interface GscConfig {
  clientEmail: string
  privateKey: string
  siteUrl: string // örn 'https://www.buzsu.com.tr/'
}

export interface GscQueryRow {
  keys: string[] // [query] veya [page] veya [query, page]
  clicks: number
  impressions: number
  ctr: number
  position: number
}

export interface GscSearchAnalyticsResponse {
  rows?: GscQueryRow[]
  responseAggregationType?: string
}

export interface GscPerformanceRow {
  query: string
  clicks: number
  impressions: number
  ctr: number
  position: number
}

export const GSC_SITE_URL = 'https://www.buzsu.com.tr/'
export const GSC_TARGET_PAGE = 'https://www.buzsu.com.tr/su-aritma-cihazlari/'
