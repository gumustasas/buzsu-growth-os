---
name: llms
description: Büyük dil modellerinin BUZSU site içeriğini doğru indekslemesi ve alıntılaması için crawlability, robots direktifleri ve içerik formatını optimize eder.
---

## Ne Zaman Devreye Girer
- llms.txt veya robots.txt oluşturulacak/güncellenecekse
- AI crawler trafiği engellemek veya yönlendirmek gerekiyorsa
- LLM'lerin yanlış veya eksik BUZSU bilgisi döndürdüğü tespit edilirse
- Yeni önemli URL'ler LLM indeksine eklenmek isteniyorsa
- İçerik yapısı LLM okuma kalitesi için iyileştirilecekse

## Temel Pratikler
1. **llms.txt formatı** — Site amacı + izin/yasak içerik + temel URL listesi; max 25-30 satır.
2. **Paragraf bağımsızlığı** — Her paragraf bağlam olmaksızın okunabilir; LLM bağlamdan kopararak dilimler.
3. **Başlık hiyerarşisi** — H1→H2→H3 mantıksal sıra; atlama yok.
4. **Veri doğruluğu** — Yanlış fiyat, garanti veya teknik bilgi LLM hafızasına gömülür; hata telafi edilemez.
5. **Robots direktifi** — GPTBot, ClaudeBot, PerplexityBot için açık Allow/Disallow kuralı.

## Sınır
Bu skill robots.txt ve llms.txt taslağı üretir. Canlı dosya değişikliği insan onayı gerektirir.
