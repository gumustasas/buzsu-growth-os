# Buzsu Growth OS

**Ana hedef:** Buzsu.com.tr — su arıtma e-ticaret ve lead üretim platformu.  
**Destekleyici içerik otoritesi:** Suvesu.com — organik trafik ve AI Overview alıntısı için bilgi sitesi; Buzsu'ya nitelikli ziyaretçi gönderir.

SEO, GEO, CRO, Schema, E-E-A-T, İçerik, Rakip Analizi, AI Commerce ve Otomasyon iş akışlarını tek çatı altında yönetir.

**Model:** Yarı otonom — ajanlar analiz ve taslak üretir, insanlar onaylar ve uygular.  
**Kural:** Canlı siteye otomatik yayın yok. Her çıktı önce `/drafts/`, onay sonrası PR.

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

---

## Platform Katmanı (Sprint-2)

Sprint-2 ile `buzsu-growth-os` dokümantasyon deposu olmaktan çıkıp gerçek bir platform altyapısına dönüştü.

| Katman | Klasör | Durum |
|--------|--------|-------|
| Dashboard | `dashboard/` | Next.js 14 iskelet, mock data |
| Connectors | `connectors/` | Airtable ✅, Serper/GSC/GA4/MC planlandı |
| Knowledge Graph | `knowledge-graph/` | 10 entity seed, 150 hedef |

---

## Dizin Yapısı

```
buzsu-growth-os/
├── CLAUDE.md              ← Claude Code çalışma kuralları
├── AGENTS.md              ← Agent sistemi referansı
├── README.md              ← Bu dosya
├── ROADMAP.md             ← Geliştirme yol haritası
│
├── dashboard/             ← Next.js 14 Growth OS panosu (Sprint-2)
│   ├── app/               ← App Router (page.tsx, layout.tsx)
│   ├── components/        ← Sidebar, MetricCard, ModuleCard
│   └── widgets/           ← SEO, GEO, Snippet, Schema, Tasks, EntityGraph
│
├── connectors/            ← Dış veri kaynağı mimarisi (Sprint-2)
│   ├── airtable/          ← CRM connector (okuma aktif)
│   ├── serper/            ← SERP + AI Overview connector (planlandı)
│   ├── gsc/               ← Google Search Console (planlandı)
│   ├── ga4/               ← Google Analytics 4 (planlandı)
│   └── merchant-center/   ← Google Merchant Center (planlandı)
│
├── knowledge-graph/       ← Entity-bazlı bilgi yapısı (Sprint-2)
│   ├── entities/          ← Organizasyon entity'leri
│   ├── brands/            ← Marka entity'leri
│   ├── products/          ← Ürün entity'leri
│   ├── components/        ← Bileşen entity'leri
│   ├── technologies/      ← Teknoloji entity'leri
│   ├── certifications/    ← Belge entity'leri
│   ├── minerals/          ← Mineral entity'leri
│   ├── contaminants/      ← Kirletici entity'leri
│   ├── faq/               ← SSS entity'leri
│   ├── glossary/          ← Sözlük
│   └── locations/         ← Lokasyon entity'leri
│
├── agents/                ← Agent tanım dosyaları (10 agent)
│
├── docs/                  ← Sistem belgeleri
│
├── tasks/                 ← Aktif ve tamamlanan görevler
│   ├── seo/
│   ├── schema/
│   └── platform/          ← Sprint görev dosyaları
│
├── outputs/               ← Onaylanmış çıktılar
│   └── reports/
│
├── patches/               ← Diğer repolara uygulanacak hazır yamalar
│   └── buzsu-site/
│
└── archive/               ← Kullanımdan kalkmış dosyalar
```

---

## Bağlı Sistemler

| Sistem | Rol | Erişim |
|--------|-----|--------|
| Airtable (apphVqbUQohAMIoWk) | CRM — Leads, Products, Campaigns, KPI | Token: AIRTABLE_TOKEN |
| Serper | SERP + AI Overview analizi | Agent araç |
| buzsu.com.tr (production) | **Ana platform** — lead + satış | GitHub: gumustasas/buzsu (prototype) |
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
