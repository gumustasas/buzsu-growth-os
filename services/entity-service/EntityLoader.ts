// services/entity-service/EntityLoader.ts
// Dosya sistemi okuma katmanı — knowledge-graph/ altındaki .md dosyalarını
// bulur, YAML frontmatter + gövdeyi ayrıştırır, Entity[] üretir.
//
// Not: Yeni bağımlılık eklenmez (CLAUDE.md — yeni bağımlılık MAJOR sınıf).
// parseFrontmatter() bu repodaki entity dosyalarının kullandığı YAML alt
// kümesini (scalar, inline dizi [a, b], çok satırlı '- item' dizisi) çözer;
// genel amaçlı bir YAML parser değildir ve öyle sunulmaz.

import * as fs from 'fs'
import * as path from 'path'
import type { Entity, EntityCategory, EntityFrontmatter } from './types'

export interface LoadError {
  filePath: string
  message: string
}

export interface LoadResult {
  entities: Entity[]
  errors: LoadError[]
}

/**
 * knowledge-graph/ kök dizininde bulunan ama entity kategorisi OLMAYAN
 * klasörler. `api/` — okuma/mock API kodu (index.ts, search.ts, relations.ts),
 * entity verisi değil. Gizli klasörler ('.' ile başlayanlar, örn. .git) ve
 * dizin olmayan girdiler (README.md, governance.md vb.) ayrıca ve otomatik
 * olarak hariç tutulur — bkz. isEntityCategoryDir().
 */
const EXCLUDED_KG_DIRS = new Set(['api'])

export interface EntityLoader {
  /** knowledge-graph/ kök dizinini tarar, tüm kategori klasörlerini dinamik keşfeder ve okur. */
  loadAll(): LoadResult
  /** Tek bir kategori klasörünü okur (örn. 'products'). */
  loadCategory(category: EntityCategory): LoadResult
  /** Tek bir dosyayı okuyup Entity'e çevirir. */
  loadFile(filePath: string): Entity
  /** knowledge-graph/ kök dizininde şu an var olan entity kategorilerini listeler. */
  discoverCategories(): EntityCategory[]
}

export class FilesystemEntityLoader implements EntityLoader {
  private readonly kgRoot: string

  constructor(kgRoot?: string) {
    this.kgRoot = kgRoot ?? path.join(__dirname, '../../knowledge-graph')
  }

  discoverCategories(): EntityCategory[] {
    if (!fs.existsSync(this.kgRoot)) return []
    return fs
      .readdirSync(this.kgRoot, { withFileTypes: true })
      .filter((entry) => isEntityCategoryDir(entry))
      .map((entry) => entry.name)
      .sort()
  }

  loadAll(): LoadResult {
    const entities: Entity[] = []
    const errors: LoadError[] = []
    for (const category of this.discoverCategories()) {
      const result = this.loadCategory(category)
      entities.push(...result.entities)
      errors.push(...result.errors)
    }
    return { entities, errors }
  }

  loadCategory(category: EntityCategory): LoadResult {
    const dir = path.join(this.kgRoot, category)
    const entities: Entity[] = []
    const errors: LoadError[] = []
    if (!fs.existsSync(dir)) return { entities, errors }

    for (const fileName of fs.readdirSync(dir)) {
      if (!fileName.endsWith('.md')) continue
      const filePath = path.join(dir, fileName)
      try {
        entities.push(this.loadFile(filePath))
      } catch (err) {
        errors.push({ filePath, message: (err as Error).message })
      }
    }
    return { entities, errors }
  }

  loadFile(filePath: string): Entity {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { frontmatter, body } = parseEntityMarkdown(raw)
    const id = toEntityId(this.kgRoot, filePath)
    return { id, filePath, frontmatter, body }
  }
}

/**
 * Bir dizin girdisinin entity kategorisi klasörü sayılıp sayılmayacağını
 * belirler: gerçek bir alt dizin olmalı, '.' ile başlamamalı (gizli klasör)
 * ve EXCLUDED_KG_DIRS'te olmamalı (örn. 'api' — mock/okuma API'si).
 */
function isEntityCategoryDir(entry: fs.Dirent): boolean {
  return entry.isDirectory() && !entry.name.startsWith('.') && !EXCLUDED_KG_DIRS.has(entry.name)
}

/** knowledge-graph/ köküne göre relatif, uzantısız kimlik üretir. */
function toEntityId(kgRoot: string, filePath: string): string {
  const rel = path.relative(kgRoot, filePath)
  return rel.replace(/\.md$/, '').split(path.sep).join('/')
}

/** Markdown dosyasını frontmatter (YAML alt kümesi) + gövde olarak ayrıştırır. */
export function parseEntityMarkdown(raw: string): { frontmatter: EntityFrontmatter; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) {
    throw new Error('Frontmatter bloğu bulunamadı (--- ... --- bekleniyor)')
  }
  const [, fmBlock, body] = match
  return { frontmatter: parseFrontmatter(fmBlock), body: body.trim() }
}

const LIST_FIELDS = new Set(['aliases', 'related_entities'])
const REFERENCE_FIELDS = new Set(['related_entities'])

function parseFrontmatter(block: string): EntityFrontmatter {
  const data: Record<string, unknown> = {}
  let currentListKey: string | null = null

  for (const line of block.split('\n')) {
    const listItem = line.match(/^\s+-\s*(.+)$/)
    if (listItem && currentListKey) {
      const list = data[currentListKey] as string[]
      list.push(normalizeValue(currentListKey, stripQuotes(listItem[1].trim())))
      continue
    }

    const kv = line.match(/^([a-zA-Z_]+):\s*(.*)$/)
    if (!kv) continue
    const [, key, rawValue] = kv
    currentListKey = null

    if (rawValue === '') {
      // Çok satırlı dizi başlangıcı — sonraki '- item' satırları toplanır.
      data[key] = []
      currentListKey = key
      continue
    }

    if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
      data[key] = rawValue
        .slice(1, -1)
        .split(',')
        .map((s) => normalizeValue(key, stripQuotes(s.trim())))
        .filter(Boolean)
      continue
    }

    data[key] = coerceScalar(rawValue)
  }

  return data as unknown as EntityFrontmatter
}

/** Sayısal görünen scalar değerleri number'a çevirir, diğerlerini string bırakır. */
function coerceScalar(rawValue: string): string | number {
  const stripped = stripQuotes(rawValue)
  return /^-?\d+(\.\d+)?$/.test(stripped) ? Number(stripped) : stripped
}

/** related_entities değerlerindeki '.md' uzantısını kaldırır (entity id ile eşleşsin diye). */
function normalizeValue(key: string, value: string): string {
  if (REFERENCE_FIELDS.has(key)) return value.replace(/\.md$/, '')
  return value
}

function stripQuotes(s: string): string {
  return s.replace(/^["']|["']$/g, '')
}

// LIST_FIELDS şu an yalnızca dokümantasyon amaçlı dışa aktarılıyor; parser
// hangi alanın liste olduğunu satır yapısından (çok satırlı '-' veya '[...]')
// otomatik çıkarır, bu sabite bağımlı değildir.
export { LIST_FIELDS }
