// lib/dashboard/dashboard-service.ts
// Tüm connector client'ları tek bir DashboardSnapshot'ta birleştiren orkestrasyon katmanı.
// Dashboard UI bu servisi çağırır; hangi connector'ın mock/live olduğunu bilmez.

import { createAirtableClient } from '../airtable/client'
import { createSerperClient } from '../serper/client'
import { createGscClient } from '../gsc/client'
import { USE_MOCK_DATA, flagSummary } from '../../config/feature-flags'
import { getEntityGraphSummary } from '../../knowledge-graph/api'
import type {
  DashboardSnapshot,
  MetricSummary,
  DataSource,
  ConnectorHealth,
} from '../../types/dashboard'
import type { SchemaOverviewData } from '../../types/schema'
import type { TasksOverviewData } from '../../types/task'

// --- Schema overview (TASK-002 HTML doğrulamasından statik) ---

function getSchemaOverview(): SchemaOverviewData {
  return {
    url: 'https://www.buzsu.com.tr/su-aritma-cihazlari/',
    inventory: [
      { type: 'Organization', location: 'head', status: 'present' },
      { type: 'WebSite', location: 'head', status: 'present' },
      { type: 'BreadcrumbList', location: 'head', status: 'present' },
      { type: 'BreadcrumbList', location: 'body', status: 'duplicate', note: 'Body kopyası kaldırılmalı' },
      { type: 'CollectionPage', location: 'body', status: 'present' },
      { type: 'FAQPage', location: 'body', status: 'present', note: '6 soru' },
      { type: 'Product', location: 'none', status: 'missing', note: 'TASK-006 blocked' },
    ],
    productSchemaPresent: false,
    blockers: [
      'Airtable: SKU + Image URL + Schema Description doldurulmalı',
      'TASK-006 CI3.7.1 entegrasyonu insan onayı bekliyor',
    ],
    source: 'mock',
    lastUpdated: new Date().toISOString(),
  }
}

// --- Tasks overview (tasks/ durumundan statik) ---

function getTasksOverview(): TasksOverviewData {
  const tasks: TasksOverviewData['tasks'] = [
    { id: 'TASK-001', title: 'SERP + HTML analizi', area: 'seo', status: 'partial' },
    { id: 'TASK-003', title: 'Product Schema mimarisi', area: 'schema', status: 'done' },
    { id: 'TASK-004', title: 'Airtable alan tanımı', area: 'schema', status: 'done' },
    { id: 'TASK-005', title: 'CI3.7.1 entegrasyon planı', area: 'schema', status: 'done' },
    { id: 'SPRINT-002', title: 'Dashboard + KG temeli', area: 'platform', status: 'done' },
  ]
  return {
    tasks,
    activeCount: tasks.filter((t) => t.status === 'active').length,
    blockedCount: tasks.filter((t) => t.status === 'blocked').length,
    doneCount: tasks.filter((t) => t.status === 'done').length,
    source: 'mock',
    lastUpdated: new Date().toISOString(),
  }
}

// --- Üst metrikler ---

function buildMetrics(
  schema: SchemaOverviewData,
  productCount: number,
  entityTotal: number,
  avgPosition: number | null,
  activeTasks: number
): MetricSummary[] {
  return [
    { label: 'Aktif Görev', value: String(activeTasks), trend: 'Sprint-3', status: 'info' },
    { label: 'Entity Sayısı', value: String(entityTotal), trend: '150 hedef', status: 'info' },
    {
      label: 'Schema Durumu',
      value: schema.productSchemaPresent ? 'Tam' : 'Eksik',
      trend: 'Product ❌',
      status: schema.productSchemaPresent ? 'ok' : 'warn',
    },
    {
      label: 'SERP Pozisyon (avg)',
      value: avgPosition != null ? `~${avgPosition}` : '?',
      trend: USE_MOCK_DATA ? 'mock veri' : 'live',
      status: 'warn',
    },
    { label: 'AI Overview', value: '?', trend: 'Serper mock', status: 'warn' },
    { label: 'Ürün (Aktif)', value: String(productCount), trend: 'Airtable', status: 'ok' },
  ]
}

// --- Ana servis ---

export interface DashboardService {
  getSnapshot(): Promise<DashboardSnapshot>
  getConnectorHealth(): ConnectorHealth[]
}

class DefaultDashboardService implements DashboardService {
  async getSnapshot(): Promise<DashboardSnapshot> {
    const airtable = createAirtableClient()
    const serper = createSerperClient()
    const gsc = createGscClient()

    // Connector'lar paralel çağrılır.
    const [products, seo, geo] = await Promise.all([
      airtable.getProductOverview(),
      serper.getSeoOverview(),
      serper.getGeoOverview(),
    ])

    // GSC pozisyonu SEO ortalamasını zenginleştirebilir (şimdilik mock).
    await gsc.getTargetPagePosition().catch(() => null)

    const schema = getSchemaOverview()
    const tasks = getTasksOverview()
    const entityGraph = getEntityGraphSummary()

    const dataSource: DataSource = USE_MOCK_DATA ? 'mock' : 'live'

    return {
      generatedAt: new Date().toISOString(),
      dataSource,
      metrics: buildMetrics(
        schema,
        products.activeCount,
        entityGraph.totalEntities,
        seo.averagePosition,
        tasks.activeCount
      ),
      seo,
      geo,
      schema,
      entityGraph,
      products,
      tasks,
    }
  }

  getConnectorHealth(): ConnectorHealth[] {
    const summary = flagSummary()
    const now = new Date().toISOString()
    return (Object.keys(summary.resolved) as Array<keyof typeof summary.resolved>).map(
      (connector) => ({
        connector,
        configured: summary.connectors[connector],
        mode: summary.resolved[connector] as 'mock' | 'live',
        lastChecked: now,
      })
    )
  }
}

let _instance: DashboardService | null = null

/** Singleton dashboard service. */
export function getDashboardService(): DashboardService {
  if (!_instance) _instance = new DefaultDashboardService()
  return _instance
}
