# Entity SEO — Yapılandırılmış Varlık Optimizasyonu — Örnek Promptlar

Bu promptlar, ilgili agent veya orchestrator'a doğrudan görev olarak verilebilir.

1. Yeni eklenen ürün için knowledge-graph/products/ girişi taslağı hazırla.
2. Buzsu marka adının dış kaynaklarda (basın, dizin) tutarlılığını Serper ile kontrol et.
3. NaturalsNet 11 Aşama ürününün entity ilişkilerini (teknoloji, mineral, kirletici) haritalandır.
4. Organization schema'daki sameAs alanlarını güncel sosyal medya/basın bağlantılarıyla öner.

## Görev Dosyası Formatı

Yukarıdaki promptlardan biri görev olarak verildiğinde, önce ilgili `tasks/<alan>/` klasöründe bir görev dosyası oluşturulur (yoksa), sonra `implementation.md`'deki adımlar izlenir.
