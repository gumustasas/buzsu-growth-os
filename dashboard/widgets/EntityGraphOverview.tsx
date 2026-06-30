import { ModuleCard } from '@/components/ModuleCard'

const entityCounts = [
  { type: 'Organizasyon', count: 1, icon: '🏢' },
  { type: 'Marka', count: 1, icon: '🏷️' },
  { type: 'Ürün', count: 2, icon: '📦' },
  { type: 'Bileşen', count: 1, icon: '🔧' },
  { type: 'Teknoloji', count: 1, icon: '⚙️' },
  { type: 'Kirletici', count: 1, icon: '⚗️' },
  { type: 'Mineral', count: 1, icon: '💎' },
  { type: 'SSS', count: 1, icon: '❓' },
  { type: 'Lokasyon', count: 1, icon: '📍' },
]

const totalSeeded = entityCounts.reduce((s, e) => s + e.count, 0)
const targetTotal = 150

export function EntityGraphOverview() {
  const pct = Math.round((totalSeeded / targetTotal) * 100)

  return (
    <ModuleCard title="Entity Graph" icon="🕸️" status="mock">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-slate-500">Seed: {totalSeeded} / {targetTotal} hedef</span>
        <span className="text-xs font-semibold text-blue-600">%{pct}</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-1.5 mb-4">
        <div
          className="bg-blue-500 h-1.5 rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {entityCounts.map((e) => (
          <div
            key={e.type}
            className="flex flex-col items-center bg-slate-50 rounded-lg p-2 text-center"
          >
            <span className="text-base">{e.icon}</span>
            <span className="text-xs font-semibold text-slate-700 mt-0.5">{e.count}</span>
            <span className="text-[10px] text-slate-400 leading-tight">{e.type}</span>
          </div>
        ))}
      </div>
    </ModuleCard>
  )
}
