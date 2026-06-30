---
name: ecommerce
description: Ürün karşılaştırma, sepet hazırlığı ve WhatsApp lead aktarımı için agentic alışveriş katmanı.
---

# E-ticaret / Agentic Commerce

## Ne Zaman Devreye Girer

Kullanıcı bu alanla ilgili bir görev tanımladığında (örn. "e-ticaret / agentic commerce ile ilgili ...") veya ilgili agent (agents/commerce-agent.md (mevcut)) kendi alanı dışında bir ihtiyaç tespit edip bu skill'e referans verdiğinde.

## Temel Pratikler

- TDS değeri → ürün eşleştirme mantığı: kullanıcı girdisine göre doğru su arıtma kategorisini önerme
- Sepet hazırlığı: yalnızca mevcut/doğrulanmış fiyat ve stok verisiyle
- WhatsApp pre-fill URL üretimi: seçilen ürün/ihtiyaç bilgisiyle hazır mesaj linki
- Karşılaştırma tablosu: özellik bazlı, abartısız, doğrulanabilir veriyle
- Her adımda kullanıcı bilgilendirme ve onay (agentic etkileşim şeffaflığı)

## Sınır

KESİN SINIR: ödeme veya sipariş tamamlama YAPILAMAZ. Yeni dış sistem yazma bağlantısı (ödeme entegrasyonu vb.) MAJOR sınıf, ayrıca yasak liste kapsamında.

Bu skill, CLAUDE.md ve AGENTS.md'deki genel kurmalları (insan onayı, /drafts önce, kör öneri yok) geçersiz kılmaz; onları bu alana özel hale getirir.
