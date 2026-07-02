// services/entity-service/EntityIndex.ts
// Sprint-7.2 — Önceden hesaplanmış (precomputed) arama yapıları. EntityLoader'ın
// ürettiği Entity[] üzerinden id/slug/category/type/alias/url ve ters bağımlılık
// (getDependents) haritalarını tek geçişte kurar. Repository bu index'i reload()
// başına bir kez inşa eder; getByType/getByCategory/resolveBySlug/search gibi
// sorgular artık O(n) tam tarama yerine O(1) harita erişimi kullanır.
//
// bkz. reports/entity-service-review.md Bölüm 3 — "EntityIndex: Yok — en kritik eksik".

import type { Entity, EntityFrontmatter, EntityType } from './types'

/** Substring araması için entity başına önceden normalize edilmiş metin belgesi. */
export interface SearchDoc {
  entity: Entity
  haystack: string
}

/**
 * Türkçe karakterleri sadeleştirip küçük harfe çevirir. EntitySearch ve
 * knowledge-graph/api/search.ts ile aynı mantık — tek kaynak burada tutulur.
 */
export function normalizeText(s: string): string {
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

/** Entity id'sinden kategori öneki (örn. 'products/x' → 'products'). */
export function categoryOf(id: string): string {
  return id.split('/')[0]
}

/** Entity id'sinden slug (örn. 'products/x' → 'x'). */
export function slugOf(id: string): string {
  const parts = id.split('/')
  return parts[parts.length - 1]
}

function push<K>(map: Map<K, Entity[]>, key: K, entity: Entity): void {
  const list = map.get(key)
  if (list) list.push(entity)
  else map.set(key, [entity])
}

/**
 * Bellek-içi, salt-okunur entity index'i. Kurulduktan sonra değişmez (immutable);
 * yeniden yükleme için yeni bir örnek oluşturulur (Repository.reload bunu yapar).
 */
export class EntityIndex {
  private readonly _all: Entity[]
  private readonly _byId = new Map<string, Entity>()
  private readonly _bySlug = new Map<string, Entity[]>()
  private readonly _byCategory = new Map<string, Entity[]>()
  private readonly _byType = new Map<EntityType, Entity[]>()
  private readonly _byStatus = new Map<EntityFrontmatter['status'], Entity[]>()
  private readonly _byUrl = new Map<string, Entity>()
  private readonly _byAlias = new Map<string, Entity[]>()
  private readonly _dependents = new Map<string, Entity[]>()
  private readonly _searchDocs: SearchDoc[] = []

  constructor(entities: Entity[]) {
    this._all = entities
    for (const e of entities) {
      // Aynı id iki kez gelirse ilk kayıt korunur (deterministik).
      if (!this._byId.has(e.id)) this._byId.set(e.id, e)
      push(this._bySlug, slugOf(e.id), e)
      push(this._byCategory, categoryOf(e.id), e)
      push(this._byType, e.frontmatter.entity_type, e)
      push(this._byStatus, e.frontmatter.status, e)

      if (e.frontmatter.buzsu_url) this._byUrl.set(e.frontmatter.buzsu_url, e)
      if (e.frontmatter.suvesu_url) this._byUrl.set(e.frontmatter.suvesu_url, e)

      for (const key of aliasKeys(e)) push(this._byAlias, key, e)

      this._searchDocs.push({ entity: e, haystack: buildHaystack(e) })
    }

    // Ters bağımlılık: A → B kenarı için B'nin dependents listesine A eklenir.
    // Yalnızca çözülebilen (depoda var olan) hedefler dikkate alınır.
    for (const e of entities) {
      for (const target of e.frontmatter.related_entities ?? []) {
        if (this._byId.has(target)) push(this._dependents, target, e)
      }
    }
  }

  all(): Entity[] {
    return this._all.slice()
  }

  size(): number {
    return this._byId.size
  }

  byId(id: string): Entity | undefined {
    return this._byId.get(id)
  }

  bySlug(slug: string): Entity[] {
    return copy(this._bySlug.get(slug))
  }

  byCategory(category: string): Entity[] {
    return copy(this._byCategory.get(category))
  }

  byType(type: EntityType): Entity[] {
    return copy(this._byType.get(type))
  }

  byStatus(status: EntityFrontmatter['status']): Entity[] {
    return copy(this._byStatus.get(status))
  }

  byUrl(url: string): Entity | undefined {
    return this._byUrl.get(url)
  }

  /** Normalize edilmiş bir ad/alias anahtarıyla tam eşleşen entity'ler. */
  byAlias(alias: string): Entity[] {
    return copy(this._byAlias.get(normalizeText(alias)))
  }

  /** Bu entity'e related_entities üzerinden işaret eden (ona bağımlı) entity'ler. */
  getDependents(id: string): Entity[] {
    return copy(this._dependents.get(id))
  }

  /** Substring araması için önceden hesaplanmış belgeler (EntitySearch kullanır). */
  searchDocs(): SearchDoc[] {
    return this._searchDocs
  }

  /** Kategori adlarının listesi (dinamik keşiften türeyen). */
  categories(): string[] {
    return Array.from(this._byCategory.keys()).sort()
  }
}

/** Bir entity'nin ad/alias arama anahtarları (normalize edilmiş). */
function aliasKeys(e: Entity): string[] {
  const raw = [e.frontmatter.name_tr, e.frontmatter.name_en ?? '', ...(e.frontmatter.aliases ?? [])]
  return raw.filter(Boolean).map(normalizeText)
}

/** Substring araması için tek bir normalize edilmiş metin bloğu. */
function buildHaystack(e: Entity): string {
  return [e.id, e.frontmatter.name_tr, e.frontmatter.name_en ?? '', ...(e.frontmatter.aliases ?? [])]
    .map(normalizeText)
    .join(' | ')
}

function copy(list: Entity[] | undefined): Entity[] {
  return list ? list.slice() : []
}
