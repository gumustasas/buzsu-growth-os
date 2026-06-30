# Workflow — schema-validator

**Durum:** Architecture (tanım) · **Öncelik:** P1 · **Yazma:** Rapor (bildirim)

---

## Purpose

Buzsu.com.tr kritik sayfalarındaki schema.org markup'ını günlük doğrular: Product, FAQPage, BreadcrumbList, Organization. Eksik/bozuk/duplicate schema'yı tespit edip raporlar. TASK-006 Product schema canlıya alındığında regresyon koruması sağlar.

## Trigger

- **Tip:** Schedule Trigger
- **Sıklık:** Her gün 06:00 (Europe/Istanbul)

## Inputs

| Girdi | Kaynak |
|-------|--------|
| Hedef URL'ler | `/su-aritma-cihazlari/` + 5 ürün sayfası |
| Beklenen schema envanteri | `types/schema` SchemaInventoryItem |

## Outputs

| Çıktı | Hedef |
|-------|-------|
| Schema durum raporu | outputs/ (markdown) + dashboard Schema widget |
| Regresyon bildirimi | Slack/email (eksik/bozuk schema) |
| Duplicate uyarısı | Rapor (örn. body BreadcrumbList) |

## Connected Systems

- Buzsu.com.tr (okuma — HTML fetch; not: site 403 verebilir, fallback gerekli)
- Google Rich Results API (opsiyonel doğrulama)
- Dashboard webhook (yazma — cache)
- Slack/email (bildirim)

## Failure Handling

- Site 403 (bot engeli) → alternatif user-agent veya cache'lenmiş HTML; çözülmezse "doğrulanamadı" raporla (kör iddia yok — CLAUDE.md SEO kuralı).
- JSON-LD parse hatası → o blok için "bozuk" işaretle, diğerlerine devam.
- Merkezi Error Trigger'a bağlı.

## Retry Policy

| Hata | Retry | Backoff |
|------|-------|---------|
| HTTP 5xx/timeout | 3 | 2s → 4s → 8s |
| HTTP 403 | 1 (alt user-agent) | anında, sonra raporla |
| Rich Results API 429 | 5 | 30s + jitter |

## n8n Node List

1. Schedule Trigger (günlük 06:00)
2. Code (hedef URL listesi)
3. Split In Batches (URL başına)
4. HTTP Request (sayfa HTML çek)
5. Code (`<script type="application/ld+json">` blokları parse + tip envanteri)
6. IF (eksik/bozuk/duplicate var mı?)
7. Code (rapor markdown üret)
8. HTTP Request (Dashboard webhook)
9. Slack / Send Email (regresyon bildirimi)
10. Error Trigger (ayrı workflow)

## Future Implementation

- `dashboard-service` getSchemaOverview() ile aynı beklenen envanter şeması.
- Product schema canlıya alınınca (TASK-006) bu workflow zorunlu regresyon kapısı olur.
- Rich Results API entegrasyonu opsiyonel ikinci doğrulama katmanı.
