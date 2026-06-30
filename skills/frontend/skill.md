---
name: frontend
description: Next.js 14 App Router'da performanslı, SEO-dostu ve erişilebilir sayfa/bileşen geliştirme — Vercel deployment kurallarıyla uyumlu.
---

# Frontend

## Ne Zaman Devreye Girer

Yeni sayfa, bileşen veya layout değişikliği; meta tag/SSR/SSG kararı; Vercel deployment
yapılandırması; Core Web Vitals iyileştirmesi görevlerinde.

## Temel Pratikler

- **App Router kuralı** — `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` yapısı
  Next.js 14 konvansiyonunu izler; Pages Router karışımı yapılmaz.
- **SSR / SSG / ISR kararı** — içerik güncellik frekansı ve SEO ihtiyacına göre seçilir:
  Suvesu bilgi sayfaları → SSG; ürün sayfaları → ISR; dinamik filtreleme → SSR veya client.
- **Görsel optimizasyon** — `<Image>` bileşeni zorunlu; ham `<img>` kullanılmaz (LCP etkisi).
- **Font ve CSS** — `next/font` ile system font veya Google Font; global CSS yerine
  CSS Modules veya Tailwind tercih edilir.
- **Erişilebilirlik** — aria label, form label, klavye gezinme temel düzeyde sağlanır.

## Sınır

Vercel'e deploy MAJOR (CLAUDE.md canlı site kuralı). Yeni npm paketi MAJOR.
Tasarım kararı `skills/ui-ux/` alanına devredilir.
