# Workflow — merchant-feed-check

**Durum:** Architecture (tanım) · **Öncelik:** P2 · **Yazma:** Bildirim + rapor

---

## Purpose

Google Merchant Center ürün feed'inin sağlığını günlük kontrol eder: onay/ret durumu, hata gerekçeleri ve Airtable fiyatıyla tutarlılık. Shopping görünürlüğünü koruyup fiyat uyuşmazlıklarını yakalar.

## Trigger

- **Tip:** Schedule Trigger
- **Sıklık:** Her gün 09:00 (Europe/Istanbul)

## Inputs

| Girdi | Kaynak |
|-------|--------|
| MC ürün durumları | Merchant Center `productStatuses.list` |
| Airtable referans fiyatları | Airtable Products `Price TRY` |
| SKU eşleştirme | TASK-004 SKU şeması (BZS-*) |

## Outputs

| Çıktı | Hedef |
|-------|-------|
| Feed durum özeti | Dashboard Automation/Products widget cache |
| Ret/hata bildirimi | Slack/email |
| Fiyat uyuşmazlığı listesi | Rapor (outputs/) |

## Connected Systems

- Google Merchant Center (okuma)
- Airtable (okuma — fiyat karşılaştırma; yazma YOK)
- Dashboard webhook (yazma — cache)
- Slack/email (bildirim)

## Failure Handling

- MC auth hatası → anında bildir, durdur.
- SKU eşleşmezse → "eşleşmeyen ürün" raporla (sessiz atlamaz).
- Fiyat farkı tespit edilirse → uyar; **otomatik düzeltme YAPMAZ** (insan kararı).
- Merkezi Error Trigger'a bağlı.

## Retry Policy

| Hata | Retry | Backoff |
|------|-------|---------|
| MC 5xx/timeout | 3 | 2s → 4s → 8s |
| MC 429 | 5 | 30s + jitter |
| Airtable okuma | 3 | 2s → 4s → 8s |

## n8n Node List

1. Schedule Trigger (günlük 09:00)
2. HTTP Request (MC productStatuses.list)
3. Airtable (List — Products, Price TRY + SKU)
4. Code (SKU ile eşleştir, fiyat farkı + ret durumu hesapla)
5. IF (ret VEYA fiyat uyuşmazlığı var mı?)
6. Code (uyuşmazlık raporu üret)
7. HTTP Request (Dashboard webhook)
8. Slack / Send Email (bildirim — IF true dalı)
9. Error Trigger (ayrı workflow)

## Future Implementation

- `lib/merchant` LiveMerchantClient ile aynı productStatuses parse mantığı.
- SKU eşleştirme Airtable SKU alanı dolduğunda (TASK-004) aktive olur.
- Fiyat senkronizasyonu hiçbir zaman otomatik yazmaz — yalnızca tespit + bildirim.
