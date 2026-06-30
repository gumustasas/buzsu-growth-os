// types/entity.ts
// Knowledge Graph entity tipleri

export type EntityType =
  | 'Organization'
  | 'Brand'
  | 'Product'
  | 'Component'
  | 'Technology'
  | 'Certification'
  | 'Mineral'
  | 'Contaminant'
  | 'FAQ'
  | 'Glossary'
  | 'Location'

export interface EntityFrontmatter {
  entity_type: EntityType
  schema_type: string
  name_tr: string
  name_en?: string
  aliases?: string[]
  related_entities?: string[]
  buzsu_url?: string
  suvesu_url?: string
  sku?: string
  airtable_record?: string
  price_try?: number
  status: 'seed' | 'reviewed' | 'published'
}

export interface Entity {
  id: string // dosya yolu bazlı slug
  filePath: string
  frontmatter: EntityFrontmatter
  body: string
}

export interface EntityRelation {
  from: string // entity id
  to: string // entity id
  type: 'related' | 'mentions' | 'isPartOf' | 'produces' | 'serves'
}

export interface EntityGraphSummary {
  totalEntities: number
  targetEntities: number
  byType: Record<EntityType, number>
  source: 'mock' | 'filesystem'
  lastUpdated: string
}
