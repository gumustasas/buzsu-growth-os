# GSC Analizi — Uygulama Adımları

## Gerekli Yapılandırma Değişkenleri

```
GSC_PROPERTY_URL         # GSC'de tanımlı property URL'i — Örn: https://buzsu.com.tr
AIRTABLE_BASE_ID         # Raporların kaydedileceği Airtable base ID'si
```

Değerler `config/.env.example` dosyasından alınır; repoya yazılmaz.
Bu skill yalnızca okuma yapar; GSC'ye veya Airtable'a yazma yapmaz.

---

## Adımlar

### 1. Rapor Periyodu Seç
- Aylık rapor → son 28 gün + önceki 28 gün karşılaştırması
- Hızlı kontrol → son 7 gün
- Trend analizi → son 90 gün

### 2. Performans Verisi Çek
`$GSC_PROPERTY_URL` için:
- Toplam tıklama / izlenim / CTR / ort. pozisyon
- Cihaz bazlı ayrım (mobil öncelikli — BUZSU trafiğinin büyük çoğunluğu mobil)

İzlenecek anahtar sorgular (önceki dönemle karşılaştır):
- "su arıtma cihazı" ve varyantları
- "tezgah altı su arıtma"
- "pompasız su arıtma"
- "Buzsu" (marka araması)
- "su arıtma cihazı fiyatı" (yüksek ticari niyet)

### 3. Kapsam Raporu
`$GSC_PROPERTY_URL` → Kapsam:
- "Dizine alındı" sayısı bu ay vs geçen ay
- Hata türleri: 4xx, noindex, redirect hatası
- Özellikle kontrol et: `/urunler/*` sayfaları dizinde mi?

### 4. Zenginleştirilmiş Sonuç Kontrolü
`$GSC_PROPERTY_URL` → Zenginleştirilmiş Sonuçlar:
- Product şemaları aktif mi? (ürün sayfaları)
- FAQPage aktif mi? (`/sss/` sayfası)
- Hata sayısı artıyor mu?

### 5. CWV ve Sayfa Deneyimi
`$GSC_PROPERTY_URL` → Sayfa Deneyimi:
- CWV: kaç URL "İyi" kategorisinde?
- Mobil uyumluluk sorunu var mı?

### 6. Rapor Taslağı
`/drafts/gsc-rapor-[YYYY-MM].md` oluştur.

Rapordan **kesinlikle çıkar:**
- Müşteri adı, telefonu, e-postası
- Sipariş veya CRM verisi
- `$AIRTABLE_BASE_ID` veya herhangi bir credential

Raporun Airtable'a işlenmesi manuel onay gerektiren ayrı bir adımdır.

### 7. Aksiyon Listesi
Bulgulara göre ilgili skill'e görev oluştur:
- Şema hatası → schema-automation skill
- Kapsam sorunu → technical-seo skill
- CTR düşüklüğü → content-agent
- AI Overview kaybı → ai-search skill

## Onay Notu
Okuma işlemi onay gerektirmez.
Aksiyon alındığında ilgili skill'in onay süreci devreye girer.
Airtable'a rapor yazma ayrı MINOR onay gerektirir.

## İlgili Skill'ler
`skills/technical-seo`, `skills/schema-automation`, `skills/ai-search`, `skills/analytics`
