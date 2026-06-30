import { ModuleCard } from '@/components/ModuleCard'
import type { ProductOverviewData } from '@/types'

interface ProductsOverviewProps {
  data: ProductOverviewData
}

function fmtPrice(try_: number): string {
  return new Intl.NumberFormat('tr-TR').format(try_) + ' ₺'
}

export function ProductsOverview({ data }: ProductsOverviewProps) {
  const status = data.source === 'mock' ? 'mock' : 'live'
  return (
    <ModuleCard title="Ürünler" icon="📦" status={status}>
      <p className="text-xs text-slate-400 mb-3">
        Airtable Products · {data.activeCount}/{data.totalCount} aktif · schema-hazır {data.schemaReadyCount}
      </p>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-slate-400 border-b border-slate-100">
            <th className="text-left pb-1.5">Ürün</th>
            <th className="text-left pb-1.5">Kategori</th>
            <th className="text-right pb-1.5">Fiyat</th>
          </tr>
        </thead>
        <tbody>
          {data.products.map((p) => (
            <tr key={p.id} className="border-b border-slate-50">
              <td className="py-1.5 text-slate-700 truncate max-w-[140px]">{p.name}</td>
              <td className="py-1.5 text-slate-400">{p.category}</td>
              <td className="py-1.5 text-right text-slate-600">{fmtPrice(p.priceTry)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-slate-300 mt-3">
        * Schema-hazır = SKU + görsel + açıklama dolu ({data.schemaReadyCount}/{data.totalCount})
      </p>
    </ModuleCard>
  )
}
