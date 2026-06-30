# Analytics — Uygulama Adımları

## Gerekli Yapılandırma Değişkenleri

```
BUZSU_SITE_BASE_URL      # Örn: https://buzsu.com.tr
GSC_PROPERTY_URL         # GSC'de tanımlı property — Örn: https://buzsu.com.tr
AIRTABLE_BASE_ID         # Büyüme metriklerinin tutulduğu Airtable base ID'si
N8N_WEBHOOK_GSC_REPORT   # Aylık GSC raporunu Airtable'a ileten n8n webhook URL'i
```

Değerler `config/.env.example` dosyasından alınır; repoya yazılmaz.
Bu skill yalnızca okuma yapar ve rapor üretir.
`N8N_WEBHOOK_GSC_REPORT` yalnızca onaylı raporları iletmek için kullanılır.

---

## Adımlar

### 1. GA4 Event Envanteri
Kontrol et: aşağıdaki event'ler GA4'te tanımlı mı?

| Event | Tetikleyici |
|---|---|
| `whatsapp_click` | `$BUZSU_SITE_BASE_URL`'deki tüm WhatsApp butonları |
| `product_view` | `/urunler/tezgah-alti-su-aritma/`, `/urunler/pompasiz-su-aritma/`, `/urunler/yedek-filtre/` |
| `form_submit` | `/iletisim/` teklif formu, `/sss/` iletişim formu |
| `search` | Site içi arama kutusu |

Eksik event'ler → `/drafts/analytics-event-eksikleri.md` olarak kaydet.
GA4'e event ekleme MAJOR sınıf; developer + onay gerektirir.

### 2. Dönüşüm Hunisi Haritası
BUZSU North Star Metriği = WhatsApp tıklaması

Huni adımları ve ölçüm:
1. **Oturum** — GA4 toplam oturum sayısı
2. **Ürün sayfası görüntüleme** — `/urunler/*` event count
3. **WhatsApp tıklaması** — `whatsapp_click` event count
4. **Airtable lead** — `$AIRTABLE_BASE_ID` üzerinden manuel doğrulama (okuma)

Her adım arası drop-off oranını hesapla → `/drafts/analytics-huni-[YYYY-MM].md`

### 3. UTM Denetimi
Aktif kampanyaları kontrol et; UTM tutarlılığı:

```
utm_source=google / meta / instagram / email
utm_medium=cpc / organic / social / newsletter
utm_campaign=[kampanya-adi]-[YYYY-MM]
```

UTM eksik trafik kaynağı tespit edilirse → `/drafts/utm-duzenlemesi-[kampanya].md`

### 4. Aylık Büyüme Raporu Taslağı
`/drafts/analytics-buyume-[YYYY-MM].md` oluştur. Rapora ekle:
- Toplam oturum, WhatsApp tıklaması, dönüşüm oranı
- Trafik kaynağı dağılımı (organic, paid, social, direct)
- Top 5 açılış sayfası
- Önceki ay ve yılın aynı dönemiyle karşılaştırma

Rapordan **kesinlikle çıkar:**
- Müşteri adı, telefonu, e-postası
- Sipariş veya CRM kişisel verisi
- `$AIRTABLE_BASE_ID` veya herhangi bir API anahtarı

### 5. Anomali Tespiti
Son 7 günlük günlük oturum sayısını al.
28 günlük ortalamadan ±%30 sapan günleri işaretle.
Olası nedenler: Google algoritma güncellemesi, teknik sorun, kampanya değişikliği.

### 6. Onaylı Raporu Airtable'a İlet (opsiyonel)
Rapor insan onayından geçtikten sonra `$N8N_WEBHOOK_GSC_REPORT`
endpoint'i tetiklenebilir. Bu adım:
- İnsan onayı zorunludur
- Yalnızca anonimleştirilmiş rapor verisi iletilir (PII yok)
- MINOR sınıf değişiklik

## Onay Notu
Okuma ve analiz onay gerektirmez.
GA4 konfigürasyon değişikliği ve Airtable'a yazma MAJOR sınıf; developer + insan onayı zorunlu.

## İlgili Skill'ler
`skills/gsc`, `skills/cro`, `skills/ai-search`
