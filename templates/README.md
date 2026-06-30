# Templates — Yeni Skill Modülü Şablonları

Yeni bir `skills/<alan>/` modülü oluştururken bu şablonlar kullanılır. Format,
`anthropics/skills`, `daymade/claude-code-skills` ve `alirezarezvani/claude-skills`
repolarının README'lerinden gözlemlenen ortak yapıdan (YAML frontmatter + ne-zaman-devreye-girer +
sorumluluklar + sınır) BUZSU'ya uyarlanmıştır. Hiçbir repodan kod/metin birebir kopyalanmamıştır.

## Dosyalar

- `README_TEMPLATE.md` — modül özet dosyası
- `SKILL_TEMPLATE.md` — Claude Code skill tanımı (YAML frontmatter zorunlu)
- `CHECKLIST_TEMPLATE.md` — uygulama/denetim kontrol listesi
- `PROMPTS_TEMPLATE.md` — örnek görev promptları
- `IMPLEMENTATION_TEMPLATE.md` — BUZSU'ya özel uygulama adımları

## Kullanım

Yeni alan eklemek MINOR sınıf bir değişikliktir (CLAUDE.md değişiklik sınıflandırma tablosu —
"Yeni agent ekleme" maddesine benzer şekilde yorumlanır çünkü yeni bir skill alanı,
agent davranışını genişletir). Şablonları kopyalayıp doldurduktan sonra kullanıcıya onay için sun.
