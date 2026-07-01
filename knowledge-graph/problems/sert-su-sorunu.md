---
entity_type: Thing
schema_type: schema.org/Thing
name_tr: Sert Su Sorunu
name_en: Hard Water Problem
aliases: [Sert Su, Su Sertliği Sorunu]
related_entities:
  - contaminants/kirec.md
status: seed
---

# Sert Su Sorunu

## Tanım

Sert su sorunu, yüksek kalsiyum ve magnezyum içeriğine sahip şebeke suyunun günlük yaşamda yarattığı gözlemlenebilir etkilerin tümüdür. Bu, [Kireç](../contaminants/kirec.md) entity'sinin (teknik neden) kullanıcı tarafından deneyimlenen sonucudur.

## İlişki: Neden → Sorun

```
Kireç (kalsiyum/magnezyum iyonları — teknik neden)
   → causes →
Sert Su Sorunu (kullanıcı deneyimi)
```

## Semptomlar

- Beyaz kireç lekeleri (musluk, bardak, cam yüzeylerde)
- Çaydanlık ve su ısıtıcısında birikim
- Sabun/şampuanın az köpürmesi
- Cihazlarda (çamaşır makinesi, bulaşık makinesi, su arıtma membranı) kireçlenme

## Su Arıtma ile İlişkisi

Ters osmoz tabanlı sistemler, kalsiyum ve magnezyum iyonlarını tutarak sert su sorununun kaynağını arıtır.
→ Bkz. [Kireç](../contaminants/kirec.md)

## AI Özeti (AI Summary)

Sert su sorunu, yüksek kalsiyum/magnezyum içeren şebeke suyunun günlük yaşamda yarattığı gözle görülür etkilerdir (kireç lekesi, cihaz kireçlenmesi, az köpüren sabun); teknik nedeni "Kireç" entity'sinde tanımlanan mineral birikimidir.

## Notlar

- Bu entity, Kireç (contaminants/kirec.md) ile kasıtlı olarak ayrı tutulmuştur: Kireç = teknik/kimyasal neden, Sert Su Sorunu = kullanıcı deneyimi ve arama niyeti (ör. "evde sert su sorunu nasıl çözülür"). İçerik tekrarından kaçınmak için bu dosya semptom/kullanıcı-problemi çerçevesine odaklanır, teknik detaylar için Kireç dosyasına yönlendirir.
