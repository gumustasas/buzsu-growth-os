// services/entity-service/EntityLoader.test.ts
// Run (derleme sonrası, bkz. repo kökünde README): node EntityLoader.test.js
//
// P0 regresyon testi — bkz. reports/entity-service-review.md Bölüm 4, bulgu #1:
// ENTITY_CATEGORIES hardcoded listesi Sprint-6 genişlemesiyle eklenen problems/
// ve standards/ kategorilerini (6 entity, %15) sessizce atlıyordu. Bu test
// kategori keşfinin gerçek klasör yapısına dinamik uyum sağladığını doğrular;
// canlı knowledge-graph/ içeriğine bağımlı değildir (izole fixture kullanır).

import assert from 'node:assert/strict'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import { FilesystemEntityLoader } from './EntityLoader'

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

function writeEntity(dir: string, fileName: string, name: string): void {
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(
    path.join(dir, fileName),
    `---\nentity_type: Thing\nschema_type: schema.org/Thing\nname_tr: ${name}\nstatus: seed\n---\n\n# ${name}\n`
  )
}

/**
 * Gerçek knowledge-graph/ yapısını taklit eden izole bir fixture kurar:
 * - problems/, standards/  → Sprint-6'da eklenen, önceden atlanan kategoriler
 * - api/                   → mock/okuma API'si, entity kategorisi DEĞİL
 * - .hidden/                → gizli klasör, kategori sayılmamalı
 * - README.md (dosya)      → dizin değil, kategori sayılmamalı
 * - glossary/ KASITLI OLARAK oluşturulmuyor — hiç var olmayan bir kategorinin
 *   fantom olarak kabul edilmediğini (hata fırlatmadan sessizce yok sayıldığını) doğrular.
 */
function setupFixture(): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'kg-fixture-'))
  writeEntity(path.join(root, 'entities'), 'org.md', 'Organizasyon')
  writeEntity(path.join(root, 'problems'), 'sert-su.md', 'Sert Su Sorunu')
  writeEntity(path.join(root, 'standards'), 'ts-266.md', 'TS 266')
  fs.mkdirSync(path.join(root, 'api'), { recursive: true })
  fs.writeFileSync(path.join(root, 'api', 'index.ts'), '// mock api, entity degil')
  fs.mkdirSync(path.join(root, '.hidden'), { recursive: true })
  writeEntity(path.join(root, '.hidden'), 'gizli.md', 'Gizli')
  fs.writeFileSync(path.join(root, 'README.md'), '# knowledge-graph')
  return root
}

const fixtureRoot = setupFixture()
const loader = new FilesystemEntityLoader(fixtureRoot)
const result = loader.loadAll()
const ids = result.entities.map((e) => e.id)
const categories = new Set(ids.map((id) => id.split('/')[0]))

console.log('EntityLoader — dinamik kategori keşfi')

test('problems/ kategorisi okunuyor', () => {
  assert.equal(categories.has('problems'), true, 'problems kategorisi bulunamadı')
})

test('standards/ kategorisi okunuyor', () => {
  assert.equal(categories.has('standards'), true, 'standards kategorisi bulunamadı')
})

test('problems/ ve standards/ içindeki entity sayısı doğru', () => {
  assert.equal(ids.filter((id) => id.startsWith('problems/')).length, 1)
  assert.equal(ids.filter((id) => id.startsWith('standards/')).length, 1)
})

test('api/ klasörü entity kategorisi sayılmıyor', () => {
  assert.equal(categories.has('api'), false, 'api/ yanlışlıkla kategori olarak okundu')
})

test('gizli klasörler (.hidden) taranmıyor', () => {
  assert.equal(categories.has('.hidden'), false, '.hidden klasörü kategori olarak okundu')
})

test('olmayan kategori (glossary) fantom olarak kabul edilmiyor — hata yok, sessizce yok', () => {
  assert.equal(categories.has('glossary'), false)
  assert.equal(result.errors.length, 0, 'olmayan glossary/ için hata üretilmemeli')
})

test('kök dizindeki dosyalar (README.md) kategori sayılmıyor', () => {
  assert.equal(categories.has('README.md'), false)
  assert.equal(ids.some((id) => id.includes('README')), false)
})

test('toplam entity sayısı beklenen 3 (entities, problems, standards)', () => {
  assert.equal(result.entities.length, 3)
})

fs.rmSync(fixtureRoot, { recursive: true, force: true })

console.log(`\n${passed} passed, ${failed} failed\n`)
if (failed > 0) process.exit(1)
