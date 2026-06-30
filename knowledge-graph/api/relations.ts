// knowledge-graph/api/relations.ts
// Entity ilişki grafiği — related_entities frontmatter alanından türetilir.

import type { Entity, EntityRelation } from '../../types/entity'
import { ENTITIES, getEntityById } from './index'

/**
 * Bir entity'nin doğrudan ilişkili olduğu entity'leri döner.
 * Tanımsız hedefler (henüz oluşturulmamış entity'ler) atlanır.
 */
export function getRelatedEntities(entityId: string): Entity[] {
  const entity = getEntityById(entityId)
  if (!entity) return []
  const related = entity.frontmatter.related_entities ?? []
  return related
    .map((id) => getEntityById(id))
    .filter((e): e is Entity => e !== undefined)
}

/**
 * Tüm grafiği kenar (edge) listesi olarak döner.
 * related_entities → 'related' tipi kenar. Çift yönlü olabilir.
 */
export function getAllRelations(): EntityRelation[] {
  const edges: EntityRelation[] = []
  for (const e of ENTITIES) {
    for (const target of e.frontmatter.related_entities ?? []) {
      if (getEntityById(target)) {
        edges.push({ from: e.id, to: target, type: 'related' })
      }
    }
  }
  return edges
}

/**
 * İki entity arasında doğrudan ilişki var mı?
 */
export function areRelated(a: string, b: string): boolean {
  const ea = getEntityById(a)
  if (!ea) return false
  return (ea.frontmatter.related_entities ?? []).includes(b)
}

/**
 * En çok bağlantıya sahip entity'leri döner (graf merkeziyeti — basit derece).
 */
export function getMostConnected(limit = 5): Array<{ entity: Entity; degree: number }> {
  const degreeMap = new Map<string, number>()
  for (const edge of getAllRelations()) {
    degreeMap.set(edge.from, (degreeMap.get(edge.from) ?? 0) + 1)
    degreeMap.set(edge.to, (degreeMap.get(edge.to) ?? 0) + 1)
  }
  return Array.from(degreeMap.entries())
    .map(([id, degree]) => ({ entity: getEntityById(id)!, degree }))
    .filter((x) => x.entity)
    .sort((a, b) => b.degree - a.degree)
    .slice(0, limit)
}
