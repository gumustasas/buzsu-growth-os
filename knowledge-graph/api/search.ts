// knowledge-graph/api/search.ts
// Entity arama — ad, alias ve id üzerinden basit metin eşleştirme.

import type { Entity, EntityType } from '../../types/entity'
import { ENTITIES } from './index'

export interface EntitySearchOptions {
  type?: EntityType
  limit?: number
}

/**
 * Sorguyu entity adı (TR/EN), alias ve id alanlarında arar.
 * Büyük/küçük harf ve Türkçe karakter duyarsız (basit normalizasyon).
 */
export function searchEntities(query: string, options: EntitySearchOptions = {}): Entity[] {
  const q = normalize(query)
  if (!q) return []

  let results = ENTITIES.filter((e) => {
    const haystack = [
      e.id,
      e.frontmatter.name_tr,
      e.frontmatter.name_en ?? '',
      ...(e.frontmatter.aliases ?? []),
    ]
      .map(normalize)
      .join(' | ')
    return haystack.includes(q)
  })

  if (options.type) {
    results = results.filter((e) => e.frontmatter.entity_type === options.type)
  }
  if (options.limit && options.limit > 0) {
    results = results.slice(0, options.limit)
  }
  return results
}

/** Türkçe karakterleri sadeleştirip küçük harfe çevirir. */
function normalize(s: string): string {
  return s
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i')
    .replace(/ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .trim()
}
