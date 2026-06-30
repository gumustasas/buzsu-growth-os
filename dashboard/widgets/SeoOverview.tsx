import { ModuleCard } from '@/components/ModuleCard'

const mockKeywords = [
  { query: 'su arıtma cihazları', pos: '~9', vol: '8.1K', trend: '→' },
  { query: 'su arıtma cihazı fiyat', pos: '~14', vol: '4.4K', trend: '↓' },
  { query: 'ev su arıtma sistemi', pos: '~18', vol: '2.9K', trend: '→' },
  { query: 'ters osmoz su arıtma', pos: '~22', vol: '1.6K', trend: '↑' },
]

export function SeoOverview() {
  return (
    <ModuleCard title="SEO" icon="🔍" status="mock">
      <p className="text-xs text-slate-400 mb-3">Hedef URL: /su-aritma-cihazlari/ · GSC bağlı değil</p>
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
          {mockKeywords.map((k) => (
            <tr key={k.query} className="border-b border-slate-50">
              <td className="py-1.5 text-slate-700 truncate max-w-[120px]">{k.query}</td>
              <td className="py-1.5 text-right text-slate-600">{k.pos}</td>
              <td className="py-1.5 text-right text-slate-600">{k.vol}</td>
              <td className="py-1.5 text-right">{k.trend}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-slate-300 mt-3">* Serper SERP tahmini — TASK-001 verisi</p>
    </ModuleCard>
  )
}
