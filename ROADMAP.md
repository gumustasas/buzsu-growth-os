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

### Faz 4 — Buzsu SEO/GEO/CRO İlk Canlı Uygulama 🔄
**Ana hedef URL:** `https://www.buzsu.com.tr/su-aritma-cihazlari/`  
**Model:** Draft → İnsan Onayı → PR. Canlı siteye otomatik yayın yok.

#### 4.1 — Sayfa Crawl ve Durum Analizi
- [ ] `https://www.buzsu.com.tr/su-aritma-cihazlari/` sayfa içeriği analizi (WebFetch)
  - Mevcut başlık, meta description, H yapısı
  - Sayfa hızı ve Core Web Vitals gözlemi
  - Canonical ve hreflang durumu
- [ ] Çıktı: `tasks/seo/buzsu-suaritma-crawl-<tarih>.md`

#### 4.2 — SERP ve Rakip Analizi
- [ ] Hedef anahtar kelime SERP durumu (seo-agent + competitor-agent)
  - "su arıtma cihazları", "su arıtma cihazı fiyat", "ev su arıtma"
  - Buzsu'nun mevcut sıralaması, rakip top-5 domain
- [ ] Rakip sayfa yapısı karşılaştırması (içerik uzunluğu, CTA modeli)
- [ ] Çıktı: `drafts/content/seo-brief-buzsu-suaritma-<tarih>.md`

#### 4.3 — Schema Kontrolü
- [ ] Mevcut Product/FAQ/Breadcrumb schema durumu (schema-agent)
  - Var mı? Eksik alan var mı? Hata var mı?
- [ ] Eksik schema için JSON-LD taslakları (schema-agent)
- [ ] Çıktı: `drafts/schema/product-buzsu-suaritma-<tarih>.json`
- [ ] PR taslağı: `drafts/code/schema-buzsu-suaritma-pr.md`

#### 4.4 — İç Bağlantı Haritası
- [ ] Mevcut iç bağlantı profili (seo-agent)
  - Hangi sayfalar bu URL'ye bağlıyor? Hangileri bağlamalı?
- [ ] Suvesu.com → Buzsu.com.tr link fırsatları
- [ ] Çıktı: `drafts/content/internal-link-map-<tarih>.md`

#### 4.5 — Snippet Fırsatları
- [ ] "Su arıtma cihazları" ve alt sorguları için snippet analizi (snippet-agent)
  - PAA soruları, top snippet türü (liste/tablo/paragraf)
- [ ] Snippet optimizasyon metin önerileri
- [ ] Çıktı: `drafts/content/snippet-buzsu-suaritma-<tarih>.md`

#### 4.6 — CRO Güven Blokları
- [ ] Mevcut sayfada güven sinyali analizi (cro-agent)
  - Sosyal kanıt (yorum sayısı, referans görseli)
  - Garanti, servis, kurulum bilgisi varlığı
  - Fiyat görünürlüğü ve CTA hiyerarşisi
- [ ] Güven bloğu metin önerileri
- [ ] Çıktı: `drafts/content/cro-trust-buzsu-<tarih>.md`

#### 4.7 — CTA ve WhatsApp Satış Akışı
- [ ] Mevcut CTA ve WhatsApp buton analizi (cro-agent + commerce-agent)
- [ ] Ürün sayfasına özel WhatsApp pre-fill URL önerileri
  - Her ürün kategorisi için ayrı mesaj şablonu
- [ ] Sepet → WhatsApp handoff akışı taslağı
- [ ] Çıktı: `drafts/workflows/wa-handoff-buzsu-suaritma-<tarih>.md`

#### 4.8 — Taslak Öneri Dosyası ve Manuel Onay
- [ ] Tüm 4.1–4.7 bulgularının tek özet dosyasına derlenmesi
- [ ] Çıktı: `drafts/content/buzsu-suaritma-full-brief-<tarih>.md`
- [ ] **İNSAN ONAYI**: Özet dosyası incelendikten sonra

#### 4.9 — PR (Onay Sonrası, İnsan Uygular)
- [ ] Schema PR: `fix/schema-buzsu-su-aritma-cihazlari`
- [ ] CTA/WhatsApp PR: `fix/cta-wa-buzsu-su-aritma`
- [ ] Her PR için: branch oluştur → değişikliği uygula → test et → PR aç

**Başarı kriteri:** `buzsu.com.tr/su-aritma-cihazlari/` sayfasında Product schema aktif, WhatsApp CTA ürüne özel, en az 1 PAA sorusuna yanıt veren içerik bölümü mevcut.

---

### Faz 5 — Buzsu.com.tr Site Geneli SEO Temeli 📋
**Öneri:** Faz 4 tamamlandıktan sonra başla. Odak: Buzsu.com.tr ana domenin tüm kritik sayfaları.

- [ ] Hedef anahtar kelime listesi — Buzsu ürün kategorilerine göre (seo-agent)
  - "su arıtma cihazı", "RO sistemi", "su arıtma cihazı fiyat", "ev su arıtma sistemi"
  - Her anahtar kelime için: hacim, rekabet, intent, mevcut sıralama
- [ ] Buzsu.com.tr kritik sayfaların teknik SEO taraması
  - canonical, meta, H yapısı, hız, mobil uyumluluk
- [ ] İç bağlantı haritası — tüm Buzsu sayfaları arası
- [ ] Suvesu.com → Buzsu.com.tr bağlantı fırsatları (içerik-ürün köprüsü)
- [ ] İlk 3 içerik güncelleme ve 3 yeni içerik önceliği

**Çıktı:** `drafts/content/seo-brief-buzsu-site-Q3-2026.md`

---

### Faz 6 — GEO ve Snippet Optimizasyonu 📋
**Öneri:** Faz 5 paralel veya sonrası. Odak: Buzsu.com.tr ve Suvesu.com AI Overview + Featured Snippet alıntısı.

- [ ] "Su arıtma cihazları" ve "RO sistemi" AI Overview alıntı durumu (geo-agent)
  - Buzsu markalı sorgular AI sonuçlarında görünüyor mu?
- [ ] PAA fırsatları listesi — top 20 soru, Buzsu ürünleriyle ilişkili (snippet-agent)
- [ ] İlk 3 snippet hedefi için Buzsu sayfası içerik yeniden yapılandırma
- [ ] Suvesu.com → GEO: AI Overview alıntısı kazanacak bilgi makalesi önerileri
- [ ] GEO uyumlu Buzsu ürün açıklaması şablonu (content-agent)

**Çıktı:** `drafts/content/geo-buzsu-su-aritma-2026.md`

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
  - Buzsu.com.tr'nin SERP'te kaybettiği konumlar
- [ ] İçerik boşluğu haritası — rakipler var, Buzsu/Suvesu yok
- [ ] İlk 5 içerik boşluğu için Buzsu odaklı brief (content-agent)
- [ ] Rakip schema ve snippet kullanımı karşılaştırması
- [ ] Rakiplerden Buzsu'ya conversion path analizi

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

| Metrik | Platform | Mevcut | Hedef (Q3 2026) |
|--------|----------|--------|----------------|
| AI agent lead'lerin Airtable kayıt kalitesi | Suvesu | Name+Notes | Tüm alanlar |
| Hot Lead oranı (8+ puan) | Airtable | ~0% | >15% |
| Buzsu.com.tr organik tıklama (MoM büyüme) | **Buzsu** | Baz alınacak | +30% |
| Featured snippet sayısı | **Buzsu** | Bilinmiyor | 3+ |
| AI Overview alıntı sayısı | **Buzsu** + Suvesu | Bilinmiyor | 2+ |
| Product schema kapsamı | **Buzsu** | Bilinmiyor | 5 ürün sayfası |
| WhatsApp conversion oranı (lead → satış) | **Buzsu** | Bilinmiyor | Baz alınacak |

---

## Notlar

- **Ana odak Buzsu.com.tr'dir.** Suvesu.com destekleyici içerik otoritesi olarak Buzsu'ya trafik gönderir.
- Her faz tamamlandığında bu dosya güncellenir.
- `patches/` altındaki yamalar `suvesu-site` reposuna insan tarafından uygulanır.
- Buzsu.com.tr production platform erişimi (hosting panel) gerektiren işlemler Faz 4.9'dan önce doğrulanmalıdır.
- **Tüm canlı değişiklikler:** Önce `/drafts/`, insan onayı, ardından branch + PR. Otomatik yayın yok.
