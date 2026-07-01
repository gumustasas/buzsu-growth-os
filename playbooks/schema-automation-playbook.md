# Schema Otomasyonu Playbook

## Amaç
Buzsu.com.tr'nin tüm ürün, içerik ve site sayfaları için JSON-LD şemalarını
sistematik olarak oluştur, doğrula ve güncel tut.

## Tetikleyici
- Yeni ürün kategorisi eklendi
- GSC'de şema hata artışı tespit edildi
- Site yapısal değişikliği (yeni URL yapısı, yeni sayfa tipi)
- Aylık rutin şema denetimi zamanı

## Adımlar

### 1. Şema Envanteri (schema-automation skill)
- Mevcut şemaları listele; eksik sayfa tiplerini belirle
- templates/jsonld-template.md referans al
- GSC şema hatalarını al

### 2. Şema Üretimi
- Ürün sayfaları → Product schema
- SSS sayfaları → FAQPage schema
- Kurulum/montaj içerikleri → HowTo schema
- Navigasyon → BreadcrumbList schema
- Ana sayfa → Organization/WebSite schema

### 3. Doğrulama
- Google Rich Results Test (her şema için)
- schema.org/validator
- Zorunlu alan kontrolü

### 4. Entegrasyon Taslağı
- CodeIgniter 3.7.1 application/views/ dosyalarına ekleme planı
- /drafts/schema/ altında versiyonlanmış taslaklar

### 5. Onay ve Yayın
- Taslaklar insan onayına sunulur
- Developer entegrasyon yapar
- 7 gün sonra GSC zenginleştirilmiş sonuçları kontrol et

### 6. Düzenli Bakım
- Aylık GSC şema hata raporu
- Ürün/içerik değişikliklerinde şema güncelleme

## İlgili Skill'ler
`schema-automation`, `schema`, `technical-seo`, `gsc`
