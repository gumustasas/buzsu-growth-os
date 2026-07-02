<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Entity Helper — CI3 view/controller kısayol fonksiyonları.
 *
 * Sprint-7.4: Entity_service kütüphanesinin yüklü olmasını gerektirir.
 * View dosyalarında kullanım:
 *   <?= entity_name('products/code-su-aritma-cihazi') ?>
 *   <?= entity_link('products/code-su-aritma-cihazi') ?>
 *   <?= entity_schema_json('products/code-su-aritma-cihazi') ?>
 *
 * DRAFT — insan onayı sonrası CI3 projesine uygulanır.
 */

if (! function_exists('entity')) {
    /**
     * Entity verisini ID ile döner.
     *
     * @param  string $id  örn. 'products/code-su-aritma-cihazi'
     * @return array|null
     */
    function entity(string $id): ?array
    {
        return _entity_service()->get($id);
    }
}

if (! function_exists('entity_by_slug')) {
    /**
     * Slug ile entity döner.
     *
     * @param  string $slug  örn. 'code-su-aritma-cihazi'
     * @return array|null
     */
    function entity_by_slug(string $slug): ?array
    {
        return _entity_service()->by_slug($slug);
    }
}

if (! function_exists('entity_by_url')) {
    /**
     * URL ile entity döner (buzsu_url veya suvesu_url).
     *
     * @param  string $url
     * @return array|null
     */
    function entity_by_url(string $url): ?array
    {
        return _entity_service()->by_url($url);
    }
}

if (! function_exists('entity_name')) {
    /**
     * Entity'nin Türkçe adını döner; bulunamazsa boş string.
     *
     * @param  string $id
     * @param  string $lang 'tr' veya 'en'
     * @return string
     */
    function entity_name(string $id, string $lang = 'tr'): string
    {
        $e = _entity_service()->get($id);
        if ($e === NULL) {
            return '';
        }
        return $lang === 'en' ? ($e['name_en'] ?? $e['name_tr']) : $e['name_tr'];
    }
}

if (! function_exists('entity_link')) {
    /**
     * Entity için HTML <a> etiketi üretir. URL yoksa düz metin döner.
     *
     * @param  string $id
     * @param  array  $attrs  Ek HTML nitelikleri (class, target vb.)
     * @return string
     */
    function entity_link(string $id, array $attrs = []): string
    {
        $e = _entity_service()->get($id);
        if ($e === NULL) {
            return '';
        }

        $url  = $e['buzsu_url'] ?? $e['suvesu_url'] ?? NULL;
        $name = htmlspecialchars($e['name_tr'], ENT_QUOTES, 'UTF-8');

        if ($url === NULL) {
            return $name;
        }

        $attr_str = '';
        foreach ($attrs as $k => $v) {
            $attr_str .= ' ' . htmlspecialchars($k, ENT_QUOTES, 'UTF-8')
                . '="' . htmlspecialchars($v, ENT_QUOTES, 'UTF-8') . '"';
        }

        return '<a href="' . htmlspecialchars($url, ENT_QUOTES, 'UTF-8') . '"' . $attr_str . '>' . $name . '</a>';
    }
}

if (! function_exists('entity_related')) {
    /**
     * Entity'nin ilişkili entity'lerini döner.
     *
     * @param  string $id
     * @return array
     */
    function entity_related(string $id): array
    {
        return _entity_service()->related($id);
    }
}

if (! function_exists('entity_search')) {
    /**
     * Entity metin araması.
     *
     * @param  string      $query
     * @param  string|null $type
     * @param  int         $limit
     * @return array
     */
    function entity_search(string $query, ?string $type = NULL, int $limit = 20): array
    {
        return _entity_service()->search($query, $type, $limit);
    }
}

if (! function_exists('entity_products')) {
    /**
     * Tüm Product entity'lerini döner.
     *
     * @return array
     */
    function entity_products(): array
    {
        return _entity_service()->by_type('Product');
    }
}

if (! function_exists('entity_faq')) {
    /**
     * Tüm FAQ entity'lerini döner.
     *
     * @return array
     */
    function entity_faq(): array
    {
        return _entity_service()->by_type('FAQ');
    }
}

if (! function_exists('entity_health')) {
    /**
     * Depo sağlık özeti.
     *
     * @return array
     */
    function entity_health(): array
    {
        return _entity_service()->health();
    }
}

if (! function_exists('_entity_service')) {
    /**
     * Entity_service singleton'ına erişim (dahili).
     * Library henüz yüklenmemişse otomatik yükler.
     *
     * @return Entity_service
     */
    function _entity_service(): Entity_service
    {
        $CI =& get_instance();
        if (! isset($CI->entity_service)) {
            $CI->load->library('entity_service');
        }
        return $CI->entity_service;
    }
}
