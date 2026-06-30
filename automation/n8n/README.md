# Buzsu Growth OS — n8n Automation Layer

Growth OS'nin gerçek otomasyon katmanı. Bu klasör, **n8n workflow tanımlarını** (architecture-only) içerir.  
**Bu sprintte hiçbir workflow oluşturulmaz, çalıştırılmaz veya Airtable'a yazılmaz.** Yalnızca production mimarisi belgelenir.

---

## Felsefe

- Her workflow **insan onayıyla** production'a alınır.
- Yazma işlemleri (Airtable, canlı site) **insan onayı** gerektirir — n8n otomatik production yazması CLAUDE.md ile MAJOR sınıfıdır.
- Workflow'lar mock/staging ortamında test edilir, sonra canlıya alınır.
- Her workflow tek sorumluluğa sahiptir (single responsibility).

---

## Workflow Envanteri

| Workflow | Tetikleyici | Yazma var mı? | Öncelik |
|----------|-------------|---------------|---------|
| [daily-seo-monitor](./workflows/daily-seo-monitor.md) | Zamanlanmış (günlük) | Airtable (KPI) | P1 |
| [serp-tracker](./workflows/serp-tracker.md) | Zamanlanmış (haftalık) | Airtable (KPI) | P1 |
| [airtable-sync](./workflows/airtable-sync.md) | Zamanlanmış (6 saat) | Dashboard cache | P1 |
| [dashboard-refresh](./workflows/dashboard-refresh.md) | Webhook + zamanlanmış | Dashboard cache | P2 |
| [entity-indexer](./workflows/entity-indexer.md) | Git push webhook | KG index | P2 |
| [schema-validator](./workflows/schema-validator.md) | Zamanlanmış (günlük) | Rapor | P1 |
| [whatsapp-lead](./workflows/whatsapp-lead.md) | Webhook (form/WA) | Airtable (Leads) | P0 |
| [merchant-feed-check](./workflows/merchant-feed-check.md) | Zamanlanmış (günlük) | Bildirim | P2 |
| [ai-overview-monitor](./workflows/ai-overview-monitor.md) | Zamanlanmış (haftalık) | Airtable (KPI) | P2 |
| [featured-snippet-monitor](./workflows/featured-snippet-monitor.md) | Zamanlanmış (haftalık) | Rapor | P2 |

---

## Ortak Mimari Desenler

### Connector Eşleşmesi

n8n workflow'ları, `lib/` data layer'ındaki aynı dış sistemleri kullanır:

| Sistem | n8n bağlantısı | lib karşılığı |
|--------|----------------|---------------|
| Airtable | Airtable node / HTTP | `lib/airtable` |
| Serper | HTTP Request | `lib/serper` |
| Search Console | Google API / HTTP | `lib/gsc` |
| Analytics 4 | Google API / HTTP | `lib/ga4` |
| Merchant Center | Google API / HTTP | `lib/merchant` |
| Dashboard | Webhook | `lib/dashboard` |

### Ortak Hata Yönetimi

- Her workflow bir **Error Trigger** workflow'una bağlanır (merkezi hata bildirimi).
- Kritik workflow'lar (whatsapp-lead) hata durumunda **fallback** (manuel kuyruk) kullanır.
- Tüm hatalar bir Slack/email kanalına raporlanır.

### Ortak Retry Politikası

| Hata tipi | Retry | Backoff |
|-----------|-------|---------|
| Geçici ağ (5xx, timeout) | 3 deneme | 2s → 4s → 8s (exponential) |
| Rate limit (429) | 5 deneme | 30s sabit + jitter |
| Auth (401/403) | 0 deneme | Anında bildir, insan müdahalesi |
| Veri/validation (4xx) | 0 deneme | Logla, atla, raporla |

### Güvenlik

- API anahtarları **n8n credentials** olarak saklanır; workflow JSON'una gömülmez.
- PII (telefon, isim) yalnızca Airtable Leads tablosunda kalır; dashboard/rapora yazılmaz.
- Yazma yapan workflow'lar production'a almadan önce **insan onayı** gerektirir.

---

## Environment / Credentials (Şablon)

n8n credential isimleri (değer yazılmaz):

```
Airtable Personal Access Token   → AIRTABLE_API_KEY
Serper API Key                   → SERPER_API_KEY
Google Search Console (OAuth2)   → GSC_*
Google Analytics 4 (Service Acct)→ GA4_*
Google Merchant Center (OAuth2)  → GMC_*
WhatsApp Business (webhook)      → WA_*
Dashboard webhook secret         → DASHBOARD_WEBHOOK_SECRET
```

---

## Production Alma Akışı

```
1. Workflow tanımı (bu klasör)  → architecture
2. İnsan incelemesi ve onayı     → MINOR/MAJOR sınıf
3. n8n staging'de oluşturma      → test
4. Mock/dry-run doğrulama        → validate
5. Canlı credential bağlama      → insan
6. Production aktivasyon         → insan onayı
7. Monitoring + error trigger    → operasyon
```

> Şu an **adım 1**'deyiz. Adım 2+ insan onayı bekler.
