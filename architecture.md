# Buzsu Growth OS — Architecture

## What This System Does

Converts website visitors into paying customers with minimal paid advertising, using SEO authority from Suvesu.com and WhatsApp as the primary sales channel.

## Two-Site Strategy

```
Suvesu.com (educates) ──► Buzsu.com.tr (sells)
     │                          │
     └── Water quality content  └── Product pages, offers
     └── TDS / RO guides        └── WhatsApp CTA
     └── Builds trust           └── Closes sales
```

**Why this matters:** Buzsu sells products people research before buying. Suvesu provides the research content. Internal links and brand mentions move warm readers to the sales site.

## System Map

```
TRAFFIC SOURCES
├── Google Search (organic via Suvesu SEO)
├── Direct / Return visitors
└── WhatsApp referrals

        ↓

CAPTURE (Airtable CRM)
├── Contact form submissions
├── WhatsApp inbound messages
└── "Ask a question" CTAs from Suvesu

        ↓

QUALIFY (Lead Scoring)
├── Product interest signals
├── Buying intent keywords
└── Engagement depth

        ↓

CONVERT (WhatsApp Sales Agent)
├── Respond within 5 minutes
├── Send relevant product links
└── Handle objections with Suvesu content

        ↓

MEASURE (KPI Dashboard in Airtable)
├── Google Analytics (traffic)
├── Google Search Console (rankings)
└── Airtable (leads, conversion)
```

## Tools and Their Single Job

| Tool | One Job |
|------|---------|
| Airtable | CRM — track every lead from first touch to sale |
| Google Search Console | Find which queries drive traffic, find ranking gaps |
| Google Analytics | Understand which pages convert, where visitors drop off |
| WhatsApp | Primary sales conversation channel |
| Claude Code | Automate content creation, scoring, reporting |
| GitHub | Version control for all system logic and content templates |

## What This Is NOT

- Not a marketing automation platform
- Not an email drip system (WhatsApp works better in Turkey)
- Not a complex scoring algorithm
- Not an enterprise CRM

## Data Flow (Single Source of Truth)

All lead data lives in Airtable. Every system writes to or reads from it.

```
WhatsApp message received
        ↓
Record created in Airtable (Leads table)
        ↓
Score calculated (simple rules, not ML)
        ↓
Sales person notified if score ≥ 7
        ↓
Outcome recorded (Won / Lost / Follow-up)
        ↓
KPI dashboard updates automatically
```

## Assumptions Challenged

| Common Assumption | Reality Check |
|-------------------|---------------|
| Need email marketing | Turkish buyers prefer WhatsApp; skip email for now |
| Need complex CRM | Airtable with 4 tables is enough for <500 leads/month |
| Need paid ads | SEO + WhatsApp can drive meaningful revenue first |
| Need a mobile app | WhatsApp Business handles mobile sales natively |
| Need ML lead scoring | Simple point rules outperform ML when data is thin |
