// services/entity-service/EntityExporter.ts
// Sprint-7.3 — Knowledge Graph'ı tek bir düz JSON dosyasına (entities.index.json)
// aktarır. Bu dosya, her process başında 39+ markdown dosyasını ayrı ayrı
// okumak yerine tek seferde tüketilebilir; CI3/PHP (json_decode → assoc array)
// ve n8n (entity-indexer workflow) tarafından doğrudan okunabilir.
//
// Düz format kuralları (PHP/n8n uyumu):
//   - indexes.* değerleri id STRING dizileridir (nesne referansı değil)
//   - byId: id → entities dizisindeki tam sayı konum (assoc array id→int)
//   - byUrl: url → id (tekil)
//   - edges / dependents: string tabanlı, iç içe nesne yok
//
// bkz. reports/entity-service-review.md Bölüm 3 — "EntityExporter: Yok" +
// automation/n8n/workflows/entity-indexer.md

import * as fs from 'fs'
import * as path from 'path'
import type { Entity, EntityFrontmatter, EntityRelation, EntityType } from './types'
import type { EntityRepository } from './EntityRepository'
import type { EntityRelations } from './EntityRelations'
import { categoryOf, normalizeText, slugOf } from './EntityIndex'

/** entities.index.json şema sürümü. Kırıcı format değişikliğinde artırılır. */
export const EXPORT_SCHEMA_VERSION = 1

export interface EntityExportEntry {
  id: string
  category: string
  slug: string
  type: EntityType
  status: EntityFrontmatter['status']
  name_tr: string
  name_en: string | null
  aliases: string[]
  buzsu_url: string | null
  suvesu_url: string | null
  related: string[]
}

export interface EntityExportIndexes {
  byId: Record<string, number>
  bySlug: Record<string, string[]>
  byCategory: Record<string, string[]>
  byType: Record<string, string[]>
  byAlias: Record<string, string[]>
  byUrl: Record<string, string>
}

export interface EntityExportStats {
  total: number
  edgeCount: number
  brokenRelations: number
  byType: Record<string, number>
  byStatus: Record<string, number>
  byCategory: Record<string, number>
}

export interface EntityExportDoc {
  meta: {
    generatedAt: string
    schemaVersion: number
    entityCount: number
    source: string
  }
  entities: EntityExportEntry[]
  indexes: EntityExportIndexes
  edges: EntityRelation[]
  dependents: Record<string, string[]>
  stats: EntityExportStats
}

export interface EntityExporter {
  /** Bellek-içi index'ten düz JSON belge nesnesi üretir. */
  buildDoc(): EntityExportDoc
  /** buildDoc() çıktısını 2-boşluk girintili JSON string'e çevirir. */
  toJSON(): string
  /** JSON'u verilen dosyaya yazar (dizin yoksa oluşturur), yazılan yolu döner. */
  writeToFile(outPath: string): string
}

export class DefaultEntityExporter implements EntityExporter {
  constructor(
    private readonly repository: EntityRepository,
    private readonly relations: EntityRelations,
    private readonly source = 'knowledge-graph/'
  ) {}

  buildDoc(): EntityExportDoc {
    const all = this.repository.getAll()
    const entities = all.map(toExportEntry)
    const edges = this.relations.getAllEdges()

    return {
      meta: {
        generatedAt: new Date().toISOString(),
        schemaVersion: EXPORT_SCHEMA_VERSION,
        entityCount: entities.length,
        source: this.source,
      },
      entities,
      indexes: buildIndexes(all),
      edges,
      dependents: buildDependents(all, this.repository),
      stats: buildStats(all, edges.length, this.relations.getBrokenRelations().length),
    }
  }

  toJSON(): string {
    return JSON.stringify(this.buildDoc(), null, 2)
  }

  writeToFile(outPath: string): string {
    const dir = path.dirname(outPath)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(outPath, this.toJSON() + '\n')
    return outPath
  }
}

function toExportEntry(e: Entity): EntityExportEntry {
  return {
    id: e.id,
    category: categoryOf(e.id),
    slug: slugOf(e.id),
    type: e.frontmatter.entity_type,
    status: e.frontmatter.status,
    name_tr: e.frontmatter.name_tr,
    name_en: e.frontmatter.name_en ?? null,
    aliases: e.frontmatter.aliases ?? [],
    buzsu_url: e.frontmatter.buzsu_url ?? null,
    suvesu_url: e.frontmatter.suvesu_url ?? null,
    related: e.frontmatter.related_entities ?? [],
  }
}

function buildIndexes(all: Entity[]): EntityExportIndexes {
  const byId: Record<string, number> = {}
  const bySlug: Record<string, string[]> = {}
  const byCategory: Record<string, string[]> = {}
  const byType: Record<string, string[]> = {}
  const byAlias: Record<string, string[]> = {}
  const byUrl: Record<string, string> = {}

  all.forEach((e, i) => {
    byId[e.id] = i
    pushId(bySlug, slugOf(e.id), e.id)
    pushId(byCategory, categoryOf(e.id), e.id)
    pushId(byType, e.frontmatter.entity_type, e.id)
    for (const alias of aliasKeys(e)) pushId(byAlias, alias, e.id)
    if (e.frontmatter.buzsu_url) byUrl[e.frontmatter.buzsu_url] = e.id
    if (e.frontmatter.suvesu_url) byUrl[e.frontmatter.suvesu_url] = e.id
  })

  return { byId, bySlug, byCategory, byType, byAlias, byUrl }
}

function buildDependents(all: Entity[], repository: EntityRepository): Record<string, string[]> {
  const dependents: Record<string, string[]> = {}
  for (const e of all) {
    for (const target of e.frontmatter.related_entities ?? []) {
      if (repository.getById(target)) pushId(dependents, target, e.id)
    }
  }
  return dependents
}

function buildStats(all: Entity[], edgeCount: number, brokenRelations: number): EntityExportStats {
  const byType: Record<string, number> = {}
  const byStatus: Record<string, number> = {}
  const byCategory: Record<string, number> = {}
  for (const e of all) {
    byType[e.frontmatter.entity_type] = (byType[e.frontmatter.entity_type] ?? 0) + 1
    byStatus[e.frontmatter.status] = (byStatus[e.frontmatter.status] ?? 0) + 1
    const cat = categoryOf(e.id)
    byCategory[cat] = (byCategory[cat] ?? 0) + 1
  }
  return { total: all.length, edgeCount, brokenRelations, byType, byStatus, byCategory }
}

function aliasKeys(e: Entity): string[] {
  return [e.frontmatter.name_tr, e.frontmatter.name_en ?? '', ...(e.frontmatter.aliases ?? [])]
    .filter(Boolean)
    .map(normalizeText)
}

function pushId(map: Record<string, string[]>, key: string, id: string): void {
  const list = map[key]
  if (list) list.push(id)
  else map[key] = [id]
}
