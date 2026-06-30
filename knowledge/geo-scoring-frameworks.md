# GEO Skorlama Modelleri Karşılaştırması

Üç farklı dış repo, üretken arama motoru optimizasyonu için birbirinden bağımsız skorlama
modelleri öneriyor. Hiçbiri birebir alınmadı; ortak desenler BUZSU GEO denetim sürecine
(`skills/geo/checklist.md`) damıtıldı.

| Kaynak | Model | Kategoriler |
|---|---|---|
| zubair-trabzada/geo-seo-claude | 6 kategori, ağırlıklı % | Citability %25, marka otoritesi %20, içerik kalitesi %20, teknik temel %15, structured data %10, platform optimizasyonu %10 |
| vishalmdi/goog-geo | 100 puan, 5 kategori + 3 zorunlu kapı | Google AI uygunluğu 25p, yardımcı/özgün içerik 25p, içerik organizasyonu 20p, teknik yapı 15p, entity sinyalleri 15p; kapılar: Googlebot erişimi, noindex yok, nosnippet yok |
| AndreasH96/seo-geo-consultant | 4 modlu süreç (skorsuz) | Denetim / optimizasyon / teknik uygulama / AI arama stratejisi |

## Ortak Desenler (BUZSU'ya Aktarılan)

- Üç modelde de **structured data / teknik temel** ayrı bir kategori — `skills/schema/` ile kesişiyor.
- İki modelde **entity/marka otoritesi** önemli ağırlık taşıyor — `skills/entity-seo/` ile kesişiyor.
- Princeton GEO araştırması (KDD 2024, vishalmdi/goog-geo README'sinde atıfla): kaynak gösterme
  alıntı oranını +%40, istatistik kullanımı +%37 artırıyor — `skills/geo/prompts.md`'de pratik kurala çevrildi.

## Kullanılmayan Kısımlar

Üç modelin tam puanlama formülleri/ağırlıkları BUZSU için **doğrudan uygulanmadı** çünkü
hiçbiri BUZSU'nun gerçek SERP/AI Overview verisiyle doğrulanmadı (CLAUDE.md madde 4: "Kör
öneri yapılmaz"). Skorlama yalnızca denetim checklist'i olarak kullanılacak, otomatik puan
üretilmeyecek.
