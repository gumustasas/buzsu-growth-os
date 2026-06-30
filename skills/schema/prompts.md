# Schema.org Yapılandırılmış Veri — Örnek Promptlar

Bu promptlar, ilgili agent veya orchestrator'a doğrudan görev olarak verilebilir.

1. NaturalsNet 11 Aşama ürün sayfası için Product + BreadcrumbList schema taslağı hazırla.
2. Buzsu SSS sayfası için mevcut sorulardan FAQPage schema üret.
3. Kurulum rehberi sayfası için HowTo schema taslağı çıkar.
4. Mevcut Organization schema'yı Rich Results Test kriterlerine göre denetle.

## Görev Dosyası Formatı

Yukarıdaki promptlardan biri görev olarak verildiğinde, önce ilgili `tasks/<alan>/` klasöründe bir görev dosyası oluşturulur (yoksa), sonra `implementation.md`'deki adımlar izlenir.
