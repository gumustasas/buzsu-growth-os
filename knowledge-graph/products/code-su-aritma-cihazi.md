---
entity_type: Product
schema_type: schema.org/Product
name_tr: 5 Aşamalı RO Su Arıtma Sistemi
name_en: 5-Stage Reverse Osmosis Water Purification System
aliases: [5 Aşamalı RO, Buzsu RO5, Tezgah Altı Su Arıtma]
sku: BZS-RO5-001
airtable_record: rec6N4cIPgDjWFPHb
price_try: 13749
related_entities:
  - brands/buzsu.md
  - technologies/ters-osmoz.md
  - components/ters-osmoz-membran.md
  - contaminants/kirec.md
buzsu_url: https://www.buzsu.com.tr/code-su-aritma-cihazi/
status: seed
---

# 5 Aşamalı RO Su Arıtma Sistemi

## Tanım

Ters osmoz (RO) teknolojisiyle çalışan, tezgah altına monte edilen 5 filtre aşamalı su arıtma sistemidir.

## Teknik Özellikler

| Özellik | Değer |
|---------|-------|
| Filtre aşaması | 5 |
| Teknoloji | Ters Osmoz (Reverse Osmosis) |
| Kurulum | Tezgah altı |
| Kurulum dahil mi? | Evet (Buzsu tarafından) |
| Fiyat | 13.749 TRY |
| Kategori | Su Arıtma Cihazı |
| Durum | Aktif / Stokta |

## Arındırdığı Kirleticiler (Tahmini — Doğrulanmalı)

- Kireç (kalsiyum karbonat)
- Klor ve klorin türevleri
- Ağır metaller (kurşun, arsenik — membrana bağlı)
- Bakteri ve virüsler (membran filtrasyonu)

## Schema.org JSON-LD (Taslak)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "5 Aşamalı RO Su Arıtma Sistemi",
  "description": "5 aşamalı ters osmoz sistemi. Ev ve ofis için tezgah altı kurulum, ücretsiz montaj dahil.",
  "sku": "BZS-RO5-001",
  "brand": { "@type": "Brand", "name": "Buzsu" },
  "category": "Su Arıtma Cihazı",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "TRY",
    "price": "13749",
    "availability": "https://schema.org/InStock",
    "url": "https://www.buzsu.com.tr/code-su-aritma-cihazi/"
  }
}
```

## Notlar

- Airtable kaydı: `rec6N4cIPgDjWFPHb`
- Image URL: DOLDURULACAK (Airtable blocker)
- En çok sorulan ürün (Airtable notes: "Bestseller. En sık sorulan ürün.")
