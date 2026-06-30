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
└── widgets/
    ├── SeoOverview.tsx         # SEO modülü
    ├── GeoOverview.tsx         # GEO / AI Overview modülü
    ├── SnippetOverview.tsx     # Featured Snippet modülü
    ├── SchemaOverview.tsx      # Schema modülü
    ├── TasksOverview.tsx       # Görev durumu modülü
    └── EntityGraphOverview.tsx # Entity Graph modülü
```

---

## Modüller

| Modül | Widget | Veri Kaynağı (Hedef) |
|-------|--------|----------------------|
| SEO | SeoOverview | GSC + Serper |
| GEO / AI Overview | GeoOverview | Serper AI snippet |
| Featured Snippet | SnippetOverview | Serper PAA |
| Schema | SchemaOverview | Airtable Products |
| Entity Graph | EntityGraphOverview | knowledge-graph/ |
| Tasks | TasksOverview | tasks/ dosyaları |
| Products | — (Airtable widget) | Airtable Products |
| Automation | — (n8n embed) | n8n webhook |

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
