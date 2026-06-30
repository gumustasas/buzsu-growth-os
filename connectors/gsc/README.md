# Connector — Google Search Console

## Amaç

Buzsu.com.tr'nin organik arama performansını (impression, tıklama, CTR, ortalama pozisyon) Google Search Console API üzerinden çekerek SEO kararlarına gerçek veri sağlar.

---

## Environment Variables

```
GSC_CLIENT_EMAIL=    # Google service account email
GSC_PRIVATE_KEY=     # Service account private key (JSON escape)
GSC_SITE_URL=https://www.buzsu.com.tr/
```

---

## Veri Kaynakları

| Endpoint | Veri | Kullanım |
|----------|------|---------|
| `searchAnalytics.query` | Sorgu bazlı CTR, pozisyon, impression | SEO performansı |
| `searchAnalytics.page` | URL bazlı performans | Sayfa önceliklendirme |
| `searchAnalytics.device` | Mobil vs masaüstü | CRO kararları |
| `sitemaps.list` | Sitemap durumu | Teknik SEO |
| `urlInspection` | Index durumu | Yeni içerik kontrolü |

---

## Hedef Metrikler

- `/su-aritma-cihazlari/` için ortalama pozisyon (hedef: top-5)
- `su arıtma cihazları` sorgu CTR'ı (hedef: >%3)
- Mobil impression payı (hedef: >%60)
- Rich result görünürlüğü (Product schema aktif sonrası)

---

## Kullanım Senaryoları

1. **seo-agent:** Haftalık performans raporu — `searchAnalytics.query` ile top-20 sorgu
2. **cro-agent:** Yüksek impression + düşük CTR sayfaları tespit → meta description önerisi
3. **schema-agent:** Product schema aktif olduktan sonra rich result impression izleme
4. **content-agent:** Yeni içerik için URL index hızı takibi

---

## n8n Bağlantısı

```
Trigger: Zamanlanmış (Pazartesi 07:00)
Node 1: Google Search Console API → searchAnalytics (son 28 gün)
Node 2: Filtreleme: /su-aritma-cihazlari/ + top queries
Node 3: Airtable Write → Weekly KPIs (Top Ranking Query, Buzsu Sessions)
Node 4: Dashboard push → GSC widget
```

---

## Claude Agent Kullanımı

GSC için resmi MCP tool henüz yok. Alternatif:
- n8n otomasyonuyla veriler Airtable'a yazılır
- Claude Code Airtable'dan okur
- Dashboard Airtable'dan çeker
