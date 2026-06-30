import { ModuleCard } from '@/components/ModuleCard'
import type { TasksOverviewData } from '@/types'

interface TasksOverviewProps {
  data: TasksOverviewData
}

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

export function TasksOverview({ data }: TasksOverviewProps) {
  const status = data.source === 'mock' ? 'mock' : 'live'
  return (
    <ModuleCard title="Görevler" icon="✅" status={status}>
      <ul className="space-y-2">
        {data.tasks.map((t) => (
          <li key={t.id} className="flex items-center justify-between text-xs">
            <span className="text-slate-500 w-20 shrink-0">{t.id}</span>
            <span className="text-slate-700 flex-1 truncate">{t.title}</span>
            <span className={statusStyle[t.status]}>{statusLabel[t.status]}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between text-xs text-slate-500">
        <span>Aktif: <strong className="text-blue-600">{data.activeCount}</strong></span>
        <span>Tamam: <strong className="text-green-600">{data.doneCount}</strong></span>
        <span>Blocked: <strong className="text-red-600">{data.blockedCount}</strong></span>
      </div>
    </ModuleCard>
  )
}
