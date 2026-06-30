# Playbook: Refactoring Görevi Uçtan Uca

İlgili skill'ler: `skills/refactoring/`, `skills/coding/`, `skills/debugging/`

## Adımlar

1. **Kapsam netleştir** (`skills/planning/`) — tam olarak hangi dosyalar, neden.
   Kapsam dışı iyileştirmeleri listele, ayrı görev olarak kaydet.
2. **Davranış testi tasarla** — değişiklik sonrası doğrulama yöntemi.
3. **Surgical refactor** (`skills/refactoring/`) — yalnızca kapsam içi değişiklik;
   soyutlama eşiği: 3+ kullanım yeri.
4. **Davranışı doğrula** — aynı girdi → aynı çıktı.
5. **Taslak** → `drafts/code/` → görev sonu raporu.

## Sınır

Architecture-level yeniden yapı (servis ayırma, şema değişikliği) ayrı MAJOR görevdir.
