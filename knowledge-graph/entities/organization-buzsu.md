---
entity_type: Organization
schema_type: schema.org/Organization
name_tr: Buzsu Su Arıtma Sistemleri
name_en: Buzsu Water Purification Systems
aliases: [Buzsu, Buzsu.com.tr]
related_entities:
  - brands/buzsu.md
  - locations/bartin.md
  - products/code-su-aritma-cihazi.md
buzsu_url: https://www.buzsu.com.tr/
suvesu_url: https://www.suvesu.com/
status: seed
---

# Buzsu Su Arıtma Sistemleri

## Tanım

Buzsu, Türkiye'de ev, ofis ve işyeri için su arıtma sistemi satan ve kurulum + servis hizmeti sunan bir şirkettir.  
Web sitesi: `buzsu.com.tr`. Bilgi ve içerik sitesi: `suvesu.com`.

## Temel Özellikler

- **Faaliyet alanı:** Su arıtma cihazı satışı, montaj, yıllık bakım
- **Hedef müşteri:** Ev kullanıcıları, kiracılar, ofisler
- **Ödeme:** Taksit seçenekleri mevcut
- **Servis:** Kurulum dahil (belirli modellerde)
- **İletişim:** WhatsApp (+90 552 789 6905), web form

## Schema.org Eşleştirmesi

```json
{
  "@type": "Organization",
  "@id": "https://www.buzsu.com.tr/#organization",
  "name": "Buzsu Su Arıtma Sistemleri",
  "url": "https://www.buzsu.com.tr/",
  "logo": "https://www.buzsu.com.tr/assets/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+90-552-789-6905",
    "contactType": "customer service",
    "availableLanguage": "Turkish"
  }
}
```

## İlişkili Entity'ler

- **Marka:** [Buzsu](../brands/buzsu.md)
- **Lokasyon:** [Bartın](../locations/bartin.md)
- **Ürünler:** 5 Aşamalı RO, Atıksız, 7 Aşamalı RO UV, TDS Metre, Filtre Seti

## Notlar

- HTML kaynağında `@id: https://www.buzsu.com.tr/#organization` mevcut — schema tutarlı.
- WhatsApp CTA'sı ürüne özel parametreyle zenginleştirilmesi önerilir (TASK bekleniyor).
