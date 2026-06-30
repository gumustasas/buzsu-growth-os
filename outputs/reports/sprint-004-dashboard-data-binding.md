# Sprint-004 Raporu — Dashboard Data Binding

**Tarih:** 2026-06-30  
**Sprint:** Sprint-4  
**Durum:** Tamamlandı — İnsan onayı bekliyor  
**Commit:** `feat: bind dashboard widgets to central data service`

---

## 1. Yönetici Özeti

Sprint-4 ile dashboard UI, widget içi statik mock dizilerinden tamamen ayrıldı.  
Artık tüm widget'lar `lib/dashboard/dashboard-service.ts` → `getSnapshot()` üzerinden gelen merkezi `DashboardSnapshot` verisiyle besleniyor.  
Veri akışı: **UI → dashboard-service → connectors → mock/live switch**.

**Kurallara uyum:**
- ❌ Gerçek API çağrısı yapılmadı (`USE_MOCK_DATA=true` kaldı)
- ❌ API anahtarı yazılmadı
- ❌ Canlı siteye dokunulmadı
- ✅ UI genel tasarımı korundu (yalnızca veri kaynağı değişti)

---

## 2. Yapılan Değişiklikler

### 2.1 — page.tsx → async server component

`dashboard/app/page.tsx`:
- `async function DashboardPage()` oldu
- `getDashboardService().getSnapshot()` ve `getConnectorHealth()` çağırıyor
- Üst metrikler artık `snapshot.metrics`'ten (statik dizi kaldırıldı)
- Başlıkta veri kaynağı (`mock`/`live`) ve üretim zamanı gösteriliyor
- 8 widget snapshot dilimleriyle besleniyor

### 2.2 — Widget prop interface'leri

Her widget artık prop alıyor; iç mock dizileri kaldırıldı:

| Widget | Prop | Snapshot dilimi |
|--------|------|-----------------|
| SeoOverview | `data: SeoOverviewData` | `snapshot.seo` |
| GeoOverview | `data: GeoOverviewData` | `snapshot.geo` |
| SnippetOverview | `data: GeoOverviewData` | `snapshot.geo.paaCoverage` |
| SchemaOverview | `data: SchemaOverviewData` | `snapshot.schema` |
| TasksOverview | `data: TasksOverviewData` | `snapshot.tasks` |
| EntityGraphOverview | `data: EntityGraphSummary` | `snapshot.entityGraph` |
| ProductsOverview | `data: ProductOverviewData` | `snapshot.products` |
| AutomationOverview | `connectors: ConnectorHealth[]` | `getConnectorHealth()` |

### 2.3 — Yeni widget'lar

- `dashboard/widgets/ProductsOverview.tsx` — Airtable ürün tablosu, fiyat (TRY format), schema-hazırlık sayacı
- `dashboard/widgets/AutomationOverview.tsx` — connector mock/live durumu, n8n pipeline notu

### 2.4 — dashboard/types.ts (barrel)

Kök `types/` ve `lib/` ile dashboard arasındaki sınır importu tek dosyada toplandı.  
Widget'lar `@/types` üzerinden temiz import eder; tip kaynağı kök `types/`.

### 2.5 — Dinamik durum rozetleri

Widget kart durumu (`mock`/`live`/`blocked`) artık veriden türetiliyor:
- `data.source === 'mock'` → "Mock" rozeti
- Schema'da `blockers.length > 0` → "Blocked" rozeti
- Live moda geçildiğinde otomatik "Canlı" olur (kod değişmeden)

---

## 3. TypeScript Doğrulaması

`tsc --strict --noEmit` tüm repo (lib + types + config + knowledge-graph/api + dashboard) üzerinde çalıştırıldı.

**Sonuç:** Altyapı-dışı (gerçek) tip hatası **YOK**.

Kalan tüm uyarılar `node_modules` kurulmadığı için beklenen altyapı hatalarıdır:
- `Cannot find module 'react' / 'next' / 'clsx'`
- `JSX.IntrinsicElements` namespace yok (react tipi yok)
- `process` (node tipi yok — `@types/node` dashboard devDependency)
- `key` prop cascade'i (`@types/react` kurulunca kaybolur)

> Bu hatalar `cd dashboard && npm install` sonrası ortadan kalkar. Veri bağlama mantığı (connector → service → widget props) tip olarak tutarlıdır.

---

## 4. Veri Akışı Diyagramı

```
page.tsx (async)
   │ getSnapshot()
   ▼
dashboard-service ──Promise.all──> airtable / serper / gsc client
   │                                      │ isMock('x')
   │                                      ▼
   │                              Mock | Live(stub)   ← USE_MOCK_DATA
   ▼
DashboardSnapshot
   ├── seo          → SeoOverview
   ├── geo          → GeoOverview + SnippetOverview
   ├── schema       → SchemaOverview
   ├── entityGraph  → EntityGraphOverview
   ├── tasks        → TasksOverview
   ├── products     → ProductsOverview
   └── (health)     → AutomationOverview
```

---

## 5. Açık Blockerlar

| Blocker | Etki | Sprint |
|---------|------|--------|
| Live client'lar stub | Gerçek veri için bekliyor | Sprint-5 |
| `npm install` çalıştırılmadı | tsc altyapı hataları | Dashboard kurulumunda |
| KG api statik gömülü | Entity body filesystem'den okunmuyor | Sprint-5 (gray-matter) |
| Airtable SKU/Image/Schema Desc | TASK-006 Product Schema | İnsan |

---

## 6. Sonraki Sprint Önerisi (Sprint-5)

| Öncelik | Görev |
|---------|-------|
| P0 | Live client implementasyonu (Airtable + Serper) — gerçek fetch + auth |
| P1 | `knowledge-graph/api` filesystem okuması (gray-matter markdown parse) |
| P1 | Knowledge Graph +30 entity |
| P2 | Dashboard alt sayfalar: `/seo`, `/schema`, `/entity-graph` detay görünümleri |
| P2 | Connector health için ayrı durum sayfası |
| P3 | TASK-006 Product Schema (Airtable blocker sonrası) |

---

## 7. Değiştirilen / Oluşturulan Dosyalar

```
dashboard/app/page.tsx                     (güncelleme — service binding)
dashboard/types.ts                         (yeni — domain tip barrel)
dashboard/widgets/SeoOverview.tsx          (güncelleme — props)
dashboard/widgets/GeoOverview.tsx          (güncelleme — props)
dashboard/widgets/SnippetOverview.tsx      (güncelleme — props)
dashboard/widgets/SchemaOverview.tsx       (güncelleme — props)
dashboard/widgets/TasksOverview.tsx        (güncelleme — props)
dashboard/widgets/EntityGraphOverview.tsx  (güncelleme — props)
dashboard/widgets/ProductsOverview.tsx     (yeni)
dashboard/widgets/AutomationOverview.tsx   (yeni)
dashboard/README.md                        (güncelleme — veri akışı)
outputs/reports/sprint-004-dashboard-data-binding.md (yeni — bu rapor)
```

**Toplam: 12 dosya (4 yeni, 8 güncelleme)**

---

*Rapor: platform-agent — Sprint-004 — 2026-06-30*
