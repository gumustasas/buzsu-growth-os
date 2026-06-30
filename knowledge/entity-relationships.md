# BUZSU Entity İlişki Haritası

## Genel Bakış
Bu belge Buzsu.com.tr ekosistemindeki temel entity'leri ve aralarındaki ilişkileri tanımlar.
Google Knowledge Graph ve AI arama motorlarının BUZSU'yu doğru anlaması için referans çerçevesidir.

## Temel Entity Tipleri

### Marka Entity'leri
- **Buzsu** — Ana marka (su arıtma cihazları satışı ve servisi, Türkiye)
- **Suvesu** — Eğitim ve içerik sitesi (su kalitesi bilgisi kaynağı)

### Ürün Entity'leri
- Su arıtma cihazı (genel)
- Tezgah altı su arıtma
- Pompasız su arıtma
- Filtre / Yedek filtre seti

### Lokasyon Entity'leri
- Türkiye (ülke — areaServed)
- Hizmet şehirleri (şehir bazlı)

## İlişki Tipleri

| Kaynak | İlişki | Hedef |
|---|---|---|
| Buzsu | isA | Organization, LocalBusiness |
| Buzsu | offers | Su Arıtma Cihazı |
| Su Arıtma Cihazı | isA | Product |
| Su Arıtma Cihazı | brand | Buzsu |
| Suvesu | relatedTo | Buzsu |
| Buzsu | areaServed | Türkiye |
| Yedek Filtre | isAccessoryFor | Su Arıtma Cihazı |

## schema.org Karşılıkları
- Organization.sameAs → Google Business Profile, sosyal medya URL'leri
- Product.brand → Buzsu
- LocalBusiness.areaServed → Türkiye şehirleri

## Güncelleme Kuralı
Entity bilgisi değiştiğinde knowledge-graph/governance.md süreci takip edilir.
Yeni entity tipi ekleme = MINOR sınıf, onay gerekir.

## Referans Dosyalar
- knowledge-graph/entity-types.md
- knowledge-graph/relationship-types.md
