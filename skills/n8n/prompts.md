# n8n — Otomasyon İş Akışları — Örnek Promptlar

Bu promptlar, ilgili agent veya orchestrator'a doğrudan görev olarak verilebilir.

1. Serper SERP takibi için mevcut n8n template kütüphanesinde uygun şablon ara.
2. Airtable yeni lead kaydı oluştuğunda WhatsApp bildirim workflow'u taslağı hazırla (deploy etme, yalnızca taslak).
3. Mevcut bir n8n workflow JSON'unu validate_workflow ile doğrula ve sorunları raporla.
4. Haftalık SERP snapshot workflow'unun hata/retry mekanizmasını gözden geçir.

## Görev Dosyası Formatı

Yukarıdaki promptlardan biri görev olarak verildiğinde, önce ilgili `tasks/<alan>/` klasöründe bir görev dosyası oluşturulur (yoksa), sonra `implementation.md`'deki adımlar izlenir.
