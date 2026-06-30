---
entity_type: Mineral
schema_type: schema.org/Thing
name_tr: Alkali Mineral
name_en: Alkaline Mineral
aliases: [Alkali Mineraller, Kalsiyum, Magnezyum, Potasyum, Alkali Su Mineralleri]
related_entities:
  - technologies/ters-osmoz.md
  - contaminants/kirec.md
  - products/code-su-aritma-cihazi.md
status: seed
---

# Alkali Mineral

## Tanım

Alkali mineraller, suya hafif bazik (pH > 7) özellik kazandıran ve insan sağlığı için temel kabul edilen minerallerdir.  
Su arıtma bağlamında öne çıkan alkali mineraller: kalsiyum (Ca), magnezyum (Mg), potasyum (K) ve sodyum (Na).

## Su Arıtma İle İlişkisi

Ters osmoz membranlı sistemler, suyun TDS değerini düşürürken bu mineralleri de uzaklaştırabilir.  
Bu nedenle premium RO sistemleri "remineralizasyon filtresi" veya "alkali mineral filtresi" içerir.

| Mineral | Günlük İhtiyaç (Tahmini) | Su Kaynağı |
|---------|--------------------------|------------|
| Kalsiyum (Ca) | 1000 mg | Sert şebeke suyu |
| Magnezyum (Mg) | 300–400 mg | Sert şebeke suyu |
| Potasyum (K) | 2500–3500 mg | Meyve/sebze, su |

> Notlar sağlık iddiası içermez — doğrulanmış günlük değerler WHO/Türkiye Gıda Kodeksi'nden alınmalıdır.

## Buzsu Ürünleriyle İlişki

- 7 Aşamalı RO UV modeli: Alkali mineral filtresi var mı? → ürün sayfasından doğrulanmalı
- Remineralizasyon filtresi varlığı Product schema `description` alanında belirtilmeli

## GEO / AI Overview Fırsatı

- "Arıtılmış su mineralsiz mi olur?" → FAQPage hedefi
- "Su arıtma cihazı mineralleri alır mı?" → snippet hedefi
- "Alkali su nedir?" → bilgi paneli

## Schema.org Not

Bu entity doğrudan `Product` schema'sında yer almaz.  
`description` ve `hasMeasurement` (`PropertyValue`) alanlarında geçebilir.
