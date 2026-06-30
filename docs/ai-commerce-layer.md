# AI Commerce Katmanı

## Tanım

AI Commerce, Buzsu Growth OS'un ziyaretçilere ürün keşfi, karşılaştırması ve satın alma hazırlığı konusunda yardımcı olan ajansal katmanıdır. "Agentic shopping" olarak da bilinir.

**Sınır:** AI Commerce ajanı öneri ve yönlendirme yapar. Ödeme, sipariş tamamlama veya kart işlemi asla yapmaz.

---

## Neden AI Commerce?

Geleneksel e-ticaret:
- Ziyaretçi → ürün sayfası → sepet → ödeme

AI Commerce:
- Ziyaretçi → konuşma → kişiselleştirilmiş öneri → WhatsApp handoff → satış ekibi kapatır

Buzsu.com.tr için WhatsApp üzerinden satış kapama modeli uygundur: TDS değeri, bütçe ve kurulum tercihi AI ile belirlenir; satış WhatsApp'ta insan tarafından kapatılır.

---

## AI Commerce Akışı

```
Ziyaretçi Girişi
      ↓
TDS Widget veya AI Chat
      ↓
Kullanıcı Profili Oluşturma:
  - TDS değeri
  - Bütçe aralığı (sorulursa)
  - Kullanım (ev / ofis / daire)
  - Aciliyet (hemen / bu ay / araştırıyorum)
      ↓
commerce-agent → Ürün Eşleştirme
      ↓
Karşılaştırma Tablosu (2-3 seçenek)
      ↓
WhatsApp Handoff
  URL: wa.me/905527896905?text=<hazır mesaj>
      ↓
Satış Ekibi → WhatsApp'ta satışı kapatır
```

---

## Ürün Öneri Katmanları

### Katman 1: TDS Bandına Göre

| TDS | Öneri |
|-----|-------|
| < 50 | Filtre seti — mevcut suyunuzu iyileştirin |
| 50–150 | Musluk üstü sistem veya 5 aşamalı RO |
| 151–300 | 5 Aşamalı RO Sistemi |
| 301–500 | 7 Aşamalı RO Sistemi |
| > 500 | 7 Aşamalı RO + profesyonel kurulum + periyodik bakım |

### Katman 2: Kullanım Senaryosuna Göre

| Senaryo | Öneri |
|---------|-------|
| Ev (4+ kişi) | 7 Aşamalı RO — yüksek kapasite |
| Ev (1-2 kişi) | 5 Aşamalı RO veya musluk üstü |
| Ofis | 7 Aşamalı RO + pompalı sistem |
| Mevcut sistem bakımı | Yıllık Filtre Seti (5'li) |

### Katman 3: Bütçeye Göre

| Bütçe (₺) | Seçenek |
|-----------|---------|
| < 500 | TDS metre + filtre (geçici) |
| 500–2000 | Musluk üstü veya 5 aşamalı RO |
| 2000–4000 | 5 Aşamalı RO Sistemi |
| 4000+ | 7 Aşamalı RO Sistemi |

---

## WhatsApp Handoff Protokolü

### Hazır Mesaj Şablonu

```
Merhaba! Suvesu.com AI danışmanı beni sizinle buluşturdu.

📊 Su profilim:
- TDS değeri: {tds} mg/L
- Kullanım: {kullanim}
- Bütçe: ₺{butce_aralik}

🏆 Önerilen ürün: {urun_adi}
💰 Fiyat: ₺{fiyat}
🔗 {buzsu_url}

Kurulum ve teslim için bilgi alabilir miyim?
```

### URL Üretimi

```javascript
const mesaj = `Merhaba! ...`; // şablon
const url = `https://wa.me/905527896905?text=${encodeURIComponent(mesaj)}`;
```

---

## AI Commerce Sınırları (KESİN)

| Yasak İşlem | Gerekçe |
|-------------|---------|
| Ödeme başlatmak | Finansal sorumluluk |
| Kredi kartı bilgisi toplamak | Güvenlik ve yasal |
| Kesin sipariş tamamlamak | Satıcı onayı gerekli |
| Stok garantisi vermek | Gerçek zamanlı veri yok |
| Teslimat taahhüdü vermek | Lojistik bilinmiyor |
| Fiyat indirimi taahhüdü vermek | Satış ekibi kararı |

---

## Airtable Entegrasyonu

AI Commerce üzerinden gelen leadler Airtable'a şu alanlarla kaydedilir:

| Alan | Değer |
|------|-------|
| Source | `Suvesu Referral` |
| Product Interest | TDS bandına göre eşleşen ürün kategorisi |
| Engagement | Kullanıcı niyetine göre (Fiyat Sordu, Zaman Belirtti, vb.) |
| Lead Stage | `New` |
| Notes | TDS, kullanım, bütçe, önerilen ürün — yapılandırılmış not |

---

## Gelecek Dönem: Agentic Web Standartları

AI Commerce katmanı, Google'ın "agentic web" standartlarına (2025–2026 dönemi) hazır olacak şekilde tasarlanmıştır:

- **Ürün varlık karttı (Product Entity Card):** Schema.org Product markup → AI Commerce agent'lar tarafından okunabilir
- **Conversational commerce protokolü:** Standart soru-cevap formatı ile ürün öneri
- **Trust signals:** E-E-A-T + schema + garanti bilgisi → AI overview alıntı uygunluğu

Detaylar geliştiğinde `docs/architecture.md` güncellenecek.
