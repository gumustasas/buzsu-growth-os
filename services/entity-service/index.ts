// services/entity-service/index.ts
// Entity Service — dış dünyaya sunulan tek giriş noktası (facade).
//
// Veri akışı:
//   FilesystemEntityLoader  (knowledge-graph/*.md okur, frontmatter ayrıştırır)
//           ↓
//   InMemoryEntityRepository  (yüklenmiş Entity[] — sorgu erişimi)
//           ↓
//   EntityResolver / EntityRelations / EntitySearch / EntityValidator
//           ↓
//   EntityService  (getEntity, getBySlug, getByType, getRelated, search, validate)
//
// Kullanım:
//   import { getEntityService } from 'services/entity-service'
//   const service = getEntityService()
//   const entity = service.getEntity('products/code-su-aritma-cihazi')

import { FilesystemEntityLoader } from './EntityLoader'
import { InMemoryEntityRepository } from './EntityRepository'
import { DefaultEntityResolver } from './EntityResolver'
import { GraphEntityRelations } from './EntityRelations'
import { TextEntitySearch } from './EntitySearch'
import { DefaultEntityValidator } from './EntityValidator'
import { DefaultEntityExporter } from './EntityExporter'
import type {
  Entity,
  EntityCategory,
  EntitySearchOptions,
  EntityServiceHealth,
  EntityType,
  ValidationResult,
} from './types'
import type { EntityExportDoc } from './EntityExporter'

export * from './types'
export { FilesystemEntityLoader } from './EntityLoader'
export type { EntityLoader, LoadError, LoadResult } from './EntityLoader'
export { InMemoryEntityRepository } from './EntityRepository'
export type { EntityRepository } from './EntityRepository'
export { EntityIndex, normalizeText, categoryOf, slugOf } from './EntityIndex'
export type { SearchDoc } from './EntityIndex'
export { DefaultEntityResolver } from './EntityResolver'
export type { EntityResolver, ResolvedReferences } from './EntityResolver'
export { GraphEntityRelations } from './EntityRelations'
export type { EntityRelations, BrokenRelation, ConnectedEntity } from './EntityRelations'
export { TextEntitySearch } from './EntitySearch'
export type { EntitySearch } from './EntitySearch'
export { DefaultEntityValidator } from './EntityValidator'
export type { EntityValidator } from './EntityValidator'
export { DefaultEntityExporter, EXPORT_SCHEMA_VERSION } from './EntityExporter'
export type {
  EntityExporter,
  EntityExportDoc,
  EntityExportEntry,
  EntityExportIndexes,
  EntityExportStats,
} from './EntityExporter'
export { DefaultCI3Bridge, CI3_BUNDLE_VERSION, createCI3Bridge } from './CI3Bridge'
export type {
  CI3Bridge,
  CI3Bundle,
  CI3BootstrapConfig,
  CI3SchemaMapping,
  CI3LinkSuggestion,
} from './CI3Bridge'

export interface EntityService {
  /** Tam kimlik ile entity döner (örn. 'products/code-su-aritma-cihazi'). */
  getEntity(id: string): Entity | undefined
  /** Kategori önekini bilmeden, dosya adı slug'ı ile entity döner. */
  getBySlug(slug: string): Entity | undefined
  /** Verilen entity tipindeki tüm kayıtlar. */
  getByType(type: EntityType): Entity[]
  /** Verilen kategori klasöründeki tüm kayıtlar. */
  getByCategory(category: EntityCategory): Entity[]
  /** buzsu_url veya suvesu_url ile entity döner. */
  getByUrl(url: string): Entity | undefined
  /** Bir entity'nin ilişkili olduğu, çözülebilen entity'ler (outgoing). */
  getRelated(id: string): Entity[]
  /** Bu entity'e işaret eden entity'ler (incoming / reverse dependency). */
  getDependents(id: string): Entity[]
  /** Ad/alias/id üzerinde metin araması; tip/durum/kategori ile filtrelenebilir. */
  search(query: string, options?: EntitySearchOptions): Entity[]
  /** id verilirse tek entity'yi, verilmezse tüm depoyu doğrular. */
  validate(id?: string): ValidationResult | ValidationResult[]
  /** Depo özet sağlığı (toplam, duruma/tipe göre dağılım, kırık ilişki sayısı). */
  getHealth(): EntityServiceHealth
  /** Knowledge Graph'ı düz JSON belge nesnesi olarak dışa aktarır (entities.index.json içeriği). */
  export(): EntityExportDoc
  /** export() çıktısını verilen dosyaya yazar, yazılan yolu döner. */
  exportToFile(outPath: string): string
  /** Depoyu diskten yeniden yükler (dosya değişikliği sonrası). */
  reload(): void
}

class DefaultEntityService implements EntityService {
  private readonly repository: InMemoryEntityRepository
  private readonly resolver: DefaultEntityResolver
  private readonly relations: GraphEntityRelations
  private readonly searchEngine: TextEntitySearch
  private readonly validator: DefaultEntityValidator
  private readonly exporter: DefaultEntityExporter

  constructor(kgRoot?: string) {
    const loader = new FilesystemEntityLoader(kgRoot)
    this.repository = new InMemoryEntityRepository(loader)
    this.resolver = new DefaultEntityResolver(this.repository)
    this.relations = new GraphEntityRelations(this.repository, this.resolver)
    this.searchEngine = new TextEntitySearch(this.repository)
    this.validator = new DefaultEntityValidator(this.repository, this.resolver)
    this.exporter = new DefaultEntityExporter(this.repository, this.relations)
  }

  getEntity(id: string): Entity | undefined {
    return this.resolver.resolveById(id)
  }

  getBySlug(slug: string): Entity | undefined {
    return this.resolver.resolveBySlug(slug)
  }

  getByType(type: EntityType): Entity[] {
    return this.repository.getByType(type)
  }

  getByCategory(category: EntityCategory): Entity[] {
    return this.repository.getByCategory(category)
  }

  getByUrl(url: string): Entity | undefined {
    return this.resolver.resolveByUrl(url)
  }

  getRelated(id: string): Entity[] {
    return this.relations.getRelated(id)
  }

  getDependents(id: string): Entity[] {
    return this.relations.getDependents(id)
  }

  search(query: string, options?: EntitySearchOptions): Entity[] {
    return this.searchEngine.search(query, options)
  }

  export(): EntityExportDoc {
    return this.exporter.buildDoc()
  }

  exportToFile(outPath: string): string {
    return this.exporter.writeToFile(outPath)
  }

  validate(id?: string): ValidationResult | ValidationResult[] {
    return id ? this.validator.validate(id) : this.validator.validateAll()
  }

  getHealth(): EntityServiceHealth {
    const all = this.repository.getAll()
    const byStatus: EntityServiceHealth['byStatus'] = { seed: 0, reviewed: 0, published: 0 }
    const byType: EntityServiceHealth['byType'] = {}
    for (const e of all) {
      byStatus[e.frontmatter.status] = (byStatus[e.frontmatter.status] ?? 0) + 1
      byType[e.frontmatter.entity_type] = (byType[e.frontmatter.entity_type] ?? 0) + 1
    }
    return {
      totalEntities: all.length,
      byStatus,
      byType,
      brokenRelations: this.relations.getBrokenRelations().length,
      lastLoaded: new Date().toISOString(),
    }
  }

  reload(): void {
    this.repository.reload()
  }
}

let instance: EntityService | undefined

/** Singleton EntityService — knowledge-graph/ kökünü otomatik bulur. */
export function getEntityService(): EntityService {
  if (!instance) instance = new DefaultEntityService()
  return instance
}

/** Test veya alternatif knowledge-graph kökü için yeni, bağımsız bir instance üretir. */
export function createEntityService(kgRoot?: string): EntityService {
  return new DefaultEntityService(kgRoot)
}
