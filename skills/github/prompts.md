# GitHub — Branch, PR ve İnceleme Akışı — Örnek Promptlar

Bu promptlar, ilgili agent veya orchestrator'a doğrudan görev olarak verilebilir.

1. Mevcut branch'teki değişiklikleri özetle ve commit mesajı öner.
2. PR açmadan önce değişiklik listesini göster, onay iste.
3. Son commit'lerin mesaj formatının CLAUDE.md kurallarına uyup uymadığını kontrol et.

## Görev Dosyası Formatı

Yukarıdaki promptlardan biri görev olarak verildiğinde, önce ilgili `tasks/<alan>/` klasöründe bir görev dosyası oluşturulur (yoksa), sonra `implementation.md`'deki adımlar izlenir.
