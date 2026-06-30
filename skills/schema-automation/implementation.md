# Schema Otomasyonu — Uygulama Adımları

## Gerekli Yapılandırma Değişkenleri

```
BUZSU_SITE_BASE_URL             # Örn: https://buzsu.com.tr
N8N_WEBHOOK_SCHEMA_VALIDATION   # Schema doğrulama sonucunu alan n8n webhook URL'i
GSC_PROPERTY_URL                # GSC'de tanımlı property URL'i
```

Değerler `config/.env.example` dosyasından alınır; repoya yazılmaz.
`N8N_WEBHOOK_SCHEMA_VALIDATION` sadece doğrulama raporunu iletmek için kullanılır;
şema dosyasını otomatik canlıya almaz.

---

## Adımlar

### 1. Şema Envanteri
Mevcut JSON-LD şemalarını tara. Kontrol URL'leri:
- `$BUZSU_SITE_BASE_URL/` (ana sayfa) — Organization + WebSite
- `$BUZSU_SITE_BASE_URL/urunler/tezgah-alti-su-aritma/` — Product
- `$BUZSU_SITE_BASE_URL/urunler/pompasiz-su-aritma/` — Product
- `$BUZSU_SITE_BASE_URL/urunler/yedek-filtre/` — Product
- `$BUZSU_SITE_BASE_URL/sss/` — FAQPage
- `$BUZSU_SITE_BASE_URL/iletisim/` — LocalBusiness

Eksik veya hatalı → liste oluştur.

### 2. Şablon Seçimi
`templates/jsonld-template.md` referans al.
Her sayfa tipi için uygun @type seç:
- Ürün sayfaları → `Product` (name, image, offers.price placeholder, offers.availability)
- SSS sayfası → `FAQPage` (mainEntity dizisi)
- İletişim/ana sayfa → `LocalBusiness` + `Organization`

### 3. Taslak Üretimi
Her sayfa için → `/drafts/schema/[tip]-[slug].jsonld`

Örnek slug'lar:
- `product-tezgah-alti-su-aritma.jsonld`
- `product-pompasiz-su-aritma.jsonld`
- `product-yedek-filtre.jsonld`
- `faq-sss.jsonld`
- `organization-buzsu.jsonld`

**Önemli:** `offers.price` alanına gerçek fiyat bilgisi sağlanmadan
placeholder (`"PRICE_TRY"`) yaz. Doğrulama önce, fiyat sonra eklenir.

### 4. Doğrulama
Her taslak için:
1. `python3 -m json.tool [dosya].jsonld` — JSON sözdizimi
2. Google Rich Results Test — richresults.google.com
3. schema.org/validator — validator.schema.org

Sonuç → `/drafts/schema/validation-[slug]-[YYYY-MM-DD].md`

Doğrulama raporunu `$N8N_WEBHOOK_SCHEMA_VALIDATION` endpoint'ine iletmek için
n8n workflow hazırsa trigger et (workflow çalıştırma insan onayı gerektirir).

### 5. GSC İzleme Baseline
`$GSC_PROPERTY_URL` → Zenginleştirilmiş Sonuçlar raporunu kaydet (şema öncesi baseline).

### 6. Onay
Tüm `/drafts/schema/` taslakları insan onayına sunulur.

### 7. Entegrasyon
Onaylanan şemalar CodeIgniter 4 view'larına eklenir (developer).
Commit örneği: `feat: tezgah-alti-su-aritma ürün sayfasına JSON-LD Product şeması eklendi`

### 8. Doğrulama Sonrası Takip
7 gün sonra `$GSC_PROPERTY_URL` → Zenginleştirilmiş Sonuçlar hata sayısını ölç.
Baseline ile karşılaştır.

## Onay Notu
Adım 7 canlı site değişikliğidir. MINOR sınıf, onay zorunlu.
n8n trigger işlemi de ayrı onay gerektirir.

## İlgili Skill'ler
`skills/schema`, `skills/ai-search`, `skills/technical-seo`, `skills/gsc`
