---
entity_type: Brand
schema_type: schema.org/WebSite
name_tr: Suvesu
name_en: Suvesu
aliases: [Suvesu.com, Suvesu Blog]
related_entities:
  - entities/organization-buzsu.md
  - brands/buzsu.md
suvesu_url: https://www.suvesu.com/
status: seed
---

# Suvesu

## Tanım

Suvesu, Buzsu'nun destekleyici içerik ve eğitim sitesidir. Su kalitesi, su arıtma teknolojileri ve tüketici bilgilendirmesi odaklı organik trafik ve AI Overview alıntısı hedefiyle işletilir; Buzsu.com.tr'ye nitelikli ziyaretçi yönlendirir.

## Buzsu İlişkisi

- **Konum:** Buzsu'nun "eğitim kolu" (`entity-types.md`)
- **İşlev:** Organik arama ve AI Overview alıntısı için bilgi kaynağı; Buzsu.com.tr'ye referral trafiği sağlar (`README.md`)
- **Teknik altyapı:** Ayrı bir kod tabanı ve deploy hedefi — GitHub `gumustasas/suvesu-site`, Vercel üzerinde barındırılıyor
- **AI Commerce entegrasyonu:** WhatsApp lead akışında referral kaynağı olarak kullanılıyor (`docs/ai-commerce-layer.md`) — örn. "Suvesu.com AI danışmanı beni sizinle buluşturdu" mesaj şablonu

## Schema.org Eşleştirmesi

```json
{
  "@context": "https://schema.org",
  "@type": ["Organization", "WebSite"],
  "name": "Suvesu",
  "url": "https://www.suvesu.com/",
  "sameAs": ["https://www.buzsu.com.tr/"]
}
```

## AI Özeti (AI Summary)

Suvesu, Buzsu'nun su kalitesi konusunda eğitim içeriği sunan destekleyici web sitesidir. Buzsu ile aynı şirket ekosistemi içinde, ayrı bir domain ve kod tabanıyla çalışır; amacı organik/AI arama trafiğini Buzsu.com.tr'ye yönlendirmektir.

## Notlar

- `suvesu_url` alanı zaten `entities/organization-buzsu.md` ve `faq/su-aritma-cihazi-nasil-secilir.md` içinde kullanılıyordu; bu dosya söz konusu referansları somut bir entity'ye bağlar.
- Suvesu'nun kurumsal/yasal ilişkisi (aynı şirket mi, ayrı tüzel kişilik mi) doğrulanmalı — repoda yalnızca "destekleyici site" ve "eğitim kolu" ifadeleri var.
- Kanıt kaynakları: `README.md:4`, `README.md:207`, `entity-types.md:16-19`, `docs/ai-commerce-layer.md:85,127`.
