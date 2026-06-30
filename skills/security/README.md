# Güvenlik Denetimi

## Amaç

Buzsu Growth OS reposu ve buzsu-site kod tabanı için savunma amaçlı güvenlik denetimi.

## İlgili Agent

Yok — skills/php/ ve skills/codeigniter4/ ile birlikte çalışır. Ayrı bir 'security-agent' eklenmesi MINOR, sonraki adımlarda önerilecek.

## İncelenen Dış Kaynaklar

- **mukul975/Anthropic-Cybersecurity-Skills** — 817 yapılandırılmış güvenlik skill'i, 29 domain. BUZSU'ya doğrudan uygulanabilir kategoriler: Web Application Security (42 skill — OWASP Top 10: SQLi, XSS, SSRF), API Security (28 skill — REST hardening), IAM (37 skill — kimlik doğrulama sertleştirme), Vulnerability Management (25 skill — taramayı önceliklendirme). Her skill prerequisite + adım adım uygulama + doğrulama formatı izliyor; bu format checklist.md yapısına taşındı.

> Kör kopyalama yapılmadı; yalnızca BUZSU bağlamına uyarlanabilir pratik/desen çıkarıldı. Detaylı atıf için bkz. kök dizindeki `reports/external-repo-integration-report.md`.

## Bu Modüldeki Dosyalar

- `skill.md` — Claude Code skill tanımı (ne zaman devreye girer, sorumluluklar, iş akışı)
- `checklist.md` — Uygulama/denetim kontrol listesi
- `prompts.md` — Örnek görev promptları (Türkçe)
- `implementation.md` — BUZSU'ya özel uygulama adımları ve sınırlar

## Onay Notu

Bu kapsamda yalnızca savunma amaçlı, salt-okunur denetim yapılır; otomatik düzeltme/patch uygulama yoktur.
