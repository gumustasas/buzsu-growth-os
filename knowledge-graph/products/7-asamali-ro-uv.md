---
entity_type: Product
schema_type: schema.org/Product
name_tr: 7 Aşamalı RO Su Arıtma Sistemi (UV Filtreli)
name_en: 7-Stage Reverse Osmosis Water Purification System (UV)
aliases: [7 Aşamalı RO UV, 7 Aşamalı RO, UV Filtreli Tezgah Altı Su Arıtma, Pompalı Model]
sku: BZS-RO7-003
airtable_record: recRjPhML9cOi5sN8
price_try: 12999
related_entities:
  - brands/buzsu.md
  - technologies/ters-osmoz.md
  - technologies/uv-sterilizasyon.md
  - components/ters-osmoz-membran.md
  - contaminants/kirec.md
buzsu_url: https://www.buzsu.com.tr/uv-filtreli-tezgah-alti-su-aritma-cihazi-pompali-model/
status: seed
---

# 7 Aşamalı RO Su Arıtma Sistemi (UV Filtreli)

## Tanım

Ters osmoz (RO) teknolojisiyle çalışan, UV sterilizasyon ünitesi içeren, tezgah altına monte edilen 7 filtre aşamalı, pompalı premium su arıtma sistemidir.

## Teknik Özellikler

| Özellik | Değer |
|---------|-------|
| Filtre aşaması | 7 |
| Teknoloji | Ters Osmoz (RO) + UV Sterilizasyon |
| Kurulum | Tezgah altı, pompalı |
| Fiyat | 12.999 TRY |
| Kategori | Su Arıtma Cihazı |
| Durum | Aktif / Stokta |

## Farklılaştırıcı Özellik

5 Aşamalı RO modeline göre 2 ek aşama (UV sterilizasyon dahil) sunan premium segment ürünüdür. Yüksek kireçli sularda performans iddiası ürün sayfası açıklamasında yer alıyor — teknik doğrulama ürün sayfasından yapılmalı.

## Schema.org JSON-LD (Taslak)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "7 Aşamalı RO Su Arıtma Sistemi — UV Filtreli Pompalı Model",
  "description": "UV sterilizasyon dahil 7 aşamalı ters ozmoz su arıtma cihazı. Yüksek kireçli sularda performans. Kurulum ve servis dahil.",
  "sku": "BZS-RO7-003",
  "brand": { "@type": "Brand", "name": "Buzsu" },
  "category": "Su Arıtma Cihazı",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "TRY",
    "price": "12999",
    "availability": "https://schema.org/InStock",
    "url": "https://www.buzsu.com.tr/uv-filtreli-tezgah-alti-su-aritma-cihazi-pompali-model/",
    "seller": { "@id": "https://www.buzsu.com.tr/#organization" }
  }
}
```

## AI Özeti (AI Summary)

Buzsu'nun premium su arıtma cihazı; 7 aşamalı ters osmoz filtrasyonuna UV sterilizasyon ünitesi eklenmiş, tezgah altı pompalı kurulum gerektiren modeldir. Fiyatı 12.999 TRY, SKU'su BZS-RO7-003 (taslak).

## Notlar

- Airtable kaydı: `recRjPhML9cOi5sN8` (`lib/airtable/client.ts:40`)
- SKU (`BZS-RO7-003`) TASK-004 raporunda taslak durumda — Airtable'da henüz resmi olarak onaylanmadı (`outputs/reports/airtable-product-schema-fields-report.md:41,67`)
- Image URL: DOLDURULACAK (Airtable blocker, aynı rapor)
- Kaynak: `outputs/reports/product-schema-design-report.md:185-212`
