# LLM Crawlability — Uygulama Adımları

## Gerekli Yapılandırma Değişkenleri

```
BUZSU_SITE_BASE_URL      # https://www.buzsu.com.tr
```

Değerler `config/.env.example` dosyasından alınır; repoya yazılmaz.

---

## Adımlar

### 1. Mevcut robots.txt Auditi
`$BUZSU_SITE_BASE_URL/robots.txt` dosyasını kontrol et.
Kontrol listesi:
- `GPTBot` — Allow veya Disallow tanımlı mı?
- `ClaudeBot` — tanımlı mı?
- `PerplexityBot` — tanımlı mı?
- `Google-Extended` — tanımlı mı?

Eksikler → `/drafts/robots-txt-ai-direktifler.md`

### 2. LLM Hallüsinasyon Testi
Aşağıdaki sorguları ChatGPT ve Perplexity'de çalıştır:
- "Buzsu CODE su arıtma cihazı kaç litre filtreler?"
- "Buzsu UV filtreli tezgah altı cihaz filtresi kaç yılda bir değişir?"
- "atıksız su arıtma cihazı nasıl kurulur?"

Dönen bilgi gerçek ürün bilgisiyle eşleşiyor mu?
Bulgular → `/drafts/llm-halusinasyon-tespiti-[YYYY-MM].md`

### 3. llms.txt Taslağı
`$BUZSU_SITE_BASE_URL/llms.txt` için taslak yaz.
Şunları içersin:
- Site amacı: "su arıtma cihazı satışı ve servisi, Türkiye"
- İzin verilen: ürün açıklamaları, kurulum kılavuzları
- Kısıtlanan: müşteri sipariş bilgisi, ham fiyat listesi, CRM içerikleri
- Doğrulanmış temel URL'ler:
  - `$BUZSU_SITE_BASE_URL/su-aritma-cihazlari/`
  - `$BUZSU_SITE_BASE_URL/uv-filtreli-tezgah-alti-su-aritma-cihazi-pompali-model/`
  - `$BUZSU_SITE_BASE_URL/code-su-aritma-cihazi/`
  - `$BUZSU_SITE_BASE_URL/atiksiz-su-aritma-cihazi/`
  - `<BUZSU_FAQ_URL>` — SSS sayfası (gerçek path doğrulanmadı; ekle)
  - `<BUZSU_CONTACT_URL>` — İletişim (gerçek path doğrulanmadı; ekle)

Taslak → `/drafts/llms-txt-v1.md`

### 4. İçerik Bağımsızlık Geçişi
Paragraf bağımsızlığı zayıf sayfaları belirle; öncelik sırası:
1. `$BUZSU_SITE_BASE_URL/uv-filtreli-tezgah-alti-su-aritma-cihazi-pompali-model/` — ürün açıklama paragrafları
2. `$BUZSU_SITE_BASE_URL/code-su-aritma-cihazi/`
3. `<BUZSU_ABOUT_URL>` — Hakkımızda firma tanıtım paragrafları (gerçek path doğrulanmadı; ekle)

Her paragrafı bağlamından bağımsız oku; anlamsız olanları düzelt → content-agent.

### 5. Onay
Taslaklar insan onayına sunulur.

### 6. Yayın
Onay sonrası developer `robots.txt` ve `llms.txt` dosyalarını canlıya alır.

### 7. İzleme (2 ay sonra)
LLM hallüsinasyon testini tekrar çalıştır; önceki raporla karşılaştır.

## Onay Notu
robots.txt ve llms.txt değişikliği MINOR sınıf; developer + insan onayı zorunlu.

## İlgili Skill'ler
`skills/ai-search`, `skills/technical-seo`, `skills/security`
