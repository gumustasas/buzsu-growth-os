# Vercel — Dağıtım ve Gözlemlenebilirlik — Örnek Promptlar

Bu promptlar, ilgili agent veya orchestrator'a doğrudan görev olarak verilebilir.

1. Suvesu.com son deployment'ının build loglarını incele, hata var mı raporla.
2. Runtime error loglarını analiz et, kök nedeni belirle (deploy etme, yalnızca teşhis).
3. Mevcut domain/preview durumunu özetle.

## Görev Dosyası Formatı

Yukarıdaki promptlardan biri görev olarak verildiğinde, önce ilgili `tasks/<alan>/` klasöründe bir görev dosyası oluşturulur (yoksa), sonra `implementation.md`'deki adımlar izlenir.
