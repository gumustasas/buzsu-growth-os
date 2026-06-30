# Workflow — featured-snippet-monitor

**Durum:** Architecture (tanım) · **Öncelik:** P2 · **Yazma:** Rapor + dashboard cache

---

## Purpose

Hedef sorgular ve PAA (People Also Ask) için featured snippet sahipliğini haftalık izler. Buzsu/Suvesu'nun hangi snippet'lere sahip olduğunu, hangi fırsatların açık olduğunu raporlar. snippet-agent için görev kaynağı üretir.

## Trigger

- **Tip:** Schedule Trigger
- **Sıklık:** Her Pazartesi 09:00

## Inputs

| Girdi | Kaynak |
|-------|--------|
| Hedef sorgular | `lib/serper` TARGET_QUERIES |
| PAA havuzu | Serper `peopleAlsoAsk` alanı |
| Bilinen PAA hedefleri | `lib/serper` MOCK_PAA referansı |

## Outputs

| Çıktı | Hedef |
|-------|-------|
| Snippet sahiplik durumu | Dashboard Snippet widget cache |
| Kapsanan / fırsat PAA listesi | Rapor (outputs/) |
| Yeni PAA soruları | snippet-agent görev önerisi |

## Connected Systems

- Serper (okuma — `peopleAlsoAsk`, featured snippet)
- Dashboard webhook (yazma — cache)
- Slack/email (yeni fırsat bildirimi)

## Failure Handling

- Snippet/PAA alanı boş dönebilir → geçerli durum, hata değil.
- Tek sorgu hata → atla, raporda işaretle (sessiz cap değil).
- Merkezi Error Trigger'a bağlı.

## Retry Policy

| Hata | Retry | Backoff |
|------|-------|---------|
| Serper 5xx/timeout | 3 | 2s → 4s → 8s |
| Serper 429 | 5 | 30s + jitter |
| Dashboard webhook | 3 | 2s → 4s → 8s |

## n8n Node List

1. Schedule Trigger (haftalık Pazartesi 09:00)
2. Code (TARGET_QUERIES listesi)
3. Split In Batches (sorgu başına)
4. HTTP Request (Serper `/search`)
5. Code (featured snippet sahibi + PAA soruları çıkar)
6. Code (bilinen PAA ile diff → kapsanan/fırsat/yeni)
7. Merge (tüm sorgular)
8. HTTP Request (Dashboard webhook)
9. IF (yeni fırsat var mı?) → Slack/email
10. Error Trigger (ayrı workflow)

## Future Implementation

- `lib/serper` getGeoOverview() paaCoverage mantığı ile paylaşımlı.
- ai-overview-monitor + serp-tracker ile aynı Serper çağrısını paylaşabilir (tek istek, çok tüketici).
- Yeni PAA → otomatik `tasks/seo/` görev taslağı üretimi (snippet-agent devri) — Sprint-6.
