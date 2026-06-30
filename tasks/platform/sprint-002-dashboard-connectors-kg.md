# Sprint-002 — Dashboard, Connectors & Knowledge Graph Temeli

**Tarih:** 2026-06-30  
**Faz:** Faz 5 — Platform Altyapısı  
**Durum:** Aktif  
**Öncelik:** P0  
**Atanan:** orchestrator + platform-agent  

---

## Amaç

`buzsu-growth-os` reposunu dokümantasyon deposundan gerçek bir platform altyapısına dönüştürmek:

1. **Dashboard** — Next.js 14 iskelet (mock data, canlıya bağlantı yok)
2. **Connectors** — Airtable, Serper, GSC, GA4, Merchant Center bağlantı mimarileri
3. **Knowledge Graph** — Entity-bazlı bilgi yapısı (150–200 entity hedefi)

**Kural:** Canlı siteye dokunma. Airtable yazma yok. API key yazma yok.

---

## Sprint Hedefleri

| # | Hedef | Durum |
|---|-------|-------|
| 1 | Sprint dosyası (`tasks/platform/sprint-002-…`) | ✅ |
| 2 | Dashboard iskelet (`dashboard/`) | ✅ |
| 3 | Dashboard mock modülleri (8 modül) | ✅ |
| 4 | Connector yapısı (`connectors/`) | ✅ |
| 5 | Knowledge Graph yapısı (`knowledge-graph/`) | ✅ |
| 6 | KG README — entity mimarisi açıklaması | ✅ |
| 7 | İlk 10 entity seed dosyası | ✅ |
| 8 | README + ROADMAP güncelleme | ✅ |
| 9 | Sprint-2 platform raporu | ✅ |

---

## Beklemede Kalan Görevler (Bu Sprint Dışı)

| Görev | Neden Bekliyor |
|-------|----------------|
| TASK-006 — CI4 Product Schema Entegrasyonu | Airtable blocker: SKU + Image URL + Schema Description doldurulmalı |
| Product Schema PR açılması | TASK-006 bekleniyor |
| Duplicate BreadcrumbList kaldırma | Ayrı PR — Sprint-3'e alındı |

---

## Dosya Yapısı

```
dashboard/
  README.md
  package.json
  next.config.js
  tsconfig.json
  app/
    page.tsx
    layout.tsx
    globals.css
  components/
    Sidebar.tsx
    MetricCard.tsx
    ModuleCard.tsx
  widgets/
    SeoOverview.tsx
    GeoOverview.tsx
    SnippetOverview.tsx
    SchemaOverview.tsx
    TasksOverview.tsx
    EntityGraphOverview.tsx

connectors/
  README.md
  airtable/README.md
  serper/README.md
  gsc/README.md
  ga4/README.md
  merchant-center/README.md

knowledge-graph/
  README.md
  entities/organization-buzsu.md
  brands/buzsu.md
  products/code-su-aritma-cihazi.md
  products/naturalsnet-11-asama.md
  components/ters-osmoz-membran.md
  technologies/ters-osmoz.md
  contaminants/kirec.md
  minerals/alkali-mineral.md
  faq/su-aritma-cihazi-nasil-secilir.md
  locations/bartin.md
```

---

## Sprint-3 Önerisi

- Knowledge Graph genişletme: teknolojiler, rakip markalar, sertifikalar
- Dashboard Airtable live connector (okuma — n8n veya edge API)
- Serper connector ile SERP snapshot otomasyonu
- TASK-006 Product Schema entegrasyonu (Airtable blocker çözüldükten sonra)

---

## Görev Sonu Raporu

```json
{
  "status": "completed",
  "sprint": "Sprint-002",
  "date": "2026-06-30",
  "outputs": [
    "dashboard/ (iskelet)",
    "connectors/ (5 connector README)",
    "knowledge-graph/ (10 entity seed)",
    "outputs/reports/sprint-002-platform-foundation-report.md"
  ],
  "requires_review": true,
  "open_items": [
    "TASK-006: CI4 Product Schema — Airtable blocker çözülmeli",
    "Dashboard: Airtable live connector (Sprint-3)",
    "KG: 140+ entity eklenmeli (Sprint-3)"
  ]
}
```
