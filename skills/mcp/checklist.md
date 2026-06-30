# MCP — Model Context Protocol Entegrasyonları — Kontrol Listesi

- [ ] Yeni önerilen MCP aracı yalnızca tek bir sorumluluğa mı sahip?
- [ ] Yazma işlemi yapan araçlar okuma araçlarından net şekilde ayrılmış mı?
- [ ] Kritik işlem (silme, production yazma) ayrı isimle mi işaretlenmiş?
- [ ] Kimlik bilgisi şema/kod içinde değil, ortam değişkeninde mi?
- [ ] Aracın açıklaması (description) LLM'in yanlış kullanmasını önleyecek kadar net mi?

## Genel BUZSU Kuralları (her zaman geçerli)

- [ ] Çıktı önce `/drafts` altına yazıldı (CLAUDE.md madde 2)
- [ ] Ürün/fiyat/sağlık iddiası abartılmadı, doğrulanabilir (CLAUDE.md madde 5)
- [ ] PII (telefon, isim, müşteri detayı) çıktıya yazılmadı (CLAUDE.md güvenlik kuralı)
- [ ] Bu modülün kapsamı dışındaki bir karar varsa ilgili agent'a görev üretildi (kendi başına karar verilmedi)
