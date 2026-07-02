<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Entity_service — CI3 Library/Facade.
 *
 * Sprint-7.4: entities.index.json (EntityExporter çıktısı) üzerinden
 * lazy-load, singleton erişim sağlar. İlk çağrıda JSON yüklenir ve
 * Entity_cache ile önbelleğe alınır; sonraki çağrılarda bellekten döner.
 *
 * Kullanım (controller/view içinde):
 *   $this->load->library('entity_service');
 *   $entity = $this->entity_service->get('products/code-su-aritma-cihazi');
 *   $products = $this->entity_service->by_type('Product');
 *
 * DRAFT — insan onayı sonrası CI3 projesine uygulanır.
 */
class Entity_service {

    /** @var array|null Yüklenmiş entities.index.json (tamamı) */
    private $data = NULL;

    /** @var array Indexes (byId, bySlug, byCategory, byType, byAlias, byUrl) */
    private $indexes = [];

    /** @var Entity_cache */
    private $cache;

    /** @var string JSON dosya yolu */
    private $json_path;

    /** @var bool Lazy load gerçekleşti mi */
    private $initialized = FALSE;

    private const CACHE_KEY_DATA    = 'index_data';
    private const CACHE_KEY_MTIME   = 'index_mtime';

    public function __construct(array $params = [])
    {
        $CI =& get_instance();
        $CI->config->load('entity', TRUE);

        $this->json_path = $params['json_path']
            ?? $CI->config->item('entity_json_path', 'entity')
            ?? APPPATH . 'cache/entity-service/entities.index.json';

        if (! isset($CI->entity_cache)) {
            $CI->load->library('entity_cache', [
                'ttl'       => $CI->config->item('entity_cache_ttl', 'entity') ?? 3600,
                'cache_dir' => $CI->config->item('entity_cache_dir', 'entity') ?? APPPATH . 'cache/entity-service/cache/',
                'driver'    => $CI->config->item('entity_cache_driver', 'entity') ?? 'file',
            ]);
        }
        $this->cache = $CI->entity_cache;
    }

    // ------------------------------------------------------------------
    // Public API — Sorgular
    // ------------------------------------------------------------------

    /**
     * Tam entity ID ile kayıt döner.
     *
     * @param  string $id  örn. 'products/code-su-aritma-cihazi'
     * @return array|null  Entity dizisi veya NULL
     */
    public function get(string $id): ?array
    {
        $this->ensure_loaded();
        $pos = $this->indexes['byId'][$id] ?? NULL;
        return $pos !== NULL ? ($this->data['entities'][$pos] ?? NULL) : NULL;
    }

    /**
     * Slug ile kayıt döner (kategori öneki olmadan).
     *
     * @param  string $slug  örn. 'code-su-aritma-cihazi'
     * @return array|null
     */
    public function by_slug(string $slug): ?array
    {
        $this->ensure_loaded();
        $ids = $this->indexes['bySlug'][$slug] ?? [];
        if (empty($ids)) {
            return NULL;
        }
        return $this->get($ids[0]);
    }

    /**
     * Tipe göre entity listesi.
     *
     * @param  string $type  örn. 'Product', 'FAQ'
     * @return array
     */
    public function by_type(string $type): array
    {
        $this->ensure_loaded();
        $ids = $this->indexes['byType'][$type] ?? [];
        return $this->resolve_ids($ids);
    }

    /**
     * Kategoriye göre entity listesi.
     *
     * @param  string $category  örn. 'products', 'technologies'
     * @return array
     */
    public function by_category(string $category): array
    {
        $this->ensure_loaded();
        $ids = $this->indexes['byCategory'][$category] ?? [];
        return $this->resolve_ids($ids);
    }

    /**
     * URL ile kayıt döner (buzsu_url veya suvesu_url).
     *
     * @param  string $url
     * @return array|null
     */
    public function by_url(string $url): ?array
    {
        $this->ensure_loaded();
        $id = $this->indexes['byUrl'][$url] ?? NULL;
        return $id !== NULL ? $this->get($id) : NULL;
    }

    /**
     * Alias (normalize edilmiş ad/takma ad) ile entity listesi.
     *
     * @param  string $alias
     * @return array
     */
    public function by_alias(string $alias): array
    {
        $this->ensure_loaded();
        $normalized = $this->normalize($alias);
        $ids = $this->indexes['byAlias'][$normalized] ?? [];
        return $this->resolve_ids($ids);
    }

    /**
     * Bir entity'nin ilişkili olduğu entity ID'leri.
     *
     * @param  string $id
     * @return array  Entity dizileri
     */
    public function related(string $id): array
    {
        $entity = $this->get($id);
        if ($entity === NULL) {
            return [];
        }
        return $this->resolve_ids($entity['related'] ?? []);
    }

    /**
     * Bu entity'e bağımlı olan entity ID'leri (ters bağımlılık).
     *
     * @param  string $id
     * @return array
     */
    public function dependents(string $id): array
    {
        $this->ensure_loaded();
        $ids = $this->data['dependents'][$id] ?? [];
        return $this->resolve_ids($ids);
    }

    /**
     * Basit metin araması (entity adı/alias üzerinde substring).
     *
     * @param  string      $query
     * @param  string|null $type   Opsiyonel tip filtresi
     * @param  int         $limit
     * @return array
     */
    public function search(string $query, ?string $type = NULL, int $limit = 20): array
    {
        $this->ensure_loaded();
        $q = $this->normalize($query);
        $results = [];

        foreach ($this->data['entities'] as $entity) {
            if ($type !== NULL && $entity['type'] !== $type) {
                continue;
            }

            $haystack = $this->normalize(
                $entity['id'] . ' ' .
                $entity['name_tr'] . ' ' .
                ($entity['name_en'] ?? '') . ' ' .
                implode(' ', $entity['aliases'] ?? [])
            );

            if ($q === '' || strpos($haystack, $q) !== FALSE) {
                $results[] = $entity;
                if (count($results) >= $limit) {
                    break;
                }
            }
        }

        return $results;
    }

    /**
     * Depo sağlık özeti.
     *
     * @return array
     */
    public function health(): array
    {
        $this->ensure_loaded();
        return $this->data['stats'] ?? [];
    }

    /**
     * Tüm entity listesi.
     *
     * @return array
     */
    public function all(): array
    {
        $this->ensure_loaded();
        return $this->data['entities'] ?? [];
    }

    /**
     * Ham veri döner (entities.index.json tamamı).
     *
     * @return array
     */
    public function raw(): array
    {
        $this->ensure_loaded();
        return $this->data;
    }

    /**
     * Önbelleği temizler ve veriyi diskten yeniden yükler.
     *
     * @return void
     */
    public function reload(): void
    {
        $this->cache->delete(self::CACHE_KEY_DATA);
        $this->cache->delete(self::CACHE_KEY_MTIME);
        $this->initialized = FALSE;
        $this->data        = NULL;
        $this->indexes     = [];
        $this->ensure_loaded();
    }

    // ------------------------------------------------------------------
    // Dahili — lazy load + cache
    // ------------------------------------------------------------------

    private function ensure_loaded(): void
    {
        if ($this->initialized) {
            return;
        }

        $cached = $this->load_from_cache();
        if ($cached !== NULL) {
            $this->data    = $cached;
            $this->indexes = $cached['indexes'] ?? [];
            $this->initialized = TRUE;
            return;
        }

        $this->load_from_disk();
    }

    /**
     * @return array|null
     */
    private function load_from_cache(): ?array
    {
        if (! is_file($this->json_path)) {
            return NULL;
        }

        $cached_mtime = $this->cache->get(self::CACHE_KEY_MTIME);
        $current_mtime = filemtime($this->json_path);

        if ($cached_mtime !== NULL && $cached_mtime === $current_mtime) {
            $data = $this->cache->get(self::CACHE_KEY_DATA);
            if (is_array($data)) {
                return $data;
            }
        }

        return NULL;
    }

    private function load_from_disk(): void
    {
        if (! is_file($this->json_path)) {
            log_message('error', 'Entity_service: JSON dosyası bulunamadı: ' . $this->json_path);
            $this->data = [
                'meta'       => [],
                'entities'   => [],
                'indexes'    => ['byId' => [], 'bySlug' => [], 'byCategory' => [], 'byType' => [], 'byAlias' => [], 'byUrl' => []],
                'edges'      => [],
                'dependents' => [],
                'stats'      => ['total' => 0],
            ];
            $this->indexes     = $this->data['indexes'];
            $this->initialized = TRUE;
            return;
        }

        $raw = file_get_contents($this->json_path);
        $this->data = json_decode($raw, TRUE);

        if (! is_array($this->data)) {
            log_message('error', 'Entity_service: JSON parse hatası: ' . $this->json_path);
            $this->data = [
                'meta'       => [],
                'entities'   => [],
                'indexes'    => ['byId' => [], 'bySlug' => [], 'byCategory' => [], 'byType' => [], 'byAlias' => [], 'byUrl' => []],
                'edges'      => [],
                'dependents' => [],
                'stats'      => ['total' => 0],
            ];
        }

        $this->indexes = $this->data['indexes'] ?? [];

        $this->cache->set(self::CACHE_KEY_DATA, $this->data);
        $this->cache->set(self::CACHE_KEY_MTIME, filemtime($this->json_path));

        $this->initialized = TRUE;
    }

    /**
     * ID listesinden entity dizilerini çözer.
     *
     * @param  array $ids
     * @return array
     */
    private function resolve_ids(array $ids): array
    {
        $result = [];
        foreach ($ids as $id) {
            $entity = $this->get($id);
            if ($entity !== NULL) {
                $result[] = $entity;
            }
        }
        return $result;
    }

    /**
     * Türkçe-uyumlu normalize (EntityIndex.normalizeText ile aynı mantık).
     *
     * @param  string $s
     * @return string
     */
    private function normalize(string $s): string
    {
        $s = mb_strtolower($s, 'UTF-8');
        $s = str_replace(
            ['ı', 'ş', 'ğ', 'ü', 'ö', 'ç'],
            ['i', 's', 'g', 'u', 'o', 'c'],
            $s
        );
        return trim($s);
    }
}
