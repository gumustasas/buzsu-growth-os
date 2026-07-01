# BUZSU Entity Tipleri

## Genel Bakış
Bu belge buzsu-growth-os ekosisteminde tanımlı entity tiplerini
ve her tipin schema.org karşılığını listeler.
Yeni entity tipi eklemek MINOR sınıf değişikliğidir; governance.md takip edilir.

## Marka Entity'leri

### Buzsu
- schema.org/@type: Organization, Brand
- Tanım: Türkiye'de su arıtma cihazları üreten ve satan marka
- Temel özellikler: name, url, logo, sameAs, contactPoint, areaServed
- Öncelik: Yüksek — Knowledge Graph varlığı kritik

### Suvesu
- schema.org/@type: Organization, WebSite
- Tanım: Su kalitesi eğitim ve içerik sitesi (Buzsu'nun eğitim kolu)
- Temel özellikler: name, url, description, relatedTo (Buzsu)

## Ürün Entity'leri

### Su Arıtma Cihazı (genel)
- schema.org/@type: Product
- Alt tipler: tezgah altı, pompasız
- Temel özellikler: name, description, image, brand, offers, sku

### Yedek Filtre
- schema.org/@type: Product
- İlişki: isAccessoryFor → Su Arıtma Cihazı

## Lokasyon Entity'leri

### Türkiye
- schema.org/@type: Country
- Kullanım: Organization.areaServed

### Hizmet Şehirleri
- schema.org/@type: City
- Temel özellikler: name, containedInPlace (Türkiye)

## İçerik Entity'leri

### Blog Yazısı (Suvesu)
- schema.org/@type: Article, BlogPosting
- Temel özellikler: headline, author, datePublished, about

### SSS Sayfası
- schema.org/@type: FAQPage
- Temel özellikler: mainEntity (Question+Answer listesi)

## Güncelleme Kuralı
knowledge-graph/governance.md — onay süreci için.
