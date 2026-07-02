# Entity Service

Knowledge Graph için programatik erişim katmanı. `knowledge-graph/` altındaki
`.md` entity dosyalarını okur, ayrıştırır ve sorgulanabilir hale getirir.

**Sprint:** 7.1 (mimari — çalıştırılabilir kod, canlı sisteme bağlı değil).
**Kapsam:** Yalnızca mimari, interface ve veri akışı. Yeni npm bağımlılığı yok, PHP/CI3 yok, canlı yayın yok.

---

## Neden Ayrı Bir Katman?

`knowledge-graph/api/` (Sprint-2/3) entity'leri elle yazılmış, sabit bir
JavaScript dizisi olarak tutar — hızlı ama dosya değişikliklerini yansıtmaz.
`services/entity-service/` bunun yerine dosya sistemini gerçekten okur; bu,
`knowledge-graph/api/index.ts` içinde belirtilen "Sprint-4'te gray-matter ile
eklenecek" notunun karşılığıdır. İki katman şu an paralel var olabilir;
dashboard'un hangisine bağlanacağı ayrı bir karardır (bkz. Sonraki Adımlar).

---

## Bileşenler

| Bileşen | Sorumluluk |
|---------|-----------|
| `EntityLoader` | Dosya sistemi okuma — `.md` dosyasını frontmatter + gövdeye ayrıştırır |
| `EntityIndex` | **(Sprint-7.2)** Önceden hesaplanmış lookuplar: `byId`, `bySlug`, `byCategory`, `byType`, `byAlias`, `byUrl` + ters bağımlılık (`getDependents`) + arama belgeleri. Repository `reload()` başına bir kez kurar |
| `EntityRepository` | Bellek-içi depo — `EntityIndex` üzerinden O(1) sorgular (id, tip, durum, kategori) |
| `EntityResolver` | Kimlik çözümleme — id/slug/URL → `Entity` (index destekli); `related_entities` referanslarını çözer |
| `EntityRelations` | İlişki grafiği — `getRelated` (outgoing), `getDependents` (incoming/reverse), kenar listesi, kırık ilişki tespiti, en bağlantılı entity'ler |
| `EntitySearch` | Metin arama — index'in önceden hesaplanmış belgeleri üzerinde normalize edilmiş substring eşleştirme |
| `EntityValidator` | Bütünlük denetimi — zorunlu alan, ilişki çözünürlüğü, `published` şartları |
| `EntityExporter` | **(Sprint-7.3)** Knowledge Graph'ı tek düz JSON'a (`entities.index.json`) aktarır — CI3/PHP ve n8n tarafından okunabilir |

Her bileşen kendi arayüzünü (`interface`) dışa verir; somut sınıflar (`FilesystemEntityLoader`,
`InMemoryEntityRepository`, vb.) değiştirilebilir — örn. ileride bir `CachedEntityRepository`
veya `RemoteEntityLoader` eklenirse mevcut bileşenler etkilenmez.

---

## Veri Akışı

```
knowledge-graph/<kategori>/*.md
        │  fs.readdirSync + fs.readFileSync
        ▼
EntityLoader.loadAll()  → { entities: Entity[], errors: LoadError[] }
        │
        ▼
EntityRepository  →  EntityIndex (byId/bySlug/byCategory/byType/byAlias/byUrl + dependents)
        │
        ├── EntityResolver     → id / slug / url ile O(1) tekil erişim
        ├── EntityRelations    → getRelated (outgoing) + getDependents (reverse)
        ├── EntitySearch       → önceden hesaplanmış belgeler üzerinde substring arama
        ├── EntityValidator    → zorunlu alan + ilişki + yayın şartı kontrolü
        └── EntityExporter     → entities.index.json (entities + indexes + edges + dependents + stats)
        │
        ▼
EntityService (facade)  → getEntity, getBySlug, getByType, getByCategory, getByUrl,
                          getRelated, getDependents, search, validate, getHealth,
                          export, exportToFile
```

---

## Kullanım

```ts
import { getEntityService } from 'services/entity-service'

const service = getEntityService()

service.getEntity('products/code-su-aritma-cihazi')   // tam id
service.getBySlug('code-su-aritma-cihazi')             // kategori öneki olmadan
service.getByType('Product')                           // tipe göre liste
service.getByCategory('problems')                      // kategoriye göre liste
service.getByUrl('https://www.buzsu.com.tr/...')       // buzsu_url/suvesu_url ile
service.getRelated('technologies/ters-osmoz')          // ilişkili (outgoing)
service.getDependents('technologies/ters-osmoz')       // ona bağımlı (reverse)
service.search('ters osmoz', { type: 'Technology' })   // metin arama + filtre
service.validate('products/code-su-aritma-cihazi')     // tekil doğrulama
service.getHealth()                                    // özet: toplam, durum, kırık ilişki

// Dışa aktarım — CI3/PHP + n8n için düz JSON
const doc = service.export()                           // EntityExportDoc nesnesi
service.exportToFile('build/entities.index.json')      // dosyaya yaz
```

## entities.index.json Formatı

`export()` / `exportToFile()` düz, dilden bağımsız bir JSON üretir (PHP `json_decode`,
n8n Code node doğrudan okur):

```
{
  "meta":       { generatedAt, schemaVersion, entityCount, source },
  "entities":   [ { id, category, slug, type, status, name_tr, name_en, aliases,
                    buzsu_url, suvesu_url, related } ],
  "indexes":    { byId:{id→int}, bySlug:{slug→[id]}, byCategory:{cat→[id]},
                  byType:{type→[id]}, byAlias:{alias→[id]}, byUrl:{url→id} },
  "edges":      [ { from, to, type } ],
  "dependents": { id → [id] },        // ters bağımlılık
  "stats":      { total, edgeCount, brokenRelations, byType, byStatus, byCategory }
}
```

> Not: Bu dosya bir **türetilmiş artefakt**tır; repoya commit edilmez. `entity-indexer`
> n8n workflow'u veya bir build adımı tarafından üretilir (bkz.
> `automation/n8n/workflows/entity-indexer.md`).

---

## Kimlik Kuralları

- **id:** Kategori önekli, uzantısız yol — `products/code-su-aritma-cihazi`. Depo anahtarı budur.
- **slug:** Son segment — `code-su-aritma-cihazi`. `getBySlug()` kategoriyi bilmeden arar; birden fazla
  kategoride aynı slug varsa ilk eşleşen döner (şu an 10 seed entity'de çakışma yok).
- Entity dosyalarındaki `related_entities` alanı `.md` uzantısıyla yazılır (örn. `technologies/ters-osmoz.md`);
  `EntityLoader` bunu ayrıştırırken uzantıyı kaldırıp entity `id` formatına normalize eder.

---

## Bilinen Sınırlar

- `parseFrontmatter()` genel amaçlı bir YAML parser değildir; yalnızca bu repodaki entity dosyalarının
  kullandığı alt kümeyi (scalar, inline `[a, b]` dizisi, çok satırlı `- item` dizisi) çözer.
  Yeni bir YAML deseni (iç içe obje, çok satırlı string vb.) eklenirse parser genişletilmelidir.
- Depo tek seferlik `reload()` ile yüklenir; dosya izleme (watch) yoktur.
- **[Sprint-7.1 P0 — düzeltildi]** Kategori keşfi dinamik: `FilesystemEntityLoader.discoverCategories()`
  `knowledge-graph/` kök dizinini tarar (gizli klasörler ve `api/` hariç). Bkz. `EntityLoader.test.ts`.
- **[Sprint-7.2/7.3 — eklendi]** `EntityIndex` (indexed lookups + reverse dependency) ve
  `EntityExporter` (`entities.index.json`) eklendi; `reports/entity-service-review.md` Bölüm 3'teki
  "en kritik eksik" (EntityIndex) ve "EntityExporter yok" bulguları kapatıldı. Bkz. `EntityService.test.ts`.
- `search()` substring taraması hâlâ O(n)'dir (index haystack'leri önceden hesaplar ama tarama tam metin
  üzerinde çalışır). Exact ad/alias lookup için `EntityIndex.byAlias()` O(1)'dir.

## Sonraki Adımlar (Sprint 7.4+, insan onayı gerekir)

- `knowledge-graph/api/` (Sprint-2/3 mock katmanı) ile ilişki: dashboard'un hangi katmana bağlanacağı (MINOR).
- `entity-indexer` n8n workflow'unun `EntityExporter` çıktısını üretecek şekilde uygulanması.
- Dosya değişikliği tetiklemeli otomatik `reload()`.
- `EntityValidator` çıktısının `outputs/reports/` altına otomatik rapor olarak yazılması.
