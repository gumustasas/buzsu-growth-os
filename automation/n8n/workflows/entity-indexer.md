# Workflow — entity-indexer

**Durum:** Architecture (tanım) · **Öncelik:** P2 · **Yazma:** KG index (cache)

---

## Purpose

`knowledge-graph/` altındaki entity markdown dosyaları değiştiğinde frontmatter'ı parse edip arama/ilişki indeksini yeniden üretir. Dashboard Entity Graph widget'ı ve KG API için güncel index sağlar.

## Trigger

- **Tip:** Webhook Trigger (GitHub push) + manuel
- **Olay:** `claude/focused-franklin-njbm76` veya main'e `knowledge-graph/**` push'u

## Inputs

| Girdi | Kaynak |
|-------|--------|
| Değişen entity dosyaları | GitHub push webhook payload |
| Frontmatter şeması | `types/entity` EntityFrontmatter |

## Outputs

| Çıktı | Hedef |
|-------|-------|
| Güncel entity index | KG index cache |
| Entity sayım özeti (byType) | Dashboard EntityGraph cache |
| İlişki grafiği (edges) | KG relations cache |

## Connected Systems

- GitHub (okuma — webhook + içerik)
- KG index cache (yazma)
- Dashboard webhook (yazma — cache)

## Failure Handling

- Frontmatter parse hatası → o dosyayı atla, hatayı raporla (index'i bozmadan).
- Tanımsız related_entities referansı → uyar, edge'i atla.
- Merkezi Error Trigger'a bağlı.

## Retry Policy

| Hata | Retry | Backoff |
|------|-------|---------|
| GitHub API 5xx | 3 | 2s → 4s → 8s |
| GitHub 429 | 5 | 30s + jitter |
| Cache yazma | 3 | 2s → 4s → 8s |

## n8n Node List

1. Webhook Trigger (GitHub push, `knowledge-graph/**` filtresi)
2. GitHub (değişen dosya içeriklerini al)
3. Code (gray-matter benzeri frontmatter parse)
4. Code (byType sayımı + related_entities → edge listesi)
5. HTTP Request (KG index cache yaz)
6. HTTP Request (Dashboard webhook)
7. Error Trigger (ayrı workflow)

## Future Implementation

- `knowledge-graph/api` index.ts ile aynı şema (statik gömülü → cache'e taşınır).
- Sprint-6'da `lib` tarafı filesystem okuması (gray-matter) ile birleşir.
- 150–200 entity hedefine ulaşıldığında index boyutu için sayfalama eklenir.

## Sprint-7.3 — EntityExporter Bağlantısı

Bu workflow'un ürettiği index'in **kanonik kaynağı** artık `services/entity-service/`
içindeki `EntityExporter`'dır. Node 3 (frontmatter parse) ve Node 4 (byType sayımı +
edge listesi) sıfırdan implemente edilmek yerine, bir build adımı
`EntityService.exportToFile(...)` çağırıp `entities.index.json` üretir; workflow bu düz
JSON'u okuyup cache'e yazar.

**Üretilen format** (`services/entity-service/README.md` → "entities.index.json Formatı"):
`meta`, `entities`, `indexes` (byId/bySlug/byCategory/byType/byAlias/byUrl), `edges`,
`dependents` (ters bağımlılık), `stats`. Düz ve dilden bağımsız — CI3/PHP `json_decode`
ve n8n Code node doğrudan okur.

**Not:** `entities.index.json` türetilmiş artefakttır; repoya commit edilmez. Bu workflow
(veya bir CI build adımı) çalışma zamanında üretir.
