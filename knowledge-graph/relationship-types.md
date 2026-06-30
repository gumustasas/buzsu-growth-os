# BUZSU Entity İlişki Tipleri

## Genel Bakış
Bu belge BUZSU entity'leri arasındaki ilişki tiplerini ve
schema.org property karşılıklarını tanımlar.

## İlişki Tablosu

| Kaynak Entity | İlişki Tipi | Hedef Entity | schema.org Property |
|---|---|---|---|
| Buzsu (Org) | üretir / satar | Su Arıtma Cihazı | makesOffer, offers |
| Buzsu (Org) | hizmet verir | Türkiye şehirleri | areaServed |
| Buzsu (Org) | sahip olduğu site | Buzsu.com.tr | url, sameAs |
| Suvesu | ilgili marka | Buzsu | relatedTo, brand |
| Su Arıtma Cihazı | markası | Buzsu | brand |
| Su Arıtma Cihazı | aksesuarı | Yedek Filtre | isRelatedTo |
| Yedek Filtre | uyumlu cihaz | Su Arıtma Cihazı | isAccessoryFor |
| Blog Yazısı | yazıldığı site | Suvesu | isPartOf |
| Blog Yazısı | konu | Su arıtma | about |

## Yönlü İlişkiler

### Güven Sinyali İlişkileri
- Buzsu → Sertifika: award, certification (doğrulanmış olmalı)
- Buzsu → Referans: review (PII içermeyen, onaylı)

### Rakip / Karşılaştırma
Rakip entity'ler knowledge-graph'ta tanımlanmaz.
Karşılaştırma yalnızca onaylı içerik metninde geçer.

## İlişki Ekleme Süreci
1. knowledge-graph/governance.md'deki onay sürecini takip et
2. Entity şemasına yeni property ekle → /drafts/schema/ altına kaydet
3. Doğrula → Onay al → Yayınla

## Referans
- schema.org resmi property listesi
- Google Search Central Structured Data yönergeleri
