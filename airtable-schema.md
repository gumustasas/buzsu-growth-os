# Airtable Schema — Implementation Reference

Base: **SuveSu Logs**
Base ID: `apphVqbUQohAMIoWk`

---

## Table 1: Leads

Table ID: `tblsBQkMOMyi5yc1n`

| Field | Type | Field ID | Notes |
|-------|------|----------|-------|
| Name | singleLineText (primary) | `fldbeBIkPq3zfuIGY` | First name or full name |
| Phone | phoneNumber | `fldyojqHa7d0Rhpxb` | WhatsApp number |
| Source | singleSelect | `fldiI1Rq2A9Rb4F8A` | Where they came from |
| Product Interest | multipleSelects | `fldBMhqojPA7llfju` | What they want to buy |
| Lead Stage | singleSelect | `fldoObCW7edoT5Vgt` | Where they are in the pipeline |
| Engagement | singleSelect | `fld7xUrEpcjUVVUHA` | Strongest buying signal shown |
| Response Speed | singleSelect | `fld8t687Oy3rySSqm` | How fast they replied to you |
| Notes | multilineText | `fld2cEV0lY1pwgpfp` | What they said, objections, context |
| Created Date | date | `fldMZRN2WZZXjMdb4` | When they first contacted |
| Last Contacted | date | `fld9kSuvRowlweNJg` | Update every time you reach out |
| Assigned To | singleLineText | `fldLuGyiidhpmGeKu` | Salesperson name |
| **Score** | formula | `fldxgvO88TPhaOmRt` | 0–10, auto-calculated |
| **Score Label** | formula | `fldGfeRe6feECVzkq` | Hot / Warm / Cool / Cold |

### Source choices
| Name | Meaning |
|------|---------|
| WhatsApp | Wrote to you directly on WhatsApp |
| Contact Form | Submitted the Buzsu.com.tr form |
| Suvesu Referral | Clicked through from a Suvesu.com article |
| Direct | Called or walked in |
| Referral | Referred by an existing customer |

### Product Interest choices
| Name |
|------|
| Su Aritma |
| RO Sistemi |
| Filtre |
| TDS Metre |
| Diger |

### Lead Stage choices
| Stage | Meaning |
|-------|---------|
| New | Just came in, not yet contacted |
| Contacted | You sent first message |
| Qualified | They confirmed interest and budget |
| Proposal Sent | You sent a price or product link |
| Won | Sale closed |
| Lost | They said no or went silent after 3 follow-ups |

### Engagement choices (pick the strongest signal they showed)
| Choice | Score Points |
|--------|-------------|
| Fiyat Sordu | 2 pts — asked for a specific price |
| Zaman Belirtti | 2 pts — mentioned a timeline ("bu ay", "hemen") |
| Kurulum Sordu | 1 pt — asked about installation |
| Genel Bilgi | 0 pts — just browsing |

### Response Speed choices
| Choice | Score Points |
|--------|-------------|
| 1 Saat Icinde | 2 pts — replied within 1 hour |
| Ayni Gun | 1 pt — replied same day |
| 24 Saat+ | 0 pts |
| Cevap Yok | 0 pts — no reply at all |

### Score Formula
```
IF({Source}="Suvesu Referral",3,IF({Source}="Referral",3,IF({Source}="Contact Form",2,IF({Source}="WhatsApp",2,0))))
+
IF(OR(FIND("Su Aritma",{Product Interest})>0,FIND("RO Sistemi",{Product Interest})>0),3,
  IF(FIND("Filtre",{Product Interest})>0,2,
  IF(FIND("TDS Metre",{Product Interest})>0,1,0)))
+
IF(OR({Engagement}="Fiyat Sordu",{Engagement}="Zaman Belirtti"),2,IF({Engagement}="Kurulum Sordu",1,0))
+
IF({Response Speed}="1 Saat Icinde",2,IF({Response Speed}="Ayni Gun",1,0))
```

**Max score: 10. Score range → action:**
- 8–10: Hot — call within 1 hour
- 5–7: Warm — follow up same day
- 2–4: Cool — add to weekly re-engagement batch
- 0–1: Cold — archive after 2 attempts

### Recommended Views to Create Manually

**Hot Leads** — Filter: Score Label = "Hot", Lead Stage is not Won/Lost
**Follow-Up Today** — Filter: Last Contacted < 3 days ago, Lead Stage ≠ Won/Lost
**This Week's Wins** — Filter: Lead Stage = Won, Created Date = this week

---

## Table 2: Products

Table ID: `tbldogYQwAQr24UWE`

| Field | Type | Field ID |
|-------|------|----------|
| Product Name | singleLineText (primary) | `fldXLw08VVVF8Aquz` |
| Category | singleSelect | `fldLXUPLXEO2HHFK9` |
| Price TRY | currency (₺) | `fldEds5Vy1frHlw3e` |
| Buzsu URL | url | `fldOZXnwqNzgddMxj` |
| Suvesu Article | url | `fldtwQlkCIWyljJdW` |
| Active | checkbox | `fldOjYbJvwIvEMPNs` |
| Notes | multilineText | `fldmnDYpfEoJX5P0Y` |

**Pre-seeded products:**
- 5 Asamali RO Su Aritma Sistemi — ₺3,500
- 7 Asamali RO Su Aritma Sistemi — ₺5,200
- Dijital TDS Metre — ₺150
- Yillik Filtre Seti (5'li) — ₺850
- Musluk Ustu Su Aritma — ₺1,200

Add Buzsu URLs and Suvesu Article links to each product manually. Takes 15 minutes.

---

## Table 3: Campaigns

Table ID: `tblNBJZIfdIbI4lNe`

| Field | Type | Field ID |
|-------|------|----------|
| Campaign Name | singleLineText (primary) | `fldIUmc74pF3xvorQ` |
| Type | singleSelect | `fldWqNxX6JfqU4vl4` |
| Status | singleSelect | `fldrosqvCHvbmX8mo` |
| Send Date | date | `fld1ppZ6dIY8v8dzO` |
| Target Segment | singleLineText | `fldeJeeLoLqNdKBQs` |
| Message Template | multilineText | `flduGLDjqFezvPrhx` |
| Leads Contacted | number | `fldkbTw0j8zVameth` |
| Replies Received | number | `fldXH4PZt3MGke2F5` |
| Sales Generated | number | `fldTtpCZWfxPC8GTj` |
| **Reply Rate %** | formula | `fldcHgDx3bctXwFu7` |

### Reply Rate % Formula
```
IF({Leads Contacted}>0, ROUND(({Replies Received}/{Leads Contacted})*100, 1), 0)
```

---

## Table 4: Weekly KPIs

Table ID: `tblaKmlTJvNeHJC6L`

| Field | Type | Field ID |
|-------|------|----------|
| Week Of | date (primary, ISO) | `fldbDDipSAsbD1MUB` |
| New Leads | number | `fld488TDb50pE2bzq` |
| Leads Contacted | number | `fld8TINqdv0VcasjL` |
| Leads Won | number | `fld4bh1FR2dZDuNqC` |
| Revenue TRY | currency (₺) | `fldQiSlosRCsDtyXN` |
| Top Lead Source | singleSelect | `fldGUpeLJjYNU6Tsr` |
| Suvesu Sessions | number | `fldcrRHgjMtU5Pcc6` |
| Buzsu Sessions | number | `fld2qMA9XZSkT3oBk` |
| Top Ranking Query | singleLineText | `fldwy7H4OVe2GaDTc` |
| Notes | multilineText | `fldK6fCts0o50ZYsR` |
| **Conversion Rate %** | formula | `fldGEb6gM4DalHVtZ` |

### Conversion Rate % Formula
```
IF({New Leads}>0, ROUND(({Leads Won}/{New Leads})*100, 1), 0)
```

**Weekly fill-in ritual (Monday, 10 minutes):**
1. Create a new record for the current week
2. Fill in numbers from WhatsApp Business + Google Analytics
3. Note what worked in the Notes field
4. Review Hot Leads view and assign follow-ups

---

## What Was Deliberately Left Out

| Skipped | Why |
|---------|-----|
| Linked records between tables | Unnecessary complexity at <500 leads/month |
| Email field on Leads | Turkish market uses WhatsApp; email is secondary |
| Automated Zapier/Make flows | Manual entry is faster to start; add automation when volume demands it |
| 5th table | No use case yet |
