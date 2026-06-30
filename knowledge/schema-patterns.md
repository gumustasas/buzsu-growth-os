# BUZSU Schema Kalıpları

## Genel Bakış
Bu belge Buzsu.com.tr ve Suvesu.com için en sık kullanılan
Schema.org kalıplarını ve zorunlu alanlarını tanımlar.
templates/jsonld-template.md ile birlikte kullanılır.

## Kalıplar

### 1. Product (Ürün Sayfası)
**Zorunlu:** name, image, offers (price, priceCurrency, availability)
**Önerilen:** description, brand, sku, aggregateRating, review

### 2. FAQPage (SSS Sayfası)
**Yapı:** mainEntity → Question → acceptedAnswer
Her soru-cevap çifti bağımsız, 150 kelime altı olmalı.

### 3. HowTo (Kurulum/Montaj)
**Zorunlu:** name, step (HowToStep: text)
**Önerilen:** totalTime, tool, supply, image

### 4. BreadcrumbList (Navigasyon)
Her sayfa için URL hiyerarşisini işaretler.
ListItem → position, name, item

### 5. LocalBusiness / Organization
name, address (PostalAddress), telephone, url, sameAs
BUZSU marka sayfası ve iletişim sayfası için.

### 6. Article / BlogPosting (Suvesu içerikleri)
headline, author, datePublished, dateModified, image

## Kalıp Seçim Rehberi

| Sayfa Türü | Kullanılacak Schema |
|---|---|
| Ürün detay | Product |
| Kategori | ItemList |
| SSS | FAQPage |
| Blog yazısı | Article |
| Kurulum kılavuzu | HowTo |
| Ana sayfa | Organization + WebSite |
| İletişim | LocalBusiness |

## Doğrulama
- Google Rich Results Test: richresults.google.com
- schema.org/validator: validator.schema.org

## İlgili Dosyalar
- templates/jsonld-template.md — şema şablonları
- skills/schema-automation/ — üretim ve bakım süreci
