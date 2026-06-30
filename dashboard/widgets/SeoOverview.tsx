import { ModuleCard } from '@/components/ModuleCard'
import type { SeoOverviewData } from '@/types'

interface SeoOverviewProps {
  data: SeoOverviewData
}

function fmtPos(pos: number | null): string {
  return pos == null ? '—' : `~${pos}`
}

function fmtVol(vol?: number | null): string {
  if (vol == null) return '—'
  return vol >= 1000 ? `${(vol / 1000).toFixed(1)}K` : String(vol)
}

const trendArrow: Record<string, string> = { up: '↑', down: '↓', flat: '→' }

export function SeoOverview({ data }: SeoOverviewProps) {
  const status = data.source === 'mock' ? 'mock' : 'live'
  return (
    <ModuleCard title="SEO" icon="🔍" status={status}>
      <p className="text-xs text-slate-400 mb-3">
        Hedef URL: /su-aritma-cihazlari/ · ort. pozisyon {fmtPos(data.averagePosition)}
      </p>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-slate-400 border-b border-slate-100">
            <th className="text-left pb-1.5">Kelime</th>
            <th className="text-right pb-1.5">Pos</th>
            <th className="text-right pb-1.5">Vol</th>
            <th className="text-right pb-1.5"></th>
          </tr>
        </thead>
        <tbody>
          {data.trackedKeywords.map((k) => (
            <tr key={k.query} className="border-b border-slate-50">
              <td className="py-1.5 text-slate-700 truncate max-w-[120px]">{k.query}</td>
              <td className="py-1.5 text-right text-slate-600">{fmtPos(k.position)}</td>
              <td className="py-1.5 text-right text-slate-600">{fmtVol(k.searchVolume)}</td>
              <td className="py-1.5 text-right">{k.trend ? trendArrow[k.trend] : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-slate-300 mt-3">
        * Kaynak: {data.source} · {data.trackedKeywords.length} kelime
      </p>
    </ModuleCard>
  )
}
