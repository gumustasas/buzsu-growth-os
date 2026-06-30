# Teknik SEO — Uygulama Adımları

## Gerekli Yapılandırma Değişkenleri

```
BUZSU_SITE_BASE_URL      # https://www.buzsu.com.tr
GSC_PROPERTY_URL         # GSC'de tanımlı property URL'i
```

Değerler `config/.env.example` dosyasından alınır; repoya yazılmaz.

---

## Adımlar

### 1. Crawl Denetimi
Kontrol edilecek URL'ler:
- `$BUZSU_SITE_BASE_URL/robots.txt` — erişilebilir mi? AI bot direktifleri var mı?
- `$BUZSU_SITE_BASE_URL/sitemap.xml` — güncel mi?

Sitemap'te bulunması gereken doğrulanmış URL'ler:
- `$BUZSU_SITE_BASE_URL/su-aritma-cihazlari/`
- `$BUZSU_SITE_BASE_URL/uv-filtreli-tezgah-alti-su-aritma-cihazi-pompali-model/`
- `$BUZSU_SITE_BASE_URL/code-su-aritma-cihazi/`
- `$BUZSU_SITE_BASE_URL/atiksiz-su-aritma-cihazi/`
- `$BUZSU_SITE_BASE_URL/code-su-aritma-cihazi-5-li-filtre-seti-made-in-korea/`
- `$BUZSU_SITE_BASE_URL/tds-metre/`
- `<BUZSU_FAQ_URL>`
- `$BUZSU_SITE_BASE_URL/blog/`

Canonical kontrol: her ürün sayfası kendi canonical URL'sini işaret ediyor mu?

### 2. Core Web Vitals Ölçümü
PageSpeed Insights ile test et (mobil öncelikli):
- `$BUZSU_SITE_BASE_URL/uv-filtreli-tezgah-alti-su-aritma-cihazi-pompali-model/`
  → Ürün fotoğrafı ağır → LCP riski
- `$BUZSU_SITE_BASE_URL/` — ana sayfa
- `<BUZSU_FAQ_URL>` — SSS sayfası (doğrulandıktan sonra ekle)

Hedefler (mobil):
- LCP < 2.5 sn → Ürün görselleri optimize edilmeli
- INP < 200 ms → WhatsApp buton JS yükü kontrol et
- CLS < 0.1 → Banner/slider kaymaları

### 3. GSC Kapsam Raporu
`$GSC_PROPERTY_URL` → Kapsam → Son 28 gün:
- Toplam dizine alınan sayfa
- "Dizine alınmadı - tarandı" artıyor mu?
- Doğrulanmış ürün URL'leri dizinde mi?

### 4. Sorun Önceliklendirme
`templates/technical-audit-template.md` kullan:
- P1: Ürün sayfası (code-su-aritma, atiksiz, tezgah-alti) index kaybı veya 5xx
- P2: Ürün sayfası LCP > 4 sn; 4xx artışı
- P3: Redirect zinciri; TDS metre sayfası hız iyileştirme

Rapor → `/drafts/technical-seo-[YYYY-MM].md`

### 5. Taslak Öneriler
- `/drafts/technical-seo-canonical-duzeltme.md`
- `/drafts/technical-seo-sitemap-guncelleme.md`
- `/drafts/technical-seo-cwv-iyilestirme.md`

### 6. Onay
Taslaklar insan onayına sunulur.

### 7. Uygulama
Onaylanan değişiklikler developer tarafından uygulanır.
Sunucu tarafı değişiklikler MAJOR sınıf.

### 8. İzleme (2 hafta sonra)
- `$GSC_PROPERTY_URL` kapsam → dizine alınan sayfa değişti mi?
- PageSpeed Insights → CWV iyileşti mi?

## Onay Notu
Sunucu tarafı değişiklikler MAJOR sınıf; developer + insan onayı zorunlu.

## İlgili Skill'ler
`skills/schema-automation`, `skills/gsc`, `skills/performance`, `skills/llms`
