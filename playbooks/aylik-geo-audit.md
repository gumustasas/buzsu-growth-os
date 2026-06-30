# Playbook: Aylık GEO/AEO Denetimi

İlgili skill'ler: `skills/geo/`, `skills/aeo-ai-search/`, `skills/entity-seo/`, `skills/content/`

## Adımlar

1. **AI Overview/Copilot taraması** (`skills/geo/`) — hedef sorgular için Serper AI snippet
   modunda alıntı durumu kontrolü.
2. **Doğrudan cevap uygunluğu** (`skills/aeo-ai-search/`) — 120-180 kelime kuralı ve 3 zorunlu
   uygunluk kapısı (Googlebot erişimi, noindex yok, nosnippet yok) kontrolü.
3. **Entity tutarlılığı** (`skills/entity-seo/`) — marka/ürün bahsi tutarlılığı,
   `knowledge-graph/` ile çapraz kontrol.
4. **İçerik boşluğu raporu** (`skills/content/`) — alıntılanmayan ama alıntılanması beklenen
   sayfalar listesi.
5. Bulgular `tasks/geo/entity-map.md` ve `drafts/content/geo-audit-<ay>.md` altına yazılır.
6. İnsan onayından sonra `outputs/reports/` altına taşınır.

## Sıklık

Aylık. `knowledge/geo-scoring-frameworks.md`'deki ortak kategoriler kontrol listesi olarak
kullanılır; otomatik puan üretilmez.
