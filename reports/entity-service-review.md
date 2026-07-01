# Sprint-7.1 Architecture Review — Entity Service

**Tarih:** 2026-07-01
**Kapsam:** `services/entity-service/` (Sprint-7.1, henüz merge edilmedi) — eleştirel mimari analiz.
**Yöntem:** Kod incelemesi + `origin/main` üzerindeki güncel Knowledge Graph verisiyle (39 entity, Sprint-6 genişlemesi #14 sonrası) karşı karşıya konarak test edildi.
**Kural:** Bu rapor analizdir. Hiçbir kod değiştirilmedi, hiçbir commit oluşturulmadı.

---

## 1. Yönetici Özeti

Mimarinin katman ayrımı (Loader → Repository → Resolver/Relations/Search/Validator → Facade) ve ilişki çözümlemesinin O(1) Map tabanlı olması sağlam. Ancak canlı Knowledge Graph verisiyle test edildiğinde **aktif bir veri kaybı bulgusu** çıktı: kategori listesi hardcoded olduğu için Sprint-6 genişlemesiyle eklenen 2 kategori (`problems/`, `standards/` — toplam 6 entity, mevcut 39'un **%15'i**) servis tarafından sessizce okunmuyor. Bu, ölçeklenebilirlik senaryolarından önce bile bugünkü veriyle doğrulanmış, somut bir kusur.

Genel değerlendirme yapının altında; küçük, hedefli düzeltmelerle giderilebilir bir düzeyde.

---

## 2. Soru Bazlı Analiz

### 2.1 Single Source of Truth korunuyor mu?
**Kısmen.** Entity *içeriği* tek kaynaktan (`.md` dosyaları) okunuyor, kopyalanmıyor — bu doğru. Ama iki paralel "gerçek" kaynağı var:

- **Kategori listesi:** `services/entity-service/types.ts` içindeki `ENTITY_CATEGORIES` sabiti 11 kategori listeliyor (`entities, brands, products, components, technologies, certifications, minerals, contaminants, faq, glossary, locations`). Gerçek `knowledge-graph/` şu an **13** kategori içeriyor: yukarıdakilere ek olarak `problems/` (3 entity) ve `standards/` (3 entity) var, üstelik `glossary/` klasörü hâlâ **hiç oluşturulmadı** (fantom kategori). Sonuç: `EntityLoader.loadAll()` 39 entity'nin **6 tanesini (%15) sessizce atlıyor**, hata da vermiyor.
- **`knowledge-graph/api/` (Sprint-2/3 mock katman):** 10 entity'lik elle yazılmış sabit dizi hâlâ duruyor; `entity-service` 39 entity okuyor. İki katman aynı anda var, sayıları farklı, hangisinin "doğru" olduğu kod düzeyinde tanımsız.

**Sonuç:** SSOT ilkesi kategori keşfi ve KG-API/entity-service ikilisinde ihlal ediliyor.

### 2.2 Knowledge Graph dışında veri okunuyor mu?
**Hayır.** `FilesystemEntityLoader` yalnızca `knowledge-graph/<kategori>/*.md` yolunu okuyor. Sınır net, ihlal yok.

### 2.3 Entity cache gerekli mi?
**Şu an (39-500 entity) hayır, kritik değil.** Repository zaten bellek-içi bir `Map` (yükleme sonrası tekrar diske gitmiyor) — bu asgari bir cache sayılır. Eksik olan cache değil, **indeksleme** (bkz. 2.6): `getByType`/`search`/`getAllEdges` her çağrıda `getAll()` üzerinden yeniden filtreleme yapıyor, sonuç önbelleğe alınmıyor. 2000 entity'de ve sık çağrılan bir dashboard senaryosunda gereksiz tekrar hesaplama birikir.

### 2.4 Lazy loading mi, preload mu daha uygun?
**Mevcut: preload** (`InMemoryEntityRepository` constructor'da `reload()` çağırıyor, tüm KG anında senkron okunuyor — `fs.readFileSync` her dosya için bloklayıcı, sıralı).
- 39-500 entity: preload sorunsuz, birkaç yüz ms.
- 2000 entity + serverless/Vercel cold start: her yeni process başlangıcında 2000 senkron dosya okuma belirgin gecikme yaratabilir. Bu ölçekte **lazy + async paralel okuma** veya önceden derlenmiş tek bir index dosyasından (bkz. 2.8) yükleme daha uygun olur.

### 2.5 Entity ilişkileri O(n²) karmaşıklığı oluşturuyor mu?
**Hayır — ilişki çözümleme O(1).** `getRelated()`/`resolveReferences()` `repository.getById()` (Map lookup) kullanıyor; bu doğru tasarım kararı, O(n²) riski yaratmıyor.
**Ama:** `getAllEdges()`, `getBrokenRelations()`, `getMostConnected()` her çağrıda TÜM entity'ler × TÜM `related_entities`'i yeniden tarıyor — O(n·k) (k = entity başına ortalama ilişki, şu an ~3). O(n²) değil, ama **her çağrıda yeniden hesaplanıyor**, sonuç cache'lenmiyor. N kez çağrılırsa toplam maliyet O(n·k·N).

### 2.6 Arama (search) ölçeklenebilir mi?
**Hayır, indekslenmemiş.** `TextEntitySearch.search()` her sorguda `getAll()`'daki tüm entity'leri normalize edip string `includes()` ile tarıyor — O(n) per query. 39'da önemsiz, 2000'de tek sorgu hâlâ hızlı (basit string işlemi) ama eşzamanlı çoklu istek veya autocomplete senaryosunda (her tuş vuruşunda arama) yük birikir. Ad/alias → id ters index'i (`Map<string, string[]>`) yok.

### 2.7 39 → 500 → 2000 entity senaryoları
| Ölçek | Durum |
|-------|-------|
| **39 (mevcut)** | Kategori bug'ı **şu an aktif** — 6 entity kayboluyor. Diğer her şey performans açısından sorunsuz. |
| **500** | Tekil sorgular (`getEntity`, `getRelated`) hâlâ hızlı (Map, O(1)/O(k)). `getByType`/`search`/`getMostConnected` gibi tam-tarama sorguları gözle görülür yavaşlamaz ama gereksiz CPU tüketir. Kategori listesi muhtemelen birkaç kez daha manuel güncellenmesi gerekecek. |
| **2000** | Preload aşamasında 2000 senkron `fs.readFileSync` gecikme yaratabilir (özellikle serverless cold start). İndekslenmemiş sorgular hâlâ "yavaş değil ama israflı" seviyesinde. Bu noktada JSON index / önceden derleme (2.8) ciddi fayda sağlar. |

### 2.8 JSON export yerine SQLite/JSON Index gerekir mi?
**39-500'de hayır. 500+'da JSON Index evet, SQLite hayır.**
- SQLite; join, agregasyon, full-text search gibi ihtiyaçlar için mantıklı — bu servisin ihtiyaçları (id/slug/tip/ilişki/basit arama) bunu gerektirmiyor, SQLite şu an over-engineering olur.
- Buna karşılık, `automation/n8n/workflows/entity-indexer.md` zaten tam bunun için tasarlanmış: "değişiklikte frontmatter'ı parse edip arama/ilişki indeksini yeniden üretir." Bu workflow'un ürettiği **tek, önceden derlenmiş `entities.index.json`** dosyasını okumak, her process başlangıcında 2000 ayrı `.md` dosyası okumaktan çok daha ucuzdur. `entity-service` şu an bu workflow'un varlığından habersiz, kendi ham `.md` okumasını yapıyor — entity-indexer ile entegrasyon eksik.

### 2.9 CI3 entegrasyonunda darboğaz oluşur mu?
**Entegrasyon noktası tanımsız — bu asıl darboğaz.** Servis saf TypeScript/Node; PHP/CodeIgniter 3.7.1 tarafı bunu doğrudan çağıramaz (farklı çalışma zamanı). Şu an ne bir HTTP endpoint, ne de PHP'nin okuyabileceği bir export dosyası var. `outputs/reports/ci3-product-schema-integration-plan.md`'de tarif edilen `application/helpers/schema_helper.php` gibi bir entegrasyonun bu servisten veri alması için ya (a) build-time JSON export ya da (b) bir HTTP API sınırı tanımlanmalı — ikisi de şu an yok.

### 2.10 API public interface yeterli mi?
**Temel kullanım için yeterli, üretim ölçeği için eksik.**
- Sayfalama/limit dışı sıralama yok (`search` içinde `limit` var ama `getByType`/`getByCategory` sınırsız dizi döner).
- Toplu sorgu yok — N id için N ayrı `getEntity()` çağrısı gerekir.
- Dışa aktarım (export) metodu yok.
- Versiyon/audit bilgisi yok.

---

## 3. İstenen Bileşenlerin Eksik/Var Değerlendirmesi

| Bileşen | Durum | Not |
|---------|-------|-----|
| **EntityCache** | Yok (repository'nin bellek-içi Map'i asgari düzeyde karşılıyor) | 500+ entity'de gerçek bir cache/invalidation stratejisi gerekebilir; şu an P2. |
| **EntityIndex** | **Yok — en kritik eksik** | Tip/durum/kategori/slug için pre-computed lookup yok; her sorgu O(n) tam tarama. 500+'da önerilir. |
| **EntityGraph** | Kısmen var (`EntityRelations`) | Kenar listesi, derece, en bağlantılı entity var; BFS/DFS, N-hop komşuluk, path-finding yok. Şu anki ihtiyaç için yeterli. |
| **EntityResolver** | Var, çalışıyor | id/slug/URL çözümleme + referans çözme tasarlandığı gibi. |
| **EntityExporter** | **Yok** | JSON/CSV dışa aktarım yok — `entity-indexer` n8n workflow'unun tam ihtiyaç duyduğu şey bu; en somut boşluklardan biri. |
| **EntityVersion** | Yok (kasıtlı olarak önerilmiyor) | Git zaten dosya bazlı versiyon/audit sağlıyor; ayrı bir bileşen şu an YAGNI. |
| **EntityStatus (draft/seed/published)** | **Zaten var** — `status: 'seed' \| 'reviewed' \| 'published'` | İsimlendirme farkı var ("draft" yerine "seed/reviewed"), işlevsel olarak karşılığı mevcut; `EntityValidator` zaten `published` için ek şart kontrolü yapıyor. |
| **EntityDependencyMap** | Kısmen var, yönü eksik | `related_entities` yalnızca tek yönlü (outgoing) modellenmiş. "Bu entity'e kim bağımlı" (incoming/reverse) sorgusu için dedike bir metod yok — şu an yalnızca `getAllEdges()` + manuel filtre ile (O(n)) bulunabilir. |

---

## 4. Öncelik Sıralı Bulgular

| # | Bulgu | Etki | Boyut |
|---|-------|------|-------|
| 1 | Kategori listesi hardcoded — `problems/`, `standards/` okunmuyor | **Yüksek (aktif veri kaybı, %15)** | Küçük — `ENTITY_CATEGORIES` yerine `fs.readdirSync(kgRoot)` ile dinamik keşif |
| 2 | `knowledge-graph/api/` ile `entity-service` paralel, sayıları uyuşmuyor (10 vs 39) | Orta (kafa karışıklığı, hangi tüketici hangisini kullanır belirsiz) | Orta — MINOR karar + geçiş planı gerekir |
| 3 | Sorgu sonuçları indekslenmiyor (`getByType`/`search`/`getAllEdges`) | Düşük (39-500), Orta (2000+) | Orta — `EntityIndex` bileşeni eklenmeli |
| 4 | CI3/PHP entegrasyon sınırı tanımsız | Orta (gelecekte engelleyici olur) | Orta — export ya da HTTP API kararı |
| 5 | `EntityExporter` yok, `entity-indexer` n8n workflow'uyla bağlantı kurulmamış | Orta | Küçük-Orta |
| 6 | Reverse dependency (`getDependents`) yok | Düşük | Küçük |
| 7 | Preload senkron/sıralı, 2000 ölçekte cold-start riski | Düşük (şu an), Orta (2000'de) | Orta |

---

## 5. Sonuç

🟡 **Küçük geliştirmeler öneriliyor**

Gerekçe: Katmanlama, tip ayrımı ve ilişki çözümleme mimarisi doğru kurulmuş (O(n²) yok, Map tabanlı O(1) erişim var, sorumluluklar net ayrılmış) — bu bir **mimari revizyon** gerektirmiyor. Ancak bulgu #1 (kategori listesi bug'ı) **şu anki gerçek veriyle doğrulanmış, aktif bir veri kaybı** olduğundan bu geliştirmeler arasında **P0/acil** olarak ele alınmalı; Sprint-6 sonrası KG büyümeye devam ettikçe (Sprint-7: 100, Sprint-8: 150-200 hedef) etkisi büyüyecektir. Önerilen sıra: (1) kategori keşfini dinamikleştir, (2) `EntityIndex` ekle, (3) `knowledge-graph/api/` ile ilişkiyi netleştir, (4) CI3 entegrasyon sınırına karar ver.
