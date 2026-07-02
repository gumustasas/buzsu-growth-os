<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Entity_schema — Entity verisi → JSON-LD schema adapter.
 *
 * Sprint-7.4: Entity Service'teki entity verilerini schema.org JSON-LD'ye
 * dönüştürür. Mevcut schema_helper.php (TASK-005) ile çakışmaz — o helper
 * doğrudan Airtable/DB ürün verisinden çalışır; bu adapter Knowledge Graph
 * entity'lerinden çalışır.
 *
 * Kullanım:
 *   $this->load->library('entity_schema');
 *   echo $this->entity_schema->render('products/code-su-aritma-cihazi');
 *
 * DRAFT — insan onayı sonrası CI3 projesine uygulanır.
 */
class Entity_schema {

    /** @var Entity_service */
    private $service;

    /** @var string|null Schema map dosya yolu */
    private $schema_map_path;

    /** @var array|null Yüklenmiş schema map */
    private $schema_map = NULL;

    public function __construct(array $params = [])
    {
        $CI =& get_instance();
        $CI->config->load('entity', TRUE);

        if (! isset($CI->entity_service)) {
            $CI->load->library('entity_service');
        }
        $this->service = $CI->entity_service;

        $this->schema_map_path = $params['schema_map_path']
            ?? $CI->config->item('entity_schema_path', 'entity')
            ?? APPPATH . 'cache/entity-service/ci3-schema-map.json';
    }

    /**
     * Entity ID'si için JSON-LD <script> etiketi üretir.
     * Entity bulunamazsa veya schema oluşturulamazsa boş string döner.
     *
     * @param  string $entity_id
     * @return string
     */
    public function render(string $entity_id): string
    {
        $entity = $this->service->get($entity_id);
        if ($entity === NULL) {
            return '';
        }

        $json_ld = $this->build_json_ld($entity);
        if (empty($json_ld)) {
            return '';
        }

        return '<script type="application/ld+json">'
            . json_encode($json_ld, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT)
            . '</script>' . PHP_EOL;
    }

    /**
     * Birden fazla entity için JSON-LD etiketlerini birleştirir.
     *
     * @param  array $entity_ids
     * @return string
     */
    public function render_multiple(array $entity_ids): string
    {
        $output = '';
        foreach ($entity_ids as $id) {
            $output .= $this->render($id);
        }
        return $output;
    }

    /**
     * Entity'den ham JSON-LD dizisi üretir (render etmeden).
     *
     * @param  string $entity_id
     * @return array|null
     */
    public function json_ld(string $entity_id): ?array
    {
        $entity = $this->service->get($entity_id);
        if ($entity === NULL) {
            return NULL;
        }
        return $this->build_json_ld($entity);
    }

    /**
     * Schema map'ten entity'nin önceden hesaplanmış mapping'ini döner.
     *
     * @param  string $entity_id
     * @return array|null
     */
    public function get_mapping(string $entity_id): ?array
    {
        $map = $this->load_schema_map();
        foreach ($map as $mapping) {
            if (($mapping['entityId'] ?? '') === $entity_id) {
                return $mapping;
            }
        }
        return NULL;
    }

    // ------------------------------------------------------------------
    // Dahili — JSON-LD oluşturucu
    // ------------------------------------------------------------------

    private function build_json_ld(array $entity): array
    {
        $type = $entity['type'] ?? 'Thing';

        switch ($type) {
            case 'Product':
                return $this->build_product($entity);
            case 'FAQ':
                return $this->build_faq($entity);
            case 'Organization':
                return $this->build_organization($entity);
            default:
                return $this->build_thing($entity);
        }
    }

    private function build_product(array $entity): array
    {
        $schema = [
            '@context' => 'https://schema.org',
            '@type'    => 'Product',
            'name'     => $entity['name_tr'],
        ];

        if (! empty($entity['name_en'])) {
            $schema['alternateName'] = $entity['name_en'];
        }
        if (! empty($entity['buzsu_url'])) {
            $schema['url'] = $entity['buzsu_url'];
        }

        $schema['brand'] = [
            '@type' => 'Brand',
            'name'  => 'Buzsu',
        ];

        return $schema;
    }

    private function build_faq(array $entity): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type'    => 'Question',
            'name'     => $entity['name_tr'],
            'url'      => $entity['buzsu_url'] ?? $entity['suvesu_url'] ?? '',
        ];
    }

    private function build_organization(array $entity): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type'    => 'Organization',
            'name'     => $entity['name_tr'],
            'url'      => $entity['buzsu_url'] ?? '',
        ];
    }

    private function build_thing(array $entity): array
    {
        $schema = [
            '@context' => 'https://schema.org',
            '@type'    => 'Thing',
            'name'     => $entity['name_tr'],
        ];

        if (! empty($entity['name_en'])) {
            $schema['alternateName'] = $entity['name_en'];
        }
        if (! empty($entity['buzsu_url'])) {
            $schema['url'] = $entity['buzsu_url'];
        }

        return $schema;
    }

    private function load_schema_map(): array
    {
        if ($this->schema_map !== NULL) {
            return $this->schema_map;
        }

        if ($this->schema_map_path === NULL || ! is_file($this->schema_map_path)) {
            $this->schema_map = [];
            return $this->schema_map;
        }

        $raw = file_get_contents($this->schema_map_path);
        $decoded = json_decode($raw, TRUE);
        $this->schema_map = is_array($decoded) ? $decoded : [];

        return $this->schema_map;
    }
}
