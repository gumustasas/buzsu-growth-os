# Lead Scoring

## Why Simple Rules Beat Complex Models

At <500 leads/month, a machine learning model has no advantage over clear rules. Simple rules are:
- Transparent (salespeople understand and trust them)
- Auditable (you can see why a score changed)
- Fast to change when you learn what actually predicts a sale

## Scoring Model

Implement as an Airtable formula field on the Leads table. Score range: 0–10.

### Signal: Source (max 3 points)

| Source | Points |
|--------|--------|
| Suvesu article referral | 3 |
| Contact form (Buzsu) | 2 |
| WhatsApp inbound | 2 |
| Direct referral from customer | 3 |
| Unknown / cold | 0 |

**Why:** Someone who found you through an educational article is pre-qualified. They already understand the problem.

### Signal: Product Interest (max 3 points)

| Interest | Points |
|----------|--------|
| Su Arıtma Sistemi (full system) | 3 |
| RO Sistemi | 3 |
| Filtre (replacement) | 2 |
| TDS Metre | 1 |
| Genel bilgi (no specific product) | 0 |

**Why:** High-ticket intent = higher score. Someone asking about a full RO system is worth more than someone asking what TDS means.

### Signal: Engagement (max 2 points)

| Action | Points |
|--------|--------|
| Asked specific price question | 2 |
| Mentioned a timeline ("bu ay", "hemen") | 2 |
| Asked about installation | 1 |
| Just browsing / no commitment signal | 0 |

*Note: Only one engagement signal counts — take the highest.*

### Signal: Follow-up Responsiveness (max 2 points)

| Behavior | Points |
|----------|--------|
| Replied within 1 hour | 2 |
| Replied same day | 1 |
| Replied after >24h | 0 |
| No reply | 0 |

## Score Interpretation

| Score | Label | Action |
|-------|-------|--------|
| 8–10 | Hot | Call within 1 hour. Do not wait. |
| 5–7 | Warm | Follow up same day via WhatsApp |
| 2–4 | Cool | Add to weekly re-engagement batch |
| 0–1 | Cold | Archive after 2 follow-up attempts |

## Airtable Formula

```
IF(
  {Source} = "Suvesu Referral", 3,
  IF({Source} = "Referral", 3,
  IF({Source} = "Contact Form", 2,
  IF({Source} = "WhatsApp", 2, 0))))
+
IF(
  OR({Product Interest} = "Su Arıtma", {Product Interest} = "RO Sistemi"), 3,
  IF({Product Interest} = "Filtre", 2,
  IF({Product Interest} = "TDS Metre", 1, 0)))
+
[Engagement points — entered manually or via notes keyword match]
+
[Responsiveness points — entered manually after first contact]
```

*The engagement and responsiveness fields should be single-select fields that map to point values via formula.*

## What This Is NOT

- Not predictive (it doesn't forecast close probability)
- Not automated (someone still has to make the sale)
- Not permanent (revise the weights after 90 days with real data)

## 90-Day Review

After 90 days, pull all Won leads from Airtable and check:
1. What was their average score?
2. Which signals appeared most in Won vs. Lost?
3. Adjust the weights based on what actually correlated with sales.

This is the only time you should touch the scoring model — and only if the data says so.
