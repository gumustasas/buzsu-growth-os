# Workflow — whatsapp-lead

**Durum:** Architecture (tanım) · **Öncelik:** P0 · **Yazma:** Airtable Leads (insan onaylı production)

---

## Purpose

WhatsApp / web form üzerinden gelen lead'leri yakalar, ürün ilgisini ve kaynağı sınıflandırır, Airtable Leads tablosuna kaydeder ve lead scoring'i tetikler. Growth OS'nin gelir hattının ilk halkası.

> **KRİTİK:** Bu workflow PII (telefon, isim) işler. Veri yalnızca Airtable Leads'te kalır; dashboard/rapora/loglara yazılmaz (CLAUDE.md güvenlik kuralı).

## Trigger

- **Tip:** Webhook Trigger
- **Kaynak:** WhatsApp Business API webhook veya site form POST'u

## Inputs

| Girdi | Kaynak |
|-------|--------|
| İsim, telefon | Webhook payload (PII) |
| Mesaj / ürün ilgisi | Webhook payload |
| Kaynak (WA / form / Suvesu) | Webhook payload veya UTM |

## Outputs

| Çıktı | Hedef |
|-------|-------|
| Yeni lead kaydı | Airtable Leads `tblsBQkMOMyi5yc1n` |
| Lead Stage = "New" | Airtable |
| Product Interest (sınıflandırılmış) | Airtable multipleSelects |
| Bildirim (PII'siz özet) | Slack/email ("yeni lead: kaynak X, ürün Y") |

## Connected Systems

- WhatsApp Business API / site form (okuma — webhook)
- Airtable (yazma — Leads; **insan onaylı production**)
- Slack/email (bildirim — PII maskelenmiş)

## Failure Handling

- Airtable yazma hatası → lead'i **fallback kuyruğa** al (kayıp önleme), tekrar dene, insan bilgilendir.
- Eksik telefon → "geçersiz lead" işaretle, yazma, raporla.
- Duplicate telefon → mevcut kaydı güncelle (yeni kayıt açma).
- Merkezi Error Trigger + kritik kanal bildirimi.

## Retry Policy

| Hata | Retry | Backoff |
|------|-------|---------|
| Airtable 5xx/timeout | 5 | 2s → 4s → 8s → 16s → 32s |
| Airtable 429 | 5 | 30s + jitter |
| Airtable auth (401/403) | 0 | anında kritik bildirim |

## n8n Node List

1. Webhook Trigger (WA/form POST)
2. Code (payload doğrula, PII alanlarını ayır)
3. IF (geçerli telefon var mı?)
4. Code (mapProductCategory + mapIntent — Faz 2 mantığı)
5. Airtable (Search — duplicate telefon kontrolü)
6. IF (duplicate?) → Airtable Update / Airtable Create
7. Set (PII'siz bildirim özeti üret)
8. Slack / Send Email (bildirim)
9. Respond to Webhook (200)
10. Error Trigger + Fallback (Airtable hata kuyruğu)

## Future Implementation

- Faz 2'deki `mapProductCategory()` / `mapIntent()` mantığı n8n Code node'una taşınır.
- Lead scoring formülü zaten Airtable tarafında (Score formula field) — yazma sonrası otomatik hesaplanır.
- **Production'a alma MAJOR sınıf** (dış sistem yazma) → açık insan onayı gerekir.
- WhatsApp handoff URL'leri ürüne özel `text=` parametresiyle zenginleştirilir (CRO görevi).
