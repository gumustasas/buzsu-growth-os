// types/dashboard.ts
// Dashboard üst seviye birleşik tipler

import type { SeoOverviewData } from './seo'
import type { GeoOverviewData } from './geo'
import type { SchemaOverviewData } from './schema'
import type { EntityGraphSummary } from './entity'
import type { ProductOverviewData } from './product'
import type { TasksOverviewData } from './task'

export type DataSource = 'mock' | 'live'

export interface MetricSummary {
  label: string
  value: string
  trend?: string
  status: 'ok' | 'warn' | 'error' | 'info'
}

export interface DashboardSnapshot {
  generatedAt: string
  dataSource: DataSource
  metrics: MetricSummary[]
  seo: SeoOverviewData
  geo: GeoOverviewData
  schema: SchemaOverviewData
  entityGraph: EntityGraphSummary
  products: ProductOverviewData
  tasks: TasksOverviewData
}

export interface ConnectorHealth {
  connector: 'airtable' | 'serper' | 'gsc' | 'ga4' | 'merchant'
  configured: boolean
  mode: 'mock' | 'live'
  lastChecked: string
}
