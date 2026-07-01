---
name: codeigniter3
description: Buzsu.com.tr'nin (gumustasas/buzsu prototipi) CI3.7.1 tabanlı kod tabanında güvenli ve sürdürülebilir geliştirme pratikleri.
---

# CodeIgniter 3.7.1 — Platform Geliştirme

## Ne Zaman Devreye Girer

Kullanıcı bu alanla ilgili bir görev tanımladığında (örn. "codeigniter 3 ile ilgili ...") veya ilgili agent (Yok — kod değişikliği önerileri otomatik olarak ilgili alan agent'ı (cro-agent, schema-agent) üzerinden drafts/code/'a yazılıyor. Ayrı bir 'platform-agent' eklenmesi MINOR, şu an önerilmiyor.) kendi alanı dışında bir ihtiyaç tespit edip bu skill'e referans verdiğinde.

## Temel Pratikler

- Query Builder kullanımı: ham SQL yerine parametreli sorgular (SQL injection önleme)
- CSRF koruması: form gönderimlerinde CI3.7.1'in yerleşik CSRF korumasının aktif tutulması
- .env üzerinden yapılandırma: kimlik bilgisi/anahtar asla kod içine yazılmaz (CLAUDE.md güvenlik kuralı ile birebir uyumlu)
- Route caching ve filtre katmanı: performans ve yetkilendirme ayrımı
- Validation kütüphanesi: kullanıcı girdisi her zaman CI3.7.1 form_validation ile doğrulanır

## Sınır

Kod değişikliği = branch + PR önerisi (CLAUDE.md madde 3). Yeni composer paketi eklenmesi MAJOR, yasaklar listesinde.

Bu skill, CLAUDE.md ve AGENTS.md'deki genel kurmalları (insan onayı, /drafts önce, kör öneri yok) geçersiz kılmaz; onları bu alana özel hale getirir.
