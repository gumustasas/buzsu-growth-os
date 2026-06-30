---
name: technical-seo
description: BUZSU sitelerinin taranabilirlik, indekslenebilirlik ve Core Web Vitals performansını denetler ve iyileştirme planı üretir.
---

## Ne Zaman Devreye Girer
- Yeni sayfa veya URL yapısı eklendiğinde
- GSC'de kapsam sorunları (Noindex, Crawled-not-indexed) artıyorsa
- Core Web Vitals skorları düşüyorsa
- Siteye büyük yapısal değişiklik yapılmadan önce
- AI crawler direktifleri güncellenecekse

## Temel Pratikler
1. **Canonical kontrolü** — Her sayfa için tek, tutarlı canonical URL; parametre kirliliği yok.
2. **Sitemap güncelliği** — Yeni içerik 24 saat içinde sitemap'e eklenmeli.
3. **LCP hedefi** — < 2.5 sn (mobil ve masaüstü); görsel optimizasyon + CDN öncelikli.
4. **INP hedefi** — < 200 ms; JavaScript bundle analizi gerekebilir.
5. **4xx tarama** — Haftalık GSC kapsam raporu; bozuk bağlantı = düzeltme veya 301 yönlendirme.

## Sınır
Bu skill denetim raporu ve taslak öneri üretir. Sunucu tarafı değişiklik developer onayı gerektirir.
