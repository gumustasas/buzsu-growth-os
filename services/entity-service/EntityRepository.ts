// services/entity-service/EntityRepository.ts
// Bellek-içi entity deposu — EntityLoader çıktısını tutar, temel sorgu
// erişimini sağlar. Repository "nasıl okunduğunu" bilmez; yalnızca yüklenmiş
// veri üzerinde sorgu çalıştırır (okuma kaynağından bağımsız — Repository pattern).

import type { Entity, EntityCategory, EntityFrontmatter, EntityQuery, EntityType } from './types'
import type { EntityLoader, LoadError } from './EntityLoader'

export interface EntityRepository {
  /** Depoyu diskten yeniden yükler. */
  reload(): void
  /** Son reload() sırasında oluşan ayrıştırma hataları. */
  getLoadErrors(): LoadError[]
  getAll(): Entity[]
  getById(id: string): Entity | undefined
  getByType(type: EntityType): Entity[]
  getByStatus(status: EntityFrontmatter['status']): Entity[]
  getByCategory(category: EntityCategory): Entity[]
  query(query: EntityQuery): Entity[]
  count(): number
}

export class InMemoryEntityRepository implements EntityRepository {
  private entities: Map<string, Entity> = new Map()
  private loadErrors: LoadError[] = []

  constructor(private readonly loader: EntityLoader) {
    this.reload()
  }

  reload(): void {
    const { entities, errors } = this.loader.loadAll()
    this.entities = new Map(entities.map((e) => [e.id, e]))
    this.loadErrors = errors
  }

  getLoadErrors(): LoadError[] {
    return this.loadErrors
  }

  getAll(): Entity[] {
    return Array.from(this.entities.values())
  }

  getById(id: string): Entity | undefined {
    return this.entities.get(id)
  }

  getByType(type: EntityType): Entity[] {
    return this.getAll().filter((e) => e.frontmatter.entity_type === type)
  }

  getByStatus(status: EntityFrontmatter['status']): Entity[] {
    return this.getAll().filter((e) => e.frontmatter.status === status)
  }

  getByCategory(category: EntityCategory): Entity[] {
    return this.getAll().filter((e) => e.id.startsWith(`${category}/`))
  }

  query(query: EntityQuery): Entity[] {
    return this.getAll().filter((e) => {
      if (query.type && e.frontmatter.entity_type !== query.type) return false
      if (query.status && e.frontmatter.status !== query.status) return false
      if (query.category && !e.id.startsWith(`${query.category}/`)) return false
      return true
    })
  }

  count(): number {
    return this.entities.size
  }
}
