---
name: ui-ux
description: Buzsu ürün sayfaları ve dashboard için tutarlı, güven odaklı, erişilebilir tasarım kararları.
---

# UI/UX — Tasarım Sistemi ve Erişilebilirlik

## Ne Zaman Devreye Girer

Kullanıcı bu alanla ilgili bir görev tanımladığında (örn. "ui/ux ile ilgili ...") veya ilgili agent (Yok — cro-agent ile yakın çalışır; tasarım kararları cro-agent'ın çıktısına girdi sağlar.) kendi alanı dışında bir ihtiyaç tespit edip bu skill'e referans verdiğinde.

## Temel Pratikler

- Emoji ikon yerine SVG (Heroicons benzeri) kullanımı — tutarlı görsel dil
- WCAG AA: en az 4.5:1 metin kontrastı, görünür fokus durumları, klavye navigasyonu
- Su arıtma/sağlık sektörü anti-pattern'i: agresif satış pop-up'ı yerine güven rozeti (garanti, sertifika, müşteri yorumu)
- Responsive test noktaları: 375px, 768px, 1024px, 1440px
- Hareket: 150-300ms geçişler, prefers-reduced-motion desteği

## Sınır

Tasarım önerileri SAFE PATCH (taslak); uygulanması kod değişikliği olduğundan branch+PR, MAJOR.

Bu skill, CLAUDE.md ve AGENTS.md'deki genel kurmalları (insan onayı, /drafts önce, kör öneri yok) geçersiz kılmaz; onları bu alana özel hale getirir.
