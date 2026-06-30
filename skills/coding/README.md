# Coding — BUZSU Platform Geliştirme Pratikleri

## Amaç

BUZSU'nun CodeIgniter 4 + Next.js + PHP yığınında kodlama kararlarını düzenleyen
temel prensipler ve pratikler. Hata üretmeden önce varsayımları netleştirme,
gereksiz karmaşıklıktan kaçınma ve cerrahi düzeyde küçük değişiklikler yapma.

## İlgili Agent

Yok — tüm kod değişikliklerinde tüm agent'lar bu kuralları uygular.

## İncelenen Dış Kaynaklar

- **multica-ai/andrej-karpathy-skills** — Karpathy ilkelerinden türetilen 4 temel: kod
  yazmadan önce varsayımları aç, basitliği seç, yalnızca istenen yeri değiştir,
  doğrulanabilir başarı kriterleri tanımla. (Lisans: bulunamadı — metin kopyalanmadı,
  yalnızca kavramsal çerçeve BUZSU bağlamına uyarlandı.)
- **vercel-labs/skills** — YAML frontmatter tabanlı skill tanım standardı; CI/CD
  uyumlu non-interactive modlar; proje-kapsamlı vs. global deployment farkı.
  (Lisans: bulunamadı — format deseni referans alındı, içerik uyarlandı.)

> Kör kopyalama yapılmadı. Lisans atıfları için bkz. `reports/external-repo-integration-report.md`.

## Bu Modüldeki Dosyalar

- `skill.md` — ne zaman devreye girer, sorumluluklar, sınır
- `checklist.md` — kodlama öncesi/sonrası kontrol listesi
- `prompts.md` — örnek görev promptları
- `implementation.md` — BUZSU'ya özel uygulama adımları

## Onay Notu

Kod taslakları SAFE PATCH (`drafts/code/`). Canlı siteye uygulama MAJOR, branch + PR gerektirir.
