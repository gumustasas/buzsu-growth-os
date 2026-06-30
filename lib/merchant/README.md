# lib/merchant — Google Merchant Center Data Client

Ürün feed durumu ve fiyat doğrulaması için TypeScript client.  
Mimari belge: [`connectors/merchant-center/README.md`](../../connectors/merchant-center/README.md)

---

## Dosyalar

| Dosya | İçerik |
|-------|--------|
| `client.ts` | `MerchantClient` interface + Mock/Live + fabrika |
| `types.ts` | productStatuses response tipleri |

---

## Kullanım

```ts
import { createMerchantClient } from '@/lib/merchant/client'

const mc = createMerchantClient()
const overview = await mc.getOverview()
```

---

## Environment Variables

```
MERCHANT_CENTER_MERCHANT_ID=
GMC_CLIENT_EMAIL=
GMC_PRIVATE_KEY=
USE_MOCK_DATA=true
ENABLE_MERCHANT=false
```

---

## Live Implementasyon Notu

`LiveMerchantClient` stub. Sprint-4'te Content API for Shopping `productstatuses.list`.  
Fiyat doğrulama: Airtable `Price TRY` ↔ MC `price` karşılaştırması (`priceMismatchCount`).
