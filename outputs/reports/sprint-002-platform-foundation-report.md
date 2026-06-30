# Sprint-002 Raporu — Dashboard, Connectors & Knowledge Graph Temeli

**Tarih:** 2026-06-30  
**Sprint:** Sprint-2  
**Durum:** Tamamlandı — İnsan onayı bekliyor  
**Commit:** `feat: initialize dashboard connectors and knowledge graph foundation`

---

## 1. Yönetici Özeti

Sprint-2 ile `buzsu-growth-os` reposu dokümantasyon deposundan gerçek bir platform altyapısına dönüştürüldü.  
Üç temel katman kuruldu: **Dashboard** (Next.js 14 iskelet), **Connectors** (5 connector mimarisi) ve **Knowledge Graph** (10 entity seed, 150 hedef).  
**Canlı siteye dokunulmadı. Airtable'a yazma yapılmadı. API anahtarı yazılmadı.**

---

## 2. Dashboard Yapısı

### Oluşturulan Dosyalar

| Dosya | Açıklama |
|-------|----------|
| `dashboard/README.md` | Kurulum, yapı, modül tablosu, env var şablonu |
| `dashboard/package.json` | Next.js 14 + React 18 + Recharts + SWR + Tailwind |
| `dashboard/next.config.js` | Next.js yapılandırması |
| `dashboard/tsconfig.json` | TypeScript yapılandırması |
| `dashboard/app/globals.css` | Tailwind + Buzsu tema değişkenleri |
| `dashboard/app/layout.tsx` | Root layout (Sidebar dahil) |
| `dashboard/app/page.tsx` | Ana dashboard — 6 metrik + 6 widget |
| `dashboard/components/Sidebar.tsx` | Sol navigasyon (9 modül bağlantısı) |
| `dashboard/components/MetricCard.tsx` | Tek metrik kartı (ok/warn/error/info) |
| `dashboard/components/ModuleCard.tsx` | Modül özet kartı (live/mock/blocked/pending) |
| `dashboard/widgets/SeoOverview.tsx` | SERP pozisyon tablosu (mock) |
| `dashboard/widgets/GeoOverview.tsx` | AI Overview kontrol listesi (mock) |
| `dashboard/widgets/SnippetOverview.tsx` | PAA kapsama durumu (mock) |
| `dashboard/widgets/SchemaOverview.tsx` | Schema envanter tablosu + blocker uyarısı |
| `dashboard/widgets/TasksOverview.tsx` | Görev durumu listesi (TASK-001 → Sprint-2) |
| `dashboard/widgets/EntityGraphOverview.tsx` | Entity sayım ızgarası + ilerleme çubuğu |

### Dashboard Modülleri

| Modül | Widget | Veri Durumu |
|-------|--------|-------------|
| SEO | SeoOverview | Mock — TASK-001 SERP verisi |
| GEO / AI Overview | GeoOverview | Mock — Serper bağlı değil |
| Featured Snippet | SnippetOverview | Mock — 2/5 PAA kapsama |
| Schema | SchemaOverview | Mock — Product blocked görünür |
| Görevler | TasksOverview | Mock — 6 görev durumu |
| Entity Graph | EntityGraphOverview | Mock — 10/150 seed |

### Kurulum

```bash
cd dashboard && npm install && npm run dev
# → http://localhost:3000
```

---

## 3. Connector Mimarisi

### Oluşturulan Dosyalar

| Dosya | Durum |
|-------|-------|
| `connectors/README.md` | Genel mimari + güvenlik kuralları |
| `connectors/airtable/README.md` | ✅ Okuma aktif — field ID'leri dahil |
| `connectors/serper/README.md` | Planlandı — 7 hedef sorgu |
| `connectors/gsc/README.md` | Planlandı — GSC API endpoint'leri |
| `connectors/ga4/README.md` | Planlandı — GA4 Data API |
| `connectors/merchant-center/README.md` | Planlandı — GMC product feed |

### Connector Özeti

```
Airtable   → Okuma aktif, yazma insan onayı gerektirir
Serper     → Sprint-3'te n8n ile SERP snapshot otomasyonu
GSC        → Sprint-3'te n8n → Airtable KPI pipeline
GA4        → Sprint-4
MC         → Sprint-4
```

---

## 4. Knowledge Graph Mimarisi

### README Konuları

- Entity nedir (tanım + örnekler)
- Buzsu için neden önemli
- SEO ilişkisi (Product rich result, FAQPage, yerel SEO)
- GEO / AI Overview ilişkisi (alıntı kalitesi)
- Product Schema ilişkisi (TASK-003 bağlantısı)
- AI Commerce ilişkisi (entity bazlı ürün eşleştirme)
- WebMCP / Agentic Web ilişkisi (grounding, halüsinasyon azaltma)
- 150–200 entity hedefi ve sprint planı

### Klasör Yapısı

```
knowledge-graph/
├── entities/        (1 seed)
├── brands/          (1 seed)
├── products/        (2 seed)
├── components/      (1 seed)
├── technologies/    (1 seed)
├── certifications/  (boş — Sprint-3)
├── minerals/        (1 seed)
├── contaminants/    (1 seed)
├── faq/             (1 seed)
├── glossary/        (boş — Sprint-3)
└── locations/       (1 seed)
```

---

## 5. Entity Seed Listesi (Sprint-2 — 10 Entity)

| # | Dosya | Entity Tipi | Schema Tipi |
|---|-------|-------------|-------------|
| 1 | `entities/organization-buzsu.md` | Organization | schema.org/Organization |
| 2 | `brands/buzsu.md` | Brand | schema.org/Brand |
| 3 | `products/code-su-aritma-cihazi.md` | Product | schema.org/Product |
| 4 | `products/naturalsnet-11-asama.md` | Product | schema.org/Product |
| 5 | `components/ters-osmoz-membran.md` | Component | schema.org/Thing |
| 6 | `technologies/ters-osmoz.md` | Technology | schema.org/Thing |
| 7 | `contaminants/kirec.md` | Contaminant | schema.org/Thing |
| 8 | `minerals/alkali-mineral.md` | Mineral | schema.org/Thing |
| 9 | `faq/su-aritma-cihazi-nasil-secilir.md` | FAQ | schema.org/Question |
| 10 | `locations/bartin.md` | Location | schema.org/City |

Her entity dosyası şunları içerir:
- YAML frontmatter (tip, schema, aliases, ilişkili entity'ler, URL'ler)
- Türkçe tanım
- Teknik özellikler / tablolar
- Schema.org JSON-LD eşleştirmesi
- GEO / AI Overview fırsat notu
- Buzsu/Suvesu içerik bağlantısı

---

## 6. README ve ROADMAP Güncellemeleri

### README.md

- "Platform Katmanı (Sprint-2)" bölümü eklendi
- Dizin yapısı `dashboard/`, `connectors/`, `knowledge-graph/` dahil güncellendi

### ROADMAP.md

- Versiyon `1.0 → 2.0 (Sprint-2)` güncellendi
- Faz 5 (Platform Altyapısı) aktif faz olarak eklendi
- TASK-006 Schema entegrasyonu blocked olarak işaretlendi (Airtable blocker)
- Eski "Faz 5" → "Faz 6" olarak yeniden numaralandırıldı

---

## 7. Açık Blockerlar

| Blocker | Etki | Sorumlu |
|---------|------|---------|
| Airtable: SKU + Image URL + Schema Description doldurulmadı | TASK-006 + Product Schema PR bekliyor | İnsan |
| Dashboard: Canlı veri yok | Widget'lar mock data gösteriyor | Sprint-3 |
| Serper connector aktif değil | GEO/SEO canlı veri yok | Sprint-3 |
| GSC connector aktif değil | Pozisyon takibi yapılamıyor | Sprint-3 |
| KG: 140 entity eksik | Entity graph %7 dolu | Sprint-3–5 |

---

## 8. Sonraki Sprint Önerisi (Sprint-3)

| Öncelik | Görev |
|---------|-------|
| P0 | Airtable blocker çözülürse: TASK-006 Product Schema CI4 entegrasyonu |
| P1 | Dashboard Airtable live connector (okuma — n8n veya edge route) |
| P1 | Serper connector — haftalık SERP snapshot n8n otomasyonu |
| P1 | Knowledge Graph genişletme: +30 entity (rakip markalar, sertifikalar, teknolojiler) |
| P2 | GSC connector — n8n → Airtable KPI pipeline |
| P2 | Dashboard yeni sayfalar: `/seo`, `/schema`, `/entity-graph` |
| P3 | Duplicate BreadcrumbList kaldırma PR'ı (Faz 4 devamı) |

---

## 9. Commit Özeti

```
feat: initialize dashboard connectors and knowledge graph foundation
```

**Değiştirilen / oluşturulan dosyalar:**

```
tasks/platform/sprint-002-dashboard-connectors-kg.md
dashboard/README.md
dashboard/package.json
dashboard/next.config.js
dashboard/tsconfig.json
dashboard/app/globals.css
dashboard/app/layout.tsx
dashboard/app/page.tsx
dashboard/components/Sidebar.tsx
dashboard/components/MetricCard.tsx
dashboard/components/ModuleCard.tsx
dashboard/widgets/SeoOverview.tsx
dashboard/widgets/GeoOverview.tsx
dashboard/widgets/SnippetOverview.tsx
dashboard/widgets/SchemaOverview.tsx
dashboard/widgets/TasksOverview.tsx
dashboard/widgets/EntityGraphOverview.tsx
connectors/README.md
connectors/airtable/README.md
connectors/serper/README.md
connectors/gsc/README.md
connectors/ga4/README.md
connectors/merchant-center/README.md
knowledge-graph/README.md
knowledge-graph/entities/organization-buzsu.md
knowledge-graph/brands/buzsu.md
knowledge-graph/products/code-su-aritma-cihazi.md
knowledge-graph/products/naturalsnet-11-asama.md
knowledge-graph/components/ters-osmoz-membran.md
knowledge-graph/technologies/ters-osmoz.md
knowledge-graph/contaminants/kirec.md
knowledge-graph/minerals/alkali-mineral.md
knowledge-graph/faq/su-aritma-cihazi-nasil-secilir.md
knowledge-graph/locations/bartin.md
README.md (güncelleme)
ROADMAP.md (güncelleme)
outputs/reports/sprint-002-platform-foundation-report.md
```

**Toplam: 36 dosya (34 yeni, 2 güncelleme)**

---

*Rapor: platform-agent — Sprint-002 — 2026-06-30*
