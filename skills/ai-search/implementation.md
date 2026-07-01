# AI Search Optimizasyonu — Uygulama Adımları

## Gerekli Yapılandırma Değişkenleri

```
BUZSU_SITE_BASE_URL      # https://www.buzsu.com.tr
GSC_SITE_URL             # GSC'de tanımlı site URL'i
```

Değişken değerleri `config/.env.example` dosyasından alınır. Gerçek değerler
environment variable olarak saklanır; repoya yazılmaz.

---

## Adımlar

### 1. Mevcut Durum Analizi
- GSC'de `$GSC_SITE_URL` için AI Overview izlenimlerini kontrol et
  (Performans → Arama türü: Web → Filtre: AI Overview)
- Hangi sorgularda AI Overview çıkıyor? Varsa kaydet.

### 2. LLM Doğruluk Testi
Aşağıdaki sorguları ChatGPT ve Perplexity'de çalıştır; dönen bilgiyi not al:
- "Buzsu su arıtma cihazı ne kadar?"
- "Buzsu UV filtreli tezgah altı cihaz özellikleri"
- "atıksız su arıtma cihazı nedir"
- "CODE su arıtma cihazı filtre değişim süresi"

Yanlış veya eksik bilgi → `/drafts/llm-dogruluk-testi-[YYYY-MM].md`

### 3. İçerik Boşluk Haritası
Konuşma sorgularına yanıt vermeyen sayfaları belirle.
Repo'dan doğrulanmış başlangıç URL'leri:
- `$BUZSU_SITE_BASE_URL/su-aritma-cihazlari/` — kategori
- `$BUZSU_SITE_BASE_URL/uv-filtreli-tezgah-alti-su-aritma-cihazi-pompali-model/` — tezgah altı pompalı
- `$BUZSU_SITE_BASE_URL/code-su-aritma-cihazi/` — CODE cihaz
- `$BUZSU_SITE_BASE_URL/atiksiz-su-aritma-cihazi/` — atıksız cihaz
- `$BUZSU_SITE_BASE_URL/code-su-aritma-cihazi-5-li-filtre-seti-made-in-korea/` — filtre seti
- `<BUZSU_FAQ_URL>` — SSS sayfası (path repoda doğrulanmadı; gerçek URL'yi ekle)
- `$BUZSU_SITE_BASE_URL/hakkimizda/` — Hakkımızda (path repoda doğrulanmadı; gerçek URL'yi ekle)

### 4. Özet Paragraf Ekleme
Her hedef ürün sayfasına 40-60 kelimelik AI snippet paragrafı yaz.

Öncelikli sayfalar ve örnek sorgu çiftleri:
- `uv-filtreli-tezgah-alti-su-aritma-cihazi-pompali-model`
  → "UV filtreli tezgah altı su arıtma cihazı nedir, nasıl çalışır?"
- `code-su-aritma-cihazi`
  → "CODE su arıtma cihazı özellikleri nelerdir?"
- `atiksiz-su-aritma-cihazi`
  → "Atıksız su arıtma cihazı ne anlama gelir?"

Taslakları `/drafts/content/ai-snippet-[sayfa-slug].md` olarak kaydet.

### 5. FAQ Bölümü
Her ürün sayfasına en az 5 S&C ekle.
FAQPage schema taslağı için schema-automation skill devreye girer.

### 6. llms.txt Taslağı
`$BUZSU_SITE_BASE_URL/llms.txt` için taslak → `/drafts/llms-txt-v1.md`

### 7. Schema Güncellemesi
schema-automation skill ile koordineli; FAQPage ve Product şemalarını güncelle.

### 8. Onay ve Yayın
Tüm değişiklikler `/drafts` üzerinden insan onayına sunulur.

### 9. İzleme (4 hafta sonra)
- GSC AI Overview izlenimlerini ölç
- LLM doğruluk testini tekrar çalıştır

## Onay Notu
Adım 8 öncesi uygulama başlamaz. Canlı siteye doğrudan yazma yapılmaz.

## İlgili Skill'ler
`skills/llms`, `skills/schema-automation`, `skills/entity-seo`, `skills/gsc`, `skills/aeo-ai-search`
