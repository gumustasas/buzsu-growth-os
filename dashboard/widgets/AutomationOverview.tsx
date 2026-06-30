import { ModuleCard } from '@/components/ModuleCard'
import type { ConnectorHealth } from '@/types'

interface AutomationOverviewProps {
  connectors: ConnectorHealth[]
}

const connectorLabel: Record<string, string> = {
  airtable: 'Airtable',
  serper: 'Serper',
  gsc: 'Search Console',
  ga4: 'Analytics 4',
  merchant: 'Merchant Center',
}

const modeBadge: Record<string, string> = {
  live: 'badge-ok',
  mock: 'badge-info',
}

const modeLabel: Record<string, string> = {
  live: 'Canlı',
  mock: 'Mock',
}

export function AutomationOverview({ connectors }: AutomationOverviewProps) {
  const liveCount = connectors.filter((c) => c.mode === 'live').length
  return (
    <ModuleCard title="Otomasyon" icon="⚡" status="mock">
      <p className="text-xs text-slate-400 mb-3">
        Connector durumu · {liveCount}/{connectors.length} canlı · n8n pipeline planlandı
      </p>
      <ul className="space-y-2">
        {connectors.map((c) => (
          <li key={c.connector} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-slate-600">
              <span
                className={`inline-block w-1.5 h-1.5 rounded-full ${
                  c.mode === 'live' ? 'bg-green-500' : 'bg-blue-400'
                }`}
              />
              {connectorLabel[c.connector] ?? c.connector}
            </span>
            <span className="flex items-center gap-2">
              {c.configured && <span className="text-slate-300 text-[10px]">flag açık</span>}
              <span className={modeBadge[c.mode]}>{modeLabel[c.mode]}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate-300 mt-3">* Live geçiş: USE_MOCK_DATA=false + ENABLE_*</p>
    </ModuleCard>
  )
}
