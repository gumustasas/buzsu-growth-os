# Playbook: Video Otomasyon Pipeline'ı

İlgili skill'ler: `skills/video-automation/`, `skills/content/`
Kaynak repo'lar: browser-use/video-use (MIT), harry0703/MoneyPrinterTurbo (MIT)

## Adımlar

1. **Hedef belirle** — platform (Shorts/Reels/TikTok), süre, hedef kitle, anahtar mesaj.
   Suvesu bilgi içeriği → eğitici; Buzsu ürün → tanıtım.
2. **Senaryo** (`skills/content/`) — Türkçe seslendirme metni, ürün/sağlık iddiası
   abartısız, doğrulanabilir.
3. **Görsel kaynak listesi** — Pexels/Pixabay/Coverr royalty-free kaynaklardan URL listesi;
   kaynak belgelenir.
4. **Altyazı planı** — Türkçe, okunabilir font/konum.
5. **Üretim notu** — hangi araç (CapCut, Adobe, vb.), hangi adımda insan müdahalesi.
6. **Yayın checklist** — platform teknik gereksinimleri; otomatik yayın MAJOR,
   insan onayı zorunlu.
7. Tüm taslaklar → `drafts/content/video-<konu>-<tarih>.md`.

## MoneyPrinterTurbo Mimarisinden Alınan Ders

Senaryo → görsel → ses → altyazı → müzik → yayın sırası korunur; her adım
bir sonraki için girdi üretir. Bu repo BUZSU'da kurulmaz/çalıştırılmaz (yeni bağımlılık
= MAJOR); yalnızca pipeline mantığı referans alındı.

## browser-use/video-use Mimarisinden Alınan Ders

Ses, düzenlemenin birincil sinyalidir. Transkripsiyon → metin paketi → LLM akıl yürütme →
EDL → render sırası, frame-dump'tan daha verimli. Bu ortamda browser-use çalıştırılmaz;
kavramsal çerçeve içerik planlama sürecine uygulandı.

## Sınır

Bu playbook araç çalıştırmaz; yalnızca taslak, plan ve checklist üretir.
Platform yayını insan kararıdır.
