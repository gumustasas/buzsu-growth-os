# Performans Rehberi — Core Web Vitals ve BUZSU

Bu doküman BUZSU'nun iki sitesi için sayfa hızı optimizasyon çerçevesini tanımlar.
Referans: `vercel-labs/skills` deployment optimizasyon desenleri (lisans bulunamadı —
genel pratik uyarlandı) + `AndreasH96/seo-geo-consultant` (MIT, Wave 1) teknik SEO denetimi.

## Core Web Vitals — BUZSU Hedefleri

| Metrik | İyi | BUZSU Hedefi |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | < 2.5s (mobile) |
| CLS (Cumulative Layout Shift) | < 0.1 | < 0.1 |
| INP (Interaction to Next Paint) | < 200ms | < 200ms |

## LCP İyileştirme

- Hero görsel `priority` flag; `<Image>` ile WebP/AVIF otomatik.
- Above-the-fold CSS inline (`next/font` bunu yapar).
- Suvesu'nun bilgi makaleleri: metin ağırlıklı → LCP genellikle `<h1>` veya ilk görsel.

## CLS İyileştirme

- Her `<Image>` için `width` + `height` zorunlu.
- Web font için `font-display: swap` (next/font otomatik).
- Dinamik içerik (banner) rezerve alan kullanır.

## INP İyileştirme

- Event handler'lar hafif olmalı; ağır hesaplama async'e taşınır.
- React.memo / useMemo gereksiz yere kullanılmaz.

## Üçüncü Parti Scriptler

- Analytics (GTM, GA4): `strategy="afterInteractive"` veya `strategy="lazyOnload"`.
- Ana thread bloklanmaz.

## Önbellekleme

- Statik sayfalar CDN'de cache'lenir; `Cache-Control: public, max-age=...`
- API route'ları için `next/cache` veya `unstable_cache`.
- Vercel Edge Config değişkenleri için — production değişikliği MAJOR.
