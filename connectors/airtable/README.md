# Connector — Airtable

## Amaç

Buzsu CRM verilerini (Ürünler, Lead'ler, Kampanyalar, KPI'lar) Growth OS'a taşır.  
Claude Code ve n8n için okuma bağlantısı. **Yazma işlemleri insan onayı gerektirir.**

---

## Environment Variables

```
AIRTABLE_API_KEY=          # Personal Access Token (pat...)
AIRTABLE_BASE_ID=apphVqbUQohAMIoWk
```

---

## Tablolar ve Field ID'leri

### Products (`tbldogYQwAQr24UWE`)

| Alan | Field ID | Tip |
|------|----------|-----|
| Product Name | `fldXLw08VVVF8Aquz` | singleLineText |
| Category | `fldLXUPLXEO2HHFK9` | singleSelect |
| Price TRY | `fldEds5Vy1frHlw3e` | currency |
| Buzsu URL | `fldOZXnwqNzgddMxj` | url |
| Suvesu Article | `fldtwQlkCIWyljJdW` | url |
| Active | `fldOjYbJvwIvEMPNs` | checkbox |
| Notes | `fldmnDYpfEoJX5P0Y` | multilineText |
| SKU | — | singleLineText *(eklenecek)* |
| Image URL | — | url *(eklenecek)* |
| Schema Description | — | multilineText *(eklenecek)* |

### Leads (`tblsBQkMOMyi5yc1n`)

| Alan | Field ID | Tip |
|------|----------|-----|
| Name | `fldbeBIkPq3zfuIGY` | singleLineText |
| Phone | `fldyojqHa7d0Rhpxb` | phoneNumber |
| Source | `fldiI1Rq2A9Rb4F8A` | singleSelect |
| Product Interest | `fldBMhqojPA7llfju` | multipleSelects |
| Lead Stage | `fldoObCW7edoT5Vgt` | singleSelect |
| Score | `fldxgvO88TPhaOmRt` | formula |

> PII (telefon, isim) outputs/ veya dashboard'a yazılmaz. Yalnızca aggregate skorlar gösterilir.

---

## Veri Kaynakları

- **Ürün envanteri:** 5 aktif ürün (RO5, ATK, RO7, TDS Metre, Filtre Seti)
- **Fiyat verisi:** Anlık TRY fiyatı (günlük senkronizasyon hedefi)
- **Lead skoru:** 0–10 arasında formül bazlı
- **KPI:** Haftalık lead, gelir, konversiyon hedefi

---

## Kullanım Senaryoları

1. **Schema agent:** Product JSON-LD için ürün adı, fiyat ve URL çekme
2. **Commerce agent:** Ürün bilgisi sorgulama (WhatsApp handoff için)
3. **Automation agent:** Haftalık KPI raporu oluşturma
4. **Dashboard:** Ürün kartları ve lead özeti widget'ları

---

## n8n Bağlantısı

```
Trigger: Zamanlanmış (her 6 saat)
Node 1: Airtable List Records → Products
Node 2: Airtable List Records → KPI (bu haftanın kaydı)
Node 3: Dashboard webhook → veriyi push et
```

n8n workflow dosyası: `workflows/airtable-sync.json` *(oluşturulacak)*

---

## Claude Agent Kullanımı

```
mcp__Airtable__list_records_for_table
  baseId: apphVqbUQohAMIoWk
  tableId: tbldogYQwAQr24UWE
  fieldIds: [fldXLw08VVVF8Aquz, fldEds5Vy1frHlw3e, fldOZXnwqNzgddMxj]
```

Okuma izni: ✅  
Yazma izni: ❌ (insan onayı olmadan)
