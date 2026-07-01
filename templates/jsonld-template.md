# JSON-LD Şema Şablonu

Kullanım: JSON-LD şema taslağı oluştururken base şablon olarak kullan.
Doldurulan taslak: /drafts/schema/[tip]-[slug].jsonld
Doğrulama sonrası onay için sun.

---

## Product Şeması

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "[Ürün adı — gerçek ad, uydurma yok]",
  "description": "[Kısa açıklama, max 160 karakter]",
  "image": "[Ürün görsel URL]",
  "brand": {
    "@type": "Brand",
    "name": "Buzsu"
  },
  "sku": "[SKU kodu]",
  "offers": {
    "@type": "Offer",
    "price": "[Gerçek fiyat — bilgi olmadan YAZMA]",
    "priceCurrency": "TRY",
    "availability": "https://schema.org/InStock",
    "url": "[Ürün sayfası canonical URL]"
  }
}
```

---

## FAQPage Şeması

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Soru metni — doğal dil]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Yanıt, max 150 kelime, sağlık iddiası yok]"
      }
    }
  ]
}
```

---

## Organization Şeması

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Buzsu",
  "url": "https://buzsu.com.tr",
  "logo": "[Logo URL]",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "[Doğrulanmış telefon]",
    "contactType": "customer service",
    "areaServed": "TR",
    "availableLanguage": "Turkish"
  },
  "sameAs": [
    "[Google Business Profile URL]",
    "[Instagram URL]"
  ]
}
```

---

## HowTo Şeması

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "[İşlem adı — örn. Su Arıtma Cihazı Filtre Değişimi]",
  "totalTime": "PT[N]M",
  "step": [
    {
      "@type": "HowToStep",
      "text": "[Adım açıklaması]"
    }
  ]
}
```

---

## Doğrulama Adımları
1. JSON sözdizimi: `python3 -m json.tool dosya.jsonld`
2. Google Rich Results Test: richresults.google.com
3. schema.org/validator: validator.schema.org
4. Hata yoksa: taslağı /drafts/schema/ altına kaydet, onay için sun

## Onay Notu
Fiyat, stok ve teknik bilgiler doğrulanmadan placeholder bırakılır.
Canlıya almak için insan onayı zorunludur.
