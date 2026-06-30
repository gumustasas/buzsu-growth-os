# Schema Otomasyonu — Uygulama Adımları

## Gerekli Yapılandırma Değişkenleri

```
BUZSU_SITE_BASE_URL             # https://www.buzsu.com.tr
N8N_WEBHOOK_SCHEMA_VALIDATION   # Schema doğrulama raporunu alan n8n webhook URL'i
GSC_PROPERTY_URL                # GSC'de tanımlı property URL'i
```

Değerler `config/.env.example` dosyasından alınır; repoya yazılmaz.
`N8N_WEBHOOK_SCHEMA_VALIDATION` yalnızca doğrulama raporunu iletir; şemayı canlıya almaz.

---

## Adımlar

### 1. Şema Envanteri
Mevcut JSON-LD şemalarını tara. Doğrulanmış URL'ler:

| Sayfa | URL | Beklenen Schema |
|---|---|---|
| Ana sayfa | `$BUZSU_SITE_BASE_URL/` | Organization + WebSite |
| Kategori | `$BUZSU_SITE_BASE_URL/su-aritma-cihazlari/` | ItemList |
| Ürün — tezgah altı pompalı | `$BUZSU_SITE_BASE_URL/uv-filtreli-tezgah-alti-su-aritma-cihazi-pompali-model/` | Product |
| Ürün — CODE cihaz | `$BUZSU_SITE_BASE_URL/code-su-aritma-cihazi/` | Product |
| Ürün — atıksız cihaz | `$BUZSU_SITE_BASE_URL/atiksiz-su-aritma-cihazi/` | Product |
| Filtre seti | `$BUZSU_SITE_BASE_URL/code-su-aritma-cihazi-5-li-filtre-seti-made-in-korea/` | Product |
| SSS | `<BUZSU_FAQ_URL>` (doğrulanmadı — gerçek path'i ekle) | FAQPage |
| İletişim / Hakkımızda | `<BUZSU_CONTACT_URL>` (doğrulanmadı — gerçek path'i ekle) | LocalBusiness |

### 2. Şablon Seçimi
`templates/jsonld-template.md` referans al.

### 3. Taslak Üretimi
Her sayfa için `/drafts/schema/[slug].jsonld`

Slug önerileri (doğrulanmış URL'lere dayalı):
- `product-uv-filtreli-tezgah-alti.jsonld`
- `product-code-su-aritma.jsonld`
- `product-atiksiz-su-aritma.jsonld`
- `product-code-filtre-seti.jsonld`
- `organization-buzsu.jsonld`
- `faq-buzsu.jsonld` — `<BUZSU_FAQ_URL>` doğrulandıktan sonra oluştur

**Önemli:** `offers.price` alanına gerçek fiyat bilgisi sağlanmadan
placeholder (`"PRICE_TRY"`) yaz.

### 4. Doğrulama
Her taslak için:
1. `python3 -m json.tool [dosya].jsonld` — JSON sözdizimi
2. Google Rich Results Test — richresults.google.com
3. schema.org/validator — validator.schema.org

Sonuç → `/drafts/schema/validation-[slug]-[YYYY-MM-DD].md`

### 5. GSC Baseline
`$GSC_PROPERTY_URL` → Zenginleştirilmiş Sonuçlar → şema öncesi hata sayısını kaydet.

### 6. Onay
Tüm `/drafts/schema/` taslakları insan onayına sunulur.

### 7. Entegrasyon
Onaylanan şemalar CodeIgniter 4 view'larına eklenir (developer).
Commit örneği: `feat: uv-filtreli-tezgah-alti ürün sayfasına JSON-LD Product şeması eklendi`

### 8. Takip
7 gün sonra `$GSC_PROPERTY_URL` → Zenginleştirilmiş Sonuçlar hata sayısını ölç.

## Onay Notu
Adım 7 canlı site değişikliğidir. MINOR sınıf, onay zorunlu.

## İlgili Skill'ler
`skills/schema`, `skills/ai-search`, `skills/technical-seo`, `skills/gsc`
