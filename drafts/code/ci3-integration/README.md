# CI3 Integration — Sprint-7.4

Entity Service → CodeIgniter 3.7.1 entegrasyon altyapısı.

**Durum:** DRAFT — insan onayı sonrası buzsu.com.tr CI3 projesine uygulanır.

---

## Mimari

```
EntityExporter (TS, Sprint-7.3)
    │  entities.index.json
    ▼
CI3Bridge (TS, Sprint-7.4)
    │  entities.index.json + ci3-schema-map.json + ci3-link-map.json
    ▼
Entity_service (PHP, CI3 Library)
    │  lazy load + APCu/file cache
    ├── Entity_schema    → JSON-LD üretimi
    ├── Entity_linker    → Internal linking hook
    ├── Entity_controller → Controller veri hazırlayıcı
    └── entity_helper    → View kısayolları
    │
    ▼
CI3 Controller/View
```

## Dosyalar

| Dosya | Tip | Açıklama |
|-------|-----|----------|
| `application/config/entity.php` | PHP Config | Yol ve cache ayarları |
| `application/libraries/Entity_service.php` | PHP Library | Ana facade — lazy load, cache, sorgular |
| `application/libraries/Entity_cache.php` | PHP Library | APCu birincil + dosya fallback cache |
| `application/libraries/Entity_schema.php` | PHP Library | Entity → JSON-LD schema adapter |
| `application/libraries/Entity_linker.php` | PHP Library | Internal linking hook |
| `application/libraries/Entity_controller.php` | PHP Library | Controller entegrasyon (Product/Category/Content/FAQ) |
| `application/helpers/entity_helper.php` | PHP Helper | View kısayolları: `entity()`, `entity_link()`, `entity_name()` |
| `application/controllers/cli/Entity_cli.php` | PHP Controller | CLI: stats, verify, rebuild, export |

## TypeScript Tarafı

| Dosya | Açıklama |
|-------|----------|
| `services/entity-service/CI3Bridge.ts` | TS → CI3 bundle oluşturucu |
| `services/entity-service/CI3Bridge.test.ts` | Entegrasyon testleri |

## Kullanım (CI3 tarafında)

```php
// Controller
$this->load->library('entity_service');
$entity = $this->entity_service->get('products/code-su-aritma-cihazi');

// View (helper yüklü ise)
<?= entity_name('products/code-su-aritma-cihazi') ?>
<?= entity_link('products/code-su-aritma-cihazi') ?>

// Schema
$this->load->library('entity_schema');
echo $this->entity_schema->render('products/code-su-aritma-cihazi');

// Internal linking
$this->load->library('entity_linker');
$html = $this->entity_linker->auto_link($content, $current_url);

// CLI
php index.php entity_cli stats
php index.php entity_cli verify
php index.php entity_cli rebuild
php index.php entity_cli export /path/to/output.json
```

## Cache

- **APCu (birincil):** Bellek-içi, en hızlı. `apc.enabled` açıksa otomatik seçilir.
- **Dosya (fallback):** APCu yoksa `application/cache/entity-service/cache/` altında.
- Dosya değişikliği (mtime) takibi: JSON güncellenince cache otomatik invalidate olur.
- CLI `rebuild` komutu ile manuel temizlik.

## Sınırlar

- PHP tarafı yalnızca `entities.index.json` okur; Knowledge Graph markdown dosyalarına dokunmaz.
- Schema adapter entity düzeyindedir; Airtable-bazlı `schema_helper.php` (TASK-005) ile çakışmaz.
- Internal linker ilk geçişi bağlantılar; aynı anchor birden fazla kez bağlantılanmaz.
- CLI controller'lar yalnızca CLI modunda çalışır (`is_cli()` kontrolü).
