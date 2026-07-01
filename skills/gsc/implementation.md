# GSC Analizi — Uygulama Adımları

## Gerekli Yapılandırma Değişkenleri

```
GSC_SITE_URL             # GSC'de tanımlı site URL'i — https://www.buzsu.com.tr/
AIRTABLE_BASE_ID         # Raporların kaydedileceği Airtable base ID'si
```

Değerler `config/.env.example` dosyasından alınır; repoya yazılmaz.
Bu skill yalnızca okuma yapar.

---

## Adımlar

### 1. Rapor Periyodu Seç
- Aylık rapor → son 28 gün + önceki 28 gün
- Hızlı kontrol → son 7 gün
- Trend analizi → son 90 gün

### 2. Performans Verisi Çek
`$GSC_SITE_URL` için tıklama / izlenim / CTR / ort. pozisyon.
Cihaz bazlı (mobil öncelikli).

İzlenecek anahtar sorgular:
- "su arıtma cihazı" ve varyantları
- "tezgah altı su arıtma" — `/uv-filtreli-tezgah-alti-su-aritma-cihazi-pompali-model/` ile eşleştir
- "atıksız su arıtma" — `/atiksiz-su-aritma-cihazi/` ile eşleştir
- "CODE su arıtma" — `/code-su-aritma-cihazi/` ile eşleştir
- "su arıtma cihazı filtresi" — `/code-su-aritma-cihazi-5-li-filtre-seti-made-in-korea/` ile eşleştir
- "Buzsu" (marka araması)

### 3. Kapsam Raporu
`$GSC_SITE_URL` → Kapsam:
- "Dizine alındı" sayısı bu ay vs geçen ay
- Hata türleri: 4xx, noindex, redirect hatası
- Doğrulanmış ürün URL'leri dizinde mi? (su-aritma-cihazlari, code-su-aritma, atiksiz, tezgah-alti)

### 4. Zenginleştirilmiş Sonuç Kontrolü
`$GSC_SITE_URL` → Zenginleştirilmiş Sonuçlar:
- Product şemaları aktif mi? (ürün sayfaları)
- FAQPage aktif mi? (`<BUZSU_FAQ_URL>` — doğrulandıktan sonra kontrol et)
- Hata sayısı artıyor mu?

### 5. CWV ve Sayfa Deneyimi
- CWV: kaç URL "İyi" kategorisinde?
- Mobil uyumluluk sorunu var mı?

### 6. Rapor Taslağı
`/drafts/gsc-rapor-[YYYY-MM].md` oluştur.

Rapordan **kesinlikle çıkar:**
- Müşteri adı, telefonu, e-postası
- Sipariş veya CRM verisi
- `$AIRTABLE_BASE_ID` veya herhangi bir credential

### 7. Aksiyon Listesi
Bulgulara göre ilgili skill'e görev oluştur:
- Şema hatası → schema-automation skill
- Kapsam sorunu → technical-seo skill
- CTR düşüklüğü → content-agent
- AI Overview kaybı → ai-search skill

## Onay Notu
Okuma işlemi onay gerektirmez.
Airtable'a rapor yazma ayrı MINOR onay gerektirir.

## İlgili Skill'ler
`skills/technical-seo`, `skills/schema-automation`, `skills/ai-search`, `skills/analytics`
