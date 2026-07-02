// services/entity-service/EntityRelations.ts
// İlişki grafiği — related_entities frontmatter alanından türetilir.
// EntityResolver üzerinden çalışır; kırık referansları sessizce yutmaz,
// getBrokenRelations() ile raporlanabilir hale getirir.

import type { Entity, EntityRelation } from './types'
import type { EntityRepository } from './EntityRepository'
import type { EntityResolver } from './EntityResolver'

export interface BrokenRelation {
  from: string
  to: string
}

export interface ConnectedEntity {
  entity: Entity
  degree: number
}

export interface EntityRelations {
  /** Bir entity'nin doğrudan ilişkili olduğu, çözülebilen entity'leri döner (outgoing). */
  getRelated(id: string): Entity[]
  /** Bu entity'e related_entities üzerinden işaret eden entity'ler (incoming / reverse dependency). */
  getDependents(id: string): Entity[]
  /** Tüm grafiği kenar (edge) listesi olarak döner. */
  getAllEdges(): EntityRelation[]
  /** İki entity arasında doğrudan ilişki var mı? */
  areRelated(a: string, b: string): boolean
  /** related_entities içinde tanımlı ama depoda bulunamayan hedefler. */
  getBrokenRelations(): BrokenRelation[]
  /** En çok bağlantıya sahip entity'ler (basit derece merkeziyeti). */
  getMostConnected(limit?: number): ConnectedEntity[]
}

export class GraphEntityRelations implements EntityRelations {
  constructor(
    private readonly repository: EntityRepository,
    private readonly resolver: EntityResolver
  ) {}

  getRelated(id: string): Entity[] {
    const entity = this.repository.getById(id)
    if (!entity) return []
    const { resolved } = this.resolver.resolveReferences(entity.frontmatter.related_entities ?? [])
    return resolved
  }

  getDependents(id: string): Entity[] {
    // Ters bağımlılık index'ten O(1) — önceden hesaplanmış reverse edge listesi.
    return this.repository.getIndex().getDependents(id)
  }

  getAllEdges(): EntityRelation[] {
    const edges: EntityRelation[] = []
    for (const e of this.repository.getAll()) {
      for (const target of e.frontmatter.related_entities ?? []) {
        if (this.repository.getById(target)) {
          edges.push({ from: e.id, to: target, type: 'related' })
        }
      }
    }
    return edges
  }

  areRelated(a: string, b: string): boolean {
    const entity = this.repository.getById(a)
    return (entity?.frontmatter.related_entities ?? []).includes(b)
  }

  getBrokenRelations(): BrokenRelation[] {
    const broken: BrokenRelation[] = []
    for (const e of this.repository.getAll()) {
      for (const target of e.frontmatter.related_entities ?? []) {
        if (!this.repository.getById(target)) {
          broken.push({ from: e.id, to: target })
        }
      }
    }
    return broken
  }

  getMostConnected(limit = 5): ConnectedEntity[] {
    const degree = new Map<string, number>()
    for (const edge of this.getAllEdges()) {
      degree.set(edge.from, (degree.get(edge.from) ?? 0) + 1)
      degree.set(edge.to, (degree.get(edge.to) ?? 0) + 1)
    }
    return Array.from(degree.entries())
      .map(([id, d]) => ({ entity: this.repository.getById(id), degree: d }))
      .filter((x): x is ConnectedEntity => x.entity !== undefined)
      .sort((a, b) => b.degree - a.degree)
      .slice(0, limit)
  }
}
