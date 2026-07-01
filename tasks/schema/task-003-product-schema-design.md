# TASK-003 — Product Schema Mimarisi Tasarımı

**Tarih:** 2026-06-30  
**Faz:** Faz 4 — Buzsu SEO/GEO/CRO İlk Canlı Uygulama  
**Durum:** Başlatıldı  
**Öncelik:** P1  
**Atanan agent:** schema-agent  
**Bağımlı görev:** TASK-001 (SERP + HTML analizi), TASK-002 (HTML doğrulama)  
**Çıktı:** `outputs/reports/product-schema-design-report.md`

---

## Amaç

`https://www.buzsu.com.tr/su-aritma-cihazlari/` için Product schema mimarisini tasarlamak.  
Mevcut schema altyapısıyla çakışmadan, Google Rich Results Test'i geçecek, Airtable'dan beslenebilen bir yapı önermek.  
**Canlı siteye kod yazılmaz. Yalnızca tasarım ve entegrasyon planı üretilir.**

---

## Girdiler

| Girdi | Kaynak | Durum |
|-------|--------|-------|
| Mevcut schema envanteri | TASK-002 HTML doğrulaması | ✅ Tamamlandı |
| Airtable Products tablosu | `tbldogYQwAQr24UWE` — 5 kayıt | ✅ Çekildi |
| Hedef URL HTML kaynağı | İnsan tarafından paylaşıldı | ✅ Tamamlandı |
| SERP + rich result durumu | TASK-001 | ✅ Tamamlandı |

---

## Kapsam

1. [x] Mevcut schema envanterini özetle
2. [x] CollectionPage + ItemList + Product mimarisini öner
3. [x] Her ürün için gerekli alanları listele
4. [x] Airtable'dan hangi bilgilerin alınabileceğini belirt
5. [x] JSON-LD örnekleri üret
6. [x] CodeIgniter 3.7.1 entegrasyon planı hazırla
7. [x] Mevcut Organization, FAQPage, BreadcrumbList ile çakışma kontrolü
8. [x] Risk analizi
9. [x] PR öncesi doğrulama listesi

---

## Kısıtlar

- Canlı siteye otomatik değişiklik yapılmaz.
- Tüm JSON-LD örnekleri taslak (draft) — insan incelemesi ve onayı gerekli.
- SKU, görsel URL ve tam ürün açıklamaları Airtable'da eksik → ürün sayfası HTML'leri alınarak tamamlanmalı.
- Product schema **ürün sayfalarına** eklenir; kategori sayfasına eklenmez.

---

## Çıktı Dosyası

`outputs/reports/product-schema-design-report.md`

---

## Sonraki Adım (TASK-004 önerisi)

- Airtable Products tablosuna `SKU`, `Image URL`, `Description` alanları eklenmesi
- Her ürün sayfasının HTML kaynağının alınması (TASK-002 kapsamında uzatılabilir)
- CI3.7.1 application/views/ entegrasyon branch'i açılması

---

## Görev Sonu Raporu

```json
{
  "status": "completed",
  "agent": "schema-agent",
  "task": "TASK-003 — Product Schema Mimarisi Tasarımı",
  "date": "2026-06-30",
  "outputs": [
    "outputs/reports/product-schema-design-report.md"
  ],
  "requires_review": true,
  "open_items": [
    "Airtable'a SKU, Image URL, Description alanları eklenmeli",
    "Ürün sayfaları HTML kaynakları alınmalı (TASK-004 önerisi)",
    "CI3.7.1 entegrasyon branch açılacak"
  ]
}
```
