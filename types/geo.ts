// types/geo.ts
// GEO / AI Overview domain tipleri

export interface AiOverviewSignal {
  query: string
  appearsInAiOverview: boolean
  buzsuCited: boolean
  citedDomains?: string[]
  capturedAt: string
}

export interface PaaQuestion {
  question: string
  answeredByBuzsu: boolean
  answeredBySuvesu: boolean
  targetUrl?: string
}

export interface EeatSignal {
  label: string
  status: 'strong' | 'medium' | 'weak' | 'missing'
  note?: string
}

export interface GeoOverviewData {
  aiOverviewSignals: AiOverviewSignal[]
  paaCoverage: PaaQuestion[]
  eeatSignals: EeatSignal[]
  paaCoveredCount: number
  paaTotalCount: number
  source: 'mock' | 'serper'
  lastUpdated: string
}
