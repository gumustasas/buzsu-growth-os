<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Entity_cli — CLI komutları: stats, verify, rebuild, export.
 *
 * Sprint-7.4: Komut satırından entity verisi yönetimi.
 *
 * Kullanım (CI3 proje kökünden):
 *   php index.php entity_cli stats
 *   php index.php entity_cli verify
 *   php index.php entity_cli rebuild
 *   php index.php entity_cli export [output_path]
 *
 * DRAFT — insan onayı sonrası CI3 projesine uygulanır.
 */
class Entity_cli extends CI_Controller {

    public function __construct()
    {
        parent::__construct();

        if (! is_cli()) {
            show_error('Bu controller yalnızca CLI üzerinden çalıştırılabilir.', 403);
        }

        $this->load->library('entity_service');
        $this->load->library('entity_cache');
    }

    /**
     * Entity depo istatistiklerini gösterir.
     *
     * php index.php entity_cli stats
     */
    public function stats(): void
    {
        $health = $this->entity_service->health();
        $data   = $this->entity_service->raw();

        $this->line('=== Entity Service Stats ===');
        $this->line('');
        $this->line('Toplam entity:     ' . ($health['total'] ?? 0));
        $this->line('Kenar (edge) sayısı: ' . ($health['edgeCount'] ?? 0));
        $this->line('Kırık ilişki:      ' . ($health['brokenRelations'] ?? 0));
        $this->line('');

        if (! empty($health['byType'])) {
            $this->line('Tipe göre dağılım:');
            foreach ($health['byType'] as $type => $count) {
                $this->line('  ' . str_pad($type, 20) . $count);
            }
        }

        $this->line('');
        if (! empty($health['byStatus'])) {
            $this->line('Duruma göre dağılım:');
            foreach ($health['byStatus'] as $status => $count) {
                $this->line('  ' . str_pad($status, 20) . $count);
            }
        }

        $this->line('');
        if (! empty($health['byCategory'])) {
            $this->line('Kategoriye göre dağılım:');
            foreach ($health['byCategory'] as $cat => $count) {
                $this->line('  ' . str_pad($cat, 20) . $count);
            }
        }

        $this->line('');
        $this->line('Meta:');
        $this->line('  generatedAt:     ' . ($data['meta']['generatedAt'] ?? 'N/A'));
        $this->line('  schemaVersion:   ' . ($data['meta']['schemaVersion'] ?? 'N/A'));
        $this->line('  source:          ' . ($data['meta']['source'] ?? 'N/A'));

        $this->line('');
        $this->line('Cache driver:      ' . $this->entity_cache->get_driver());
    }

    /**
     * Entity verisinin bütünlüğünü doğrular.
     *
     * php index.php entity_cli verify
     */
    public function verify(): void
    {
        $this->line('=== Entity Verification ===');
        $this->line('');

        $data   = $this->entity_service->raw();
        $health = $this->entity_service->health();
        $issues = [];

        // 1. JSON yapısı kontrolü
        $required_keys = ['meta', 'entities', 'indexes', 'edges', 'dependents', 'stats'];
        foreach ($required_keys as $key) {
            if (! isset($data[$key])) {
                $issues[] = "[ERROR] Eksik üst düzey anahtar: {$key}";
            }
        }

        // 2. Entity sayısı tutarlılığı
        $entity_count = count($data['entities'] ?? []);
        $meta_count   = $data['meta']['entityCount'] ?? -1;
        if ($entity_count !== $meta_count) {
            $issues[] = "[WARN] meta.entityCount ({$meta_count}) != gerçek entity sayısı ({$entity_count})";
        }

        // 3. Index tutarlılığı — byId
        $by_id = $data['indexes']['byId'] ?? [];
        if (count($by_id) !== $entity_count) {
            $issues[] = "[WARN] byId index boyutu (" . count($by_id) . ") != entity sayısı ({$entity_count})";
        }

        // 4. Kırık ilişkiler
        $broken = $health['brokenRelations'] ?? 0;
        if ($broken > 0) {
            $issues[] = "[WARN] {$broken} kırık ilişki tespit edildi";
        }

        // 5. Entity alan kontrolü
        $required_entity_fields = ['id', 'category', 'slug', 'type', 'status', 'name_tr'];
        foreach ($data['entities'] ?? [] as $i => $entity) {
            foreach ($required_entity_fields as $field) {
                if (empty($entity[$field])) {
                    $issues[] = "[ERROR] Entity #{$i} ({$entity['id']}): eksik alan '{$field}'";
                }
            }
        }

        // Sonuç
        if (empty($issues)) {
            $this->line('OK — Tüm doğrulamalar geçti.');
            $this->line("  {$entity_count} entity, " . ($health['edgeCount'] ?? 0) . " edge, 0 sorun.");
        } else {
            $this->line(count($issues) . ' sorun bulundu:');
            $this->line('');
            foreach ($issues as $issue) {
                $this->line('  ' . $issue);
            }
        }
    }

    /**
     * Entity önbelleğini temizler ve veriyi yeniden yükler.
     *
     * php index.php entity_cli rebuild
     */
    public function rebuild(): void
    {
        $this->line('Entity cache temizleniyor...');
        $this->entity_cache->flush();

        $this->line('Entity verisi yeniden yükleniyor...');
        $this->entity_service->reload();

        $health = $this->entity_service->health();
        $this->line('');
        $this->line('OK — ' . ($health['total'] ?? 0) . ' entity yeniden yüklendi.');
        $this->line('Cache driver: ' . $this->entity_cache->get_driver());
    }

    /**
     * Entity verisini belirtilen dosyaya JSON olarak export eder.
     *
     * php index.php entity_cli export [output_path]
     *
     * @param  string|null $output_path  Varsayılan: APPPATH . 'cache/entity-export.json'
     */
    public function export(?string $output_path = NULL): void
    {
        $output_path = $output_path ?? APPPATH . 'cache/entity-export.json';

        $this->line("Entity verisi export ediliyor: {$output_path}");

        $data = $this->entity_service->raw();
        $json = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

        $dir = dirname($output_path);
        if (! is_dir($dir)) {
            mkdir($dir, 0755, TRUE);
        }

        $bytes = file_put_contents($output_path, $json . "\n", LOCK_EX);

        if ($bytes === FALSE) {
            $this->line('[ERROR] Dosya yazılamadı: ' . $output_path);
            return;
        }

        $health = $this->entity_service->health();
        $this->line('');
        $this->line('OK — Export tamamlandı.');
        $this->line("  {$output_path}");
        $this->line('  ' . ($health['total'] ?? 0) . ' entity, ' . $this->format_bytes($bytes));
    }

    // ------------------------------------------------------------------
    // Dahili
    // ------------------------------------------------------------------

    private function line(string $text): void
    {
        echo $text . PHP_EOL;
    }

    private function format_bytes(int $bytes): string
    {
        if ($bytes < 1024) {
            return $bytes . ' B';
        }
        return round($bytes / 1024, 1) . ' KB';
    }
}
