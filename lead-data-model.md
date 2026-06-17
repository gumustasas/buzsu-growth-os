# Lead Data Model

## Principle

Every lead source writes to the same Airtable Leads table. No new tables. No parallel CRMs.
The differences between sources are captured in three fields: `Source`, `Product Interest`, and `Notes`.

---

## The Existing Leads Table (from Phase 2)

Base ID: `apphVqbUQohAMIoWk`
Table ID: `tblsBQkMOMyi5yc1n`

```
Name               → singleLineText    (primary)
Phone              → phoneNumber
Source             → singleSelect      (scored)
Product Interest   → multipleSelects   (scored)
Lead Stage         → singleSelect
Engagement         → singleSelect      (scored)
Response Speed     → singleSelect      (scored)
Notes              → multilineText
Created Date       → date
Last Contacted     → date
Assigned To        → singleLineText
Score              → formula           (0–10, auto)
Score Label        → formula           (Hot/Warm/Cool/Cold, auto)
```

---

## Data Model Per Source

### Source 1: Buzsu WhatsApp Inbound

**How it arrives:** Visitor taps WhatsApp button → message appears in WhatsApp Business app.
**Who creates the record:** Salesperson, within 5 minutes of receiving message.

```
Name             ← Ask in first reply if not in message
Phone            ← Auto-populated from WhatsApp (copy to Airtable)
Source           ← "WhatsApp"
Product Interest ← Infer from their message:
                    "su arıtma" → Su Aritma
                    "filtre" → Filtre
                    "tds" → TDS Metre
                    "osmoz" → RO Sistemi
Lead Stage       ← "New"
Engagement       ← "Fiyat Sordu" if they mention price
                   "Zaman Belirtti" if they say "bu ay", "hemen", "acil"
                   "Kurulum Sordu" if they ask about installation
                   "Genel Bilgi" if just asking general questions
Notes            ← Paste first message verbatim
Created Date     ← Today
```

**Minimum required fields to create record:** Phone + Source + Lead Stage.
Everything else fills in as the conversation develops.

---

### Source 2: Buzsu Contact Form (/iletisim)

**How it arrives:** Form submission → email notification → salesperson sees it.
**Who creates the record:** Salesperson, or Make.com automation (Phase 2 integration).

```
Name             ← Form field "Ad Soyad"
Phone            ← Form field "Telefon"
Source           ← "Contact Form"
Product Interest ← Form subject/dropdown if it exists; otherwise infer from message
Lead Stage       ← "New"
Engagement       ← "Fiyat Sordu" if message mentions price or budget
                   "Genel Bilgi" for general inquiries
Notes            ← Paste form message field verbatim
Created Date     ← Form submission timestamp
```

---

### Source 3: Buzsu Product Page CTAs

**How it arrives:** Visitor clicks WhatsApp CTA on a specific product page → WhatsApp message.
**Who creates the record:** Salesperson.

```
Name             ← Ask in reply
Phone            ← Auto from WhatsApp
Source           ← "WhatsApp"
Product Interest ← Set based on product page they came from:
                    /su-aritma-cihazlari/ → Su Aritma
                    /endustriyel-su-aritma/ → Su Aritma (note "endüstriyel" in Notes)
                    /su-aritma-filtreleri/ → Filtre
                    /code-su-aritma-cihazi/ → Su Aritma
Lead Stage       ← "New"
Engagement       ← "Fiyat Sordu" (default — people clicking product CTAs want pricing)
Notes            ← "Geldiği sayfa: [URL]" + their message
Created Date     ← Today
```

**Important:** When a product page CTA fires a WhatsApp message, the message often contains context ("Code modeli hakkında bilgi istiyorum"). Use that to set Product Interest accurately.

---

### Source 4: Suvesu AI Agent

**How it arrives:** Visitor interacts with AI agent on Suvesu.com.
**When a lead is created:** Only when the AI agent collects contact info OR the visitor clicks a WhatsApp CTA at the end of the conversation.

```
Name             ← Collected by agent (if asked) OR from WhatsApp
Phone            ← Collected by agent (if asked) OR from WhatsApp
Source           ← "Suvesu Referral"
Product Interest ← Infer from the AI conversation topic:
                    TDS questions → TDS Metre (entry) + Su Aritma (real need)
                    RO system questions → RO Sistemi
                    Filter questions → Filtre
                    General water quality → Su Aritma
Lead Stage       ← "New"
Engagement       ← "Genel Bilgi" by default
                   Upgrade to "Fiyat Sordu" if agent conversation included pricing questions
Notes            ← Summary of what the AI agent conversation covered.
                   Format: "Suvesu AI: [topic]. TDS değeri: [if mentioned]. 
                   İlgilendiği ürün: [if mentioned]."
Created Date     ← Agent interaction timestamp
```

**Key insight:** An AI agent lead who asked about TDS and got told their water score is poor is more purchase-ready than most WhatsApp cold inquiries. Score this aggressively: Source (3) + Product Interest if RO (3) = 6pts before engagement is even logged.

**What's missing today:** If the AI agent has no lead capture step (no phone/email collection), it generates no records. The fix is a single line at the end of every AI response: "Daha fazla bilgi almak için WhatsApp'a yazabilirsiniz: [link]". This turns AI agent users into WhatsApp leads.

---

### Source 5: Water Intelligence Tool

**How it arrives:** Visitor uses TDS calculator / water report tool → sees their result → optionally provides contact.

```
Name             ← Collected by tool (if gated) OR from WhatsApp follow-up
Phone            ← Collected by tool (if gated) OR from WhatsApp
Source           ← "Suvesu Referral"
Product Interest ← Set based on tool output:
                    TDS < 50: "Filtre" (basic filtration enough)
                    TDS 50–200: "Su Aritma"
                    TDS > 200 or "kötü" result: "RO Sistemi" (strongest need)
Lead Stage       ← "New"
Engagement       ← "Kurulum Sordu" if they asked follow-up questions
                   "Genel Bilgi" if they just ran the tool and left
Notes            ← "Su Zekası: TDS=[değer], sonuç=[iyi/orta/kötü], 
                   önerilen sistem=[öneri]"
Created Date     ← Tool interaction timestamp
```

**Key insight:** The TDS value a visitor enters is the highest-quality pre-sales data in the entire system. A visitor who enters TDS=450 and sees "your water is not safe" is primed to buy an RO system. This data point should always go into `Notes`.

---

### Source 6: Suvesu Contact Form

```
Name             ← Form field
Phone            ← Form field (may be email — prioritize getting phone)
Source           ← "Suvesu Referral"
Product Interest ← Infer from their question
Lead Stage       ← "New"
Engagement       ← "Genel Bilgi" (default for educational site contact forms)
Notes            ← Their full message
Created Date     ← Submission timestamp
```

---

### Source 7: Suvesu WhatsApp Button

```
Name             ← Ask in reply
Phone            ← Auto from WhatsApp
Source           ← "Suvesu Referral"
Product Interest ← Infer from what they say + what article they likely read
Lead Stage       ← "New"
Engagement       ← Set based on message content
Notes            ← Their message + "Suvesu'dan geldi" to distinguish from Buzsu WA
Created Date     ← Today
```

---

## Field Mapping Summary

| Source | Name | Phone | Source Value | Product Interest | Notes Priority |
|--------|------|-------|-------------|-----------------|----------------|
| Buzsu WhatsApp | Ask | Auto | WhatsApp | Infer from message | Paste message |
| Buzsu Form | Form field | Form field | Contact Form | Infer from subject | Paste message |
| Product page CTA | Ask | Auto | WhatsApp | Set from page URL | Note page URL |
| Suvesu AI Agent | Agent/WA | Agent/WA | Suvesu Referral | Infer from topic | AI conversation summary |
| Water Intelligence | Tool/WA | Tool/WA | Suvesu Referral | Set from TDS result | TDS value + result |
| Suvesu Form | Form field | Form field | Suvesu Referral | Infer from message | Paste message |
| Suvesu WhatsApp | Ask | Auto | Suvesu Referral | Infer from message | Note Suvesu origin |

---

## Score Impact By Source

| Source | Source Pts | Typical Product Pts | Typical Engagement Pts | Typical Floor Score |
|--------|-----------|--------------------|-----------------------|-------------------|
| Referral (personal) | 3 | 2–3 | 1–2 | 6–8 (Hot) |
| Suvesu AI Agent | 3 | 1–3 | 0–2 | 4–8 (Warm–Hot) |
| Water Intelligence | 3 | 2–3 | 1–2 | 6–8 (Hot) |
| Suvesu Form | 3 | 1–2 | 0 | 4–5 (Warm) |
| Suvesu WhatsApp | 3 | 1–3 | 0–2 | 4–8 (Warm–Hot) |
| Buzsu WhatsApp | 2 | 1–3 | 0–2 | 3–7 (Cool–Warm) |
| Contact Form | 2 | 1–2 | 0–1 | 3–5 (Cool–Warm) |

---

## What Happens to Notes

The `Notes` field is the most underused field in most CRMs. For this system it's critical because:

1. AI Agent conversations and Water Intelligence results are only captured in Notes
2. Product Interest selections may be wrong — Notes contains the raw signal to correct them
3. Objections go in Notes ("çok pahalı", "daire sahibi izin vermiyor") — essential for re-engagement messaging

**Standard note format:**
```
[Kaynak]: [özet]
Ürün: [ne istedi]
Durum: [ne söyledi]
TDS (varsa): [değer]
Takip: [ne yapılmalı]
```

---

## Duplicate Prevention

Before creating a new Airtable record, search by phone number. If a record exists:
- Update `Last Contacted` date
- Add to `Notes` (don't overwrite — append with date)
- Upgrade `Lead Stage` if appropriate
- Never create a second record for the same phone number
