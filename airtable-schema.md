# Airtable Schema

## Design Principle

Four tables. No more. If you can't fit a use case into these four tables, the use case is probably premature.

---

## Table 1: Leads

The core table. Every person who has shown any interest lives here.

| Field | Type | Notes |
|-------|------|-------|
| Name | Single line text | First + last or just first |
| Phone | Phone number | Primary identifier; WhatsApp number |
| Source | Single select | `WhatsApp`, `Contact Form`, `Suvesu Referral`, `Direct`, `Referral` |
| Product Interest | Multiple select | `Su Arıtma`, `TDS Metre`, `Filtre`, `RO Sistemi`, `Diğer` |
| Lead Stage | Single select | `New`, `Contacted`, `Qualified`, `Proposal Sent`, `Won`, `Lost` |
| Score | Formula | Auto-calculated (see lead-scoring.md) |
| Notes | Long text | Sales notes, objections, what they said |
| Created | Date | Auto |
| Last Contacted | Date | Updated manually each time |
| Assigned To | Single line text | Salesperson name |

**Views to create:**
- `Hot Leads` — Score ≥ 7, Stage = New or Contacted
- `Follow-Up Today` — Last Contacted > 3 days ago, Stage ≠ Won/Lost
- `This Week's Wins` — Stage = Won, Created this week

---

## Table 2: Products

Simple product reference. Not a full inventory system.

| Field | Type | Notes |
|-------|------|-------|
| Product Name | Single line text | |
| Category | Single select | `Su Arıtma`, `TDS Metre`, `Filtre`, `Aksesuar` |
| Price (TRY) | Currency | Current price |
| Buzsu URL | URL | Direct link to product page |
| Suvesu Article | URL | Related educational content on Suvesu |
| Active | Checkbox | Uncheck to hide without deleting |
| Notes | Long text | Common objections, selling points |

**Why this exists:** Sales team can quickly grab product URLs during WhatsApp conversations without leaving Airtable.

---

## Table 3: Campaigns

Track each outreach push — seasonal, re-engagement, new product announcements.

| Field | Type | Notes |
|-------|------|-------|
| Campaign Name | Single line text | e.g., "Yaz Kampanyası 2025" |
| Type | Single select | `WhatsApp Broadcast`, `Seasonal`, `Re-engagement`, `New Product` |
| Status | Single select | `Draft`, `Sent`, `Completed` |
| Send Date | Date | |
| Target Segment | Single line text | e.g., "Contacted + No Response 30d" |
| Message Template | Long text | The actual message sent |
| Leads Contacted | Number | How many people received it |
| Replies Received | Number | How many replied |
| Sales Generated | Number | Direct revenue from campaign |
| Reply Rate | Formula | `{Replies Received} / {Leads Contacted}` |

---

## Table 4: Weekly KPIs

Manual weekly snapshot. Takes 10 minutes to fill out.

| Field | Type | Notes |
|-------|------|-------|
| Week Of | Date | Monday of the week |
| New Leads | Number | From all sources |
| Leads Contacted | Number | |
| Conversion Rate | Percent | Won / Total Active |
| Revenue (TRY) | Currency | Sales closed this week |
| Top Lead Source | Single select | `WhatsApp`, `Suvesu`, `Direct`, `Form` |
| Suvesu Sessions | Number | From Google Analytics |
| Buzsu Sessions | Number | From Google Analytics |
| Top Ranking Query | Single line text | Biggest keyword win this week |
| Notes | Long text | What worked, what didn't |

---

## Linking Strategy

- Leads ↔ Products: Use `Product Interest` field (multi-select) — no linked records needed at this volume
- Campaigns → Leads: Track in Campaign `Target Segment` as text — no complex automation yet
- KPIs: Manually filled; no automation required

## When to Add Tables

Only add a 5th table if:
- You have >500 leads per month and need advanced segmentation
- You hire a second salesperson and need territory management
- You add a second product category that requires separate tracking

**Resist the urge to add tables sooner.**
