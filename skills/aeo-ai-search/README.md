# AEO — Answer Engine Optimization / AI Arama

## Amaç

Doğrudan soru-cevap üreten AI arama deneyimlerinde (ChatGPT, Perplexity, Google AI Overview, sesli asistanlar) Buzsu/Suvesu içeriğinin doğrudan cevap olarak seçilmesini hedeflemek. GEO'dan farkı: GEO 'alıntılanma', AEO 'doğrudan cevap olma' odaklıdır.

## İlgili Agent

Yok — geo-agent'a yakın ama ayrı kapsam. Yeni agent eklenmesi MINOR sınıf, onay gerektirir (bkz. rapor 'Sonraki Yapılacaklar').

## İncelenen Dış Kaynaklar

- **vishalmdi/goog-geo** — 3 zorunlu uygunluk kapısı (Googlebot erişimi, noindex yok, nosnippet yok) ve 100 puanlık skorlama modeli AEO denetimine de uygulanabilir.
- **zubair-trabzada/geo-seo-claude** — Platform-spesifik optimizasyon ihtiyacı: domainlerin yalnızca %11'i birden fazla AI platformda aynı anda görünüyor — bu yüzden platforma özel format gerekir.
- **AndreasH96/seo-geo-consultant** — 4 modlu çalışma yapısı (denetim / optimizasyon / teknik uygulama / AI arama stratejisi) AEO iş akışına temel oluşturdu.

> Kör kopyalama yapılmadı; yalnızca BUZSU bağlamına uyarlanabilir pratik/desen çıkarıldı. Detaylı atıf için bkz. kök dizindeki `reports/external-repo-integration-report.md`.

## Bu Modüldeki Dosyalar

- `skill.md` — Claude Code skill tanımı (ne zaman devreye girer, sorumluluklar, iş akışı)
- `checklist.md` — Uygulama/denetim kontrol listesi
- `prompts.md` — Örnek görev promptları (Türkçe)
- `implementation.md` — BUZSU'ya özel uygulama adımları ve sınırlar

## Onay Notu

İçerik taslağı SAFE PATCH. Yeni 'aeo-agent' tanımı MINOR — şu an önerilmiyor, geo-agent kapsamında yürütülmesi tavsiye edildi.
