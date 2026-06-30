import clsx from 'clsx'

type Status = 'ok' | 'warn' | 'error' | 'info'

interface MetricCardProps {
  label: string
  value: string
  trend?: string
  status?: Status
}

const statusClasses: Record<Status, string> = {
  ok: 'text-green-600',
  warn: 'text-yellow-600',
  error: 'text-red-600',
  info: 'text-blue-600',
}

export function MetricCard({ label, value, trend, status = 'info' }: MetricCardProps) {
  return (
    <div className="metric-card">
      <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">{label}</p>
      <p className={clsx('text-2xl font-bold', statusClasses[status])}>{value}</p>
      {trend && (
        <p className="text-xs text-slate-400 mt-1 truncate">{trend}</p>
      )}
    </div>
  )
}
