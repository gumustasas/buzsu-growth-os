# AI Search Optimizasyon Playbook

## Amaç
Buzsu.com.tr ve Suvesu.com'un Perplexity, ChatGPT, Gemini gibi AI arama motorlarında
alıntılanabilirliğini ve görünürlüğünü artırmak için uçtan uca süreç.

## Tetikleyici
- AI kaynaklı referral trafik düşüyor veya hiç yok
- Rakip markalar AI sonuçlarda alıntılanıyor, BUZSU alıntılanmıyor
- llms.txt veya robots.txt AI direktifleri eksik

## Adımlar

### 1. Mevcut Durum (ai-search skill)
- GSC'de AI Overview izlenimlerini kontrol et
- ChatGPT ve Perplexity'de BUZSU sorgusu at; sonuçları kaydet
- llms.txt ve robots.txt direktiflerini denetle
- Bulgular: /drafts/ai-search-durum-[tarih].md

### 2. İçerik Boşluk Analizi (content-agent + ai-search skill)
- 50+ konuşma sorgusu listesi oluştur
- Her soru için mevcut BUZSU içeriği var mı kontrol et
- Yüksek öncelikli boşlukları belirle

### 3. Teknik Hazırlık (llms skill + technical-seo skill)
- llms.txt taslağı: /drafts/llms-txt-v1.md
- robots.txt AI direktif taslağı
- Yapısal işaretleme denetimi

### 4. İçerik Optimizasyonu (content-agent)
- Öncelikli sorulara özet paragraf yaz (40-60 kelime)
- FAQ bölümleri güncelle

### 5. Schema Güncellemesi (schema-automation skill)
- FAQPage, Product şemalarını kontrol et
- Eksikler için taslak üret

### 6. Onay ve Yayın
- Tüm değişiklikler /drafts üzerinden insan onayına
- Canlıya almak için developer + onay

### 7. İzleme (gsc skill)
- 4 hafta sonra GSC AI Overview izlenimlerini ölç
- LLM hallüsinasyon testini tekrar yap

## İlgili Skill'ler
`ai-search`, `llms`, `schema-automation`, `gsc`, `content`, `aeo-ai-search`
