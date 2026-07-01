# Skill: Analytics & Performans Ölçümü

## Amaç
Buzsu.com.tr ve Suvesu.com için GA4 bazlı dönüşüm takibi, funnel analizi ve
büyüme metrikleri raporlama sürecini yönet.

## İlgili Agent
`analytics-agent`, `seo-agent`

## Kapsam
- GA4 event tracking (WhatsApp tıklaması, form gönderimi, ürün görüntüleme)
- Dönüşüm hunisi analizi: ziyaret → ürün sayfası → WhatsApp → Airtable lead
- Cohort ve retention analizi
- UTM parametre yönetimi
- Airtable CRM verileriyle bağlantılı raporlama

## Kurallar
Bu skill yalnızca veri okur ve analiz yapar.
GA4 tracking kodu değişikliği developer + insan onayı gerektirir.

## Onay Notu
Analiz ve okuma = SAFE PATCH. Tracking konfigürasyonu = MAJOR sınıf.
