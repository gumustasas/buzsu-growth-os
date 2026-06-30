# Teknik SEO — Uygulama Adımları

## Gerekli Yapılandırma Değişkenleri

```
BUZSU_SITE_BASE_URL      # Örn: https://buzsu.com.tr
GSC_PROPERTY_URL         # GSC'de tanımlı property URL'i
```

Değerler `config/.env.example` dosyasından alınır; repoya yazılmaz.

---

## Adımlar

### 1. Crawl Denetimi
Kontrol edilecek URL'ler:
- `$BUZSU_SITE_BASE_URL/robots.txt` — erişilebilir mi? AI bot direktifleri var mı?
- `$BUZSU_SITE_BASE_URL/sitemap.xml` — güncel mi? Tüm ürün ve içerik URL'leri var mı?

Ürün URL'leri sitemap'te olmalı:
- `/urunler/tezgah-alti-su-aritma/`
- `/urunler/pompasiz-su-aritma/`
- `/urunler/yedek-filtre/`
- `/sss/`
- `/blog/` (tüm yazılar)

Canonical kontrol: her ürün sayfası kendi canonical URL'sini işaret ediyor mu?
UTM parametreli URL'ler indekse girmiş mi? (GSC kapsam raporu ile kontrol)

### 2. Core Web Vitals Ölçümü
PageSpeed Insights ile test et:
- `$BUZSU_SITE_BASE_URL/urunler/tezgah-alti-su-aritma/` (en çok trafik alan ürün sayfası)
- `$BUZSU_SITE_BASE_URL/` (ana sayfa)
- `$BUZSU_SITE_BASE_URL/sss/`

Hedefler (mobil):
- LCP < 2.5 sn → Büyük görseller (ürün fotoğrafları) optimize edilmeli
- INP < 200 ms → WhatsApp buton etkileşimi JS yükü kontrol et
- CLS < 0.1 → Banner/slider kaymaları

### 3. GSC Kapsam Raporu
`$GSC_PROPERTY_URL` → Kapsam → Son 28 gün:
- Toplam dizine alınan sayfa sayısı
- "Dizine alınmadı - tarandı" — sayısı artıyor mu?
- 4xx hata listesi

### 4. Sorun Önceliklendirme
Tablo oluştur (`templates/technical-audit-template.md` kullan):
- P1: `/urunler/*` sayfalarında index kaybı, 5xx hatası
- P2: Ürün sayfası LCP > 4 sn, 4xx artışı
- P3: Blog sayfaları redirect zinciri, favicon eksikliği

Rapor → `/drafts/technical-seo-[YYYY-MM].md`

### 5. Taslak Öneriler
Her sorun için ayrı taslak dosyası:
- `/drafts/technical-seo-canonical-duzeltme.md`
- `/drafts/technical-seo-sitemap-guncelleme.md`
- `/drafts/technical-seo-cwv-iyilestirme.md`

### 6. Onay
Taslaklar insan onayına sunulur.

### 7. Uygulama
Onaylanan değişiklikler developer tarafından uygulanır.
Sunucu tarafı değişiklikler (redirect, .htaccess, sitemap) MAJOR sınıf.

### 8. İzleme
2 hafta sonra:
- `$GSC_PROPERTY_URL` kapsam raporu → dizine alınan sayfa sayısı değişti mi?
- PageSpeed Insights → CWV değerleri iyileşti mi?

## Onay Notu
Sunucu tarafı değişiklikler MAJOR sınıf; developer + insan onayı zorunlu.

## İlgili Skill'ler
`skills/schema-automation`, `skills/gsc`, `skills/performance`, `skills/llms`
