# GEO — Generative Engine Optimization — BUZSU Uygulama Adımları

## Adımlar

1. Görev dosyasını `tasks/geo/` altında oku/oluştur.
2. Hedef sorguları Serper AI snippet modunda çalıştır; rakip alıntı yapısını WebFetch ile incele.
3. GEO uyumlu içerik şablonunu `drafts/content/geo-<konu>-<tarih>.md` altına yaz.
4. Entity eşleştirmelerini `tasks/geo/entity-map.md` dosyasına ekle (entity-seo skill ile çakışmayı önlemek için entity-seo dosyasına referans ver, kopyalama).
5. Schema ihtiyacı varsa schema-agent'a, entity tutarlılığı için entity-seo skill'ine görev/referans üret.
6. Görev sonu JSON raporunu `tasks/geo/<görev-id>.md` dosyasına ekle.

## Sınır / Onay Notu

GEO içerik taslakları SAFE PATCH; robots.txt/llms.txt gibi teknik dosya değişiklikleri kod değişikliği sayılır → branch+PR, MAJOR.

## İlgili Dosyalar

- İlgili agent tanımı: `agents/geo-agent.md (mevcut)`
- Bu modülün kontrol listesi: `skills/geo/checklist.md`
- Örnek promptlar: `skills/geo/prompts.md`
