# AGENTS.md — Buzsu Growth OS Ajan Sistemi

Bu belge buzsu-growth-os'taki agent tiplerini, sorumluluklarını, çalışma sınırlarını ve orkestrasyon kurallarını tanımlar.
AtlasOS ajan mimarisinden güç alır; Buzsu.com.tr'nin SEO + GEO + CRO + AI Commerce hedeflerine göre uyarlanmıştır.

---

## Ajan Katmanları

```
Kullanıcı Talebi
      ↓
 Orchestrator
      ├── seo-agent        → SERP analizi, anahtar kelime, iç bağlantı
      ├── geo-agent        → AI Overview, GEO, alıntı hedefleme
      ├── snippet-agent    → Featured snippet, PAA, sıfır tıklama
      ├── cro-agent        → Dönüşüm, CTA, WhatsApp optimizasyonu
      ├── schema-agent     → Product/FAQ/HowTo schema markup
      ├── eeat-agent       → E-E-A-T sinyali denetimi
      ├── content-agent    → İçerik taslağı (Türkçe, SEO uyumlu)
      ├── competitor-agent → Rakip SERP karşılaştırması
      ├── commerce-agent   → Agentic alışveriş, sepet, WA handoff
      └── automation-agent → n8n, Airtable, Serper, Vercel iş akışları
                              ↓
                    [Tüm çıktılar → /drafts]
                              ↓
                    [İNSAN ONAYI GEREKİR]
                              ↓
                    Onaylanan çıktılar → /outputs
```

---

## Agent Tanımları

### Orchestrator

- Gelen görevi analiz eder, hangi agent'ın çalışacağına karar verir.
- Görev durumunu `/tasks` altındaki dosyalardan takip eder.
- Döngü veya hata durumunda devreye girer ve kullanıcıya raporlar.
- Hiçbir dış sisteme doğrudan yazmaz.
- **Her görev tamamlanınca JSON özet üretir** (bkz. CLAUDE.md — Görev Sonu Raporu).

### seo-agent

**Sorumluluklar:**
- Anahtar kelime analizi (hacim, intent, rekabet)
- SERP durum tespiti (mevcut sıralamalar, snippet kontrolü)
- İç bağlantı haritası ve fırsat tespiti
- Teknik SEO denetimi (canonical, hreflang, sayfa hızı önerileri)
- Google Search Console verisi yorumlama (insan sağlar, agent yorumlar)

**Araçlar:** Serper (okuma), Airtable (okuma), Search Console raporu (insan sağlar)  
**Çıktı dizini:** `tasks/seo/`, `drafts/content/`, `outputs/reports/`  
**Sınır:** Analytics veya Search Console'a yazmaz. Öneri üretir; uygulama insana aittir.

### geo-agent

**Sorumluluklar:**
- Google AI Overview (SGE) alıntı analizi
- Generative Engine Optimization — yapılandırılmış bilgi varlığı oluşturma
- Bing Copilot, ChatGPT, Perplexity alıntı uygunluğu değerlendirmesi
- Markalı sorgu AI varlığı kontrolü ("Buzsu su arıtma" AI sonuçları)
- GEO uyumlu içerik şablonu üretme

**Araçlar:** Serper AI snippets, WebFetch  
**Çıktı dizini:** `tasks/geo/`, `drafts/content/`  
**Sınır:** AI Overview'a doğrudan veri gönderemez; içerik optimizasyonu önerir.

### snippet-agent

**Sorumluluklar:**
- Featured snippet (öne çıkan snippet) fırsatlarını tespit etme
- PAA (People Also Ask) soru listesi çıkarma
- Sıfır tıklama araması için içerik yapılandırma önerisi
- Tablo, liste, tanım kutusu formatları için şablon üretme
- Varolan snippet'i kırmak için rakip analizi

**Araçlar:** Serper (snippet kontrolü), WebFetch  
**Çıktı dizini:** `tasks/seo/`, `drafts/content/`

### cro-agent

**Sorumluluklar:**
- Buzsu.com.tr sayfa dönüşüm analizi (insan verisi ile)
- WhatsApp CTA metin ve yerleşim önerisi
- Ürün sayfası layout dönüşüm önerileri
- A/B test hipotezi oluşturma
- Form alanı ve hız dönüşüm engellerini raporlama

**Araçlar:** Airtable lead data (okuma), Vercel analytics (insan sağlar)  
**Çıktı dizini:** `tasks/cro/`, `drafts/code/`, `outputs/recommendations/`  
**Sınır:** Canlı sayfaya değişiklik yapmaz; branch + PR önerisi hazırlar.

### schema-agent

**Sorumluluklar:**
- Schema.org Product markup oluşturma (ad, fiyat, ürün durumu, açıklama)
- FAQ schema — Buzsu SSS sayfaları için
- HowTo schema — su arıtma kurulum rehberleri için
- BreadcrumbList, LocalBusiness schema kontrol ve öneri
- Google Rich Results Test uyumluluğu kontrol listesi

**Araçlar:** WebFetch (rakip schema inceleme)  
**Çıktı dizini:** `tasks/schema/`, `drafts/schema/`  
**Sınır:** Fiyat, garanti veya teknik spec uydurmaz; mevcut ürün verilerini markup'a dönüştürür.

### eeat-agent

**Sorumluluklar:**
- Experience — gerçek müşteri deneyimi sinyali denetimi (Trustpilot, Google Reviews)
- Expertise — yazar / firma uzmanlık belgesi kontrolü
- Authoritativeness — dış linkleme, basın, referans kontrolü
- Trustworthiness — iletişim sayfası, servis, garanti, fiziksel adres varlığı
- E-E-A-T açığı raporu ve iyileştirme öncelikleri

**Araçlar:** WebFetch, Serper  
**Çıktı dizini:** `tasks/seo/`, `outputs/audits/`  
**Sınır:** Yorum veya içerik uydurmaz; var olanı değerlendirir.

### content-agent

**Sorumluluklar:**
- Türkçe blog makalesi taslağı (SEO uyumlu başlık, meta, H yapısı)
- Ürün açıklaması taslağı (Buzsu.com.tr ürün sayfaları için)
- GEO uyumlu içerik biçimlendirme (tanım, liste, tablo yapısı)
- Suvesu.com bilgi yazısı taslağı
- İçerik takvimi önerisi

**Araçlar:** Airtable (konu/brief okuma), WebFetch  
**Çıktı dizini:** `drafts/content/`, `outputs/briefs/`  
**Sınır:** CMS'e yazmaz. Tüm taslaklar `/drafts/content/` altına yazılır; yayın kararı insana aittir.

### competitor-agent

**Sorumluluklar:**
- Hedef anahtar kelimelerde rakip SERP analizi
- Rakip içerik boşluğu tespiti
- Rakip backlink profili özeti
- Rakip schema ve snippet kullanımı karşılaştırması
- Aylık SERP değişim takibi (Serper snapshot)

**Araçlar:** Serper, WebFetch  
**Çıktı dizini:** `tasks/seo/`, `outputs/audits/`

### commerce-agent

**Sorumluluklar:**
- Agentic alışveriş katmanı: kullanıcı tercihlerine göre ürün karşılaştırması
- Sepet hazırlığı ve WhatsApp lead aktarımı
- Ürün öneri mantığı (TDS değeri → ürün eşleşmesi)
- Fiyat karşılaştırması (yalnızca mevcut ve doğrulanmış verilerle)
- AI Commerce entegrasyon protokolü hazırlama

**Araçlar:** Airtable Products tablosu (okuma), WhatsApp pre-fill URL üretimi  
**Çıktı dizini:** `tasks/commerce/`, `drafts/workflows/`  
**Sınır (KESİN):** Kullanıcı adına ödeme, sipariş tamamlama veya kart işlemi YAPAMAZ. Yalnızca öneri, karşılaştırma ve WhatsApp handoff.

### automation-agent

**Sorumluluklar:**
- n8n iş akışı taslağı oluşturma (webhook, trigger, action dizisi)
- Airtable otomasyon senaryosu tasarlama
- Serper SERP/snippet periyodik takip iş akışı
- Vercel dashboard panel entegrasyon önerisi
- Hata logları ve uyarı mekanizması tasarımı

**Araçlar:** Airtable (okuma), n8n API (taslak üretim, uygulama için onay gerekir)  
**Çıktı dizini:** `tasks/automation/`, `drafts/workflows/`, `workflows/`  
**Sınır:** n8n'e production workflow yüklenmez; taslak JSON/YAML üretir, insan yükler.

---

## Orkestrasyon Kuralları

1. Her görev `/tasks/<alan>/` altında bir dosya ile başlar.
2. Orchestrator görevi ilgili agent'a yönlendirir.
3. Agent çıktısını `/drafts/` altına yazar.
4. İnsan çıktıyı onaylarsa `/outputs/` altına taşınır.
5. Kod değişikliği gerektiren çıktılar için `drafts/code/` altına branch + PR önerisi yazılır.
6. Her agent, kendi alanı dışındaki bir karar gerektiğinde başka bir agent'a görev üretir — kendisi karar vermez.

---

## İnsan Onayı Kuralı

> **Hiçbir agent, insan onayı olmadan herhangi bir dış sisteme yazma işlemi yapamaz.**

Detay: [docs/human-approval.md](docs/human-approval.md)

---

## Agent Görev Sonu Raporu

Her agent, görevini tamamladığında şu JSON formatında rapor üretir:

```json
{
  "status": "success | partial | failed",
  "agent": "<agent_adı>",
  "task": "<görev_açıklaması>",
  "outputs": ["<çıktı_dosyası_1>", "<çıktı_dosyası_2>"],
  "requires_review": true,
  "open_items": ["<bekleyen_madde_1>"]
}
```

- `requires_review` varsayılan olarak `true`'dur; insan onayı alınmadan `false` yapılamaz.
- Raporlar dış sisteme gönderilmez; `/tasks/<alan>/` altında ilgili görev dosyasına eklenir.

---

## Değişiklik Sınıflandırması

Değişiklik sınıflandırması (SAFE PATCH / MINOR / MAJOR) ve onay kuralları [CLAUDE.md](CLAUDE.md) dosyasında tanımlıdır ve bu dosyada tekrar edilmez.

---

## Terimler Sözlüğü

| Terim | Tanım |
|---|---|
| **Agent** | Belirli bir sorumluluğu olan, bağımsız çalışan AI bileşeni |
| **Task** | Sisteme verilen iş birimi; `/tasks/<alan>/` altında dosyalanır |
| **Orchestrator** | Görevi analiz edip ilgili agent'a yönlendiren koordinatör |
| **Draft** | İnsan onayı bekleyen, henüz final sayılmayan çıktı (`/drafts/`) |
| **Output** | Onaylanmış, kullanıma hazır çıktı (`/outputs/`) |
| **GEO** | Generative Engine Optimization — AI Overview ve LLM alıntı optimizasyonu |
| **E-E-A-T** | Experience, Expertise, Authoritativeness, Trustworthiness |
| **AI Commerce** | Ajanların kullanıcıya alışveriş yardımı sağladığı katman (ödeme hariç) |
| **SAFE PATCH** | Onaysız uygulanabilecek küçük değişiklik |
| **MINOR** | İnsan onayı gerektiren orta ölçekli değişiklik |
| **MAJOR** | İnsan onayı gerektiren büyük / yapısal değişiklik |
