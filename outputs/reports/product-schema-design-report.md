# Product Schema Mimari Tasarım Raporu

**Görev:** TASK-003  
**Hedef URL:** `https://www.buzsu.com.tr/su-aritma-cihazlari/`  
**Tarih:** 2026-06-30  
**Agent:** schema-agent  
**Durum:** Taslak — İnsan onayı bekleniyor  
**Onay:** ☐ Bekliyor

> Canlı siteye kod yazılmamıştır.  
> Bu rapor yalnızca mimari tasarım ve entegrasyon planı içerir.  
> Uygulama için insan onayı ve ayrı bir PR gereklidir.

---

## 1. Mevcut Schema Envanteri Özeti

HTML kaynak kodu doğrulamasından (TASK-002) elde edilen kesin tablo:

| Schema Türü | Konum | Durum | Notlar |
|------------|-------|-------|--------|
| `Organization` | `<head>` | ✅ Var | Telefon, logo, sosyal medya linkleri dolu |
| `WebSite` | `<head>` | ✅ Var | SearchAction (site içi arama) dahil |
| `BreadcrumbList` | `<head>` | ✅ Var | Ana Sayfa → Su Arıtma Cihazları, 2 adım |
| `CollectionPage` | Sayfa gövdesi | ✅ Var | `about[]` + `mainEntity.ItemList` (7 WebPage/Article öğesi) |
| `BreadcrumbList` (2. kopya) | Sayfa gövdesi | ✅ Var | `<head>` ile aynı içerik — **tekrar eden kopya** |
| `FAQPage` | Sayfa gövdesi | ✅ Var | 6 soru-cevap çifti |
| **`Product`** | — | ❌ **Yok** | **Hiçbir yerde tanımlanmamış** |

**Kritik boşluk:** Airtable'da 5 aktif ürün tanımlanmış; hiçbirinin sayfasında `Product` schema JSON-LD bloğu bulunmamaktadır. Bu durum Google Shopping ve Rich Results için potansiyel kayıp anlamına gelir.

**Teknik sorun:** `BreadcrumbList` `<head>` ve sayfa gövdesinde iki kez tanımlanmış. İkincisi gereksiz; kaldırılması veya tek noktaya taşınması önerilir.

---

## 2. Önerilen Mimari: CollectionPage + Product

### 2.1 Mimari İlkesi

Google, `Product` rich results'ı yalnızca **ürün sayfalarından** (her ürüne özgü URL) gösterir, kategori sayfasından değil. Bu nedenle mimari iki katmanda kurulur:

```
Kategori Sayfası: /su-aritma-cihazlari/
  └── CollectionPage (mevcut — korunur)
        └── mainEntity.ItemList
              └── ListItem[].item → @type: "Product" (URL referansı)  ← GEO sinyali

Ürün Sayfaları: /code-su-aritma-cihazi/ vb.
  └── Product JSON-LD (YENİ EKLENECEK)
        ├── name, description, image
        ├── sku, brand
        └── offers (price, availability, priceCurrency)
```

### 2.2 Kategori Sayfası: CollectionPage Güncelleme Önerisi

Mevcut `CollectionPage.mainEntity.itemListElement` öğelerini `WebPage` yerine `Product` @type ile tanımla:

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://www.buzsu.com.tr/su-aritma-cihazlari/#collectionpage",
  "url": "https://www.buzsu.com.tr/su-aritma-cihazlari/",
  "name": "Su Arıtma Cihazları ve Fiyatları 2026",
  "description": "Ev, ofis ve işyeri kullanımı için su arıtma cihazı modelleri, fiyatları ve seçim kriterleri.",
  "inLanguage": "tr-TR",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Buzsu Su Arıtma Cihazları",
    "numberOfItems": 5,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Product",
          "name": "5 Aşamalı RO Su Arıtma Sistemi",
          "url": "https://www.buzsu.com.tr/code-su-aritma-cihazi/",
          "brand": {"@type": "Brand", "name": "Buzsu"},
          "offers": {
            "@type": "Offer",
            "priceCurrency": "TRY",
            "price": "13749",
            "availability": "https://schema.org/InStock",
            "url": "https://www.buzsu.com.tr/code-su-aritma-cihazi/"
          }
        }
      }
    ]
  }
}
```

> **Not:** Bu değişiklik GEO/AI Overview alıntı şansını artırır ama Google Shopping rich results için **yeterli değildir** — asıl Product schema ürün sayfasında olmalıdır.

---

## 3. Ürün Sayfası Başına Gerekli Alanlar

Her ürün sayfasına eklenecek `Product` JSON-LD bloğu için zorunlu ve önerilen alanlar:

### 3.1 Alan Listesi

| Alan | Schema.org Property | Zorunlu mu? | Airtable'da Var mı? |
|------|---------------------|-------------|---------------------|
| Ürün adı | `name` | ✅ Zorunlu | ✅ `Product Name` |
| Açıklama | `description` | ✅ Zorunlu | ⚠️ `Notes` var (kısa/dahili — yetersiz) |
| Görsel URL | `image` | ✅ Zorunlu | ❌ Yok |
| Stok durumu | `offers.availability` | ✅ Zorunlu | ⚠️ `Active` checkbox → InStock/Discontinued mantığı kurulabilir |
| Fiyat | `offers.price` | ✅ Zorunlu | ✅ `Price TRY` |
| Para birimi | `offers.priceCurrency` | ✅ Zorunlu | ❌ Yok (sabit "TRY" yazılabilir) |
| Sayfa URL | `offers.url` | ✅ Zorunlu | ✅ `Buzsu URL` |
| Marka | `brand.name` | Önerilen | ❌ Yok (sabit "Buzsu" yazılabilir) |
| SKU | `sku` | Önerilen | ❌ Yok |
| Kategori | `category` | Önerilen | ✅ `Category` (Su Aritma / Filtre / TDS Metre) |
| Değerlendirme | `aggregateRating` | Önerilen | ❌ Yok (HTML'de görsel yıldız var ama schema'da yok) |
| Satıcı | `offers.seller` | Önerilen | ❌ Yok (Organization referansı yazılabilir) |

### 3.2 Airtable Mevcut Ürün Envanteri

| # | Ürün Adı | Fiyat (TRY) | URL | Kategori | Aktif |
|---|---------|-------------|-----|---------|-------|
| 1 | 5 Aşamalı RO Su Arıtma Sistemi | 13.749 | /code-su-aritma-cihazi/ | Su Aritma | ✅ |
| 2 | Atıksız Su Arıtma Cihazı | 9.749 | /atiksiz-su-aritma-cihazi/ | Su Aritma | ✅ |
| 3 | 7 Aşamalı RO Su Arıtma Sistemi | 12.999 | /uv-filtreli-tezgah-alti-su-aritma-cihazi-pompali-model/ | Su Aritma | ✅ |
| 4 | Dijital TDS Metre | 450 | /tds-metre/ | TDS Metre | ✅ |
| 5 | Yıllık Filtre Seti (5'li) | 3.390 | /code-su-aritma-cihazi-5-li-filtre-seti-made-in-korea/ | Filtre | ✅ |

---

## 4. Airtable'dan Alınabilecek Bilgiler

| Schema Alanı | Airtable Karşılığı | Alan ID | Doğrudan Kullanım |
|-------------|-------------------|---------|-----------------|
| `name` | `Product Name` | `fldXLw08VVVF8Aquz` | ✅ Doğrudan |
| `offers.price` | `Price TRY` | `fldEds5Vy1frHlw3e` | ✅ Doğrudan (sayısal) |
| `offers.url` | `Buzsu URL` | `fldOZXnwqNzgddMxj` | ✅ Doğrudan |
| `offers.availability` | `Active` checkbox | `fldOjYbJvwIvEMPNs` | ✅ `true` → `InStock`, `false` → `Discontinued` |
| `category` | `Category` | `fldLXUPLXEO2HHFK9` | ✅ `name` alanından |
| `description` | `Notes` | `fldmnDYpfEoJX5P0Y` | ⚠️ Dahili not — public description için uygun değil; ayrı alan açılmalı |

**Airtable'a eklenmesi önerilen yeni alanlar:**

| Alan Adı | Tip | Amaç |
|---------|-----|-------|
| `Schema Description` | `multilineText` | Public `description` — Google'a gösterilecek |
| `Image URL` | `url` | `image` property için CDN URL |
| `SKU` | `singleLineText` | Envanter takibi + schema `sku` |
| `Schema Active` | `checkbox` | Schema yayınını prod'dan bağımsız kontrol |

---

## 5. JSON-LD Örnekleri — 5 Ürün

### 5.1 Ürün 1: 5 Aşamalı RO Su Arıtma Sistemi
*Sayfa: `/code-su-aritma-cihazi/`*

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "5 Aşamalı RO Su Arıtma Sistemi",
  "description": "Ev ve aile kullanımı için 5 aşamalı ters ozmoz su arıtma cihazı. Kurulum dahil, ücretsiz servis desteği. Buzsu güvencesiyle.",
  "image": "DOLDURULACAK — ürün görseli CDN URL",
  "sku": "DOLDURULACAK",
  "brand": {
    "@type": "Brand",
    "name": "Buzsu"
  },
  "category": "Su Arıtma Cihazı",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "TRY",
    "price": "13749",
    "availability": "https://schema.org/InStock",
    "url": "https://www.buzsu.com.tr/code-su-aritma-cihazi/",
    "seller": {
      "@id": "https://www.buzsu.com.tr/#organization"
    }
  }
}
```

### 5.2 Ürün 2: 7 Aşamalı RO Su Arıtma Sistemi (UV'li)
*Sayfa: `/uv-filtreli-tezgah-alti-su-aritma-cihazi-pompali-model/`*

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "7 Aşamalı RO Su Arıtma Sistemi — UV Filtreli Pompalı Model",
  "description": "UV sterilizasyon dahil 7 aşamalı ters ozmoz su arıtma cihazı. Yüksek kireçli sularda performans. Kurulum ve servis dahil.",
  "image": "DOLDURULACAK — ürün görseli CDN URL",
  "sku": "DOLDURULACAK",
  "brand": {
    "@type": "Brand",
    "name": "Buzsu"
  },
  "category": "Su Arıtma Cihazı",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "TRY",
    "price": "12999",
    "availability": "https://schema.org/InStock",
    "url": "https://www.buzsu.com.tr/uv-filtreli-tezgah-alti-su-aritma-cihazi-pompali-model/",
    "seller": {
      "@id": "https://www.buzsu.com.tr/#organization"
    }
  }
}
```

### 5.3 Ürün 3: Atıksız Su Arıtma Cihazı
*Sayfa: `/atiksiz-su-aritma-cihazi/`*

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Atıksız Su Arıtma Cihazı",
  "description": "Atık su üretmeyen su arıtma sistemi. Kurulum gerektirmez. Su tasarrufu öncelikli kullanıcılar ve kiracılar için ideal.",
  "image": "DOLDURULACAK — ürün görseli CDN URL",
  "sku": "DOLDURULACAK",
  "brand": {
    "@type": "Brand",
    "name": "Buzsu"
  },
  "category": "Su Arıtma Cihazı",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "TRY",
    "price": "9749",
    "availability": "https://schema.org/InStock",
    "url": "https://www.buzsu.com.tr/atiksiz-su-aritma-cihazi/",
    "seller": {
      "@id": "https://www.buzsu.com.tr/#organization"
    }
  }
}
```

### 5.4 Ürün 4: Dijital TDS Metre
*Sayfa: `/tds-metre/`*

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Dijital TDS Metre",
  "description": "Su kalitesini ölçmek için dijital TDS ölçüm cihazı. Anlık mg/L ve ppm ölçümü. Hızlı kargo.",
  "image": "DOLDURULACAK — ürün görseli CDN URL",
  "sku": "DOLDURULACAK",
  "brand": {
    "@type": "Brand",
    "name": "Buzsu"
  },
  "category": "TDS Metre",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "TRY",
    "price": "450",
    "availability": "https://schema.org/InStock",
    "url": "https://www.buzsu.com.tr/tds-metre/",
    "seller": {
      "@id": "https://www.buzsu.com.tr/#organization"
    }
  }
}
```

### 5.5 Ürün 5: Yıllık Filtre Seti (5'li)
*Sayfa: `/code-su-aritma-cihazi-5-li-filtre-seti-made-in-korea/`*

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Yıllık Filtre Seti 5'li — Made in Korea",
  "description": "Buzsu Code su arıtma cihazı için orijinal Kore yapımı 5'li yıllık filtre seti. 6–12 ayda bir değişim önerilir.",
  "image": "DOLDURULACAK — ürün görseli CDN URL",
  "sku": "DOLDURULACAK",
  "brand": {
    "@type": "Brand",
    "name": "Buzsu"
  },
  "category": "Su Arıtma Filtresi",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "TRY",
    "price": "3390",
    "availability": "https://schema.org/InStock",
    "url": "https://www.buzsu.com.tr/code-su-aritma-cihazi-5-li-filtre-seti-made-in-korea/",
    "seller": {
      "@id": "https://www.buzsu.com.tr/#organization"
    }
  }
}
```

---

## 6. CodeIgniter 4 Entegrasyon Planı

### 6.1 Mimari Yaklaşım

Buzsu.com.tr özel PHP CMS üzerinde çalışıyor (CodeIgniter 4). JSON-LD üretimi için iki yöntem önerilir:

**Yöntem A — View Helper (Önerilen)**

```php
// app/Helpers/schema_helper.php

function product_schema(array $product): string
{
    $schema = [
        '@context' => 'https://schema.org',
        '@type'    => 'Product',
        'name'     => $product['name'],
        'description' => $product['description'] ?? '',
        'image'    => $product['image_url'] ?? '',
        'sku'      => $product['sku'] ?? '',
        'brand'    => ['@type' => 'Brand', 'name' => 'Buzsu'],
        'category' => $product['category'] ?? '',
        'offers'   => [
            '@type'         => 'Offer',
            'priceCurrency' => 'TRY',
            'price'         => (string)$product['price'],
            'availability'  => $product['active']
                ? 'https://schema.org/InStock'
                : 'https://schema.org/Discontinued',
            'url'           => $product['url'],
            'seller'        => ['@id' => 'https://www.buzsu.com.tr/#organization'],
        ],
    ];

    return '<script type="application/ld+json">'
        . json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT)
        . '</script>';
}
```

**View dosyasında kullanım (ürün sayfası `<head>` içinde):**

```php
<?= product_schema([
    'name'        => $product->name,
    'description' => $product->schema_description,
    'image_url'   => $product->image_url,
    'sku'         => $product->sku,
    'category'    => $product->category,
    'price'       => $product->price,
    'active'      => $product->active,
    'url'         => current_url(),
]) ?>
```

**Yöntem B — Controller Injection (Alternatif)**

Controller'da `$data['schema_json']` olarak hazırla, view'a geç, `<head>` içinde `echo $schema_json` ile bas.

### 6.2 Veri Akışı

```
Airtable Products (tbldogYQwAQr24UWE)
        ↓
  [Airtable API — okuma]
        ↓
  buzsu.com.tr CMS Ürün Modeli
        ↓
  product_schema() helper
        ↓
  <script type="application/ld+json"> → ürün sayfası <head>
```

> Airtable'dan doğrudan canlı besleme yerine CMS ürün kayıtlarını senkronize etmek daha güvenlidir. Airtable veri tabanı kaynak gerçek, CMS uygulama gerçeği olarak çalışır.

### 6.3 Kategori Sayfası CollectionPage Güncellemesi

`/su-aritma-cihazlari/` sayfasının mevcut `CollectionPage` bloğundaki `mainEntity.itemListElement` öğeleri `WebPage` → `Product` @type ile güncellenir:

```php
// app/Helpers/schema_helper.php

function collection_page_schema(array $products): string
{
    $items = [];
    foreach ($products as $i => $p) {
        $items[] = [
            '@type'    => 'ListItem',
            'position' => $i + 1,
            'item'     => [
                '@type'    => 'Product',
                'name'     => $p['name'],
                'url'      => $p['url'],
                'brand'    => ['@type' => 'Brand', 'name' => 'Buzsu'],
                'offers'   => [
                    '@type'         => 'Offer',
                    'priceCurrency' => 'TRY',
                    'price'         => (string)$p['price'],
                    'availability'  => $p['active']
                        ? 'https://schema.org/InStock'
                        : 'https://schema.org/Discontinued',
                ],
            ],
        ];
    }

    $schema = [
        '@context'    => 'https://schema.org',
        '@type'       => 'CollectionPage',
        '@id'         => 'https://www.buzsu.com.tr/su-aritma-cihazlari/#collectionpage',
        'url'         => 'https://www.buzsu.com.tr/su-aritma-cihazlari/',
        'name'        => 'Su Arıtma Cihazları ve Fiyatları 2026',
        'description' => 'Ev, ofis ve işyeri kullanımı için su arıtma cihazı modelleri, fiyatları ve seçim kriterleri.',
        'inLanguage'  => 'tr-TR',
        'mainEntity'  => [
            '@type'           => 'ItemList',
            'name'            => 'Buzsu Su Arıtma Cihazları',
            'numberOfItems'   => count($products),
            'itemListElement' => $items,
        ],
    ];

    return '<script type="application/ld+json">'
        . json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT)
        . '</script>';
}
```

---

## 7. Mevcut Schema ile Çakışma Kontrolü

| Mevcut Schema | Çakışma Riski | Değerlendirme |
|--------------|--------------|--------------|
| `Organization` (`<head>`) | ❌ Yok | Product schema bağımsız blok; Organization `@id` referansı kullanılacak |
| `WebSite` (`<head>`) | ❌ Yok | İlgisiz — aynı sayfada birden fazla farklı @type schema tamam |
| `BreadcrumbList` × 2 | ⚠️ Tekrar — risk değil ama gereksiz | Sayfa gövdesindeki kopya kaldırılmalı; sadece `<head>` yeterli |
| `CollectionPage` | ⚠️ Güncelleme gerekli | `mainEntity.itemListElement` içindeki `WebPage` öğeleri `Product` @type ile değiştirilmeli |
| `FAQPage` | ❌ Yok | Tamamen ayrı bölüm; Product schema ile çakışmaz |

**Sonuç:** Doğrudan çakışma yok. `BreadcrumbList` tekrarı temizlenmeli; `CollectionPage` güncellemesi önerilir.

---

## 8. Risk Analizi

| Risk | Olasılık | Etki | Azaltma |
|------|---------|------|---------|
| `image` alanı eksik → Google Rich Results Test başarısız | **Yüksek** | Yüksek | Ürün CDN URL'leri önce `DOLDURULACAK` alanından toplanmalı; schema yalnızca image URL hazır olunca yayına alınmalı |
| `description` çok kısa / dahili not → Google'da zayıf görünüm | **Yüksek** | Orta | Airtable'a `Schema Description` alanı ekle; her ürün için 50–150 kelime public açıklama yaz |
| `sku` eksik → Merchant Center entegrasyonu çalışmaz | **Orta** | Orta (gelecek) | Airtable'a `SKU` alanı ekle; şimdilik `sku` alanını omit et |
| `price` değiştiğinde schema güncellenmezse tutarsızlık | **Orta** | Düşük | Fiyat Airtable'dan dinamik çekiliyorsa senkronizasyon periyodu belirlenmeli |
| Sayfa gövdesindeki `BreadcrumbList` kopyası validator'ı karıştırır | **Düşük** | Düşük | Schema PR'ında kopya kaldırılır |
| `aggregateRating` schema'da yokken HTML'de yıldız görseli var | **Düşük** | Düşük | İleride review entegrasyonu yapılabilir; şimdilik omit et |
| Site hızı etkisi | **Çok düşük** | Çok düşük | JSON-LD `<head>`'e taşınırsa render-blocking değil; etkisiz |

---

## 9. PR Öncesi Doğrulama Listesi

PR açılmadan önce aşağıdaki adımlar tamamlanmalıdır:

### 9.1 Veri Tamamlama (İnsan Görevi)

- [ ] Her ürün için `image` URL'si tespit edildi (CDN veya ürün sayfasından)
- [ ] Her ürün için `description` (50–150 kelime, Türkçe, public) yazıldı
- [ ] Her ürün için `sku` belirlendi (varsa)
- [ ] Airtable Products tablosuna `Schema Description`, `Image URL`, `SKU` alanları eklendi

### 9.2 JSON-LD Doğrulama

- [ ] Her ürün sayfasının JSON-LD'si [Google Rich Results Test](https://search.google.com/test/rich-results) ile test edildi
- [ ] `Product` bloğu "Zengin sonuçlar için uygun" statüsü aldı
- [ ] Hata veya uyarı yok
- [ ] `CollectionPage` bloğu güncellendikten sonra kategori sayfası da test edildi

### 9.3 Kod İnceleme (PR Review)

- [ ] `product_schema()` helper PHP 8.x uyumlu
- [ ] `json_encode()` `JSON_UNESCAPED_UNICODE` ile çağrılıyor (Türkçe karakter güvenliği)
- [ ] Fiyat `string` olarak geçiyor (schema.org `price` özelliği string bekler)
- [ ] `@id` referansı `Organization` ID'siyle (`https://www.buzsu.com.tr/#organization`) eşleşiyor
- [ ] `availability` mantığı `active=true` → `InStock`, `active=false` → `Discontinued` doğru çalışıyor
- [ ] Ürün sayfasında mevcut `<script type="application/ld+json">` bloğu varsa çakışma yok

### 9.4 Canlı Sonrası

- [ ] Google Search Console → URL Inspection → Product sayfası indekslenmiş
- [ ] Rich results raporu 7 gün sonra kontrol edildi
- [ ] Airtable `Price TRY` değiştiğinde schema güncellendiği doğrulandı

---

## 10. Öncelik Sırası ve PR Planı

```
PR 1: fix/product-schema-page-1 (code-su-aritma-cihazi)
  └── Veri hazır olduğunda başlar (image + description + sku)
  └── Patch referansı: patches/buzsu-site/product-schema-v2.md

PR 2: fix/product-schema-page-2 (atiksiz-su-aritma-cihazi)
PR 3: fix/product-schema-page-3 (uv-filtreli-pompali)
PR 4: fix/product-schema-page-4 (tds-metre)
PR 5: fix/product-schema-page-5 (5li-filtre-seti)

PR 6: fix/collection-page-schema-update
  └── /su-aritma-cihazlari/ — CollectionPage.mainEntity.itemListElement WebPage→Product
  └── BreadcrumbList sayfa gövdesi kopyası kaldırılır
```

> Her PR ayrı branch — toplu değişiklik yasak (CLAUDE.md kuralı).

---

## Onay Kaydı

```
Tasarım tamamlanma tarihi: 2026-06-30
Onaylayan: —
Onay tarihi: —
Uygulama başlangıcı: — (image + description + sku verisi hazır olduktan sonra)
```
