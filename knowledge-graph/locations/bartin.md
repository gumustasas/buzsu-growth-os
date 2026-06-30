---
entity_type: Location
schema_type: schema.org/City
name_tr: Bartın
name_en: Bartın
aliases: [Bartın İli, Bartın Şehri]
related_entities:
  - entities/organization-buzsu.md
  - brands/buzsu.md
status: seed
---

# Bartın

## Tanım

Bartın, Türkiye'nin Batı Karadeniz bölgesinde yer alan bir il merkezidir.  
Buzsu Su Arıtma Sistemleri'nin faaliyet merkezi Bartın'dır.

## Su Kalitesi Bağlamı

- Karadeniz bölgesinde yağış fazladır; bazı bölgelerde şebeke suyu nispeten yumuşak olabilir.
- Bununla birlikte altyapıya ve konuma bağlı olarak TDS değerleri ve kireç içeriği değişkenlik gösterebilir.
- Yerel TDS değeri bilgisi: doğrulanmalı (Bartın Belediyesi su analiz raporu referans alınabilir).

## Yerel SEO İlişkisi

| Hedef Sorgu | Önemi |
|-------------|-------|
| "Bartın su arıtma cihazı" | Yerel müşteri hedefleme |
| "Bartın su arıtma servisi" | Kurulum + bakım hizmeti |
| "Bartın su kalitesi" | Bilgi odaklı içerik, GEO |

## Schema.org Eşleştirmesi

Organization schema'sında `address` veya `areaServed` alanı:

```json
{
  "@type": "Organization",
  "areaServed": {
    "@type": "City",
    "name": "Bartın",
    "sameAs": "https://www.wikidata.org/wiki/Q209104"
  }
}
```

## Notlar

- Buzsu ulusal e-ticaret yapıyor ancak servis alanı Bartın merkezli görünüyor.
- Servis kapsamı (hangi iller?) net değil — site kopyasından doğrulanmalı.
- Hizmet bölgesi genişletilecekse `areaServed` dizisi kullanılır.
