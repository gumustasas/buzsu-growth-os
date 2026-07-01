---
entity_type: Product
schema_type: schema.org/Product
name_tr: Yıllık Filtre Seti (5'li)
name_en: Annual Filter Set (5-Piece)
aliases: [Yıllık Filtre Seti, Filtre Seti, 5'li Filtre Seti]
sku: BZS-FLT-005
airtable_record: reckhPWCISkmuueBS
price_try: 3390
related_entities:
  - brands/buzsu.md
  - products/code-su-aritma-cihazi.md
  - components/ters-osmoz-membran.md
  - components/sediman-filtre.md
  - components/aktif-karbon-filtre.md
buzsu_url: https://www.buzsu.com.tr/code-su-aritma-cihazi-5-li-filtre-seti-made-in-korea/
status: seed
---

# Yıllık Filtre Seti (5'li)

## Tanım

5 Aşamalı RO su arıtma sistemi için yıllık bakım amaçlı, Kore yapımı orijinal 5'li filtre setidir.

## Teknik Özellikler

| Özellik | Değer |
|---------|-------|
| Parça sayısı | 5 |
| Uyumlu sistem | 5 Aşamalı RO Su Arıtma Sistemi |
| Menşei | Kore (üretici firma adı doğrulanmalı) |
| Değişim sıklığı (önerilen) | 6–12 ay |
| Fiyat | 3.390 TRY |
| Kategori | Filtre |

## Kullanım Amacı

Mevcut Buzsu müşterilerinin yıllık bakım/tekrar satın alma ihtiyacını karşılar; tekrarlayan gelir kalemi olarak notlanmıştır.

## Schema.org JSON-LD (Taslak)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Yıllık Filtre Seti 5'li — Made in Korea",
  "description": "Buzsu Code su arıtma cihazı için orijinal Kore yapımı 5'li yıllık filtre seti. 6–12 ayda bir değişim önerilir.",
  "sku": "BZS-FLT-005",
  "brand": { "@type": "Brand", "name": "Buzsu" },
  "category": "Filtre",
  "isAccessoryOrSparePartFor": { "@type": "Product", "name": "5 Aşamalı RO Su Arıtma Sistemi" },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "TRY",
    "price": "3390",
    "availability": "https://schema.org/InStock",
    "url": "https://www.buzsu.com.tr/code-su-aritma-cihazi-5-li-filtre-seti-made-in-korea/",
    "seller": { "@id": "https://www.buzsu.com.tr/#organization" }
  }
}
```

## AI Özeti (AI Summary)

5 Aşamalı RO Su Arıtma Sistemi için üretilmiş, Kore menşeli orijinal 5 parçalı yıllık bakım filtre setidir. Mevcut müşterilerin periyodik filtre değişimi ihtiyacını karşılar; fiyatı 3.390 TRY, SKU'su BZS-FLT-005 (taslak).

## Notlar

- Airtable kaydı: `reckhPWCISkmuueBS` (`lib/airtable/client.ts:57-64`)
- SKU (`BZS-FLT-005`) taslak — Airtable'da henüz resmi onaylanmadı
- Setin içerdiği 5 parçanın tam listesi (sediman/karbon/membran dağılımı) ürün sayfasından doğrulanmalı — burada genel filtre tipi entity'lerine (`components/sediman-filtre.md`, `components/aktif-karbon-filtre.md`) yalnızca olası ilişki olarak bağlandı, kesin içerik iddiası değildir.
- **Bulgu:** `knowledge-graph/components/ters-osmoz-membran.md` dosyasındaki mevcut link hatalı görünüyor — `products/naturalsnet-11-asama.md`ya işaret ediyor, ancak o dosya aslında "Atıksız Su Arıtma Cihazı"dır, Filtre Seti değil. Bu Sprint kapsamı dışında, ayrı bir düzeltme (SAFE PATCH) gerektirir.
