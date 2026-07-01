# TASK-004 — Airtable Product Schema Alanları Tanımı

**Tarih:** 2026-06-30  
**Faz:** Faz 4 — Buzsu SEO/GEO/CRO İlk Canlı Uygulama  
**Durum:** Tamamlandı  
**Öncelik:** P1  
**Atanan agent:** schema-agent  
**Bağımlı görev:** TASK-003 (Product Schema Mimarisi)  
**Çıktı:** `outputs/reports/airtable-product-schema-fields-report.md`

---

## Amaç

Airtable Products tablosunda (`tbldogYQwAQr24UWE`) Product Schema için eksik olan alanları tanımlamak ve doldurma planı hazırlamak.  
Bu alanlar doldurulmadan Product JSON-LD PR'ı açılamaz.

---

## Girdiler

| Girdi | Kaynak | Durum |
|-------|--------|-------|
| Mevcut Airtable Products tablosu (5 kayıt) | TASK-003 Airtable sorgusu | ✅ Çekildi |
| Mevcut alan envanteri | TASK-003 raporu | ✅ Mevcut |
| Product JSON-LD şablonu | TASK-003 Section 5 | ✅ Hazır |

---

## Kapsam

1. [x] Mevcut 5 ürün için eksik alan tablosu oluştur
2. [x] Her ürün için SKU formatı öner
3. [x] Her ürün için Schema Description taslağı yaz (schema.org uyumlu)
4. [x] Image URL için placeholder belirle
5. [x] Airtable alan tipi önerileri yap
6. [x] Product Schema PR blocker notunu ekle

---

## Kısıtlar

- Canlı siteye otomatik değişiklik yapılmaz.
- Airtable'a yazma yapılmaz — yalnızca alan tanımı ve doldurma planı üretilir.
- Image URL'leri mevcut siteden manuel doğrulama gerektirir.
- Schema Description'lar taslak — insan onayı sonrası Airtable'a girilir.

---

## Çıktı Dosyası

`outputs/reports/airtable-product-schema-fields-report.md`

---

## Sonraki Adım (TASK-005 önerisi)

- Onaylanan SKU + Image URL + Schema Description alanlarının Airtable'a girilmesi
- CI3.7.1 application/views/ entegrasyon branch'i açılması
- Kategori sayfasındaki duplicate BreadcrumbList kaldırma PR'ı

---

## Görev Sonu Raporu

```json
{
  "status": "completed",
  "agent": "schema-agent",
  "task": "TASK-004 — Airtable Product Schema Alanları Tanımı",
  "date": "2026-06-30",
  "outputs": [
    "outputs/reports/airtable-product-schema-fields-report.md"
  ],
  "requires_review": true,
  "open_items": [
    "Image URL'leri ürün sayfalarından manuel alınmalı",
    "Schema Description'lar insan tarafından onaylanmalı",
    "Onaylı alanlar Airtable'a insan tarafından girilmeli",
    "CI3.7.1 entegrasyon branch açılacak"
  ]
}
```
