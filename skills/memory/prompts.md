# Memory — Oturumlar Arası Bağlam — Örnek Promptlar

Bu promptlar, ilgili agent veya orchestrator'a doğrudan görev olarak verilebilir.

1. tasks/seo/ altındaki açık maddeleri (open_items) özetle, bu oturumda hangileri ele alınabilir?
2. Son 3 görev sonu raporunu oku, tekrar eden bir engel var mı tespit et.
3. knowledge-graph/ ile tasks/ arasında tutarsız bir bilgi var mı tara.

## Görev Dosyası Formatı

Yukarıdaki promptlardan biri görev olarak verildiğinde, önce ilgili `tasks/<alan>/` klasöründe bir görev dosyası oluşturulur (yoksa), sonra `implementation.md`'deki adımlar izlenir.
