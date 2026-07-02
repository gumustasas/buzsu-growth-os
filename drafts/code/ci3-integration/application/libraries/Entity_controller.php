<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Entity_controller — Controller entegrasyon altyapısı.
 *
 * Sprint-7.4: CI3 controller'larında entity verisine erişim için yardımcı
 * metotlar. Controller'ların bu sınıfı extend etmesi GEREKMEZ — library
 * olarak yüklenir ve herhangi bir controller'da kullanılır:
 *
 *   $this->load->library('entity_controller');
 *   $data = $this->entity_controller->prepare_product('products/code-su-aritma-cihazi');
 *   $this->load->view('products/detail', $data);
 *
 * 4 sayfa tipi için hazır veri hazırlayıcılar:
 *   - prepare_product($id)  → Product detail sayfası
 *   - prepare_category($cat) → Kategori listesi sayfası
 *   - prepare_content($id)  → İçerik/blog sayfası (entity-zenginleştirilmiş)
 *   - prepare_faq($id)      → FAQ sayfası
 *
 * DRAFT — insan onayı sonrası CI3 projesine uygulanır.
 */
class Entity_controller {

    /** @var Entity_service */
    private $service;

    /** @var Entity_schema */
    private $schema;

    /** @var Entity_linker */
    private $linker;

    /** @var bool */
    private $schema_enabled;

    /** @var bool */
    private $linking_enabled;

    public function __construct(array $params = [])
    {
        $CI =& get_instance();
        $CI->config->load('entity', TRUE);

        if (! isset($CI->entity_service)) {
            $CI->load->library('entity_service');
        }
        $this->service = $CI->entity_service;

        $this->schema_enabled  = $CI->config->item('entity_schema_enabled', 'entity') ?? TRUE;
        $this->linking_enabled = $CI->config->item('entity_linking_enabled', 'entity') ?? TRUE;

        if ($this->schema_enabled && ! isset($CI->entity_schema)) {
            $CI->load->library('entity_schema');
        }
        if ($this->schema_enabled) {
            $this->schema = $CI->entity_schema;
        }

        if ($this->linking_enabled && ! isset($CI->entity_linker)) {
            $CI->load->library('entity_linker');
        }
        if ($this->linking_enabled) {
            $this->linker = $CI->entity_linker;
        }
    }

    /**
     * Product detail sayfası için veri hazırlar.
     *
     * @param  string $entity_id  örn. 'products/code-su-aritma-cihazi'
     * @return array  View'a aktarılacak $data dizisi
     */
    public function prepare_product(string $entity_id): array
    {
        $entity = $this->service->get($entity_id);
        if ($entity === NULL) {
            return ['entity' => NULL, 'found' => FALSE];
        }

        $data = [
            'found'          => TRUE,
            'entity'         => $entity,
            'related'        => $this->service->related($entity_id),
            'dependents'     => $this->service->dependents($entity_id),
            'schema_html'    => '',
            'link_suggestions' => [],
        ];

        if ($this->schema_enabled) {
            $data['schema_html'] = $this->schema->render($entity_id);
        }

        return $data;
    }

    /**
     * Kategori listesi sayfası için veri hazırlar.
     *
     * @param  string $category  örn. 'products', 'technologies'
     * @return array
     */
    public function prepare_category(string $category): array
    {
        $entities = $this->service->by_category($category);

        return [
            'category'       => $category,
            'entities'       => $entities,
            'count'          => count($entities),
            'schema_html'    => '',
        ];
    }

    /**
     * İçerik/blog sayfası için entity-zenginleştirilmiş veri hazırlar.
     *
     * @param  string      $content_html  Sayfa içeriği (HTML)
     * @param  string|null $current_url   Bu sayfanın URL'si
     * @return array
     */
    public function prepare_content(string $content_html, ?string $current_url = NULL): array
    {
        $data = [
            'content_html'     => $content_html,
            'link_suggestions' => [],
            'linked_content'   => $content_html,
        ];

        if ($this->linking_enabled) {
            $data['link_suggestions'] = $this->linker->suggest($content_html, $current_url);
            $data['linked_content']   = $this->linker->auto_link($content_html, $current_url);
        }

        return $data;
    }

    /**
     * FAQ sayfası için veri hazırlar.
     *
     * @param  string|null $entity_id  Belirli bir FAQ entity'si veya NULL (tümü)
     * @return array
     */
    public function prepare_faq(?string $entity_id = NULL): array
    {
        if ($entity_id !== NULL) {
            $entity = $this->service->get($entity_id);
            return [
                'entity'      => $entity,
                'found'       => $entity !== NULL,
                'related'     => $entity !== NULL ? $this->service->related($entity_id) : [],
                'schema_html' => $this->schema_enabled && $entity !== NULL
                    ? $this->schema->render($entity_id)
                    : '',
            ];
        }

        $faqs = $this->service->by_type('FAQ');
        return [
            'faqs'        => $faqs,
            'count'       => count($faqs),
            'schema_html' => '',
        ];
    }

    /**
     * URL üzerinden entity bulur (controller'da route → entity mapping için).
     *
     * @param  string $url
     * @return array|null
     */
    public function resolve_url(string $url): ?array
    {
        return $this->service->by_url($url);
    }
}
