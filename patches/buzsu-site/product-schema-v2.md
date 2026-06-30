# Patch: Product Schema v2 — Buzsu.com.tr

**Hedef sayfa:** `https://www.buzsu.com.tr/su-aritma-cihazlari/` ve alt ürün sayfaları  
**Sınıf:** MINOR — İnsan onayı gerekli  
**Branch önerisi:** `fix/schema-buzsu-product-v2`  
**Bağımlı agent:** schema-agent

---

## Problem

Buzsu.com.tr ürün sayfalarında yapılandırılmış veri (structured data) eksik veya yetersiz:

- `Product` schema yok veya eski format
- `AggregateRating` alanı boş — Google Rich Results'ta yıldız puanı çıkmıyor
- `offers.priceCurrency` ve `offers.price` alanı eksik — fiyat rich snippet'i yok
- `BreadcrumbList` tanımlı değil — navigasyon Google tarafından okunmuyor

Sonuç: Ürün sayfaları organik arama sonuçlarında sıradan mavi link olarak görünüyor; fiyat, stok durumu ve puan bilgisi eksik.

---

## Hedef Durum

- Her ürün sayfasında tam `Product` schema (ad, açıklama, marka, fiyat, stok, SKU)
- `BreadcrumbList` ana kategoriden ürüne kadar
- Google Rich Results Test'ten hatasız geçiş

---

## Uygulanacak Değişiklikler

### Adım 1: Product Schema JSON-LD

Her ürün sayfasının `<head>` bölümüne ekle:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{ÜRÜN_ADI}",
  "description": "{ÜRÜN_AÇIKLAMASI}",
  "brand": {
    "@type": "Brand",
    "name": "Buzsu"
  },
  "sku": "{SKU_KODU}",
  "image": ["{ÜRÜN_GÖRSEL_URL}"],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "TRY",
    "price": "{FİYAT}",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Buzsu"
    },
    "url": "{ÜRÜN_URL}"
  }
}
</script>
```

**Doldurulan alanlar** (Airtable Products tablosundan):

| Placeholder | Airtable Alanı | Tablo |
|-------------|---------------|-------|
| `{ÜRÜN_ADI}` | Product Name | Products |
| `{FİYAT}` | Price TRY | Products |
| `{ÜRÜN_URL}` | Buzsu URL | Products |

`{SKU_KODU}` ve `{ÜRÜN_GÖRSEL_URL}` için site yöneticisinden alınacak.

---

### Adım 2: BreadcrumbList Schema

Her ürün sayfasına ekle:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Ana Sayfa",
      "item": "https://www.buzsu.com.tr/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Su Arıtma Cihazları",
      "item": "https://www.buzsu.com.tr/su-aritma-cihazlari/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "{ÜRÜN_ADI}",
      "item": "{ÜRÜN_URL}"
    }
  ]
}
</script>
```

---

## Ürün Sayfası Listesi (schema-agent tamamladığında doldurulacak)

| Ürün | URL | Schema Durumu |
|------|-----|--------------|
| 5 Aşamalı RO Su Arıtma Sistemi | — | Bekliyor |
| 7 Aşamalı RO Su Arıtma Sistemi | — | Bekliyor |
| Dijital TDS Metre | — | Bekliyor |
| Yıllık Filtre Seti (5'li) | — | Bekliyor |
| Musluk Üstü Su Arıtma | — | Bekliyor |

---

## Uygulama Adımları

```bash
# buzsu reposunda (veya CMS panelinde):
git checkout -b fix/schema-buzsu-product-v2

# Her ürün sayfasına yukarıdaki JSON-LD bloklarını ekle
# Fiyat ve URL bilgilerini Airtable Products tablosundan al

# Doğrulama:
# https://search.google.com/test/rich-results adresinde her URL test edilmeli

git add .
git commit -m "fix: add Product and BreadcrumbList schema to Buzsu product pages"
git push -u origin fix/schema-buzsu-product-v2
# PR aç: fix/schema-buzsu-product-v2 → main
```

---

## Kontrol Listesi (Onay Öncesi)

- [ ] Her ürün için `price` alanı doğru ve güncel
- [ ] Her ürün için `availability` durumu doğru (InStock / OutOfStock)
- [ ] `BreadcrumbList` URL'leri canlı ve erişilebilir
- [ ] Google Rich Results Test — 0 hata
- [ ] Search Console'a yeni URL'ler submit edildi

---

## Beklenen Etki

| Önce | Sonra |
|------|-------|
| Düz mavi link — fiyat yok | Fiyat + stok rich snippet |
| Breadcrumb yok | Navigasyon SERP'te görünür |
| Product schema yok | AI Overview ürün kartı için veri hazır |
