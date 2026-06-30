# Skill Dosya Formatı Kuralları

`anthropics/skills`, `daymade/claude-code-skills` ve `alirezarezvani/claude-skills`
repolarının README'lerinde gözlemlenen ortak format, `templates/SKILL_TEMPLATE.md` dosyasının
temelini oluşturdu. Aşağıdaki kurallar BUZSU'nun 19 skill modülünün tamamında tutarlı şekilde
uygulandı:

1. **YAML frontmatter zorunlu**: `name` (kebab-case) ve `description` (tek cümle, ne zaman
   kullanılacağını açıklayan).
2. **"Ne Zaman Devreye Girer" bölümü**: skill'in otomatik mi yoksa görev bazlı mı
   tetiklendiğini açıklar.
3. **Sınır bölümü**: skill'in karar veremeyeceği alanları ve hangi agent'a/insana
   devredileceğini belirtir — BUZSU'da bu, AGENTS.md'nin "her agent kendi alanı dışında karar
   vermez" kuralının skill seviyesinde karşılığı.
4. **5 dosyalık modül yapısı** (README/skill/checklist/prompts/implementation), dış
   repolarda gözlenmedi — bu BUZSU'ya özgü bir karar (CLAUDE.md'nin onay/sınıflandırma
   modeliyle uyumlu hale getirmek için eklendi).
