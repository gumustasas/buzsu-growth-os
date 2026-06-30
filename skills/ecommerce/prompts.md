# E-ticaret / Agentic Commerce — Örnek Promptlar

Bu promptlar, ilgili agent veya orchestrator'a doğrudan görev olarak verilebilir.

1. TDS değeri 450 ppm olan kullanıcı için uygun Buzsu ürünlerini karşılaştır.
2. Seçilen ürün için WhatsApp pre-fill mesaj linki oluştur.
3. İki ürün arasında özellik bazlı karşılaştırma tablosu hazırla (fiyat dahil, mevcut veriyle).
4. Sepet hazırlığı akışını adım adım kullanıcıya özetle (onay noktalarıyla).

## Görev Dosyası Formatı

Yukarıdaki promptlardan biri görev olarak verildiğinde, önce ilgili `tasks/<alan>/` klasöründe bir görev dosyası oluşturulur (yoksa), sonra `implementation.md`'deki adımlar izlenir.
