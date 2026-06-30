# Patch: CRO — Ürün Sayfası Dönüşüm Optimizasyonu — Buzsu.com.tr

**Hedef sayfa:** `https://www.buzsu.com.tr/su-aritma-cihazlari/` ve alt ürün sayfaları  
**Sınıf:** MINOR — İnsan onayı gerekli  
**Branch önerisi:** `fix/cro-product-page-buzsu`  
**Bağımlı agent:** cro-agent, commerce-agent

---

## Problem

Buzsu.com.tr ürün sayfalarında dönüşümü engelleyen veya yavaşlatan unsurlar:

1. **Güven sinyali eksikliği:** Yorum sayısı, garanti bilgisi, kurulum bilgisi görünür değil
2. **CTA hiyerarşisi belirsiz:** "Satın Al", "WhatsApp", "Telefon" butonları eşit ağırlıkta
3. **Fiyat görünürlüğü:** Fiyat sayfanın üstünde değil veya belirgin değil
4. **Sosyal kanıt yok:** Kaç müşteri, hangi şehirler, referans fotoğrafı yok
5. **Aciliyet yok:** "Stok azalıyor" veya "Bu ay kurulum" gibi mikro-kopya eksik

---

## Hedef Durum

- Ziyaretçi sayfaya girdiğinde ilk 3 saniyede: ürün adı + fiyat + WhatsApp CTA görüyor
- Güven blokları fold altında değil, fiyatın hemen altında
- Ana CTA: WhatsApp (Türkiye pazarında en yüksek dönüşüm)
- İkincil CTA: Telefon
- Üçüncül: Sepete ekle / Sipariş formu

---

## Uygulanacak Değişiklikler

### Adım 1: Hero Bölümü CTA Hiyerarşisi

```html
<!-- Ürün hero bölümü — fiyatın hemen altı -->
<div class="product-cta-block">

  <!-- Birincil CTA: WhatsApp -->
  <a href="https://wa.me/905527896905?text={ENCODED_MESSAGE}"
     class="btn btn-primary btn-whatsapp"
     style="background:#25D366; font-size:1.1rem; padding:14px 28px;">
    📲 WhatsApp'tan Sipariş Ver
  </a>

  <!-- İkincil CTA: Telefon -->
  <a href="tel:+905527896905" class="btn btn-secondary">
    📞 Hemen Ara
  </a>

  <!-- Mikro kopya — aciliyet -->
  <p class="stock-note" style="font-size:0.85rem; color:#e55;">
    ✓ Aynı gün kurulum randevusu alabilirsiniz
  </p>

</div>
```

WhatsApp mesaj şablonları (ürüne göre):

| Ürün | Pre-fill Mesaj |
|------|---------------|
| 5 Aşamalı RO | `"Merhaba, 5 Aşamalı RO Su Arıtma Sistemi hakkında bilgi almak istiyorum."` |
| 7 Aşamalı RO | `"Merhaba, 7 Aşamalı RO Su Arıtma Sistemi için fiyat ve kurulum bilgisi alabilir miyim?"` |
| TDS Metre | `"Merhaba, Dijital TDS Metre ürününüzü inceledim, sipariş vermek istiyorum."` |
| Filtre Seti | `"Merhaba, mevcut cihazım için uygun filtre seti almak istiyorum."` |
| Musluk Üstü | `"Merhaba, Musluk Üstü Su Arıtma cihazı hakkında bilgi alabilir miyim?"` |

---

### Adım 2: Güven Bloğu (Fiyat Altı)

```html
<!-- Güven sinyalleri — fiyat ve CTA bloğunun hemen altı -->
<div class="trust-signals">
  <div class="trust-item">
    <span class="icon">🛡️</span>
    <span>2 Yıl Garanti</span>
  </div>
  <div class="trust-item">
    <span class="icon">🔧</span>
    <span>Ücretsiz Kurulum</span>
  </div>
  <div class="trust-item">
    <span class="icon">📦</span>
    <span>Ücretsiz Kargo</span>
  </div>
  <div class="trust-item">
    <span class="icon">⭐</span>
    <span>500+ Mutlu Müşteri</span>
  </div>
</div>
```

**Not:** "500+ Mutlu Müşteri" gibi rakamlar yalnızca doğrulanabilir verilerle kullanılacak. Mevcut müşteri sayısı bilinmiyorsa bu alan boş bırakılır veya "Yüzlerce Mutlu Müşteri" gibi genel ifade kullanılır.

---

### Adım 3: Sosyal Kanıt Bölümü

```html
<!-- Müşteri yorumları bölümü — ürün açıklamasının altı -->
<section class="social-proof">
  <h3>Müşteri Yorumları</h3>
  <!-- Google Reviews embed veya manuel eklenen yorumlar -->
  <!-- Yorum yoksa bu bölüm gösterilmez -->
</section>
```

---

### Adım 4: Sticky WhatsApp Butonu (Mobil)

```css
/* Mobil: sabit WhatsApp butonu */
@media (max-width: 768px) {
  .sticky-wa {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    background: #25D366;
    border-radius: 50px;
    padding: 12px 20px;
    color: white;
    font-weight: bold;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }
}
```

---

## Uygulama Adımları

```bash
git checkout -b fix/cro-product-page-buzsu

# Her ürün sayfasında:
# 1. Hero bölümüne Adım 1 CTA bloğunu ekle (WhatsApp primary)
# 2. Güven bloğunu fiyatın altına ekle
# 3. Müşteri yorumları bölümü ekle (varsa)
# 4. Mobil sticky WA CSS ekle

git add .
git commit -m "fix: CRO improvements — WhatsApp primary CTA, trust signals, sticky mobile button"
git push -u origin fix/cro-product-page-buzsu
```

---

## Kontrol Listesi (Onay Öncesi)

- [ ] WhatsApp pre-fill URL'leri doğru ürüne yönleniyor
- [ ] Garanti ve kurulum bilgisi site gerçeğiyle uyuşuyor (uydurmama kuralı)
- [ ] Müşteri yorumu bölümü yalnızca gerçek yorumlarla dolduruldu
- [ ] Mobil sticky buton diğer elementlerle çakışmıyor
- [ ] Sayfa yükleme hızı ölçüldü (CTA bloğu yavaşlatmamalı)

---

## A/B Test Hipotezi (Gelecek Adım)

| Element | Varyant A (mevcut) | Varyant B (öneri) | Ölçülen Metrik |
|---------|---------------------|-------------------|----------------|
| Birincil CTA | "Sepete Ekle" | "WhatsApp'tan Sipariş Ver" | WA tıklama oranı |
| Güven bloğu | Yok | Fiyat altında 4 ikon | Scroll derinliği |
| Mobil sticky | Yok | Sabit WA butonu | Mobil WA tıklaması |

Vercel analytics veya Google Analytics event tracking ile ölçülür.

---

## Beklenen Etki

| Önce | Sonra |
|------|-------|
| CTA hiyerarşisi belirsiz | WhatsApp birincil, telefon ikincil |
| Güven sinyali yok | Garanti + kurulum + kargo görünür |
| Mobil dönüşüm düşük | Sticky WA butonu ile mobil lead artışı |
