# Patch: İç Bağlantı Haritası — Buzsu.com.tr

**Hedef:** `https://www.buzsu.com.tr/su-aritma-cihazlari/` ve tüm Buzsu sayfaları  
**Sınıf:** MINOR — İnsan onayı gerekli  
**Branch önerisi:** `fix/internal-linking-buzsu`  
**Bağımlı agent:** seo-agent, content-agent

---

## Problem

Buzsu.com.tr sayfaları arasındaki iç bağlantı ağı yetersiz:

- Ürün sayfaları birbirine bağlı değil (çapraz öneri yok)
- Blog/bilgi içerikleri varsa ürün sayfalarına bağlanmıyor
- Kategori sayfası (`/su-aritma-cihazlari/`) alt ürünlere net bağlantı vermemiş olabilir
- Suvesu.com içerik sayfaları Buzsu.com.tr ürün sayfalarına yeterince link vermiyor

Sonuç: PageRank dağılımı zayıf; ürün sayfaları yeterince otorite alamıyor.

---

## Hedef Durum

- Her ürün sayfası en az 3 ilgili iç bağlantı alıyor
- Kategori sayfası tüm ürün sayfalarına anchor text ile bağlanıyor
- Suvesu.com bilgi makaleleri Buzsu.com.tr ürün sayfalarına "Uzman Önerisi" linki veriyor
- TDS bandına göre öneri widget'ı ürün sayfasını doğrudan bağlıyor

---

## Bağlantı Haritası (seo-agent tarafından doldurulacak)

### Buzsu.com.tr → Buzsu.com.tr

| Kaynak Sayfa | Hedef Sayfa | Anchor Text | Öncelik |
|-------------|-------------|-------------|---------|
| `/su-aritma-cihazlari/` | `/su-aritma-cihazlari/ro-sistemi/` | "5 Aşamalı RO Sistemi" | P1 |
| `/su-aritma-cihazlari/` | `/su-aritma-cihazlari/7-asamali-ro/` | "7 Aşamalı RO Sistemi" | P1 |
| `/su-aritma-cihazlari/ro-sistemi/` | `/su-aritma-cihazlari/filtre-seti/` | "Yıllık Filtre Değişimi" | P2 |
| `/su-aritma-cihazlari/ro-sistemi/` | `/su-aritma-cihazlari/tds-metre/` | "TDS Ölçüm Cihazı" | P2 |
| *(seo-agent crawl sonrası doldurulacak)* | | | |

### Suvesu.com → Buzsu.com.tr

| Suvesu Sayfa | Buzsu Hedef | Anchor Text | Öncelik |
|-------------|-------------|-------------|---------|
| `suvesu.com/blog/tds-nedir.html` | `/su-aritma-cihazlari/tds-metre/` | "TDS metre al" | P1 |
| `suvesu.com/blog/ters-osmoz-nedir.html` | `/su-aritma-cihazlari/ro-sistemi/` | "RO sistemi incele" | P1 |
| `suvesu.com/urunler/filtre-seti/` | `/su-aritma-cihazlari/filtre-seti/` | "Buzsu filtre seti fiyatları" | P2 |
| *(seo-agent analiz sonrası genişletilecek)* | | | |

---

## Uygulanacak Değişiklikler

### Adım 1: Kategori Sayfası İç Bağlantı Bloğu

`/su-aritma-cihazlari/` sayfasına ürün kartları veya açık metin bağlantıları ekle:

```html
<!-- Ürün Bağlantı Bloğu — Kategori Sayfası -->
<section class="product-links">
  <h2>Su Arıtma Cihazı Modelleri</h2>
  <ul>
    <li><a href="/su-aritma-cihazlari/5-asamali-ro-sistemi/">5 Aşamalı RO Su Arıtma Sistemi</a> — Ev kullanımı için ideal</li>
    <li><a href="/su-aritma-cihazlari/7-asamali-ro-sistemi/">7 Aşamalı RO Su Arıtma Sistemi</a> — Yüksek TDS değerleri için</li>
    <li><a href="/su-aritma-cihazlari/musluk-ustu/">Musluk Üstü Su Arıtma</a> — Kurulum gerektirmez</li>
    <li><a href="/su-aritma-cihazlari/filtre-seti/">Yıllık Filtre Seti</a> — Mevcut cihaz için bakım</li>
    <li><a href="/su-aritma-cihazlari/tds-metre/">Dijital TDS Metre</a> — Su kalitesini ölç</li>
  </ul>
</section>
```

### Adım 2: Ürün Sayfası Çapraz Öneri Bloğu

Her ürün sayfasına "İlgili Ürünler" veya "Tamamlayıcı Ürünler" bölümü ekle:

```html
<!-- Çapraz Öneri — RO Sistemi Sayfasında -->
<section class="related-products">
  <h3>Bu Ürünle Birlikte</h3>
  <ul>
    <li><a href="/su-aritma-cihazlari/filtre-seti/">Yıllık Filtre Seti</a> — 12 ay sonra filtre değişimi için</li>
    <li><a href="/su-aritma-cihazlari/tds-metre/">TDS Metre</a> — Cihazınızın etkinliğini ölçün</li>
  </ul>
</section>
```

### Adım 3: Suvesu.com Makale Güncelleme (Ayrı PR)

`suvesu-site` reposunda ilgili makalelere Buzsu bağlantısı ekleme:

```html
<!-- tds-nedir.html içinde, TDS ölçüm bölümü sonrası -->
<div class="expert-cta">
  <p>TDS değerinize göre doğru su arıtma cihazını bulmak için:
  <a href="https://www.buzsu.com.tr/su-aritma-cihazlari/tds-metre/" 
     target="_blank" rel="noopener">Buzsu TDS Metre →</a></p>
</div>
```

---

## Uygulama Adımları

```bash
# buzsu reposunda:
git checkout -b fix/internal-linking-buzsu
# Kategori sayfasına Adım 1 bağlantı bloğunu ekle
# Her ürün sayfasına Adım 2 çapraz öneri bloğunu ekle
git add .
git commit -m "fix: add internal linking structure to Buzsu product pages"
git push -u origin fix/internal-linking-buzsu

# suvesu-site reposunda (ayrı PR):
git checkout -b fix/suvesu-to-buzsu-links
# İlgili makalelere Buzsu bağlantıları ekle (Adım 3)
git push -u origin fix/suvesu-to-buzsu-links
```

---

## Kontrol Listesi (Onay Öncesi)

- [ ] Tüm iç bağlantı URL'leri canlı (404 yok)
- [ ] Anchor textler hedef sayfanın anahtar kelimesiyle uyumlu
- [ ] Suvesu → Buzsu linkleri `rel="noopener"` ile açılıyor (güvenlik)
- [ ] Kategori sayfası tüm 5 ürüne bağlanıyor
- [ ] seo-agent crawl sonrası bağlantı haritası güncellendi

---

## Beklenen Etki

| Önce | Sonra |
|------|-------|
| Ürün sayfaları yalıtılmış | PageRank kategori sayfasından ürünlere akar |
| Suvesu trafiği Buzsu'ya geçmiyor | Suvesu → Buzsu referral lead artışı |
| İlgili ürün yok | Sepet büyüklüğü artma potansiyeli |
