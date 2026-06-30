# lib/ — Live Data Layer

Buzsu Growth OS dashboard'unun TypeScript data katmanı.  
Her connector için `client.ts` (interface + Mock/Live implementasyon + fabrika) ve `types.ts` içerir.

**Sprint-3 kuralı:** Gerçek API çağrısı YOK. Live client'lar stub (`NotImplemented`). Mock geçişi `USE_MOCK_DATA` ile yönetilir.

---

## Yapı

```
lib/
├── README.md
├── airtable/     → Ürünler (client + types + README)
├── serper/       → SERP + PAA + AI Overview
├── gsc/          → Organik pozisyon / CTR
├── ga4/          → Davranış + WhatsApp dönüşüm
├── merchant/     → Ürün feed + fiyat doğrulama
└── dashboard/    → dashboard-service.ts (orkestrasyon)
```

---

## Veri Akışı

```
config/feature-flags.ts  (USE_MOCK_DATA, ENABLE_*)
        │  isMock(connector)
        ▼
lib/<connector>/client.ts  → createXClient() → Mock | Live (stub)
        │
        ▼
lib/dashboard/dashboard-service.ts  → getSnapshot()
        │  Promise.all([products, seo, geo, ...])
        ▼
DashboardSnapshot  (types/dashboard.ts)
        │
        ▼
dashboard/ UI (değiştirilmedi — Sprint-4'te bağlanacak)
```

---

## Kullanım

```ts
import { getDashboardService } from '@/lib/dashboard/dashboard-service'

const service = getDashboardService()
const snapshot = await service.getSnapshot()      // mock veya live
const health = service.getConnectorHealth()       // her connector'ın modu
```

---

## Mod Geçişi

| Senaryo | Ayar |
|---------|------|
| Tüm mock (varsayılan) | `USE_MOCK_DATA=true` |
| Sadece Airtable live | `USE_MOCK_DATA=false` + `ENABLE_AIRTABLE=true` |
| Tüm live | `USE_MOCK_DATA=false` + tüm `ENABLE_*=true` |

> Live mod şu an `NotImplemented` fırlatır — gerçek implementasyon Sprint-4.

---

## Tip Tanımları

Domain tipleri `types/` altında: `seo.ts`, `geo.ts`, `schema.ts`, `entity.ts`, `product.ts`, `task.ts`, `report.ts`, `dashboard.ts`.

Knowledge Graph okuma API'si: `knowledge-graph/api/` (`index.ts`, `search.ts`, `relations.ts`).
