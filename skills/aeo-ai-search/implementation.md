# AEO — Answer Engine Optimization / AI Arama — BUZSU Uygulama Adımları

## Adımlar

1. Görev dosyasını `tasks/seo/` veya `tasks/geo/` altında ilgili alt görev olarak işle (ayrı agent atanana kadar geo-agent kapsamında).
2. Hedef soruları topla, Serper AI mode ve manuel platform testleriyle mevcut durumu tespit et.
3. AEO uyumlu içerik/FAQ taslağını `drafts/content/aeo-<konu>-<tarih>.md` altına yaz.
4. FAQ schema ihtiyacını schema-agent'a görev olarak devret.
5. Görev sonu JSON raporunu ilgili görev dosyasına ekle.

## Sınır / Onay Notu

İçerik taslağı SAFE PATCH. Yeni 'aeo-agent' tanımı MINOR — şu an önerilmiyor, geo-agent kapsamında yürütülmesi tavsiye edildi.

## İlgili Dosyalar

- İlgili agent tanımı: `Yok — geo-agent'a yakın ama ayrı kapsam. Yeni agent eklenmesi MINOR sınıf, onay gerektirir (bkz. rapor 'Sonraki Yapılacaklar').`
- Bu modülün kontrol listesi: `skills/aeo-ai-search/checklist.md`
- Örnek promptlar: `skills/aeo-ai-search/prompts.md`
