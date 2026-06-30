// types/seo.ts
// SEO domain tipleri — Serper + GSC connector çıktıları

export interface KeywordRanking {
  query: string
  position: number | null
  previousPosition?: number | null
  searchVolume?: number | null
  url?: string
  trend?: 'up' | 'down' | 'flat'
}

export interface SerpFeature {
  type: 'featured_snippet' | 'paa' | 'ai_overview' | 'image_pack' | 'local_pack' | 'shopping'
  present: boolean
  ownedByBuzsu?: boolean
}

export interface SerpSnapshot {
  query: string
  capturedAt: string // ISO date
  topResults: Array<{ position: number; title: string; url: string; domain: string }>
  features: SerpFeature[]
}

export interface SeoOverviewData {
  trackedKeywords: KeywordRanking[]
  averagePosition: number | null
  topRankingQuery: string | null
  source: 'mock' | 'serper' | 'gsc'
  lastUpdated: string
}
