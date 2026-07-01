---
entity_type: Thing
schema_type: schema.org/Thing
name_tr: Yüksek TDS Sorunu
name_en: High TDS Problem
aliases: [Yüksek TDS Değeri, TDS Sorunu]
related_entities:
  - technologies/ters-osmoz.md
  - products/tds-metre.md
  - faq/su-aritma-cihazi-nasil-secilir.md
status: seed
---

# Yüksek TDS Sorunu

## Tanım

Yüksek TDS (Toplam Çözünmüş Katı Madde) sorunu, şebeke veya kuyu suyunda çözünmüş mineral ve tuz miktarının yüksek olması durumudur; suyun tadını, kokusunu ve cihaz ömrünü etkileyebilir.

## TDS Değerlendirme Tablosu (Genel Referans)

| TDS (mg/L) | Değerlendirme |
|------------|----------------|
| 0–150 | İyi |
| 151–300 | Orta |
| 301–500 | Kötü |
| 500+ | Çok kötü |

*(Kaynak: `docs/ai-commerce-layer.md` içindeki mevcut Buzsu commerce-agent tablosu ile tutarlı)*

## Ölçüm ve Çözüm

TDS değeri dijital TDS metre ile ölçülür; yüksek TDS durumunda ters osmoz tabanlı sistemler önerilir.
→ Bkz. [Dijital TDS Metre](../products/tds-metre.md), [Ters Osmoz](../technologies/ters-osmoz.md)

## AI Özeti (AI Summary)

Yüksek TDS sorunu, sudaki çözünmüş mineral/tuz miktarının yüksek olması durumudur; TDS metre ile ölçülür ve ters osmoz tabanlı su arıtma sistemleriyle giderilir.

## Notlar

- TDS eşik tablosu, repodaki mevcut `docs/ai-commerce-layer.md` ve `agents/commerce-agent.md` tablolarıyla hizalanmıştır (uydurma değil, mevcut iç kaynaktan alınmıştır).
