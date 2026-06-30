# Entity SEO — Yapılandırılmış Varlık Optimizasyonu

## Amaç

Buzsu/Suvesu'nun ürün, teknoloji, kirletici ve marka varlıklarının arama motorları ve AI sistemleri tarafından tutarlı bir 'entity' olarak tanınmasını sağlamak.

## İlgili Agent

Yok — knowledge-graph/ altyapısını kullanır; eeat-agent ve geo-agent ile kesişir. Yeni agent önerisi MINOR.

## İncelenen Dış Kaynaklar

- **zubair-trabzada/geo-seo-claude** — Marka bahsi stratejisi: AI görünürlüğü backlink'ten çok marka/entity bahsiyle korele (3x). Entity authority sinyalleri AEO/GEO skorlamasının parçası.
- **Repo içi: knowledge-graph/** — Mevcut entity yapısı (entities, brands, products, components, technologies, minerals, contaminants, faq, locations) entity-seo skill'inin temelini oluşturuyor; bu skill onu SEO/GEO bakış açısıyla formelleştirir, tekrarlamaz.

> Kör kopyalama yapılmadı; yalnızca BUZSU bağlamına uyarlanabilir pratik/desen çıkarıldı. Detaylı atıf için bkz. kök dizindeki `reports/external-repo-integration-report.md`.

## Bu Modüldeki Dosyalar

- `skill.md` — Claude Code skill tanımı (ne zaman devreye girer, sorumluluklar, iş akışı)
- `checklist.md` — Uygulama/denetim kontrol listesi
- `prompts.md` — Örnek görev promptları (Türkçe)
- `implementation.md` — BUZSU'ya özel uygulama adımları ve sınırlar

## Onay Notu

knowledge-graph/ içine doğrudan yeni entity eklemek MINOR sınıf sayılır (mevcut agent davranışını/veri yapısını genişletme) — önce drafts/'a yazılır, onay sonrası taşınır.
