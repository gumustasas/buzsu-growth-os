# Schema Otomasyonu — Uygulama Adımları

## Adımlar

1. **Şema envanteri** — Sitedeki mevcut JSON-LD'leri listele; eksik/hatalı olanları belirle.
2. **Şablon seçimi** — templates/jsonld-template.md kullanarak uygun şema tipi seç.
3. **Taslak üretimi** — Her sayfa için /drafts/schema/[slug].jsonld oluştur.
4. **Doğrulama** — Google Rich Results Test + schema.org/validator ile kontrol et.
5. **GSC izleme** — Mevcut zenginleştirilmiş sonuç hatalarını not et.
6. **Onay** — Taslakları insan onayına sun.
7. **Entegrasyon** — Onaylanan şemaları CodeIgniter 4 view'larına ekle (developer).
8. **Doğrulama sonrası takip** — 7 gün sonra GSC'de şema hata sayısını kontrol et.

## Onay Notu
Adım 7 canlı site değişikliğidir. MINOR sınıf, onay zorunlu.

## İlgili Skill'ler
`skills/schema`, `skills/ai-search`, `skills/technical-seo`, `skills/gsc`
