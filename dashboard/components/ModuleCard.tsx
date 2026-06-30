import clsx from 'clsx'

interface ModuleCardProps {
  title: string
  icon?: string
  status?: 'live' | 'mock' | 'blocked' | 'pending'
  children: React.ReactNode
}

const statusLabel: Record<string, string> = {
  live: 'Canlı',
  mock: 'Mock',
  blocked: 'Blocked',
  pending: 'Bekliyor',
}

const statusClass: Record<string, string> = {
  live: 'badge-ok',
  mock: 'badge-info',
  blocked: 'badge-error',
  pending: 'badge-warn',
}

export function ModuleCard({ title, icon, status = 'mock', children }: ModuleCardProps) {
  return (
    <div className="module-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {title}
        </h2>
        <span className={clsx(statusClass[status])}>
          {statusLabel[status]}
        </span>
      </div>
      <div>{children}</div>
    </div>
  )
}
