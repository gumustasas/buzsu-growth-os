# Implementation Plan — Phase 2.3

## What We Know For Certain

From search index, customer reviews, and project brief:

| Source | Status | Contact Channel |
|--------|--------|----------------|
| Buzsu WhatsApp (05527896905) | Active, confirmed | WhatsApp Business |
| Buzsu Contact Form (/iletisim) | Page exists, form platform unknown | Email notification (likely) |
| Buzsu Instagram (@buzsuaritma) | Active, confirmed | Instagram DM + WhatsApp redirect |
| Buzsu product pages | Active, confirmed | WhatsApp CTA on each page |
| Suvesu AI Agent | Described in brief, platform unknown | Unknown |
| Suvesu Water Intelligence | Described in brief, platform unknown | Unknown |
| Suvesu Contact Form | Described in brief, page unseen | Unknown |

## The Fastest Source of Real Leads

**WhatsApp.** Already active. Already receiving messages. Customers find Buzsu on Instagram, tap a WhatsApp link, and message directly. This is the confirmed current flow. It generates real leads today with zero setup.

**The problem:** Those conversations don't create Airtable records. They live in one phone.

**The constraint:** Automating WhatsApp (phone number → Airtable) requires the WhatsApp Cloud API, a Business Solution Provider, and approval. That is new infrastructure. Ruled out.

**The fastest alternative:** Replace or supplement the Buzsu contact form with a form that writes directly to Airtable. No webhook. No automation tool. No code.

---

## The Integration Path: Airtable Native Forms

Airtable's built-in Form view creates records in the Leads table when submitted. No third-party tool required. No code. Available on the free plan.

### Why This Is The Right Choice

| Option | Setup Time | Cost | Reliability | Verdict |
|--------|-----------|------|-------------|---------|
| Airtable native form | 10 min | Free | Built-in | **Use this** |
| Tally.so + Airtable integration | 20 min | Free | Dependent on Tally API | Backup option |
| Make.com + current form webhook | 2–4h | $9/mo | Unknown form platform | Too risky without site access |
| WhatsApp Cloud API | Days + approval | $50+/mo | Complex | Out of scope |

---

## Step-by-Step Implementation

### Step 1: Create the Airtable Form (10 minutes)

1. Open Airtable → SuveSu Logs base → **Leads table**
2. Click **+** next to the views panel → select **Form**
3. Name it: `Buzsu İletişim Formu`
4. Add these fields to the form (in this order):

| Form Label (Turkish) | Airtable Field | Required? |
|---------------------|---------------|-----------|
| Adınız | Name | Yes |
| Telefon Numaranız | Phone | Yes |
| Hangi ürünle ilgileniyorsunuz? | Product Interest | Yes |
| Mesajınız | Notes | No |

5. Hide all other fields (Source, Lead Stage, etc.) — they'll be set to defaults
6. Set field defaults (these won't show on the form but will be auto-filled):
   - Source → `Contact Form`
   - Lead Stage → `New`
   - Created Date → today (auto)
7. Copy the share URL (format: `airtable.com/shr...`)

### Step 2: Add It To Buzsu.com.tr (30 minutes for your developer)

**Option A — Embed directly** (preferred):
Replace the existing contact form section on `/iletisim` with the Airtable form embedded via iframe:
```html
<iframe
  class="airtable-embed"
  src="https://airtable.com/embed/YOUR_FORM_ID"
  frameborder="0"
  width="100%"
  height="533"
  style="background: transparent; border: 1px solid #ccc;">
</iframe>
```

**Option B — Link button** (zero developer time):
Add a button anywhere on the site:
```
Text: "Teklif Al" veya "Bilgi İste"
Link: https://airtable.com/shr[YOUR_FORM_ID]
```
This opens the form in a new tab. Works on mobile. No developer needed.

### Step 3: Create a Second Form for Suvesu (5 minutes)

Repeat Step 1. Name it: `Suvesu İletişim Formu`
Change the Source default to `Suvesu Referral` instead of `Contact Form`.
Add to Suvesu.com contact page when ready.

### Step 4: Pre-fill WhatsApp CTAs (30 minutes)

Replace every WhatsApp button URL on Buzsu product pages with pre-filled versions.
The pre-fill identifies the source product before you even read the message.

```
/su-aritma-cihazlari/
https://wa.me/905527896905?text=Su%20ar%C4%B1tma%20cihazlar%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum

/su-aritma-filtreleri/
https://wa.me/905527896905?text=Filtre%20fiyatlar%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum

/endustriyel-su-aritma/
https://wa.me/905527896905?text=End%C3%BCstriyel%20su%20ar%C4%B1tma%20sistemi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum

/code-su-aritma-cihazi/
https://wa.me/905527896905?text=Code%20su%20ar%C4%B1tma%20cihaz%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum

/su-aritma-servisi/
https://wa.me/905527896905?text=Servis%20ve%20bak%C4%B1m%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum
```

WhatsApp leads stay manually entered into Airtable — but the pre-filled message tells you exactly what Product Interest to set. Reduces entry time from 2 minutes to 30 seconds.

---

## Field Mapping — Form → Airtable

Every form submission creates one Airtable record. Here's what fills what:

| Airtable Field | Buzsu Form | Suvesu Form | Manual (WhatsApp) |
|---------------|-----------|------------|------------------|
| Name | Form field | Form field | Ask in reply |
| Phone | Form field | Form field | Auto from WhatsApp |
| Source | Auto: `Contact Form` | Auto: `Suvesu Referral` | Set: `WhatsApp` |
| Product Interest | Form selection | Form selection | Infer from message |
| Lead Stage | Auto: `New` | Auto: `New` | Set: `New` |
| Notes | Form message field | Form message field | Paste first message |
| Created Date | Auto: submission time | Auto: submission time | Set: today |
| Engagement | Not set (update after contact) | Not set | Set from message content |
| Response Speed | Not set (update after reply) | Not set | Update after they reply |
| Score | Auto-calculated formula | Auto-calculated formula | Auto-calculated formula |

---

## Suvesu AI Agent + Water Intelligence

Both features exist on a platform that isn't publicly accessible. Until the platform is identified, the integration is:

1. Every AI Agent conversation should end with:
   > "Evinize uygun sistemi önermemi ister misiniz? → [Teklif Al formu linki]"
   
   That form link is the Suvesu Airtable Form from Step 3 above.

2. The Water Intelligence tool result page should show:
   > "TDS değeriniz: [X]. Sizin için uygun sistemi bulmak için forma yazın. → [link]"

Both of these create a `Suvesu Referral` record in Airtable automatically. No API integration needed.

Once the platform (Voiceflow, Tidio, custom, other) is confirmed, a direct API connection can be added in Phase 3.

---

## What This Does Not Cover

| Excluded | Why |
|---------|-----|
| Instagram DM capture | Requires Meta API + approved business account |
| WhatsApp automation | Requires WhatsApp Cloud API approval + cost |
| Make.com | Unknown form platform on Buzsu makes this unreliable to spec |
| New tables | None created — all records go to existing Leads table |
| New infrastructure | Airtable Forms is a feature you already have |

---

## Done Criteria

- [ ] Airtable Form for Buzsu created and share URL copied
- [ ] Airtable Form for Suvesu created and share URL copied
- [ ] Buzsu /iletisim page updated (embed or button link)
- [ ] Product page WhatsApp links updated with pre-filled messages
- [ ] One test submission made from each form
- [ ] Test records appear in Airtable Leads table with correct field values
- [ ] Score formula fires correctly on test records
