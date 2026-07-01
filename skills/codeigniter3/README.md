# CodeIgniter 3.7.1 — Platform Geliştirme

## Amaç

Buzsu.com.tr'nin (gumustasas/buzsu prototipi) CI3.7.1 tabanlı kod tabanında güvenli ve sürdürülebilir geliştirme pratikleri.

## İlgili Agent

Yok — kod değişikliği önerileri otomatik olarak ilgili alan agent'ı (cro-agent, schema-agent) üzerinden drafts/code/'a yazılıyor. Ayrı bir 'platform-agent' eklenmesi MINOR, şu an önerilmiyor.

## İncelenen Dış Kaynaklar

- **Kaynak repo bulunamadı** — İncelenen 18 repo listesinde CodeIgniter3.7.1'e özel bir kaynak yoktu. Bu modülün içeriği genel CodeIgniter 3 resmi dokümantasyon pratiği ve addyosmani/agent-skills'teki 'framework best practices' prensibinin (incremental, test-first, framework idiyomlarına sadık kalma) genel uyarlamasıdır — kör kopyalama yapılmadı.

> Kör kopyalama yapılmadı; yalnızca BUZSU bağlamına uyarlanabilir pratik/desen çıkarıldı. Detaylı atıf için bkz. kök dizindeki `reports/external-repo-integration-report.md`.

## Bu Modüldeki Dosyalar

- `skill.md` — Claude Code skill tanımı (ne zaman devreye girer, sorumluluklar, iş akışı)
- `checklist.md` — Uygulama/denetim kontrol listesi
- `prompts.md` — Örnek görev promptları (Türkçe)
- `implementation.md` — BUZSU'ya özel uygulama adımları ve sınırlar

## Onay Notu

Kod değişikliği = branch + PR önerisi (CLAUDE.md madde 3). Yeni composer paketi eklenmesi MAJOR, yasaklar listesinde.
