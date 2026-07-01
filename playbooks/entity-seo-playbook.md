# Entity SEO Playbook

## Amaç
BUZSU markasını, ürünlerini ve lokasyon varlıklarını Google Knowledge Graph'a
net biçimde kaydetmek ve entity otoritesini güçlendirmek.

## Tetikleyici
- Knowledge Panel'de yanlış veya eksik BUZSU bilgisi
- Entity temizliği veya birleştirme gerekiyor
- Yeni ürün veya lokasyon entity'si eklenecek
- AI aramalarda yanlış marka bilgisi dönüyor

## Adımlar

### 1. Entity Envanteri (entity-seo skill)
- knowledge-graph/entity-types.md referans al
- Mevcut BUZSU entity'lerini listele: marka, ürünler, lokasyonlar
- Eksik veya hatalı entity'leri belirle

### 2. Tanımlayıcı İçerik Güçlendirmesi
- Her entity için "Hakkımızda" veya ürün açıklama sayfası kontrol et
- sameAs bağlantıları (Google Business, LinkedIn, Wikidata) ekle
- E-E-A-T sinyallerini (firma kuruluş tarihi, adres, sertifika) güçlendir

### 3. Schema İşaretleme (schema-automation skill)
- Organization, LocalBusiness, Product entity şemaları
- sameAs, foundingDate, areaServed alanları
- /drafts/schema/ altında versiyonlanmış taslaklar

### 4. Bağlantı ve Atıf Stratejisi (seo-agent)
- Yetkili kaynaklarda BUZSU atıfı var mı? (sektör rehberleri, haber siteleri)
- Eksik atıf fırsatlarını listele

### 5. İzleme
- Google Knowledge Panel değişikliklerini takip et
- Entity arama sonuçlarını aylık kontrol et
- AI'da BUZSU bilgisinin doğruluğunu test et

## İlgili Skill'ler
`entity-seo`, `schema-automation`, `technical-seo`, `ai-search`
