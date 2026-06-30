# CRO — Dönüşüm Oranı Optimizasyonu — BUZSU Uygulama Adımları

## Adımlar

1. Görev dosyasını `tasks/cro/` altında oluştur.
2. İnsan tarafından sağlanan Vercel analytics / Airtable lead verisini analiz et — veri yoksa varsayım yapma, eksik veri olarak raporla.
3. Kod değişikliği önerisini `drafts/code/<özellik>-cro.md` altına branch+PR taslağı olarak yaz.
4. A/B test hipotezini `outputs/recommendations/` altına (onay sonrası) taşınmak üzere taslakla.
5. Görev sonu JSON raporu `tasks/cro/<görev-id>.md` dosyasına eklenir.

## Sınır / Onay Notu

CRO kod önerileri her zaman branch+PR taslağı; canlı sayfaya doğrudan değişiklik yapılmaz (CLAUDE.md madde 3).

## İlgili Dosyalar

- İlgili agent tanımı: `agents/cro-agent.md (mevcut)`
- Bu modülün kontrol listesi: `skills/cro/checklist.md`
- Örnek promptlar: `skills/cro/prompts.md`
