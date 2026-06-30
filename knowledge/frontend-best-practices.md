# Frontend Best Practices — Next.js + Vercel

Bu doküman `vercel-labs/skills` reposunun README'sinden gözlemlenen Vercel deployment
pratiklerini ve genel Next.js 14 App Router best practice'lerini BUZSU'ya uyarlar.
vercel-labs/skills lisansı doğrulanamadı (LICENSE bulunamadı) — format ve deployment
deseni uyarlandı, içerik kopyalanmadı.

## Next.js 14 App Router — BUZSU Kuralları

### Render Stratejisi Karar Matrisi

| İçerik Türü | Strateji | Neden |
|---|---|---|
| Suvesu bilgi makaleleri | SSG (ISR opsiyonel) | Nadiren değişir, SEO kritik |
| Buzsu ürün sayfaları | ISR (5-60dk revalidate) | Stok/fiyat değişebilir |
| Dinamik filtreleme, arama | Client component + API route | Kullanıcıya özel |
| Admin/dashboard sayfaları | SSR | Auth required, cache yok |

### Bileşen Kararı

- Server Component varsayılan; state/event handler gerektiğinde `"use client"` ekle.
- Client Component ağır olmasın: veri fetch'i Server Component'a bırak, Client Component
  sadece etkileşimi yönetsin.

### Görsel Optimizasyon

- `<Image>` zorunlu: `width`, `height`, `alt` zorunlu alanlar.
- Above-the-fold görsel: `priority` flag.
- Fold altı: `loading="lazy"` (Next.js varsayılan).
- Format: WebP otomatik (`unoptimized` flag kullanılmaz).

### Font

- `next/font/google` veya `next/font/local` — HTML'e inline edilir, FOUT olmaz.
- `font-display: swap` zaten dahil.

## Vercel Deployment

- Environment değişkenleri Vercel dashboard'dan; `.env` dosyası repoya commit edilmez.
- Preview deployment → staging testi için; Production deploy → insan onayıyla.
- `vercel.json` yapılandırma değişikliği MAJOR (canlı site etkisi).
