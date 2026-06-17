# KPI Dashboard

## Design Principle

Six metrics. Weekly review. 30 minutes maximum. No dashboard should require an analyst.

If you're spending more than 30 minutes on reporting, the dashboard is too complex.

## The Six Metrics

These six numbers tell you everything you need to know each week.

### 1. New Leads

**Definition:** People who contacted Buzsu this week via any channel.
**Source:** Airtable Leads table — count of records created this week.
**Target:** Growing week-over-week.
**Warning sign:** Zero new leads two weeks in a row = something broke.

---

### 2. Conversations Started

**Definition:** New leads who received a WhatsApp reply from you.
**Source:** Airtable — count of leads where Last Contacted = this week.
**Target:** >90% of new leads contacted within 24h.
**Warning sign:** Gap between New Leads and Conversations Started > 20%.

---

### 3. Conversion Rate

**Definition:** Leads Won this week ÷ New Leads this week.
**Source:** Weekly KPIs table — `Leads Won / New Leads` (auto-calculated by the Conversion Rate % formula field).
**Target:** >20% at steady state.
**Warning sign:** Dropping below 15% two weeks in a row. A result above 100% means backlog deals are closing faster than new leads are arriving — a good sign, not an error.
**Why this definition:** The Weekly KPIs table is a manual per-week snapshot. "Total Active Leads" is a live pipeline count that changes daily and can't be reliably captured in a weekly row. For a business with 1–7 day sales cycles, wins-this-week ÷ new-leads-this-week is the most actionable and consistent signal available.

---

### 4. Revenue This Week (TRY)

**Definition:** Total value of Won deals created this week.
**Source:** Airtable — Sum of deal values in Won stage, this week.
**Target:** Set your own weekly revenue goal here.
**Warning sign:** Zero for 2+ consecutive weeks.

---

### 5. Top Lead Source

**Definition:** Which channel sent the most new leads this week.
**Source:** Airtable — Group leads by Source field.
**Target:** Suvesu Referral growing as a percentage over time.
**Warning sign:** 100% from one source = fragile. Diversify over time.

---

### 6. Suvesu Organic Sessions

**Definition:** Total sessions to Suvesu.com from organic search.
**Source:** Google Analytics, checked manually weekly.
**Target:** Growing month-over-month after month 2.
**Warning sign:** Flat or declining after 3 months of content publishing.

---

## Dashboard in Airtable

Build this as an Airtable Interface (not a complex custom dashboard).

**Interface layout:**
- Summary block: 6 metric numbers (current week vs. last week)
- `Hot Leads` view embedded: score ≥ 7, action needed
- `Follow-Up Today` view embedded: overdue contacts
- `This Week's Wins` view embedded: closed deals

Takes 2 hours to build. Requires no coding.

---

## Weekly Review Ritual (30 minutes, every Monday)

| Minute | Action |
|--------|--------|
| 0–5 | Open Airtable dashboard. Fill in the Weekly KPIs record. |
| 5–10 | Open Google Analytics. Note Suvesu sessions. Note Buzsu sessions. |
| 10–15 | Open Search Console. Note top 3 queries by clicks this week. Any page moved up? |
| 15–25 | Review `Hot Leads` view. Assign follow-up to each. |
| 25–30 | Decide: What is the ONE thing to do this week to improve revenue? Write it down. |

---

## Metrics Deliberately Excluded

| Metric | Why Excluded |
|--------|--------------|
| Social media followers | Vanity metric; doesn't predict sales |
| Email open rates | Not using email yet |
| Ad spend / ROAS | Not running paid ads yet |
| Bounce rate | Misleading without context; not actionable at this stage |
| Customer Lifetime Value | Too few customers to calculate meaningfully |
| NPS score | Premature; collect after 50+ sales |

---

## When to Add More Metrics

Add a metric only when:
1. You have a specific decision that the metric would inform
2. You can collect it without building a new integration

"It would be nice to know" is not a good reason to add a metric.

---

## 90-Day Benchmark

After 90 days, use this data to answer three questions:

1. Which lead source produces the highest conversion rate?
2. What is the average time from first contact to sale?
3. Which product drives the most revenue?

These answers should inform where you invest in months 4–6.

## Business Value
A weekly review that takes 30 minutes will catch problems early and surface what's actually working. Most businesses have no idea which channel drives their sales.

## Implementation Cost
2 hours setup. 30 minutes/week ongoing.

## Expected Impact
Within 60 days, you'll know which channel and which products to double down on.

## Priority Score
7/10 — Important, but only useful once leads are flowing. Build after Phase 1 and 2.
