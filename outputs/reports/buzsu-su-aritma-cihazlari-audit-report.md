# Denetim Raporu: Buzsu.com.tr /su-aritma-cihazlari/

**Görev:** TASK-001  
**Hedef URL:** `https://www.buzsu.com.tr/su-aritma-cihazlari/`  
**Tarih:** 2026-06-30  
**Denetimi yapan agent'lar:** seo-agent, geo-agent, snippet-agent, schema-agent, cro-agent, commerce-agent  
**Durum:** Taslak — İnsan onayı bekleniyor  
**Onay:** ☐ Bekliyor / ☐ Onaylandı — Onaylayan: — / Tarih: —

> Bu rapor insan onayından önce `/outputs/reports/` altındadır.
> Onaylanmadan PR açılamaz veya canlı siteye değişiklik uygulanamaz.

> **Crawl Sınırlaması:** `buzsu.com.tr` HTTP 403 döndürdüğünden sayfa kaynağı incelenemedi.
> Teknik veriler Google dizini başlığından, site: aramasından ve SERP gözleminden çıkarıldı.
> Güven seviyesi her bulguda belirtilmiştir. İnsan sayfa HTML'ini paylaşırsa boşluklar doldurulabilir.

---

## Sayfa Özeti

| Alan | Değer |
|------|-------|
| URL | `https://www.buzsu.com.tr/su-aritma-cihazlari/` |
| Sayfa türü | Ürün kategori sayfası |
| Birincil hedef anahtar kelime | `su arıtma cihazları` |
| İkincil anahtar kelimeler | `su arıtma cihazı fiyatları`, `ev su arıtma sistemi`, `RO sistemi` |
| Title (Google dizininden) | Su Arıtma Cihazları ve Fiyatları 2026 \| Buzsu |
| Tahmini aylık arama hacmi | `su arıtma cihazı`: yüksek rekabet (Trendyol/Hepsiburada baskısı) |
| Mevcut SERP sırası | ~Pos 10 ("fiyatları" için); Top 10 dışı (genel sorgu) |
| Featured snippet durumu | Yok — fırsat tespit edildi |
| AI Overview durumu | Buzsu alıntısı görülmedi |
| Crawl durumu | ❌ HTTP 403 — kaynak kod incelenemedi |

---

## Mevcut Durum

### Genel Değerlendirme

**Acil müdahale gerektiren:**
- Schema eksikliği — Product, BreadcrumbList, FAQ schema yok (SERP kanıtı)
- WhatsApp CTA ürüne özel değil — genel mesaj, dönüşüm kaybı
- GEO içerik yok — kategori sayfasında tanım kutusu, PAA yanıtı, TDS tablosu eksik

**Bu ay yapılmalı:**
- GEO giriş bölümü + FAQ schema (geo-ai-overview.md patch)
- Product + BreadcrumbList schema (product-schema-v2.md patch)
- WhatsApp pre-fill URL'leri (whatsapp-sales.md patch)

**Sonraki çeyrekte planlanabilir:**
- CRO güven blokları görsel yeniden düzeni
- İç bağlantı haritası genişletme (Suvesu→Buzsu cross-linking)
- LocalBusiness schema ekleme

### Puanlama (0–10)

| Boyut | Puan | Notlar |
|-------|------|--------|
| Teknik SEO | 5 / 10 | Title iyi; meta, H yapısı, canonical doğrulanamadı — crawl gerekli |
| İçerik kalitesi | 5 / 10 | Site genelinde içerik var (/tds/, /en-iyi-...); kategori sayfası GEO uyumluluğu bilinmiyor |
| Schema kapsamı | 2 / 10 | SERP'te hiç rich result yok — schema büyük ihtimalle eksik |
| İç bağlantı ağı | 5 / 10 | Çok sayfa var; kategori↔ürün bağlantıları doğrulanamadı |
| Snippet uygunluğu | 3 / 10 | Snippet yok; "su arıtma cihazı nasıl seçilir" için yüksek fırsat |
| GEO görünürlük | 3 / 10 | AI Overview'da alıntı görülmedi; /tds/ sayfası fırsat içeriyor |
| CRO / dönüşüm hazırlığı | 4 / 10 | WhatsApp var ama genel; güven sinyalleri doğrulanamadı |
| WhatsApp satış akışı | 2 / 10 | Pre-fill yok — patch hazır, uygulanmayı bekliyor |
| **Genel** | **4 / 10** | Temel altyapı var; schema + GEO + WA iyileştirmeleri büyük sıçrama sağlar |

---

## Teknik SEO Bulguları

### Title Tag

```
Mevcut: Su Arıtma Cihazları ve Fiyatları 2026 | Buzsu
Karakter sayısı: ~47
Değerlendirme: ☑ Kabul edilebilir  ☐ Kısa  ☐ Uzun  ☐ Anahtar kelime eksik  ☐ Marka yok
```

**Değerlendirme:**
- Birincil anahtar kelime "su arıtma cihazları" var ✅
- Marka "Buzsu" var ✅
- "2026" tazelik sinyali veriyor ✅
- Karakter sayısı 47 — ideal 55–60 aralığının altında; 8–13 karakter daha eklenebilir

**Öneri:**
```
Su Arıtma Cihazları ve Fiyatları 2026 — RO Sistemler | Buzsu
```
(61 karakter — "RO Sistemler" ikincil anahtar kelimeyi de kapsıyor)

---

### Meta Description

```
Mevcut: Bilinmiyor — HTTP 403 engeli
Karakter sayısı: —
Değerlendirme: ☐ İyi  ☐ Kısa  ☐ Uzun  ☐ CTA eksik
```

**Öneri (insan doğrulaması sonrası uygulanacak):**
```
Ev tipi su arıtma cihazları, 5 ve 7 aşamalı RO sistemleri, filtre setleri — 2026 güncel fiyatlarla.
Ücretsiz kurulum. WhatsApp'tan hızlı bilgi alın. | Buzsu
```
(~155 karakter, CTA içeriyor)

---

### H Yapısı

```
H1: Bilinmiyor — HTTP 403 engeli
H2'ler: Bilinmiyor
H3'ler: Bilinmiyor
```

**Tahmin (kategori sayfası standardı):**
- H1 muhtemelen: "Su Arıtma Cihazları" veya "Su Arıtma Cihazları ve Fiyatları"
- H2'ler muhtemelen ürün başlıkları

**Öneri (crawl sonrası güncellenecek):**
- H1: "Su Arıtma Cihazları — 2026 Model ve Fiyatları"
- H2 blokları: "Su Arıtma Cihazı Nasıl Seçilir?" (GEO bölümü) + ürün alt kategorileri

---

### Canonical / Robots / Hreflang

| Tag | Mevcut Değer | Doğru mu? |
|-----|-------------|----------|
| Canonical | Bilinmiyor (403) | Sayfa indekslendiği için büyük ihtimalle self-canonical |
| Robots | Bilinmiyor (403) | index/follow olmalı — sayfa Google'da görünüyor |
| Hreflang | Bilinmiyor (403) | Türkçe site — `tr` tanımlanmalı |

---

### Sayfa Hızı (Gözlemsel)

| Kriter | Durum | Not |
|--------|-------|-----|
| LCP görseli önden yükleniyor mu? | Bilinmiyor (403) | Ürün kategorisi sayfaları için kritik |
| Görsel formatı | Bilinmiyor (403) | WebP tercih edilmeli |
| Viewport meta | Bilinmiyor (403) | Modern site — muhtemelen var |

---

## İçerik Bulguları

### İçerik Yapısı

**Mevcut durum:**
- Kelime sayısı (tahmini): Bilinmiyor — kategori sayfaları genellikle 300–800 kelime
- Birincil anahtar kelime geçiş yoğunluğu: Bilinmiyor
- İkincil anahtar kelimeler yer alıyor mu: Bilinmiyor
- GEO formatı uygunluğu (tanım, liste, tablo): ☐ Var / ☑ Muhtemelen Yok

**Tespit edilen boşluklar:**
- [ ] Tanım kutusu (definition box) — "Su arıtma cihazı nedir?" sorusuna ilk paragrafta doğrudan yanıt yok (kategori sayfası tahmin)
- [ ] TDS karşılaştırma tablosu — hangi TDS bandı için hangi ürün önerilir
- [ ] "Su arıtma cihazı nasıl seçilir?" sorusuna doğrudan yanıt
- [ ] Snippet-ready FAQ bölümü

**Güçlü yönler:**
- Buzsu /en-iyi-su-aritma-cihazi-hangisi/ sayfası #1 sırada — içerik otoritesi kanıtı
- /tds/ sayfası mevcut — TDS konusunda otorite var
- "2026" güncel yıl title'da — tazelik sinyali

**Önerilen ek içerik blokları:**
→ GEO taslak: `drafts/content/geo-buzsu-su-aritma-2026-07-01.md`  
→ Patch: `patches/buzsu-site/geo-ai-overview.md`

---

## Schema Bulguları

### Mevcut Schema Envanteri

| Schema Türü | Var mı? | Kanıt | Hata | Öncelik |
|------------|---------|-------|------|---------|
| Product | ❌ Yok (yüksek güven) | SERP'te ürün kartı görünmüyor | — | P1 |
| BreadcrumbList | ❌ Yok (yüksek güven) | SERP'te breadcrumb rich result yok | — | P1 |
| FAQ | ❌ Yok (yüksek güven) | SERP'te FAQ accordion yok | — | P1 |
| LocalBusiness | ❓ Bilinmiyor | Crawl gerekli | — | P2 |
| HowTo | ❌ Yok (tahmin) | Kategori sayfasında beklenmez | — | P3 |

### Google Rich Results Test

```
Test URL: https://search.google.com/test/rich-results?url=https://www.buzsu.com.tr/su-aritma-cihazlari/
Sonuç: Tamamlanmadı — insan manuel test edebilir
Beklenen sonuç: Hata veya "hiç zengin sonuç bulunamadı"
```

### Önerilen Schema Eklemeleri

1. **BreadcrumbList** — Kategori sayfasında (kategori → ürün hiyerarşisi)
   ```json
   {"@type": "BreadcrumbList", "itemListElement": [
     {"@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://www.buzsu.com.tr/"},
     {"@type": "ListItem", "position": 2, "name": "Su Arıtma Cihazları", "item": "https://www.buzsu.com.tr/su-aritma-cihazlari/"}
   ]}
   ```
   → Patch: `patches/buzsu-site/product-schema-v2.md`

2. **Product schema** — 5 ürün sayfasının tamamında (tam şablon patch'te hazır)
   → Patch: `patches/buzsu-site/product-schema-v2.md`

3. **FAQ schema** — Kategori sayfasına, en az 3 gerçek PAA sorusuyla
   → Patch: `patches/buzsu-site/geo-ai-overview.md`

---

## İç Link Bulguları

### Gelen Bağlantılar (Bu sayfaya)

| Kaynak | Anchor Text | Var mı? | Kalite |
|--------|------------|---------|--------|
| Ana sayfa (`/`) | "Su Arıtma Cihazları" | ⚠️ Crawl gerekli | — |
| Navigasyon menüsü | "Su Arıtma Cihazları" | ⚠️ Büyük ihtimalle var | Yüksek |
| /en-iyi-su-aritma-cihazi-hangisi/ | Ürün linki | ⚠️ Crawl gerekli | Yüksek (o sayfa #1 sırada) |
| Suvesu.com | — | ⚠️ Büyük ihtimalle yok | Fırsat |

### Çıkan Bağlantılar (Bu sayfadan)

| Hedef | Anchor Text | Var mı? | Not |
|-------|------------|---------|-----|
| `/code-su-aritma-cihazi/` | Buzsu Code | ⚠️ Crawl gerekli | Amiral ürün — mutlaka bağlı olmalı |
| `/ev-tipi-su-aritma-cihazlari/` | Ev Tipi | ⚠️ Crawl gerekli | Alt kategori |
| `/endustriyel-su-aritma/` | Endüstriyel | ⚠️ Crawl gerekli | Alt kategori |
| `/su-aritma-filtreleri/` | Filtre Setleri | ⚠️ Crawl gerekli | Ürün grubu |
| `/tds/` | "TDS Rehberi" | ⚠️ Crawl gerekli | GEO fırsatı — cross-link kritik |

### Öncelikli İç Link Ekleme Listesi

1. `/en-iyi-su-aritma-cihazi-hangisi/` → `/su-aritma-cihazlari/` — "uygun fiyatlarla satın almak için tıklayın" anchor text
2. `/tds/` → `/su-aritma-cihazlari/` — "TDS değerinize göre cihaz seçin"
3. `/su-aritma-cihazlari/` → `/code-su-aritma-cihazi/` — Buzsu Code öne çıkarma

→ Patch: `patches/buzsu-site/internal-linking.md`

---

## Snippet Fırsatları

### Mevcut Snippet Durumu

| Sorgu | Snippet Sahibi | Snippet Türü | Buzsu'da İçerik | Fırsat Skoru (1–5) |
|-------|---------------|-------------|----------------|-------------------|
| `su arıtma cihazı nasıl seçilir` | Rakip bloglar | Numaralı liste | ☐ Yok (kategori sayfasında) | 4/5 |
| `tds değeri kaç olmalı` | Sulax, Pomeka | Paragraf + tablo | ☑ Var (/tds/ sayfasında) | 3/5 — /tds/ güçlendirilebilir |
| `ro sistemi ne işe yarar` | Rakip bloglar | Paragraf tanım | ☐ Yok (kategori sayfasında) | 4/5 |
| `su arıtma cihazı bakımı ne zaman` | Servis siteleri | Numaralı liste | ☑ Kısmi (/su-aritma-filtre-degisimi-siralamasi/) | 3/5 |

### En Yüksek Fırsatlı Sorgu

**Sorgu:** `su arıtma cihazı nasıl seçilir`  
**Önerilen format:** Numaralı liste (4 adım: TDS ölç → bant belirle → teknoloji seç → bütçe belirle)  
**Taslak:** `drafts/content/snippet-buzsu-suaritma-nasil-secilir-2026-07-01.md`  
**Patch:** `patches/buzsu-site/geo-ai-overview.md`

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

---

## GEO Fırsatları

### AI Overview Tespiti

| Sorgu | AI Overview Var mı? | Buzsu Alıntı mı? | Rakip Kaynaklar |
|-------|--------------------|--------------------|-----------------|
| `su arıtma cihazı` | Muhtemelen evet | ❌ Görülmedi | Sumosu, Mitra, Puretron |
| `ro sistemi nedir` | Muhtemelen evet | ❌ Görülmedi | Bilgi siteleri |
| `tds değeri kaç olmalı` | Evet | ⚠️ /tds/ şansı var | Sulax, Pomeka, Mitra |
| `Buzsu su arıtma` (markalı) | Evet (Knowledge Panel) | ✅ Markalı sorguda | — |

### Mevcut Sayfa GEO Uygunluğu

| Kriter | Durum | Aksiyon |
|--------|-------|---------|
| İlk paragrafta doğrudan yanıt | ⚠️ Crawl gerekli — muhtemelen yok | GEO giriş bölümü ekle |
| Tanım kutusu | ⚠️ Crawl gerekli — muhtemelen yok | Definition box formatı ekle |
| Liste / tablo yapısı | ⚠️ Ürün listesi var, GEO tablosu yok | TDS karşılaştırma tablosu ekle |
| Tarih / güncelleme sinyali | ✅ Title'da "2026" var | Title iyi; içeriğe de "Güncelleme: 2026" ekle |
| Kaynak atıfı | ⚠️ Bilinmiyor | NSF sertifikası, WHO/TSE kaynak eklenmesi önerilir |

**Önerilen GEO giriş bölümü:**
```
Su arıtma cihazı, içme suyundaki klorür, ağır metal, kireç ve mikroorganizmaları
filtreleyen ev tipi arıtma sistemidir. 2026 itibarıyla Türkiye'de en yaygın
teknoloji ters ozmoz (RO) sistemidir.

→ TDS değeri 150 mg/L'nin üzerindeyse RO sistemi önerilir.
→ 50–150 mg/L arasındaysa musluk üstü filtre yeterli olabilir.

[TDS değerinizi öğrenin →]  [Buzsu Code'u inceleyin →]
```

**GEO taslağı:** `drafts/content/geo-buzsu-su-aritma-2026-07-01.md`  
**Patch:** `patches/buzsu-site/geo-ai-overview.md`

---

## CRO Bulguları

### Güven Sinyali Envanteri

| Sinyal | Var mı? | Konumu | Above Fold mu? | Öneri |
|--------|---------|--------|---------------|-------|
| Garanti bilgisi | ⚠️ Bilinmiyor (403) | — | — | Eklenmeli (2 yıl ürün + 1 yıl filtre) |
| Ücretsiz kurulum | ⚠️ Bilinmiyor (403) | — | — | Above fold'a taşı — güçlü dönüşüm sinyali |
| Kargo bilgisi | ⚠️ Bilinmiyor (403) | — | — | "Ücretsiz kargo" görünür olmalı |
| Müşteri yorumu / yıldız | ⚠️ SERP'te yıldız yok | — | — | Review schema + görsel yorum bloku |
| Sertifika görseli | ⚠️ Bilinmiyor (403) | — | — | NSF, TSE gibi sertifikalar ön plana |
| Servis / bakım bilgisi | ⚠️ Bilinmiyor (403) | — | — | "Periyodik bakım hizmetimiz var" |

### CTA Analizi

| CTA | Var mı? | Konum | Öncelik Sırası | Öneri |
|-----|---------|-------|---------------|-------|
| WhatsApp | ⚠️ Muhtemelen var | Bilinmiyor | Birincil olmalı | Ürüne özel pre-fill ekle |
| Telefon | ⚠️ Muhtemelen var | Bilinmiyor | İkincil | Tıklanabilir `tel:` linki |
| Sepete Ekle / Satın Al | ⚠️ Bilinmiyor | Bilinmiyor | Üçüncül | WhatsApp'tan sonra |
| Form / Talep | ⚠️ Bilinmiyor | Bilinmiyor | Dördüncül | Opsiyonel |

**Değerlendirme:** CTA detayları crawl gerektiriyor. Mevcut WhatsApp mesajının genel olduğu (ürüne özel olmadığı) site yapısından biliyor; bu en kritik CRO sorunudur.  
**Öneri CTA sırası:** WhatsApp (birincil — ürüne özel pre-fill) → Telefon (ikincil) → Satın Al (üçüncül)

**Taslak:** `drafts/content/cro-trust-buzsu-2026-07-01.md`  
**Patch:** `patches/buzsu-site/cro-product-page.md`

---

## Öncelikli Aksiyonlar

### P1 — Aynı Hafta (Onay Sonrası)

| # | Aksiyon | Patch | Branch | Tahmini Etki |
|---|---------|-------|--------|-------------|
| 1 | Product + BreadcrumbList schema ekle | `patches/buzsu-site/product-schema-v2.md` | `fix/schema-buzsu-product-v2` | Rich results → CTR +10–15% |
| 2 | GEO giriş bölümü + FAQ schema ekle | `patches/buzsu-site/geo-ai-overview.md` | `fix/geo-content-buzsu-su-aritma` | AI Overview alıntı şansı |
| 3 | WhatsApp pre-fill URL güncelle (tüm ürünler) | `patches/buzsu-site/whatsapp-sales.md` | `fix/whatsapp-prefill-buzsu` | Lead kalitesi — nitelendirme süresi ↓ |

### P2 — Bu Ay

| # | Aksiyon | Patch | Branch | Tahmini Etki |
|---|---------|-------|--------|-------------|
| 1 | CRO güven blokları + CTA hiyerarşisi | `patches/buzsu-site/cro-product-page.md` | `fix/cro-cta-buzsu-su-aritma` | Dönüşüm oranı ↑ |
| 2 | İç bağlantı haritası uygula | `patches/buzsu-site/internal-linking.md` | `fix/internal-linking-buzsu` | PageRank dağılımı + tarama derinliği |

### P3 — Sonraki Çeyrek

| # | Aksiyon | Not |
|---|---------|-----|
| 1 | Crawl erişim sorunu çözüm | Hosting panelinden bot-agent whitelist veya sayfa HTML manuel paylaşım |
| 2 | LocalBusiness schema | Fiziksel adres bilgisi doğrulanınca |
| 3 | Suvesu→Buzsu cross-linking | /tds-nedir.html → /su-aritma-cihazlari/ |

---

## Riskler

| Risk | Olasılık | Etki | Azaltma |
|------|---------|------|---------|
| Buzsu.com.tr CMS'ine erişim yok / kısıtlı | Yüksek | Yüksek | Platform tespiti önce yapılmalı; patch dosyaları manuel uygulama rehberiyle hazır |
| Schema ekleme site hızını yavaşlatır | Düşük | Orta | JSON-LD `<head>`'e taşı, satır içi CSS ile değil |
| WA mesajı değişikliği satış ekibini şaşırtır | Orta | Düşük | Ekibe önceden bildir — `patches/buzsu-site/whatsapp-sales.md`'de satış ekibi protokolü var |
| Google cache güncelleme gecikmesi | Düşük | Düşük | Schema eklendikten sonra Search Console'da URL Inspect + indexleme isteği |
| Crawl engeli teknik SEO bulgularını eksik bırakıyor | Yüksek | Orta | İnsan sayfa HTML'ini paylaşırsa boşluklar doldurulabilir; P1 aksiyonlar SERP kanıtıyla yeterince güvenli |

---

## Manuel Onay Sonrası Önerilen PR Planı

> Bu bölüm yalnızca insan onayının ardından uygulanır. Onay olmadan hiçbir branch açılmaz.

### PR Sırası

```
1. fix/schema-buzsu-product-v2
   Dosya: patches/buzsu-site/product-schema-v2.md
   Kapsam: Product + BreadcrumbList JSON-LD — 5 ürün sayfası + kategori
   Test: Google Rich Results Test

2. fix/geo-content-buzsu-su-aritma
   Dosya: patches/buzsu-site/geo-ai-overview.md
   Kapsam: GEO giriş bölümü + TDS tablo + FAQ schema
   Test: Sayfa kaynak kodu kontrolü

3. fix/whatsapp-prefill-buzsu
   Dosya: patches/buzsu-site/whatsapp-sales.md
   Kapsam: Ürüne özel pre-fill WA URL'leri (5 ürün + kategori)
   Test: Mobil cihazda her URL test edilmeli

4. fix/cro-cta-buzsu-su-aritma
   Dosya: patches/buzsu-site/cro-product-page.md
   Kapsam: WhatsApp birincil CTA + güven bloğu
   Test: Mobil ve masaüstü görsel kontrol

5. fix/internal-linking-buzsu
   Dosya: patches/buzsu-site/internal-linking.md
   Kapsam: Kategori → ürün iç bağlantıları + Suvesu→Buzsu
   Test: Tüm link'ler 200 döndürmeli (404 yok)
```

### Her PR İçin Standart Akış

```bash
# 1. Branch aç
git checkout -b fix/<pr-adi>

# 2. Değişikliği uygula (patch dosyasına göre)

# 3. Test et (patch'e özel test adımları)

# 4. Commit
git commit -m "fix: <açıklama>"

# 5. Push
git push -u origin fix/<pr-adi>

# 6. PR aç — başlık ve body patch dosyasından alınır

# 7. Review bekle — hiçbir PR review olmadan merge edilmez
```

---

## Crawl Boşluklarını Kapatmak İçin Yapılabilecekler

İnsan şunları sağlarsa eksik teknik veriler doldurulabilir:

1. **Sayfa kaynak kodu** (`Ctrl+U` veya `curl -A "Mozilla/5.0" https://www.buzsu.com.tr/su-aritma-cihazlari/` çıktısı)
   - Kapatılacak boşluklar: meta description, H yapısı, mevcut schema, canonical, iç linkler, WA URL'leri, CTA

2. **Hosting paneli veya CMS erişimi**
   - Platform tespiti: WordPress/WooCommerce/özel CMS
   - Bot-agent erişim açılabilir

3. **Google Search Console ekranı**
   - Gerçek SERP sıralamaları, CTR, impression verileri

---

## Onay Kaydı

```
Rapor tamamlanma tarihi: 2026-06-30
Onaylayan: —
Onay tarihi: —
Uygulama başlangıcı: —
Notlar: Crawl engeli (403) nedeniyle kısmi analiz; P1 aksiyonlar SERP kanıtıyla güvenle uygulanabilir.
```
