# BUZSU SEO / GEO / AEO / Schema Aksiyon Planı

**Tarih:** 2026-06-30  
**Kapsam:** www.buzsu.com.tr — 4 öncelikli sayfa  
**Hazırlayan:** BUZSU Growth OS (skills/seo, skills/ai-search, skills/schema-automation, knowledge-graph, playbooks referans alınarak)  
**Durum:** Taslak — insan onayı bekleniyor  

> Deploy yapılmadı. Canlı siteye yazılmadı. Bu rapor analiz ve görev planından ibarettir.

---

## Analiz Kapsamındaki Sayfalar

| # | URL | Sayfa Tipi | Öncelik |
|---|---|---|---|
| 1 | `/en-iyi-su-aritma-cihazi-hangisi/` | Rehber / Blog | P1 |
| 2 | `/su-aritma-cihazlari/` | Ana Kategori | P1 |
| 3 | `/ev-tipi-su-aritma-cihazlari/` | Alt Kategori | P2 |
| 4 | `/manyetik-kirec-onleyici/` | Ürün / Aksesuar | P2 |

---

## 1. Sayfa Analizleri

### 1.1 `/en-iyi-su-aritma-cihazi-hangisi/` — Rehber Makalesi

**Intent:** Informational → Decision support  
**AI Search Potansiyeli:** ⭐⭐⭐⭐⭐ — En yüksek. Perplexity ve ChatGPT bu tür karşılaştırmalı rehberleri alıntılar.

#### Eksik Schema

| Schema Tipi | Eksiklik | Etki |
|---|---|---|
| `Article` / `BlogPosting` | Muhtemelen yok | Google'ın içeriği anlayamaması, AI alıntı yokluğu |
| `FAQPage` | Yok | Featured Snippet ve AI Overview kaybı |
| `BreadcrumbList` | Belirsiz | Navigasyon rich result kaybı |
| `Author` entity | E-E-A-T zayıflığı | AI kaynaklarda düşük güvenilirlik |
| `datePublished` / `dateModified` | Taze içerik sinyali eksik | AI'ın güncel kaynak tercih etmemesi |

#### Eksik Entity

- **Author entity:** Yazar kim? Uzman mı? `Person` entity ile `knowsAbout: su arıtma teknolojisi` bağlantısı yok.
- **Karşılaştırılan ürün entity'leri:** Makalede bahsedilen ürünler (`Product` @type) schema ile işaretlenmemiş; LLM'ler bu bağlantıyı kendi başına kuramaz.
- **Marka entity:** `Buzsu` markasının `Organization` olarak `sameAs` ile Knowledge Graph'a bağlanması bu sayfada da pekiştirilebilir.

#### İçerik Boşlukları

- **Atomic answer paragrafı yok:** "En iyi su arıtma cihazı hangisidir?" sorusuna 40-60 kelimelik, bağlamdan bağımsız okunabilir bir giriş cümlesi (AI alıntı için kritik).
- **Güncel bağlam eksik:** Yıl belirtilmemiş; AI'lar güncelliği önemser. `2025 yılında en iyi su arıtma cihazı` sinyal eksik.
- **Karşılaştırma tablosu:** Cihazları özellik bazında karşılaştıran yapısal bir tablo yoksa LLM'ler veri çekemez.
- **"Kimler için uygun?" segmentasyonu:** ev / işyeri / sağlık hassasiyeti olan kullanıcı ayrımı yapan bir bölüm eksik.
- **Suvesu bağlantısı:** Eğitici içerik (Suvesu) → satın alma sayfası (Buzsu) iç bağlantı zinciri kurulmalı.

#### AI Search Görünürlük Fırsatları (GEO/AEO)

- Bu sayfa `AI Overview` için birincil aday. Her soruya kısa, net, alıntılanabilir paragraf eklenmeli.
- Hedef sorgular:
  - "en iyi su arıtma cihazı hangisi" (yüksek hacim)
  - "tezgah altı mı pompasız mı" (decision query)
  - "su arıtma cihazı seçerken nelere dikkat edilir" (informational, PAA'da çıkabilir)
  - "Buzsu CODE cihaz nasıl" (branded)
- **llms.txt'de bu sayfanın URL'si açıkça listelenmiş olmalı** (LLM crawler'ların öncelikli görmesi için).

---

### 1.2 `/su-aritma-cihazlari/` — Ana Kategori

**Intent:** Commercial / Navigational  
**AI Search Potansiyeli:** ⭐⭐⭐⭐ — "Su arıtma cihazı çeşitleri" sorgularında liste fırsatı.

#### Eksik Schema

| Schema Tipi | Eksiklik | Etki |
|---|---|---|
| `ItemList` | Yok (bekleniyor ama muhtemelen eksik) | Ürün listesi rich result kaybı |
| `BreadcrumbList` | Belirsiz | Navigasyon sinyali eksik |
| `FAQPage` | Yok | "Su arıtma cihazı nedir" PAA kaybı |
| `Organization` + `sameAs` | Ana sayfada olabilir ama kategoride pekiştirilmemiş | Knowledge Graph bağlantısı zayıf |

#### Eksik Entity

- **Kategori entity'si:** `ProductCollection` veya `CollectionPage` olarak işaretlenmemiş.
- **Alt kategori ilişkileri:** `ev-tipi`, `isyeri-tipi`, `endustriyel` alt kategorilerle `hasPart` / `isPartOf` ilişkisi yok.
- **`areaServed: Türkiye`** bağlantısı bu sayfada da tanımlanmalı (GEO sinyali).

#### İçerik Boşlukları

- **Türkiye su kalitesi bağlamı yok:** "Türkiye'de şehirlere göre su sertlik seviyesi" bilgisi kategoride yer almıyor. Şehir bazlı öneri (Ankara'da kireçli su → tüm filtreleme gerekli) içerik sinyal değeri yüksek.
- **Filtreleme teknolojisi özeti eksik:** RO membran / UV / sediment fark açıklaması — kullanıcılar bu sayfadan karar vermek ister.
- **Pompasız vs pompalı karşılaştırması** yoksa karar destek içeriği eksik.
- **SSS bölümü:** "Su arıtma cihazı fiyatları neden farklılık gösterir?", "Hangisi daha tasarruflu?" gibi sorgular.

#### AI Search Görünürlük Fırsatları (GEO/AEO)

- Hedef sorgular:
  - "su arıtma cihazı çeşitleri" (informational → commercial)
  - "Buzsu su arıtma cihazları" (branded)
  - "tezgah altı su arıtma cihazı" (high intent)
- **GEO fırsatı:** Perplexity ve ChatGPT'de "Türkiye'de su arıtma cihazı" sorgularında alıntılanabilmek için yerel bağlam (Türkiye, su sertliği haritası referansı) eklenebilir.

---

### 1.3 `/ev-tipi-su-aritma-cihazlari/` — Alt Kategori

**Intent:** Commercial  
**AI Search Potansiyeli:** ⭐⭐⭐ — "Evde kullanım için su arıtma" sorguları için orta-yüksek fırsat.

#### Eksik Schema

| Schema Tipi | Eksiklik | Etki |
|---|---|---|
| `ItemList` | Yok | Ürün listesi rich result kaybı |
| `BreadcrumbList` | Belirsiz | Kategori hiyerarşisi Google'a belli değil |
| `FAQPage` | Yok | "Ev tipi su arıtma cihazı nasıl çalışır" PAA kaybı |
| `WebPage` + `about` | Yok | Sayfa konusu entity sinyali eksik |

#### Eksik Entity

- **"Ev tipi" kavramı entity olarak tanımlanmamış:** `ProductCategory` entity ile `isyeri-tipi` kardeş kategoriye `sameAs` veya `relatedTo` bağlantısı yok.
- **Kullanıcı segmenti entity'si:** Aile / çocuk sahibi / sağlık hassasiyeti olan kullanıcı özellikleri içerik ve schema'da temsil edilmiyor.
- **Kapasite entity'si:** Günlük filtreleme kapasitesi (litre/gün) ürün özelliği olarak `additionalProperty` ile işaretlenmemiş.

#### İçerik Boşlukları

- **İşyeri tipiyle fark nedir?** Bu sayfaya gelen kullanıcıların temel sorusu — yanıt yoksa bounce yüksek.
- **Şehir bazlı öneri:** Ankara (yüksek kireç) vs İstanbul (orta kireç) fark; GEO sinyali ve kullanıcı güveni için kritik.
- **Montaj / kurulum kolaylığı:** Ev tipi cihazlarda anahtar kullanıcı endişesi; içerikte yoksa fırsat kaçıyor.
- **Enerji / su tüketimi:** Aileler için tüketim maliyeti bilgisi karar verici içerik.

#### AI Search Görünürlük Fırsatları (GEO/AEO)

- Hedef sorgular:
  - "evde kullanım için en iyi su arıtma cihazı" (high AI Overview potential)
  - "ev tipi su arıtma cihazı tavsiye"
  - "çocuklu aileler için su arıtma"
- **GEO:** İçeriğe Türkiye şehirlerine göre su sertlik bilgisi eklenmesi, Perplexity ve ChatGPT'nin yerel sorulara Buzsu içeriğini alıntılamasını sağlar.

---

### 1.4 `/manyetik-kirec-onleyici/` — Ürün / Aksesuar

**Intent:** Transactional + Informational (hybrid — kullanıcı hem "nedir" hem "fiyat" soruyor)  
**AI Search Potansiyeli:** ⭐⭐⭐⭐ — Niş ürün, AI'da rakip içerik zayıf. Yüksek alıntı fırsatı.

#### Eksik Schema

| Schema Tipi | Eksiklik | Etki |
|---|---|---|
| `Product` | Muhtemelen eksik/yetersiz | Price rich result, Google Shopping kaybı |
| `Product > offers` | `price` alanı eksik/hatalı | Alışveriş sonuçlarında görünmeme |
| `Product > aggregateRating` | Yok | Yıldız rich result kaybı |
| `HowTo` | Yok | "Nasıl kurulur" rich result fırsatı kaçıyor |
| `FAQPage` | Yok | "Gerçekten işe yarıyor mu?" PAA fırsatı kaybı |
| `Product > isRelatedTo` | `isAccessoryFor` bağlantısı yok | Su arıtma sistemiyle ilişki kurulamamış |

#### Eksik Entity

- **Aksesuar entity ilişkisi:** `isAccessoryFor` → `su-aritma-cihazlari` entity'sine bağlantı yok. Kullanıcı "Buzsu cihazıyla uyumlu mu?" sorusunu entity graph'tan cevaplayamıyor.
- **Teknoloji entity'si:** `MagneticScalePreventer` veya benzeri technology entity tanımlanmamış. knowledge-graph/technologies/ klasörü mevcut ama bu ürün için doldurulmamış.
- **"Kimyasalsız" / "ekolojik" özellik entity'si:** `additionalProperty` ile belirtilmemiş. E-E-A-T ve kullanıcı güveni için kritik.

#### İçerik Boşlukları

- **Skeptical user intent karşılanmıyor:** "Manyetik kireç önleyici işe yarıyor mu?" — En kritik sorgu. Bilimsel mekanizma açıklaması (manyetik alan → kristal yapı değişimi) içerikte yoksa kullanıcı güveni düşük.
- **Su arıtma cihazıyla ilişki netleştirilmemiş:** "Bunu alırsam su arıtma cihazı almama gerek yok mu?" — Net yanıt verilmeli. (Tamamlayıcı ürün, alternatif değil.)
- **Kireçli şehir bağlamı:** Ankara (TDS: 400+), Konya, Bursa gibi kireçli şehirlere özel bağlam yok. Bu kullanıcı segmenti en yüksek potansiyel.
- **Kurulum içeriği:** Fotoğraflı veya adım adım metin kurulum kılavuzu HowTo schema ile birleştiğinde rich result fırsatı.
- **Teknik spesifikasyon:** Boyut, uyumlu boru çapı, garanti bilgisi (doğrulanabilir olduğu ölçüde) eksikse karar gecikmesi.

#### AI Search Görünürlük Fırsatları (GEO/AEO)

- Hedef sorgular:
  - "manyetik kireç önleyici nedir" (yüksek AI alıntı potansiyeli — niş, rakip az)
  - "manyetik kireç önleyici işe yarıyor mu" (skeptical, AI cevap isteği yüksek)
  - "su borularında kireç nasıl önlenir kimyasalsız"
  - "kireçli su şehirleri Türkiye" + aksesuar intent
- **GEO:** Şehir bazlı su sertlik verisi (Ankara, İstanbul Anadolu, Konya) bu sayfada kullanılırsa Perplexity'nin yerel sorgularda alıntılama şansı artar.

---

## 2. Ortak Eksiklikler (Tüm Sayfalarda)

| Eksiklik | Kapsam | Önem |
|---|---|---|
| `BreadcrumbList` schema | 4/4 sayfa | Yüksek — navigasyon rich result |
| `FAQPage` schema | 4/4 sayfa | Kritik — AI Overview + PAA |
| `Organization` sameAs tam seti | Site geneli | Kritik — Knowledge Graph |
| `llms.txt` dosyası | Site kökü | Yüksek — AI crawler yönlendirme |
| robots.txt AI bot direktifleri | Site geneli | Orta — GPTBot, ClaudeBot, PerplexityBot |
| Atomic answer paragrafları | 4/4 sayfa | Kritik — AI alıntı için ön koşul |
| Türkiye / şehir bazlı GEO içeriği | 4/4 sayfa | Yüksek — yerel AI sorgu fırsatı |
| İç bağlantı: Suvesu → Buzsu | Site geneli | Orta — authority transfer |

---

## 3. Öncelikli Görev Listesi

### P1 — Bu Ay (Temmuz 2026)

#### GÖREV-01: Article + FAQPage schema taslağı (`/en-iyi-su-aritma-cihazi-hangisi/`)
- **Sorumlu:** schema-automation skill → developer
- **Çıktı:** `/drafts/schema/article-en-iyi-su-aritma.jsonld`
- **İçerik:** `Article` (headline, author, datePublished, dateModified, inLanguage: "tr"), `FAQPage` (min 5 S&C)
- **Doğrulama:** Google Rich Results Test → hata 0
- **Onay sınıfı:** MINOR

#### GÖREV-02: Atomic answer paragrafları (`/en-iyi-su-aritma-cihazi-hangisi/`)
- **Sorumlu:** content-agent
- **Çıktı:** `/drafts/content/ai-snippets-en-iyi-su-aritma.md`
- **İçerik:** 5 hedef sorgu için 40-60 kelimelik, bağlamdan bağımsız paragraflar
- **Hedef sorgular:**
  1. "En iyi su arıtma cihazı hangisi?"
  2. "Tezgah altı mı pompasız mı?"
  3. "Su arıtma cihazı seçerken nelere dikkat edilir?"
  4. "Buzsu CODE cihaz özellikleri neler?"
  5. "UV filtreli cihaz nedir?"
- **Onay sınıfı:** SAFE PATCH (taslak)

#### GÖREV-03: ItemList schema taslağı (`/su-aritma-cihazlari/`)
- **Sorumlu:** schema-automation skill → developer
- **Çıktı:** `/drafts/schema/itemlist-su-aritma-cihazlari.jsonld`
- **İçerik:** `ItemList` — doğrulanmış ürün URL'leri ile (uv-filtreli, code, atiksiz)
- **Doğrulama:** Google Rich Results Test
- **Onay sınıfı:** MINOR

#### GÖREV-04: Site geneli Organization + WebSite schema (ana sayfa)
- **Sorumlu:** schema-automation skill → developer
- **Çıktı:** `/drafts/schema/organization-buzsu.jsonld`
- **İçerik:**
  ```json
  {
    "@type": "Organization",
    "name": "Buzsu",
    "url": "https://www.buzsu.com.tr",
    "logo": "<BUZSU_LOGO_URL>",
    "sameAs": [
      "<BUZSU_GOOGLE_BUSINESS_URL>",
      "<BUZSU_INSTAGRAM_URL>",
      "<BUZSU_LINKEDIN_URL>"
    ],
    "contactPoint": { "@type": "ContactPoint", "contactType": "customer service" },
    "areaServed": { "@type": "Country", "name": "Turkey" }
  }
  ```
- **Not:** `sameAs` URL'leri kullanıcı tarafından sağlanmalı; placeholder ile bırak.
- **Onay sınıfı:** MINOR

---

### P2 — Temmuz 2026 Sonu

#### GÖREV-05: ItemList + FAQPage schema (`/ev-tipi-su-aritma-cihazlari/`)
- **Çıktı:** `/drafts/schema/itemlist-ev-tipi.jsonld`, `/drafts/schema/faq-ev-tipi.jsonld`
- **FAQ soruları (önerilen):**
  - "Ev tipi su arıtma cihazı işyeri tipinden ne farkı var?"
  - "Günde kaç litre su filtreler?"
  - "Montaj zor mu, teknik servis gerekli mi?"
- **Onay sınıfı:** MINOR

#### GÖREV-06: Şehir bazlı su sertliği içerik bölümü (`/ev-tipi-su-aritma-cihazlari/`)
- **Çıktı:** `/drafts/content/ev-tipi-sehir-bazli-oneri.md`
- **İçerik:** Ankara / İstanbul / İzmir / Konya için su sertlik seviyesi ve ürün önerisi
- **Kısıtlama:** Spesifikasyon uydurmak yasak; doğrulanabilir bilgi kullan
- **Onay sınıfı:** SAFE PATCH (taslak)

#### GÖREV-07: Product schema (`/manyetik-kirec-onleyici/`)
- **Çıktı:** `/drafts/schema/product-manyetik-kirec-onleyici.jsonld`
- **İçerik:** `Product` (name, description, brand, offers: price → `PRICE_TRY` placeholder, `isAccessoryFor` → su arıtma cihazı)
- **Onay sınıfı:** MINOR

#### GÖREV-08: HowTo + FAQPage schema (`/manyetik-kirec-onleyici/`)
- **Çıktı:** `/drafts/schema/howto-manyetik-kurulum.jsonld`, `/drafts/schema/faq-manyetik.jsonld`
- **FAQ soruları (önerilen):**
  - "Manyetik kireç önleyici gerçekten işe yarıyor mu?"
  - "Su arıtma cihazı yerine bu yeterli mi?"
  - "Bakım gerektirir mi?"
  - "Hangi boru çaplarına uyumlu?"
- **Onay sınıfı:** MINOR

#### GÖREV-09: Skeptical intent içeriği (`/manyetik-kirec-onleyici/`)
- **Çıktı:** `/drafts/content/manyetik-mekanizma-aciklamasi.md`
- **İçerik:** Manyetik alan → kalsiyum karbonat kristal yapısı değişimi mekanizması (doğrulanabilir bilim)
- **Onay sınıfı:** SAFE PATCH (taslak)

---

### P3 — Ağustos 2026

#### GÖREV-10: llms.txt taslağı (site kökü)
- **Çıktı:** `/drafts/llms-txt-v1.md`
- **İçerik:** Site amacı, izin verilen sayfa türleri, öncelikli URL listesi (doğrulanmış path'ler)
- **Referans:** skills/llms/implementation.md
- **Onay sınıfı:** MINOR (canlı siteye developer alır)

#### GÖREV-11: robots.txt AI direktif taslağı
- **Çıktı:** `/drafts/robots-txt-ai-direktifler.md`
- **İçerik:** GPTBot Allow, ClaudeBot Allow, PerplexityBot Allow, Google-Extended Allow
- **Onay sınıfı:** MINOR

#### GÖREV-12: BreadcrumbList schema — tüm 4 sayfa
- **Çıktı:** `/drafts/schema/breadcrumb-[slug].jsonld` (4 dosya)
- **Onay sınıfı:** MINOR

#### GÖREV-13: knowledge-graph/technologies/ — manyetik teknoloji entity
- **Çıktı:** `knowledge-graph/technologies/manyetik-kirec-onleyici.md`
- **İçerik:** Entity tipi, schema.org karşılığı, `isAccessoryFor` ilişkisi
- **Onay sınıfı:** SAFE PATCH

#### GÖREV-14: knowledge-graph/entities/ — 4 sayfa entity dosyaları
- **Çıktı:** `knowledge-graph/entities/su-aritma-kategorisi.md`, `entity-ev-tipi-kategori.md`, `entity-manyetik-onleyici.md`, `entity-rehber-makalesi.md`
- **Onay sınıfı:** SAFE PATCH

---

## 4. CodeIgniter 4 — Dosya Bazlı Uygulama Önerileri

> Bu öneriler developer için hazırlanmıştır. Hiçbiri Claude Code tarafından doğrudan uygulanmaz;
> onay sonrası developer tarafından ilgili CI4 view dosyalarına eklenir.

### 4.1 Site Geneli (Organization + WebSite)

```
app/Views/layouts/main.php  (veya base.php / header.php)
```

`<head>` içine, `</head>` kapanmadan önce:
```php
<?php if ($this->renderSection('jsonld')): ?>
  <?= $this->renderSection('jsonld') ?>
<?php else: ?>
  <?= view('partials/schema/organization') ?>
<?php endif; ?>
```

`app/Views/partials/schema/organization.php` → `organization-buzsu.jsonld` içeriğini PHP değişkenleriyle besle.

---

### 4.2 Kategori Sayfaları (ItemList)

```
app/Views/categories/list.php
app/Views/categories/category_view.php  (adı farklı olabilir)
```

Yaklaşım:
```php
<?= $this->section('jsonld') ?>
<script type="application/ld+json">
<?= json_encode($itemListSchema, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) ?>
</script>
<?= $this->endSection() ?>
```

`$itemListSchema` controller'dan verilmeli; ürün listesi controller'da kurulur, view'a paslanır.

Etkilenen sayfalar:
- `/su-aritma-cihazlari/` → `ItemList` (ürünler)
- `/ev-tipi-su-aritma-cihazlari/` → `ItemList` (ev tipi ürünler)

---

### 4.3 Rehber / Blog Sayfası (Article + FAQPage)

```
app/Views/blog/post.php
app/Views/pages/guide.php  (adı farklı olabilir)
```

Etkilenen sayfa: `/en-iyi-su-aritma-cihazi-hangisi/`

Eklenecek schema blokları:
1. `Article` — `headline`, `author`, `datePublished`, `dateModified`, `inLanguage: "tr"`, `publisher: {Organization Buzsu}`
2. `FAQPage` — `mainEntity: [Question, ...]`
3. `BreadcrumbList` — Ana Sayfa → Blog → [Makale başlığı]

Önerilen partial yapısı:
```
app/Views/partials/schema/
  ├── organization.php
  ├── article.php          ← yeni
  ├── faq.php              ← yeni
  ├── breadcrumb.php       ← yeni
  ├── product.php          ← yeni
  └── itemlist.php         ← yeni
```

---

### 4.4 Ürün Detay Sayfası (Product + HowTo + FAQPage)

```
app/Views/products/detail.php
app/Views/pages/manyetik.php  (özel sayfa olabilir)
```

Etkilenen sayfa: `/manyetik-kirec-onleyici/`

```php
// Controller'da schema datası oluştur:
$schema = [
  '@context' => 'https://schema.org',
  '@type' => 'Product',
  'name' => 'Buzsu Manyetik Kireç Önleyici',
  'brand' => ['@type' => 'Brand', 'name' => 'Buzsu'],
  'description' => $product->description,
  'offers' => [
    '@type' => 'Offer',
    'priceCurrency' => 'TRY',
    'price' => $product->price,  // gerçek fiyat — controller'dan
    'availability' => 'https://schema.org/InStock'
  ],
  'isAccessoryFor' => [
    '@type' => 'Product',
    'name' => 'Su Arıtma Cihazı',
    'url' => 'https://www.buzsu.com.tr/su-aritma-cihazlari/'
  ]
];
```

**Önemli:** `offers.price` değeri controller'da gerçek ürün datasından gelmeli; view'a hardcode edilmemeli.

---

### 4.5 BreadcrumbList — Tüm Sayfalar (Merkezi Partial)

```
app/Views/partials/schema/breadcrumb.php
```

Bu partial tüm view'lardan çağrılabilir, `$breadcrumbs` array'i controller'dan paslanır:
```php
$breadcrumbs = [
  ['name' => 'Ana Sayfa', 'url' => 'https://www.buzsu.com.tr/'],
  ['name' => 'Su Arıtma Cihazları', 'url' => 'https://www.buzsu.com.tr/su-aritma-cihazlari/'],
  ['name' => $category->name, 'url' => current_url()],
];
```

---

## 5. Doğrulama Adımları (Her Schema Taslağı İçin)

```
1. JSON sözdizimi:   python3 -m json.tool [dosya].jsonld
2. Schema geçerliliği: validator.schema.org
3. Rich result testi: richresults.google.com
4. GSC baseline:     Zenginleştirilmiş Sonuçlar → hata sayısı kaydet
```

---

## 6. Sonraki Adımlar (İnsan Onayı Gerekli)

| Görev | Onay Sınıfı | Beklenen Kişi |
|---|---|---|
| GÖREV-01 schema taslağı canlıya alma | MINOR | Developer + site sahibi |
| GÖREV-03 ItemList canlıya alma | MINOR | Developer + site sahibi |
| GÖREV-04 Organization canlıya alma | MINOR | Developer + site sahibi |
| llms.txt yayını | MINOR | Developer + site sahibi |
| robots.txt güncelleme | MINOR | Developer + site sahibi |

Hiçbir şema taslağı onay olmadan canlıya alınmaz.  
Hiçbir içerik değişikliği `/drafts` aşamasını atlamaz.  
Bkz: CLAUDE.md — Değişiklik Sınıflandırması.

---

## Referanslar

- `skills/seo/checklist.md` — SEO kontrol listesi
- `skills/schema-automation/implementation.md` — Schema uygulama adımları
- `skills/ai-search/implementation.md` — AI Search optimizasyon adımları
- `playbooks/ai-search-playbook.md` — AI Search uçtan uca süreç
- `playbooks/entity-seo-playbook.md` — Entity SEO adımları
- `knowledge-graph/entity-types.md` — Entity tipleri ve schema.org karşılıkları
- `templates/jsonld-template.md` — JSON-LD şablon
- `config/.env.example` — Yapılandırma değişkenleri
