import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'Buzsu Growth OS',
  description: 'SEO · GEO · CRO · Schema · Entity Graph operasyon panosu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>
        <div className="flex">
          <Sidebar />
          <main className="main-content flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
