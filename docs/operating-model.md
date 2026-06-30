# İşletme Modeli — Buzsu Growth OS

## Genel Bakış

Buzsu Growth OS, Buzsu.com.tr ve Suvesu.com için SEO, GEO, CRO, Schema, E-E-A-T, İçerik, Rakip Analizi, AI Commerce ve Otomasyon iş akışlarını yönetmek üzere tasarlanmış bir AI ajan sistemidir.

**Model:** Yarı otonom — ajanlar analiz ve taslak üretir, insanlar onaylar ve uygular.

---

## Operasyonel Katmanlar

### Katman 1: Görev Başlatma

Her iş, `/tasks/<alan>/` altında bir dosyayla başlar. Görev dosyası şunları içerir:

```markdown
# Görev: <açıklama>
Tarih: YYYY-MM-DD
Alan: seo / geo / cro / schema / content / commerce / automation
Öncelik: P1 / P2 / P3
Bağlam: <ne bilinmesi gerekiyor>
İstenen çıktı: <ne bekleniyor>
```

### Katman 2: Agent Çalışması

Orchestrator görevi analiz eder ve ilgili agent'a yönlendirir. Agent:
1. Görevi `/tasks/<alan>/` altından okur.
2. Araçlarıyla analiz yapar (Serper, WebFetch, Airtable okuma).
3. Çıktıyı `/drafts/` altına yazar.
4. Görev sonu JSON raporunu göreve ekler.

### Katman 3: İnsan Onayı

İnsan `/drafts/` altındaki çıktıyı inceler:
- Onaylarsa: `/outputs/` altına taşır veya doğrudan uygular.
- Revizyon isterse: göreve not ekler, agent yeniden çalışır.

### Katman 4: Uygulama

Kod değişikliği gerektiren onaylı çıktılar için:
1. İnsan `drafts/code/<özellik>.md` içindeki branch + PR taslağını uygular.
2. PR açılır, review edilir, merge edilir.
3. Görev dosyasına onay kaydı eklenir.

---

## Haftalık Operasyon Ritmi

| Gün | İşlem | Araç |
|-----|-------|------|
| Pazartesi | Airtable KPI doldurma (10 dk) | Airtable Manual |
| Pazartesi | Hot Leads görüntüleme ve takip atama | Airtable |
| Salı | SEO görev başlatma (varsa) | seo-agent / snippet-agent |
| Çarşamba | İçerik taslağı onayı (varsa) | content-agent çıktıları |
| Perşembe | Rakip SERP snapshot | competitor-agent |
| Cuma | Hafta özeti, onay bekleyen taslaklar | Orchestrator raporu |

---

## Görev Öncelik Sistemi

| Öncelik | Tanım | Beklenen Süre |
|---------|-------|--------------|
| P1 | Gelir veya lead kaybına yol açan kritik sorun | Aynı gün |
| P2 | Fırsat — rakip içerik boşluğu, optimizasyon | Bu hafta |
| P3 | Uzun vadeli geliştirme — otomasyon, GEO altyapısı | Bu ay |

---

## Agent Koordinasyon Kuralları

1. Her agent kendi alan dışında karar vermez.
2. Başka bir agent'ın alanına giren karar gerektiğinde, o agent'a görev üretir ve bekler.
3. Orchestrator, birden fazla agent'ın çakışması durumunda önceliklendirme yapar.
4. Çıktı çakışması varsa (iki agent aynı dosyaya yazmak isterse) Orchestrator müdahale eder.

---

## Metrikler ve Başarı Göstergeleri

### SEO + GEO
- Hedef anahtar kelimelerde SERP top-10 girişi sayısı
- AI Overview'da alıntılanma sayısı (aylık)
- Organik tıklama büyümesi (MoM)

### CRO + Lead
- AI agent lead'lerinde Airtable'a düzgün yazılan kayıt oranı
- Hot Lead (8+ puan) oranı — toplam lead'lerin %'si
- WhatsApp'tan satışa dönüşüm oranı

### İçerik
- Yayına giren taslak sayısı (aylık)
- Yayına giren / üretilen taslak oranı (onay oranı)
- Güncellenen vs yeni içerik dengesi

### Otomasyon
- Aktif n8n iş akışı sayısı
- Haftalık SERP snapshot başarı oranı
- Manuel veri girişi süresi (azalma hedefi)

---

## Kısıtlar ve Güvenli Alanlar

| Kısıt | Neden |
|-------|-------|
| Canlı siteye otomatik push yasak | SEO ve kullanıcı deneyimi riski |
| Ürün fiyatı veya garantisi uydurmak yasak | Tüketici güveni ve yasal risk |
| AI adına ödeme/sipariş yasak | Finansal ve hukuki sorumluluk |
| PII (kişisel veri) /drafts veya /outputs'a yazmak yasak | KVKK uyumu |
| API anahtarı dosyaya yazmak yasak | Güvenlik |
