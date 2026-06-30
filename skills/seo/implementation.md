# SEO — Arama Motoru Optimizasyonu — BUZSU Uygulama Adımları

## Adımlar

1. Görev dosyasını `tasks/seo/` altında oluştur veya güncelle.
2. Serper ile hedef SERP sorgularını çalıştır; sonucu `tasks/seo/` altına ham veri olarak ekleme — yalnızca yorumlanmış bulguyu yaz.
3. Bulguları `drafts/content/seo-brief-<tarih>.md` formatında yaz.
4. Kod/meta değişikliği gerekiyorsa `drafts/code/<özellik>-seo.md` altına branch+PR taslağı yaz; canlıya doğrudan dokunma.
5. Schema, GEO veya CRO kapsamına giren bulguları ilgili agent'a görev olarak devret (seo-agent kendi alanı dışında karar vermez).
6. Görev sonunda JSON formatında özet raporu `tasks/seo/<görev-id>.md` dosyasına ekle.

## Sınır / Onay Notu

SEO içerik/kod önerileri SAFE PATCH (taslak); canlı siteye uygulanması MAJOR ve insan onayı gerektirir.

## İlgili Dosyalar

- İlgili agent tanımı: `agents/seo-agent.md (mevcut)`
- Bu modülün kontrol listesi: `skills/seo/checklist.md`
- Örnek promptlar: `skills/seo/prompts.md`
