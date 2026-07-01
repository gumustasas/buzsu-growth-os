// services/entity-service/EntitySearch.ts
// Metin arama — ad (TR/EN), alias ve id üzerinde basit normalize edilmiş
// eşleştirme. Tip/durum/kategori ile birleştirilebilir (bkz. EntitySearchOptions).

import type { Entity, EntitySearchOptions } from './types'
import type { EntityRepository } from './EntityRepository'

export interface EntitySearch {
  search(query: string, options?: EntitySearchOptions): Entity[]
}

export class TextEntitySearch implements EntitySearch {
  constructor(private readonly repository: EntityRepository) {}

  search(query: string, options: EntitySearchOptions = {}): Entity[] {
    const q = normalize(query)
    let results = this.repository.getAll()

    if (q) {
      results = results.filter((e) => {
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
    }

    if (options.type) results = results.filter((e) => e.frontmatter.entity_type === options.type)
    if (options.status) results = results.filter((e) => e.frontmatter.status === options.status)
    if (options.category) results = results.filter((e) => e.id.startsWith(`${options.category}/`))
    if (options.limit && options.limit > 0) results = results.slice(0, options.limit)

    return results
  }
}

/** Türkçe karakterleri sadeleştirip küçük harfe çevirir (knowledge-graph/api/search.ts ile aynı mantık). */
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
