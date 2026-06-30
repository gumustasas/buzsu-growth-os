# LLM Best Practices — BUZSU İçin

## Genel Bakış
Büyük Dil Modellerinin içerik üretimi, analiz ve otomasyon görevlerinde
BUZSU ekosisteminde güvenli ve etkili kullanımı için pratik kılavuz.

## İçerik Üretiminde Kurallar

### Doğrulanabilir Bilgi
- Fiyat, garanti süresi, teknik spec asla uydurulmamalı
- Sağlık iddiası için bağımsız kaynak gösterilmeli
- Sertifika ve standart bilgileri doğrulanmış olmalı

### Prompt Yapısı
- Görev → Bağlam → Kısıt → Format şablonu kullan
- Uzun promptlar yerine adım adım zincir kullan
- Çıktıyı her zaman /drafts altında değerlendir, direkt yayınlama

### Hallüsinasyon Kontrolü
- LLM çıktısı referans kaynakla karşılaştırılır
- Ürün bilgisi için Airtable'dan doğrulama yapılır
- "Emin değilim" yanıtı = aksiyon yok, insan devreye girer

## LLM'lerin BUZSU Sitesini Okuması İçin

### İçerik Yapısı
- Net H1>H2>H3 hiyerarşisi
- Her paragraf tek konuya odaklanır
- Kısa cümleler (ortalama < 20 kelime)

### llms.txt Protokolü
- Site amacı ve sınırlar açıkça belirtilir
- Kısıtlanan içerik (fiyat listesi, CRM verisi) belgelenir
- Temel URL'ler yönlendirilir

### Doğruluk Güvencesi
- Ürün bilgisi Airtable'dan çekilir; içerik yazarı uydurmaz
- Güncelleme tarihi içerikte görünür olur
- Sayfa içinde net "son güncelleme" etiketi

## BUZSU'ya Özgü Kısıtlar
- Hiçbir LLM müşteri verisini işlemez veya saklamaz
- LLM çıktısı insan onayı olmadan canlıya alınmaz
- WhatsApp veya sipariş akışında LLM otonom karar vermez
- Airtable'a yazma işlemi LLM tarafından yapılmaz

## Referans
- skills/llms/ — teknik uygulama adımları
- CLAUDE.md — BUZSU AI kullanım kuralları
