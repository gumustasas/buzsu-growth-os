# Workflow: Entity Denetimi

## Amaç
BUZSU entity'lerinin Google Knowledge Graph'ta doğru, eksiksiz ve tutarlı
görünmesini aylık kontrol etmek.

## Periyot
Aylık

## Tetikleyici
- Aylık rutin entity denetimi
- Knowledge Panel'de hata tespit edildi
- Yeni ürün veya hizmet eklendi
- AI'da yanlış BUZSU bilgisi döndüğü raporlandı

## Adımlar

1. **Entity listesi güncelle** — knowledge-graph/entity-types.md referans al
2. **Knowledge Panel kontrolü** — "Buzsu" sorgusu at; bilgi doğru mu?
3. **sameAs denetimi** — Google Business Profile, sosyal medya bağlantıları aktif mi?
4. **Schema denetimi** — Organization/LocalBusiness şeması güncel mi? → schema-validation workflow
5. **LLM doğruluk testi** — ChatGPT/Perplexity'de BUZSU sorgusu at
6. **Raporlama** — /drafts/entity-audit-[YYYY-MM].md oluştur
7. **Task oluşturma** — Sorunlar için task dosyası aç

## Sorumluluk
Denetim: seo-agent / entity-seo skill
Şema güncelleme: schema-automation skill
Onay: insan

## İlgili Dosyalar
`knowledge-graph/entity-types.md`, `knowledge-graph/relationship-types.md`
