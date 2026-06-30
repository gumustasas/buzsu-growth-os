# Sprint-003 Raporu — Live Data Foundation

**Tarih:** 2026-06-30  
**Sprint:** Sprint-3  
**Durum:** Tamamlandı — İnsan onayı bekliyor  
**Commit:** `feat: build live data architecture for dashboard`

---

## 1. Yönetici Özeti

Sprint-3 ile dashboard'un mock UI'sinin altına **gerçek bir TypeScript data layer** kuruldu.  
5 connector için production-ready `client.ts` arayüzleri, mock implementasyonlar ve live stub'lar oluşturuldu.  
Mock ↔ Live geçişi `USE_MOCK_DATA` feature flag'i ile yönetiliyor.

**Bu sprintte yapılmayanlar (kural gereği):**
- ❌ Gerçek API çağrısı yapılmadı — live client'lar `NotImplemented` fırlatır
- ❌ API anahtarı yazılmadı — yalnızca `.env.example` şablonu
- ❌ Canlı siteye dokunulmadı
- ❌ Airtable verisi değiştirilmedi
- ❌ Dashboard UI değiştirilmedi

---

## 2. Oluşturulan Yapı

### lib/ — Data Layer (16 dosya)

| Connector | client.ts | types.ts | README.md |
|-----------|-----------|----------|-----------|
| Airtable | ✅ Mock + Live stub | ✅ Field ID haritası | ✅ |
| Serper | ✅ Mock + Live stub | ✅ SERP response + hedef sorgular | ✅ |
| GSC | ✅ Mock + Live stub | ✅ searchAnalytics tipleri | ✅ |
| GA4 | ✅ Mock + Live stub | ✅ runReport tipleri | ✅ |
| Merchant | ✅ Mock + Live stub | ✅ productStatuses tipleri | ✅ |

Ek olarak:
- `lib/README.md` — data layer mimarisi + veri akışı
- `lib/dashboard/dashboard-service.ts` — connector orkestrasyon servisi

### types/ — Domain Tipleri (8 dosya)

| Dosya | İçerik |
|-------|--------|
| `seo.ts` | KeywordRanking, SerpSnapshot, SeoOverviewData |
| `geo.ts` | AiOverviewSignal, PaaQuestion, EeatSignal, GeoOverviewData |
| `schema.ts` | SchemaInventoryItem, ProductJsonLd, SchemaOverviewData |
| `entity.ts` | Entity, EntityFrontmatter, EntityRelation, EntityGraphSummary |
| `product.ts` | Product, ProductCategory, ProductOverviewData |
| `task.ts` | TaskItem, TaskStatus, TasksOverviewData |
| `report.ts` | ReportMeta, ReportsOverviewData |
| `dashboard.ts` | DashboardSnapshot, MetricSummary, ConnectorHealth |

### config/ — Feature Flags

`config/feature-flags.ts`:
- `USE_MOCK_DATA` global anahtarı (varsayılan `true`)
- Connector başına `ENABLE_*` bayrağı
- `isMock(connector)` / `isLive(connector)` / `flagSummary()` yardımcıları

### knowledge-graph/api/ — Entity Okuma API'si (3 dosya)

| Dosya | İçerik |
|-------|--------|
| `index.ts` | 10 seed entity kaydı + `getAllEntities`, `getEntityById`, `getEntitiesByType`, `getEntityGraphSummary` |
| `search.ts` | `searchEntities` — TR karakter duyarsız metin araması |
| `relations.ts` | `getRelatedEntities`, `getAllRelations`, `areRelated`, `getMostConnected` |

### .env.example

Tüm connector'lar için environment variable şablonu. **Hiçbir gerçek değer yok** — yalnızca anahtar isimleri.

---

## 3. Connector Mimarisi

### Mock / Live Geçiş Mantığı

```
USE_MOCK_DATA=true (varsayılan)
        │
        ▼
   Tüm connector'lar → MockClient (gömülü snapshot verisi)

USE_MOCK_DATA=false + ENABLE_<X>=true
        │
        ▼
   İlgili connector → LiveClient (stub: NotImplemented)
```

### Fabrika Deseni

Her connector aynı deseni izler:

```ts
export interface XClient { /* production-ready metotlar */ }
class MockXClient implements XClient { /* mock veri */ }
class LiveXClient implements XClient { /* TODO(sprint-4) — stub */ }
export function createXClient(): XClient {
  return isMock('x') ? new MockXClient() : new LiveXClient()
}
```

Bu sayede UI ve servis katmanı, hangi modda çalışıldığını bilmeden aynı arayüzü kullanır.

### Orkestrasyon

`dashboard-service.ts` → `getSnapshot()`:
- Airtable + Serper (SEO + GEO) çağrılarını `Promise.all` ile paralel yürütür
- Schema ve Tasks verisini statik (HTML doğrulaması + tasks/ durumu) sağlar
- Entity Graph özetini `knowledge-graph/api`'den çeker
- Tek `DashboardSnapshot` döner
- `getConnectorHealth()` her connector'ın mock/live durumunu raporlar

---

## 4. Doğrulama

TypeScript tip kontrolü çalıştırıldı (`tsc --strict --noEmit`):
- ✅ Tüm connector client'ları, type dosyaları, dashboard-service ve KG api **temiz derlendi**
- ⚠️ Tek uyarı: `config/feature-flags.ts` içinde `process` referansı → `@types/node` gerektirir (dashboard/package.json'da devDependency olarak tanımlı; bağımsız kontrolde hariç tutuldu). Gerçek hata değil.

---

## 5. Açık Blockerlar

| Blocker | Etki | Sprint |
|---------|------|--------|
| Live client'lar stub | Gerçek API verisi yok | Sprint-4 |
| Dashboard UI mock'a bağlı | `dashboard-service` henüz UI'a bağlanmadı | Sprint-4 |
| `@types/node` + `npm install` | `process` tipi için gerekli | Sprint-4 (dashboard kurulumunda) |
| Airtable SKU/Image/Schema Desc | TASK-006 Product Schema bekliyor | İnsan |
| KG filesystem okuma | Entity body'leri statik gömülü | Sprint-4 (gray-matter) |

---

## 6. Sonraki Sprint Önerisi (Sprint-4)

| Öncelik | Görev |
|---------|-------|
| P0 | Live client implementasyonları (Airtable + Serper önce) — gerçek fetch + auth |
| P1 | Dashboard UI'ı `dashboard-service.getSnapshot()`'a bağla (mock → snapshot) |
| P1 | `knowledge-graph/api` filesystem okuması (gray-matter ile markdown parse) |
| P1 | Knowledge Graph +30 entity (rakip markalar, sertifikalar, teknolojiler) |
| P2 | Connector health widget'ı (dashboard'da mock/live göstergesi) |
| P2 | n8n → Airtable pipeline (GSC/GA4 verisini Airtable'a yazma) |
| P3 | TASK-006 Product Schema (Airtable blocker çözüldükten sonra) |

---

## 7. Dosya Listesi

```
config/feature-flags.ts
types/seo.ts
types/geo.ts
types/schema.ts
types/entity.ts
types/product.ts
types/task.ts
types/report.ts
types/dashboard.ts
lib/README.md
lib/airtable/client.ts
lib/airtable/types.ts
lib/airtable/README.md
lib/serper/client.ts
lib/serper/types.ts
lib/serper/README.md
lib/gsc/client.ts
lib/gsc/types.ts
lib/gsc/README.md
lib/ga4/client.ts
lib/ga4/types.ts
lib/ga4/README.md
lib/merchant/client.ts
lib/merchant/types.ts
lib/merchant/README.md
lib/dashboard/dashboard-service.ts
knowledge-graph/api/index.ts
knowledge-graph/api/search.ts
knowledge-graph/api/relations.ts
.env.example
README.md (güncelleme)
ROADMAP.md (güncelleme)
outputs/reports/sprint-003-live-data-foundation.md
```

**Toplam: 33 dosya (31 yeni, 2 güncelleme)**

---

*Rapor: platform-agent — Sprint-003 — 2026-06-30*
