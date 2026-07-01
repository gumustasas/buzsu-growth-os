---
name: schema-automation
description: BUZSU ürün ve içerik sayfaları için JSON-LD şemalarını üretir, doğrular ve günceller; canlıya alma sürecini yönetir.
---

## Ne Zaman Devreye Girer
- Yeni ürün veya kategori sayfası eklendiğinde
- FAQ içeriği güncellendiğinde (FAQPage şema senkronizasyonu)
- GSC'de şema hatası bildirimi geldiğinde
- Toplu şema güncelleme gerektiğinde
- Yeni şema tipi siteye eklenecekse

## Temel Pratikler
1. **JSON-LD önceliği** — Microdata veya RDFa yerine her zaman JSON-LD kullan.
2. **Bağlam doğruluğu** — @type değerleri schema.org'daki tam türle eşleşmeli.
3. **Zorunlu alan kontrolü** — Google'ın gerektirdiği alanlar eksik olmamalı (Product: name, image, offers).
4. **Validator önce, canlı sonra** — Her şema değişikliği validator'dan geçer, sonra yayına girer.
5. **Sürüm takibi** — Şema taslakları /drafts/schema/ altında versiyonlanır.
6. **Fiyat doğruluğu** — Offers.price alanına yanlış fiyat yazmak hem hukuki hem SEO riskidir.

## Sınır
Bu skill şema taslağı ve doğrulama raporu üretir. Canlı yayın schema-agent + insan onayı gerektirir.
