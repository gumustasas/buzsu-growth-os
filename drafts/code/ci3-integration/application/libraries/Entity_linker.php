<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Entity_linker — Internal linking hook altyapısı.
 *
 * Sprint-7.4: İçerik metinlerinde geçen entity adlarını/alias'larını otomatik
 * olarak iç bağlantıya dönüştürür. SEO internal linking stratejisi için
 * kullanılır.
 *
 * Kullanım:
 *   $this->load->library('entity_linker');
 *   $linked_html = $this->entity_linker->auto_link($content);
 *   $suggestions = $this->entity_linker->suggest($content);
 *
 * Kurallar:
 *   - Her entity adı için sayfada yalnızca İLK geçiş bağlantılanır
 *   - Halihazırda <a> etiketi içinde olan metinler atlanır
 *   - Kendine bağlantı (current page URL) verilmez
 *   - Minimum anchor uzunluğu 3 karakter
 *
 * DRAFT — insan onayı sonrası CI3 projesine uygulanır.
 */
class Entity_linker {

    /** @var array Link suggestion listesi */
    private $link_map = [];

    /** @var bool Map yüklendi mi */
    private $loaded = FALSE;

    /** @var string|null Link map dosya yolu */
    private $link_map_path;

    /** @var Entity_cache */
    private $cache;

    /** @var int Minimum anchor uzunluğu */
    private $min_anchor_length = 3;

    /** @var int Aynı anchor'dan en fazla kaç kez bağlantı oluşturulur */
    private $max_links_per_anchor = 1;

    private const CACHE_KEY = 'link_map';

    public function __construct(array $params = [])
    {
        $CI =& get_instance();
        $CI->config->load('entity', TRUE);

        $this->link_map_path = $params['link_map_path']
            ?? $CI->config->item('entity_link_path', 'entity')
            ?? APPPATH . 'cache/entity-service/ci3-link-map.json';

        if (! isset($CI->entity_cache)) {
            $CI->load->library('entity_cache');
        }
        $this->cache = $CI->entity_cache;
    }

    /**
     * İçerik HTML'inde entity adlarını otomatik olarak iç bağlantıya dönüştürür.
     *
     * @param  string      $html         Kaynak HTML
     * @param  string|null $current_url  Bu sayfanın URL'si (kendine bağlantı vermemek için)
     * @param  int         $max_total    Toplam eklenecek maksimum bağlantı sayısı
     * @return string
     */
    public function auto_link(string $html, ?string $current_url = NULL, int $max_total = 5): string
    {
        $suggestions = $this->suggest($html, $current_url, $max_total);

        if (empty($suggestions)) {
            return $html;
        }

        $linked_anchors = [];
        $total_added = 0;

        foreach ($suggestions as $suggestion) {
            if ($total_added >= $max_total) {
                break;
            }

            $anchor = $suggestion['anchor'];
            if (isset($linked_anchors[$anchor])) {
                continue;
            }

            $escaped_anchor = preg_quote($anchor, '/');
            // <a> etiketi içinde olmayan ilk geçişi bul
            $pattern = '/(?<![<\/a-zA-Z])(' . $escaped_anchor . ')(?![^<]*<\/a>)/ui';

            $html = preg_replace($pattern, '<a href="' . htmlspecialchars($suggestion['url'], ENT_QUOTES, 'UTF-8') . '">$1</a>', $html, 1, $count);

            if ($count > 0) {
                $linked_anchors[$anchor] = TRUE;
                $total_added++;
            }
        }

        return $html;
    }

    /**
     * İçerik metninde bağlantılanabilir entity adlarını tespit eder.
     *
     * @param  string      $text         Düz metin veya HTML
     * @param  string|null $current_url  Bu sayfanın URL'si
     * @param  int         $limit
     * @return array  [ { anchor, url, entityId, entityType } ]
     */
    public function suggest(string $text, ?string $current_url = NULL, int $limit = 10): array
    {
        $this->ensure_loaded();

        $stripped = strip_tags($text);
        $normalized_text = $this->normalize($stripped);
        $suggestions = [];

        foreach ($this->link_map as $entry) {
            if ($current_url !== NULL && $entry['url'] === $current_url) {
                continue;
            }

            $anchors = array_merge([$entry['anchor']], $entry['aliases'] ?? []);
            foreach ($anchors as $anchor) {
                if (mb_strlen($anchor) < $this->min_anchor_length) {
                    continue;
                }

                $normalized_anchor = $this->normalize($anchor);
                if (mb_strpos($normalized_text, $normalized_anchor) !== FALSE) {
                    $suggestions[] = [
                        'anchor'     => $anchor,
                        'url'        => $entry['url'],
                        'entityId'   => $entry['entityId'],
                        'entityType' => $entry['entityType'],
                    ];
                    break;
                }
            }

            if (count($suggestions) >= $limit) {
                break;
            }
        }

        return $suggestions;
    }

    /**
     * Link map'i yeniden yükler.
     *
     * @return void
     */
    public function reload(): void
    {
        $this->cache->delete(self::CACHE_KEY);
        $this->loaded   = FALSE;
        $this->link_map = [];
        $this->ensure_loaded();
    }

    /**
     * Mevcut link map girdi sayısını döner.
     *
     * @return int
     */
    public function count(): int
    {
        $this->ensure_loaded();
        return count($this->link_map);
    }

    // ------------------------------------------------------------------
    // Dahili
    // ------------------------------------------------------------------

    private function ensure_loaded(): void
    {
        if ($this->loaded) {
            return;
        }

        $cached = $this->cache->get(self::CACHE_KEY);
        if (is_array($cached)) {
            $this->link_map = $cached;
            $this->loaded   = TRUE;
            return;
        }

        if (is_file($this->link_map_path)) {
            $raw = file_get_contents($this->link_map_path);
            $decoded = json_decode($raw, TRUE);
            $this->link_map = is_array($decoded) ? $decoded : [];
            $this->cache->set(self::CACHE_KEY, $this->link_map);
        }

        $this->loaded = TRUE;
    }

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
