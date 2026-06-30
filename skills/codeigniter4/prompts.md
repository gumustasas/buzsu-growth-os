# CodeIgniter 4 — Platform Geliştirme — Örnek Promptlar

Bu promptlar, ilgili agent veya orchestrator'a doğrudan görev olarak verilebilir.

1. Buzsu ürün sayfası controller'ında ham SQL kullanımı var mı tara, varsa Query Builder'a geçiş önerisi yaz.
2. İletişim formunun CSRF ve validation durumunu denetle.
3. Mevcut .env.example dosyasını gözden geçir, eksik değişken var mı kontrol et.
4. Yeni bir route eklemeden önce filtre/yetkilendirme gereksinimini belirle.

## Görev Dosyası Formatı

Yukarıdaki promptlardan biri görev olarak verildiğinde, önce ilgili `tasks/<alan>/` klasöründe bir görev dosyası oluşturulur (yoksa), sonra `implementation.md`'deki adımlar izlenir.
