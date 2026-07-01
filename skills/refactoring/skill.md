---
name: refactoring
description: Davranış değiştirmeden, yalnızca görev kapsamında yapısal iyileştirme — spekülatif soyutlama ve komşu kod değişikliği yasak.
---

# Refactoring

## Ne Zaman Devreye Girer

"Kodu temizle", "bu fonksiyonu refactor et", "tekrar eden kodu ortaklaştır" veya
"daha okunabilir hale getir" içeren görevlerde.

## Temel Pratikler

- **Yalnızca istenen kapsamı değiştir** — görev "X fonksiyonunu düzenle" diyorsa
  Y'ye dokunma; komşu temizlik fırsatı görsen bile ayrı görev aç.
- **Davranış değişmemeli** — refactoring sonrası fonksiyon aynı girdi → aynı çıktı üretiyor mu?
- **Soyutlama eşiği: üçten önce değil** — 2 benzer kod bloğu soyutlanmaz; 3+ olunca değerlendir.
- **Mevcut test/doğrulama korunur** — var olan doğrulama mekanizması çıkarılmaz.
- **CI3.7.1 + Next.js konvansiyonu korunur** — framework'ün kendi stilinden sapılmaz.

## Sınır

Refactoring, yeni özellik ekleme fırsatı değil. Yeni bağımlılık gerekiyorsa MAJOR.
Architecture-level yeniden yapı (servis ayırma, veritabanı şema değişikliği) MAJOR.
