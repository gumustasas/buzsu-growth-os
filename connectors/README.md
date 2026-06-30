# Buzsu Growth OS — Connectors

Bu klasör, Buzsu Growth OS'un dış veri kaynaklarıyla bağlantı mimarisini tanımlar.  
Her connector kendi README'sinde: amaç, env var şablonu, veri kaynakları, kullanım senaryoları, n8n entegrasyonu ve Claude agent kullanımını açıklar.

**Kural:** API anahtarları buraya yazılmaz. Yalnızca env var isimleri ve yapı belgelenir.

---

## Mevcut Connectorlar

| Connector | Durum | Kullanım |
|-----------|-------|---------|
| [Airtable](./airtable/README.md) | ✅ Okuma aktif | Ürünler, Lead'ler, Kampanyalar |
| [Serper](./serper/README.md) | 📋 Planlandı | SERP, PAA, AI snippet |
| [Google Search Console](./gsc/README.md) | 📋 Planlandı | Organik trafik, pozisyon |
| [Google Analytics 4](./ga4/README.md) | 📋 Planlandı | Davranış, dönüşüm |
| [Merchant Center](./merchant-center/README.md) | 📋 Planlandı | Ürün feed, fiyat |

---

## Mimari

```
Buzsu Growth OS (Claude Code / n8n)
    │
    ├── connectors/airtable/     → Leads, Products, Campaigns, KPIs
    ├── connectors/serper/       → SERP snapshot, PAA, AI Overview
    ├── connectors/gsc/          → Organik pozisyon, CTR, impression
    ├── connectors/ga4/          → Kullanıcı davranışı, dönüşüm
    └── connectors/merchant-center/ → Ürün feed, fiyat doğrulama
```

---

## Güvenlik Kuralları

- `.env` veya `.env.local` dosyaları repoya commit edilmez.
- API anahtarları yalnızca Vercel/n8n secret manager'da saklanır.
- Claude Code, connector'ları yalnızca okuma modunda kullanır.
- Yazma işlemleri (Airtable kayıt güncelleme, lead oluşturma) n8n iş akışlarıyla yapılır ve insan onayı gerektirir.
