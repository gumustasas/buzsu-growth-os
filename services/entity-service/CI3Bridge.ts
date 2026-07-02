// services/entity-service/CI3Bridge.ts
// Sprint-7.4 — Entity Service → CI3 köprüsü. EntityExporter çıktısını
// CI3/PHP tarafının tüketebileceği bir "bundle" paketine dönüştürür:
//   - entities.index.json (mevcut export, değişmedi)
//   - ci3-schema-map.json (entity → JSON-LD mapping)
//   - ci3-link-map.json (anchor/url çiftleri — internal linking hook)
//   - ci3-config.php (bootstrap ayarları — PHP include-ready)
//
// Public API'ye ekleme yok — bu modül EntityService'in iç tüketicisidir;
// dışarıya yalnızca CI3Bridge interface + buildBundle() factory export edilir.

import * as fs from 'fs'
import * as path from 'path'
import type { Entity, EntityFrontmatter } from './types'
import type { EntityExportDoc, EntityExportEntry } from './EntityExporter'
import { EXPORT_SCHEMA_VERSION } from './EntityExporter'

export const CI3_BUNDLE_VERSION = 1

export interface CI3BootstrapConfig {
  entityJsonPath: string
  schemaMapPath: string
  linkMapPath: string
  cacheTtl: number
  cacheDir: string
  bundleVersion: number
  exportSchemaVersion: number
}

export interface CI3SchemaMapping {
  entityId: string
  schemaType: string
  jsonLd: Record<string, unknown>
}

export interface CI3LinkSuggestion {
  anchor: string
  url: string
  entityId: string
  entityType: string
  aliases: string[]
}

export interface CI3Bundle {
  config: CI3BootstrapConfig
  exportDoc: EntityExportDoc
  schemaMappings: CI3SchemaMapping[]
  linkSuggestions: CI3LinkSuggestion[]
  generatedAt: string
  bundleVersion: number
}

export interface CI3Bridge {
  buildBundle(exportDoc: EntityExportDoc): CI3Bundle
  writeBundle(bundle: CI3Bundle, outDir: string): string[]
}

export class DefaultCI3Bridge implements CI3Bridge {
  constructor(
    private readonly basePath = 'application/cache/entity-service',
    private readonly cacheTtl = 3600
  ) {}

  buildBundle(exportDoc: EntityExportDoc): CI3Bundle {
    return {
      config: {
        entityJsonPath: `${this.basePath}/entities.index.json`,
        schemaMapPath: `${this.basePath}/ci3-schema-map.json`,
        linkMapPath: `${this.basePath}/ci3-link-map.json`,
        cacheTtl: this.cacheTtl,
        cacheDir: `${this.basePath}/cache`,
        bundleVersion: CI3_BUNDLE_VERSION,
        exportSchemaVersion: EXPORT_SCHEMA_VERSION,
      },
      exportDoc,
      schemaMappings: buildSchemaMappings(exportDoc.entities),
      linkSuggestions: buildLinkSuggestions(exportDoc.entities),
      generatedAt: new Date().toISOString(),
      bundleVersion: CI3_BUNDLE_VERSION,
    }
  }

  writeBundle(bundle: CI3Bundle, outDir: string): string[] {
    fs.mkdirSync(outDir, { recursive: true })
    const written: string[] = []

    const entityPath = path.join(outDir, 'entities.index.json')
    fs.writeFileSync(entityPath, JSON.stringify(bundle.exportDoc, null, 2) + '\n')
    written.push(entityPath)

    const schemaPath = path.join(outDir, 'ci3-schema-map.json')
    fs.writeFileSync(schemaPath, JSON.stringify(bundle.schemaMappings, null, 2) + '\n')
    written.push(schemaPath)

    const linkPath = path.join(outDir, 'ci3-link-map.json')
    fs.writeFileSync(linkPath, JSON.stringify(bundle.linkSuggestions, null, 2) + '\n')
    written.push(linkPath)

    const configPath = path.join(outDir, 'ci3-entity-config.json')
    fs.writeFileSync(configPath, JSON.stringify(bundle.config, null, 2) + '\n')
    written.push(configPath)

    return written
  }
}

function buildSchemaMappings(entries: EntityExportEntry[]): CI3SchemaMapping[] {
  return entries
    .filter((e) => e.type === 'Product' || e.type === 'FAQ' || e.type === 'Organization')
    .map((e) => ({
      entityId: e.id,
      schemaType: resolveSchemaOrgType(e),
      jsonLd: buildJsonLd(e),
    }))
}

function resolveSchemaOrgType(e: EntityExportEntry): string {
  const typeMap: Record<string, string> = {
    Product: 'Product',
    FAQ: 'FAQPage',
    Organization: 'Organization',
    Brand: 'Brand',
    Technology: 'Thing',
    Component: 'Thing',
    Location: 'Place',
    DefinedTerm: 'DefinedTerm',
  }
  return typeMap[e.type] ?? 'Thing'
}

function buildJsonLd(e: EntityExportEntry): Record<string, unknown> {
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': resolveSchemaOrgType(e),
    name: e.name_tr,
  }

  if (e.name_en) base.alternateName = e.name_en
  if (e.buzsu_url) base.url = e.buzsu_url

  return base
}

function buildLinkSuggestions(entries: EntityExportEntry[]): CI3LinkSuggestion[] {
  return entries
    .filter((e) => e.buzsu_url || e.suvesu_url)
    .map((e) => ({
      anchor: e.name_tr,
      url: (e.buzsu_url ?? e.suvesu_url)!,
      entityId: e.id,
      entityType: e.type,
      aliases: e.aliases,
    }))
}

export function createCI3Bridge(basePath?: string, cacheTtl?: number): CI3Bridge {
  return new DefaultCI3Bridge(basePath, cacheTtl)
}
