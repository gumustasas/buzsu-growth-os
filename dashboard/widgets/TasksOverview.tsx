import { ModuleCard } from '@/components/ModuleCard'

const tasks = [
  { id: 'TASK-001', title: 'SERP + HTML analizi', status: 'partial', area: 'seo' },
  { id: 'TASK-003', title: 'Product Schema mimarisi', status: 'done', area: 'schema' },
  { id: 'TASK-004', title: 'Airtable alan tanımı', status: 'done', area: 'schema' },
  { id: 'TASK-005', title: 'CI4 entegrasyon planı', status: 'done', area: 'schema' },
  { id: 'TASK-006', title: 'CI4 Product Schema deploy', status: 'blocked', area: 'schema' },
  { id: 'SPRINT-002', title: 'Dashboard + KG temeli', status: 'active', area: 'platform' },
]

const statusStyle: Record<string, string> = {
  done: 'badge-ok',
  partial: 'badge-warn',
  blocked: 'badge-error',
  active: 'badge-info',
  pending: 'text-slate-400 text-xs',
}

const statusLabel: Record<string, string> = {
  done: 'Tamam',
  partial: 'Kısmi',
  blocked: 'Blocked',
  active: 'Aktif',
  pending: 'Bekliyor',
}

export function TasksOverview() {
  return (
    <ModuleCard title="Görevler" icon="✅" status="mock">
      <ul className="space-y-2">
        {tasks.map((t) => (
          <li key={t.id} className="flex items-center justify-between text-xs">
            <span className="text-slate-500 w-20 shrink-0">{t.id}</span>
            <span className="text-slate-700 flex-1 truncate">{t.title}</span>
            <span className={statusStyle[t.status]}>{statusLabel[t.status]}</span>
          </li>
        ))}
      </ul>
    </ModuleCard>
  )
}
