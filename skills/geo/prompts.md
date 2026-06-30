# GEO — Generative Engine Optimization — Örnek Promptlar

Bu promptlar, ilgili agent veya orchestrator'a doğrudan görev olarak verilebilir.

1. "RO sistemi nedir" sorgusu için AI Overview alıntı durumunu analiz et, citability bloğu öner.
2. Suvesu.com TDS makalesini GEO uyumlu 150 kelimelik bloklara böl, kaynak atfı ekle.
3. robots.txt dosyasındaki AI crawler izinlerini denetle, eksik varsa drafts/code/ altına öneri yaz.
4. 'Buzsu su arıtma' markalı sorgusunun ChatGPT/Perplexity'de nasıl göründüğünü değerlendir.
5. llms.txt taslağı hazırla (Buzsu.com.tr için, yalnızca taslak — uygulama insana ait).

## Görev Dosyası Formatı

Yukarıdaki promptlardan biri görev olarak verildiğinde, önce ilgili `tasks/<alan>/` klasöründe bir görev dosyası oluşturulur (yoksa), sonra `implementation.md`'deki adımlar izlenir.
