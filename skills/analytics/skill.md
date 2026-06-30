---
name: analytics
description: GA4 ve Airtable verilerini okuyarak BUZSU büyüme metriklerini analiz eder, dönüşüm hunisini izler ve raporlar üretir.
---

## Ne Zaman Devreye Girer
- Aylık büyüme raporu hazırlanacağında
- Kampanya sonrası dönüşüm performansı değerlendirilecekse
- Yeni landing page performansı ölçülecekse
- WhatsApp tıklama → Airtable lead oranı izlenecekse
- Anomali (trafik düşüşü, dönüşüm kaybı) tespit edildiğinde

## Temel Pratikler
1. **North Star Metrik** — BUZSU için birincil metrik = WhatsApp tıklaması (satış sinyali).
2. **Funnel görünümü** — Oturum → Ürün sayfası → WhatsApp → Airtable lead. Her adım izlenmeli.
3. **UTM disiplini** — Tüm harici trafik kaynakları UTM ile etiketlenmeli; organik/sosyal/email ayrı.
4. **Karşılaştırmalı dönem** — Her rapor yıllık aynı dönem + önceki dönem karşılaştırması içermeli.
5. **Anomali tespiti** — Günlük oturum sayısı 7 günlük ortalamanın ±%30 dışına çıkarsa uyarı.

## Sınır
Bu skill veri okur ve rapor üretir. GA4 konfigürasyon değişikliği yapmaz.
