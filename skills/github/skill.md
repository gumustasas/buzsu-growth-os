---
name: github
description: buzsu-growth-os ve buzsu-site repolarında branch yönetimi, commit/PR disiplini ve otomatikleştirilmiş inceleme akışı.
---

# GitHub — Branch, PR ve İnceleme Akışı

## Ne Zaman Devreye Girer

Kullanıcı bu alanla ilgili bir görev tanımladığında (örn. "github ile ilgili ...") veya ilgili agent (Yok — tüm agent'lar kod önerilerini bu akışa göre teslim eder (AGENTS.md orkestrasyon kuralı 5).) kendi alanı dışında bir ihtiyaç tespit edip bu skill'e referans verdiğinde.

## Temel Pratikler

- Her kod değişikliği önce feature branch'te, sonra PR ile — main'e doğrudan push yok (CLAUDE.md madde 3)
- Commit mesajı formatı: `<tip>: <özet>` (CLAUDE.md'de tanımlı; bu skill yalnızca GitHub iş akışı kısmını kapsar, format tekrarlanmaz)
- Push işlemi pull'dan daha riskli kabul edilir — açık kullanıcı onayı olmadan yapılmaz
- PR açmak için açık kullanıcı talebi gerekir (AGENTS.md/CLAUDE.md ile uyumlu)
- Büyük/çok dosyalı değişikliklerde git worktree ile paralel inceleme imkanı değerlendirilebilir

## Sınır

Push ve PR açma her zaman kullanıcı onayı/talebi gerektirir; bu skill mevcut CLAUDE.md kurallarını GitHub iş akışı diline çevirir, yenisini eklemez.

Bu skill, CLAUDE.md ve AGENTS.md'deki genel kurmalları (insan onayı, /drafts önce, kör öneri yok) geçersiz kılmaz; onları bu alana özel hale getirir.
