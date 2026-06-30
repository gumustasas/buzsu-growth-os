# Schema.org Yapılandırılmış Veri — BUZSU Uygulama Adımları

## Adımlar

1. Görev dosyasını `tasks/schema/` altında oluştur/güncelle.
2. Ürün/SSS/rehber verisini insan onaylı kaynaktan (Airtable Products tablosu, mevcut site içeriği) al — uydurma yapma.
3. Şema taslağını `drafts/schema/<sayfa>-<tip>.md` altına JSON-LD bloğu olarak yaz.
4. Rich Results Test sonucunu (manuel kontrol notları) taslağa ekle.
5. Onay sonrası `patches/buzsu-site/` altına uygulanabilir patch olarak taşınabilir (insan kararı).
6. Görev sonu JSON raporu `tasks/schema/<görev-id>.md` dosyasına eklenir.

## Sınır / Onay Notu

Şema taslağı SAFE PATCH; canlı siteye uygulanması (patches/buzsu-site/ → PR) MAJOR ve onay gerektirir.

## İlgili Dosyalar

- İlgili agent tanımı: `agents/schema-agent.md (mevcut)`
- Bu modülün kontrol listesi: `skills/schema/checklist.md`
- Örnek promptlar: `skills/schema/prompts.md`
