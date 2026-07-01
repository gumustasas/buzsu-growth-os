// services/entity-service/types.ts
// Entity Service — servis katmanı tipleri. types/entity.ts'deki temel Entity
// tipini yeniden kullanır; Repository/Loader/Resolver/Relations/Search/
// Validator bileşenleri arasında ortak sözleşmedir.

import type { Entity, EntityFrontmatter, EntityRelation, EntityType } from '../../types/entity'

export type { Entity, EntityFrontmatter, EntityRelation, EntityType }

/**
 * knowledge-graph/ altındaki entity kategorisi klasör adı (örn. 'products', 'faq').
 *
 * Kasıtlı olarak `string` — sabit bir literal union DEĞİL. Önceki halinde kapalı
 * bir enum'du ve knowledge-graph/'a yeni kategori (problems/, standards/)
 * eklendiğinde EntityLoader bunları sessizce atlıyordu (bkz.
 * reports/entity-service-review.md Bölüm 4, bulgu #1 — P0). Kategoriler artık
 * `FilesystemEntityLoader` tarafından dizin taramasıyla dinamik keşfedilir;
 * burada sabit bir liste tutmak aynı hatayı tekrar üretir.
 */
export type EntityCategory = string

/** Kategori önekiyle tam kimlik (örn. 'products/code-su-aritma-cihazi'). Dosya uzantısı içermez. */
export type EntityId = string

/** Kategori önekini bilmeden dosya adından türeyen kısa kimlik (örn. 'code-su-aritma-cihazi'). */
export type EntitySlug = string

export interface EntityQuery {
  type?: EntityType
  status?: EntityFrontmatter['status']
  category?: EntityCategory
}

export interface EntitySearchOptions extends EntityQuery {
  limit?: number
}

export interface ValidationIssue {
  entityId: EntityId
  severity: 'error' | 'warning'
  field: string
  message: string
}

export interface ValidationResult {
  valid: boolean
  entityId: EntityId
  issues: ValidationIssue[]
}

export interface EntityServiceHealth {
  totalEntities: number
  byStatus: Record<EntityFrontmatter['status'], number>
  byType: Partial<Record<EntityType, number>>
  brokenRelations: number
  lastLoaded: string
}
