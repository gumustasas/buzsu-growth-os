---
name: performance
description: Buzsu.com.tr ve Suvesu.com'da LCP/CLS/INP metriklerini ve sayfa hızını iyileştiren teknik optimizasyon — SEO sıralamasına doğrudan etki eder.
---

# Performance

## Ne Zaman Devreye Girer

Sayfa hızı şikayeti, Lighthouse skoru düşüklüğü, Core Web Vitals uyarısı veya
teknik SEO denetiminde sayfa hızı sorunu tespit edildiğinde.

## Temel Pratikler

- **LCP önceliği** — Above-the-fold görseli `priority` flag ile yükle; kritik CSS inline et.
- **Görsel formatı** — WebP/AVIF, boyutlandırılmış (width+height), lazy load (fold altı).
- **JavaScript azaltma** — client bundle'ı küçük tut; Server Component'lara geç mümkünse.
- **Önbellekleme** — statik sayfalar CDN'de önbelleğe alınır; `Cache-Control` başlıkları doğru.
- **Font yüklemesi** — `font-display: swap`; sistem fontu fallback.
- **Üçüncü parti scriptler** — defer/async; analytics tag'leri sayfa yüklenmesini bloklamaz.

## Sınır

Performans önerisi canlı siteye uygulanmadan önce staging'de test edilir.
Yeni CDN/servis eklenmesi MAJOR (yeni bağımlılık). Vercel yapılandırma değişikliği MAJOR.
