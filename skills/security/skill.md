---
name: security
description: Buzsu Growth OS reposu ve buzsu-site kod tabanı için savunma amaçlı güvenlik denetimi.
---

# Güvenlik Denetimi

## Ne Zaman Devreye Girer

Kullanıcı bu alanla ilgili bir görev tanımladığında (örn. "güvenlik denetimi ile ilgili ...") veya ilgili agent (Yok — skills/php/ ve skills/codeigniter4/ ile birlikte çalışır. Ayrı bir 'security-agent' eklenmesi MINOR, sonraki adımlarda önerilecek.) kendi alanı dışında bir ihtiyaç tespit edip bu skill'e referans verdiğinde.

## Temel Pratikler

- OWASP Top 10 odaklı kod incelemesi (SQLi, XSS, SSRF, kırık erişim kontrolü)
- API güvenliği: rate limiting, input validation, kimlik doğrulama token ömrü
- Kimlik bilgisi yönetimi: secrets asla repoya yazılmaz (CLAUDE.md ile birebir uyumlu)
- Bağımlılık zafiyet taraması: composer/npm audit sonuçlarının raporlanması (otomatik güncelleme yapılmaz)
- Bulgu önceliklendirme: kritiklik (CVSS benzeri basit Yüksek/Orta/Düşük) ile sıralama

## Sınır

Bu kapsamda yalnızca savunma amaçlı, salt-okunur denetim yapılır; otomatik düzeltme/patch uygulama yoktur.

Bu skill, CLAUDE.md ve AGENTS.md'deki genel kurmalları (insan onayı, /drafts önce, kör öneri yok) geçersiz kılmaz; onları bu alana özel hale getirir.
