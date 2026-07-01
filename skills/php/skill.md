---
name: php
description: Buzsu/Suvesu PHP kod tabanında OWASP Top 10 sınıfı zafiyetlerden korunma ve kod kalitesi.
---

# PHP — Genel Backend Güvenliği ve Kalitesi

## Ne Zaman Devreye Girer

Kullanıcı bu alanla ilgili bir görev tanımladığında (örn. "php ile ilgili ...") veya ilgili agent (Yok — skills/security/ ve skills/codeigniter3/ ile birlikte kullanılır.) kendi alanı dışında bir ihtiyaç tespit edip bu skill'e referans verdiğinde.

## Temel Pratikler

- Output escaping: kullanıcı girdisi HTML'e basılmadan önce htmlspecialchars() ile kaçırılır
- Prepared statement / parametreli sorgu zorunluluğu
- Dosya yükleme noktalarında MIME tipi ve uzantı çift kontrolü
- Bağımlılık güncelliği: composer audit ile bilinen zafiyet taraması (uygulama insan onayıyla)
- Hata mesajlarının production'da kullanıcıya detay sızdırmaması

## Sınır

Güvenlik düzeltmeleri her zaman branch+PR; kritik/acil bulgular insana hemen raporlanır, beklenmez.

Bu skill, CLAUDE.md ve AGENTS.md'deki genel kurmalları (insan onayı, /drafts önce, kör öneri yok) geçersiz kılmaz; onları bu alana özel hale getirir.
