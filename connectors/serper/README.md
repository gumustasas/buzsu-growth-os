# Connector — Serper

## Amaç

Google SERP sonuçlarını, PAA (People Also Ask) sorularını ve AI Overview snippet'lerini gerçek zamanlı çekerek SEO ve GEO analizine veri sağlar.

---

## Environment Variables

```
SERPER_API_KEY=    # serper.dev API anahtarı
```

---

## Veri Kaynakları

| Endpoint | Veri | Kullanım |
|----------|------|---------|
| `/search` | Organik sonuçlar, sıralama | SEO pozisyon takibi |
| `/search` (`type=images`) | Görsel SERP | Görsel SEO fırsatı |
| `peopleAlsoAsk` (alan) | PAA soruları | Featured snippet hedefleme |
| `answerBox` (alan) | AI Overview alıntısı | GEO optimizasyonu |
| `knowledgeGraph` (alan) | Entity paneli | Knowledge Graph validasyonu |

---

## Hedef Sorgular

```
"su arıtma cihazları"
"su arıtma cihazı fiyat"
"ev su arıtma sistemi"
"ters osmoz su arıtma"
"atıksız su arıtma"
"su arıtma cihazı nasıl seçilir"
"su arıtma cihazı bakımı"
```

Sorgu dili: `tr-TR`, lokasyon: `Turkey`

---

## Kullanım Senaryoları

1. **seo-agent:** Haftalık SERP snapshot — Buzsu'nun organik pozisyonunu izle
2. **snippet-agent:** PAA sorularını çek, Suvesu ve Buzsu'nun cevapladığı soruları işaretle
3. **geo-agent:** `answerBox` + `knowledgeGraph` alanlarından AI Overview görünürlüğünü değerlendir
4. **competitor-agent:** Top-5 rakip URL'leri analiz et

---

## n8n Bağlantısı

```
Trigger: Zamanlanmış (Pazartesi 08:00)
Node 1: HTTP Request → Serper /search (7 sorgu)
Node 2: JSON parse → pozisyon + PAA + answerBox
Node 3: Airtable Write → Weekly KPIs tablosuna "Top Ranking Query" güncelle
Node 4: Slack/Email → SEO haftalık özet gönder
```

---

## Claude Agent Kullanımı

```
WebSearch(query="site:buzsu.com.tr su arıtma")
WebSearch(query="su arıtma cihazları")
```

Serper MCP varsa: `mcp__serper__search`  
Şu an WebSearch ile yaklaşık SERP verisi çekilebilir.
