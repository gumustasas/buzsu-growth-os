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
| `EntityRepository` | Bellek-içi depo — yüklenmiş `Entity[]` üzerinde temel sorgular (id, tip, durum, kategori) |
| `EntityResolver` | Kimlik çözümleme — id/slug/URL → `Entity`; `related_entities` referanslarını çözer |
| `EntityRelations` | İlişki grafiği — `getRelated`, kenar listesi, kırık ilişki tespiti, en bağlantılı entity'ler |
| `EntitySearch` | Metin arama — ad/alias/id üzerinde normalize edilmiş eşleştirme |
| `EntityValidator` | Bütünlük denetimi — zorunlu alan, ilişki çözünürlüğü, `published` şartları |

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
EntityRepository  (Map<id, Entity> — bellek-içi)
        │
        ├── EntityResolver     → id / slug / url ile tekil erişim
        ├── EntityRelations    → related_entities → ilişki grafiği
        ├── EntitySearch       → ad/alias metin araması
        └── EntityValidator    → zorunlu alan + ilişki + yayın şartı kontrolü
        │
        ▼
EntityService (facade)  → getEntity, getBySlug, getByType, getRelated, search, validate
```

---

## Kullanım

```ts
import { getEntityService } from 'services/entity-service'

const service = getEntityService()

service.getEntity('products/code-su-aritma-cihazi')   // tam id
service.getBySlug('code-su-aritma-cihazi')             // kategori öneki olmadan
service.getByType('Product')                           // tipe göre liste
service.getRelated('technologies/ters-osmoz')          // ilişkili entity'ler
service.search('ters osmoz', { type: 'Technology' })   // metin arama + filtre
service.validate('products/code-su-aritma-cihazi')     // tekil doğrulama
service.validate()                                     // tüm depoyu doğrula
service.getHealth()                                    // özet: toplam, durum, kırık ilişki
```

---

## Kimlik Kuralları

- **id:** Kategori önekli, uzantısız yol — `products/code-su-aritma-cihazi`. Depo anahtarı budur.
- **slug:** Son segment — `code-su-aritma-cihazi`. `getBySlug()` kategoriyi bilmeden arar; birden fazla
  kategoride aynı slug varsa ilk eşleşen döner (şu an 10 seed entity'de çakışma yok).
- Entity dosyalarındaki `related_entities` alanı `.md` uzantısıyla yazılır (örn. `technologies/ters-osmoz.md`);
  `EntityLoader` bunu ayrıştırırken uzantıyı kaldırıp entity `id` formatına normalize eder.

---

## Bilinen Sınırlar (Sprint 7.1 kapsamı)

- `parseFrontmatter()` genel amaçlı bir YAML parser değildir; yalnızca bu repodaki entity dosyalarının
  kullandığı alt kümeyi (scalar, inline `[a, b]` dizisi, çok satırlı `- item` dizisi) çözer.
  Yeni bir YAML deseni (iç içe obje, çok satırlı string vb.) eklenirse parser genişletilmelidir.
- Depo tek seferlik `reload()` ile yüklenir; dosya izleme (watch) yoktur.
- **[P0 — düzeltildi]** Kategori keşfi artık dinamik: `FilesystemEntityLoader.discoverCategories()`
  `knowledge-graph/` kök dizinini tarar (gizli klasörler ve `api/` hariç), sabit bir kategori
  listesine bağımlı değildir. Önceki hardcoded `ENTITY_CATEGORIES` sabiti kaldırıldı — bu sabit,
  Sprint-6'da eklenen `problems/`/`standards/` kategorilerini (39 entity'nin %15'i) sessizce
  atlıyordu (bkz. `reports/entity-service-review.md` Bölüm 4, bulgu #1). Bkz. `EntityLoader.test.ts`.

## Sonraki Adımlar (Sprint 7.2+, insan onayı gerekir)

- `knowledge-graph/api/` ile ilişki: dashboard'un hangi katmana bağlanacağına karar verilmeli (MINOR).
- Dosya değişikliği tetiklemeli otomatik `reload()` (n8n `entity-indexer` workflow'u ile entegrasyon).
- `EntityValidator` çıktısının `outputs/reports/` altına otomatik rapor olarak yazılması.
