# Sprint-005 Raporu — Growth Automation Foundation

**Tarih:** 2026-06-30  
**Sprint:** Sprint-5  
**Durum:** Tamamlandı — İnsan onayı bekliyor  
**Commit:** `feat: initialize growth automation layer`

---

## 1. Yönetici Özeti

Sprint-5 ile Growth OS'nin **ilk gerçek otomasyon katmanı** mimari olarak tasarlandı.  
`automation/n8n/` altında 10 production-grade workflow tanımı ve bir mimari README oluşturuldu.  
**Bu sprintte hiçbir workflow oluşturulmadı, çalıştırılmadı; Airtable'a yazılmadı; canlı siteye dokunulmadı.** Yalnızca production architecture üretildi.

**Kurallara uyum:**
- ❌ Workflow oluşturulmadı (n8n'de)
- ❌ n8n execute edilmedi
- ❌ Airtable'a yazılmadı
- ❌ Canlı siteye dokunulmadı
- ✅ Yalnızca architecture + workflow definition

---

## 2. Oluşturulan Yapı

```
automation/
└── n8n/
    ├── README.md                          # Otomasyon katmanı mimarisi
    └── workflows/
        ├── daily-seo-monitor.md           # P1 — günlük SEO performansı
        ├── serp-tracker.md                # P1 — haftalık SERP snapshot
        ├── airtable-sync.md               # P1 — Airtable → dashboard cache
        ├── dashboard-refresh.md           # P2 — snapshot cache yenileme
        ├── entity-indexer.md              # P2 — KG index üretimi
        ├── schema-validator.md            # P1 — schema regresyon koruması
        ├── whatsapp-lead.md               # P0 — lead yakalama (PII)
        ├── merchant-feed-check.md         # P2 — MC feed + fiyat kontrolü
        ├── ai-overview-monitor.md         # P2 — AI Overview görünürlük
        └── featured-snippet-monitor.md    # P2 — snippet + PAA takibi
```

---

## 3. Workflow Mimarisi

Her workflow tanımı şu standart bölümleri içerir:

- **Purpose** — tek cümlelik sorumluluk
- **Trigger** — Schedule / Webhook
- **Inputs / Outputs** — veri kaynakları ve hedefleri
- **Connected systems** — okuma/yazma ayrımıyla
- **Failure handling** — hata senaryoları + fallback
- **Retry policy** — hata tipine göre backoff tablosu
- **n8n node list** — numaralı node akışı
- **Future implementation** — `lib/` data layer ile eşleşme

### Tetikleyici Dağılımı

| Tetikleyici | Workflow sayısı |
|-------------|-----------------|
| Schedule (zamanlanmış) | 7 |
| Webhook | 2 (whatsapp-lead, entity-indexer) |
| Hibrit (webhook + schedule) | 1 (dashboard-refresh) |

### Yazma Sınıflandırması (CLAUDE.md)

| Workflow | Yazma hedefi | Sınıf |
|----------|--------------|-------|
| whatsapp-lead | Airtable Leads (PII) | MAJOR — insan onayı |
| daily-seo-monitor, serp-tracker, ai-overview-monitor | Airtable KPI | MAJOR — insan onayı |
| airtable-sync, dashboard-refresh, entity-indexer | Cache (Airtable okuma) | MINOR |
| schema-validator, merchant-feed-check, featured-snippet-monitor | Rapor + bildirim | MINOR |

> Hiçbir yazma workflow'u insan onayı olmadan production'a alınmaz.

---

## 4. lib/ Data Layer ile Hizalama

Her workflow, Sprint-3'te kurulan `lib/` connector mantığını paylaşır (tek doğruluk kaynağı):

| Workflow | lib eşleşmesi |
|----------|---------------|
| daily-seo-monitor | `lib/gsc` |
| serp-tracker, ai-overview-monitor, featured-snippet-monitor | `lib/serper` |
| airtable-sync, whatsapp-lead | `lib/airtable` |
| merchant-feed-check | `lib/merchant` |
| dashboard-refresh | `lib/dashboard/dashboard-service` |
| entity-indexer | `knowledge-graph/api` |

Bu hizalama, live'a geçişte n8n ve dashboard'un aynı parse/normalize mantığını kullanmasını sağlar.

---

## 5. Ortak Operasyonel Desenler

- **Merkezi Error Trigger** — tüm workflow'lar tek hata bildirim workflow'una bağlı.
- **Retry standardı** — geçici hata (3×, exp backoff), rate limit (5×, 30s+jitter), auth (0, anında bildir).
- **PII koruması** — whatsapp-lead PII'yi yalnızca Airtable Leads'te tutar; cache/rapor/log'a yazmaz.
- **Sessiz cap yasağı** — atlanan/eşleşmeyen kayıtlar raporlanır (silent truncation yok).
- **Credential izolasyonu** — API anahtarları n8n credentials'ta; workflow JSON'una gömülmez.

---

## 6. Açık Blockerlar

| Blocker | Etki | Sonraki adım |
|---------|------|--------------|
| Workflow'lar henüz n8n'de yok | Otomasyon pasif | İnsan onayı → staging |
| Credential'lar bağlanmadı | Live çağrı yapılamaz | İnsan (n8n credentials) |
| whatsapp-lead PII production | MAJOR onay gerekli | İnsan |
| Airtable SKU/Image/Schema Desc | merchant-feed-check + schema | TASK-004 / İnsan |
| Dashboard cache store seçimi | dashboard-refresh hedefi | Sprint-6 (KV/Redis) |

---

## 7. Sonraki Sprint Önerisi (Sprint-6)

| Öncelik | Görev |
|---------|-------|
| P0 | whatsapp-lead'i n8n staging'de oluştur + dry-run (insan onayı sonrası) |
| P1 | serp-tracker + ai-overview-monitor'u tek Serper çağrısında birleştir |
| P1 | Dashboard cache store kararı (Vercel KV / Redis) → dashboard-refresh hedefi |
| P1 | `lib/` Live client implementasyonu (n8n ile paylaşımlı parse) |
| P2 | entity-indexer için KG filesystem okuması (gray-matter) |
| P2 | Merkezi Error Trigger workflow'unun tanımı |
| P3 | TASK-006 Product Schema (Airtable blocker sonrası) |

---

## 8. Dosya Listesi

```
automation/n8n/README.md
automation/n8n/workflows/daily-seo-monitor.md
automation/n8n/workflows/serp-tracker.md
automation/n8n/workflows/airtable-sync.md
automation/n8n/workflows/dashboard-refresh.md
automation/n8n/workflows/entity-indexer.md
automation/n8n/workflows/schema-validator.md
automation/n8n/workflows/whatsapp-lead.md
automation/n8n/workflows/merchant-feed-check.md
automation/n8n/workflows/ai-overview-monitor.md
automation/n8n/workflows/featured-snippet-monitor.md
README.md (güncelleme — Automation Layer)
ROADMAP.md (güncelleme — Faz 5.4)
outputs/reports/sprint-005-automation-foundation.md (bu rapor)
```

**Toplam: 14 dosya (12 yeni, 2 güncelleme)**

---

*Rapor: automation-agent — Sprint-005 — 2026-06-30*
