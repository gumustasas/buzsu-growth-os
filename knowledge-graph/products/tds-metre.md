---
entity_type: Product
schema_type: schema.org/Product
name_tr: Dijital TDS Metre
name_en: Digital TDS Meter
aliases: [TDS Metre, Dijital TDS Ölçer]
sku: BZS-TDS-004
airtable_record: recjwetUxnjUyYUZc
price_try: 450
related_entities:
  - brands/buzsu.md
  - problems/yuksek-tds-sorunu.md
  - faq/su-aritma-cihazi-nasil-secilir.md
buzsu_url: https://www.buzsu.com.tr/tds-metre/
status: seed
---

# Dijital TDS Metre

## Tanım

Musluk veya arıtılmış suyun toplam çözünmüş katı madde (TDS) değerini ölçen, pille çalışan taşınabilir ölçüm cihazıdır.

## Teknik Özellikler

| Özellik | Değer |
|---------|-------|
| Ölçüm birimi | mg/L (ppm) |
| Güç kaynağı | Pil |
| Taşınabilirlik | Evet |
| Fiyat | 450 TRY |
| Kategori | TDS Metre |
| Durum | Aktif / Stokta |

## Kullanım Amacı

Su arıtma cihazı seçiminden önce şebeke suyu TDS değerini ölçmek ve arıtma sonrası performansı doğrulamak için kullanılır. Düşük fiyatı nedeniyle giriş seviyesi / bilgilendirici ürün olarak konumlanır.

## Schema.org JSON-LD (Taslak)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Dijital TDS Metre",
  "description": "Musluk veya arıtma suyunun saflığını ölçen dijital TDS metre. Pilli, taşınabilir.",
  "sku": "BZS-TDS-004",
  "brand": { "@type": "Brand", "name": "Buzsu" },
  "category": "TDS Metre",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "TRY",
    "price": "450",
    "availability": "https://schema.org/InStock",
    "url": "https://www.buzsu.com.tr/tds-metre/",
    "seller": { "@id": "https://www.buzsu.com.tr/#organization" }
  }
}
```

## AI Özeti (AI Summary)

Buzsu'nun giriş seviyesi ürünü; şebeke veya arıtılmış suyun TDS (toplam çözünmüş katı madde) değerini ölçen, pille çalışan taşınabilir dijital cihazdır. Fiyatı 450 TRY, SKU'su BZS-TDS-004 (taslak).

## Notlar

- Airtable kaydı: `recjwetUxnjUyYUZc` (`lib/airtable/client.ts:49-52`)
- SKU (`BZS-TDS-004`) taslak — Airtable'da henüz resmi onaylanmadı
- Image URL: DOLDURULACAK
- Lead scoring bağlamında düşük öncelikli ama yüksek hacimli "giriş ürünü" olarak notlanmış (`lead-scoring.md:33`)
