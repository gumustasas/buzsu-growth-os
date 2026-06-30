# Connector — Google Analytics 4

## Amaç

Buzsu.com.tr kullanıcı davranışı, dönüşüm hunisi ve WhatsApp lead tıklama verilerini GA4 API üzerinden çekerek CRO ve otomasyon kararlarına gerçek veri sağlar.

---

## Environment Variables

```
GA4_PROPERTY_ID=         # GA4 Property ID (örn: 123456789)
GA4_CLIENT_EMAIL=        # Google service account email
GA4_PRIVATE_KEY=         # Service account private key
```

---

## Veri Kaynakları

| Rapor | Metrik | Kullanım |
|-------|--------|---------|
| `runReport` | Sessions, users, bounce rate | Genel trafik |
| `runReport` (event) | `click` (WhatsApp CTA) | WhatsApp dönüşüm |
| `runReport` (event) | `page_view` per URL | Ürün sayfası popülerliği |
| `runFunnelReport` | Ürün sayfası → WhatsApp | Dönüşüm hunisi |
| `runRealtimeReport` | Anlık kullanıcı | Kampanya anlık izleme |

---

## Hedef Metrikler

- `/su-aritma-cihazlari/` oturumu (hedef: +%20 MoM)
- WhatsApp CTA tıklama oranı (hedef: >%8)
- Ürün sayfası → Teklif alıyorum dönüşümü
- Mobil oturum payı (hedef: >%65)

---

## Kullanım Senaryoları

1. **cro-agent:** WhatsApp CTA tıklama oranı düşükse kopya değişikliği öner
2. **content-agent:** En çok okunan blog yazılarını tespit → internal linking önerisi
3. **automation-agent:** Haftalık oturum verisi → Airtable KPI tablosuna yaz
4. **commerce-agent:** Ürün sayfası çıkma oranı yüksekse fiyat/CTA revizyon sinyali

---

## n8n Bağlantısı

```
Trigger: Zamanlanmış (Pazartesi 07:30)
Node 1: GA4 Data API → runReport (son 7 gün)
Node 2: WhatsApp tıklama event count çek
Node 3: Airtable Write → Weekly KPIs (Buzsu Sessions, Conversion Rate)
Node 4: Dashboard push → CRO widget
```

---

## Claude Agent Kullanımı

GA4 için resmi MCP tool henüz yok. Veriler n8n → Airtable → Claude Code zinciriyle okunur.  
Gelecekte `google-analytics` MCP entegrasyonu planlanmaktadır.
