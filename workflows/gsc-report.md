# Workflow: GSC Aylık Rapor

## Amaç
Google Search Console verisini aylık bazda toplayarak BUZSU arama performans raporunu üretmek.

## Periyot
Aylık (her ayın ilk 3 günü, önceki ayı kapsayacak şekilde)

## Adımlar

1. **Performans verisi** — Son 28 gün: tıklama, izlenim, CTR, ort. pozisyon; önceki 28 günle karşılaştır
2. **Top sorgular** — En yüksek 10 tıklama; CTR anomalisi (yüksek izlenim, düşük CTR)
3. **Top sayfalar** — En yüksek 10 tıklama; pozisyon kaybeden sayfalar (önceki aya göre -3 ve fazlası)
4. **Kapsam özeti** — Toplam dizine alınan, hata, uyarı sayısı
5. **Şema ve CWV özeti** — Zenginleştirilmiş sonuç aktif mi? CWV skoru değişti mi?
6. **Rapor** — /drafts/gsc-rapor-[YYYY-MM].md olarak kaydet; müşteri PII dahil etme
7. **Aksiyon** — Bulgulara göre ilgili skill için task dosyası aç

## Sorumluluk
Veri çekme: gsc skill
Analiz: analytics skill
Onay: insan

## İlgili Dosyalar
`skills/gsc/`, `skills/analytics/`
