# Workflow — serp-tracker

**Durum:** Architecture (tanım) · **Öncelik:** P1 · **Yazma:** Airtable Weekly KPIs

---

## Purpose

Hedef anahtar kelimeler için Serper üzerinden haftalık SERP snapshot alır: organik sıralama, top-5 rakip, SERP özellikleri (PAA, AI Overview, shopping). Buzsu'nun rekabetçi konumunu izler.

## Trigger

- **Tip:** Schedule Trigger
- **Sıklık:** Her Pazartesi 08:00 (Europe/Istanbul)

## Inputs

| Girdi | Kaynak |
|-------|--------|
| Takip sorguları | `lib/serper` TARGET_QUERIES (7 sorgu) |
| Lokasyon / dil | `Turkey` / `tr` |
| Hedef domain | `buzsu.com.tr`, `suvesu.com` |

## Outputs

| Çıktı | Hedef |
|-------|-------|
| Sorgu başına pozisyon | Airtable Weekly KPIs (Top Ranking Query) |
| Top-5 rakip domain | SERP snapshot raporu (outputs/) |
| SERP özellik durumu | Dashboard SEO/GEO widget cache |

## Connected Systems

- Serper (okuma — `/search`)
- Airtable (yazma — KPI)
- Dashboard webhook (yazma — cache)

## Failure Handling

- Serper 429 (rate limit) → backoff + kalan sorguları kuyruğa al.
- Tek sorgu hata verirse → o sorguyu atla, diğerlerine devam, raporda işaretle (silent cap değil — loglanır).
- Merkezi Error Trigger'a bağlı.

## Retry Policy

| Hata | Retry | Backoff |
|------|-------|---------|
| Serper 5xx/timeout | 3 | 2s → 4s → 8s |
| Serper 429 | 5 | 30s + jitter |
| Airtable yazma | 3 | 2s → 4s → 8s |

## n8n Node List

1. Schedule Trigger (haftalık Pazartesi 08:00)
2. Code (TARGET_QUERIES dizisini üret)
3. Split In Batches (sorgu başına döngü, rate limit dostu)
4. HTTP Request (Serper `/search`, X-API-KEY header)
5. Code (organic[].domain eşleştir → pozisyon + top-5 rakip)
6. Merge (tüm sorgu sonuçlarını birleştir)
7. Airtable (Update — Weekly KPIs)
8. HTTP Request (Dashboard webhook)
9. Error Trigger (ayrı workflow)

## Future Implementation

- `lib/serper` LiveSerperClient ile aynı parse mantığı paylaşılır.
- İlk sürüm SERP snapshot'ı outputs/ raporu olarak üretir; Airtable yazma insan onayı sonrası.
- AI Overview alanı `ai-overview-monitor` workflow'una devredilebilir (sorumluluk ayrımı).
