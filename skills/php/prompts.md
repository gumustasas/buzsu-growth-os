# PHP — Genel Backend Güvenliği ve Kalitesi — Örnek Promptlar

Bu promptlar, ilgili agent veya orchestrator'a doğrudan görev olarak verilebilir.

1. İletişim formu işleyicisinde XSS/SQLi riski olup olmadığını tara.
2. Dosya yükleme endpoint'inin MIME/uzantı kontrolünü denetle.
3. composer.lock dosyasındaki bağımlılıkları bilinen zafiyet açısından gözden geçir (yalnızca rapor, güncelleme yapma).
4. Oturum cookie ayarlarının güvenlik bayraklarını kontrol et.

## Görev Dosyası Formatı

Yukarıdaki promptlardan biri görev olarak verildiğinde, önce ilgili `tasks/<alan>/` klasöründe bir görev dosyası oluşturulur (yoksa), sonra `implementation.md`'deki adımlar izlenir.
