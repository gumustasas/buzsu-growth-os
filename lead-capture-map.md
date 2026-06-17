# Lead Capture Map

## Research Notes

Both Buzsu.com.tr and Suvesu.com block automated crawling. The map below is built from:
- Google search index fragments for Buzsu.com.tr (confirmed)
- Project description provided for this system (stated)
- Standard patterns for Turkish water purification sites (inferred)

Items marked **[CONFIRM]** need you to verify against the live site before implementing.

---

## Buzsu.com.tr — Confirmed Lead Capture Points

### 1. WhatsApp Direct Contact

**Source name in Airtable:** `WhatsApp`
**Number confirmed:** 05527896905
**Location:** Header / contact page / product pages [CONFIRM exact placements]
**Trigger:** Visitor taps WhatsApp button

| Data Available | Airtable Field | Notes |
|----------------|---------------|-------|
| Phone number | `Phone` | Automatic from WhatsApp |
| Message text | `Notes` | Copy verbatim |
| Product context (if from product page) | `Product Interest` | Set based on page they came from |
| — | `Source` | Always set to `WhatsApp` |
| — | `Lead Stage` | Always set to `New` |
| — | `Engagement` | Set based on what they wrote |

**Score impact:** Source = 2pts. Engagement depends on message content (Fiyat Sordu = +2, Kurulum Sordu = +1).

**Tracking method:** WhatsApp Business shows the conversation. Salesperson creates the Airtable record manually immediately after first contact. This is the highest-volume capture point.

---

### 2. Contact Form — /iletisim

**Source name in Airtable:** `Contact Form`
**URL:** buzsu.com.tr/iletisim
**Trigger:** Visitor submits the form

| Data Available [CONFIRM fields] | Airtable Field | Notes |
|----------------------------------|---------------|-------|
| Name | `Name` | Direct |
| Phone | `Phone` | Direct |
| Message | `Notes` | Copy verbatim |
| Subject / product selection (if exists) | `Product Interest` | [CONFIRM if form has this] |
| — | `Source` | Always set to `Contact Form` |
| — | `Lead Stage` | Always set to `New` |

**Score impact:** Source = 2pts. Higher intent than WhatsApp because they filled a form.

**Tracking method:** Form submissions currently likely arrive as email notifications. Connect form → Airtable via Make.com (one-time 2h setup). Until then, check email and manually create records daily.

---

### 3. Product Page CTAs

**Confirmed product pages:**
- /su-aritma-cihazlari/ — general listing
- /endustriyel-su-aritma/ — industrial
- /su-aritma-filtreleri/ — filters
- /su-aritma-servisi/ — service
- /code-su-aritma-cihazi/ — specific product

**Source name in Airtable:** `WhatsApp` or `Contact Form` (depending on CTA type)
**Trigger:** Visitor clicks "Teklif Al", "Bilgi Al", or WhatsApp button on a product page [CONFIRM exact CTA text]

| Data Available | Airtable Field | Notes |
|----------------|---------------|-------|
| Phone (via WhatsApp) | `Phone` | Automatic |
| Product page they came from | `Product Interest` | Infer from page URL |
| — | `Source` | WhatsApp or Contact Form |
| — | `Engagement` | Often `Fiyat Sordu` — people who click product CTAs want pricing |

**Score impact:** Product interest on a high-ticket item (Su Aritma, RO Sistemi) = +3pts. Combined with WhatsApp source = 5pts minimum before engagement is recorded.

**Tracking method:** WhatsApp Business shows the message. When recording in Airtable, note which product page the conversation started on in `Notes`. No automation needed yet.

---

## Suvesu.com — Stated Lead Capture Points

*Suvesu.com is not publicly indexed. The features below are as described in the project brief. Verify each exists and confirm exact behavior.*

### 4. Suvesu AI Agent

**Source name in Airtable:** `Suvesu Referral`
**What it is:** An AI-powered chat interface that answers water quality questions
**Trigger:** Visitor asks a question about TDS, water quality, or filtration needs

| Data Potentially Available | Airtable Field | Notes |
|----------------------------|---------------|-------|
| Questions asked | `Notes` | High signal — reveals product need |
| Phone (if AI agent collects it) | `Phone` | [CONFIRM: does agent ask for contact?] |
| Name (if collected) | `Name` | [CONFIRM] |
| Topic / product mentioned | `Product Interest` | Infer from conversation topic |
| — | `Source` | Set to `Suvesu Referral` |
| — | `Engagement` | Often `Genel Bilgi` unless they ask about pricing |

**Score impact:** Source = 3pts (highest score for any source). This is the most valuable lead type — visitor came from educational content, used the AI agent, already understands the problem.

**Tracking method:** [CONFIRM: Does the AI agent have a lead capture step? Does it offer to connect to WhatsApp or collect a phone number?] If yes, route collected contacts directly to Airtable Leads table. If no, the AI agent is an awareness tool only — add a WhatsApp CTA at the end of AI conversations.

---

### 5. Water Intelligence Feature

**Source name in Airtable:** `Suvesu Referral`
**What it is:** [CONFIRM exact nature: is this a TDS calculator, water report tool, quiz?]
**Trigger:** Visitor uses the tool and sees their water quality result

| Data Potentially Available | Airtable Field | Notes |
|----------------------------|---------------|-------|
| TDS value / water quality result | `Notes` | Paste result — high intent signal |
| Email or phone (if tool collects it) | `Phone` | [CONFIRM if tool has a "get your report" email gate] |
| Location (if asked) | `Notes` | Affects product recommendation |
| Product recommendation shown | `Product Interest` | Set based on what the tool recommended |
| — | `Source` | `Suvesu Referral` |
| — | `Engagement` | If they used this tool, likely `Kurulum Sordu` or `Fiyat Sordu` |

**Score impact:** Source = 3pts. If tool reveals high TDS and recommends RO system, Product Interest = +3pts. Total floor = 6pts (Warm). This feature produces the highest-quality leads if it has a contact capture step.

**Tracking method:** [CONFIRM: Does the tool have a contact capture step? A "send results to WhatsApp" or email gate?] If not, add a WhatsApp CTA immediately after results are shown: "Eviniz için en uygun sistemi bulmak ister misiniz? WhatsApp'tan yazın."

---

### 6. Suvesu Contact Form

**Source name in Airtable:** `Suvesu Referral`
**Trigger:** Visitor submits contact/question form on Suvesu.com
**[CONFIRM this form exists and what fields it has]**

| Data Available | Airtable Field | Notes |
|----------------|---------------|-------|
| Name | `Name` | |
| Phone or email | `Phone` | Prefer phone |
| Question / message | `Notes` | Often reveals product need |
| — | `Source` | `Suvesu Referral` — they came via educational content |
| — | `Engagement` | Usually `Genel Bilgi` unless question is specific |

**Score impact:** Source = 3pts. These leads are pre-educated but not yet product-ready.

**Tracking method:** Connect form → Airtable via Make.com. Same as Buzsu contact form.

---

### 7. Suvesu WhatsApp Button

**Source name in Airtable:** `Suvesu Referral`
**[CONFIRM this button exists on Suvesu.com]**
**Trigger:** Visitor taps WhatsApp button after reading an article or using Water Intelligence

| Data Available | Airtable Field | Notes |
|----------------|---------------|-------|
| Phone | `Phone` | Automatic |
| Message | `Notes` | Often mentions specific topic they read |
| Article topic → product | `Product Interest` | Infer from what they reference |
| — | `Source` | `Suvesu Referral` |

**Score impact:** Source = 3pts (same number as Buzsu WhatsApp but higher intent — this person read educational content first).

**Tracking method:** Same WhatsApp Business number should appear on both sites so conversations are unified. If separate numbers are used, route Suvesu conversations with Source = `Suvesu Referral`.

---

## Summary Table

| # | Capture Point | Site | Airtable Source | Base Score | Volume Est. | Priority |
|---|--------------|------|-----------------|------------|-------------|----------|
| 1 | WhatsApp button | Buzsu | WhatsApp | 2pts | High | P1 |
| 2 | Contact form | Buzsu | Contact Form | 2pts | Medium | P1 |
| 3 | Product page CTAs | Buzsu | WhatsApp/Form | 2–5pts | Medium | P1 |
| 4 | Suvesu AI Agent | Suvesu | Suvesu Referral | 3pts | Low-Med | P2 |
| 5 | Water Intelligence tool | Suvesu | Suvesu Referral | 3–6pts | Low | P2 |
| 6 | Suvesu contact form | Suvesu | Suvesu Referral | 3pts | Low | P3 |
| 7 | Suvesu WhatsApp button | Suvesu | Suvesu Referral | 3pts | Low | P2 |

**Highest-value lead type:** Suvesu AI Agent or Water Intelligence tool user who then taps WhatsApp = 3 (source) + 3 (product) + 2 (engagement) = 8pts minimum → Hot lead immediately.
