# AEO — Answer Engine Optimization / AI Arama — Örnek Promptlar

Bu promptlar, ilgili agent veya orchestrator'a doğrudan görev olarak verilebilir.

1. "su arıtma cihazı nasıl seçilir" sorusu için AEO uyumlu FAQ bloğu öner.
2. Buzsu SSS sayfasının ChatGPT ve Perplexity'de doğrudan cevap olarak çıkıp çıkmadığını değerlendir.
3. Sesli arama formundaki 10 soruyu tespit et ve içerik brief'i hazırla.
4. FAQ schema ile sayfa metni arasındaki tutarsızlıkları raporla (schema-agent'a görev üret).

## Görev Dosyası Formatı

Yukarıdaki promptlardan biri görev olarak verildiğinde, önce ilgili `tasks/<alan>/` klasöründe bir görev dosyası oluşturulur (yoksa), sonra `implementation.md`'deki adımlar izlenir.
