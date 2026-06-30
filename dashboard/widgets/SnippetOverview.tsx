import { ModuleCard } from '@/components/ModuleCard'

const mockPAA = [
  { question: 'Su arıtma cihazı nasıl seçilir?', buzsuRanks: true },
  { question: 'Ters osmoz sistemi ne kadar dayanır?', buzsuRanks: false },
  { question: 'Su arıtma cihazı sağlıklı mı?', buzsuRanks: false },
  { question: 'Atıksız su arıtma ne demek?', buzsuRanks: true },
  { question: 'Su arıtma cihazı bakımı ne zaman yapılır?', buzsuRanks: false },
]

export function SnippetOverview() {
  return (
    <ModuleCard title="Featured Snippet" icon="⭐" status="mock">
      <p className="text-xs text-slate-400 mb-3">PAA hedefleri — Buzsu cevap veriyor mu?</p>
      <ul className="space-y-1.5">
        {mockPAA.map((p) => (
          <li key={p.question} className="flex items-start gap-2 text-xs">
            <span className={p.buzsuRanks ? 'text-green-500' : 'text-slate-300'}>
              {p.buzsuRanks ? '✓' : '○'}
            </span>
            <span className={p.buzsuRanks ? 'text-slate-700' : 'text-slate-400'}>
              {p.question}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between text-xs text-slate-500">
        <span>Kapsanan: <strong className="text-green-600">2 / 5</strong></span>
        <span>Fırsat: 3 PAA</span>
      </div>
    </ModuleCard>
  )
}
