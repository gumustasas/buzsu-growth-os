---
name: mcp
description: Buzsu Growth OS için MCP sunucu/araç tasarımı ve mevcut MCP entegrasyonlarının (Airtable, n8n, GitHub, Vercel) doğru ve güvenli kullanımı.
---

# MCP — Model Context Protocol Entegrasyonları

## Ne Zaman Devreye Girer

Kullanıcı bu alanla ilgili bir görev tanımladığında (örn. "mcp ile ilgili ...") veya ilgili agent (Yok — automation-agent dış sistem entegrasyonlarını kapsıyor; MCP-spesifik tasarım kararları bu skill'e referans verir.) kendi alanı dışında bir ihtiyaç tespit edip bu skill'e referans verdiğinde.

## Temel Pratikler

- Araç tasarımında okuma (read) ve yazma (write) araçlarını net ayırmak — Buzsu'da yazma araçları her zaman insan onayı gerektirir
- Her MCP aracının açık, dar kapsamlı bir şeması olması (tek sorumluluk)
- Kritik/yıkıcı işlemler için ayrı, açıkça isimlendirilmiş araçlar (örn. 'delete_*', 'production_*') kullanmak
- Token/kimlik bilgisini hiçbir zaman tool şemasına veya kod içine gömmemek, ortam değişkeninden almak

## Sınır

Yeni MCP sunucusu/dış sistem bağlantısı CLAUDE.md tablosunda 'Dış sistem yazma bağlantısı' → MAJOR, onay gerekir.

Bu skill, CLAUDE.md ve AGENTS.md'deki genel kurmalları (insan onayı, /drafts önce, kör öneri yok) geçersiz kılmaz; onları bu alana özel hale getirir.
