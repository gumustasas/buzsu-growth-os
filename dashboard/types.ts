// dashboard/types.ts
// Widget'ların kullandığı domain tiplerini tek noktadan re-export eden barrel.
// Kök `types/` ve `lib/` ile dashboard arasındaki sınır importu burada toplanır;
// widget'lar `@/types` üzerinden temiz şekilde import eder.

export type {
  DashboardSnapshot,
  MetricSummary,
  ConnectorHealth,
  DataSource,
} from '../types/dashboard'

export type { SeoOverviewData, KeywordRanking } from '../types/seo'
export type { GeoOverviewData, PaaQuestion, EeatSignal, AiOverviewSignal } from '../types/geo'
export type { SchemaOverviewData, SchemaInventoryItem } from '../types/schema'
export type { EntityGraphSummary, EntityType } from '../types/entity'
export type { ProductOverviewData, Product } from '../types/product'
export type { TasksOverviewData, TaskItem, TaskStatus } from '../types/task'
