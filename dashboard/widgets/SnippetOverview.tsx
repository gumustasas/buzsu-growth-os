import { ModuleCard } from '@/components/ModuleCard'
import type { GeoOverviewData } from '@/types'

interface SnippetOverviewProps {
  data: GeoOverviewData
}

export function SnippetOverview({ data }: SnippetOverviewProps) {
  const paa = data.paaCoverage
  const covered = data.paaCoveredCount
  const total = data.paaTotalCount
  const opportunity = total - covered
  const status = data.source === 'mock' ? 'mock' : 'live'

  return (
    <ModuleCard title="Featured Snippet" icon="⭐" status={status}>
      <p className="text-xs text-slate-400 mb-3">PAA hedefleri — Buzsu/Suvesu cevap veriyor mu?</p>
      <ul className="space-y-1.5">
        {paa.map((p) => {
          const answered = p.answeredByBuzsu || p.answeredBySuvesu
          return (
            <li key={p.question} className="flex items-start gap-2 text-xs">
              <span className={answered ? 'text-green-500' : 'text-slate-300'}>
                {answered ? '✓' : '○'}
              </span>
              <span className={answered ? 'text-slate-700' : 'text-slate-400'}>{p.question}</span>
            </li>
          )
        })}
      </ul>
      <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between text-xs text-slate-500">
        <span>
          Kapsanan: <strong className="text-green-600">{covered} / {total}</strong>
        </span>
        <span>Fırsat: {opportunity} PAA</span>
      </div>
    </ModuleCard>
  )
}
