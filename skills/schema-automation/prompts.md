# Schema Otomasyonu Görev Promptları

## 1. Ürün Şema Taslağı
```
[Ürün adı] için JSON-LD Product schema oluştur.
Alanlar: name, description, image, brand, offers
(price placeholder — gerçek fiyat sağlanmadan yazma),
priceCurrency: TRY, availability, sku.
/drafts/schema/product-[slug].jsonld olarak kaydet.
```

## 2. FAQPage Schema Üretimi
```
[Sayfa URL]'deki soru-cevap içeriğini tarayıp FAQPage JSON-LD şeması oluştur.
Maksimum 10 S&C, her cevap 150 kelimeden kısa.
/drafts/schema/faq-[slug].jsonld olarak kaydet.
```

## 3. Toplu Şema Denetimi
```
Buzsu.com.tr'deki tüm ürün sayfalarını tara.
Şema eksik olan, hatalı @type kullanan veya zorunlu alanı eksik olan sayfaları listele.
Öncelik sırala (trafik hacmine göre).
/drafts/schema-audit-[tarih].md olarak raporla.
```

## 4. GSC Şema Hatası Analizi
```
GSC Zenginleştirilmiş Sonuçlar raporundaki tüm hata ve uyarıları listele.
Her hata için: sayfa URL, hata türü, düzeltme adımı.
Etkilenen sayfa sayısına göre öncelik sırala.
/drafts/gsc-schema-hatalar-[tarih].md olarak kaydet.
```

> Görevleri /tasks altında task dosyası oluşturarak takip et.
