# ROADMAP — Buzsu Growth OS

**Son güncelleme:** 2026-06-30  
**Versiyon:** 1.0

---

## Tamamlanan Fazlar

### Faz 0 — Altyapı Kurulumu ✅
- [x] Airtable CRM şeması (4 tablo: Leads, Products, Campaigns, KPI)
- [x] Lead scoring formula (0–10 puan sistemi)
- [x] Airtable schema belgesi (`airtable-schema.md`)

### Faz 1 — Lead Entry Point Denetimi ✅
- [x] Suvesu.com tüm lead entry point'lerinin kod bazlı analizi
- [x] Buzsu.com.tr repo gerçeklik tespiti (prototype vs production)
- [x] 10 entry point belgelenmiş (`lead-entry-audit.md`)
- [x] Öncelik listesi: P1/P2/P3

### Faz 2 — P1 Fix Hazırlığı ✅
- [x] `api/chat.js` logLead() bug analizi
- [x] mapProductCategory() ve mapIntent() fonksiyon tasarımı
- [x] 31 test case ile chat.test.js yazılması
- [x] `patches/suvesu-site/ai-agent-field-mapping.md` (hazır yama)
- [ ] **BEKLEYEN:** suvesu-site reposuna uygulanması (insan onayı gerekli)

### Faz 3 — Growth OS Migrasyonu ✅
- [x] AtlasOS agent mimarisinin incelenmesi
- [x] Buzsu'ya özel 10 agent tanımı
- [x] Dizin yapısı kurulumu (tasks/drafts/outputs/workflows/agents/docs)
- [x] CLAUDE.md (Buzsu-specific)
- [x] AGENTS.md (Buzsu-specific)
- [x] 10 agent definition dosyası (agents/)
- [x] docs/human-approval.md
- [x] docs/operating-model.md
- [x] docs/ai-commerce-layer.md
- [x] README.md güncelleme
- [x] ROADMAP.md (bu dosya)

---

## Aktif Fazlar

### Faz 4 — P1 Uygulamaları (Suvesu-site) 🔄
**Tahmini süre:** 2–3 saat (insan uygular)

- [ ] `public_html/api/chat.js` — logLead() field mapping fix
  - Patch: `patches/suvesu-site/ai-agent-field-mapping.md`
  - Test: `patches/suvesu-site/chat.test.js`
  - Branch: `fix/ai-agent-airtable-field-mapping`
- [ ] `public_html/contact.php` — Airtable API entegrasyonu
  - Patch: `lead-entry-audit.md` P1 bölümü
  - Branch: `fix/contact-form-airtable`
- [ ] Deployment sonrası Airtable'da test lead kontrolü

**Başarı kriteri:** Suvesu AI agent'tan gelen lead Airtable'da Phone, Source, Product Interest, Lead Stage ve Engagement alanlarıyla görünüyor.

---

### Faz 5 — SEO Temeli 📋
**Öneri:** Faz 4 tamamlandıktan sonra başla

- [ ] Hedef anahtar kelime listesi (seo-agent)
  - "su arıtma", "RO sistemi", "TDS değeri", "su arıtma cihazı fiyat"
  - Hacim, rekabet, intent analizi
- [ ] Suvesu.com mevcut SERP durum tespiti
- [ ] İç bağlantı haritası çıkarma
- [ ] Teknik SEO denetimi (canonical, meta, hız)
- [ ] İlk 3 içerik güncelleme önceliği

**Çıktı:** `drafts/content/seo-brief-Q3-2026.md`

---

### Faz 6 — GEO ve Snippet Optimizasyonu 📋
**Öneri:** Faz 5 paralel veya sonrası

- [ ] "Su arıtma" AI Overview alıntı durumu analizi (geo-agent)
- [ ] PAA fırsatları listesi — top 20 soru (snippet-agent)
- [ ] İlk 3 snippet hedefi için içerik yeniden yapılandırma
- [ ] GEO uyumlu makale şablonu (content-agent)

**Çıktı:** `drafts/content/geo-su-aritma-2026.md`

---

## Planlanan Fazlar

### Faz 7 — Schema ve Rich Results 🗓️
- [ ] Buzsu.com.tr ürün sayfaları için Product schema (schema-agent)
- [ ] Suvesu.com SSS sayfası için FAQ schema
- [ ] Su arıtma kurulum rehberi için HowTo schema
- [ ] LocalBusiness schema (Buzsu.com.tr adres ve iletişim)
- [ ] Google Rich Results Test uyumluluk kontrolü

**Çıktı:** `drafts/schema/*.json` + `drafts/code/schema-*-pr.md`

---

### Faz 8 — E-E-A-T Güçlendirme 🗓️
- [ ] Buzsu.com.tr E-E-A-T denetimi (eeat-agent)
- [ ] Suvesu.com E-E-A-T denetimi
- [ ] "Hakkımızda" sayfası içerik önerileri
- [ ] Garanti ve servis sayfası oluşturma önerisi
- [ ] Trustpilot / Google Reviews kampanyası planı

---

### Faz 9 — Rakip Analizi ve İçerik Boşlukları 🗓️
- [ ] "Su arıtma" nişinde top-10 rakip SERP analizi (competitor-agent)
- [ ] İçerik boşluğu haritası — rakipler var, Suvesu yok
- [ ] İlk 5 içerik boşluğu için brief (content-agent)
- [ ] Rakip schema ve snippet kullanımı karşılaştırması

---

### Faz 10 — AI Commerce Katmanı 🗓️
- [ ] TDS widget → WhatsApp CTA entegrasyonu (cro-agent + commerce-agent)
  - `public_html/assets/tds-widget.js` değişikliği
- [ ] Conversational ürün öneri akışı şablonu
- [ ] commerce-agent + Airtable Products entegrasyonu
- [ ] WhatsApp handoff mesaj şablonları (TDS bandına göre 5 şablon)

---

### Faz 11 — Otomasyon Altyapısı 🗓️
- [ ] n8n iş akışı: Suvesu contact.php → Airtable (automation-agent)
- [ ] n8n iş akışı: Haftalık SERP snapshot (10 anahtar kelime)
- [ ] Airtable: Hot Lead → WhatsApp bildirim senaryosu
- [ ] Aylık KPI raporu otomasyonu

---

### Faz 12 — Buzsu.com.tr Production Bağlantısı 🗓️
**Önkoşul:** Buzsu.com.tr platformu (WordPress?) erişimi

- [ ] Platform tespiti (hosting panel erişimi gerekli)
- [ ] Airtable native form embed — `/iletisim`
- [ ] WhatsApp pre-fill URL güncelleme — tüm ürün sayfaları
- [ ] Product schema ekleme — 5 ürün sayfası

---

## Metrikler

| Metrik | Mevcut | Hedef (Q3 2026) |
|--------|--------|----------------|
| AI agent lead'lerin Airtable kayıt kalitesi | Name+Notes | Tüm alanlar |
| Hot Lead oranı (8+ puan) | ~0% | >15% |
| Featured snippet sayısı | Bilinmiyor | 3+ |
| AI Overview alıntı sayısı | Bilinmiyor | 2+ |
| Suvesu organik tıklama (MoM büyüme) | Baz alınacak | +20% |

---

## Notlar

- Her faz tamamlandığında bu dosya güncellenir.
- `patches/` altındaki yamalar `suvesu-site` reposuna insan tarafından uygulanır.
- Buzsu.com.tr production erişimi olmadan Faz 12 başlatılamaz.
