# lib/gsc — Google Search Console Data Client

Organik arama performansı (pozisyon, CTR, impression) için TypeScript client.  
Mimari belge: [`connectors/gsc/README.md`](../../connectors/gsc/README.md)

---

## Dosyalar

| Dosya | İçerik |
|-------|--------|
| `client.ts` | `GscClient` interface + Mock/Live + fabrika |
| `types.ts` | searchAnalytics response tipleri, site/hedef URL |

---

## Kullanım

```ts
import { createGscClient } from '@/lib/gsc/client'

const gsc = createGscClient()
const top = await gsc.getTopQueries(10)
const pos = await gsc.getTargetPagePosition()
```

---

## Environment Variables

```
GSC_CLIENT_EMAIL=
GSC_PRIVATE_KEY=
GSC_SITE_URL=https://www.buzsu.com.tr/
USE_MOCK_DATA=true
ENABLE_GSC=false
```

---

## Live Implementasyon Notu

`LiveGscClient` stub. Sprint-4'te service account JWT ile `searchAnalytics.query` çağrısı.  
GSC'nin resmi MCP tool'u yok → alternatif olarak n8n → Airtable pipeline ile de beslenebilir.
