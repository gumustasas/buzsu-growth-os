# PHP — Genel Backend Güvenliği ve Kalitesi — BUZSU Uygulama Adımları

## Adımlar

1. Bulguyu `tasks/automation/` veya ilgili alan görev dosyasına ekle (bu modülün kendi tasks/ alt klasörü yok, mevcut yapıya entegre olur).
2. Önerilen düzeltmeyi `drafts/code/<özellik>-security.md` altına branch+PR taslağı olarak yaz.
3. Kritik bulgular (canlı zafiyet şüphesi) için kullanıcıyı hemen bilgilendir, otomatik düzeltme yapma.

## Sınır / Onay Notu

Güvenlik düzeltmeleri her zaman branch+PR; kritik/acil bulgular insana hemen raporlanır, beklenmez.

## İlgili Dosyalar

- İlgili agent tanımı: `Yok — skills/security/ ve skills/codeigniter3/ ile birlikte kullanılır.`
- Bu modülün kontrol listesi: `skills/php/checklist.md`
- Örnek promptlar: `skills/php/prompts.md`
