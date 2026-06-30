# Workflow — ai-overview-monitor

**Durum:** Architecture (tanım) · **Öncelik:** P2 · **Yazma:** Airtable KPI + rapor

---

## Purpose

Hedef sorgularda Google AI Overview (SGE) görünürlüğünü ve Buzsu/Suvesu'nun alıntı durumunu haftalık izler. GEO (Generative Engine Optimization) stratejisinin etki ölçümünü sağlar.

## Trigger

- **Tip:** Schedule Trigger
- **Sıklık:** Her Pazartesi 08:30 (serp-tracker'dan sonra)

## Inputs

| Girdi | Kaynak |
|-------|--------|
| GEO sorguları | `lib/serper` + GEO odaklı sorgular ("kireçli su zararları" vb.) |
| Hedef domainler | `buzsu.com.tr`, `suvesu.com` |

## Outputs

| Çıktı | Hedef |
|-------|-------|
| AI Overview görünürlük durumu | Airtable Weekly KPIs |
| Alıntı edilen domain listesi | Rapor (outputs/) + Dashboard GEO widget |
| Trend (önceki haftaya göre) | Rapor |

## Connected Systems

- Serper (okuma — `answerBox` / `knowledgeGraph` alanları)
- Airtable (yazma — KPI)
- Dashboard webhook (yazma — cache)

## Failure Handling

- AI Overview alanı her sorguda olmayabilir → "AI Overview yok" geçerli durum, hata değil.
- Serper 429 → backoff + kuyruk.
- Belirsizlik durumunda kör iddia yok → "doğrulanamadı" raporla (CLAUDE.md).
- Merkezi Error Trigger'a bağlı.

## Retry Policy

| Hata | Retry | Backoff |
|------|-------|---------|
| Serper 5xx/timeout | 3 | 2s → 4s → 8s |
| Serper 429 | 5 | 30s + jitter |
| Airtable yazma | 3 | 2s → 4s → 8s |

## n8n Node List

1. Schedule Trigger (haftalık Pazartesi 08:30)
2. Code (GEO sorgu listesi)
3. Split In Batches (sorgu başına)
4. HTTP Request (Serper `/search`)
5. Code (answerBox/knowledgeGraph → AI Overview var mı? Buzsu alıntı mı?)
6. Merge + Code (önceki haftaya göre trend)
7. Airtable (Update — Weekly KPIs)
8. HTTP Request (Dashboard webhook)
9. Error Trigger (ayrı workflow)

## Future Implementation

- `lib/serper` getGeoOverview() ile aynı AI Overview tespit mantığı (AiOverviewSignal tipi).
- serp-tracker ile zincirlenebilir (tek Serper çağrısı, iki tüketici) — maliyet optimizasyonu.
- Alıntı edilmeyen ama AI Overview çıkan sorgular → content-agent için fırsat görevi üretir.
