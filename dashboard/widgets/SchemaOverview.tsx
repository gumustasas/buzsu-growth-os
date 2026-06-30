import { ModuleCard } from '@/components/ModuleCard'

const schemaItems = [
  { type: 'Organization', location: 'head', status: 'ok' },
  { type: 'WebSite', location: 'head', status: 'ok' },
  { type: 'BreadcrumbList', location: 'head', status: 'ok' },
  { type: 'BreadcrumbList', location: 'body (duplicate)', status: 'warn' },
  { type: 'CollectionPage', location: 'body', status: 'ok' },
  { type: 'FAQPage (6 soru)', location: 'body', status: 'ok' },
  { type: 'Product', location: '—', status: 'error' },
]

const statusIcon: Record<string, string> = {
  ok: '✅',
  warn: '⚠️',
  error: '❌',
}

export function SchemaOverview() {
  return (
    <ModuleCard title="Schema" icon="🏷️" status="blocked">
      <p className="text-xs text-slate-400 mb-3">
        /su-aritma-cihazlari/ · Product schema eksik · TASK-006 blocked
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
          {schemaItems.map((s, i) => (
            <tr key={i} className="border-b border-slate-50">
              <td className="py-1.5 text-slate-700">{s.type}</td>
              <td className="py-1.5 text-slate-400">{s.location}</td>
              <td className="py-1.5 text-right">{statusIcon[s.status]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-yellow-600 mt-3">
        Blocker: Airtable SKU + Image URL + Schema Description doldurulmalı
      </p>
    </ModuleCard>
  )
}
