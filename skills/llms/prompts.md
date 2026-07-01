# LLM Crawlability Görev Promptları

## 1. llms.txt Taslağı
```
Buzsu.com.tr için llms.txt dosyası oluştur.
İçersin: marka tanımı, ürün kategorileri, izin verilen içerik,
kısıtlanan içerik (müşteri verisi, ham fiyat listesi), 8 temel URL.
Max 25 satır. /drafts/llms-txt-v1.md olarak kaydet.
```

## 2. robots.txt AI Direktif Güncellemesi
```
Mevcut robots.txt'yi incele.
GPTBot, ClaudeBot, PerplexityBot, Google-Extended için
uygun Allow/Disallow önerileri hazırla.
/drafts/robots-txt-ai-direktifler.md olarak taslak çıkar.
```

## 3. LLM Hallüsinasyon Tespiti
```
ChatGPT ve Perplexity'ye "Buzsu su arıtma cihazı" sorgusunu gönder.
Dönen bilgiyi gerçek ürün bilgisiyle karşılaştır.
Yanlış veya eksik bilgileri listele; içerik düzeltme önerisi üret.
/drafts/llm-hallusinasyon-tespiti-[tarih].md olarak kaydet.
```

## 4. Paragraf Bağımsızlık Testi
```
[URL] sayfasındaki her paragrafı bağlamından bağımsız oku.
Anlamsız kalan paragrafları işaretle.
Her biri için bağımsız anlamlı hale getirme önerisi sun.
```

> Görevleri /tasks altında task dosyası oluşturarak takip et.
