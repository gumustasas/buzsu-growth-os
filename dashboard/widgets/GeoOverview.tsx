import { ModuleCard } from '@/components/ModuleCard'
import type { GeoOverviewData } from '@/types'

interface GeoOverviewProps {
  data: GeoOverviewData
}

const statusDot: Record<string, string> = {
  strong: 'bg-green-500',
  medium: 'bg-yellow-400',
  weak: 'bg-orange-400',
  missing: 'bg-red-500',
}

const statusText: Record<string, string> = {
  strong: 'Güçlü',
  medium: 'Orta',
  weak: 'Zayıf',
  missing: 'Yok',
}

export function GeoOverview({ data }: GeoOverviewProps) {
  const status = data.source === 'mock' ? 'mock' : 'live'
  const aiCited = data.aiOverviewSignals.filter((s) => s.buzsuCited).length
  return (
    <ModuleCard title="GEO / AI Overview" icon="🤖" status={status}>
      <p className="text-xs text-slate-400 mb-3">
        AI Overview sinyali: {data.aiOverviewSignals.length} · Buzsu alıntı: {aiCited}
      </p>
      <ul className="space-y-2">
        {data.eeatSignals.map((c) => (
          <li key={c.label} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-slate-600">
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${statusDot[c.status]}`} />
              {c.label}
            </span>
            <span className="text-slate-500">{c.note ?? statusText[c.status]}</span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate-300 mt-3">* Kaynak: {data.source}</p>
    </ModuleCard>
  )
}
