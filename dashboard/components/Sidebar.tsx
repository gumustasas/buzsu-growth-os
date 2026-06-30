'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const nav = [
  { href: '/', label: 'Genel Bakış', icon: '⬛' },
  { href: '/seo', label: 'SEO', icon: '🔍' },
  { href: '/geo', label: 'GEO / AI Overview', icon: '🤖' },
  { href: '/snippet', label: 'Featured Snippet', icon: '⭐' },
  { href: '/schema', label: 'Schema', icon: '🏷️' },
  { href: '/entity-graph', label: 'Entity Graph', icon: '🕸️' },
  { href: '/tasks', label: 'Görevler', icon: '✅' },
  { href: '/products', label: 'Ürünler', icon: '📦' },
  { href: '/automation', label: 'Otomasyon', icon: '⚡' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="sidebar fixed top-0 left-0 flex flex-col">
      <div className="px-6 py-5 border-b border-white/10">
        <span className="text-white font-bold text-lg tracking-tight">Buzsu Growth OS</span>
        <span className="block text-blue-300 text-xs mt-0.5">Sprint-2 · Mock</span>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        {nav.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              'flex items-center gap-3 px-6 py-2.5 text-sm transition-colors',
              pathname === href
                ? 'bg-white/10 text-white font-medium'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            )}
          >
            <span className="text-base">{icon}</span>
            {label}
          </Link>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-white/10">
        <span className="text-slate-500 text-xs">buzsu.com.tr</span>
      </div>
    </aside>
  )
}
