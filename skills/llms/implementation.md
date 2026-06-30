# LLM Crawlability — Uygulama Adımları

## Gerekli Yapılandırma Değişkenleri

```
BUZSU_SITE_BASE_URL      # Örn: https://buzsu.com.tr
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

Eksikler → `/drafts/robots-txt-ai-direktifler.md` olarak taslak hazırla.

### 2. LLM Hallüsinasyon Testi
Aşağıdaki sorguları ChatGPT ve Perplexity'de çalıştır:
- "Buzsu su arıtma cihazı ne kadar?"
- "Buzsu tezgah altı filtre kaç yılda bir değişir?"
- "Buzsu pompasız cihaz nasıl kurulur?"

Dönen bilgi gerçek ürün bilgisiyle eşleşiyor mu?
Bulgular → `/drafts/llm-halusinasyon-tespiti-[YYYY-MM].md`

### 3. llms.txt Taslağı
`$BUZSU_SITE_BASE_URL/llms.txt` için taslak yaz.
Şunları içersin:
- Site amacı: "su arıtma cihazı satışı ve servisi, Türkiye"
- İzin verilen: ürün açıklamaları, SSS, kurulum kılavuzları
- Kısıtlanan: müşteri sipariş bilgisi, fiyat listeleri, CRM içerikleri
- Temel URL'ler:
  - `$BUZSU_SITE_BASE_URL/urunler/`
  - `$BUZSU_SITE_BASE_URL/sss/`
  - `$BUZSU_SITE_BASE_URL/blog/`
  - `$BUZSU_SITE_BASE_URL/iletisim/`

Taslak → `/drafts/llms-txt-v1.md`

### 4. İçerik Bağımsızlık Geçişi
Paragraph bağımsızlığı zayıf sayfaları belirle; öncelik sırası:
1. `/urunler/tezgah-alti-su-aritma/` — ürün açıklama paragrafları
2. `/urunler/pompasiz-su-aritma/`
3. `/hakkimizda/` — firma tanıtım paragrafları

Her paragrafı bağlamından bağımsız oku; anlamsız olanları düzelt → content-agent.

### 5. Onay
Tüm taslaklar (`/drafts/llms-txt-v1.md`, `/drafts/robots-txt-ai-direktifler.md`)
insan onayına sunulur.

### 6. Yayın
Onay sonrası developer `robots.txt` ve `llms.txt` dosyalarını canlıya alır.

### 7. İzleme (2 ay sonra)
LLM hallüsinasyon testini tekrar çalıştır; önceki rapor ile karşılaştır.

## Onay Notu
robots.txt ve llms.txt değişikliği MINOR sınıf; developer + insan onayı zorunlu.

## İlgili Skill'ler
`skills/ai-search`, `skills/technical-seo`, `skills/security`
