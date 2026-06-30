# GitHub — Branch, PR ve İnceleme Akışı

## Amaç

buzsu-growth-os ve buzsu-site repolarında branch yönetimi, commit/PR disiplini ve otomatikleştirilmiş inceleme akışı.

## İlgili Agent

Yok — tüm agent'lar kod önerilerini bu akışa göre teslim eder (AGENTS.md orkestrasyon kuralı 5).

## İncelenen Dış Kaynaklar

- **ykdojo/claude-code-tips** — Push işlemlerinin pull'dan daha riskli olduğu için manuel onayla yapılması önerisi; git worktree ile paralel branch geliştirme; PR incelemesi için gh CLI ile veri çekip konuşmalı şekilde gözden geçirme deseni.
- **daymade/claude-code-skills** — 'github-ops' bağımsız skill örneği — PR/issue otomasyonu için ayrı bir skill olarak paketlenmesi pratiği referans alındı.
- **Cranot/claude-code-guide** — Hooks ile commit mesajı/format zorunluluğu fikri; sub-agent'ların PR inceleme gibi paralel görevler için kullanımı.

> Kör kopyalama yapılmadı; yalnızca BUZSU bağlamına uyarlanabilir pratik/desen çıkarıldı. Detaylı atıf için bkz. kök dizindeki `reports/external-repo-integration-report.md`.

## Bu Modüldeki Dosyalar

- `skill.md` — Claude Code skill tanımı (ne zaman devreye girer, sorumluluklar, iş akışı)
- `checklist.md` — Uygulama/denetim kontrol listesi
- `prompts.md` — Örnek görev promptları (Türkçe)
- `implementation.md` — BUZSU'ya özel uygulama adımları ve sınırlar

## Onay Notu

Push ve PR açma her zaman kullanıcı onayı/talebi gerektirir; bu skill mevcut CLAUDE.md kurallarını GitHub iş akışı diline çevirir, yenisini eklemez.
