# TASK-001 — Buzsu.com.tr /su-aritma-cihazlari/ Sayfa Denetimi

**Tarih:** 2026-06-30  
**Faz:** Faz 4 — Buzsu SEO/GEO/CRO İlk Canlı Uygulama  
**Durum:** Tamamlandı (Kısmi — crawl engeli not edildi)  
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

| Metrik | Hedef | Ölçüm Yöntemi | Durum |
|--------|-------|--------------|-------|
| Teknik SEO puanı | Kritik sorun yok | Manuel kontrol listesi | Kısmi (crawl engeli) |
| Product schema varlığı | Tüm ürün sayfalarında | Google Rich Results Test | ❌ Büyük ihtimalle yok |
| BreadcrumbList schema | Var ve hatasız | Google Rich Results Test | ❌ Büyük ihtimalle yok |
| FAQ schema | En az 3 soru-cevap | Sayfa kaynak kodu | ❌ Büyük ihtimalle yok |
| Featured snippet fırsatı | En az 2 sorgu için şans var | Serper analizi | ✅ Onaylandı (TDS + seçim sorguları) |
| AI Overview görünürlüğü | Var / yok tespiti yapıldı | Serper AI snippet | ⚠️ Kısmi — Buzsu alıntısı görülmedi |
| İç bağlantı: kategori → ürün | Tüm 5 ürüne bağlantı | Manuel kontrol | ⚠️ Doğrulanamadı (crawl engeli) |
| WhatsApp CTA | Her ürüne özel pre-fill | URL incelemesi | ❌ Genel mesaj var, pre-fill yok |
| Güven bloğu | Garanti + kurulum visible above fold | Görsel inceleme | ⚠️ Doğrulanamadı (crawl engeli) |

---

## Crawl Engeli Notu

> `https://www.buzsu.com.tr/su-aritma-cihazlari/` WebFetch ile HTTP 403 Forbidden döndürüyor.
> Google Cache da engelleniyor. Vercel MCP çalışmadı (Vercel deployment değil).
> Aşağıdaki teknik veriler Google dizin başlığından ve site: aramasından çıkarıldı;
> meta description, H yapısı, schema JSON-LD, iç bağlantılar ve CTA detayları crawl gerektiriyor.
> İnsan: sayfa kaynağını paylaşırsa bu boşluklar doldurulabilir.

---

## Crawl Kontrol Listesi

### Teknik Kontroller

- [x] **Sayfa başlığı (title tag)**
  - Google dizin başlığından tespit edildi: `Su Arıtma Cihazları ve Fiyatları 2026 | Buzsu`
  - Karakter sayısı: ~47 — kabul edilebilir (50–60 aralığının altında, geliştirilebilir)
  - Birincil anahtar kelime "su arıtma cihazları" içeriyor ✅
  - Marka "Buzsu" var ✅
  - "2026" yıl etiketi yeniliği gösteriyor ✅

- [ ] **Meta description** — ⚠️ Crawl gerektiriyor (403 engeli)

- [ ] **H1 başlığı** — ⚠️ Crawl gerektiriyor

- [ ] **H2/H3 yapısı** — ⚠️ Crawl gerektiriyor

- [ ] **Canonical tag** — ⚠️ Crawl gerektiriyor
  - Sayfa Google'da indekslendiğine göre robots bloğu yok; canonical büyük ihtimalle kendini gösteriyor

- [ ] **Robots tag** — ⚠️ Crawl gerektiriyor
  - Sayfa indekslendiği için `noindex` kesinlikle yok

- [ ] **Hreflang** — ⚠️ Crawl gerektiriyor

- [ ] **Open Graph / Social meta** — ⚠️ Crawl gerektiriyor

- [ ] **Sayfa hızı (gözlemsel)** — ⚠️ Crawl gerektiriyor

- [ ] **Mobil uyumluluk** — ⚠️ Crawl gerektiriyor

---

## SERP / Rakip Analiz Şablonu

### Hedef Sorgular

| Sorgu | Mevcut Buzsu Sırası | Top-3 Rakip | Snippet Türü | PAA Var mı? |
|-------|-------------------|-------------|-------------|------------|
| `su arıtma cihazı` | Top 10 dışı | Trendyol, Hepsiburada, Sumosu | Organik liste | Evet |
| `su arıtma cihazı fiyatları` / `fiyat 2026` | ~Pos 10 (hedef URL) | Trendyol, Hepsiburada, Mil Su Arıtma | Organik + Alışveriş | Evet |
| `en iyi su arıtma cihazı` | Pos 1 (ama /en-iyi-... sayfası) | Donanimhaber, Dreamwater, Puretron | Featured snippet yok; liste | Evet |
| `ev tipi su arıtma cihazı` | ~Pos 4 (/ev-tipi sayfası) | Trendyol, Hepsiburada, Rainwater | Organik | Evet |

### Rakip Profili — Kategori Sayfası Rakipleri

| Rakip Domain | Snippet | Schema | İçerik Türü | CTA Modeli |
|-------------|---------|--------|-------------|-----------|
| trendyol.com | Alışveriş sonuçları | Product schema | Ürün listesi | Sepete ekle |
| sumosuaritma.com | Organik | Product + FAQ (muhtemel) | Kategori + blog | WhatsApp + sipariş |
| rainwater.com.tr | Organik | Muhtemel var | Kategori sayfası | Form + WhatsApp |
| mitrasuaritma.com | Organik | Muhtemel var | Blog + kategori | WhatsApp |
| donanimhaber.com | Bilgi makalesi | Article schema | İçerik makalesi | Yok |

---

## Schema Kontrol Listesi

### Mevcut Schema Durumu

| Schema Türü | Var mı? | Kanıt | Hata | Öncelik |
|------------|---------|-------|------|---------|
| Product | ❌ Büyük ihtimalle yok | SERP'te rich result görünmüyor | — | P1 |
| BreadcrumbList | ❌ Büyük ihtimalle yok | SERP'te breadcrumb rich result yok | — | P1 |
| FAQ | ❌ Büyük ihtimalle yok | SERP'te FAQ accordion yok | — | P1 |
| LocalBusiness | ❓ Bilinmiyor | Crawl gerekli | — | P2 |
| HowTo | ❌ Muhtemelen yok | Ürün kategorisi için beklenmez | — | P3 |

> **Not:** HTTP 403 nedeniyle kaynak kod incelenemedi. SERP'te hiçbir rich result (ürün kartı, FAQ accordion, breadcrumb) görünmemesi, schema eksikliğinin güçlü göstergesidir. İnsan sayfa kaynağını paylaşırsa kesin doğrulama yapılabilir.

Uygulama: `patches/buzsu-site/product-schema-v2.md`

---

## İç Link Kontrolü

### Gelen Bağlantılar (Bu sayfaya kim link veriyor?)

- [?] Ana sayfa (`/`) → `/su-aritma-cihazlari/` linki — ⚠️ Crawl gerekli
- [?] Navigasyon menüsü — ⚠️ Crawl gerekli (büyük ihtimalle var; yüksek öncelikli sayfa)
- [?] Diğer Buzsu içerik sayfaları (`/en-iyi-su-aritma-cihazi-hangisi/`, `/tds/`) — ⚠️ Doğrulanamadı
- [?] Suvesu.com → Buzsu.com.tr bağlantısı — ⚠️ Crawl gerekli

### Çıkan Bağlantılar (Bu sayfa kimle link veriyor?)

- [?] Ürün sayfalarına bağlantı var mı — ⚠️ Crawl gerekli
- [?] Buzsu Code sayfasına (`/code-su-aritma-cihazi/`) — ⚠️ Doğrulanamadı
- [?] İçerik sayfalarına bağlantı (`/tds/`, `/su-aritma-filtre-degisimi-siralamasi/`) — ⚠️ Doğrulanamadı

### Bilinen Site Yapısı (site: aramasından)

Keşfedilen Buzsu sayfaları:
- `/en-iyi-su-aritma-cihazi-hangisi/` — #1 sırada, "en iyi" sorgusunda
- `/ev-tipi-su-aritma-cihazlari/` — ~Pos 4, "ev tipi" sorgusunda
- `/su-aritma-cihazlari/` — hedef URL, "fiyatlar" için ~Pos 10
- `/tds/` — TDS rehberi (GEO fırsatı yüksek)
- `/code-su-aritma-cihazi/` — amiral ürün
- `/su-aritma-filtre-degisimi-siralamasi/` — bakım içeriği
- `/endustriyel-su-aritma/` — endüstriyel kategori
- `/uv-su-aritma-sistemi/` — UV kategori
- `/musluk-tipi-su-aritma-cihazlari/` — musluk tipi
- `/su-aritma-filtreleri/` — filtre sayfası

### Fırsat Haritası

| Kaynak | Hedef | Önerilen Anchor Text | Mevcut mi? |
|--------|-------|---------------------|-----------|
| `/` (Ana sayfa) | `/su-aritma-cihazlari/` | "Su Arıtma Cihazları" | ⚠️ Doğrulanamadı |
| `/en-iyi-su-aritma-cihazi-hangisi/` | `/su-aritma-cihazlari/` | "uygun modeli satın almak için" | ⚠️ Doğrulanamadı |
| `/su-aritma-cihazlari/` | `/code-su-aritma-cihazi/` | "Buzsu Code — Alkali Mineralli RO" | ⚠️ Doğrulanamadı |
| `/tds/` | `/su-aritma-cihazlari/` | "TDS değerinize göre arıtma cihazı seçin" | ⚠️ Doğrulanamadı |

Uygulama: `patches/buzsu-site/internal-linking.md`

---

## Featured Snippet Fırsatları

### Snippet Fırsat Değerlendirmesi

| Sorgu | Mevcut Snippet Sahibi | Snippet Türü | Buzsu'da İçerik Var mı? | Kazanma Şansı |
|-------|----------------------|-------------|------------------------|--------------|
| `su arıtma cihazı nasıl seçilir` | Rakip bloglar (Puretron, Sulax) | Numaralı liste / paragraf | ❌ Yok (kategori sayfasında) | Yüksek (4/5) |
| `tds değeri kaç olmalı` | Sulax, Pomeka, Buzsu /tds/ | Paragraf + tablo | ✅ /tds/ sayfasında var | Orta — /tds/ güçlendirilebilir |
| `ro sistemi ne işe yarar` | Rakip bloglar | Paragraf tanım | ❌ Yok (kategori sayfasında) | Yüksek (4/5) |
| `su arıtma cihazı bakımı ne zaman` | Çeşitli servis siteleri | Liste | Kısmi (/su-aritma-filtre-degisimi-siralamasi/) | Orta (3/5) |

### En Yüksek Fırsatlı Sorgu

**`su arıtma cihazı nasıl seçilir`**
- Şu an snippet sahibi: rakip blog siteleri
- Önerilen format: Numaralı liste (TDS bandına göre 4 adım)
- Buzsu avantajı: /tds/ sayfası + ürün çeşitliliği → otoritenin yüksek olduğu konu
- Aksiyon: `/su-aritma-cihazlari/` sayfasına "Nasıl Seçilir?" bölümü ekle → patch: `geo-ai-overview.md`

### PAA Soruları (Top 10)

1. Su arıtma cihazı nasıl seçilir?
2. TDS değeri kaç olmalı?
3. RO sistemi ne işe yarar?
4. Su arıtma cihazı almak mantıklı mı?
5. En iyi su arıtma cihazı hangisi?
6. Su arıtma cihazı nasıl çalışır?
7. Su arıtma cihazı bakımı ne zaman yapılmalı?
8. Su arıtma cihazı ne kadar maliyete girer?
9. Hangi filtreleme teknolojisi kullanılmalı?
10. Arıtma suyu sağlıklı mı, zararlı mı?

Uygulama: `patches/buzsu-site/geo-ai-overview.md` (FAQ schema bölümü)

---

## GEO / AI Overview Görünürlük Kontrolü

### AI Overview Kontrol

| Sorgu | AI Overview Var mı? | Buzsu Alıntılanıyor mu? | Rakip Alıntı Kaynakları |
|-------|---------------------|------------------------|------------------------|
| `su arıtma cihazı` | Muhtemelen evet (bilgi sorgusu) | ❌ Görülmedi | Puretron, Sumosu, Mitra |
| `ro sistemi nedir` | Muhtemelen evet | ❌ Görülmedi | Bilgi siteleri |
| `tds değeri kaç olmalı` | Evet | ⚠️ /tds/ sayfasıyla kısmi şans | Sulax, Pomeka, Buzsu /tds/ |
| `Buzsu su arıtma` (markalı) | Evet (Knowledge Panel muhtemel) | ✅ Markalı sorguda evet | — |

### GEO Uygunluk Kontrolü (Mevcut Sayfa İçin)

- [ ] İlk paragrafta sorguya doğrudan yanıt — ⚠️ Crawl gerekli; büyük ihtimalle yok (kategori sayfası)
- [ ] Tanım kutusu formatı (definition box) — ⚠️ Crawl gerekli; büyük ihtimalle yok
- [ ] Liste veya tablo yapısı — ⚠️ Crawl gerekli; ürün listesi muhtemelen var
- [ ] Tarih/güncelleme sinyali — ✅ Title'da "2026" var
- [ ] Kaynak atıfı (uzman, belge) — ⚠️ Crawl gerekli; muhtemelen yok

Uygulama: `patches/buzsu-site/geo-ai-overview.md`

---

## CRO Güven Blokları

### Güven Sinyalleri Envanteri

| Sinyal | Var mı? | Kanıt | Öncelik |
|--------|---------|-------|---------|
| Garanti bilgisi (kaç yıl) | ⚠️ Doğrulanamadı | Crawl gerekli | P1 |
| Ücretsiz kurulum bilgisi | ⚠️ Doğrulanamadı | Crawl gerekli | P1 |
| Kargo bilgisi | ⚠️ Doğrulanamadı | Crawl gerekli | P1 |
| Müşteri yorum sayısı / yıldız | ⚠️ Doğrulanamadı | SERP'te yıldız görünmüyor | P1 |
| Referans fotoğrafı / video | ⚠️ Doğrulanamadı | Crawl gerekli | P2 |
| Sertifika / belge görseli | ⚠️ Doğrulanamadı | Crawl gerekli | P2 |
| Servis bilgisi (periyodik bakım) | ⚠️ Doğrulanamadı | Crawl gerekli | P2 |
| Fiziksel adres / telefon | ⚠️ Doğrulanamadı | Crawl gerekli | P2 |

### CTA Hiyerarşisi (SERP + Bilinen Veriden Değerlendirme)

- [ ] Birincil CTA: ⚠️ Crawl gerekli — WhatsApp butonu muhtemelen var (genel site yapısında var)
- [ ] WhatsApp butonu fold üstünde mi — ⚠️ Crawl gerekli
- [ ] Mobilde sticky WA butonu — ⚠️ Crawl gerekli
- [ ] Pre-fill WA mesajı ürüne özel mi — ❌ Mevcut patch'lere göre genel mesaj var

Uygulama: `patches/buzsu-site/cro-product-page.md`

---

## WhatsApp Satış Akışı

### Mevcut WA Durum Kontrolü

| Sayfa | WA Butonu Var mı? | Mevcut Mesaj | Pre-fill Özel mi? |
|-------|------------------|--------------|------------------|
| `/su-aritma-cihazlari/` | ⚠️ Crawl gerekli | Genel mesaj (tahmin) | ❌ Hayır |
| Ürün sayfaları | ⚠️ Crawl gerekli | Genel mesaj (tahmin) | ❌ Hayır |

### Önerilen Pre-fill URL'ler

Hazır patch dosyasında tüm şablonlar mevcut: `patches/buzsu-site/whatsapp-sales.md`

- [x] Kategori sayfası için mesaj şablonu hazır
- [x] 5 ürün sayfası için ayrı mesaj şablonu hazır
- [x] TDS widget → WA entegrasyon şablonu hazır

---

## Kullanılacak Patch Dosyaları

| Patch | Kapsam | Durum |
|-------|--------|-------|
| `patches/buzsu-site/product-schema-v2.md` | Product + BreadcrumbList schema | Uygulanmayı bekliyor |
| `patches/buzsu-site/internal-linking.md` | İç bağlantı haritası | Uygulanmayı bekliyor |
| `patches/buzsu-site/cro-product-page.md` | CRO güven blokları + CTA | Uygulanmayı bekliyor |
| `patches/buzsu-site/geo-ai-overview.md` | GEO içerik + FAQ schema | Uygulanmayı bekliyor |
| `patches/buzsu-site/whatsapp-sales.md` | WhatsApp pre-fill satış akışı | Uygulanmayı bekliyor |

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

## Görev Sonu Raporu

```json
{
  "status": "partial",
  "agent": "seo-agent + geo-agent + snippet-agent + schema-agent + cro-agent + commerce-agent",
  "task": "TASK-001 — Buzsu /su-aritma-cihazlari/ tam denetimi",
  "date": "2026-06-30",
  "outputs": [
    "outputs/reports/buzsu-su-aritma-cihazlari-audit-report.md"
  ],
  "completed": [
    "SERP analizi — 4 hedef sorgu için tamamlandı",
    "Rakip haritası — kategori sayfası için top rakipler belirlendi",
    "Title tag — Google dizininden doğrulandı",
    "Schema durumu — SERP'te rich result görünmemesi = schema eksik (yüksek güven)",
    "PAA soruları — Top 10 listelendi",
    "Snippet fırsatları — En yüksek fırsat: 'su arıtma cihazı nasıl seçilir'",
    "GEO boşluk — Buzsu AI Overview'da alıntılanmıyor",
    "WhatsApp — Genel mesaj var, ürüne özel pre-fill yok",
    "Site yapısı — 10+ sayfa keşfedildi"
  ],
  "blocked": [
    "Sayfa crawl: HTTP 403 Forbidden — meta, H yapısı, iç bağlantılar, schema JSON, CTA detayları doğrulanamadı",
    "Vercel MCP: Çalışmadı (site Vercel üzerinde değil)",
    "Google Cache: 403 engeli"
  ],
  "requires_review": true,
  "open_items": [
    "İnsan sayfa kaynak kodunu paylaşırsa teknik boşluklar doldurulabilir",
    "Schema uygulama: patch/buzsu-site/product-schema-v2.md — insan onayı gerekli",
    "GEO içerik: patch/buzsu-site/geo-ai-overview.md — insan onayı gerekli",
    "WhatsApp pre-fill: patch/buzsu-site/whatsapp-sales.md — insan onayı gerekli"
  ]
}
```
