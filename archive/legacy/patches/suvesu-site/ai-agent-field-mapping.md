# P1 Fix: AI Agent → Airtable Field Mapping

## Problem

`public_html/api/chat.js` — `logLead()` function writes only two fields:

```js
fields: {
  Name: (data.name || "Lead").slice(0, 200),
  Notes: `LEAD | Tel: ${data.phone || "-"} | ...`
}
```

This means every AI agent lead has:
- No `Phone` field → can't call them from the CRM
- No `Source` field → score = 0 (Suvesu Referral is worth 3 pts)
- No `Product Interest` → score contribution missed
- No `Lead Stage` → won't show in pipeline views
- No `Engagement` → score contribution missed

Result: all AI agent leads are invisible in the Hot Leads view and score 0.

## Fix

**Target file:** `public_html/api/chat.js`  
**Branch:** `fix/ai-agent-airtable-field-mapping`

### Step 1: Add constants near the top of the file (after the existing `const CLAUDE_MODEL = ...` block)

```js
// Airtable CRM — hardcoded IDs to guarantee correct table regardless of
// base discovery order. See buzsu-growth-os/airtable-schema.md for full schema.
const LEADS_BASE_ID  = "apphVqbUQohAMIoWk";
const LEADS_TABLE_ID = "tblsBQkMOMyi5yc1n";
```

### Step 2: Add two mapping functions (add anywhere before `logLead`)

```js
function mapProductCategory(category) {
  if (!category) return ["Su Aritma"];
  const c = String(category).toLowerCase();
  if (c === "ro" || c === "ro_sistemi")                          return ["RO Sistemi"];
  if (c === "filtre" || c === "filtre_seti")                     return ["Filtre"];
  if (c === "tds" || c === "tds_metre")                          return ["TDS Metre"];
  if (
    c === "su_aritma" || c === "aritma" ||
    c === "device_recommendation" ||
    c === "scale_problem" || c === "hard_water" ||
    c === "water_quality"
  ) return ["Su Aritma"];
  return ["Su Aritma"];
}

function mapIntent(intent) {
  if (!intent) return "Genel Bilgi";
  const i = String(intent).toLowerCase();
  if (i.includes("fiyat") || i === "price" || i === "price_request") return "Fiyat Sordu";
  if (
    i.includes("kurulum") || i.includes("install") ||
    i.includes("montaj") || i === "installation_placement"
  ) return "Kurulum Sordu";
  if (i.includes("zaman") || i === "urgent" || i.includes("hemen") || i.includes("acil"))
    return "Zaman Belirtti";
  return "Genel Bilgi";
}
```

### Step 3: Replace the `logLead` function entirely

**Remove:**
```js
async function logLead(data) {
  const token = process.env.AIRTABLE_TOKEN;
  if (!token) return;
  try {
    const { baseId, tableId } = await getAirtableIds(token);
    if (!baseId || !tableId) return;
    await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: {
          Name: (data.name || "Lead").slice(0, 200),
          Notes: `LEAD | Tel: ${data.phone || "-"} | İl: ${data.city || "-"} | İlçe: ${data.district || "-"} | Intent: ${data.intent || "-"} | Ürün: ${data.product_name || "-"} | Ürün ID: ${data.product_id || "-"} | Kategori: ${data.product_category || "-"} | Sayfa: ${data.page_path || "-"} | ${new Date().toISOString()}`
        }
      })
    });
  } catch (e) { console.warn("[logLead] exception:", e?.message); }
}
```

**Add:**
```js
async function logLead(data) {
  const token = process.env.AIRTABLE_TOKEN;
  if (!token) return;
  try {
    const ts = new Date().toISOString();
    const noteParts = [
      `Suvesu AI | Intent: ${data.intent || "-"}`,
      `Ürün: ${data.product_name || "-"}`,
      `Kategori: ${data.product_category || "-"}`,
      `Sayfa: ${data.page_path || "-"}`,
    ];
    if (data.tds)      noteParts.push(`TDS: ${data.tds}`);
    if (data.city)     noteParts.push(`İl: ${data.city}`);
    if (data.district) noteParts.push(`İlçe: ${data.district}`);
    noteParts.push(ts);

    const fields = {
      Name:               (data.name || "Lead").slice(0, 200),
      Phone:              data.phone || undefined,
      Source:             "Suvesu Referral",
      "Product Interest": mapProductCategory(data.product_category),
      "Lead Stage":       "New",
      Engagement:         mapIntent(data.intent),
      Notes:              noteParts.join(" | "),
    };
    // Remove keys with undefined values — Airtable rejects them for phone fields
    Object.keys(fields).forEach((k) => { if (fields[k] === undefined) delete fields[k]; });

    const res = await fetch(
      `https://api.airtable.com/v0/${LEADS_BASE_ID}/${LEADS_TABLE_ID}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ fields }),
      }
    );
    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.warn("[logLead] Airtable %d — %s", res.status, errText.slice(0, 200));
    }
  } catch (e) { console.warn("[logLead] exception:", e?.message); }
}
```

## What Changes

| Field | Before | After |
|-------|--------|-------|
| Name | `data.name` (truncated) | Same |
| Phone | Buried in Notes string | `Phone` field — proper phoneNumber |
| Source | Not set (score: 0) | `"Suvesu Referral"` (score: +3) |
| Product Interest | Not set (score: 0) | Mapped from product_category (score: +1–3) |
| Lead Stage | Not set | `"New"` |
| Engagement | Not set (score: 0) | Mapped from intent (score: +0–2) |
| Notes | Everything as a text blob | Structured note, clean format |
| Airtable table | Auto-discovered (may be wrong table) | Hardcoded Leads table ID |

**Score impact:** An AI agent lead asking about price for an RO system goes from 0 → 8 pts (Hot).

## Test File

Copy `patches/suvesu-site/chat.test.js` to `public_html/api/chat.test.js` in suvesu-site.

Run locally:
```bash
node --input-type=module < public_html/api/chat.test.js
# or if package.json has "type": "module":
node public_html/api/chat.test.js
```

Expected output:
```
mapProductCategory
  ✓ ro → RO Sistemi
  ✓ ro_sistemi → RO Sistemi
  ... (14 tests)

mapIntent
  ✓ fiyat → Fiyat Sordu
  ... (17 tests)

31 passed, 0 failed
```

## PR Steps (apply manually to suvesu-site)

```bash
cd suvesu-site
git checkout -b fix/ai-agent-airtable-field-mapping
# Apply the 3 changes above to public_html/api/chat.js
# Copy chat.test.js to public_html/api/chat.test.js
node public_html/api/chat.test.js   # verify tests pass
git add public_html/api/chat.js public_html/api/chat.test.js
git commit -m "fix: map AI agent lead fields to Airtable CRM schema

- Add mapProductCategory() and mapIntent() helper functions
- Rewrite logLead() to write Phone, Source, Product Interest,
  Lead Stage, and Engagement as proper Airtable fields
- Hardcode Leads table ID to prevent auto-discovery writing
  to the wrong table
- Add chat.test.js with 31 test cases for mapping functions

Before: every AI agent lead scored 0, invisible in Hot Leads view.
After: Suvesu Referral source (+3) + Product Interest (+1–3) +
Engagement (+0–2) = 4–8 pts per lead."
git push -u origin fix/ai-agent-airtable-field-mapping
# Then open PR from fix/ai-agent-airtable-field-mapping → main
```

## PR Description

**Title:** `fix: map AI agent lead fields to Airtable CRM schema`

**Body:**
```
## Problem

When a visitor submits their contact info through the AI agent ("Uzman sizi arasın"),
the lead record created in Airtable only has Name and Notes filled in. All structured
fields — Phone, Source, Product Interest, Lead Stage, Engagement — are empty.

This means:
- Lead score = 0 (should be 4–8 for a qualified AI agent lead)
- Lead doesn't appear in Hot Leads or Follow-Up Today views
- Phone number can't be clicked-to-call from the CRM
- No way to filter by source or product interest

## Fix

1. Added `mapProductCategory(category)` — maps AI agent product categories to
   Airtable multipleSelects choices ("RO Sistemi", "Filtre", "TDS Metre", "Su Aritma")

2. Added `mapIntent(intent)` — maps AI agent intent IDs to Airtable Engagement
   choices ("Fiyat Sordu", "Kurulum Sordu", "Zaman Belirtti", "Genel Bilgi")

3. Rewrote `logLead()` to write all structured fields:
   - Phone (phoneNumber field)
   - Source = "Suvesu Referral" (3 pts)
   - Product Interest (multipleSelects, 1–3 pts)
   - Lead Stage = "New"
   - Engagement (mapped from intent, 0–2 pts)

4. Hardcoded Leads table ID (`tblsBQkMOMyi5yc1n`) to guarantee the record
   goes to the Leads table, not whatever table auto-discovery finds first.

## Score Impact

| Lead type | Before | After |
|-----------|--------|-------|
| AI agent, price inquiry, RO | 0 pts (Cold) | 8 pts (Hot) |
| AI agent, general inquiry | 0 pts (Cold) | 3 pts (Cool) |
| AI agent, installation + product | 0 pts (Cold) | 7 pts (Warm) |

## Tests

Added `chat.test.js` with 31 test cases covering all mapping branches
including edge cases (undefined, null, unknown values default to "Su Aritma" / "Genel Bilgi").

Run: `node public_html/api/chat.test.js`

## Files Changed

- `public_html/api/chat.js` — logLead rewrite + 2 new functions + 2 constants
- `public_html/api/chat.test.js` — new test file
```

## Airtable Field Reference

| Field | ID | Type | This fix sets |
|-------|-----|------|--------------|
| Name | `fldbeBIkPq3zfuIGY` | singleLineText | `data.name` |
| Phone | `fldyojqHa7d0Rhpxb` | phoneNumber | `data.phone` |
| Source | `fldiI1Rq2A9Rb4F8A` | singleSelect | `"Suvesu Referral"` |
| Product Interest | `fldBMhqojPA7llfju` | multipleSelects | mapped from `data.product_category` |
| Lead Stage | `fldoObCW7edoT5Vgt` | singleSelect | `"New"` |
| Engagement | `fld7xUrEpcjUVVUHA` | singleSelect | mapped from `data.intent` |
| Notes | `fld2cEV0lY1pwgpfp` | multilineText | structured note string |
