# Video Üretim İş Akışları — BUZSU

browser-use/video-use (MIT) ve harry0703/MoneyPrinterTurbo (MIT) repolarından
gözlemlenen üretim pipeline mimarilerinin BUZSU bağlamına uyarlanmış özeti.
Hiçbir repo kodu/metni kopyalanmadı; yalnızca iş akışı mantığı uyarlandı.

## video-use'dan Alınan Ders: Metin-Önce Mimari

### Genel Desen

Görüntü işlemeden önce transkripsiyon → ~12KB metin paketi (kelime + zaman damgası) →
LLM akıl yürütme → düzenleme kararları (EDL). Bu yaklaşım:
- Daha az token kullanır (video frame yerine metin).
- LLM'in zaman ilişkisi kurmasını kolaylaştırır.
- Hata halinde 3x otomatik yeniden render yapar.

### BUZSU'ya Uygulanabilir Kısım

Mevcut Suvesu içeriği → metin tabanı sağlam → video için "metin önce" yaklaşım natural fit.
Senaryo yazma → transkripsiyon planı → görsel eşleştirme sırası uygulanabilir.

**Uygulanamayan Kısım:** browser-use tool'u bu repoda kurulmaz/çalıştırılmaz.

## MoneyPrinterTurbo'dan Alınan Ders: Pipeline Aşamaları

### 6 Aşamalı Pipeline

1. Konu/anahtar kelime girişi
2. AI senaryo üretimi (Claude dahil çoklu LLM)
3. Royalty-free görsel/video kaynak (Pexels, Pixabay, Coverr)
4. TTS seslendirme (Edge TTS, Azure)
5. Altyazı üretimi + özelleştirme
6. Arka plan müziği + çapraz platform yayın

### BUZSU'ya Uygulanabilir Kısım

- **Kaynak önceliği**: Pexels/Pixabay/Coverr — ücretsiz ve royalty-free.
- **Format kararı**: 9:16 (Shorts/Reels/TikTok) veya 16:9 (YouTube normal).
- **Seslendirme**: Türkçe TTS seçenekleri değerlendirilmeli (Edge TTS TR desteği var).
- **Altyazı**: Türkçe için font/encoding önemli.

**Uygulanamayan Kısım:** MoneyPrinterTurbo bu repoda kurulmaz; yeni bağımlılık = MAJOR.
Pipeline mantığı manuel iş akışına rehber olarak kullanılır.

## BUZSU Video Formatları

| Format | Platform | Süre | Araç | Onay |
|---|---|---|---|---|
| 9:16 kısa | Shorts, Reels, TikTok | 30-60s | CapCut vb. | İnsan yayınlar |
| 16:9 normal | YouTube | 3-5dk | Premiere vb. | İnsan yayınlar |
| Ürün tanıtım | Buzsu.com.tr | 60-90s | Herhangi | İnsan onaylar |
