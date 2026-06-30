# lib/serper — Serper Data Client

SERP, PAA ve AI Overview verisi için TypeScript client.  
Mimari belge: [`connectors/serper/README.md`](../../connectors/serper/README.md)

---

## Dosyalar

| Dosya | İçerik |
|-------|--------|
| `client.ts` | `SerperClient` interface + Mock/Live + fabrika |
| `types.ts` | Serper API response tipleri, hedef sorgular |

---

## Kullanım

```ts
import { createSerperClient } from '@/lib/serper/client'

const serper = createSerperClient()
const seo = await serper.getSeoOverview()   // SEO widget
const geo = await serper.getGeoOverview()   // GEO widget
```

---

## Environment Variables

```
SERPER_API_KEY=
USE_MOCK_DATA=true
ENABLE_SERPER=false
SERPER_GL=tr
SERPER_HL=tr
```

---

## Live Implementasyon Notu

`LiveSerperClient` şu an stub. Sprint-4'te:

1. `POST https://google.serper.dev/search` — `X-API-KEY` header
2. `TARGET_QUERIES` üzerinde döngü
3. `organic[].domain === buzsu.com.tr` → pozisyon tespiti
4. `peopleAlsoAsk` → PAA kapsama, `answerBox`/`knowledgeGraph` → AI Overview sinyali
