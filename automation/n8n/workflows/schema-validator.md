# Workflow — schema-validator

**Durum:** Implementation-Ready (Draft) · **Öncelik:** P1 · **Yazma:** Rapor (bildirim)  
**n8n Workflow ID:** `wiIX2PkAsVkL016P` · **n8n Adı:** `Buzsu - Schema Validator - Draft`  
**Sprint-6:** 2026-06-30 — Inactive draft olarak n8n'e yüklendi. Manuel dry-run hazır.  
**Bugfix:** IF node "All Schemas Valid?" — expression `={{ $json.summary.allPassed === true }}`, Operation: `is true`, rightValue kaldırıldı.

---

## Purpose

Buzsu.com.tr kritik sayfalarındaki schema.org markup'ını doğrular: Product, FAQPage, BreadcrumbList, Organization, ItemList, CollectionPage. Eksik/bozuk schema'yı tespit edip raporlar. TASK-006 Product schema canlıya alındığında regresyon koruması sağlar.

## Trigger

- **Sprint-6 Draft:** Manual Trigger (insan tetikler, dry-run için)
- **Production hedefi:** Schedule Trigger — Her gün 06:00 (Europe/Istanbul)

## Hedef URL'ler (Sprint-6)

| URL | Etiket |
|-----|--------|
| `https://www.buzsu.com.tr/su-aritma-cihazlari/` | Ana Kategori |
| `https://www.buzsu.com.tr/en-iyi-su-aritma-cihazi-hangisi/` | Rehber |
| `https://www.buzsu.com.tr/ev-tipi-su-aritma-cihazlari/` | Ev Tipi |
| `https://www.buzsu.com.tr/manyetik-kirec-onleyici/` | Manyetik |

## Doğrulanan Schema Tipleri

`Product`, `ItemList`, `BreadcrumbList`, `FAQPage`, `Organization`, `CollectionPage`

## Inputs

| Girdi | Kaynak |
|-------|--------|
| Hedef URL'ler | Code node — hardcoded (Sprint-6), `lib/serper` TARGET_QUERIES (production) |
| Beklenen schema envanteri | Code node — REQUIRED_TYPES listesi |

## Outputs

| Çıktı | Hedef |
|-------|-------|
| `summary` (totalUrls, totalPassed, totalFailed, allPassed, checkedAt) | IF node karar verisi |
| `results[]` (url, foundTypes, missingTypes, passed) | Rapor detayı |
| `reportStatus: ALL_SCHEMAS_VALID` veya Stop and Error | Son durum |

## Connected Systems

- Buzsu.com.tr (okuma — HTML fetch; neverError: true; not: 403 dönebilir)
- Dashboard webhook (yazma — production'da eklenecek, Sprint-6 dışı)
- Slack/email (bildirim — production'da eklenecek)

## Failure Handling

- Site 403 / timeout → `neverError: true` ile HTTP Request devam eder; `data` alanı boş, JSON-LD parse 0 sonuç, missing types raporda görünür.
- JSON-LD parse hatası → try/catch ile o blok atlanır, diğerlerine devam.
- IF false branch → Stop and Error node hata mesajı + results detayı.
- Merkezi Error Trigger bağlantısı: production'da eklenecek.

## Retry Policy

| Hata | Retry | Backoff |
|------|-------|---------|
| HTTP 5xx/timeout | 3 | 2s → 4s → 8s |
| HTTP 403 | 1 (alt user-agent) | anında, sonra raporla |

## n8n Node List (Sprint-6 Implementasyonu — 7 node)

1. **Manual Trigger** — insan tetikler (dry-run)
2. **Set Target URLs** (Code, runOnceForAllItems) — 4 URL × label → 4 item
3. **Fetch Page HTML** (HTTP Request GET) — `{{ $json.url }}`, responseFormat: text, neverError: true, timeout: 15s
4. **Extract and Validate JSON-LD** (Code, runOnceForAllItems) — HTML parse + schema tip kontrolü + summary aggregate
5. **All Schemas Valid?** (IF) — Expression: `={{ $json.summary.allPassed === true }}` · Operation: **is true** · rightValue: yok (unary check)
6. **Validation Passed** (Set, onTrue) — `reportStatus: ALL_SCHEMAS_VALID`
7. **Schema Errors Detected** (Stop and Error, onFalse) — `{{ $json.summary.totalFailed }} URL(s) missing schema types`

## Production Upgrade (Sprint-7+)

- Manual Trigger → Schedule Trigger (günlük 06:00)
- Hardcoded URL listesi → `lib/serper` TARGET_QUERIES
- `results[]` → Dashboard webhook cache yazma (dashboard-refresh)
- Stop and Error → Slack/email bildirim (Merkezi Error Trigger)
- `neverError: true` + retry → Merkezi Error Trigger bağlantısı
- Rich Results API opsiyonel ikinci doğrulama katmanı
- TASK-006 Product schema canlıya alınınca bu workflow zorunlu regresyon kapısı

## Future Implementation

- `dashboard-service` getSchemaOverview() ile aynı beklenen envanter şeması.
- ai-overview-monitor + serp-tracker ile Serper çağrısı paylaşımı (maliyet optimizasyonu).
