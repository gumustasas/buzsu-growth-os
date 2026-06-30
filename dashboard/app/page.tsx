import { SeoOverview } from '@/widgets/SeoOverview'
import { GeoOverview } from '@/widgets/GeoOverview'
import { SnippetOverview } from '@/widgets/SnippetOverview'
import { SchemaOverview } from '@/widgets/SchemaOverview'
import { TasksOverview } from '@/widgets/TasksOverview'
import { EntityGraphOverview } from '@/widgets/EntityGraphOverview'
import { MetricCard } from '@/components/MetricCard'

const topMetrics = [
  { label: 'Aktif Görev', value: '5', trend: '+2', status: 'info' as const },
  { label: 'Entity Sayısı', value: '10', trend: '+10', status: 'info' as const },
  { label: 'Schema Durumu', value: 'Eksik', trend: 'Product ❌', status: 'warn' as const },
  { label: 'SERP Pozisyon (avg)', value: '~12', trend: 'GSC bağlı değil', status: 'warn' as const },
  { label: 'AI Overview', value: '?', trend: 'Serper bağlı değil', status: 'warn' as const },
  { label: 'Ürün (Aktif)', value: '5', trend: 'Airtable ✅', status: 'ok' as const },
]

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Buzsu Growth OS</h1>
        <p className="text-slate-500 mt-1">
          Sprint-2 · Dashboard iskelet · Mock data · 2026-06-30
        </p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {topMetrics.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <SeoOverview />
        <GeoOverview />
        <SnippetOverview />
        <SchemaOverview />
        <TasksOverview />
        <EntityGraphOverview />
      </div>
    </div>
  )
}
