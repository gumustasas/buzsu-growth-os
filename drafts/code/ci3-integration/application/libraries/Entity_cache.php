<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Entity_cache — APCu birincil, dosya yedek (fallback) önbellek katmanı.
 *
 * Sprint-7.4: Entity Service verisinin CI3 tarafında tekrar tekrar
 * json_decode edilmesini önler. APCu varsa bellek-içi cache kullanır;
 * yoksa dosya sistemi fallback'ine düşer.
 *
 * DRAFT — insan onayı sonrası CI3 projesine uygulanır.
 */
class Entity_cache {

    /** @var int Varsayılan TTL (saniye) */
    private $ttl = 3600;

    /** @var string Dosya fallback dizini */
    private $cache_dir;

    /** @var string Aktif sürücü: 'apcu' veya 'file' */
    private $driver;

    /** @var string Önbellek anahtar ön eki — çakışma önler */
    private $prefix = 'buzsu_entity_';

    public function __construct(array $params = [])
    {
        $this->ttl       = $params['ttl']       ?? 3600;
        $this->cache_dir = $params['cache_dir'] ?? APPPATH . 'cache/entity-service/cache/';
        $this->driver    = $params['driver']    ?? $this->detect_driver();

        if ($this->driver === 'file' && ! is_dir($this->cache_dir)) {
            mkdir($this->cache_dir, 0755, TRUE);
        }
    }

    /**
     * Önbellekten okur. Bulunamazsa veya süresi dolmuşsa NULL döner.
     *
     * @param  string $key
     * @return mixed|null
     */
    public function get(string $key)
    {
        $full_key = $this->prefix . $key;

        if ($this->driver === 'apcu') {
            $success = FALSE;
            $value = apcu_fetch($full_key, $success);
            return $success ? $value : NULL;
        }

        return $this->file_get($full_key);
    }

    /**
     * Önbelleğe yazar.
     *
     * @param  string $key
     * @param  mixed  $value
     * @param  int|null $ttl  NULL ise varsayılan kullanılır
     * @return bool
     */
    public function set(string $key, $value, ?int $ttl = NULL): bool
    {
        $full_key = $this->prefix . $key;
        $ttl      = $ttl ?? $this->ttl;

        if ($this->driver === 'apcu') {
            return apcu_store($full_key, $value, $ttl);
        }

        return $this->file_set($full_key, $value, $ttl);
    }

    /**
     * Tek anahtarı siler.
     *
     * @param  string $key
     * @return bool
     */
    public function delete(string $key): bool
    {
        $full_key = $this->prefix . $key;

        if ($this->driver === 'apcu') {
            return apcu_delete($full_key);
        }

        $path = $this->file_path($full_key);
        return is_file($path) ? unlink($path) : TRUE;
    }

    /**
     * Tüm entity önbelleğini temizler.
     *
     * @return bool
     */
    public function flush(): bool
    {
        if ($this->driver === 'apcu') {
            $iterator = new \APCUIterator('/^' . preg_quote($this->prefix, '/') . '/');
            return apcu_delete($iterator);
        }

        $files = glob($this->cache_dir . $this->prefix . '*.cache');
        if ($files === FALSE) {
            return FALSE;
        }
        foreach ($files as $file) {
            unlink($file);
        }
        return TRUE;
    }

    /**
     * Aktif sürücüyü döner.
     *
     * @return string
     */
    public function get_driver(): string
    {
        return $this->driver;
    }

    // ------------------------------------------------------------------
    // Dahili — dosya fallback
    // ------------------------------------------------------------------

    private function detect_driver(): string
    {
        return (function_exists('apcu_store') && ini_get('apc.enabled')) ? 'apcu' : 'file';
    }

    private function file_path(string $key): string
    {
        return $this->cache_dir . md5($key) . '.cache';
    }

    /**
     * @return mixed|null
     */
    private function file_get(string $key)
    {
        $path = $this->file_path($key);
        if (! is_file($path)) {
            return NULL;
        }

        $raw = file_get_contents($path);
        if ($raw === FALSE) {
            return NULL;
        }

        $data = unserialize($raw);
        if (! is_array($data) || ! isset($data['expires'], $data['value'])) {
            unlink($path);
            return NULL;
        }

        if ($data['expires'] > 0 && $data['expires'] < time()) {
            unlink($path);
            return NULL;
        }

        return $data['value'];
    }

    private function file_set(string $key, $value, int $ttl): bool
    {
        $path = $this->file_path($key);
        $data = [
            'expires' => $ttl > 0 ? time() + $ttl : 0,
            'value'   => $value,
        ];
        return file_put_contents($path, serialize($data), LOCK_EX) !== FALSE;
    }
}
