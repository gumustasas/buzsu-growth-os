# TASK-005 — CodeIgniter 3.7.1 Product Schema Entegrasyon Planı

**Tarih:** 2026-06-30  
**Faz:** Faz 4 — Buzsu SEO/GEO/CRO İlk Canlı Uygulama  
**Durum:** Tamamlandı (plan + taslak kod üretildi)  
**Öncelik:** P1  
**Atanan agent:** schema-agent  
**Bağımlı görev:** TASK-003 (schema mimarisi), TASK-004 (Airtable alanları)  
**Çıktı:** `outputs/reports/ci3-product-schema-integration-plan.md`

---

## Amaç

Buzsu.com.tr CodeIgniter 3.7.1 altyapısına Product Schema JSON-LD'yi entegre edecek feature branch planını hazırlamak.  
**Canlı siteye otomatik deploy yapılmaz.** Bu görev yalnızca plan, taslak dosyalar ve PR branch stratejisi üretir.

---

## Ön Koşullar (Blocker Durumu)

| Koşul | Durum |
|-------|-------|
| Airtable'da SKU alanı dolu | ❌ Bekliyor |
| Airtable'da Image URL alanı dolu | ❌ Bekliyor |
| Airtable'da Schema Description alanı dolu | ❌ Bekliyor |
| TASK-003 JSON-LD şablonları insan onayı | ❌ Bekliyor |
| Bu plan ve taslak kod insan onayı | ❌ Bekliyor |

> Branch açılabilir, PR **draft** olarak işaretlenir. Merge için tüm blocker'lar çözülmeli.

---

## Kapsam

1. [x] Etkilenecek CI3.7.1 dosyaları belirlendi
2. [x] PHP product_schema() helper taslağı üretildi
3. [x] View entegrasyon noktaları belirlendi
4. [x] Airtable → CI3.7.1 veri akışı planlandı
5. [x] Branch ve PR stratejisi hazırlandı
6. [x] Test ve doğrulama listesi hazırlandı
7. [x] Rollback planı eklendi

---

## Kısıtlar

- Canlı siteye otomatik değişiklik yapılmaz.
- Tüm kod taslak (draft) — insan code review ve onayı gerekli.
- Airtable'dan okuma (yazma değil) CI3.7.1 backend tarafında yapılır.
- PR `draft` olarak açılır; Airtable alanları dolmadan `ready for review` işaretlenmez.

---

## Çıktı Dosyası

`outputs/reports/ci3-product-schema-integration-plan.md`

---

## Sonraki Adım (TASK-006 önerisi)

- Airtable alanları dolduktan sonra `feat/product-schema-ci3` branch'inin açılması
- Draft PR oluşturulması ve Google Rich Results Test ile doğrulanması
- Kategori sayfasındaki duplicate BreadcrumbList kaldırma (ayrı PR)

---

## Görev Sonu Raporu

```json
{
  "status": "completed",
  "agent": "schema-agent",
  "task": "TASK-005 — CodeIgniter 3.7.1 Product Schema Entegrasyon Planı",
  "date": "2026-06-30",
  "outputs": [
    "outputs/reports/ci3-product-schema-integration-plan.md"
  ],
  "requires_review": true,
  "open_items": [
    "Airtable SKU + Image URL + Schema Description doldurulmalı (TASK-004)",
    "PHP helper kodu insan code review'ından geçmeli",
    "PR draft olarak açılacak — Airtable tamamlanana kadar merge edilmez",
    "TASK-006: duplicate BreadcrumbList kaldırma PR'ı ayrıca planlanacak"
  ]
}
```
