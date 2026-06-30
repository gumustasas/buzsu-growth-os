---
name: geo
description: Google AI Overview, Bing Copilot, ChatGPT ve Perplexity gibi üretken arama motorlarında Buzsu/Suvesu içeriğinin alıntılanma olasılığını artırmak.
---

# GEO — Generative Engine Optimization

## Ne Zaman Devreye Girer

Kullanıcı bu alanla ilgili bir görev tanımladığında (örn. "geo ile ilgili ...") veya ilgili agent (agents/geo-agent.md (mevcut)) kendi alanı dışında bir ihtiyaç tespit edip bu skill'e referans verdiğinde.

## Temel Pratikler

- Citability blokları: 120-180 kelimelik, kendi başına anlamlı, doğrudan soruya cevap veren paragraflar
- Marka bahsi sinyalleri: 'Buzsu.com.tr'ye göre...' atıf formatı; üçüncü taraf bahisleri (basın, forum, review) takibi
- AI crawler erişim denetimi: robots.txt içinde GPTBot, ClaudeBot, PerplexityBot, Google-Extended izinleri
- llms.txt dosyası: site mimarisini AI ajanlarına özetleyen yeni standart (opsiyonel, düşük efor yüksek potansiyel)
- İçerik tazeliği: 3 aylık alıntı uçurumunu önlemek için periyodik güncelleme tarihi sinyali
- Entity mapping: ürün/teknoloji/kirletici isimlerinin tutarlı kullanımı (knowledge-graph/ ile senkron)

## Sınır

GEO içerik taslakları SAFE PATCH; robots.txt/llms.txt gibi teknik dosya değişiklikleri kod değişikliği sayılır → branch+PR, MAJOR.

Bu skill, CLAUDE.md ve AGENTS.md'deki genel kurmalları (insan onayı, /drafts önce, kör öneri yok) geçersiz kılmaz; onları bu alana özel hale getirir.
