# Lead Entry Point Audit

## Scope

Code-level audit of all lead capture points across both sites. Findings based on reading actual source files in `gumustasas/suvesu-site` and `gumustasas/buzsu`.

**Date:** June 2026

---

## Repository Reality

### `gumustasas/buzsu` — NOT the production site

The GitHub repo at `gumustasas/buzsu` is a **bare Next.js prototype** (`buzsu.vercel.app`). It contains exactly 5 source files and has no functional lead capture:

- Homepage product grid: static "Sepete Ekle" buttons with no `onClick` handler
- Product detail pages: same — no form, no WhatsApp link, no phone, no API call
- No `/iletisim` page, no contact form, no `wa.me` links anywhere

**The production site at `buzsu.com.tr` is NOT in this repository.** It runs on an unknown platform (likely WordPress) and cannot be audited from code. All references in planning docs to "Buzsu contact form", "product page WhatsApp CTAs", and "WhatsApp pre-fill URLs" must be implemented on the `.com.tr` site directly, not in this repo.

### `gumustasas/suvesu-site` — the real production site

This repo contains the full public HTML site at `suvesu.com`. It has actual lead capture logic. All findings below are from this repo.

---

## Suvesu.com — All Lead Entry Points

### Entry Point 1: Main Contact Form

| Attribute | Detail |
|-----------|--------|
| **File** | `public_html/index.html` → `public_html/contact.php` |
| **URL** | `https://suvesu.com/#danisma` |
| **Method** | HTML form, `method="POST"`, `action="contact.php"`, attribute `data-lead-form` |
| **Fields collected** | `name` (required), `phone` (required), `message` (textarea, optional) |
| **Honeypot** | `name="website"` — empty = human, filled = bot, rejected |
| **Current behavior** | Synchronous POST to `contact.php`. PHP `mail()` sends to `iletisim@suvesu.com`. Redirects to `/?talep=ok#danisma` on success. |
| **Airtable** | **No** — goes to email inbox only |
| **Analytics** | `tracker.js` fires `lead_form_submit` event on submit |

**Gap:** Form submissions go to an inbox. If the inbox isn't checked within hours, the lead is lost. No CRM record created.

**Fix:** Add a Make.com scenario: `Webhook → Airtable create record`. Or: replace the contact form with an Airtable native form embed. Either option takes ~2 hours.

**Airtable field mapping:**

| Form Field | Airtable Field | Value |
|------------|---------------|-------|
| `name` | Name | Form input |
| `phone` | Phone | Form input |
| `message` | Notes | Form input |
| (auto) | Source | `Suvesu Referral` |
| (auto) | Lead Stage | `New` |
| (auto) | Engagement | `Genel Bilgi` |

---

### Entry Point 2: AI Agent Lead Capture Form ("Uzman sizi arasın")

| Attribute | Detail |
|-----------|--------|
| **File** | `public_html/assets/live-agent.js` → `public_html/api/chat.js` |
| **URL** | All pages loading `live-agent.js` (homepage + product pages at minimum) |
| **Trigger** | Form appears automatically when conversation `lead_score` crosses a threshold |
| **Fields collected** | `lead_name` (required), `lead_phone` (required, type=tel), `lead_city` (optional) |
| **Context captured** | intent, product_name, product_id, product_category, page path — all from AI conversation state |
| **Current behavior** | POSTs JSON to `/api/chat` with `action: "lead"`. `chat.js` backend calls Airtable REST API with `AIRTABLE_TOKEN` env var. Auto-discovers base via `/v0/meta/bases`. |
| **Airtable** | **Yes — already integrated** |

**What it writes to Airtable:**

| Airtable Field | Value Written |
|---------------|--------------|
| `Name` | `lead_name` (max 200 chars, defaults to "Lead") |
| `Notes` | `"LEAD | Tel: {phone} | İl: {city} | Intent: {intent} | Ürün: {product_name} | Ürün ID: {product_id} | Kategori: {product_category} | Sayfa: {path} | {timestamp}"` |

**Gap:** The backend writes `Name` and `Notes` but does NOT set `Phone`, `Source`, `Lead Stage`, `Product Interest`, or `Engagement` as separate fields. All enriched context ends up buried in the Notes string — not queryable, not scoreable, not visible in the lead scoring formula.

**Fix:** Update `api/chat.js` to map fields explicitly:

```js
fields: {
  Name: data.name || "Lead",
  Phone: data.phone,
  Source: "Suvesu Referral",
  "Lead Stage": "New",
  "Product Interest": [mapCategoryToProductInterest(data.product_category)],
  Engagement: mapIntentToEngagement(data.intent),
  Notes: `Suvesu AI: ${data.intent} | ${data.product_name} | Sayfa: ${data.path} | ${timestamp}`
}
```

This requires knowing the exact Airtable field IDs (from `airtable-schema.md`) and the table ID `tblsBQkMOMyi5yc1n`. The fix is in one file and takes ~1 hour.

**There is also a "Konuşmayı WhatsApp'a taşı" button** that opens `wa.me/905527896905?text=<full conversation>` — this creates a WhatsApp lead but no Airtable record. The WhatsApp conversation must be manually entered.

---

### Entry Point 3: AI Chat Input (Conversational Qualification)

| Attribute | Detail |
|-----------|--------|
| **File** | `public_html/assets/live-agent.js` → `public_html/api/chat.js` |
| **URL** | All pages with live-agent.js |
| **Fields** | Free-text message. AI extracts: TDS value, household size (kaç kişi), intent, product category |
| **Airtable** | **Yes — logs every message** |

Each chat message is logged to Airtable with:
- `Name`: the message text (max 500 chars)
- `Notes`: `"Intent: {intent} | Skor: {lead_score} | TDS: {tds} | Ürün: {product_name} | ..."`

**Gap:** Same as Entry Point 2 — all data in `Notes`, no structured field mapping. TDS value is captured in conversation state but never written to a dedicated field. The `lead_score` calculated by the AI is not visible in Airtable's lead scoring formula.

---

### Entry Point 4: TDS Calculator Widget ("Su Kalitesi Hesaplama Aracı")

| Attribute | Detail |
|-----------|--------|
| **File** | `public_html/assets/tds-widget.js` |
| **URL** | Water Intelligence city pages (istanbul, ankara, izmir, antalya) + some blog pages |
| **Field** | TDS value, number input, 0–3000 mg/L, placeholder "örn. 250" |
| **Current behavior** | `e.preventDefault()` — form is **never submitted anywhere**. Client-side only. Shows quality assessment inline. Has a `.tds-widget-cta` button (a CTA based on TDS band). |
| **Airtable** | **No** |

**Gap:** A visitor who enters TDS=450 and sees "su kalitesi kötü" is the highest-intent lead in the system. That TDS value goes nowhere.

**Fix:** After showing results, show a WhatsApp CTA with the TDS value pre-filled:

```js
const ctaEl = root.querySelector(".tds-widget-cta");
ctaEl.href = `https://wa.me/905527896905?text=${encodeURIComponent(
  `TDS değerim ${value} mg/L çıktı. Evimdeki su için uygun sistem önerinizi alabilir miyim?`
)}`;
ctaEl.textContent = "WhatsApp'tan öneri al";
```

This is a ~15 minute change in `tds-widget.js`. When the WhatsApp message arrives, the salesperson sets: Source = `Suvesu Referral`, Notes includes TDS value, Product Interest = `RO Sistemi` if TDS > 200.

---

### Entry Point 5: Floating Phone Button (all pages)

| Attribute | Detail |
|-----------|--------|
| **File** | `public_html/assets/app.js` |
| **URL** | All pages |
| **Number** | `+905527896905` (from `site-data.json` → `phone_href`) |
| **Current behavior** | `tel:+905527896905` — opens dialer |
| **Airtable** | No — direct call |

Phone calls create no record. **Manual entry required** after every call.

---

### Entry Point 6: Floating WhatsApp Button (all pages)

| Attribute | Detail |
|-----------|--------|
| **File** | `public_html/assets/app.js` |
| **URL** | All pages |
| **Number** | `905527896905` (from `site-data.json` → `whatsapp_number`) |
| **Default topic** | "Merhaba, SuveSu sayfasından geldim. Su arıtma hakkında ücretsiz bilgi almak istiyorum." |
| **Per-page override** | Each page's `data-topic` attribute overrides the default topic |
| **Current behavior** | Opens `wa.me/905527896905?text=<topic>` — no server-side capture |
| **Airtable** | No |

---

### Entry Point 7: Top-Strip Phone + WhatsApp Bar (20+ pages)

| Attribute | Detail |
|-----------|--------|
| **HTML pattern** | `<a href="tel:+905527896905">` and `<a data-whatsapp data-topic="..." href="https://wa.me/905527896905">` |
| **Pages** | homepage, all 14 blog posts, 2 product pages, videos, hakkimizda, basin-kiti |
| **Topic examples** | "Merhaba, filtre değişimi hakkında bilgi istiyorum." (on filtre-degisimi-ne-zaman.html) |
| **Airtable** | No |

---

### Entry Point 8: In-Body WhatsApp CTAs (blog + product + games + videos)

Context-specific WhatsApp buttons embedded inside article content or sidebars:

| Page | CTA text | Pre-fill topic |
|------|---------|---------------|
| `blog/tds-nedir.html` | "TDS sonucunu sor" | "TDS ölçüm sonucumu yorumlatmak istiyorum." |
| `blog/ters-osmoz-nedir.html` | "RO cihaz danışma" | (RO topic) |
| `blog/su-aritma-bakim-rehberi.html` | inline notice | (maintenance topic) |
| `urunler/filtre-seti/index.html` | "Cihazınıza uygun filtreyi bulun" | (filter topic) |
| `games/index.html` | `.sg-cta` section | "su arıtma oyunlarından geldim" |
| `videos/index.html` | video CTA | (video topic) |

All are `<a href="wa.me/...">` — no server-side capture.

---

### Entry Point 9: Email Links (4 pages)

| Pages | Destination |
|-------|------------|
| `/`, `/hakkimizda`, `/basin-kiti`, `/videos/` | `mailto:` assembled at runtime from `site-data.json` |

`admin_email` field was empty in the committed `site-data.json` — may be set in the live deployment environment only. Goes to email client, no capture.

---

### Entry Point 10: Homepage Scroll Story WhatsApp CTA

```html
<a class="button" data-whatsapp 
   data-topic="Merhaba, Code Advantage su arıtma cihazı hakkında bilgi almak istiyorum." 
   href="https://wa.me/905527896905">WhatsApp'tan sor</a>
```

Located in `.story-solution-actions` on `index.html`. No capture.

---

## Priority Action List

### P1 — Fix the AI agent field mapping (suvesu-site, 1 hour)

**File:** `public_html/api/chat.js`

The AI agent already integrates with Airtable. The problem is it only writes `Name` and `Notes`, ignoring `Phone`, `Source`, `Lead Stage`, `Product Interest`, and `Engagement`. This means every AI agent lead has a lead score of 0 and can't be found in the Hot Leads view.

Fix: Update `logLead()` in `chat.js` to write all structured fields. Use these Airtable IDs:
- Table: `tblsBQkMOMyi5yc1n`
- Source field: `fldXXXX` (see `airtable-schema.md` for field IDs)
- Source value for all AI agent leads: `"Suvesu Referral"` (3 pts)

This single fix makes every AI agent lead immediately scoreable and visible in the dashboard.

---

### P1 — Connect Suvesu contact form to Airtable (suvesu-site, 2 hours)

**File:** `public_html/contact.php`

Add an Airtable API call after the existing `mail()` call. Same `AIRTABLE_TOKEN` env var the AI agent already uses.

```php
// After existing mail() call:
$airtable_token = getenv('AIRTABLE_TOKEN');
$payload = json_encode(['fields' => [
  'Name' => $name,
  'Phone' => $phone,
  'Notes' => $message,
  'Source' => 'Suvesu Referral',
  'Lead Stage' => 'New',
]]);
$ch = curl_init('https://api.airtable.com/v0/apphVqbUQohAMIoWk/tblsBQkMOMyi5yc1n');
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_POSTFIELDS => $payload,
  CURLOPT_HTTPHEADER => [
    'Authorization: Bearer ' . $airtable_token,
    'Content-Type: application/json',
  ],
  CURLOPT_RETURNTRANSFER => true,
]);
curl_exec($ch);
curl_close($ch);
```

The email to `iletisim@suvesu.com` stays in place — this is additive.

---

### P2 — Add WhatsApp CTA to TDS widget results (suvesu-site, 15 minutes)

**File:** `public_html/assets/tds-widget.js`

After the widget calculates and displays the TDS result, update the `.tds-widget-cta` element to a WhatsApp link with the TDS value pre-filled. When that WhatsApp arrives, the salesperson sets:
- Source: `Suvesu Referral`
- Product Interest: `RO Sistemi` (if TDS > 200), `Su Aritma` (TDS 50–200), `Filtre` (TDS < 50)
- Notes: paste TDS value and result rating

---

### P3 — Buzsu.com.tr (unknown platform, needs site access)

The production Buzsu site is not in the `gumustasas/buzsu` repo. The repo is a prototype only. To connect the live site:

1. **Identify the platform** — log into the hosting control panel. Is it WordPress? If yes: which form plugin (Contact Form 7, Gravity Forms, Elementor)?
2. **Add Airtable form** (zero-code option): Create an Airtable native form, embed via iframe on `/iletisim`. Takes 10 minutes with no developer.
3. **Update WhatsApp CTA links** on all product pages to pre-filled messages (URLs in `integration-plan.md`).

These cannot be done from code without site access.

---

## Complete Gap Summary

| Entry Point | Airtable Today | Gap | Fix Priority |
|-------------|---------------|-----|-------------|
| Suvesu contact form | No — email only | Leads go to inbox | **P1** |
| Suvesu AI agent lead form | Yes — but only Name + Notes | All structured fields missing | **P1** |
| Suvesu AI chat messages | Yes — but only Name + Notes | Same as above | P1 (same fix) |
| TDS widget | No | High-intent signal captured nowhere | P2 |
| Floating WA button (all pages) | No | WhatsApp → manual entry | P2 (manual discipline) |
| Top-strip WA bar (all pages) | No | Same | P2 |
| In-body WA CTAs (blog/products) | No | Same | P2 |
| Floating phone button | No | Calls → manual entry | P2 |
| Email links | No | Email → manual entry | P3 |
| Buzsu.com.tr contact form | Unknown — no code access | Platform unconfirmed | P1 (confirm first) |
| Buzsu.com.tr product page CTAs | Unknown — no code access | Links likely generic | P1 (confirm first) |
| Buzsu.com.tr WhatsApp button | Unknown — no code access | Manual entry only | P1 |

---

## Critical Discovery

**The Suvesu AI agent is already writing to Airtable.** This was not known from the planning docs. The integration exists (`AIRTABLE_TOKEN` env var, REST API calls in `api/chat.js`), but the field mapping is incomplete — only `Name` and `Notes` are written. Fixing the field mapping (P1) immediately makes the best lead source in the system fully functional in the CRM.

The fastest path to a working lead pipeline:
1. Fix `api/chat.js` field mapping — 1 hour, no new infrastructure
2. Add Airtable API call to `contact.php` — 30 minutes, reuses existing token
3. Add WhatsApp CTA to TDS widget results — 15 minutes
4. Confirm Buzsu.com.tr platform — then embed Airtable form on `/iletisim`
