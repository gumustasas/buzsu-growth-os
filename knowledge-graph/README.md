# Buzsu Knowledge Graph

Entity-bazlı bilgi yapısı. Buzsu.com.tr için SEO, GEO, Schema, AI Commerce ve Agentic Web bağlamında anlamlı entity'lerin yapılandırılmış kaydıdır.

**Hedef:** 150–200 entity  
**Başlangıç seed:** 10 entity (Sprint-2)

---

## Entity Nedir?

Entity; bir varlık, kavram, yer, kişi veya nesnenin yapılandırılmış dijital temsilidir. Google Knowledge Graph, Wikipedia, Wikidata ve schema.org bu tanımı kullanır.

Buzsu bağlamında entity örnekleri:
- **Organizasyon:** Buzsu şirketi
- **Ürün:** 5 Aşamalı RO Su Arıtma Sistemi
- **Teknoloji:** Ters Osmoz (Reverse Osmosis)
- **Mineral:** Alkali mineral (kalsiyum, magnezyum)
- **Kirletici:** Kireç (kalsiyum karbonat birikimi)
- **Bileşen:** Ters osmoz membranı
- **Lokasyon:** Bartın (Buzsu'nun faaliyet merkezi)
- **SSS:** "Su arıtma cihazı nasıl seçilir?"

---

## Buzsu İçin Neden Önemli?

Su arıtma sektörü yoğun teknik terminoloji içerir. Entity-bazlı içerik:

- Terimlerin tutarlı kullanımını sağlar (tüm ajanlarda aynı terminoloji)
- Schema.org bağlantısı için kaynak görevi görür
- GEO/AI Overview alıntılarında otorite sinyali gönderir
- İç bağlantı mimarisini yapılandırır (entity → URL eşleşmesi)

---

## SEO İlişkisi

| Entity Tipi | SEO Etkisi |
|-------------|------------|
| Ürün | Product rich result → tıklama oranı artışı |
| SSS | FAQPage schema → SERP alan genişlemesi |
| Teknoloji | Bilgi grafiği paneli → marka otorite sinyali |
| Lokasyon | Yerel SEO sinyali — Bartın + ulusal hedefleme |
| Kirletici | Long-tail sorgu hedefleme ("kireçli su zararları") |

---

## GEO / AI Overview İlişkisi

Google AI Overview ve Bing Copilot, güvenilir entity grafiğine sahip kaynaklardan alıntı yapar. Her entity dosyası:
- Konuyla ilgili olgusal, kaynağa dayalı bilgi içerir
- Schema.org tipiyle eşleştirilir
- Suvesu.com ve Buzsu.com.tr'deki ilgili sayfalara bağlanır

Entity sayısı ve kalitesi arttıkça AI Overview alıntı olasılığı yükselir.

---

## Product Schema İlişkisi

`knowledge-graph/products/` klasöründeki her entity:
- TASK-003'te tasarlanan Product JSON-LD şablonuna kaynak oluşturur
- Airtable `Schema Description` alanının taslağını içerir
- Görsel tanımlar, SKU mantığı ve kategori taksonomisini belgelendirir

---

## AI Commerce İlişkisi

commerce-agent, kullanıcı sorgularını entity'lerle eşleştirerek:
- "Benim için hangi su arıtma cihazı uygun?" sorusuna entity grafiğinden yanıt üretir
- WhatsApp handoff URL'sine ürün-spesifik `text=` parametresi ekler
- Ürün karşılaştırması için entity özelliklerini (fiyat, aşama sayısı, teknoloji) kullanır

---

## WebMCP / Agentic Web İlişkisi

Yapılandırılmış entity dosyaları:
- Claude Code ve diğer agent'ların doğru bilgiye hızla erişmesini sağlar
- LLM halüsinasyonunu azaltır (olgusal kayıt → grounding)
- Gelecekte `llms.txt` veya semantic sitemap olarak yayınlanabilir
- MCP knowledge base olarak doğrudan agent context'ine yüklenebilir

---

## Klasör Yapısı

```
knowledge-graph/
├── README.md                  # Bu dosya
├── entities/                  # Organizasyon ve genel entity'ler
├── brands/                    # Marka entity'leri
├── products/                  # Ürün entity'leri
├── components/                # Ürün bileşenleri (filtre, membran vb.)
├── technologies/              # Su arıtma teknolojileri
├── certifications/            # Belgeler (NSF, ISO, TSE vb.)
├── minerals/                  # Mineraller (alkali, kalsiyum vb.)
├── contaminants/              # Kirleticiler (kireç, arsenik, klor vb.)
├── faq/                       # SSS entity'leri
├── glossary/                  # Sözlük terimleri
└── locations/                 # Şehir ve bölge entity'leri
```

---

## Entity Dosyası Yapısı

Her entity dosyası standart bir YAML frontmatter + Markdown gövdesiyle başlar:

```markdown
---
entity_type: Product | Technology | Contaminant | ...
schema_type: schema.org/Product | schema.org/Thing | ...
name_tr: Türkçe ad
name_en: İngilizce ad
aliases: [alternatif isimler]
related_entities: [bağlı entity dosya yolları]
buzsu_url: https://www.buzsu.com.tr/...
suvesu_url: https://www.suvesu.com/...
status: seed | reviewed | published
---
```

---

## Sprint Hedefleri

| Sprint | Hedef Entity Sayısı | Durum |
|--------|---------------------|-------|
| Sprint-2 | 10 (seed) | ✅ Tamamlandı |
| Sprint-3 | 40 | Planlandı |
| Sprint-4 | 100 | Planlandı |
| Sprint-5 | 150–200 | Hedef |
