# TASK-005 Raporu — CodeIgniter 4 Product Schema Entegrasyon Planı

**Tarih:** 2026-06-30  
**Agent:** schema-agent  
**Bağımlı görevler:** TASK-003 (schema mimarisi), TASK-004 (Airtable alanları)  
**Durum:** Taslak — İnsan onayı bekliyor  
**Canlı deploy:** HAYIR — yalnızca plan ve taslak kod

---

## 1. Yönetici Özeti

Bu rapor, `buzsu.com.tr` CodeIgniter 4 altyapısına Product Schema JSON-LD eklenmesi için gereken dosya değişikliklerini, PHP taslak kodunu, branch stratejisini ve doğrulama listesini içerir.  
**Airtable'da SKU, Image URL ve Schema Description alanları doldurulmadan PR merge edilmez.**  
Branch `draft` olarak açılır; tüm koşullar sağlandıktan sonra `ready for review` yapılır.

---

## 2. Mevcut Schema Envanteri (HTML Doğrulamasından)

| Schema Tipi | Konum | Durum |
|-------------|-------|-------|
| Organization | `<head>` | ✅ Mevcut |
| WebSite | `<head>` | ✅ Mevcut |
| BreadcrumbList | `<head>` | ✅ Mevcut |
| BreadcrumbList | `<body>` | ⚠️ Duplicate — kaldırılmalı (ayrı PR) |
| CollectionPage | `<body>` | ✅ Mevcut |
| FAQPage | `<body>` | ✅ Mevcut (6 soru) |
| Product | — | ❌ Eksik — bu PR ekler |

---

## 3. Etkilenecek CI4 Dosyaları

Buzsu.com.tr'nin CI4 proje yapısına göre tahmini dosya yolları. Gerçek yollar insan tarafından doğrulanmalıdır.

```
app/
├── Helpers/
│   └── schema_helper.php          ← YENİ — product_schema() fonksiyonu
├── Controllers/
│   └── ProductController.php      ← MEVCUT — $data dizisine schema verisi eklenir
├── Views/
│   ├── products/
│   │   └── detail.php             ← MEVCUT — <head> içine schema çıktısı eklenir
│   └── layouts/
│       └── main.php               ← MEVCUT — helper yükleme noktası (varsa)
└── Config/
    └── Autoload.php               ← MEVCUT — schema_helper autoload'a eklenir
```

---

## 4. PHP Helper Taslağı — `schema_helper.php`

```php
<?php
// app/Helpers/schema_helper.php
// Product Schema JSON-LD üretici — DRAFT, insan onayı gerekli

if (! function_exists('product_schema')) {
    /**
     * Ürün verisi dizisinden Product Schema JSON-LD <script> etiketi üretir.
     *
     * @param array $product Airtable veya DB'den gelen ürün verisi
     * @return string JSON-LD <script> etiketi
     */
    function product_schema(array $product): string
    {
        // Zorunlu alanlar eksikse boş string dön — eksik schema yayınlanmaz
        if (empty($product['name']) || empty($product['price']) || empty($product['url'])) {
            return '';
        }

        $schema = [
            '@context' => 'https://schema.org',
            '@type'    => 'Product',
            'name'     => $product['name'],
            'offers'   => [
                '@type'         => 'Offer',
                'priceCurrency' => 'TRY',
                'price'         => (string) $product['price'],
                'availability'  => ! empty($product['active'])
                    ? 'https://schema.org/InStock'
                    : 'https://schema.org/Discontinued',
                'url'           => $product['url'],
                'seller'        => [
                    '@id' => 'https://www.buzsu.com.tr/#organization',
                ],
            ],
        ];

        // İsteğe bağlı alanlar — Airtable'da dolu ise eklenir
        if (! empty($product['description'])) {
            $schema['description'] = $product['description'];
        }

        if (! empty($product['image_url'])) {
            $schema['image'] = $product['image_url'];
        }

        if (! empty($product['sku'])) {
            $schema['sku'] = $product['sku'];
        }

        if (! empty($product['category'])) {
            $schema['category'] = $product['category'];
        }

        // Marka sabit
        $schema['brand'] = [
            '@type' => 'Brand',
            'name'  => 'Buzsu',
        ];

        return '<script type="application/ld+json">'
            . json_encode(
                $schema,
                JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT
            )
            . '</script>' . PHP_EOL;
    }
}
```

---

## 5. Controller Değişikliği Taslağı — `ProductController.php`

```php
// ProductController.php içinde show() veya detail() metoduna eklenti

public function show(string $slug): string
{
    // ... mevcut kod ...

    // Airtable veya DB'den ürün verisi çekme (mevcut yapıya göre uyarlanır)
    $product = $this->productModel->getBySlug($slug);

    // Schema verisi hazırlama
    $data['product_schema_html'] = product_schema([
        'name'        => $product['Product Name']    ?? '',
        'price'       => $product['Price TRY']       ?? 0,
        'url'         => $product['Buzsu URL']        ?? '',
        'active'      => $product['Active']           ?? false,
        'description' => $product['Schema Description'] ?? '',
        'image_url'   => $product['Image URL']        ?? '',
        'sku'         => $product['SKU']              ?? '',
        'category'    => $product['Category']         ?? '',
    ]);

    return view('products/detail', $data);
}
```

---

## 6. View Değişikliği Taslağı — `detail.php`

```php
<!-- app/Views/products/detail.php -->
<!-- <head> kapanış etiketinden ÖNCE — mevcut schema bloklarının ALTINA -->

<?php if (! empty($product_schema_html)) : ?>
    <?= $product_schema_html ?>
<?php endif; ?>

</head>
```

> **Önemli:** Schema `<head>` içine eklenir. Kategori sayfasındaki body-içi BreadcrumbList duplicate'iyle çakışma olmaz çünkü Product schema ürün sayfasına özgüdür.

---

## 7. Autoload Değişikliği — `Config/Autoload.php`

```php
// app/Config/Autoload.php — $helpers dizisine ekle
public $helpers = [
    'url',
    'form',
    'schema',   // ← EKLE
];
```

---

## 8. Airtable → CI4 Veri Akışı

```
Airtable Products Tablosu (tbldogYQwAQr24UWE)
    │
    │  API Key (env var) — CI4 backend okur, yazar değil
    ▼
CI4 Model (AirtableProductModel veya mevcut model)
    │  getBySlug($slug) → alan mapping
    ▼
ProductController::show()
    │  product_schema($data) → JSON-LD string
    ▼
View (detail.php)
    │  <?= $product_schema_html ?>
    ▼
<head> içine Product Schema eklendi
```

**Alan Mapping — Airtable → PHP:**

| Airtable Alan Adı | PHP Dizi Anahtarı | Field ID |
|-------------------|-------------------|----------|
| Product Name | `name` | `fldXLw08VVVF8Aquz` |
| Price TRY | `price` | `fldEds5Vy1frHlw3e` |
| Buzsu URL | `url` | `fldOZXnwqNzgddMxj` |
| Active | `active` | `fldOjYbJvwIvEMPNs` |
| Schema Description | `description` | *yeni alan — ID henüz yok* |
| Image URL | `image_url` | *yeni alan — ID henüz yok* |
| SKU | `sku` | *yeni alan — ID henüz yok* |
| Category | `category` | `fldLXUPLXEO2HHFK9` |

---

## 9. Branch ve PR Stratejisi

### Branch Adı

```
feat/product-schema-ci4
```

### Commit Sırası (Önerilen)

```
feat: add schema_helper with product_schema() function
feat: pass product schema data in ProductController
feat: render product_schema_html in detail view head
chore: autoload schema helper in CI4 config
```

### PR Başlığı

```
feat: add Product Schema JSON-LD to product detail pages
```

### PR Durumu

- Açılır: **Draft**
- `ready for review` yapılır: Airtable'da 5 ürün için SKU + Image URL + Schema Description dolu olduğunda
- Merge edilir: Google Rich Results Test geçildiğinde + insan onayı

### PR Açıklaması (Taslak)

```markdown
## Değişiklikler

- `app/Helpers/schema_helper.php` eklendi: product_schema() helper fonksiyonu
- `ProductController.php` güncellendi: schema verisi $data'ya eklendi
- `Views/products/detail.php` güncellendi: <head> içine schema_html render edildi
- `Config/Autoload.php` güncellendi: schema helper autoload'a eklendi

## Schema Mimarisi

- Tip: schema.org/Product
- Konum: Ürün detail sayfaları (<head>)
- Kategori sayfasına eklenmez
- Mevcut BreadcrumbList, FAQPage, Organization ile çakışma yok

## Doğrulama

- [ ] Google Rich Results Test: https://search.google.com/test/rich-results
- [ ] Schema.org validator: https://validator.schema.org
- [ ] 5 ürün sayfası tek tek test edildi
- [ ] Airtable SKU + Image URL + Schema Description dolu

## Merge Koşulları

- [ ] Airtable 3 yeni alan dolu (TASK-004)
- [ ] Rich Results Test geçildi
- [ ] Code review tamamlandı
- [ ] Duplicate BreadcrumbList ayrı PR'da kaldırıldı
```

---

## 10. Doğrulama Listesi

### Geliştirme Ortamında

- [ ] `product_schema()` fonksiyonu boş `$product` ile test edildi — boş string dönüyor mu?
- [ ] `price` alanı `0` olduğunda schema üretilmiyor mu?
- [ ] `active: false` iken `Discontinued` kullanılıyor mu?
- [ ] JSON çıktısı `json_decode()` ile parse ediliyor mu (syntax hata yok)?
- [ ] `PHP_EOL` ile satır sonu ekleniyor mu?

### Google Araçları

- [ ] [Rich Results Test](https://search.google.com/test/rich-results) — 5 ürün URL'si test edildi
- [ ] [Schema Validator](https://validator.schema.org) — JSON-LD doğrulandı
- [ ] Search Console'da yeni hata/uyarı çıkmıyor

### Çakışma Kontrolü

- [ ] Kategori sayfasındaki `CollectionPage` schema'sı bozulmadı
- [ ] `FAQPage` schema'sı bozulmadı
- [ ] `Organization` schema'sı bozulmadı
- [ ] `BreadcrumbList` (head) bozulmadı

---

## 11. Rollback Planı

Sorun çıkarsa geri alma adımları:

1. `detail.php` içinde schema render satırı comment'e alınır:
   ```php
   {{-- <?= $product_schema_html ?> --}}
   ```
2. `ProductController.php` içinde `product_schema()` çağrısı comment'e alınır
3. Airtable'da yeni alanlar silinmez — veri kayıp riski olmaz
4. Schema helper dosyası silinmez — sadece autoload'dan çıkarılır

Rollback süre tahmini: 5 dakika, deploy gerekmez (PHP dosya değişikliği).

---

## 12. Sonraki Adımlar

| Adım | Öncelik | Sorumlu | Bağımlılık |
|------|---------|---------|------------|
| Airtable'da 3 alan oluştur ve doldur | P1 | İnsan | TASK-004 |
| Bu planı gözden geçir ve onaylar | P1 | İnsan | Bu rapor |
| `feat/product-schema-ci4` branch aç | P1 | Geliştirici / agent | İnsan onayı |
| Taslak kodu CI4 projesiyle uyarla | P1 | Geliştirici | Branch |
| Draft PR aç | P1 | Geliştirici / agent | Branch |
| Rich Results Test uygula | P1 | Geliştirici | Staging deploy |
| PR'ı `ready for review` yap | P2 | Geliştirici | Test geçildi |
| TASK-006: duplicate BreadcrumbList kaldır | P2 | schema-agent | Ayrı PR |

---

*Rapor: schema-agent — TASK-005 — 2026-06-30*
