# Schema.org Yapılandırılmış Veri

## Amaç

Product, FAQ, HowTo, BreadcrumbList, LocalBusiness, Organization schema markup üretimi ve doğrulaması.

## İlgili Agent

agents/schema-agent.md (mevcut)

## İncelenen Dış Kaynaklar

- **AndreasH96/seo-geo-consultant** — JSON-LD şablon seti: Organization, Article, FAQPage ve e-ticaret odaklı yapılar; Next.js App Router'a özel uygulama örnekleri (BUZSU dashboard Next.js 14 kullandığı için doğrudan uygulanabilir).
- **zubair-trabzada/geo-seo-claude** — E-ticaret şema şablonları (organization, local business, article) GEO skorlamasının 'structured data' kategorisiyle (%10 ağırlık) ilişkilendirildi.

> Kör kopyalama yapılmadı; yalnızca BUZSU bağlamına uyarlanabilir pratik/desen çıkarıldı. Detaylı atıf için bkz. kök dizindeki `reports/external-repo-integration-report.md`.

## Bu Modüldeki Dosyalar

- `skill.md` — Claude Code skill tanımı (ne zaman devreye girer, sorumluluklar, iş akışı)
- `checklist.md` — Uygulama/denetim kontrol listesi
- `prompts.md` — Örnek görev promptları (Türkçe)
- `implementation.md` — BUZSU'ya özel uygulama adımları ve sınırlar

## Onay Notu

Şema taslağı SAFE PATCH; canlı siteye uygulanması (patches/buzsu-site/ → PR) MAJOR ve onay gerektirir.
