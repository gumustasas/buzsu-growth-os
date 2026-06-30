# lib/ga4 — Google Analytics 4 Data Client

Kullanıcı davranışı ve WhatsApp dönüşüm verisi için TypeScript client.  
Mimari belge: [`connectors/ga4/README.md`](../../connectors/ga4/README.md)

---

## Dosyalar

| Dosya | İçerik |
|-------|--------|
| `client.ts` | `Ga4Client` interface + Mock/Live + fabrika |
| `types.ts` | runReport response tipleri, WhatsApp event adı |

---

## Kullanım

```ts
import { createGa4Client } from '@/lib/ga4/client'

const ga4 = createGa4Client()
const overview = await ga4.getOverview()
```

---

## Environment Variables

```
GA4_PROPERTY_ID=
GA4_CLIENT_EMAIL=
GA4_PRIVATE_KEY=
USE_MOCK_DATA=true
ENABLE_GA4=false
```

---

## Live Implementasyon Notu

`LiveGa4Client` stub. Sprint-4'te GA4 Data API `runReport` ile sessions/users/pagePath ve `whatsapp_click` event sayımı.
