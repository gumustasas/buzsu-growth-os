import { ModuleCard } from '@/components/ModuleCard'
import type { SchemaOverviewData } from '@/types'

interface SchemaOverviewProps {
  data: SchemaOverviewData
}

const statusIcon: Record<string, string> = {
  present: '✅',
  duplicate: '⚠️',
  missing: '❌',
  error: '❌',
}

export function SchemaOverview({ data }: SchemaOverviewProps) {
  const cardStatus = data.blockers.length > 0 ? 'blocked' : data.source === 'mock' ? 'mock' : 'live'
  return (
    <ModuleCard title="Schema" icon="🏷️" status={cardStatus}>
      <p className="text-xs text-slate-400 mb-3">
        {new URL(data.url).pathname} · Product schema {data.productSchemaPresent ? 'aktif' : 'eksik'}
      </p>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-slate-400 border-b border-slate-100">
            <th className="text-left pb-1.5">Tip</th>
            <th className="text-left pb-1.5">Konum</th>
            <th className="text-right pb-1.5"></th>
          </tr>
        </thead>
        <tbody>
          {data.inventory.map((s, i) => (
            <tr key={i} className="border-b border-slate-50">
              <td className="py-1.5 text-slate-700">
                {s.type}
                {s.note ? <span className="text-slate-400"> · {s.note}</span> : null}
              </td>
              <td className="py-1.5 text-slate-400">{s.location}</td>
              <td className="py-1.5 text-right">{statusIcon[s.status]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.blockers.length > 0 && (
        <p className="text-xs text-yellow-600 mt-3">Blocker: {data.blockers[0]}</p>
      )}
    </ModuleCard>
  )
}
