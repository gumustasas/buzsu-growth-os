<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------
| Entity Service Configuration — Sprint-7.4
| -------------------------------------------------------------------
| CI3 tarafından entities.index.json bundle'ını tüketmek için ayarlar.
| Gerçek değerler CI3 projesine taşınırken ortam değişkenlerine bağlanmalıdır.
|
| Bu dosya DRAFT'tır — CLAUDE.md kuralları gereği insan onayı sonrası
| buzsu.com.tr CI3 projesine uygulanır.
*/

$config['entity_json_path']   = APPPATH . 'cache/entity-service/entities.index.json';
$config['entity_schema_path'] = APPPATH . 'cache/entity-service/ci3-schema-map.json';
$config['entity_link_path']   = APPPATH . 'cache/entity-service/ci3-link-map.json';
$config['entity_config_path'] = APPPATH . 'cache/entity-service/ci3-entity-config.json';

$config['entity_cache_driver'] = 'file'; // 'apcu' | 'file'
$config['entity_cache_ttl']    = 3600;   // saniye
$config['entity_cache_dir']    = APPPATH . 'cache/entity-service/cache/';

$config['entity_schema_enabled']  = TRUE;
$config['entity_linking_enabled'] = TRUE;
