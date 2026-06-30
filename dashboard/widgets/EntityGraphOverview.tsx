import { ModuleCard } from '@/components/ModuleCard'
import type { EntityGraphSummary, EntityType } from '@/types'

interface EntityGraphOverviewProps {
  data: EntityGraphSummary
}

// EntityType → görsel etiket + ikon. byType'da olmayan tipler 0 gösterilir.
const DISPLAY: Array<{ type: EntityType; label: string; icon: string }> = [
  { type: 'Organization', label: 'Organizasyon', icon: '🏢' },
  { type: 'Brand', label: 'Marka', icon: '🏷️' },
  { type: 'Product', label: 'Ürün', icon: '📦' },
  { type: 'Component', label: 'Bileşen', icon: '🔧' },
  { type: 'Technology', label: 'Teknoloji', icon: '⚙️' },
  { type: 'Contaminant', label: 'Kirletici', icon: '⚗️' },
  { type: 'Mineral', label: 'Mineral', icon: '💎' },
  { type: 'FAQ', label: 'SSS', icon: '❓' },
  { type: 'Location', label: 'Lokasyon', icon: '📍' },
]

export function EntityGraphOverview({ data }: EntityGraphOverviewProps) {
  const pct = Math.round((data.totalEntities / data.targetEntities) * 100)
  const status = data.source === 'mock' ? 'mock' : 'live'
  const visible = DISPLAY.filter((d) => (data.byType[d.type] ?? 0) > 0)

  return (
    <ModuleCard title="Entity Graph" icon="🕸️" status={status}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-slate-500">
          Seed: {data.totalEntities} / {data.targetEntities} hedef
        </span>
        <span className="text-xs font-semibold text-blue-600">%{pct}</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-1.5 mb-4">
        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {visible.map((e) => (
          <div
            key={e.type}
            className="flex flex-col items-center bg-slate-50 rounded-lg p-2 text-center"
          >
            <span className="text-base">{e.icon}</span>
            <span className="text-xs font-semibold text-slate-700 mt-0.5">
              {data.byType[e.type] ?? 0}
            </span>
            <span className="text-[10px] text-slate-400 leading-tight">{e.label}</span>
          </div>
        ))}
      </div>
    </ModuleCard>
  )
}
