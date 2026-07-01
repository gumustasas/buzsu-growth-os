# Sprint-7.1 Raporu — Entity Service API

**Tarih:** 2026-07-01
**Sprint:** Sprint-7.1
**Durum:** Tamamlandı — İnsan onayı bekliyor
**Kapsam:** Yalnızca mimari, interface, veri akışı. Çalıştırılabilir TypeScript, canlı sisteme bağlı değil.

---

## 1. Yönetici Özeti

Knowledge Graph için `services/entity-service/` altında yeni bir servis katmanı tasarlandı.
Bu katman `knowledge-graph/` klasöründeki `.md` entity dosyalarını **gerçekten okur** (dosya
sistemi üzerinden), ayrıştırır ve altı bileşen (Repository, Loader, Resolver, Relations,
Search, Validator) üzerinden sorgulanabilir hale getirir.

**Bu sprintte yapılmayanlar (kural gereği):**
- Yeni npm bağımlılığı eklenmedi (özel, minimal bir frontmatter ayrıştırıcı yazıldı)
- PHP veya CodeIgniter 3.7.1 kodu yazılmadı — bu katman yalnızca Growth OS repo'suna ait TypeScript
- Canlı siteye (buzsu.com.tr / suvesu.com) hiçbir değişiklik yapılmadı
- `knowledge-graph/api/` (Sprint-2/3 mock katmanı) değiştirilmedi veya silinmedi
- Commit / push yapılmadı

**Doğrulama:** 8 dosya, `tsc --noEmit --strict` altında sıfır hata ile derlendi (Node tip tanımları
hariç — bu ortamda `@types/node` kurulu değil; gerçek kod yalnızca `fs`/`path`/`__dirname` kullanır,
bunlar Node çalışma zamanında standart olarak mevcuttur).

---

## 2. Neden Ayrı Bir Katman?

`knowledge-graph/api/index.ts` şu notu içeriyordu:

> "Bu sprintte entity'ler statik bir kayıt olarak gömülüdür (filesystem okuması Sprint-4'te
> gray-matter ile eklenecek)."

`services/entity-service/` bu ertelenen işin karşılığıdır — ancak npm bağımlılığı (`gray-matter`)
eklemek yerine, bu repodaki entity dosyalarının kullandığı YAML alt kümesini çözen kendi
ayrıştırıcısını yazar (CLAUDE.md: yeni bağımlılık = MAJOR sınıf, insan onayı gerektirir).

İki katman şu an paralel var olabilir. Dashboard'un hangisine bağlanacağı bu raporun kapsamı
dışında, ayrı bir MINOR karardır (bkz. Bölüm 6).

---

## 3. Mimari

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

## 4. Bileşenler

| Bileşen | Dosya | Sorumluluk |
|---------|-------|-----------|
| `EntityLoader` | `EntityLoader.ts` | Dosya sistemi okuma; `.md` → `{ frontmatter, body }` ayrıştırma |
| `EntityRepository` | `EntityRepository.ts` | Bellek-içi depo; id/tip/durum/kategori sorguları |
| `EntityResolver` | `EntityResolver.ts` | id/slug/URL çözümleme; `related_entities` referans çözme |
| `EntityRelations` | `EntityRelations.ts` | İlişki grafiği; kenar listesi, kırık ilişki tespiti, merkeziyet |
| `EntitySearch` | `EntitySearch.ts` | Ad/alias/id üzerinde normalize edilmiş metin araması |
| `EntityValidator` | `EntityValidator.ts` | Zorunlu alan + ilişki + `published` şartı doğrulaması |

Her bileşen interface + somut sınıf olarak ayrılmıştır (`EntityRepository` arayüzü /
`InMemoryEntityRepository` implementasyonu gibi) — `lib/` connector katmanındaki
interface + Mock/Live fabrika desenine paralel, ancak burada tek bir "gerçek" (filesystem)
implementasyon vardır; mock/live ayrımı gerekmez çünkü kaynak zaten yerel dosya sistemi.

---

## 5. Public API

```ts
interface EntityService {
  getEntity(id: string): Entity | undefined
  getBySlug(slug: string): Entity | undefined
  getByType(type: EntityType): Entity[]
  getByCategory(category: EntityCategory): Entity[]
  getRelated(id: string): Entity[]
  search(query: string, options?: EntitySearchOptions): Entity[]
  validate(id?: string): ValidationResult | ValidationResult[]
  getHealth(): EntityServiceHealth
  reload(): void
}
```

| Metod | Girdi | Çıktı | Kaynak Bileşen |
|-------|-------|-------|----------------|
| `getEntity(id)` | Tam id, örn. `products/code-su-aritma-cihazi` | `Entity \| undefined` | EntityResolver.resolveById |
| `getBySlug(slug)` | Kategori öneki olmadan dosya adı, örn. `code-su-aritma-cihazi` | `Entity \| undefined` | EntityResolver.resolveBySlug |
| `getByType(type)` | `EntityType` (örn. `'Product'`) | `Entity[]` | EntityRepository.getByType |
| `getByCategory(category)` | `EntityCategory` (örn. `'products'`) | `Entity[]` | EntityRepository.getByCategory |
| `getRelated(id)` | Tam id | `Entity[]` (yalnızca çözülebilenler) | EntityRelations.getRelated |
| `search(query, options?)` | Serbest metin + `{ type?, status?, category?, limit? }` | `Entity[]` | EntitySearch.search |
| `validate(id?)` | Tam id veya boş (tüm depo) | `ValidationResult \| ValidationResult[]` | EntityValidator.validate/validateAll |
| `getHealth()` | — | `EntityServiceHealth` (toplam, durum/tipe göre dağılım, kırık ilişki sayısı) | facade (repository + relations) |
| `reload()` | — | `void` | EntityRepository.reload |

### Örnek Kullanım

```ts
import { getEntityService } from 'services/entity-service'

const service = getEntityService()

service.getEntity('products/code-su-aritma-cihazi')
service.getBySlug('code-su-aritma-cihazi')
service.getByType('Product')
service.getRelated('technologies/ters-osmoz')
service.search('ters osmoz', { type: 'Technology' })
service.validate('products/code-su-aritma-cihazi')
service.validate()          // tüm depoyu doğrula
service.getHealth()
```

---

## 6. Veri Modeli

`Entity` tipi mevcut `types/entity.ts` dosyasından yeniden kullanılır (yeni tip tanımlanmadı,
tutarlılık korundu):

```ts
interface Entity {
  id: string                    // 'products/code-su-aritma-cihazi' — kategori/slug, uzantısız
  filePath: string               // gerçek dosya yolu
  frontmatter: EntityFrontmatter // entity_type, schema_type, name_tr, related_entities, ...
  body: string                   // markdown gövdesi
}
```

`related_entities` alanı dosyalarda `.md` uzantısıyla yazılır (örn. `technologies/ters-osmoz.md`);
`EntityLoader` bunu ayrıştırırken uzantıyı kaldırıp entity `id` formatına normalize eder — aksi
halde ilişki çözümleme her zaman başarısız olurdu (dosyalardaki gerçek format ile mock katmanın
kullandığı uzantısız format arasındaki fark bu sprintte tespit edildi ve düzeltildi).

---

## 7. Doğrulama (EntityValidator)

| Kontrol | Şiddet | Koşul |
|---------|--------|-------|
| Zorunlu alan | `error` | `entity_type`, `schema_type`, `name_tr`, `status` eksikse |
| İlişki çözünürlüğü | `warning` | `related_entities` içindeki bir id depoda yoksa |
| Yayın hazırlığı | `error` | `status: published` iken `buzsu_url`/`suvesu_url` ikisi de yoksa |
| Yayın hazırlığı | `warning` | `status: published` iken gövde boşsa |

`validate()` hiçbir alanı otomatik düzeltmez; yalnızca raporlar. Düzeltme, CLAUDE.md'nin
draft → insan onayı → PR akışına göre insan/agent tarafından yapılır.

---

## 8. Bilinen Sınırlar

- `parseFrontmatter()` genel amaçlı YAML parser değildir; yalnızca mevcut entity dosyalarının
  kullandığı alt kümeyi (scalar, inline `[a, b]`, çok satırlı `- item`) çözer.
- Dosya izleme (watch) yok; değişiklik sonrası `reload()` manuel çağrılır.
- `certifications/` ve `glossary/` kategorileri `ENTITY_CATEGORIES` listesinde tanımlı ama
  klasörler henüz `knowledge-graph/` altında oluşturulmadı (ROADMAP.md Sprint-6+); loader bu
  durumda hata fırlatmaz, sessizce boş sonuç döner.

---

## 9. Sonraki Adımlar (İnsan Onayı Gerekir)

| Adım | Sınıf | Not |
|------|-------|-----|
| `knowledge-graph/api/` ↔ `entity-service` ilişkisine karar (dashboard hangisini kullanacak) | MINOR | İki katman şu an paralel, çakışma yok |
| Dosya değişikliğinde otomatik `reload()` — n8n `entity-indexer` workflow entegrasyonu | MINOR | `automation/n8n/workflows/entity-indexer` mevcut tanımla hizalanmalı |
| `validate()` çıktısının `outputs/reports/` altına periyodik rapor olarak yazılması | SAFE PATCH | Yeni dosya, yalnızca okuma |
| Sprint-6 hedefi olan 40 entity eklendiğinde `EntityValidator.validateAll()` ile toplu doğrulama | — | Entity içeriği ekleme ayrı görev |

---

*Rapor: Sprint-7.1 — Entity Service mimarisi — 2026-07-01*
