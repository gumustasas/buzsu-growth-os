# TASK-004 Raporu — Airtable Product Schema Alanları Tanımı

**Tarih:** 2026-06-30  
**Agent:** schema-agent  
**Bağımlı görev:** TASK-003 (Product Schema Mimarisi)  
**Durum:** İnsan onayı bekliyor

---

## 1. Yönetici Özeti

Airtable Products tablosunda (`tbldogYQwAQr24UWE`) mevcut 5 ürün kaydının Product Schema JSON-LD için **3 kritik alan eksik**: `Schema Description`, `Image URL`, `SKU`.  
Bu rapor her alan için önerilen değerleri, Airtable alan tiplerini ve doldurma planını içerir.  
**Onay gelmeden Airtable'a veri girilmez; Product Schema PR'ı bu alanlar doldurulmadan açılmaz.**

---

## 2. Mevcut Alan Envanteri

| Alan Adı | Airtable Field ID | Tip | Durum |
|----------|-------------------|-----|-------|
| Product Name | `fldXLw08VVVF8Aquz` | Single line text | ✅ Dolu |
| Category | `fldLXUPLXEO2HHFK9` | Single line text | ✅ Dolu |
| Price TRY | `fldEds5Vy1frHlw3e` | Number | ✅ Dolu |
| Buzsu URL | `fldOZXnwqNzgddMxj` | URL | ✅ Dolu |
| Suvesu Article | `fldtwQlkCIWyljJdW` | URL | ✅ Kısmi |
| Active | `fldOjYbJvwIvEMPNs` | Checkbox | ✅ Dolu |
| Notes | `fldmnDYpfEoJX5P0Y` | Long text | ✅ Dolu |
| **Schema Description** | — | Long text | ❌ **Eksik** |
| **Image URL** | — | URL | ❌ **Eksik** |
| **SKU** | — | Single line text | ❌ **Eksik** |

---

## 3. Eksik Alan Tablosu — 5 Ürün

| Ürün | Mevcut Fiyat | Schema Description | Image URL | SKU |
|------|-------------|-------------------|-----------|-----|
| 5 Aşamalı RO Su Arıtma Sistemi | 13.749 TRY | *(Taslak — Bkz. Bölüm 5)* | DOLDURULACAK | `BZS-RO5-001` |
| Atıksız Su Arıtma Cihazı | 9.749 TRY | *(Taslak — Bkz. Bölüm 5)* | DOLDURULACAK | `BZS-ATK-002` |
| 7 Aşamalı RO Su Arıtma Sistemi (UV) | 12.999 TRY | *(Taslak — Bkz. Bölüm 5)* | DOLDURULACAK | `BZS-RO7-003` |
| Dijital TDS Metre | 450 TRY | *(Taslak — Bkz. Bölüm 5)* | DOLDURULACAK | `BZS-TDS-004` |
| Yıllık Filtre Seti (5'li) | 3.390 TRY | *(Taslak — Bkz. Bölüm 5)* | DOLDURULACAK | `BZS-FLT-005` |

---

## 4. SKU Format Önerisi

### Format

```
BZS-{KATEGORİ}-{SIRA}
```

| Segment | Açıklama | Örnek |
|---------|----------|-------|
| `BZS` | Marka prefix — Buzsu | sabit |
| `{KATEGORİ}` | 3-5 harf, ürün tipi | `RO5`, `RO7`, `ATK`, `TDS`, `FLT` |
| `{SIRA}` | 3 haneli sıra numarası | `001`, `002`, … |

### SKU Tablosu

| Ürün | SKU | Açıklama |
|------|-----|----------|
| 5 Aşamalı RO Su Arıtma Sistemi | `BZS-RO5-001` | RO = Reverse Osmosis, 5 = 5 aşama |
| Atıksız Su Arıtma Cihazı | `BZS-ATK-002` | ATK = Atıksız |
| 7 Aşamalı RO Su Arıtma Sistemi (UV) | `BZS-RO7-003` | RO7 = 7 aşama RO |
| Dijital TDS Metre | `BZS-TDS-004` | TDS = Total Dissolved Solids |
| Yıllık Filtre Seti (5'li) | `BZS-FLT-005` | FLT = Filtre |

> **Not:** SKU formatı şu an standart değilse, mevcut iç ürün kodlarına göre güncelleme yapılabilir. Format belirsizse bu sütun boş bırakılmalı.

---

## 5. Schema Description Taslakları

Schema.org `description` alanı için önerilen metin. Kısıtlar:
- 50–160 karakter arası (meta description ile uyumlu)
- Ürün özelliklerini doğrudan belirtir; abartı içermez
- Türkçe; ürün sayfası açıklamasıyla çelişmez

### Ürün 1 — 5 Aşamalı RO Su Arıtma Sistemi

```
5 aşamalı ters osmoz sistemi. Ev ve ofis için tezgah altı kurulum, ücretsiz montaj dahil.
```
*(86 karakter)*

**Alternatif:**
```
Ters osmoz teknolojisiyle 5 filtre aşaması; kireç, klor ve ağır metalleri arındırır.
```
*(85 karakter)*

---

### Ürün 2 — Atıksız Su Arıtma Cihazı

```
Atık su üretmeyen su arıtma cihazı. Kurulum gerektirmez; kiracılar için uygundur.
```
*(81 karakter)*

**Alternatif:**
```
Sıfır atık su teknolojisi. Musluk bağlantısı yok, yerleştir ve kullan tasarımı.
```
*(79 karakter)*

---

### Ürün 3 — 7 Aşamalı RO Su Arıtma Sistemi (UV)

```
7 aşamalı ters osmoz sistemi ve UV sterilizasyon. Premium model, tezgah altı pompajlı.
```
*(87 karakter)*

**Alternatif:**
```
UV ışınlı 7 filtreli RO cihazı; bakteri ve virüslere karşı ek bariyer sağlar.
```
*(78 karakter)*

---

### Ürün 4 — Dijital TDS Metre

```
Musluk veya arıtma suyunun saflığını ölçen dijital TDS metre. Pilli, taşınabilir.
```
*(81 karakter)*

**Alternatif:**
```
Anlık TDS ölçümü; 0–9999 ppm aralığı, LCD ekran, pillerle çalışır.
```
*(66 karakter)*

---

### Ürün 5 — Yıllık Filtre Seti (5'li)

```
5 Aşamalı RO sistemi için 5'li yıllık filtre seti. Made in Korea, orijinal parça.
```
*(81 karakter)*

**Alternatif:**
```
Yıllık bakım için 5'li filtre paketi; sediman, karbon ve membran filtreleri dahil.
```
*(82 karakter)*

---

## 6. Image URL Doldurma Planı

Airtable `Image URL` alanı şu an **tüm ürünler için boş**. Doldurma adımları:

1. Her ürün sayfasını açın (`/code-su-aritma-cihazi/`, `/atiksiz-su-aritma-cihazi/`, vb.)
2. Birincil ürün görselinin tam URL'sini kopyalayın (CDN veya site domaini altında)
3. Görselin `alt` metni ve boyutunu not edin (önerilen: minimum 800×800 px, `.jpg` veya `.webp`)
4. Airtable `Image URL` alanına yapıştırın
5. JSON-LD `image` alanı otomatik beslenebilir olacak

> **Geçici placeholder:** `DOLDURULACAK` — JSON-LD şablon testlerinde bu değer boş bırakılır ya da `https://www.buzsu.com.tr/assets/images/placeholder-product.jpg` kullanılır.

---

## 7. Airtable Alan Tipi Önerileri

| Yeni Alan | Önerilen Tip | Airtable API Tipi | Notlar |
|-----------|-------------|-------------------|--------|
| Schema Description | Long text | `multilineText` | 160 karakter limit eklenmez; kullanıcı kendisi kısar |
| Image URL | URL | `url` | Boş bırakılabilir; JS/PHP tarafında kontrol edilir |
| SKU | Single line text | `singleLineText` | Benzersizlik kuralı Airtable'da zorunlu değil; kod tarafında kontrol edilir |

---

## 8. Product Schema PR Blocker

> **UYARI:** Aşağıdaki koşullar sağlanmadan `feat/product-schema-ci4` branch'i açılmaz ve PR oluşturulmaz.

| Koşul | Durum | Sorumlu |
|-------|-------|---------|
| `SKU` alanı 5 ürün için dolu | ❌ | İnsan |
| `Image URL` alanı 5 ürün için dolu | ❌ | İnsan |
| `Schema Description` alanı 5 ürün için onaylı | ❌ | İnsan |
| Airtable alanları oluşturuldu | ❌ | İnsan |
| JSON-LD şablonları TASK-003'te insan tarafından review edildi | ❌ | İnsan |

Tüm koşullar ✅ olduğunda TASK-005 başlatılabilir: CodeIgniter 4 view dosyalarına entegrasyon branch'i.

---

## 9. Özet ve Sonraki Adımlar

| Eylem | Öncelik | Sorumlu | Durum |
|-------|---------|---------|-------|
| Airtable'da 3 yeni alan oluştur (Schema Description, Image URL, SKU) | P1 | İnsan | ❌ Bekliyor |
| Bölüm 5'teki Schema Description taslakları gözden geçir ve onayla | P1 | İnsan | ❌ Bekliyor |
| Her ürün sayfasından Image URL'yi al ve Airtable'a gir | P1 | İnsan | ❌ Bekliyor |
| SKU değerlerini onayla veya iç kodlamaya göre güncelle | P2 | İnsan | ❌ Bekliyor |
| TASK-005: Alanlar dolduktan sonra CI4 entegrasyon branch aç | P1 | schema-agent | ⏳ Blocked |

---

*Rapor: schema-agent — TASK-004 — 2026-06-30*
