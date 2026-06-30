# Buzsu Growth OS — Dashboard

Next.js 14 tabanlı büyüme operasyon panosu. SEO, GEO, Schema, Entity Graph ve görev durumlarını tek ekranda görselleştirir.

**Durum:** İskelet — mock data. Canlı connector'lar Sprint-3'te eklenir.  
**Canlı siteye deploy yok.** Yalnızca yerel geliştirme ve insan onaylı staging.

---

## Kurulum

```bash
cd dashboard
npm install
npm run dev
# → http://localhost:3000
```

---

## Yapı

```
dashboard/
├── app/
│   ├── page.tsx          # Ana dashboard sayfası
│   ├── layout.tsx        # Root layout (Sidebar dahil)
│   └── globals.css       # Global stiller
├── components/
│   ├── Sidebar.tsx       # Sol nav
│   ├── MetricCard.tsx    # Tek metrik kartı
│   └── ModuleCard.tsx    # Modül özet kartı
├── widgets/
│   ├── SeoOverview.tsx         # SEO modülü
│   ├── GeoOverview.tsx         # GEO / AI Overview modülü
│   ├── SnippetOverview.tsx     # Featured Snippet modülü
│   ├── SchemaOverview.tsx      # Schema modülü
│   ├── TasksOverview.tsx       # Görev durumu modülü
│   ├── EntityGraphOverview.tsx # Entity Graph modülü
│   ├── ProductsOverview.tsx    # Ürünler modülü (Sprint-4)
│   └── AutomationOverview.tsx  # Otomasyon / connector durumu (Sprint-4)
└── types.ts                   # Domain tip barrel (@/types → kök types/)
```

---

## Veri Akışı (Sprint-4)

Dashboard artık widget içi statik mock'tan değil, merkezi servisten beslenir:

```
dashboard/app/page.tsx  (async server component)
        │  getDashboardService().getSnapshot()
        ▼
lib/dashboard/dashboard-service.ts
        │  Promise.all([...])           ← connector orkestrasyonu
        ▼
lib/<connector>/client.ts  → createXClient()
        │  isMock(connector)            ← config/feature-flags.ts
        ▼
   ┌─────────────┬─────────────┐
   │ MockClient  │ LiveClient  │       ← USE_MOCK_DATA anahtarı
   │ (gömülü)    │ (stub)      │
   └─────────────┴─────────────┘
        │
        ▼
DashboardSnapshot  →  page.tsx  →  her widget bir snapshot dilimi alır (props)
```

**Önemli:** UI hangi connector'ın mock/live olduğunu bilmez. `USE_MOCK_DATA=true` iken tüm widget'lar mock veri gösterir; tasarım değişmez.

### Widget → Veri Eşleşmesi

| Modül | Widget | Snapshot dilimi | Kaynak (hedef) |
|-------|--------|-----------------|----------------|
| SEO | SeoOverview | `snapshot.seo` | Serper + GSC |
| GEO / AI Overview | GeoOverview | `snapshot.geo` | Serper AI snippet |
| Featured Snippet | SnippetOverview | `snapshot.geo.paaCoverage` | Serper PAA |
| Schema | SchemaOverview | `snapshot.schema` | HTML audit / Airtable |
| Entity Graph | EntityGraphOverview | `snapshot.entityGraph` | knowledge-graph/api |
| Tasks | TasksOverview | `snapshot.tasks` | tasks/ |
| Products | ProductsOverview | `snapshot.products` | Airtable Products |
| Automation | AutomationOverview | `getConnectorHealth()` | connector flag durumu |

---

## Environment Variables (Şablon — Değer Yazılmaz)

```
NEXT_PUBLIC_AIRTABLE_BASE_ID=
AIRTABLE_API_KEY=
SERPER_API_KEY=
GSC_CLIENT_EMAIL=
GSC_PRIVATE_KEY=
GA4_PROPERTY_ID=
```

Değerler `.env.local` dosyasına girilir (repoya commit edilmez).

---

## Bağımlılıklar

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Recharts (grafik)
- SWR (data fetching)
