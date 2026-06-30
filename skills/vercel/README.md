# Vercel — Dağıtım ve Gözlemlenebilirlik

## Amaç

Suvesu.com (Vercel) ve Buzsu dashboard'unun build/runtime durumunu okuma, hata teşhisi; canlıya otomatik deploy ETMEDEN.

## İlgili Agent

Yok — automation-agent dış sistem etkileşimlerini kapsıyor; Vercel'e özel okuma adımları bu skill'de.

## İncelenen Dış Kaynaklar

- **Kaynak repo bulunamadı** — İncelenen 18 repo listesinde Vercel'e özel bir kaynak yoktu. Bu ortamda zaten bağlı mcp__Vercel__ araç seti (deployment/build log/runtime log okuma, domain kontrolü) somut referans olarak kullanıldı; içerik bu araçların var olan şemalarına dayanıyor, dış repo kopyalanmadı.

> Kör kopyalama yapılmadı; yalnızca BUZSU bağlamına uyarlanabilir pratik/desen çıkarıldı. Detaylı atıf için bkz. kök dizindeki `reports/external-repo-integration-report.md`.

## Bu Modüldeki Dosyalar

- `skill.md` — Claude Code skill tanımı (ne zaman devreye girer, sorumluluklar, iş akışı)
- `checklist.md` — Uygulama/denetim kontrol listesi
- `prompts.md` — Örnek görev promptları (Türkçe)
- `implementation.md` — BUZSU'ya özel uygulama adımları ve sınırlar

## Onay Notu

Canlıya otomatik yayın kesin yasak (CLAUDE.md madde 1). Bu skill yalnızca okuma/teşhis için tasarlandı.
