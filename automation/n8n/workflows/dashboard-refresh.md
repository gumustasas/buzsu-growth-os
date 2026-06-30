# Workflow — dashboard-refresh

**Durum:** Architecture (tanım) · **Öncelik:** P2 · **Yazma:** Dashboard cache

---

## Purpose

Dashboard snapshot cache'ini hem zamanlanmış hem talep üzerine (webhook) yeniler. Diğer workflow'lardan (serp-tracker, airtable-sync) gelen güncellemeleri tek bir tutarlı snapshot'ta toplar.

## Trigger

- **Tip:** Webhook Trigger + Schedule Trigger (ikili)
- **Webhook:** Diğer workflow'lar `/refresh` çağırır
- **Schedule:** Her 30 dakikada bir (güvenlik ağı)

## Inputs

| Girdi | Kaynak |
|-------|--------|
| Refresh tetikleyici | Webhook payload (kaynak workflow adı) |
| Cache parçaları | airtable-sync, serp-tracker çıktıları |

## Outputs

| Çıktı | Hedef |
|-------|-------|
| Birleşik DashboardSnapshot | Dashboard cache store |
| `generatedAt` zaman damgası | Snapshot metadata |

## Connected Systems

- Dashboard cache store (yazma)
- Diğer n8n workflow'ları (webhook ile tetiklenir)

## Failure Handling

- Eksik cache parçası → o dilim için son bilinen değeri koru (kısmi snapshot).
- Webhook secret uyuşmazsa → 401 dön, isteği reddet, logla.
- Merkezi Error Trigger'a bağlı.

## Retry Policy

| Hata | Retry | Backoff |
|------|-------|---------|
| Cache yazma hatası | 3 | 2s → 4s → 8s |
| Webhook downstream | 2 | 5s sabit |

## n8n Node List

1. Webhook Trigger (`POST /refresh`, secret doğrulama)
2. Schedule Trigger (her 30 dk — ayrı giriş, aynı akışa Merge)
3. Code (secret doğrula, kaynak workflow logla)
4. HTTP Request (cache parçalarını oku: products, seo, geo)
5. Code (DashboardSnapshot birleştir + generatedAt damgası)
6. HTTP Request / Set (cache store yaz)
7. Respond to Webhook (200 OK)
8. Error Trigger (ayrı workflow)

## Future Implementation

- `lib/dashboard/dashboard-service` getSnapshot() ile aynı birleştirme şeması.
- Cache store: KV (Vercel KV / Redis) — Sprint-6.
- İlk sürümde dashboard hâlâ `USE_MOCK_DATA=true`; bu workflow live snapshot'ı besledikçe UI flag ile geçiş yapar.
