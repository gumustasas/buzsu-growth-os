// services/entity-service/EntityRepository.ts
// Bellek-içi entity deposu — EntityLoader çıktısını tutar, temel sorgu
// erişimini sağlar. Repository "nasıl okunduğunu" bilmez; yalnızca yüklenmiş
// veri üzerinde sorgu çalıştırır (okuma kaynağından bağımsız — Repository pattern).
//
// Sprint-7.2: sorgular artık reload() başına bir kez kurulan EntityIndex
// üzerinden O(1) çalışır (önceki hali her çağrıda getAll().filter() ile O(n)'di).

import type { Entity, EntityCategory, EntityFrontmatter, EntityQuery, EntityType } from './types'
import type { EntityLoader, LoadError } from './EntityLoader'
import { EntityIndex } from './EntityIndex'

export interface EntityRepository {
  /** Depoyu diskten yeniden yükler. */
  reload(): void
  /** Son reload() sırasında oluşan ayrıştırma hataları. */
  getLoadErrors(): LoadError[]
  /** Önceden hesaplanmış index (id/slug/category/type/alias/url/dependents). */
  getIndex(): EntityIndex
  getAll(): Entity[]
  getById(id: string): Entity | undefined
  getByType(type: EntityType): Entity[]
  getByStatus(status: EntityFrontmatter['status']): Entity[]
  getByCategory(category: EntityCategory): Entity[]
  query(query: EntityQuery): Entity[]
  count(): number
}

export class InMemoryEntityRepository implements EntityRepository {
  private index: EntityIndex = new EntityIndex([])
  private loadErrors: LoadError[] = []

  constructor(private readonly loader: EntityLoader) {
    this.reload()
  }

  reload(): void {
    const { entities, errors } = this.loader.loadAll()
    this.index = new EntityIndex(entities)
    this.loadErrors = errors
  }

  getLoadErrors(): LoadError[] {
    return this.loadErrors
  }

  getIndex(): EntityIndex {
    return this.index
  }

  getAll(): Entity[] {
    return this.index.all()
  }

  getById(id: string): Entity | undefined {
    return this.index.byId(id)
  }

  getByType(type: EntityType): Entity[] {
    return this.index.byType(type)
  }

  getByStatus(status: EntityFrontmatter['status']): Entity[] {
    return this.index.byStatus(status)
  }

  getByCategory(category: EntityCategory): Entity[] {
    return this.index.byCategory(category)
  }

  query(query: EntityQuery): Entity[] {
    // En seçici index'ten başla, kalan kriterleri üzerine filtrele.
    let base: Entity[]
    if (query.category) base = this.index.byCategory(query.category)
    else if (query.type) base = this.index.byType(query.type)
    else if (query.status) base = this.index.byStatus(query.status)
    else base = this.index.all()

    return base.filter((e) => {
      if (query.type && e.frontmatter.entity_type !== query.type) return false
      if (query.status && e.frontmatter.status !== query.status) return false
      if (query.category && !e.id.startsWith(`${query.category}/`)) return false
      return true
    })
  }

  count(): number {
    return this.index.size()
  }
}
