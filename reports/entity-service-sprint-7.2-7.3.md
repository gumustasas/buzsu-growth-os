# Sprint-7.2 + 7.3 Raporu — Entity Index + Exporter

**Tarih:** 2026-07-02
**Branch:** `feat/entity-index-exporter`
**Kapsam:** `services/entity-service/` mimarisini indexed lookup + JSON exporter seviyesine çıkarmak.
**Kaynak:** `reports/entity-service-review.md` Bölüm 3 (EntityIndex "en kritik eksik", EntityExporter "yok") ve Bölüm 4 (bulgu #3, #5, #6).

---

## 1. Yönetici Özeti

İki eksik bileşen eklendi ve mevcut sorgular bunlara bağlandı:

- **`EntityIndex` (Sprint-7.2):** `reload()` başına bir kez kurulan, önceden hesaplanmış lookup yapısı — `byId`, `bySlug`, `byCategory`, `byType`, `byAlias`, `byUrl` ve ters bağımlılık (`getDependents`). Repository/Resolver/Search artık her sorguda `getAll().filter()` yapmıyor.
- **`EntityExporter` (Sprint-7.3):** Knowledge Graph'ı tek düz JSON'a (`entities.index.json`) aktarır; CI3/PHP (`json_decode`) ve n8n (`entity-indexer`) tarafından doğrudan okunabilir.

**Public API kırılmadı** — yalnızca additive metotlar eklendi (`getByUrl`, `getDependents`, `export`, `exportToFile`). Mevcut tüm imzalar korundu.

**Doğrulama:** 32 test geçti (8 eski + 24 yeni), `tsc --noEmit --strict` sıfır hata, gerçek KG'de 39/39 entity + 115 edge + 0 kırık ilişki, JSON hem Node hem Python (`json.load`) ile geçerli.

---

## 2. EntityIndex

`services/entity-service/EntityIndex.ts` — salt-okunur, immutable. `Entity[]`'den tek geçişte kurulur:

| Lookup | Tip | Karmaşıklık |
|--------|-----|-------------|
| `byId(id)` | `Entity \| undefined` | O(1) |
| `bySlug(slug)` | `Entity[]` (çakışma olabilir) | O(1) |
| `byCategory(cat)` | `Entity[]` | O(1) |
| `byType(type)` | `Entity[]` | O(1) |
| `byAlias(alias)` | `Entity[]` (normalize edilmiş ad/alias) | O(1) |
| `byUrl(url)` | `Entity \| undefined` | O(1) |
| `getDependents(id)` | `Entity[]` (reverse edge) | O(1) |
| `searchDocs()` | `SearchDoc[]` (önceden normalize haystack) | O(1) erişim |

**Ters bağımlılık:** `A → B` (related_entities) kenarı için `B`'nin dependents listesine `A` eklenir. Yalnızca çözülebilen (depoda var olan) hedefler dikkate alınır — kırık referanslar `getBrokenRelations()` ile ayrıca raporlanır.

## 3. Index'e Bağlanan Sorgular

| Metod | Önce | Sonra |
|-------|------|-------|
| `Repository.getByType/getByCategory/getByStatus` | `getAll().filter()` O(n) | `index.*` O(1) |
| `Repository.query` | tam tarama | en seçici index'ten başla + filtre |
| `Resolver.resolveBySlug` | O(n) `find` | `index.bySlug()` O(1) |
| `Resolver.resolveByUrl` | O(n) `find` | `index.byUrl()` O(1) |
| `Relations.getDependents` | **yoktu** | `index.getDependents()` O(1) |
| `Search.search` | her çağrıda haystack yeniden kurulur | `index.searchDocs()` (önceden hesaplanmış) |

`Search` semantiği (substring) **korundu** — davranış değişmedi, yalnızca haystack tekrar tekrar kurulmuyor.

## 4. EntityExporter

`services/entity-service/EntityExporter.ts` → `buildDoc()`, `toJSON()`, `writeToFile(path)`.

`entities.index.json` yapısı (düz, dilden bağımsız):

```
{
  "meta":       { generatedAt, schemaVersion, entityCount, source },
  "entities":   [ { id, category, slug, type, status, name_tr, name_en,
                    aliases, buzsu_url, suvesu_url, related } ],
  "indexes":    { byId:{id→int}, bySlug:{slug→[id]}, byCategory:{cat→[id]},
                  byType:{type→[id]}, byAlias:{alias→[id]}, byUrl:{url→id} },
  "edges":      [ { from, to, type } ],
  "dependents": { id → [id] },
  "stats":      { total, edgeCount, brokenRelations, byType, byStatus, byCategory }
}
```

**PHP/n8n uyumu:** tüm index değerleri string id dizisi veya id→int; iç içe nesne referansı yok. `byId` PHP assoc array (id→int) olarak `entities` dizisine indeksler.

**Gerçek KG çıktısı (39 entity):** 115 edge, 28 dependent anahtarı, 0 kırık ilişki. En bağımlı: `technologies/ters-osmoz` (17), `components/ters-osmoz-membran` (12), `technologies/su-filtrasyonu` (11).

**Artefakt politikası:** `entities.index.json` türetilmiştir, **repoya commit edilmez**. `entity-indexer` n8n workflow'u veya bir build adımı üretir (bkz. `automation/n8n/workflows/entity-indexer.md`).

## 5. Testler

`services/entity-service/EntityService.test.ts` (yeni, 24 test) + `EntityLoader.test.ts` (mevcut 8 test, bozulmadı):

- **A) İzole fixture (deterministik):** index lookuplar (byId/bySlug/byCategory/byType/byAlias/byUrl), `getDependents` (bilinen ters kenarlar), search alias/slug/name + tip filtresi, exporter → geçici dosya → `JSON.parse` geçerliliği + tam yapı + stats sayımları.
- **B) Gerçek `knowledge-graph/` smoke (repo kökünden):** 0 ayrıştırma hatası, ≥39 entity, `problems/` + `standards/` dahil, export `entityCount` = health toplamı.

> "39/39" testi `≥ 39` olarak yazıldı (`=== 39` değil): Sprint-7/8 entity eklemeye devam edecek; committed bir testi değişken veri sayısına kilitlemek her meşru eklemede testi kırar. Gerçek "hiçbir şey düşmedi" garantisi `errors.length === 0` + problems/standards varlığı ile sağlanır.

## 6. Kurallara Uyum

- Yalnızca `services/entity-service/`, `reports/`, `automation/n8n/workflows/entity-indexer.md` değişti.
- PHP/CI3 kodu yazılmadı; SQLite eklenmedi; yeni npm bağımlılığı yok.
- Public API kırılmadı (additive).
- `main`'e doğrudan push yok — bu branch (`feat/entity-index-exporter`) üzerinden PR açılacak.

## 7. Risk Analizi

| Risk | Olasılık | Etki | Azaltma |
|------|----------|------|---------|
| Smoke testi `≥39` esnek; gelecekte bir düşüşü (regresyon) yakalamayabilir | Düşük | Orta | `errors.length===0` + kategori varlık kontrolü asıl "düşme" garantisini verir; kesin sayım için ileride `entities.index.json` snapshot diff'i eklenebilir |
| `entities.index.json` commit edilmediğinden CI3/n8n tarafı henüz gerçek dosyayı görmüyor | Kesin (tasarım) | Düşük | Üretim `entity-indexer` workflow'u / build adımına bırakıldı; bu sprint yalnızca üreticiyi sağlar |
| `search()` hâlâ O(n) substring | Düşük | Düşük (39–500'de önemsiz) | Exact lookup için `byAlias` O(1) mevcut; 2000+ için ileride token/prefix index |
| `knowledge-graph/api/` (eski mock katman) hâlâ paralel duruyor | Orta | Düşük | Ayrı MINOR karar (README "Sonraki Adımlar"); bu sprintte dokunulmadı |
| Node tip tanımları (`@types/node`) repoda kurulu değil | Kesin | Yok | Kod yalnızca standart `fs`/`path`/`os` kullanır; tip kontrolü yerel shim ile doğrulandı, çalışma zamanında Node bunları sağlar |

**Merge önerisi:** Düşük riskli, tamamen additive, testler yeşil. PR açılıp merge edilebilir.

---

*Rapor: Sprint-7.2 + 7.3 — Entity Index + Exporter — 2026-07-02*
