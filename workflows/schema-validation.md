# Workflow: Schema Doğrulama

## Amaç
JSON-LD şema değişikliklerini canlıya almadan önce doğrulama adımlarını tanımlar.

## Tetikleyici
- /drafts/schema/ altına yeni şema eklendi
- Mevcut şemada değişiklik yapıldı
- GSC şema hatası bildirildi

## Adımlar

1. **JSON sözdizimi** — `python3 -m json.tool dosya.jsonld` ile hata yok mu?
2. **Google Rich Results Test** — richresults.google.com; zorunlu alanlar dolu mu?
3. **schema.org/validator** — validator.schema.org; @type ve property uyumluluğu
4. **Doğrulama raporu** — /drafts/schema/validation-[slug]-[tarih].md kaydet
5. **İnsan onayı** — Raporu sun; onay bekle
6. **Entegrasyon** — Onay sonrası developer CI3.7.1 application/views/ dosyasına ekler
7. **GSC takip** — 7 gün sonra Zenginleştirilmiş Sonuçlar kontrolü

## Sorumluluk
Üretim: seo-agent / schema-automation skill
Doğrulama: seo-agent
Entegrasyon: developer (insan onaylı)

## İlgili Dosyalar
`templates/jsonld-template.md`, `knowledge/schema-patterns.md`
