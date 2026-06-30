# Patch: WhatsApp Satış Akışı — Buzsu.com.tr

**Hedef:** Tüm Buzsu.com.tr ürün sayfaları ve Suvesu.com AI agent lead handoff  
**Sınıf:** MINOR — İnsan onayı gerekli  
**Branch önerisi:** `fix/whatsapp-sales-flow-buzsu`  
**Bağımlı agent:** cro-agent, commerce-agent

---

## Problem

Buzsu.com.tr ve Suvesu.com'daki WhatsApp butonları genel mesaj gönderiyor:

> "Merhaba, SuveSu sayfasından geldim. Su arıtma hakkında ücretsiz bilgi almak istiyorum."

Satış ekibine gelen mesaj bağlamsız:
- Hangi ürünle ilgilendiği bilinmiyor
- TDS değeri bilinmiyor
- Şehir/ilçe bilinmiyor
- Aciliyeti bilinmiyor

Satış ekibi her mesajı sıfırdan nitelendirmek zorunda → dönüşüm süresi uzuyor.

---

## Hedef Durum

Her WhatsApp bağlantısı, ziyaretçinin bağlamına göre ön doldurulmuş (pre-fill) mesaj taşıyor. Satış ekibine gelen ilk mesajda şunlar mevcut:
- İlgilendiği ürün
- Geldiği sayfa
- TDS değeri (TDS widget kullanıldıysa)
- Bildirdiği şehir (AI agent'tan geliyorsa)

---

## WhatsApp Numara

```
+90 552 789 6905
wa.me/905527896905
```

---

## Pre-fill Mesaj Şablonları

### Ürün Sayfası Butonları

Her ürün sayfasında `href` özelliğini güncelle:

| Ürün Sayfası | Pre-fill Mesaj |
|-------------|---------------|
| 5 Aşamalı RO Sistemi | `Merhaba, 5 Aşamalı RO Su Arıtma Sistemi ürününüzü inceledim. Fiyat ve kurulum bilgisi alabilir miyim?` |
| 7 Aşamalı RO Sistemi | `Merhaba, 7 Aşamalı RO Su Arıtma Sistemi için bilgi almak istiyorum. Kurulum fiyatı dahil mi?` |
| Musluk Üstü Su Arıtma | `Merhaba, Musluk Üstü Su Arıtma cihazı hakkında bilgi almak istiyorum. Kurulum gerekiyor mu?` |
| Filtre Seti | `Merhaba, mevcut su arıtma cihazım için uygun filtre seti almak istiyorum. Model bilgilerimi paylaşabilir miyim?` |
| TDS Metre | `Merhaba, Dijital TDS Metre siparişi vermek istiyorum. Hızlı teslimat mümkün mü?` |
| Kategori (/su-aritma-cihazlari/) | `Merhaba, Buzsu.com.tr'de su arıtma cihazlarını inceledim. Evime uygun modeli bulmak istiyorum, yardımcı olabilir misiniz?` |

### URL Formatı

```
https://wa.me/905527896905?text=<encodeURIComponent(mesaj)>
```

Örnek (5 Aşamalı RO):
```
https://wa.me/905527896905?text=Merhaba%2C%205%20A%C5%9Famal%C4%B1%20RO%20Su%20Ar%C4%B1tma%20Sistemi%20%C3%BCr%C3%BCn%C3%BCn%C3%BCz%C3%BC%20inceledim.%20Fiyat%20ve%20kurulum%20bilgisi%20alabilir%20miyim%3F
```

---

### TDS Widget Entegrasyonu (Suvesu.com)

TDS hesaplama sonucunu WhatsApp mesajına ekle:

```javascript
// public_html/assets/tds-widget.js içinde, sonuç gösteriminin ardından:
function updateWhatsAppCTA(tdsValue, qualityLabel) {
  const message = `Merhaba, TDS değerim ${tdsValue} mg/L çıktı (${qualityLabel}). Evim için uygun su arıtma sistemini öğrenmek istiyorum.`;
  const url = `https://wa.me/905527896905?text=${encodeURIComponent(message)}`;
  const ctaEl = document.querySelector('.tds-widget-cta');
  if (ctaEl) {
    ctaEl.href = url;
    ctaEl.textContent = `WhatsApp'tan öneri al (TDS: ${tdsValue})`;
  }
}
```

Bu değişiklik `patches/suvesu-site/` → `archive/legacy/` taşınmadan önce planlanmıştı; Buzsu odaklı versiyonu Suvesu CTA'sını Buzsu'ya yönlendiriyor.

---

### Suvesu AI Agent Handoff

Suvesu.com AI agent lead form gönderdikten sonra "Konuşmayı WhatsApp'a taşı" butonunda:

```javascript
// live-agent.js içinde handoff URL üretimi:
function buildHandoffURL(conversationState) {
  const { intent, product_name, product_category, tds, city } = conversationState;
  
  const parts = [`Merhaba, Suvesu.com AI danışmanından geliyorum.`];
  if (product_name) parts.push(`İlgilendiğim ürün: ${product_name}.`);
  if (tds) parts.push(`TDS değerim: ${tds} mg/L.`);
  if (city) parts.push(`Şehir: ${city}.`);
  parts.push(`Detaylı bilgi almak istiyorum.`);
  
  return `https://wa.me/905527896905?text=${encodeURIComponent(parts.join(' '))}`;
}
```

---

## Satış Ekibi Protokolü (Kod Dışı)

WhatsApp'a gelen pre-fill mesaj alındığında:

1. **30 dakika içinde** yanıt ver (skor: "Zaman Belirtti" → +2 pt)
2. Airtable'a kayıt: Source = "WhatsApp", Product Interest = mesajdan, Engagement = niyete göre
3. Fiyat sormadan önce TDS değerini sor (bilmiyorsa TDS metre öner)
4. Kurulum randevusu için şehir/ilçe al
5. WhatsApp üzerinden ürün linki gönder (Buzsu.com.tr)

---

## Uygulama Adımları

```bash
# buzsu reposunda (veya CMS panelinde):
git checkout -b fix/whatsapp-sales-flow-buzsu

# Her ürün sayfasında WA butonunun href'ini yukarıdaki şablonla güncelle
# Kategori sayfasındaki WA butonunu güncelle

git add .
git commit -m "fix: add product-specific WhatsApp pre-fill messages to Buzsu pages"
git push -u origin fix/whatsapp-sales-flow-buzsu

# suvesu-site reposunda (ayrı PR):
git checkout -b fix/tds-widget-wa-cta
# tds-widget.js'e updateWhatsAppCTA() fonksiyonunu ekle
git push -u origin fix/tds-widget-wa-cta
```

---

## Kontrol Listesi (Onay Öncesi)

- [ ] Tüm WA URL'leri mobil cihazda test edildi (WhatsApp açılıyor mu?)
- [ ] Pre-fill metinlerde yazım hatası yok
- [ ] TDS widget entegrasyonu farklı TDS değerleriyle test edildi
- [ ] Handoff URL'lerinde kişisel veri (telefon, ad) gönderilmiyor
- [ ] Satış ekibi yeni mesaj formatı hakkında bilgilendirildi

---

## Beklenen Etki

| Önce | Sonra |
|------|-------|
| Genel "Merhaba" mesajı | Ürün adı + bağlam ile bağımsız mesaj |
| Satış: "Nasıl yardımcı olabilirim?" | Satış: "5 Aşamalı RO için fiyat göndereceğim" |
| Nitelendirme: 3–5 mesaj | Nitelendirme: 0–1 mesaj |
| TDS bilinmiyor | TDS widget değeri mesajda hazır |
