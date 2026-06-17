# First Live Lead — Step by Step

## Goal

One real lead record appears automatically in the Airtable Leads table.

Time required: 45 minutes.
Tools required: Airtable (already set up), a browser, a phone to test.

---

## Part 1: Create the Form (10 minutes)

### In Airtable:

1. Go to: `airtable.com` → open **SuveSu Logs** base → click **Leads** table

2. In the left sidebar under Views, click **+** → select **Form**

3. Name the form: `Buzsu İletişim Formu`

4. The form editor opens. Configure each field:

**Fields to SHOW on the form:**

| Field | Form Label | Required | Helper Text |
|-------|-----------|----------|-------------|
| Name | Adınız Soyadınız | Yes | — |
| Phone | Telefon Numaranız | Yes | WhatsApp numaranız olsun, hızlı iletişim için |
| Product Interest | Neyle ilgileniyorsunuz? | Yes | — |
| Notes | Mesajınız (opsiyonel) | No | Bize ne sormak istediğinizi kısaca yazabilirsiniz |

**Fields to HIDE from the form but set as defaults:**

Click the field → toggle "Include in form" OFF → the field will still be set when submitting.

| Field | Default Value |
|-------|--------------|
| Source | Contact Form |
| Lead Stage | New |

5. At the top of the form builder, set:
   - **Title:** "Bizimle İletişime Geçin"
   - **Description:** "En kısa sürede WhatsApp üzerinden size ulaşacağız."
   - **Submit button text:** "Gönder"
   - **After submission message:** "Teşekkürler! En kısa sürede size ulaşacağız."

6. Click **Share form** → copy the URL. It looks like:
   `https://airtable.com/shrXXXXXXXXXXXXXX`

---

## Part 2: Test It Yourself (5 minutes)

Before putting this anywhere on the site, verify it works.

1. Open the form URL in your phone browser (not your computer — test the mobile experience)

2. Fill in fake data:
   - Name: Test Kullanıcı
   - Phone: 05001234567
   - Product Interest: Su Aritma
   - Notes: Bu bir test kaydıdır

3. Submit the form

4. Open Airtable on your computer → Leads table → All Records view

**You should see a new record appear with:**
- Name: Test Kullanıcı
- Source: Contact Form
- Lead Stage: New
- Score: 2 (Source = Contact Form gives 2pts; no engagement set yet)
- Score Label: Cool

If this record is there: the system works. Delete the test record and move to Part 3.

If it's not there: check that you clicked "Share form" and used the share URL, not the edit URL.

---

## Part 3: Put It Live on Buzsu.com.tr (30 minutes)

Choose whichever option requires the least effort given your site setup:

### Option A: Button link (zero developer, works today)

Go to the WordPress/site admin → find the /iletisim page → add a button with:
- Text: `Teklif Al` or `Formu Doldur`
- Link: [your Airtable form share URL]
- Target: new tab

This is enough. The existing phone/WhatsApp info stays on the page. The button gives visitors a form that captures into Airtable.

### Option B: Embed the form on the page

Paste this into the page HTML editor (not the visual editor):

```html
<iframe
  class="airtable-embed"
  src="https://airtable.com/embed/[YOUR_FORM_ID]"
  frameborder="0"
  onmousewheel=""
  width="100%"
  height="533"
  style="background: transparent; border: 1px solid #ccc;">
</iframe>
```

Replace `[YOUR_FORM_ID]` with the ID from your share URL (the `shr...` part).

The form renders inline on the page. Looks like part of the site.

---

## Part 4: Get the First Real Lead (the actual moment)

Once the form is live:

1. Ask one person — a friend, family member, past customer, or yourself on a different device — to fill out the form as if they were a real customer.

2. Use a real phone number (theirs or a second number you have).

3. Watch the Airtable Leads table. The record will appear within 5 seconds of form submission.

4. That is the first live lead. The system is working.

---

## What Happens After the Record Appears

The record will have:
- Name, Phone, Product Interest, Notes — from what they typed
- Source = Contact Form — auto-set
- Lead Stage = New — auto-set
- Score = 2–5pts — calculated automatically
- Score Label = Cool or Warm — calculated automatically

Your next action:
1. Open the record
2. Call or WhatsApp the number within 5 minutes
3. After they reply, update `Response Speed` and `Engagement`
4. Watch the Score jump to 4–8pts

The first real lead in Airtable validates the entire Phase 2 setup.

---

## For Suvesu (Same Process, One Change)

Repeat Part 1 with these differences:
- Form name: `Suvesu İletişim Formu`
- Title: "Su Kalitesi Hakkında Soru Sorun"
- Description: "Su analiziniz veya sisteminiz hakkında sorularınızı iletin."
- Source default: `Suvesu Referral` (not Contact Form)

Add the form share URL to:
- Suvesu.com contact page
- End of every AI Agent conversation
- Below Water Intelligence tool results

Each Suvesu form submission = a `Suvesu Referral` lead with a starting score of 3pts (higher than a Buzsu form at 2pts).

---

## If You Want to Go Faster: Tally.so

If the Airtable form URL looks too generic or you want a branded domain, use Tally.so instead.

1. Create free account at tally.so
2. Build the same 4 fields in Tally's editor (2 minutes)
3. Go to Integrations → Airtable → connect your base → map fields to Leads table
4. Publish. You get a URL like `tally.so/r/XXXXXX`

The submission goes directly into Airtable. Same result, slightly better form UX.

---

## Checklist

- [ ] Airtable Form created with 4 visible fields and 2 auto-defaults
- [ ] Form tested with fake submission — record appeared in Leads table
- [ ] Test record deleted
- [ ] Form URL (or embed) added to Buzsu.com.tr /iletisim page
- [ ] One real person submitted the form
- [ ] Their record is in Airtable Leads table
- [ ] Score formula fired correctly
- [ ] Salesperson followed up within 5 minutes

When all 8 boxes are checked, Phase 2.3 is complete.
