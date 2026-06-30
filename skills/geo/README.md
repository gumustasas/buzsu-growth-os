# GEO — Generative Engine Optimization

## Amaç

Google AI Overview, Bing Copilot, ChatGPT ve Perplexity gibi üretken arama motorlarında Buzsu/Suvesu içeriğinin alıntılanma olasılığını artırmak.

## İlgili Agent

agents/geo-agent.md (mevcut)

## İncelenen Dış Kaynaklar

- **zubair-trabzada/geo-seo-claude** — Citability optimizasyonu (134-167 kelimelik öz-yeten bilgi blokları), marka bahsi stratejisi (AI görünürlükle backlink'ten 3x güçlü korelasyon), 14+ AI crawler erişim denetimi, llms.txt standardı, 6 kategorili ağırlıklı skorlama (citability %25, marka otoritesi %20, içerik kalitesi %20, teknik temel %15, structured data %10, platform optimizasyonu %10).
- **AndreasH96/seo-geo-consultant** — 120-180 kelime kuralı (AI sistemlerin alıntı için tercih ettiği pasaj uzunluğu), '3 aylık alıntı uçurumu' (içerik yaşlandıkça AI alıntısının düşmesi), AI bot robots.txt yönetimi (GPTBot, ClaudeBot, PerplexityBot).
- **vishalmdi/goog-geo** — 100 puanlık 5 kategorili skorlama modeli (Google AI uygunluğu 25p, yardımcı/özgün içerik 25p, içerik organizasyonu 20p, teknik yapı 15p, entity sinyalleri 15p); 3 zorunlu uygunluk kapısı: Googlebot erişimi, noindex yok, nosnippet yok; Princeton GEO araştırması (KDD 2024) — kaynak gösterme alıntıyı +%40, istatistik kullanımı +%37 artırıyor.

> Kör kopyalama yapılmadı; yalnızca BUZSU bağlamına uyarlanabilir pratik/desen çıkarıldı. Detaylı atıf için bkz. kök dizindeki `reports/external-repo-integration-report.md`.

## Bu Modüldeki Dosyalar

- `skill.md` — Claude Code skill tanımı (ne zaman devreye girer, sorumluluklar, iş akışı)
- `checklist.md` — Uygulama/denetim kontrol listesi
- `prompts.md` — Örnek görev promptları (Türkçe)
- `implementation.md` — BUZSU'ya özel uygulama adımları ve sınırlar

## Onay Notu

GEO içerik taslakları SAFE PATCH; robots.txt/llms.txt gibi teknik dosya değişiklikleri kod değişikliği sayılır → branch+PR, MAJOR.
