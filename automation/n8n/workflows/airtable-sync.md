# Workflow — airtable-sync

**Durum:** Architecture (tanım) · **Öncelik:** P1 · **Yazma:** Dashboard cache (Airtable okuma)

---

## Purpose

Airtable Products ve Weekly KPIs tablolarını periyodik olarak okuyup dashboard cache katmanına push eder. Dashboard'un Airtable'a her istekte gitmeden güncel veriyle çalışmasını sağlar.

## Trigger

- **Tip:** Schedule Trigger
- **Sıklık:** Her 6 saatte bir

## Inputs

| Girdi | Kaynak |
|-------|--------|
| Products tablosu | Airtable `tbldogYQwAQr24UWE` |
| Weekly KPIs | Airtable `tblaKmlTJvNeHJC6L` |
| Field eşleştirme | `lib/airtable/types` PRODUCTS_FIELD_IDS |

## Outputs

| Çıktı | Hedef |
|-------|-------|
| Normalize edilmiş ürün listesi | Dashboard cache (Products widget) |
| Güncel KPI özeti | Dashboard cache (metrics) |

## Connected Systems

- Airtable (okuma — yazma YOK)
- Dashboard webhook (yazma — cache)

## Failure Handling

- Airtable okuma hatası → eski cache korunur (stale-while-error), bildir.
- Field eksikse (örn. SKU henüz yok) → null ile geç, dashboard'da "eksik" göster.
- Merkezi Error Trigger'a bağlı.

## Retry Policy

| Hata | Retry | Backoff |
|------|-------|---------|
| Airtable 5xx/timeout | 3 | 2s → 4s → 8s |
| Airtable 429 | 5 | 30s + jitter |
| Dashboard webhook hatası | 3 | 2s → 4s → 8s |

## n8n Node List

1. Schedule Trigger (her 6 saat)
2. Airtable (List — Products)
3. Airtable (List — Weekly KPIs, bu haftanın kaydı)
4. Code (PRODUCTS_FIELD_IDS ile normalize → Product tipine map)
5. Merge (products + kpi)
6. HTTP Request (Dashboard webhook, secret header)
7. Error Trigger (ayrı workflow)

## Future Implementation

- Yalnızca okuma — bu workflow Airtable'a hiçbir zaman yazmaz (CLAUDE.md güvenli).
- `lib/airtable` LiveAirtableClient ile aynı normalize mantığı.
- Cache hedefi: dashboard edge route veya KV store (Sprint-6'da netleşir).
