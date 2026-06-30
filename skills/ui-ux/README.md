# UI/UX — Tasarım Sistemi ve Erişilebilirlik

## Amaç

Buzsu ürün sayfaları ve dashboard için tutarlı, güven odaklı, erişilebilir tasarım kararları.

## İlgili Agent

Yok — cro-agent ile yakın çalışır; tasarım kararları cro-agent'ın çıktısına girdi sağlar.

## İncelenen Dış Kaynaklar

- **nextlevelbuilder/ui-ux-pro-max-skill** — En zengin kaynak. Teslimat öncesi denetim listesi (emoji ikon yerine SVG, kontrast 4.5:1, fokus durumu, cursor-pointer, 150-300ms geçiş, prefers-reduced-motion, 375/768/1024/1440 responsive test); ürün-tipi eşleştirme matrisi ve sektöre özgü anti-pattern kütüphanesi kavramı (örn. 'bankacılıkta AI mor/pembe gradyan kullanma') — su arıtma/sağlık ürünleri için 'agresif satış pop-up'ı yerine güven rozeti' anti-pattern'ine uyarlandı.
- **addyosmani/agent-skills** — Frontend UI Engineering: komponent mimarisi, tasarım sistemi, responsive tasarım, WCAG 2.1 AA uyumu prensipleri.

> Kör kopyalama yapılmadı; yalnızca BUZSU bağlamına uyarlanabilir pratik/desen çıkarıldı. Detaylı atıf için bkz. kök dizindeki `reports/external-repo-integration-report.md`.

## Bu Modüldeki Dosyalar

- `skill.md` — Claude Code skill tanımı (ne zaman devreye girer, sorumluluklar, iş akışı)
- `checklist.md` — Uygulama/denetim kontrol listesi
- `prompts.md` — Örnek görev promptları (Türkçe)
- `implementation.md` — BUZSU'ya özel uygulama adımları ve sınırlar

## Onay Notu

Tasarım önerileri SAFE PATCH (taslak); uygulanması kod değişikliği olduğundan branch+PR, MAJOR.
