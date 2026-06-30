# TASK-001 — Buzsu.com.tr /su-aritma-cihazlari/ Sayfa Denetimi

**Tarih:** 2026-06-30  
**Faz:** Faz 4 — Buzsu SEO/GEO/CRO İlk Canlı Uygulama  
**Durum:** Başlatıldı  
**Öncelik:** P1  
**Atanan agent'lar:** seo-agent, geo-agent, snippet-agent, schema-agent, cro-agent, commerce-agent  
**Çıktı dosyası:** `outputs/reports/buzsu-su-aritma-cihazlari-audit-report.md`

---

## Amaç

Buzsu.com.tr'nin ana ürün kategori sayfasını (`/su-aritma-cihazlari/`) SEO, GEO, Schema, İç Bağlantı, Snippet, CRO ve WhatsApp satış akışı açısından kapsamlı biçimde denetlemek. Bulgulara göre öncelikli aksiyon listesi oluşturmak. Tüm değişiklikler önce `/drafts/` altında taslak olarak hazırlanacak; insan onayı sonrası ilgili patch dosyaları uygulanacak.

---

## Hedef URL

```
https://www.buzsu.com.tr/su-aritma-cihazlari/
```

Alt sayfalar (Airtable Products tablosu doğrulayacak):
- `/su-aritma-cihazlari/5-asamali-ro-sistemi/` (varsa)
- `/su-aritma-cihazlari/7-asamali-ro-sistemi/` (varsa)
- `/su-aritma-cihazlari/musluk-ustu/` (varsa)
- `/su-aritma-cihazlari/filtre-seti/` (varsa)
- `/su-aritma-cihazlari/tds-metre/` (varsa)

---

## Başarı Metrikleri

Denetim sonunda şu sorular yanıtlanmış olmalı:

| Metrik | Hedef | Ölçüm Yöntemi |
|--------|-------|--------------|
| Teknik SEO puanı | Kritik sorun yok | Manuel kontrol listesi |
| Product schema varlığı | Tüm ürün sayfalarında | Google Rich Results Test |
| BreadcrumbList schema | Var ve hatasız | Google Rich Results Test |
| FAQ schema | En az 3 soru-cevap | Sayfa kaynak kodu |
| Featured snippet fırsatı | En az 2 sorgu için şans var | Serper analizi |
| AI Overview görünürlüğü | Var / yok tespiti yapıldı | Serper AI snippet |
| İç bağlantı: kategori → ürün | Tüm 5 ürüne bağlantı | Manuel kontrol |
| WhatsApp CTA | Her ürüne özel pre-fill | URL incelemesi |
| Güven bloğu | Garanti + kurulum visible above fold | Görsel inceleme |

---

## Crawl Kontrol Listesi

WebFetch ile `https://www.buzsu.com.tr/su-aritma-cihazlari/` adresini analiz et.

### Teknik Kontroller

- [ ] **Sayfa başlığı (title tag)**
  - Hedef anahtar kelime içeriyor mu?
  - 50–60 karakter aralığında mı?
  - Marka ismi var mı?

- [ ] **Meta description**
  - 140–160 karakter aralığında mı?
  - Kullanıcı için CTA içeriyor mu? (ör. "inceleyin", "keşfedin")

- [ ] **H1 başlığı**
  - Tek H1 var mı?
  - Anahtar kelime içeriyor mu?

- [ ] **H2/H3 yapısı**
  - Anlamlı bir hiyerarşi var mı?
  - Ürün isimleri H2 veya H3'te mi?

- [ ] **Canonical tag**
  - Kendi URL'sini gösteriyor mu?
  - Self-canonical: `<link rel="canonical" href="https://www.buzsu.com.tr/su-aritma-cihazlari/">`

- [ ] **Robots tag**
  - `noindex` veya `nofollow` yok mu?

- [ ] **Hreflang**
  - Türkçe `tr` veya `tr-TR` tanımlı mı?

- [ ] **Open Graph / Social meta**
  - `og:title`, `og:description`, `og:image` var mı?

- [ ] **Sayfa hızı (gözlemsel)**
  - LCP görseli önden yükleniyor mu? (`loading="lazy"` hatalı kullanım)
  - Görsel format: WebP mi, JPEG mi?

- [ ] **Mobil uyumluluk**
  - Viewport meta tag var mı?
  - Butonlar tıklanabilir boyutta mı?

---

## SERP / Rakip Analiz Şablonu

Serper ile aşağıdaki sorguları çalıştır.

### Hedef Sorgular

| Sorgu | Mevcut Buzsu Sırası | Top-3 Rakip | Snippet Türü | PAA Var mı? |
|-------|-------------------|-------------|-------------|------------|
| `su arıtma cihazları` | — | — | — | — |
| `su arıtma cihazı fiyat` | — | — | — | — |
| `ev su arıtma sistemi` | — | — | — | — |
| `su arıtma cihazı tavsiye` | — | — | — | — |
| `ro sistemi fiyat` | — | — | — | — |
| `su arıtma cihazı nasıl seçilir` | — | — | — | — |

### Rakip Profili (Top-3 için doldur)

| Rakip Domain | Snippet | Schema Kullanımı | İçerik Uzunluğu | CTA Modeli |
|-------------|---------|-----------------|----------------|-----------|
| — | — | — | — | — |
| — | — | — | — | — |
| — | — | — | — | — |

---

## Schema Kontrol Listesi

Sayfa kaynak kodunda aşağıdaki yapılandırılmış verileri kontrol et.

### Product Schema

- [ ] `<script type="application/ld+json">` bloku var mı?
- [ ] `@type: "Product"` tanımlı mı?
- [ ] `name` alanı dolu mu?
- [ ] `description` alanı dolu mu?
- [ ] `brand.name` → `"Buzsu"` mi?
- [ ] `offers.priceCurrency` → `"TRY"` mi?
- [ ] `offers.price` dolu mu?
- [ ] `offers.availability` tanımlı mı?

### BreadcrumbList Schema

- [ ] `@type: "BreadcrumbList"` var mı?
- [ ] Ana sayfa → Kategori → Ürün zinciri doğru mu?
- [ ] URL'ler canonical URL'lerle eşleşiyor mu?

### FAQ Schema

- [ ] `@type: "FAQPage"` var mı?
- [ ] En az 3 `Question` / `Answer` çifti var mı?
- [ ] Sorular gerçek PAA sorgularıyla örtüşüyor mu?

### Mevcut Schema Durumu

| Schema Türü | Var mı? | Hata | Öncelik |
|------------|---------|------|---------|
| Product | — | — | — |
| BreadcrumbList | — | — | — |
| FAQ | — | — | — |
| LocalBusiness | — | — | — |
| HowTo | — | — | — |

Uygulama: `patches/buzsu-site/product-schema-v2.md`

---

## İç Link Kontrolü

### Gelen Bağlantılar (Bu sayfaya kim link veriyor?)

- [ ] Ana sayfa (`/`) → `/su-aritma-cihazlari/` linki var mı?
- [ ] Navigasyon menüsü bu URL'yi içeriyor mu?
- [ ] Diğer ürün sayfaları bu kategoriye bağlıyor mu?
- [ ] Suvesu.com'dan gelen link var mı? (WebFetch kontrol)

### Çıkan Bağlantılar (Bu sayfa kimle link veriyor?)

- [ ] 5 ürün sayfasına (varsa) doğrudan bağlantı var mı?
- [ ] Her ürüne anlamlı anchor text kullanılmış mı?
- [ ] "Hakkımızda", "İletişim", "Servis" sayfalarına bağlantı var mı?

### Fırsat Haritası

| Kaynak | Hedef | Önerilen Anchor Text | Mevcut mi? |
|--------|-------|---------------------|-----------|
| `/` (Ana sayfa) | `/su-aritma-cihazlari/` | "Su Arıtma Cihazları" | — |
| `/su-aritma-cihazlari/` | `/su-aritma-cihazlari/ro-sistemi/` | "5 Aşamalı RO Sistemi" | — |
| `suvesu.com/blog/tds-nedir.html` | `/su-aritma-cihazlari/` | "su arıtma cihazı satın al" | — |

Uygulama: `patches/buzsu-site/internal-linking.md`

---

## Featured Snippet Fırsatları

snippet-agent çalıştır; aşağıdaki tabloyu doldur.

### Snippet Fırsat Değerlendirmesi

| Sorgu | Mevcut Snippet Sahibi | Snippet Türü | Buzsu'da İçerik Var mı? | Kazanma Şansı |
|-------|----------------------|-------------|------------------------|--------------|
| `su arıtma cihazı nasıl seçilir` | — | — | — | — |
| `tds değeri kaç olmalı` | — | — | — | — |
| `ro sistemi ne işe yarar` | — | — | — | — |
| `su arıtma cihazı kurulumu kaç saat sürer` | — | — | — | — |

### Eylem

- [ ] En yüksek şanslı sorgu için içerik taslağı hazırla → `drafts/content/snippet-buzsu-<sorgu>-<tarih>.md`
- Uygulama: `patches/buzsu-site/geo-ai-overview.md` (FAQ schema bölümü)

---

## GEO / AI Overview Görünürlük Kontrolü

geo-agent çalıştır; aşağıdaki kontrolleri yap.

### AI Overview Kontrol

| Sorgu | AI Overview Var mı? | Buzsu Alıntılanıyor mu? | Rakip Alıntı Kaynakları |
|-------|---------------------|------------------------|------------------------|
| `su arıtma cihazı` | — | — | — |
| `ro sistemi nedir` | — | — | — |
| `ev suyu arıtma` | — | — | — |
| `Buzsu su arıtma` (markalı) | — | — | — |

### GEO Uygunluk Kontrolü (Mevcut Sayfa İçin)

- [ ] İlk paragrafta sorguya doğrudan yanıt var mı?
- [ ] Tanım kutusu formatı (definition box) kullanılmış mı?
- [ ] Liste veya tablo yapısı var mı?
- [ ] Tarih/güncelleme sinyali var mı?
- [ ] Kaynak atıfı (uzman, belge) var mı?

### Eylem

- [ ] GEO uyumlu giriş bölümü taslağı → `drafts/content/geo-buzsu-su-aritma-<tarih>.md`
- Uygulama: `patches/buzsu-site/geo-ai-overview.md`

---

## CRO Güven Blokları

cro-agent çalıştır; mevcut sayfa üzerinde kontrol et.

### Güven Sinyalleri Envanteri

| Sinyal | Var mı? | Konumu | Öncelik |
|--------|---------|--------|---------|
| Garanti bilgisi (kaç yıl) | — | — | P1 |
| Ücretsiz kurulum bilgisi | — | — | P1 |
| Kargo bilgisi | — | — | P1 |
| Müşteri yorum sayısı / yıldız puanı | — | — | P1 |
| Referans fotoğrafı / video | — | — | P2 |
| Sertifika / belge görseli | — | — | P2 |
| Servis bilgisi (periyodik bakım) | — | — | P2 |
| Fiziksel adres / telefon | — | — | P2 |

### CTA Hiyerarşisi

- [ ] Birincil CTA nedir? (Sepete Ekle / WhatsApp / Telefon)
- [ ] WhatsApp butonu fold üstünde mi?
- [ ] Mobilde sticky WA butonu var mı?
- [ ] CTA buton rengi dikkat çekiyor mu?

### Eylem

- [ ] Güven bloğu ve CTA hiyerarşisi taslağı → `drafts/content/cro-trust-buzsu-<tarih>.md`
- Uygulama: `patches/buzsu-site/cro-product-page.md`

---

## WhatsApp Satış Akışı

commerce-agent çalıştır; mevcut WA butonlarını incele.

### Mevcut WA Durum Kontrolü

| Sayfa | WA Butonu Var mı? | Mevcut Mesaj | Pre-fill Özel mi? |
|-------|------------------|--------------|------------------|
| `/su-aritma-cihazlari/` | — | — | — |
| `/su-aritma-cihazlari/ro-sistemi/` | — | — | — |
| `/su-aritma-cihazlari/7-asamali-ro/` | — | — | — |
| `/su-aritma-cihazlari/filtre-seti/` | — | — | — |
| `/su-aritma-cihazlari/tds-metre/` | — | — | — |

### Önerilen Pre-fill URL'ler

(Uygulama adımları için: `patches/buzsu-site/whatsapp-sales.md`)

- [ ] Kategori sayfası için mesaj şablonu hazır
- [ ] Her ürün sayfası için ayrı mesaj şablonu hazır
- [ ] TDS widget → WA entegrasyon şablonu hazır

### Eylem

- [ ] WA satış akışı taslağı → `drafts/workflows/wa-handoff-buzsu-<tarih>.md`
- Uygulama: `patches/buzsu-site/whatsapp-sales.md`

---

## Kullanılacak Patch Dosyaları

| Patch | Kapsam | Durum |
|-------|--------|-------|
| `patches/buzsu-site/product-schema-v2.md` | Product + BreadcrumbList schema | Bekliyor |
| `patches/buzsu-site/internal-linking.md` | İç bağlantı haritası | Bekliyor |
| `patches/buzsu-site/cro-product-page.md` | CRO güven blokları + CTA | Bekliyor |
| `patches/buzsu-site/geo-ai-overview.md` | GEO içerik + FAQ schema | Bekliyor |
| `patches/buzsu-site/whatsapp-sales.md` | WhatsApp pre-fill satış akışı | Bekliyor |

Her patch için uygulama akışı:
1. Denetim bulgusuyla patch içeriğini karşılaştır
2. Gerekli özelleştirmeyi `drafts/code/<patch-adi>-custom.md` altına yaz
3. İnsan onayı al
4. Branch aç → uygula → PR

---

## Çıktı Klasörü

| Dosya Türü | Konum |
|-----------|-------|
| Bu görev dosyası | `tasks/seo/task-001-buzsu-su-aritma-cihazlari-audit.md` |
| Denetim raporu | `outputs/reports/buzsu-su-aritma-cihazlari-audit-report.md` |
| SEO brief taslağı | `drafts/content/seo-brief-buzsu-suaritma-<tarih>.md` |
| GEO içerik taslağı | `drafts/content/geo-buzsu-su-aritma-<tarih>.md` |
| Snippet taslağı | `drafts/content/snippet-buzsu-suaritma-<tarih>.md` |
| CRO taslağı | `drafts/content/cro-trust-buzsu-<tarih>.md` |
| WA akışı taslağı | `drafts/workflows/wa-handoff-buzsu-<tarih>.md` |
| Schema JSON | `drafts/schema/product-buzsu-suaritma-<tarih>.json` |
| Schema PR taslağı | `drafts/code/schema-buzsu-suaritma-pr.md` |

---

## İnsan Onayı Kuralı

> **Canlı siteye otomatik değişiklik yapılmaz.**

Çalışma akışı:

```
1. Agent analiz yapar → bulguları bu göreve ekler
2. Taslak çıktılar /drafts/ altına yazılır
3. Denetim raporu /outputs/reports/ altına yazılır
4. ┌─────────────────────────────┐
   │  İNSAN ONAY GEREKTİREN     │
   │  ADIMLAR:                  │
   │  - Taslak içerik yayını    │
   │  - Schema ekleme / değişim │
   │  - CTA / HTML değişikliği  │
   │  - WA URL güncellemesi     │
   └─────────────────────────────┘
5. Onay sonrası: branch aç → patch uygula → PR aç → review → merge
```

Her patch uygulaması ayrı branch ve ayrı PR açar. Toplu değişiklik yasak.

---

## Görev Sonu Raporu (Agent Doldurur)

```json
{
  "status": "pending",
  "agent": "seo-agent + geo-agent + snippet-agent + schema-agent + cro-agent + commerce-agent",
  "task": "TASK-001 — Buzsu /su-aritma-cihazlari/ tam denetimi",
  "outputs": [],
  "requires_review": true,
  "open_items": [
    "Sayfa crawl analizi bekleniyor",
    "SERP analizi bekleniyor",
    "Schema denetimi bekleniyor"
  ]
}
```
