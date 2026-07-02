// services/entity-service/EntityService.test.ts
// Sprint-7.2 + 7.3 testleri — EntityIndex (indexed lookups + reverse dependency)
// ve EntityExporter (entities.index.json). İki bölüm:
//   A) İzole fixture — deterministik: index lookuplar, getDependents, search,
//      exporter → geçici dosya → JSON.parse geçerliliği + yapı doğrulaması.
//   B) Gerçek knowledge-graph/ smoke — repo kökünden çalıştırılmalı: hiçbir
//      entity düşmemeli (0 hata), problems/ + standards/ dahil olmalı.
//
// Çalıştırma (derleme sonrası, repo kökünden): node <build>/.../EntityService.test.js

import assert from 'node:assert/strict'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import { FilesystemEntityLoader } from './EntityLoader'
import { EntityIndex } from './EntityIndex'
import { createEntityService } from './index'

let passed = 0
let failed = 0

function test(name: string, fn: () => void): void {
  try {
    fn()
    console.log(`  ✓ ${name}`)
    passed++
  } catch (e) {
    console.error(`  ✗ ${name}`)
    console.error(`    ${(e as Error).message}`)
    failed++
  }
}

function writeEntity(
  dir: string,
  fileName: string,
  frontmatter: string
): void {
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, fileName), `---\n${frontmatter}\n---\n\n# gövde\n`)
}

/**
 * Bilinen ters bağımlılıklara sahip izole fixture:
 *   technologies/ters-osmoz  (alias RO)  →  components/membran
 *   products/cihaz           →  technologies/ters-osmoz, components/membran
 * Beklenen dependents:
 *   membran      ← ters-osmoz, cihaz   (2)
 *   ters-osmoz   ← cihaz               (1)
 */
function setupFixture(): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'kg-idx-'))
  writeEntity(
    path.join(root, 'technologies'),
    'ters-osmoz.md',
    'entity_type: Technology\nschema_type: schema.org/Thing\nname_tr: Ters Osmoz\nname_en: Reverse Osmosis\naliases: [RO, Ters Osmoz Sistemi]\nrelated_entities:\n  - components/membran.md\nstatus: seed'
  )
  writeEntity(
    path.join(root, 'components'),
    'membran.md',
    'entity_type: Component\nschema_type: schema.org/Thing\nname_tr: Membran\nbuzsu_url: https://www.buzsu.com.tr/membran/\nstatus: reviewed'
  )
  writeEntity(
    path.join(root, 'products'),
    'cihaz.md',
    'entity_type: Product\nschema_type: schema.org/Product\nname_tr: Su Arıtma Cihazı\naliases: [Cihaz]\nrelated_entities:\n  - technologies/ters-osmoz.md\n  - components/membran.md\nstatus: published\nbuzsu_url: https://www.buzsu.com.tr/cihaz/'
  )
  return root
}

// ============================================================
// A) İZOLE FIXTURE
// ============================================================
const fixtureRoot = setupFixture()
const loaded = new FilesystemEntityLoader(fixtureRoot).loadAll()
const index = new EntityIndex(loaded.entities)
const svc = createEntityService(fixtureRoot)

console.log('EntityIndex — indexed lookups (fixture)')

test('byId tekil kayıt döner', () => {
  assert.equal(index.byId('technologies/ters-osmoz')?.frontmatter.name_tr, 'Ters Osmoz')
})

test('bySlug kategori öneki olmadan çözer', () => {
  assert.equal(index.bySlug('cihaz')[0]?.id, 'products/cihaz')
})

test('byCategory kategoriyi listeler', () => {
  assert.equal(index.byCategory('components').length, 1)
  assert.equal(index.byCategory('components')[0].id, 'components/membran')
})

test('byType tipe göre listeler', () => {
  assert.equal(index.byType('Product').length, 1)
  assert.equal(index.byType('Technology')[0].id, 'technologies/ters-osmoz')
})

test('byAlias normalize edilmiş alias ile çözer (RO)', () => {
  assert.equal(index.byAlias('RO')[0]?.id, 'technologies/ters-osmoz')
})

test('byAlias ad (name_tr) ile de çözer', () => {
  assert.equal(index.byAlias('Membran')[0]?.id, 'components/membran')
})

test('byUrl buzsu_url ile çözer', () => {
  assert.equal(index.byUrl('https://www.buzsu.com.tr/cihaz/')?.id, 'products/cihaz')
})

console.log('\nEntityRelations — getDependents (reverse dependency, fixture)')

test('getDependents: membran ← ters-osmoz + cihaz (2)', () => {
  const deps = svc.getDependents('components/membran').map((e) => e.id).sort()
  assert.deepEqual(deps, ['products/cihaz', 'technologies/ters-osmoz'])
})

test('getDependents: ters-osmoz ← cihaz (1)', () => {
  const deps = svc.getDependents('technologies/ters-osmoz').map((e) => e.id)
  assert.deepEqual(deps, ['products/cihaz'])
})

test('getDependents: yaprak entity (cihaz) → boş', () => {
  assert.deepEqual(svc.getDependents('products/cihaz'), [])
})

console.log('\nEntitySearch — alias / slug / name (fixture)')

test('search alias ile (RO) çalışır', () => {
  assert.equal(svc.search('RO').some((e) => e.id === 'technologies/ters-osmoz'), true)
})

test('search slug ile (cihaz) çalışır', () => {
  assert.equal(svc.search('cihaz').some((e) => e.id === 'products/cihaz'), true)
})

test('search name ile (membran) çalışır', () => {
  assert.equal(svc.search('membran').some((e) => e.id === 'components/membran'), true)
})

test('search tip filtresi uygular', () => {
  const r = svc.search('', { type: 'Product' })
  assert.equal(r.length, 1)
  assert.equal(r[0].id, 'products/cihaz')
})

console.log('\nEntityExporter — entities.index.json (fixture)')

const outPath = path.join(fixtureRoot, 'out', 'entities.index.json')
svc.exportToFile(outPath)
const rawExport = fs.readFileSync(outPath, 'utf-8')
const doc = JSON.parse(rawExport)

test('export dosyası geçerli JSON', () => {
  assert.ok(typeof doc === 'object' && doc !== null)
})

test('export: meta + entities + indexes + edges + dependents + stats mevcut', () => {
  assert.ok(doc.meta, 'meta yok')
  assert.ok(Array.isArray(doc.entities), 'entities dizi değil')
  assert.ok(doc.indexes, 'indexes yok')
  assert.ok(Array.isArray(doc.edges), 'edges dizi değil')
  assert.ok(doc.dependents, 'dependents yok')
  assert.ok(doc.stats, 'stats yok')
})

test('export: entityCount = 3, düz index yapısı', () => {
  assert.equal(doc.meta.entityCount, 3)
  assert.equal(doc.entities.length, 3)
  assert.equal(typeof doc.indexes.byId['products/cihaz'], 'number')
  assert.deepEqual(doc.indexes.byCategory.components, ['components/membran'])
  assert.equal(doc.indexes.byUrl['https://www.buzsu.com.tr/cihaz/'], 'products/cihaz')
})

test('export: edges + dependents doğru (düz string tabanlı)', () => {
  assert.equal(doc.edges.length, 3) // cihaz→ro, cihaz→membran, ro→membran
  assert.deepEqual(doc.dependents['components/membran'].sort(), [
    'products/cihaz',
    'technologies/ters-osmoz',
  ])
})

test('export: stats sayımları tutuyor', () => {
  assert.equal(doc.stats.total, 3)
  assert.equal(doc.stats.byStatus.published, 1)
  assert.equal(doc.stats.byStatus.seed, 1)
  assert.equal(doc.stats.byStatus.reviewed, 1)
  assert.equal(doc.stats.brokenRelations, 0)
})

fs.rmSync(fixtureRoot, { recursive: true, force: true })

// ============================================================
// B) GERÇEK KNOWLEDGE-GRAPH SMOKE (repo kökünden çalıştırılmalı)
// ============================================================
console.log('\nGerçek knowledge-graph/ — smoke (repo kökünden)')

const kgRoot = path.join(process.cwd(), 'knowledge-graph')
if (fs.existsSync(kgRoot)) {
  const realLoader = new FilesystemEntityLoader(kgRoot)
  const realLoaded = realLoader.loadAll()
  const realSvc = createEntityService(kgRoot)
  const health = realSvc.getHealth()

  test('hiçbir entity düşmedi (0 ayrıştırma hatası)', () => {
    assert.equal(realLoaded.errors.length, 0)
  })

  test('39/39 entity okundu (Sprint-6 sonrası mevcut sayım; büyürse ≥39)', () => {
    assert.ok(health.totalEntities >= 39, `beklenen ≥39, gelen ${health.totalEntities}`)
  })

  test('problems/ kategorisi dahil', () => {
    assert.ok(realSvc.getByCategory('problems').length > 0)
  })

  test('standards/ kategorisi dahil', () => {
    assert.ok(realSvc.getByCategory('standards').length > 0)
  })

  test('gerçek veri export: entityCount = health.totalEntities', () => {
    assert.equal(realSvc.export().meta.entityCount, health.totalEntities)
  })
} else {
  console.log('  (atlandı — knowledge-graph/ bulunamadı; repo kökünden çalıştırın)')
}

console.log(`\n${passed} passed, ${failed} failed\n`)
if (failed > 0) process.exit(1)
