# Playbook: Yeni Ürün Sayfası Lansmanı

İlgili skill'ler: `skills/schema/`, `skills/seo/`, `skills/cro/`, `skills/ui-ux/`

## Adımlar

1. **SEO brief** (`skills/seo/`) — hedef anahtar kelime, arama niyeti, rakip SERP analizi.
   Çıktı: `drafts/content/seo-brief-<ürün>.md`
2. **Şema taslağı** (`skills/schema/`) — Product + Offer + Review JSON-LD taslağı.
   Çıktı: `drafts/code/<ürün>-schema.md`
3. **CRO denetimi** (`skills/cro/`) — CTA yerleşimi, WhatsApp handoff noktası, güven sinyalleri.
   Çıktı: `drafts/content/<ürün>-cro-notlari.md`
4. **UI/UX kontrolü** (`skills/ui-ux/`) — erişilebilirlik, mobil düzen, form kullanılabilirliği.
   Çıktı: `drafts/content/<ürün>-ui-notlari.md`
5. **İnsan onayı** — dört taslak birlikte gözden geçirilir; onay sonrası `outputs/` ve
   `patches/buzsu-site/` üzerinden PR taslağı hazırlanır (MAJOR, canlı siteye kod değişikliği).

## Sınır

Bu playbook hiçbir adımda otomatik yayın yapmaz; her adım `/drafts` altında durur.
