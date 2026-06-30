# E-ticaret / Agentic Commerce

## Amaç

Ürün karşılaştırma, sepet hazırlığı ve WhatsApp lead aktarımı için agentic alışveriş katmanı.

## İlgili Agent

agents/commerce-agent.md (mevcut)

## İncelenen Dış Kaynaklar

- **ComposioHQ/awesome-claude-skills** — Shopify Automation skill deseni: ürün/sipariş/müşteri/envanter yönetimi iş akışı yapısı — Buzsu'nun kendi e-ticaret altyapısına (Shopify değil, özel CI4) kavramsal olarak uyarlandı, kod kopyalanmadı.
- **nextlevelbuilder/ui-ux-pro-max-skill** — Ürün-tipi eşleştirme matrisi (lüks vs. bütçe, kategori bazlı tasarım kuralı) — Buzsu'da TDS değeri → ürün segmenti eşleştirmesine kavramsal temel oluşturdu.

> Kör kopyalama yapılmadı; yalnızca BUZSU bağlamına uyarlanabilir pratik/desen çıkarıldı. Detaylı atıf için bkz. kök dizindeki `reports/external-repo-integration-report.md`.

## Bu Modüldeki Dosyalar

- `skill.md` — Claude Code skill tanımı (ne zaman devreye girer, sorumluluklar, iş akışı)
- `checklist.md` — Uygulama/denetim kontrol listesi
- `prompts.md` — Örnek görev promptları (Türkçe)
- `implementation.md` — BUZSU'ya özel uygulama adımları ve sınırlar

## Onay Notu

KESİN SINIR: ödeme veya sipariş tamamlama YAPILAMAZ. Yeni dış sistem yazma bağlantısı (ödeme entegrasyonu vb.) MAJOR sınıf, ayrıca yasak liste kapsamında.
