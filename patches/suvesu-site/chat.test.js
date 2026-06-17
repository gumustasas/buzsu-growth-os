// public_html/api/chat.test.js
// Run: node public_html/api/chat.test.js
// Tests for mapProductCategory and mapIntent — the two field mapping functions
// added to fix the AI agent Airtable CRM integration.

import assert from "node:assert/strict";

// Inline copies of the mapping functions so tests run without importing
// the full chat.js serverless module (which has side effects at load time).
// Keep these in sync with the implementations in chat.js.

function mapProductCategory(category) {
  if (!category) return ["Su Aritma"];
  const c = String(category).toLowerCase();
  if (c === "ro" || c === "ro_sistemi") return ["RO Sistemi"];
  if (c === "filtre" || c === "filtre_seti") return ["Filtre"];
  if (c === "tds" || c === "tds_metre") return ["TDS Metre"];
  if (
    c === "su_aritma" ||
    c === "aritma" ||
    c === "device_recommendation" ||
    c === "scale_problem" ||
    c === "hard_water" ||
    c === "water_quality"
  ) return ["Su Aritma"];
  return ["Su Aritma"];
}

function mapIntent(intent) {
  if (!intent) return "Genel Bilgi";
  const i = String(intent).toLowerCase();
  if (
    i.includes("fiyat") ||
    i === "price" ||
    i === "price_request"
  ) return "Fiyat Sordu";
  if (
    i.includes("kurulum") ||
    i.includes("install") ||
    i.includes("montaj") ||
    i === "installation_placement"
  ) return "Kurulum Sordu";
  if (
    i.includes("zaman") ||
    i === "urgent" ||
    i.includes("hemen") ||
    i.includes("acil")
  ) return "Zaman Belirtti";
  return "Genel Bilgi";
}

// --- test runner ---

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (e) {
    console.error(`  ✗ ${name}`);
    console.error(`    Expected: ${e.expected}  Actual: ${e.actual}`);
    failed++;
  }
}

// --- mapProductCategory ---

console.log("\nmapProductCategory");
test("ro → RO Sistemi",
  () => assert.deepEqual(mapProductCategory("ro"), ["RO Sistemi"]));
test("ro_sistemi → RO Sistemi",
  () => assert.deepEqual(mapProductCategory("ro_sistemi"), ["RO Sistemi"]));
test("filtre → Filtre",
  () => assert.deepEqual(mapProductCategory("filtre"), ["Filtre"]));
test("filtre_seti → Filtre",
  () => assert.deepEqual(mapProductCategory("filtre_seti"), ["Filtre"]));
test("tds → TDS Metre",
  () => assert.deepEqual(mapProductCategory("tds"), ["TDS Metre"]));
test("tds_metre → TDS Metre",
  () => assert.deepEqual(mapProductCategory("tds_metre"), ["TDS Metre"]));
test("su_aritma → Su Aritma",
  () => assert.deepEqual(mapProductCategory("su_aritma"), ["Su Aritma"]));
test("aritma → Su Aritma",
  () => assert.deepEqual(mapProductCategory("aritma"), ["Su Aritma"]));
test("device_recommendation → Su Aritma",
  () => assert.deepEqual(mapProductCategory("device_recommendation"), ["Su Aritma"]));
test("water_quality → Su Aritma",
  () => assert.deepEqual(mapProductCategory("water_quality"), ["Su Aritma"]));
test("scale_problem → Su Aritma",
  () => assert.deepEqual(mapProductCategory("scale_problem"), ["Su Aritma"]));
test("undefined → Su Aritma (safe default)",
  () => assert.deepEqual(mapProductCategory(undefined), ["Su Aritma"]));
test("null → Su Aritma (safe default)",
  () => assert.deepEqual(mapProductCategory(null), ["Su Aritma"]));
test("unknown_value → Su Aritma (safe default)",
  () => assert.deepEqual(mapProductCategory("unknown_value"), ["Su Aritma"]));

// --- mapIntent ---

console.log("\nmapIntent");
test("fiyat → Fiyat Sordu",
  () => assert.equal(mapIntent("fiyat"), "Fiyat Sordu"));
test("price → Fiyat Sordu",
  () => assert.equal(mapIntent("price"), "Fiyat Sordu"));
test("price_request → Fiyat Sordu",
  () => assert.equal(mapIntent("price_request"), "Fiyat Sordu"));
test("fiyat_sor → Fiyat Sordu (substring match)",
  () => assert.equal(mapIntent("fiyat_sor"), "Fiyat Sordu"));
test("kurulum → Kurulum Sordu",
  () => assert.equal(mapIntent("kurulum"), "Kurulum Sordu"));
test("install → Kurulum Sordu",
  () => assert.equal(mapIntent("install"), "Kurulum Sordu"));
test("montaj → Kurulum Sordu",
  () => assert.equal(mapIntent("montaj"), "Kurulum Sordu"));
test("installation_placement → Kurulum Sordu",
  () => assert.equal(mapIntent("installation_placement"), "Kurulum Sordu"));
test("zaman → Zaman Belirtti",
  () => assert.equal(mapIntent("zaman"), "Zaman Belirtti"));
test("urgent → Zaman Belirtti",
  () => assert.equal(mapIntent("urgent"), "Zaman Belirtti"));
test("hemen → Zaman Belirtti",
  () => assert.equal(mapIntent("hemen"), "Zaman Belirtti"));
test("acil → Zaman Belirtti",
  () => assert.equal(mapIntent("acil"), "Zaman Belirtti"));
test("undefined → Genel Bilgi",
  () => assert.equal(mapIntent(undefined), "Genel Bilgi"));
test("null → Genel Bilgi",
  () => assert.equal(mapIntent(null), "Genel Bilgi"));
test("general → Genel Bilgi",
  () => assert.equal(mapIntent("general"), "Genel Bilgi"));
test("water_quality → Genel Bilgi",
  () => assert.equal(mapIntent("water_quality"), "Genel Bilgi"));
test("device_selection → Genel Bilgi",
  () => assert.equal(mapIntent("device_selection"), "Genel Bilgi"));
test("tds → Genel Bilgi (TDS = info seeking, not buying signal)",
  () => assert.equal(mapIntent("tds"), "Genel Bilgi"));

// --- summary ---

console.log(`\n${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);
