# Workflow — daily-seo-monitor

**Durum:** Architecture (tanım) · **Öncelik:** P1 · **Yazma:** Airtable Weekly KPIs

---

## Purpose

Buzsu.com.tr'nin organik arama performansını günlük olarak izler; pozisyon, CTR ve impression değişimlerini Airtable KPI tablosuna kaydeder. SEO regresyonlarını erken yakalar.

## Trigger

- **Tip:** Schedule Trigger
- **Sıklık:** Her gün 07:00 (Europe/Istanbul)

## Inputs

| Girdi | Kaynak |
|-------|--------|
| Hedef site | `https://www.buzsu.com.tr/` |
| Hedef sayfa | `/su-aritma-cihazlari/` |
| Tarih aralığı | Son 1 gün vs. önceki 28 gün ortalaması |
| Takip sorguları | `lib/serper` TARGET_QUERIES (7 sorgu) |

## Outputs

| Çıktı | Hedef |
|-------|-------|
| Günlük pozisyon/CTR/impression | Airtable Weekly KPIs (Buzsu Sessions, Top Ranking Query) |
| Anomali bildirimi | Slack/email (pozisyon >3 düşüş) |
| Dashboard cache güncelleme | Dashboard webhook |

## Connected Systems

- Google Search Console (okuma)
- Airtable (yazma — KPI)
- Dashboard webhook (yazma — cache)
- Slack/email (bildirim)

## Failure Handling

- GSC auth hatası (401/403) → anında bildir, workflow durdur (insan müdahalesi).
- Veri boş dönerse → "veri yok" logla, KPI'a yazma, bir sonraki güne ertele.
- Merkezi Error Trigger workflow'una bağlı.

## Retry Policy

| Hata | Retry | Backoff |
|------|-------|---------|
| GSC 5xx/timeout | 3 | 2s → 4s → 8s |
| GSC 429 | 5 | 30s + jitter |
| Airtable yazma hatası | 3 | 2s → 4s → 8s |

## n8n Node List

1. Schedule Trigger (günlük 07:00)
2. Google Search Console (searchAnalytics.query) — veya HTTP Request
3. Code (pozisyon/CTR delta hesabı, önceki güne göre)
4. IF (pozisyon düşüşü > 3?)
5. Airtable (Update/Create — Weekly KPIs)
6. HTTP Request (Dashboard webhook)
7. Slack / Send Email (anomali bildirimi — IF true dalında)
8. Error Trigger (ayrı workflow bağlantısı)

## Future Implementation

- GSC OAuth2 credential bağlanır.
- `lib/gsc` LiveGscClient ile aynı sorgu mantığı paylaşılır (tek doğruluk kaynağı).
- İlk sürümde yalnızca okuma + bildirim; Airtable yazma insan onayından sonra aktive edilir.
