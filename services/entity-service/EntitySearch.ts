// services/entity-service/EntitySearch.ts
// Metin arama — ad (TR/EN), alias ve id üzerinde normalize edilmiş substring
// eşleştirme. Tip/durum/kategori ile birleştirilebilir (bkz. EntitySearchOptions).
//
// Sprint-7.2: haystack'ler artık her sorguda yeniden kurulmaz; EntityIndex
// bunları reload() başına bir kez hesaplar (searchDocs). Arama semantiği
// (substring) korunur — public davranış değişmez.

import type { Entity, EntitySearchOptions } from './types'
import type { EntityRepository } from './EntityRepository'
import { normalizeText } from './EntityIndex'

export interface EntitySearch {
  search(query: string, options?: EntitySearchOptions): Entity[]
}

export class TextEntitySearch implements EntitySearch {
  constructor(private readonly repository: EntityRepository) {}

  search(query: string, options: EntitySearchOptions = {}): Entity[] {
    const index = this.repository.getIndex()
    const q = normalizeText(query)

    let results: Entity[]
    if (q) {
      results = index
        .searchDocs()
        .filter((doc) => doc.haystack.includes(q))
        .map((doc) => doc.entity)
    } else {
      results = index.all()
    }

    if (options.type) results = results.filter((e) => e.frontmatter.entity_type === options.type)
    if (options.status) results = results.filter((e) => e.frontmatter.status === options.status)
    if (options.category) results = results.filter((e) => e.id.startsWith(`${options.category}/`))
    if (options.limit && options.limit > 0) results = results.slice(0, options.limit)

    return results
  }
}
