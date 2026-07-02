// services/entity-service/CI3Bridge.test.ts
// Sprint-7.4 — CI3Bridge entegrasyon testleri. Üç bölüm:
//   A) İzole fixture: bundle oluşturma, schema mapping, link suggestion
//   B) Bundle dosya yazma: geçici dizine yazıp JSON geçerliliği kontrolü
//   C) Gerçek knowledge-graph/ smoke: export → bundle → tutarlılık

import assert from 'node:assert/strict'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import { FilesystemEntityLoader } from './EntityLoader'
import { InMemoryEntityRepository } from './EntityRepository'
import { DefaultEntityResolver } from './EntityResolver'
import { GraphEntityRelations } from './EntityRelations'
import { DefaultEntityExporter } from './EntityExporter'
import { DefaultCI3Bridge, CI3_BUNDLE_VERSION } from './CI3Bridge'
import { createEntityService } from './index'
import type { EntityExportDoc } from './EntityExporter'
import type { CI3Bundle } from './CI3Bridge'

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

function writeEntity(dir: string, fileName: string, frontmatter: string): void {
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, fileName), `---\n${frontmatter}\n---\n\n# gövde\n`)
}

function setupFixture(): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'kg-ci3-'))
  writeEntity(
    path.join(root, 'products'),
    'cihaz.md',
    'entity_type: Product\nschema_type: schema.org/Product\nname_tr: Su Arıtma Cihazı\nname_en: Water Purifier\naliases: [Cihaz, RO Cihaz]\nrelated_entities:\n  - technologies/ters-osmoz.md\nstatus: published\nbuzsu_url: https://www.buzsu.com.tr/cihaz/'
  )
  writeEntity(
    path.join(root, 'technologies'),
    'ters-osmoz.md',
    'entity_type: Technology\nschema_type: schema.org/Thing\nname_tr: Ters Osmoz\nname_en: Reverse Osmosis\naliases: [RO]\nrelated_entities:\n  - products/cihaz.md\nstatus: seed'
  )
  writeEntity(
    path.join(root, 'faq'),
    'nasil-secilir.md',
    'entity_type: FAQ\nschema_type: schema.org/Question\nname_tr: Su arıtma cihazı nasıl seçilir?\nrelated_entities:\n  - products/cihaz.md\nstatus: seed\nbuzsu_url: https://www.buzsu.com.tr/sss/nasil-secilir/'
  )
  writeEntity(
    path.join(root, 'entities'),
    'org-buzsu.md',
    'entity_type: Organization\nschema_type: schema.org/Organization\nname_tr: Buzsu\nstatus: seed\nbuzsu_url: https://www.buzsu.com.tr/'
  )
  return root
}

function buildExportDoc(kgRoot: string): EntityExportDoc {
  const loader = new FilesystemEntityLoader(kgRoot)
  const repo = new InMemoryEntityRepository(loader)
  const resolver = new DefaultEntityResolver(repo)
  const relations = new GraphEntityRelations(repo, resolver)
  const exporter = new DefaultEntityExporter(repo, relations)
  return exporter.buildDoc()
}

// ============================================================
// A) İZOLE FIXTURE — Bundle oluşturma
// ============================================================
const fixtureRoot = setupFixture()
const exportDoc = buildExportDoc(fixtureRoot)
const bridge = new DefaultCI3Bridge()
const bundle: CI3Bundle = bridge.buildBundle(exportDoc)

console.log('CI3Bridge — bundle oluşturma (fixture)')

test('bundle version doğru', () => {
  assert.equal(bundle.bundleVersion, CI3_BUNDLE_VERSION)
})

test('bundle exportDoc korunuyor (entity sayısı)', () => {
  assert.equal(bundle.exportDoc.meta.entityCount, 4)
  assert.equal(bundle.exportDoc.entities.length, 4)
})

test('bundle config alanları mevcut', () => {
  assert.ok(bundle.config.entityJsonPath)
  assert.ok(bundle.config.schemaMapPath)
  assert.ok(bundle.config.linkMapPath)
  assert.equal(typeof bundle.config.cacheTtl, 'number')
  assert.ok(bundle.config.cacheTtl > 0)
})

test('bundle generatedAt ISO formatında', () => {
  assert.ok(bundle.generatedAt)
  assert.ok(!isNaN(Date.parse(bundle.generatedAt)))
})

console.log('\nCI3Bridge — schema mappings (fixture)')

test('schema mapping sadece Product/FAQ/Organization içerir', () => {
  const types = new Set(bundle.schemaMappings.map((m) => m.schemaType))
  assert.ok(types.has('Product'))
  assert.ok(types.has('FAQPage'))
  assert.ok(types.has('Organization'))
  assert.ok(!types.has('Thing')) // Technology filtrelenmeli
})

test('Product schema mapping JSON-LD doğru', () => {
  const productMapping = bundle.schemaMappings.find((m) => m.entityId === 'products/cihaz')
  assert.ok(productMapping)
  assert.equal(productMapping.schemaType, 'Product')
  assert.equal(productMapping.jsonLd['@context'], 'https://schema.org')
  assert.equal(productMapping.jsonLd['@type'], 'Product')
  assert.equal(productMapping.jsonLd.name, 'Su Arıtma Cihazı')
  assert.equal(productMapping.jsonLd.url, 'https://www.buzsu.com.tr/cihaz/')
})

test('FAQ schema mapping doğru', () => {
  const faqMapping = bundle.schemaMappings.find((m) => m.entityId === 'faq/nasil-secilir')
  assert.ok(faqMapping)
  assert.equal(faqMapping.schemaType, 'FAQPage')
})

console.log('\nCI3Bridge — link suggestions (fixture)')

test('link suggestions yalnızca URL sahibi entity\'ler', () => {
  assert.ok(bundle.linkSuggestions.length > 0)
  for (const s of bundle.linkSuggestions) {
    assert.ok(s.url, `URL boş: ${s.entityId}`)
  }
})

test('link suggestion: Product anchor ve aliases mevcut', () => {
  const product = bundle.linkSuggestions.find((s) => s.entityId === 'products/cihaz')
  assert.ok(product)
  assert.equal(product.anchor, 'Su Arıtma Cihazı')
  assert.ok(product.aliases.includes('Cihaz'))
  assert.ok(product.aliases.includes('RO Cihaz'))
})

test('link suggestion: URL\'siz entity (technologies/ters-osmoz) dahil değil', () => {
  const tech = bundle.linkSuggestions.find((s) => s.entityId === 'technologies/ters-osmoz')
  assert.equal(tech, undefined)
})

// ============================================================
// B) BUNDLE DOSYA YAZMA
// ============================================================
console.log('\nCI3Bridge — bundle dosya yazma')

const outDir = path.join(fixtureRoot, 'ci3-out')
const writtenFiles = bridge.writeBundle(bundle, outDir)

test('4 dosya yazıldı', () => {
  assert.equal(writtenFiles.length, 4)
})

test('entities.index.json geçerli JSON', () => {
  const raw = fs.readFileSync(path.join(outDir, 'entities.index.json'), 'utf-8')
  const parsed = JSON.parse(raw)
  assert.equal(parsed.meta.entityCount, 4)
})

test('ci3-schema-map.json geçerli JSON array', () => {
  const raw = fs.readFileSync(path.join(outDir, 'ci3-schema-map.json'), 'utf-8')
  const parsed = JSON.parse(raw)
  assert.ok(Array.isArray(parsed))
  assert.ok(parsed.length > 0)
})

test('ci3-link-map.json geçerli JSON array', () => {
  const raw = fs.readFileSync(path.join(outDir, 'ci3-link-map.json'), 'utf-8')
  const parsed = JSON.parse(raw)
  assert.ok(Array.isArray(parsed))
})

test('ci3-entity-config.json geçerli JSON', () => {
  const raw = fs.readFileSync(path.join(outDir, 'ci3-entity-config.json'), 'utf-8')
  const parsed = JSON.parse(raw)
  assert.ok(parsed.entityJsonPath)
  assert.ok(parsed.bundleVersion)
})

// Fixture temizliği
fs.rmSync(fixtureRoot, { recursive: true, force: true })

// ============================================================
// C) GERÇEK KNOWLEDGE-GRAPH SMOKE
// ============================================================
console.log('\nGerçek knowledge-graph/ — CI3Bridge smoke')

const kgRoot = path.join(process.cwd(), 'knowledge-graph')
if (fs.existsSync(kgRoot)) {
  const realSvc = createEntityService(kgRoot)
  const realExport = realSvc.export()
  const realBridge = new DefaultCI3Bridge()
  const realBundle = realBridge.buildBundle(realExport)

  test('gerçek KG: bundle entity sayısı = export entity sayısı', () => {
    assert.equal(realBundle.exportDoc.meta.entityCount, realExport.meta.entityCount)
  })

  test('gerçek KG: schema mappings ≥ 1 Product', () => {
    const products = realBundle.schemaMappings.filter((m) => m.schemaType === 'Product')
    assert.ok(products.length >= 1, `beklenen ≥1 Product, gelen ${products.length}`)
  })

  test('gerçek KG: link suggestions ≥ 1', () => {
    assert.ok(realBundle.linkSuggestions.length >= 1)
  })

  test('gerçek KG: bundle dosya yazma başarılı', () => {
    const tmpOut = fs.mkdtempSync(path.join(os.tmpdir(), 'ci3-smoke-'))
    const files = realBridge.writeBundle(realBundle, tmpOut)
    assert.equal(files.length, 4)
    for (const f of files) {
      const raw = fs.readFileSync(f, 'utf-8')
      JSON.parse(raw) // parse hatası fırlatırsa test başarısız
    }
    fs.rmSync(tmpOut, { recursive: true, force: true })
  })
} else {
  console.log('  (atlandı — knowledge-graph/ bulunamadı; repo kökünden çalıştırın)')
}

console.log(`\n${passed} passed, ${failed} failed\n`)
if (failed > 0) process.exit(1)
