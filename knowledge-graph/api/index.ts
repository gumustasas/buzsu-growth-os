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
      aliases: ['Kireçlenme', 'Kalsiyum Karbonat', 'Sert Su'],
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
