# AI Search Optimizasyonu — Uygulama Adımları

## Gerekli Yapılandırma Değişkenleri

```
BUZSU_SITE_BASE_URL      # Örn: https://buzsu.com.tr
GSC_PROPERTY_URL         # Örn: https://buzsu.com.tr  (GSC'de tanımlı property)
```

Değişken değerleri `config/.env.example` dosyasından alınır. Gerçek değerler
environment variable olarak saklanır; repoya yazılmaz.

---

## Adımlar

### 1. Mevcut Durum Analizi
- GSC'de `$GSC_PROPERTY_URL` için AI Overview izlenimlerini kontrol et
  - Performans → Arama türü: Web → Filtrele: AI Overview
- Hangi sorgularda AI Overview çıkıyor? (varsa kaydet)

### 2. LLM Doğruluk Testi
Aşağıdaki sorguları ChatGPT ve Perplexity'de çalıştır; dönen bilgiyi not al:
- "Buzsu su arıtma cihazı fiyatı"
- "Buzsu tezgah altı su arıtma cihazı özellikleri"
- "pompasız su arıtma cihazı ne işe yarar"

Yanlış veya eksik bilgi → `/drafts/llm-dogruluk-testi-[YYYY-MM].md` olarak kaydet.

### 3. İçerik Boşluk Haritası
Konuşma sorgularına yanıt vermeyen sayfaları belirle. Başlangıç URL'leri:
- `$BUZSU_SITE_BASE_URL/urunler/tezgah-alti-su-aritma/`
- `$BUZSU_SITE_BASE_URL/urunler/pompasiz-su-aritma/`
- `$BUZSU_SITE_BASE_URL/urunler/yedek-filtre/`
- `$BUZSU_SITE_BASE_URL/sss/`
- `$BUZSU_SITE_BASE_URL/hakkimizda/`

### 4. Özet Paragraf Ekleme
Her hedef ürün sayfasına 40-60 kelimelik AI snippet paragrafı yaz.

Örnek sorgu → yanıt çifti:
- Sorgu: "tezgah altı su arıtma cihazı nasıl çalışır?"
- Yanıt formatı: "Buzsu tezgah altı su arıtma cihazı, [teknik açıklama]. Kurulum [süre] sürer..."

Taslakları `/drafts/content/ai-snippet-[sayfa-slug].md` olarak kaydet.

### 5. FAQ Bölümü
Her ürün sayfasına en az 5 S&C ekle.
Yüksek öncelikli sayfalar:
- `/urunler/tezgah-alti-su-aritma/` — "hangi mutfak tiplerine uyar, kaç litre/gün üretir?"
- `/urunler/pompasiz-su-aritma/` — "apartman tipi mi, daire mi, basınç gerekir mi?"
- `/sss/` — genel kullanım ve bakım soruları

FAQPage schema taslağı için schema-automation skill devreye girer.

### 6. llms.txt Taslağı
`$BUZSU_SITE_BASE_URL/llms.txt` için taslak yaz → `/drafts/llms-txt-v1.md`

### 7. Schema Güncellemesi
schema-automation skill ile koordineli çalış; FAQPage ve Product şemalarını güncelle.

### 8. Onay ve Yayın
Tüm değişiklikler `/drafts` üzerinden insan onayına sunulur.
Canlıya almak için developer + insan onayı zorunludur.

### 9. İzleme (4 hafta sonra)
- GSC `$GSC_PROPERTY_URL` → AI Overview izlenimlerini ölç
- LLM doğruluk testini tekrar çalıştır

## Onay Notu
Adım 8 öncesi uygulama başlamaz. Canlı siteye doğrudan yazma yapılmaz.

## İlgili Skill'ler
`skills/llms`, `skills/schema-automation`, `skills/entity-seo`, `skills/gsc`, `skills/aeo-ai-search`
