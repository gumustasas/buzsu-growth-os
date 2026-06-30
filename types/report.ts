// types/report.ts
// outputs/reports/ rapor metadata tipleri

export interface ReportMeta {
  slug: string
  title: string
  filePath: string
  date: string
  agent?: string
  status?: 'success' | 'partial' | 'failed' | 'completed'
}

export interface ReportsOverviewData {
  reports: ReportMeta[]
  total: number
  source: 'mock' | 'filesystem'
  lastUpdated: string
}
