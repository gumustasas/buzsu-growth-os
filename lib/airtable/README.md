# lib/airtable — Airtable Data Client

Airtable Products tablosu için TypeScript data client.  
Mimari belge: [`connectors/airtable/README.md`](../../connectors/airtable/README.md)

---

## Dosyalar

| Dosya | İçerik |
|-------|--------|
| `client.ts` | `AirtableClient` interface + Mock/Live implementasyon + fabrika |
| `types.ts` | Field ID haritası, ham Airtable response tipleri |

---

## Kullanım

```ts
import { createAirtableClient } from '@/lib/airtable/client'

const airtable = createAirtableClient()        // flag'e göre mock veya live
const overview = await airtable.getProductOverview()
```

---

## Mod Seçimi

| Koşul | Mod |
|-------|-----|
| `USE_MOCK_DATA=true` (varsayılan) | Mock — 5 ürün snapshot |
| `USE_MOCK_DATA=false` + `ENABLE_AIRTABLE=true` | Live (stub — NotImplemented) |

---

## Environment Variables

```
AIRTABLE_API_KEY=          # Personal Access Token (live mod)
AIRTABLE_BASE_ID=apphVqbUQohAMIoWk
USE_MOCK_DATA=true
ENABLE_AIRTABLE=false
```

> API anahtarı repoya yazılmaz. `.env.local` kullanılır.

---

## Live Implementasyon Notu

`LiveAirtableClient` şu an `NotImplemented` fırlatır. Sprint-4'te:

1. `GET https://api.airtable.com/v0/{baseId}/tbldogYQwAQr24UWE`
2. `Authorization: Bearer {apiKey}` header
3. `PRODUCTS_FIELD_IDS` ile alan eşleştirme → `Product` tipine map
4. Okuma yalnızca — yazma insan onayı gerektirir
