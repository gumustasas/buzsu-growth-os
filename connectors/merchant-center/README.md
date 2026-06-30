# Connector — Google Merchant Center

## Amaç

Buzsu ürünlerinin Google Merchant Center'daki feed durumunu, onay/ret gerekçelerini ve Shopping SERP görünürlüğünü izler.  
Product Schema ve Airtable ürün verisiyle tutarlılığı doğrular.

---

## Environment Variables

```
MERCHANT_CENTER_MERCHANT_ID=    # MC Merchant ID
GMC_CLIENT_EMAIL=               # Google service account email
GMC_PRIVATE_KEY=                # Service account private key
```

---

## Veri Kaynakları

| Endpoint | Veri | Kullanım |
|----------|------|---------|
| `products.list` | Ürün feed durumu | Onay / ret takibi |
| `products.get` | Tek ürün detayı | Fiyat doğrulama |
| `productStatuses.list` | Hata ve uyarılar | Feed kalitesi |
| `reports.search` (Performance) | Gösterim, tıklama | Shopping SERP performansı |

---

## Ürün Eşleştirme

| Airtable Ürünü | SKU (Önerilen) | MC Product ID |
|----------------|----------------|---------------|
| 5 Aşamalı RO | `BZS-RO5-001` | *(eşleştirilecek)* |
| Atıksız Su Arıtma | `BZS-ATK-002` | *(eşleştirilecek)* |
| 7 Aşamalı RO UV | `BZS-RO7-003` | *(eşleştirilecek)* |
| Dijital TDS Metre | `BZS-TDS-004` | *(eşleştirilecek)* |
| Yıllık Filtre Seti | `BZS-FLT-005` | *(eşleştirilecek)* |

---

## Kullanım Senaryoları

1. **schema-agent:** Ürün fiyatı Product Schema'daki `price` ile Merchant Center'daki `price` tutarlı mı?
2. **automation-agent:** Ret edilen ürün varsa Airtable'a not düş, insan bilgilendir
3. **cro-agent:** Shopping tıklama oranı düşükse başlık/görsel revizyonu öner
4. **seo-agent:** Product Schema aktif olduğunda Shopping rich result impression izle

---

## n8n Bağlantısı

```
Trigger: Zamanlanmış (Salı 09:00)
Node 1: GMC API → productStatuses.list (hatalı ürünler)
Node 2: Koşul: hata varsa → Airtable'a "MC Error" not ekle
Node 3: Bildirim → Slack/email "MC feed hatası tespit edildi"
```

---

## Claude Agent Kullanımı

GMC için resmi MCP tool henüz yok.  
Veriler n8n → Airtable → Claude Code zinciriyle okunur.  
Fiyat doğrulaması: Airtable `Price TRY` ↔ GMC `price` karşılaştırması (n8n formül node).
