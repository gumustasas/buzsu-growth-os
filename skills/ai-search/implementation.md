# AI Search Optimizasyonu — Uygulama Adımları

## Ön Koşul
GSC erişimi ve mevcut site taraması tamamlanmış olmalı.

## Adımlar

1. **Mevcut durum analizi** — GSC'de AI Overview izlenimlerini kontrol et.
2. **LLM doğruluk testi** — ChatGPT ve Perplexity'de BUZSU sorgusu at; yanlış bilgi var mı?
3. **İçerik boşluk haritası** — Konuşma sorgularına yanıt vermeyen sayfaları listele.
4. **Özet paragraf ekleme** — Her hedef sayfaya AI snippet formatında giriş yaz → /drafts.
5. **FAQ bölümü** — Minimum 5 S&C ekle; FAQPage schema ile işaretle.
6. **llms.txt taslağı** — /drafts/llms-txt-v1.md oluştur.
7. **Schema güncelleme** — schema-automation skill ile koordineli çalış.
8. **Onay ve yayın** — Tüm değişiklikler /drafts üzerinden insan onayına sunulur.
9. **İzleme** — 4 hafta sonra GSC AI Overview izlenimlerini ölç.

## Onay Notu
Adım 8 öncesi uygulama başlamaz. Canlı siteye doğrudan yazma yapılmaz.

## İlgili Skill'ler
`skills/llms`, `skills/schema-automation`, `skills/entity-seo`, `skills/gsc`, `skills/aeo-ai-search`
