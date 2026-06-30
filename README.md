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

## Dizin Yapısı

```
buzsu-growth-os/
├── CLAUDE.md              ← Claude Code çalışma kuralları
├── AGENTS.md              ← Agent sistemi referansı
├── README.md              ← Bu dosya
├── ROADMAP.md             ← Geliştirme yol haritası
├── MIGRATION_REPORT.md    ← AtlasOS → Buzsu Growth OS geçiş raporu
├── airtable-schema.md     ← CRM şema referansı
├── lead-entry-audit.md    ← Lead entry point denetim raporu
│
├── agents/                ← Agent tanım dosyaları (10 agent)
│   ├── seo-agent.md
│   ├── geo-agent.md
│   ├── snippet-agent.md
│   ├── cro-agent.md
│   ├── schema-agent.md
│   ├── eeat-agent.md
│   ├── content-agent.md
│   ├── competitor-agent.md
│   ├── commerce-agent.md
│   └── automation-agent.md
│
├── docs/                  ← Sistem belgeleri
│   ├── human-approval.md  ← Onay sistemi ve değişiklik sınıflandırması
│   ├── operating-model.md ← İşletme modeli ve operasyon ritmi
│   └── ai-commerce-layer.md ← AI Commerce katmanı protokolü
│
├── tasks/                 ← Aktif ve tamamlanan görevler
│   ├── seo/
│   ├── geo/
│   ├── cro/
│   ├── schema/
│   ├── content/
│   ├── commerce/
│   └── automation/
│
├── drafts/                ← İnsan onayı bekleyen çıktılar
│   ├── content/           ← Blog taslakları, SEO brief'leri
│   ├── code/              ← Branch + PR taslakları
│   ├── schema/            ← JSON-LD markup dosyaları
│   └── workflows/         ← n8n, Airtable otomasyon taslakları
│
├── outputs/               ← Onaylanmış, kullanıma hazır çıktılar
│   ├── reports/           ← SEO, GEO, performans raporları
│   ├── audits/            ← E-E-A-T, rakip, lead denetimleri
│   ├── briefs/            ← Yayına hazır içerik brief'leri
│   └── recommendations/   ← CRO önerileri
│
├── workflows/             ← Onaylanmış otomasyon dosyaları
│   ├── n8n/
│   ├── serper/
│   └── airtable/
│
└── patches/               ← Diğer repolara uygulanacak hazır yamalar
    └── suvesu-site/       ← suvesu-site için hazır PR taslakları
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
- [patches/suvesu-site/ai-agent-field-mapping.md](patches/suvesu-site/ai-agent-field-mapping.md) — P1 Fix: AI agent Airtable field mapping
