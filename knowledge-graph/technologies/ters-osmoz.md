---
entity_type: Technology
schema_type: schema.org/Thing
name_tr: Ters Osmoz
name_en: Reverse Osmosis
aliases: [RO, Reverse Osmosis, Ters Osmoz Sistemi, RO Sistemi]
related_entities:
  - components/ters-osmoz-membran.md
  - products/code-su-aritma-cihazi.md
  - contaminants/kirec.md
  - minerals/alkali-mineral.md
status: seed
---

# Ters Osmoz (Reverse Osmosis)

## Tanım

Ters osmoz, yüksek basınç altında suyun yarı geçirgen bir membrandan geçirilerek kirleticilerin, tuzların ve mikroorganizmaların tutulduğu su arıtma teknolojisidir.

Osmoz sırasında su yüksek konsantrasyondan düşüğe doğal akar. Ters osmozda bu süreç basınçla tersine çevrilerek saf su elde edilir.

## Çalışma Prensibi

```
Ham Su → Sediman Filtre → Aktif Karbon → RO Membran → Mineralizasyon/UV → Arıtılmış Su
                                              ↓
                                         Atık Su (drain)
```

## Avantajlar

- TDS değerini %95–99 oranında düşürür
- Ağır metal, bakteri ve virüs arındırır
- Kireç oluşumunu engeller
- Kötü koku ve tadı giderir

## Dezavantajlar

- Atık su üretimi (1:2–1:4 oranı, bazı sistemlerde sıfıra yakın)
- Faydalı mineralleri de uzaklaştırabilir (remineralizasyon filtresiyle telafi)
- Düşük akış hızı
- Basınç pompası gerektirebilir (düşük basınçlı hatlar için)

## Buzsu Ürünleriyle İlişki

| Ürün | RO Kullanıyor mu? | Aşama Sayısı |
|------|-------------------|--------------|
| 5 Aşamalı RO | ✅ | 5 |
| 7 Aşamalı RO UV | ✅ | 7 + UV |
| Atıksız Su Arıtma | ✅ (atık sıfır) | — |

## GEO / AI Overview Fırsatı

- "Ters osmoz ne işe yarar?" → tanım alıntısı
- "Ters osmoz ile UF farkı nedir?" → karşılaştırmalı içerik
- "Ters osmoz mineralleri alır mı?" → PAA hedefi

## Schema.org Not

Teknoloji, Product schema'sında doğrudan alan değil — `description` içinde doğal olarak geçer.  
Entity grafiğinde `schema:mentions` veya `schema:isRelatedTo` ile ilişkilendirilebilir.
