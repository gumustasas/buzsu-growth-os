// knowledge-graph/api/index.ts
// Knowledge Graph okuma API'si — entity kayıtlarına programatik erişim.
//
// Bu sprintte entity'ler statik bir kayıt olarak gömülüdür (filesystem okuması
// Sprint-4'te gray-matter ile eklenecek). Tüm fonksiyonlar production-ready
// interface sağlar.

import type {
  Entity,
  EntityType,
  EntityGraphSummary,
} from '../../types/entity'

export * from './search'
export * from './relations'

/**
 * Seed entity kayıtları. Sprint-2'de oluşturulan 10 markdown dosyasının
 * frontmatter özetleri. Gövde (body) Sprint-4'te dosyadan okunacak.
 */
export const ENTITIES: Entity[] = [
  {
    id: 'entities/organization-buzsu',
    filePath: 'knowledge-graph/entities/organization-buzsu.md',
    frontmatter: {
      entity_type: 'Organization',
      schema_type: 'schema.org/Organization',
      name_tr: 'Buzsu Su Arıtma Sistemleri',
      name_en: 'Buzsu Water Purification Systems',
      aliases: ['Buzsu', 'Buzsu.com.tr'],
      related_entities: ['brands/buzsu', 'locations/bartin', 'products/code-su-aritma-cihazi'],
      buzsu_url: 'https://www.buzsu.com.tr/',
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'brands/buzsu',
    filePath: 'knowledge-graph/brands/buzsu.md',
    frontmatter: {
      entity_type: 'Brand',
      schema_type: 'schema.org/Brand',
      name_tr: 'Buzsu',
      name_en: 'Buzsu',
      related_entities: ['entities/organization-buzsu', 'products/code-su-aritma-cihazi'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'products/code-su-aritma-cihazi',
    filePath: 'knowledge-graph/products/code-su-aritma-cihazi.md',
    frontmatter: {
      entity_type: 'Product',
      schema_type: 'schema.org/Product',
      name_tr: '5 Aşamalı RO Su Arıtma Sistemi',
      sku: 'BZS-RO5-001',
      price_try: 13749,
      airtable_record: 'rec6N4cIPgDjWFPHb',
      related_entities: ['brands/buzsu', 'technologies/ters-osmoz', 'components/ters-osmoz-membran', 'contaminants/kirec'],
      buzsu_url: 'https://www.buzsu.com.tr/code-su-aritma-cihazi/',
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'products/naturalsnet-11-asama',
    filePath: 'knowledge-graph/products/naturalsnet-11-asama.md',
    frontmatter: {
      entity_type: 'Product',
      schema_type: 'schema.org/Product',
      name_tr: 'Atıksız Su Arıtma Cihazı',
      sku: 'BZS-ATK-002',
      price_try: 9749,
      airtable_record: 'recQHKKmYpmizO1c2',
      related_entities: ['brands/buzsu', 'technologies/ters-osmoz', 'contaminants/kirec'],
      buzsu_url: 'https://www.buzsu.com.tr/atiksiz-su-aritma-cihazi/',
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'components/ters-osmoz-membran',
    filePath: 'knowledge-graph/components/ters-osmoz-membran.md',
    frontmatter: {
      entity_type: 'Component',
      schema_type: 'schema.org/Thing',
      name_tr: 'Ters Osmoz Membranı',
      name_en: 'Reverse Osmosis Membrane',
      related_entities: ['technologies/ters-osmoz', 'products/code-su-aritma-cihazi', 'contaminants/kirec'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'technologies/ters-osmoz',
    filePath: 'knowledge-graph/technologies/ters-osmoz.md',
    frontmatter: {
      entity_type: 'Technology',
      schema_type: 'schema.org/Thing',
      name_tr: 'Ters Osmoz',
      name_en: 'Reverse Osmosis',
      aliases: ['RO', 'Reverse Osmosis', 'Ters Osmoz Sistemi'],
      related_entities: ['components/ters-osmoz-membran', 'products/code-su-aritma-cihazi', 'contaminants/kirec', 'minerals/alkali-mineral'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'contaminants/kirec',
    filePath: 'knowledge-graph/contaminants/kirec.md',
    frontmatter: {
      entity_type: 'Contaminant',
      schema_type: 'schema.org/Thing',
      name_tr: 'Kireç',
      name_en: 'Limescale / Calcium Carbonate Scale',
      aliases: ['Kireçlenme', 'Kalsiyum Karbonat'],
      related_entities: ['technologies/ters-osmoz', 'components/ters-osmoz-membran', 'minerals/alkali-mineral', 'locations/bartin'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'minerals/alkali-mineral',
    filePath: 'knowledge-graph/minerals/alkali-mineral.md',
    frontmatter: {
      entity_type: 'Mineral',
      schema_type: 'schema.org/Thing',
      name_tr: 'Alkali Mineral',
      name_en: 'Alkaline Mineral',
      aliases: ['Kalsiyum', 'Magnezyum', 'Potasyum'],
      related_entities: ['technologies/ters-osmoz', 'contaminants/kirec', 'products/code-su-aritma-cihazi'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'faq/su-aritma-cihazi-nasil-secilir',
    filePath: 'knowledge-graph/faq/su-aritma-cihazi-nasil-secilir.md',
    frontmatter: {
      entity_type: 'FAQ',
      schema_type: 'schema.org/Question',
      name_tr: 'Su arıtma cihazı nasıl seçilir?',
      related_entities: ['technologies/ters-osmoz', 'products/code-su-aritma-cihazi', 'contaminants/kirec', 'minerals/alkali-mineral'],
      buzsu_url: 'https://www.buzsu.com.tr/su-aritma-cihazlari/',
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'locations/bartin',
    filePath: 'knowledge-graph/locations/bartin.md',
    frontmatter: {
      entity_type: 'Location',
      schema_type: 'schema.org/City',
      name_tr: 'Bartın',
      name_en: 'Bartın',
      related_entities: ['entities/organization-buzsu', 'brands/buzsu'],
      status: 'seed',
    },
    body: '',
  },
  // --- Sprint-6: 29 yeni entity (10 seed'den ~39'a genişletme) ---
  {
    id: 'brands/suvesu',
    filePath: 'knowledge-graph/brands/suvesu.md',
    frontmatter: {
      entity_type: 'Brand',
      schema_type: 'schema.org/WebSite',
      name_tr: 'Suvesu',
      name_en: 'Suvesu',
      aliases: ['Suvesu.com', 'Suvesu Blog'],
      related_entities: ['entities/organization-buzsu', 'brands/buzsu'],
      suvesu_url: 'https://www.suvesu.com/',
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'products/7-asamali-ro-uv',
    filePath: 'knowledge-graph/products/7-asamali-ro-uv.md',
    frontmatter: {
      entity_type: 'Product',
      schema_type: 'schema.org/Product',
      name_tr: '7 Aşamalı RO Su Arıtma Sistemi (UV Filtreli)',
      name_en: '7-Stage Reverse Osmosis Water Purification System (UV)',
      aliases: ['7 Aşamalı RO UV', '7 Aşamalı RO', 'UV Filtreli Tezgah Altı Su Arıtma', 'Pompalı Model'],
      sku: 'BZS-RO7-003',
      price_try: 12999,
      airtable_record: 'recRjPhML9cOi5sN8',
      related_entities: ['brands/buzsu', 'technologies/ters-osmoz', 'technologies/uv-sterilizasyon', 'components/ters-osmoz-membran', 'contaminants/kirec'],
      buzsu_url: 'https://www.buzsu.com.tr/uv-filtreli-tezgah-alti-su-aritma-cihazi-pompali-model/',
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'products/tds-metre',
    filePath: 'knowledge-graph/products/tds-metre.md',
    frontmatter: {
      entity_type: 'Product',
      schema_type: 'schema.org/Product',
      name_tr: 'Dijital TDS Metre',
      name_en: 'Digital TDS Meter',
      aliases: ['TDS Metre', 'Dijital TDS Ölçer'],
      sku: 'BZS-TDS-004',
      price_try: 450,
      airtable_record: 'recjwetUxnjUyYUZc',
      related_entities: ['brands/buzsu', 'problems/yuksek-tds-sorunu', 'faq/su-aritma-cihazi-nasil-secilir'],
      buzsu_url: 'https://www.buzsu.com.tr/tds-metre/',
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'products/yillik-filtre-seti',
    filePath: 'knowledge-graph/products/yillik-filtre-seti.md',
    frontmatter: {
      entity_type: 'Product',
      schema_type: 'schema.org/Product',
      name_tr: 'Yıllık Filtre Seti (5\'li)',
      name_en: 'Annual Filter Set (5-Piece)',
      aliases: ['Yıllık Filtre Seti', 'Filtre Seti', '5\'li Filtre Seti'],
      sku: 'BZS-FLT-005',
      price_try: 3390,
      airtable_record: 'reckhPWCISkmuueBS',
      related_entities: ['brands/buzsu', 'products/code-su-aritma-cihazi', 'components/ters-osmoz-membran', 'components/sediman-filtre', 'components/aktif-karbon-filtre'],
      buzsu_url: 'https://www.buzsu.com.tr/code-su-aritma-cihazi-5-li-filtre-seti-made-in-korea/',
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'components/sediman-filtre',
    filePath: 'knowledge-graph/components/sediman-filtre.md',
    frontmatter: {
      entity_type: 'Component',
      schema_type: 'schema.org/Thing',
      name_tr: 'Sediman Filtre',
      name_en: 'Sediment Filter',
      aliases: ['PP Filtre', 'Sediment Filtresi', 'Ön Filtre'],
      related_entities: ['technologies/ters-osmoz', 'technologies/su-filtrasyonu', 'contaminants/bulaniklik', 'components/aktif-karbon-filtre'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'components/aktif-karbon-filtre',
    filePath: 'knowledge-graph/components/aktif-karbon-filtre.md',
    frontmatter: {
      entity_type: 'Component',
      schema_type: 'schema.org/Thing',
      name_tr: 'Aktif Karbon Filtre (Granül)',
      name_en: 'Granular Activated Carbon (GAC) Filter',
      aliases: ['GAC Filtre', 'Granül Aktif Karbon', 'Aktif Karbon'],
      related_entities: ['technologies/aktif-karbon-filtrasyon', 'technologies/su-filtrasyonu', 'contaminants/klor', 'components/blok-karbon-filtre'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'components/blok-karbon-filtre',
    filePath: 'knowledge-graph/components/blok-karbon-filtre.md',
    frontmatter: {
      entity_type: 'Component',
      schema_type: 'schema.org/Thing',
      name_tr: 'Blok Karbon Filtre',
      name_en: 'Carbon Block Filter (CTO)',
      aliases: ['CTO Filtre', 'Karbon Blok Filtre'],
      related_entities: ['technologies/aktif-karbon-filtrasyon', 'technologies/su-filtrasyonu', 'contaminants/klor', 'components/aktif-karbon-filtre'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'components/post-karbon-filtre',
    filePath: 'knowledge-graph/components/post-karbon-filtre.md',
    frontmatter: {
      entity_type: 'Component',
      schema_type: 'schema.org/Thing',
      name_tr: 'Post Karbon Filtre',
      name_en: 'Post Carbon Filter',
      aliases: ['Son Aşama Karbon Filtre', 'Polisaj Filtresi'],
      related_entities: ['technologies/aktif-karbon-filtrasyon', 'components/ters-osmoz-membran', 'technologies/su-filtrasyonu'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'components/uf-membran',
    filePath: 'knowledge-graph/components/uf-membran.md',
    frontmatter: {
      entity_type: 'Component',
      schema_type: 'schema.org/Thing',
      name_tr: 'Ultrafiltrasyon (UF) Membranı',
      name_en: 'Ultrafiltration (UF) Membrane',
      aliases: ['UF Membran', 'Ultrafiltrasyon Membranı'],
      related_entities: ['technologies/ters-osmoz', 'components/ters-osmoz-membran', 'technologies/su-filtrasyonu'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'components/nf-membran',
    filePath: 'knowledge-graph/components/nf-membran.md',
    frontmatter: {
      entity_type: 'Component',
      schema_type: 'schema.org/Thing',
      name_tr: 'Nanofiltrasyon (NF) Membranı',
      name_en: 'Nanofiltration (NF) Membrane',
      aliases: ['NF Membran', 'Nanofiltrasyon Membranı'],
      related_entities: ['technologies/ters-osmoz', 'components/ters-osmoz-membran', 'technologies/su-filtrasyonu'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'components/mf-membran',
    filePath: 'knowledge-graph/components/mf-membran.md',
    frontmatter: {
      entity_type: 'Component',
      schema_type: 'schema.org/Thing',
      name_tr: 'Mikrofiltrasyon (MF) Membranı',
      name_en: 'Microfiltration (MF) Membrane',
      aliases: ['MF Membran', 'Mikrofiltrasyon Membranı'],
      related_entities: ['technologies/ters-osmoz', 'components/ters-osmoz-membran', 'technologies/su-filtrasyonu'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'contaminants/klor',
    filePath: 'knowledge-graph/contaminants/klor.md',
    frontmatter: {
      entity_type: 'Contaminant',
      schema_type: 'schema.org/Thing',
      name_tr: 'Klor',
      name_en: 'Chlorine (Residual Chlorine)',
      aliases: ['Kalıntı Klor', 'Klorlu Su', 'Klor Kokusu'],
      related_entities: ['technologies/aktif-karbon-filtrasyon', 'components/aktif-karbon-filtre', 'problems/kotu-tat-koku-sorunu'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'contaminants/bulaniklik',
    filePath: 'knowledge-graph/contaminants/bulaniklik.md',
    frontmatter: {
      entity_type: 'Contaminant',
      schema_type: 'schema.org/Thing',
      name_tr: 'Bulanıklık',
      name_en: 'Turbidity',
      aliases: ['Bulanık Su', 'Su Bulanıklığı'],
      related_entities: ['components/sediman-filtre', 'technologies/su-filtrasyonu'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'contaminants/agir-metaller',
    filePath: 'knowledge-graph/contaminants/agir-metaller.md',
    frontmatter: {
      entity_type: 'Contaminant',
      schema_type: 'schema.org/Thing',
      name_tr: 'Ağır Metaller',
      name_en: 'Heavy Metals',
      aliases: ['Kurşun', 'Arsenik', 'Cıva', 'Kadmiyum', 'Ağır Metal Kirliliği'],
      related_entities: ['technologies/ters-osmoz', 'components/ters-osmoz-membran'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'contaminants/nitrat',
    filePath: 'knowledge-graph/contaminants/nitrat.md',
    frontmatter: {
      entity_type: 'Contaminant',
      schema_type: 'schema.org/Thing',
      name_tr: 'Nitrat',
      name_en: 'Nitrate',
      aliases: ['Nitrit', 'Nitrat Kirliliği'],
      related_entities: ['technologies/ters-osmoz'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'problems/sert-su-sorunu',
    filePath: 'knowledge-graph/problems/sert-su-sorunu.md',
    frontmatter: {
      entity_type: 'Thing',
      schema_type: 'schema.org/Thing',
      name_tr: 'Sert Su Sorunu',
      name_en: 'Hard Water Problem',
      aliases: ['Sert Su', 'Su Sertliği Sorunu'],
      related_entities: ['contaminants/kirec'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'problems/kotu-tat-koku-sorunu',
    filePath: 'knowledge-graph/problems/kotu-tat-koku-sorunu.md',
    frontmatter: {
      entity_type: 'Thing',
      schema_type: 'schema.org/Thing',
      name_tr: 'Kötü Tat ve Koku Sorunu',
      name_en: 'Bad Taste and Odor Problem',
      aliases: ['Musluk Suyu Kokusu', 'Kötü Kokulu Su', 'Klor Kokusu Sorunu'],
      related_entities: ['contaminants/klor', 'components/aktif-karbon-filtre', 'components/post-karbon-filtre'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'problems/yuksek-tds-sorunu',
    filePath: 'knowledge-graph/problems/yuksek-tds-sorunu.md',
    frontmatter: {
      entity_type: 'Thing',
      schema_type: 'schema.org/Thing',
      name_tr: 'Yüksek TDS Sorunu',
      name_en: 'High TDS Problem',
      aliases: ['Yüksek TDS Değeri', 'TDS Sorunu'],
      related_entities: ['technologies/ters-osmoz', 'products/tds-metre', 'faq/su-aritma-cihazi-nasil-secilir'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'technologies/aktif-karbon-filtrasyon',
    filePath: 'knowledge-graph/technologies/aktif-karbon-filtrasyon.md',
    frontmatter: {
      entity_type: 'Technology',
      schema_type: 'schema.org/Thing',
      name_tr: 'Aktif Karbon Filtrasyon',
      name_en: 'Activated Carbon Filtration',
      aliases: ['Aktif Karbon Teknolojisi', 'Karbon Filtrasyon'],
      related_entities: ['components/aktif-karbon-filtre', 'components/blok-karbon-filtre', 'components/post-karbon-filtre', 'contaminants/klor', 'technologies/su-filtrasyonu'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'technologies/uv-sterilizasyon',
    filePath: 'knowledge-graph/technologies/uv-sterilizasyon.md',
    frontmatter: {
      entity_type: 'Technology',
      schema_type: 'schema.org/Thing',
      name_tr: 'UV Sterilizasyon',
      name_en: 'UV Sterilization / UV Disinfection',
      aliases: ['UV Dezenfeksiyon', 'Ultraviyole Sterilizasyon'],
      related_entities: ['products/7-asamali-ro-uv', 'technologies/ters-osmoz', 'technologies/su-filtrasyonu'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'technologies/su-yumusatma',
    filePath: 'knowledge-graph/technologies/su-yumusatma.md',
    frontmatter: {
      entity_type: 'Technology',
      schema_type: 'schema.org/Thing',
      name_tr: 'Su Yumuşatma',
      name_en: 'Water Softening (Ion Exchange)',
      aliases: ['İyon Değişimi', 'Su Yumuşatma Sistemi'],
      related_entities: ['contaminants/kirec', 'problems/sert-su-sorunu', 'technologies/su-filtrasyonu'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'technologies/su-filtrasyonu',
    filePath: 'knowledge-graph/technologies/su-filtrasyonu.md',
    frontmatter: {
      entity_type: 'Technology',
      schema_type: 'schema.org/Thing',
      name_tr: 'Su Filtrasyonu',
      name_en: 'Water Filtration',
      aliases: ['Su Arıtma Filtrasyonu', 'Filtrasyon Teknolojileri'],
      related_entities: ['technologies/ters-osmoz', 'components/ters-osmoz-membran', 'components/uf-membran', 'components/nf-membran', 'components/mf-membran', 'technologies/aktif-karbon-filtrasyon'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'standards/ts-266',
    filePath: 'knowledge-graph/standards/ts-266.md',
    frontmatter: {
      entity_type: 'DefinedTerm',
      schema_type: 'schema.org/DefinedTerm',
      name_tr: 'TS 266 (İnsani Tüketim Amaçlı Sular Standardı)',
      name_en: 'TS 266 (Water Intended for Human Consumption Standard)',
      aliases: ['TS 266', 'Türk Standardı 266'],
      related_entities: ['contaminants/kirec', 'contaminants/klor'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'standards/who-icme-suyu-kilavuzu',
    filePath: 'knowledge-graph/standards/who-icme-suyu-kilavuzu.md',
    frontmatter: {
      entity_type: 'DefinedTerm',
      schema_type: 'schema.org/DefinedTerm',
      name_tr: 'WHO İçme Suyu Kalitesi Kılavuzu',
      name_en: 'WHO Guidelines for Drinking-water Quality',
      aliases: ['WHO Su Kalitesi Standartları', 'Dünya Sağlık Örgütü İçme Suyu Kılavuzu'],
      related_entities: ['contaminants/agir-metaller', 'contaminants/nitrat'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'standards/turk-gida-kodeksi',
    filePath: 'knowledge-graph/standards/turk-gida-kodeksi.md',
    frontmatter: {
      entity_type: 'DefinedTerm',
      schema_type: 'schema.org/DefinedTerm',
      name_tr: 'Türk Gıda Kodeksi (İnsani Tüketim Amaçlı Sular Tebliği)',
      name_en: 'Turkish Food Codex (Water Intended for Human Consumption Communiqué)',
      aliases: ['Türk Gıda Kodeksi', 'İnsani Tüketim Amaçlı Sular Tebliği'],
      related_entities: ['minerals/alkali-mineral'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'certifications/nsf-ansi-58',
    filePath: 'knowledge-graph/certifications/nsf-ansi-58.md',
    frontmatter: {
      entity_type: 'DefinedTerm',
      schema_type: 'schema.org/DefinedTerm',
      name_tr: 'NSF/ANSI 58 Sertifikası',
      name_en: 'NSF/ANSI 58 Certification',
      aliases: ['NSF 58', 'Ters Osmoz Sertifikasyonu'],
      related_entities: ['technologies/ters-osmoz', 'components/ters-osmoz-membran'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'certifications/nsf-ansi-42',
    filePath: 'knowledge-graph/certifications/nsf-ansi-42.md',
    frontmatter: {
      entity_type: 'DefinedTerm',
      schema_type: 'schema.org/DefinedTerm',
      name_tr: 'NSF/ANSI 42 Sertifikası',
      name_en: 'NSF/ANSI 42 Certification',
      aliases: ['NSF 42', 'Estetik Etkiler Sertifikasyonu'],
      related_entities: ['technologies/aktif-karbon-filtrasyon', 'contaminants/klor'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'certifications/nsf-ansi-53',
    filePath: 'knowledge-graph/certifications/nsf-ansi-53.md',
    frontmatter: {
      entity_type: 'DefinedTerm',
      schema_type: 'schema.org/DefinedTerm',
      name_tr: 'NSF/ANSI 53 Sertifikası',
      name_en: 'NSF/ANSI 53 Certification',
      aliases: ['NSF 53', 'Sağlık Etkileri Sertifikasyonu'],
      related_entities: ['contaminants/agir-metaller', 'contaminants/nitrat'],
      status: 'seed',
    },
    body: '',
  },
  {
    id: 'certifications/ce-sertifikasi',
    filePath: 'knowledge-graph/certifications/ce-sertifikasi.md',
    frontmatter: {
      entity_type: 'DefinedTerm',
      schema_type: 'schema.org/DefinedTerm',
      name_tr: 'CE Sertifikası',
      name_en: 'CE Certification (CE Marking)',
      aliases: ['CE Belgesi', 'CE İşareti'],
      related_entities: ['brands/buzsu'],
      status: 'seed',
    },
    body: '',
  },
]

export const ENTITY_TARGET = 150

/** Tüm entity'leri döner. */
export function getAllEntities(): Entity[] {
  return ENTITIES
}

/** id ile tek entity döner. */
export function getEntityById(id: string): Entity | undefined {
  return ENTITIES.find((e) => e.id === id)
}

/** Tipe göre entity'leri filtreler. */
export function getEntitiesByType(type: EntityType): Entity[] {
  return ENTITIES.filter((e) => e.frontmatter.entity_type === type)
}

/** Dashboard EntityGraph widget'ı için özet. */
export function getEntityGraphSummary(): EntityGraphSummary {
  const byType = {} as Record<EntityType, number>
  for (const e of ENTITIES) {
    const t = e.frontmatter.entity_type
    byType[t] = (byType[t] ?? 0) + 1
  }
  return {
    totalEntities: ENTITIES.length,
    targetEntities: ENTITY_TARGET,
    byType,
    source: 'mock',
    lastUpdated: new Date().toISOString(),
  }
}
