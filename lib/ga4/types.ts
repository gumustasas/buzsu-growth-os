// lib/ga4/types.ts
// Google Analytics 4 Data API tipleri (runReport)

export interface Ga4Config {
  propertyId: string
  clientEmail: string
  privateKey: string
}

export interface Ga4MetricRow {
  dimension: string // örn tarih veya sayfa yolu
  sessions: number
  users: number
  bounceRate: number
}

export interface Ga4EventRow {
  eventName: string
  count: number
}

export interface Ga4OverviewData {
  totalSessions: number
  totalUsers: number
  whatsappClicks: number
  whatsappClickRate: number // whatsappClicks / sessions
  topPages: Ga4MetricRow[]
  source: 'mock' | 'ga4'
  lastUpdated: string
}

export const GA4_WHATSAPP_EVENT = 'whatsapp_click'
export const GA4_TARGET_PAGE = '/su-aritma-cihazlari/'
