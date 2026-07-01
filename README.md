# Buzsu Growth OS

**Ana Platform:** Buzsu.com.tr — su arıtma e-ticaret ve lead üretim platformu (CodeIgniter 3.7.1)  
**Destekleyici Otorite:** Suvesu.com — organik trafik ve AI Overview alıntısı için bilgi sitesi; Buzsu'ya nitelikli ziyaretçi gönderir

Buzsu Growth OS, arama motoru optimizasyonundan (SEO) üretken yapay zeka arama deneyimlerine (GEO, AEO) uzanan görünürlük katmanını; Entity SEO, Schema.org yapılandırılmış verisi ve AI Search sinyalleriyle birlikte tek bir agent tabanlı sistemde yönetir. Sistem 10 uzman agent, 32 skill modülü ve entity-bazlı bir Knowledge Graph üzerinden çalışır; CRO, E-E-A-T, içerik, rakip analizi, AI Commerce ve otomasyon iş akışlarını aynı çatı altında koordine eder.

**Model:** Yarı otonom — agent'lar analiz ve taslak üretir, insanlar onaylar ve uygular.  
**Kural:** Canlı siteye otomatik yayın yok. Her çıktı önce `/drafts/`, onay sonrası PR.

---

## Odak Alanları

| Alan | Kapsam |
|------|--------|
| **SEO** | Anahtar kelime, teknik SEO, iç bağlantı mimarisi, Search Console analizi |
| **GEO** — Generative Engine Optimization | Google AI Overview, Bing Copilot alıntılanabilirliği |
| **AEO** — Answer Engine Optimization | ChatGPT, Perplexity, sesli asistanlarda doğrudan cevap olma |
| **Entity SEO** | Marka/ürün/teknoloji tutarlılığı, Knowledge Graph tabanlı otorite sinyali |
| **Schema.org** | Product, FAQ, HowTo, BreadcrumbList, LocalBusiness JSON-LD markup |
| **AI Search** | `llms.txt`, AI crawler yönlendirme, LLM alıntı ve grounding optimizasyonu |

---

## Hızlı Başlangıç

```
1. /tasks/<alan>/ altında görev dosyası oluştur
2. Orchestrator ilgili agent'a yönlendirir
3. Agent /drafts/ altına çıktı yazar
4. Sen incele ve onayla
5. Onaylanan çıktı /outputs/ veya doğrudan uygulamaya geçer
```

---

## Mimari

```
Kullanıcı Talebi
      ↓
 Orchestrator
      ├── seo-agent        → SERP analizi, anahtar kelime, iç bağlantı
      ├── geo-agent        → AI Overview, GEO, alıntı hedefleme
      ├── snippet-agent    → Featured snippet, PAA, sıfır tıklama
      ├── cro-agent        → Dönüşüm, CTA, WhatsApp optimizasyonu
      ├── schema-agent     → Product/FAQ/HowTo schema markup
      ├── eeat-agent       → E-E-A-T sinyali denetimi
      ├── content-agent    → İçerik taslağı (Türkçe, SEO uyumlu)
      ├── competitor-agent → Rakip SERP karşılaştırması
      ├── commerce-agent   → Agentic alışveriş, sepet, WA handoff
      └── automation-agent → n8n, Airtable, Serper, Vercel iş akışları
                              ↓
                    [Tüm çıktılar → /drafts]
                              ↓
                    [İNSAN ONAYI GEREKİR]
                              ↓
                    Onaylanan çıktılar → /outputs
```

Her agent, `skills/` altındaki ilgili skill modüllerine (skill/checklist/prompts/implementation) referans vererek çalışır; skill'ler agent'ların yerine karar vermez, yalnızca uygulama adımlarını standartlaştırır.

---

## Knowledge Graph

`knowledge-graph/` — Buzsu ve Suvesu için entity-bazlı, yapılandırılmış bilgi kaynağı. SEO, GEO, Schema.org ve AI Search katmanlarının ortak referans noktasıdır: terim tutarlılığı sağlar, Schema.org eşlemesine kaynak oluşturur ve LLM halüsinasyonunu azaltır (Google Knowledge Graph / Wikidata mantığıyla uyumlu).

| Kategori | Klasör |
|----------|--------|
| Organizasyon | `entities/` |
| Marka | `brands/` |
| Ürün | `products/` |
| Bileşen | `components/` |
| Teknoloji | `technologies/` |
| Mineral | `minerals/` |
| Kirletici | `contaminants/` |
| SSS | `faq/` |
| Lokasyon | `locations/` |
| Okuma API'si | `api/` — index, search, relations (TypeScript) |

Her entity dosyası standart YAML frontmatter (`entity_type`, `schema_type`, `related_entities`, `buzsu_url`, `status`) ile başlar. **Hedef:** Sprint-2 seed (10 entity, tamamlandı) → Sprint-6 (40) → Sprint-7 (100) → Sprint-8 (150–200). Detay: [knowledge-graph/README.md](knowledge-graph/README.md)

---

## Platform Katmanları

| Katman | Klasör | Açıklama | Durum |
|--------|--------|----------|-------|
| Agent Sistemi | `agents/` | 10 uzman agent tanımı | Aktif |
| Skill Kütüphanesi | `skills/` | 32 alan × 5 dosya (skill/checklist/prompts/implementation/README) | Aktif |
| Knowledge Base | `knowledge/` | Çapraz-alan araştırma notları | Aktif |
| Knowledge Graph | `knowledge-graph/` | Entity-bazlı yapılandırılmış bilgi (yukarı bakınız) | Genişliyor |
| Playbook'lar | `playbooks/` | Senaryo bazlı uçtan uca uygulama rehberleri | Aktif |
| Workflow Şablonları | `workflows/` | n8n/Airtable/Serper connector dokümantasyonu + şema/entity/teknik SEO iş akışları | Aktif |
| Şablonlar | `templates/` | Yeni skill/rapor/schema/entity yazımı için standart kalıplar | Aktif |
| Görevler | `tasks/` | Alan bazlı aktif/tamamlanan görev dosyaları (8 alan) | Aktif |
| Dashboard UI | `dashboard/` | Next.js 14 App Router iskeleti, mock data | Sprint-2 |
| Data Layer | `lib/` | 5 connector client (Mock/Live fabrika) + dashboard-service | Sprint-3 |
| Domain Tipleri | `types/` | 8 TypeScript tip dosyası | Sprint-3 |
| Feature Flags | `config/` | `USE_MOCK_DATA` + connector aktivasyon bayrakları | Sprint-3 |
| Connector Mimarisi | `connectors/` | Airtable aktif; Serper/GSC/GA4/Merchant Center planlı | Sprint-2 |
| Otomasyon Katmanı | `automation/n8n/` | 10 workflow tanımı (architecture-only, çalıştırma yok) | Sprint-5 |
| Raporlar | `reports/`, `outputs/reports/` | Entegrasyon ve aksiyon planı raporları | — |
| Onay Akışı | `drafts/` → `outputs/` | Taslak → insan onayı → onaylı çıktı | Sürekli |
| Arşiv | `archive/` | Kullanımdan kalkmış dosyalar (referans amaçlı) | — |

**Veri modu:** `USE_MOCK_DATA=true` (varsayılan) tüm connector'ları mock'a sabitler. Live mod stub (Sprint-4'te uygulanacak). Şablon: [`.env.example`](.env.example)

---

## Dizin Yapısı

```
buzsu-growth-os/
├── CLAUDE.md              ← Claude Code çalışma kuralları
├── AGENTS.md              ← Agent sistemi referansı
├── README.md              ← Bu dosya
├── ROADMAP.md             ← Geliştirme yol haritası
├── MIGRATION_REPORT.md    ← AtlasOS → Buzsu Growth OS geçiş raporu
│
├── agents/                ← 10 agent tanım dosyası
│
├── skills/                ← 32 alan × 5 dosya (skill.md, checklist.md, prompts.md, implementation.md, README.md)
│   ├── seo/  geo/  aeo-ai-search/  ai-search/  entity-seo/  schema/  schema-automation/
│   ├── technical-seo/  gsc/  analytics/  llms/  cro/  ecommerce/  content/
│   ├── security/  php/  codeigniter3/  coding/  debugging/  refactoring/  planning/
│   ├── frontend/  performance/  images/  video/  video-automation/
│   └── github/  vercel/  n8n/  mcp/  ui-ux/  memory/
│
├── knowledge/             ← Çapraz-alan araştırma notları
│
├── knowledge-graph/       ← Entity-bazlı bilgi yapısı
│   ├── entities/  brands/  products/  components/  technologies/
│   ├── minerals/  contaminants/  faq/  locations/
│   └── api/               ← Entity okuma API'si: index, search, relations
│
├── playbooks/             ← Senaryo bazlı uygulama rehberleri
│
├── workflows/              ← Connector dokümantasyonu + iş akışı tanımları
│   ├── n8n/  airtable/  serper/
│   └── schema-validation.md, entity-audit.md, technical-seo.md, gsc-report.md
│
├── templates/             ← Skill/rapor/schema/entity yazım şablonları
│
├── dashboard/             ← Next.js 14 Growth OS panosu (Sprint-2)
│   ├── app/               ← App Router (page.tsx, layout.tsx)
│   ├── components/        ← Sidebar, MetricCard, ModuleCard
│   └── widgets/           ← SEO, GEO, Snippet, Schema, Tasks, EntityGraph
│
├── lib/                   ← TypeScript data layer (Sprint-3)
│   ├── airtable/  serper/  gsc/  ga4/  merchant/   ← her biri client.ts + types.ts + README
│   └── dashboard/         ← dashboard-service.ts (orkestrasyon)
│
├── types/                 ← Domain tipleri (Sprint-3)
│
├── config/                ← feature-flags.ts (USE_MOCK_DATA)
│
├── connectors/            ← Dış veri kaynağı mimarisi (Sprint-2)
│   └── airtable/  serper/  gsc/  ga4/  merchant-center/
│
├── automation/n8n/        ← Otomasyon katmanı (Sprint-5)
│   └── workflows/         ← 10 workflow tanımı (architecture-only)
│
├── .env.example           ← Environment variable şablonu
│
├── docs/                  ← human-approval.md, operating-model.md, ai-commerce-layer.md
│
├── tasks/                 ← Alan bazlı görevler
│   └── seo/  geo/  schema/  cro/  content/  commerce/  automation/  platform/
│
├── drafts/                ← Onay bekleyen taslaklar
│   └── content/  code/  schema/  workflows/
│
├── outputs/               ← Onaylanmış çıktılar
│   └── reports/  audits/  briefs/  recommendations/
│
├── reports/               ← Entegrasyon ve aksiyon planı raporları
│
├── patches/               ← Diğer repolara uygulanacak hazır yamalar
│   └── buzsu-site/
│
└── archive/               ← Kullanımdan kalkmış dosyalar (referans)
    └── legacy/patches/suvesu-site/
```

---

## Roadmap Durumu

**Güncel (v5.0, Sprint-5 tamamlandı):** Dashboard iskeleti, TypeScript data layer, Knowledge Graph seed (10 entity), otomasyon mimarisi (10 workflow tanımı) ve CodeIgniter 3.7.1 platform doğrulaması tamamlandı.

**Sıradaki (Sprint-6):** Knowledge Graph'ı 40 entity'ye çıkarmak, `whatsapp-lead` n8n workflow'unu staging'de dry-run'a almak, merkezi Error Trigger workflow'u tanımlamak.

Detay ve tamamlanan/aktif/planlanan tüm fazlar: [ROADMAP.md](ROADMAP.md)

---

## Bağlı Sistemler

| Sistem | Rol | Erişim |
|--------|-----|--------|
| Airtable (apphVqbUQohAMIoWk) | CRM — Leads, Products, Campaigns, KPI | Token: `AIRTABLE_TOKEN` |
| Serper | SERP + AI Overview analizi | Agent araç |
| buzsu.com.tr (production) | **Ana platform** — lead + satış, CodeIgniter 3.7.1 | GitHub: gumustasas/buzsu (prototype) |
| suvesu-site (Vercel) | Destekleyici içerik otoritesi — Buzsu'ya trafik gönderir | GitHub: gumustasas/suvesu-site |
| n8n | Otomasyon iş akışları | Taslak — insan yükler |
| WhatsApp Business | Lead handoff kanalı | wa.me/905527896905 |

---

## Temel Güvenlik Kuralları

1. Canlı siteye otomatik yayın yapılmaz.
2. Her çıktı önce `/drafts/` altına yazılır.
3. AI Commerce ajanı ödeme veya sipariş tamamlamaz.
4. PII `/drafts/` veya `/outputs/` dosyalarına yazılmaz.
5. API anahtarları asla dosyaya yazılmaz.

Detay: [docs/human-approval.md](docs/human-approval.md)

---

## Kaynaklar

- [AGENTS.md](AGENTS.md) — Agent tanımları ve orkestrasyon kuralları
- [CLAUDE.md](CLAUDE.md) — Claude Code çalışma kuralları
- [ROADMAP.md](ROADMAP.md) — Geliştirme yol haritası ve sprint durumu
- [knowledge-graph/README.md](knowledge-graph/README.md) — Entity mimarisi ve kategori yapısı
- [docs/operating-model.md](docs/operating-model.md) — Operasyon ritmi ve metrikler
- [docs/ai-commerce-layer.md](docs/ai-commerce-layer.md) — AI Commerce protokolü
- [airtable-schema.md](airtable-schema.md) — CRM şema referansı
- [lead-entry-audit.md](lead-entry-audit.md) — Lead entry point denetimi

**Buzsu Patch'leri (aktif):**
- [patches/buzsu-site/product-schema-v2.md](patches/buzsu-site/product-schema-v2.md) — Product + BreadcrumbList schema
- [patches/buzsu-site/internal-linking.md](patches/buzsu-site/internal-linking.md) — İç bağlantı haritası
- [patches/buzsu-site/cro-product-page.md](patches/buzsu-site/cro-product-page.md) — CRO güven blokları + CTA hiyerarşisi
- [patches/buzsu-site/geo-ai-overview.md](patches/buzsu-site/geo-ai-overview.md) — GEO içerik + FAQ schema
- [patches/buzsu-site/whatsapp-sales.md](patches/buzsu-site/whatsapp-sales.md) — WhatsApp pre-fill satış akışı

**Arşiv (referans):**
- [archive/legacy/patches/suvesu-site/ai-agent-field-mapping.md](archive/legacy/patches/suvesu-site/ai-agent-field-mapping.md) — Suvesu AI agent Airtable field mapping
