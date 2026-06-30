# Teknik SEO Playbook

## Amaç
Buzsu.com.tr ve Suvesu.com'un teknik SEO altyapısını düzenli aralıklarla denetle,
kritik sorunları önceliklendir ve düzelt.

## Periyot
Aylık (her ayın ilk haftası)

## Tetikleyici
- Aylık rutin teknik denetim
- GSC'de kapsam sorunları artıyor
- Core Web Vitals skorları düştü
- Site yapısal değişikliği öncesi kontrol

## Adımlar

### 1. Crawl Denetimi (technical-seo skill)
- robots.txt ve sitemap kontrolü
- Canonical URL tutarlılığı
- 4xx hata listesi
- AI bot direktifleri güncel mi?

### 2. Core Web Vitals (performance skill)
- LCP, INP, CLS değerleri — mobil öncelikli
- Sorunlu sayfalar listesi

### 3. İndeksleme Durumu (gsc skill)
- GSC kapsam raporu
- "Dizine alındı" sayısı stabil mi?

### 4. Sorun Önceliklendirme
- P1 (kritik, hemen): indeks kaybı, 5xx, sitemap hatası
- P2 (önemli, bu sprint): 4xx artışı, CWV düşüşü
- P3 (iyileştirme, planlı): redirect zinciri, hız iyileştirme

### 5. Taslak Hazırlama
- templates/technical-audit-template.md kullan
- /drafts/technical-seo-[YYYY-MM].md oluştur

### 6. Onay ve Uygulama
- P1 sorunlar için hemen task dosyası aç
- Taslaklar insan onayına
- Developer uygular → 2 hafta izleme

## İlgili Skill'ler
`technical-seo`, `gsc`, `performance`, `schema-automation`, `llms`
