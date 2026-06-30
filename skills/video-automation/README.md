# Video Automation — AI Destekli Video Üretim Pipeline'ı

## Amaç

Buzsu.com.tr ürün tanıtım videoları ve Suvesu.com eğitim içerikleri için
AI destekli otomatik kısa video üretim akışı: senaryo → görsel → altyazı → yayın.

## İlgili Agent

agents/content-agent.md (senaryo/içerik kararı).

## İncelenen Dış Kaynaklar

- **browser-use/video-use** (MIT) — Metin-önce video düzenleme mimarisi: transkripsiyon
  → ~12KB markdown paketi (kelime-düzeyi zaman damgası + konuşmacı verisi) → LLM akıl
  yürütme → EDL üretimi → render → 3x maksimum otomatik yeniden render. "12 hard rules
  for production correctness" yaklaşımı; ses'in birincil düzenleme sinyali olması;
  HyperFrames/Remotion ile paralel alt-agent animasyon üretimi.
- **harry0703/MoneyPrinterTurbo** (MIT) — Konu/anahtar kelimeden tam video akışı:
  AI senaryo üretimi → royalty-free görsel kaynak (Pexels/Pixabay/Coverr) → TTS seslendirme
  → altyazı (özelleştirilmiş font/konum/renk) → arka plan müziği → tek tıkla çapraz platform
  yayın (TikTok/Instagram/YouTube Shorts). MVC mimarisi, Claude dahil çoklu LLM desteği.

> Kör kopyalama yapılmadı. İki repo tamamen farklı odaklar: video-use düzenleme/otomasyon,
> MoneyPrinterTurbo üretim pipeline. BUZSU için yalnızca iş akışı mantığı uyarlandı.
> Lisans atıfları için bkz. `reports/external-repo-integration-report.md`.

## Bu Modüldeki Dosyalar

- `skill.md`, `checklist.md`, `prompts.md`, `implementation.md`

## Onay Notu

Video taslakları SAFE PATCH (script, senaryo, checklist). Canlı platform yayını MAJOR.
