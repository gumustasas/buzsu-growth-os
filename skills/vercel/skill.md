---
name: vercel
description: Suvesu.com (Vercel) ve Buzsu dashboard'unun build/runtime durumunu okuma, hata teşhisi; canlıya otomatik deploy ETMEDEN.
---

# Vercel — Dağıtım ve Gözlemlenebilirlik

## Ne Zaman Devreye Girer

Kullanıcı bu alanla ilgili bir görev tanımladığında (örn. "vercel ile ilgili ...") veya ilgili agent (Yok — automation-agent dış sistem etkileşimlerini kapsıyor; Vercel'e özel okuma adımları bu skill'de.) kendi alanı dışında bir ihtiyaç tespit edip bu skill'e referans verdiğinde.

## Temel Pratikler

- Build/runtime log okuma deploy kararından önce her zaman yapılır (kör deploy yok)
- Preview deployment'lar production'dan ayrı değerlendirilir
- Ortam değişkenleri Vercel panelinden okunur, asla kod/draft dosyasına yazılmaz
- Production deploy daima insan onayıyla tetiklenir; Claude Code otomatik deploy etmez

## Sınır

Canlıya otomatik yayın kesin yasak (CLAUDE.md madde 1). Bu skill yalnızca okuma/teşhis için tasarlandı.

Bu skill, CLAUDE.md ve AGENTS.md'deki genel kurmalları (insan onayı, /drafts önce, kör öneri yok) geçersiz kılmaz; onları bu alana özel hale getirir.
