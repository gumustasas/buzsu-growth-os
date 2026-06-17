# Integration Plan

## Goal

Connect all 7 lead capture points to the Airtable Leads table. Do it in order of business impact. Stop when every hot lead is being captured within 5 minutes.

---

## What "Integration" Means Here

No code. No webhooks. No n8n. No Render.

"Integration" at this stage means:
1. A clear process for who creates the Airtable record and when
2. One Make.com automation for each form (set-and-forget, 2h each)
3. Notes standards so every record has the same structure

The goal is zero lost leads, not technical elegance.

---

## Priority Framework

Score each capture point on:
- **Volume** — how many leads come through here per month
- **Quality** — average lead score from this source
- **Effort** — how hard to connect to Airtable

| Score | Meaning |
|-------|---------|
| P1 | Do this week. Revenue depends on it. |
| P2 | Do within 30 days. Meaningful uplift. |
| P3 | Do within 90 days. Nice to have. |

---

## P1: Buzsu WhatsApp Inbound

**Business impact:** This is the primary sales channel. Every missed record = potential lost sale.
**Current state:** Conversations happen. Records probably don't exist.
**Target state:** Every WhatsApp conversation → Airtable record within 5 minutes.

**Implementation (no tools needed):**

Step 1: Open WhatsApp Business settings. Turn on notifications for all hours: 09:00–18:00.

Step 2: Pin Airtable mobile app on your phone. Create the lead record while still in the WhatsApp conversation.

Step 3: Use this sequence for every new inbound message:
```
1. Reply within 5 minutes (this is the rule)
2. While waiting for their reply, open Airtable
3. Create new Lead record: Name + Phone + Source=WhatsApp + Lead Stage=New
4. Set Product Interest from their message
5. Paste their first message into Notes
```

**Effort:** 0 hours setup. 2 minutes per lead. Discipline required.
**Expected impact:** 100% capture of active WhatsApp conversations.
**Priority score: P1 — Do today.**

---

## P1: Buzsu Contact Form → Airtable

**Business impact:** Form submissions are high intent. Currently likely going to email and being forgotten.
**Current state:** Form → email notification → maybe followed up.
**Target state:** Form submission → Airtable record created automatically within 60 seconds.

**Implementation (Make.com, ~2 hours):**

Step 1: Confirm the form platform [CONFIRM: WordPress/Contact Form 7? Elementor? Custom HTML?]

Step 2: In Make.com, create scenario:
```
Trigger: New form submission (via webhook or form platform module)
Action: Create record in Airtable > Leads table
Field mapping:
  Name ← form "Ad Soyad" field
  Phone ← form "Telefon" field
  Source ← hardcode "Contact Form"
  Lead Stage ← hardcode "New"
  Notes ← form "Mesaj" field
  Created Date ← submission timestamp
```

Step 3: Test with a real submission. Confirm record appears in Airtable within 60 seconds.

Step 4: Add Airtable notification: when new record appears with Source = "Contact Form", ping salesperson (via WhatsApp Business message to yourself, or email).

**Effort:** 2 hours.
**Monthly cost:** Make.com free tier covers this volume (<1000 operations/month).
**Expected impact:** Zero form submissions lost. Faster response time.
**Priority score: P1 — Do this week.**

---

## P1: Product Page CTAs — Tracking Source in Notes

**Business impact:** Knowing which product page a lead came from lets you set Product Interest accurately and skip the qualification step.
**Current state:** Product page WhatsApp CTAs fire generic messages ("Merhaba, bilgi almak istiyorum").
**Target state:** Each product page CTA pre-fills a message that identifies the product.

**Implementation (WhatsApp link change, 30 minutes):**

Change each product page WhatsApp CTA from a generic link to a pre-filled message link:

```
Generic (current):
https://wa.me/905527896905

Product-specific (new):
/su-aritma-cihazlari/ → https://wa.me/905527896905?text=Su%20ar%C4%B1tma%20cihazlar%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum
/su-aritma-filtreleri/ → https://wa.me/905527896905?text=Filtre%20fiyatlar%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum
/endustriyel-su-aritma/ → https://wa.me/905527896905?text=End%C3%BCstriyel%20su%20ar%C4%B1tma%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum
/code-su-aritma-cihazi/ → https://wa.me/905527896905?text=Code%20su%20ar%C4%B1tma%20cihaz%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum
```

When the pre-filled message arrives in WhatsApp, salesperson immediately knows which product to set in Airtable.

**Effort:** 30 minutes.
**Expected impact:** 100% accurate Product Interest field on product page leads. Score floor rises from ~2pts to ~5pts automatically.
**Priority score: P1 — Do this week.**

---

## P2: Suvesu AI Agent → WhatsApp Handoff

**Business impact:** AI agent conversations are the highest-quality pre-qualified leads in the system. Today they likely go nowhere.
**Current state:** AI agent answers questions. No lead capture step.
**Target state:** Every AI agent conversation ends with a WhatsApp CTA that creates a scoreable lead.

**Implementation (content change on Suvesu, 1 hour):**

Step 1: Add a closing line to every AI agent response (or as a final step in the conversation flow):

Turkish: `"Evinize en uygun sistemi önermemi ister misiniz? WhatsApp'tan yazın: [link]"`

Step 2: Make the WhatsApp link pre-fill context from the conversation:
```
https://wa.me/905527896905?text=Suvesu%20AI%27den%20geliyorum%2C%20[konu]%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum
```

Step 3: When this message arrives in WhatsApp Business:
- Source → `Suvesu Referral`
- Product Interest → infer from the pre-filled message topic
- Engagement → `Genel Bilgi` initially; upgrade if they ask about price

**If the AI agent can collect phone numbers directly:**
Add a Make.com scenario:
```
Trigger: AI agent conversation with contact info collected
Action: Create Airtable record
  Source ← "Suvesu Referral"
  Notes ← conversation summary
  Product Interest ← topic detected
```
[CONFIRM: What platform is the Suvesu AI Agent built on? This determines the automation approach.]

**Effort:** 1–4 hours depending on AI agent platform.
**Expected impact:** Converts AI agent from awareness tool to lead capture asset. Even 5% conversion rate from AI conversations = meaningful leads at zero cost.
**Priority score: P2 — Do within 30 days.**

---

## P2: Suvesu WhatsApp Button

**Business impact:** Same WhatsApp number, different source. Just needs correct Source tagging.
**Current state:** [CONFIRM button exists on Suvesu.com]
**Target state:** Every Suvesu WhatsApp message tagged as `Suvesu Referral`, not `WhatsApp`.

**Implementation (process change, 0 hours):**

When a WhatsApp message arrives mentioning Suvesu, water quality, TDS, or comes from a pre-filled Suvesu message:
- Set Source = `Suvesu Referral` (not WhatsApp)
- This gives them +3 points instead of +2

**Effort:** 0 hours setup. Just awareness during data entry.
**Expected impact:** Correctly identifies your highest-value source. Over 90 days, tells you if Suvesu is generating better leads than Buzsu CTAs.
**Priority score: P2 — Do immediately (it's just attention, not work).**

---

## P2: Water Intelligence Tool → Lead Capture

**Business impact:** Visitors who see "your water is bad" are the most purchase-ready leads in the funnel. Capturing even 10% of tool users is high value.
**Current state:** [CONFIRM: Does the tool have a contact capture step?]
**Target state:** Tool result page has a WhatsApp CTA with pre-filled TDS value.

**Implementation:**

If no contact capture step exists, add this to the results page:
```
"Su kalitesi: [sonuç]
TDS değeriniz: [değer] ppm

Eviniz için uygun sistemi ücretsiz önermemizi ister misiniz?"
[WhatsApp butonu: pre-fill "TDS [değer], [sonuç] çıktı. Öneri istiyorum."]
```

When salesperson receives this message:
- Source → `Suvesu Referral`
- Product Interest → set based on TDS value (high TDS = RO Sistemi)
- Notes → paste TDS value + result verbatim
- Engagement → `Genel Bilgi` minimum; upgrade if they have follow-up questions

If tool CAN capture email/phone directly (gated results):
Add Make.com scenario to pipe captured contacts to Airtable.

**Effort:** 1–3 hours on Suvesu.com depending on platform.
**Expected impact:** Turns the highest-intent page on Suvesu into a lead generator.
**Priority score: P2 — Do within 30 days.**

---

## P3: Suvesu Contact Form → Airtable

**Business impact:** Same as Buzsu contact form automation, but lower volume.
**Current state:** [CONFIRM form exists on Suvesu.com]
**Target state:** Suvesu form → Airtable record with Source = `Suvesu Referral`

**Implementation:** Identical to Buzsu contact form Make.com scenario. Just add a second Make.com step or a second scenario for the Suvesu form.

**Effort:** 1 hour (clone of the Buzsu form scenario).
**Priority score: P3 — Do after P1 and P2 are running.**

---

## Implementation Timeline

| Week | Actions |
|------|---------|
| **This week** | P1: Start manually creating Airtable records for every WhatsApp conversation. P1: Update product page CTA links to pre-filled messages. P1: Set up Make.com for Buzsu contact form. |
| **Week 2–3** | P2: Confirm Suvesu AI Agent platform. Add WhatsApp CTA to end of AI agent conversations. Start tagging Suvesu WhatsApp messages with correct Source. |
| **Week 3–4** | P2: Add WhatsApp CTA to Water Intelligence tool results page. Confirm it's working. |
| **Month 2** | P3: Add Suvesu contact form → Airtable automation. Review first 30 days of lead data and check if source tagging is accurate. |

---

## Things to Confirm Before Implementing

Mark each as done when verified:

- [ ] Confirm WhatsApp number is 05527896905 on both sites (or different numbers?)
- [ ] Confirm Buzsu contact form platform (WordPress plugin? Custom form? Elementor?)
- [ ] Confirm Suvesu AI Agent platform (custom build? Tidio? Voiceflow? Other?)
- [ ] Confirm Water Intelligence tool exists and what it does exactly (TDS calculator? Quiz? Report generator?)
- [ ] Confirm Suvesu contact form exists and its fields
- [ ] Confirm Suvesu WhatsApp button exists and what number it uses
- [ ] Confirm product page CTA current link format (generic or already pre-filled?)

---

## What "Done" Looks Like

The integration is complete when:

1. Every WhatsApp inbound conversation creates an Airtable record within 5 minutes
2. Both contact forms (Buzsu + Suvesu) auto-create Airtable records via Make.com
3. Product page CTAs use pre-filled messages to identify source product
4. Suvesu AI agent and Water Intelligence tool end with a WhatsApp CTA
5. Every Suvesu-origin lead is tagged `Suvesu Referral` (not `WhatsApp`)
6. After 30 days, Weekly KPIs show which source produces the most Won leads

At that point, the data will tell you where to invest next.
