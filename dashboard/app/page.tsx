import { SeoOverview } from '@/widgets/SeoOverview'
import { GeoOverview } from '@/widgets/GeoOverview'
import { SnippetOverview } from '@/widgets/SnippetOverview'
import { SchemaOverview } from '@/widgets/SchemaOverview'
import { TasksOverview } from '@/widgets/TasksOverview'
import { EntityGraphOverview } from '@/widgets/EntityGraphOverview'
import { ProductsOverview } from '@/widgets/ProductsOverview'
import { AutomationOverview } from '@/widgets/AutomationOverview'
import { MetricCard } from '@/components/MetricCard'
import { getDashboardService } from '../../lib/dashboard/dashboard-service'

// Server component: merkezi dashboard-service'ten tek snapshot çeker.
// Hangi connector'ın mock/live olduğunu UI bilmez — USE_MOCK_DATA yönetir.
export default async function DashboardPage() {
  const service = getDashboardService()
  const snapshot = await service.getSnapshot()
  const connectors = service.getConnectorHealth()

  const generated = new Date(snapshot.generatedAt).toLocaleString('tr-TR')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Buzsu Growth OS</h1>
        <p className="text-slate-500 mt-1">
          Veri kaynağı: <strong>{snapshot.dataSource}</strong> · {generated}
        </p>
      </div>

      {/* Top Metrics — snapshot.metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {snapshot.metrics.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      {/* Module Grid — her widget snapshot'ın ilgili dilimiyle beslenir */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <SeoOverview data={snapshot.seo} />
        <GeoOverview data={snapshot.geo} />
        <SnippetOverview data={snapshot.geo} />
        <SchemaOverview data={snapshot.schema} />
        <EntityGraphOverview data={snapshot.entityGraph} />
        <TasksOverview data={snapshot.tasks} />
        <ProductsOverview data={snapshot.products} />
        <AutomationOverview connectors={connectors} />
      </div>
    </div>
  )
}
