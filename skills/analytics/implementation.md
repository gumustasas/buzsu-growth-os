# Analytics — Uygulama Adımları

## Gerekli Yapılandırma Değişkenleri

```
BUZSU_SITE_BASE_URL      # https://www.buzsu.com.tr
GSC_PROPERTY_URL         # GSC'de tanımlı property URL'i
AIRTABLE_BASE_ID         # Büyüme metriklerinin tutulduğu Airtable base ID'si
N8N_WEBHOOK_GSC_REPORT   # Aylık GSC raporunu Airtable'a ileten n8n webhook URL'i
```

Değerler `config/.env.example` dosyasından alınır; repoya yazılmaz.
Bu skill yalnızca okuma yapar ve rapor üretir.

---

## Adımlar

### 1. GA4 Event Envanteri
Aşağıdaki event'ler GA4'te tanımlı mı?

| Event | Tetiklendiği Sayfalar |
|---|---|
| `whatsapp_click` | `$BUZSU_SITE_BASE_URL` geneli — tüm WhatsApp butonları |
| `product_view` | `/su-aritma-cihazlari/`, `/uv-filtreli-tezgah-alti-su-aritma-cihazi-pompali-model/`, `/code-su-aritma-cihazi/`, `/atiksiz-su-aritma-cihazi/` |
| `filtre_view` | `/code-su-aritma-cihazi-5-li-filtre-seti-made-in-korea/` |
| `form_submit` | `$BUZSU_SITE_BASE_URL/iletisim/` |
| `search` | Site içi arama |

Eksik event'ler → `/drafts/analytics-event-eksikleri.md`
GA4'e event ekleme MAJOR sınıf; developer + onay gerektirir.

### 2. Dönüşüm Hunisi Haritası
North Star Metrik = `whatsapp_click`

Huni adımları:
1. Oturum → GA4 toplam oturum
2. Ürün sayfası görüntüleme → `product_view` + `filtre_view` event count
   (Doğrulanmış sayfalar: code-su-aritma, atiksiz, uv-filtreli-tezgah-alti, filtre-seti)
3. WhatsApp tıklaması → `whatsapp_click` event count
4. Airtable lead → `$AIRTABLE_BASE_ID` üzerinden manuel doğrulama (okuma)

Her adım arası drop-off oranını hesapla → `/drafts/analytics-huni-[YYYY-MM].md`

### 3. UTM Denetimi
Aktif kampanyaları kontrol et:

```
utm_source=google / meta / instagram / email
utm_medium=cpc / organic / social / newsletter
utm_campaign=[kampanya-adi]-[YYYY-MM]
```

UTM eksik trafik kaynağı → `/drafts/utm-duzenlemesi-[kampanya].md`

### 4. Aylık Büyüme Raporu
`/drafts/analytics-buyume-[YYYY-MM].md` oluştur:
- Toplam oturum, WhatsApp tıklaması, dönüşüm oranı
- Trafik kaynağı dağılımı
- Top 5 açılış sayfası (doğrulanmış URL slug'larıyla)
- Önceki ay ve yılın aynı dönemiyle karşılaştırma

Rapordan **kesinlikle çıkar:** müşteri adı/telefonu, PII, `$AIRTABLE_BASE_ID`

### 5. Anomali Tespiti
Son 7 günlük oturum sayısını 28 günlük ortalamadan ±%30 sapan günler için işaretle.

### 6. Onaylı Raporu Airtable'a İlet (opsiyonel)
Onaylı rapor → `$N8N_WEBHOOK_GSC_REPORT` tetiklenir.
- İnsan onayı zorunlu
- Yalnızca anonimleştirilmiş veri (PII yok)
- MINOR sınıf

## Onay Notu
Okuma ve analiz onay gerektirmez.
GA4 konfigürasyon değişikliği ve Airtable'a yazma MAJOR sınıf; developer + insan onayı zorunlu.

## İlgili Skill'ler
`skills/gsc`, `skills/cro`, `skills/ai-search`
