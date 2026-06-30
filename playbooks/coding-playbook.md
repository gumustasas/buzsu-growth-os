# Playbook: Kodlama Görevi Uçtan Uca

İlgili skill'ler: `skills/planning/`, `skills/coding/`, `skills/debugging/`, `skills/refactoring/`

## Adımlar

1. **Planlama** (`skills/planning/`) — görevi alt adımlara ayır, varsayımları aç,
   CLAUDE.md sınıflarını belirle, MAJOR adım varsa kullanıcı onayı al.
2. **Kodlama** (`skills/coding/`) — Karpathy 4 prensibi uygulanarak minimum çalışan
   çözüm; cerrahi değişiklik.
3. **Test/doğrulama** — başarı kriteri (terminal çıktısı, URL, kayıt) doğrulandı mı?
4. **Hata varsa** (`skills/debugging/`) — yeniden üret → izole et → kanıtla → çöz.
5. **Temizlik gerekiyorsa** (`skills/refactoring/`) — yalnızca görev kapsamında,
   ayrı onaylı görev olarak.
6. **Çıktı** → `drafts/code/` → görev sonu raporu.

## Sınır

Canlı deploy insan onayı olmadan yapılmaz. Yeni bağımlılık için ayrı MAJOR görev açılır.
