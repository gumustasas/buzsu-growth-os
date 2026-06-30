import { ModuleCard } from '@/components/ModuleCard'

const mockChecks = [
  { label: 'AI Overview görünürlüğü', value: 'Belirsiz', status: 'warn' },
  { label: 'FAQ schema → AI alıntı', value: '6 soru mevcut', status: 'ok' },
  { label: 'E-E-A-T sinyali', value: 'Orta', status: 'warn' },
  { label: 'Yapılandırılmış alıntı', value: '?', status: 'warn' },
  { label: 'Serper AI snippet', value: 'Bağlı değil', status: 'error' },
]

const statusDot: Record<string, string> = {
  ok: 'bg-green-500',
  warn: 'bg-yellow-400',
  error: 'bg-red-500',
}

export function GeoOverview() {
  return (
    <ModuleCard title="GEO / AI Overview" icon="🤖" status="mock">
      <p className="text-xs text-slate-400 mb-3">Generative Engine Optimization — Serper bağlı değil</p>
      <ul className="space-y-2">
        {mockChecks.map((c) => (
          <li key={c.label} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-slate-600">
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${statusDot[c.status]}`} />
              {c.label}
            </span>
            <span className="text-slate-500">{c.value}</span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate-300 mt-3">* TASK-001 GEO değerlendirmesinden</p>
    </ModuleCard>
  )
}
