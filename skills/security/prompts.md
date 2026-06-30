# Güvenlik Denetimi — Örnek Promptlar

Bu promptlar, ilgili agent veya orchestrator'a doğrudan görev olarak verilebilir.

1. buzsu-growth-os reposunda secrets/credential sızıntısı tara (CLAUDE.md güvenlik kuralı kapsamında).
2. İletişim formu/lead capture endpoint'inde OWASP Top 10 açısından hızlı tarama yap.
3. API endpoint'lerinin rate limiting durumunu raporla.
4. Bağımlılık dosyasında (composer.lock/package-lock) bilinen kritik zafiyet var mı kontrol et (yalnızca rapor).

## Görev Dosyası Formatı

Yukarıdaki promptlardan biri görev olarak verildiğinde, önce ilgili `tasks/<alan>/` klasöründe bir görev dosyası oluşturulur (yoksa), sonra `implementation.md`'deki adımlar izlenir.
