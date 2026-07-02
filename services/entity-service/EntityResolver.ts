// services/entity-service/EntityResolver.ts
// Kimlik çözümleme — id, slug veya buzsu_url/suvesu_url üzerinden entity'e
// ulaşır. related_entities gibi referansların gerçek kayda çözülmesinden
// sorumludur; EntityRelations bu modülü kullanır, mantığını kopyalamaz.

import type { Entity } from './types'
import type { EntityRepository } from './EntityRepository'

export interface ResolvedReferences {
  resolved: Entity[]
  broken: string[]
}

export interface EntityResolver {
  /** Tam kimlik ile çözümler (örn. 'products/code-su-aritma-cihazi'). */
  resolveById(id: string): Entity | undefined
  /** Kategori önekini bilmeden, dosya adı bazlı slug ile çözümler. */
  resolveBySlug(slug: string): Entity | undefined
  /** buzsu_url veya suvesu_url alanına göre çözümler. */
  resolveByUrl(url: string): Entity | undefined
  /** related_entities listesindeki id'leri gerçek kayıtlara çözer; bulunamayanları ayrı döner. */
  resolveReferences(ids: string[]): ResolvedReferences
}

export class DefaultEntityResolver implements EntityResolver {
  constructor(private readonly repository: EntityRepository) {}

  resolveById(id: string): Entity | undefined {
    return this.repository.getById(id)
  }

  resolveBySlug(slug: string): Entity | undefined {
    // Slug birden fazla kategoride çakışabilir; ilk (deterministik) eşleşme döner.
    return this.repository.getIndex().bySlug(slug)[0]
  }

  resolveByUrl(url: string): Entity | undefined {
    return this.repository.getIndex().byUrl(url)
  }

  resolveReferences(ids: string[]): ResolvedReferences {
    const resolved: Entity[] = []
    const broken: string[] = []
    for (const id of ids) {
      const entity = this.repository.getById(id)
      if (entity) resolved.push(entity)
      else broken.push(id)
    }
    return { resolved, broken }
  }
}
