# Memory — Oturumlar Arası Bağlam — Kontrol Listesi

- [ ] Görev sonu raporu (JSON) ham transkript değil, özet karar/sonuç içeriyor mu?
- [ ] open_items alanı bir sonraki oturumda gerçekten takip ediliyor mu?
- [ ] PII (telefon, isim, müşteri detayı) hiçbir görev dosyasına yazılmadı mı (CLAUDE.md kuralı)?
- [ ] Yeni bir göreve başlarken ilgili `tasks/<alan>/` klasörü önce tarandı mı (sıfırdan başlamadan önce)?
- [ ] knowledge-graph/ ve tasks/ arasında çelişen/güncel olmayan bilgi var mı?

## Genel BUZSU Kuralları (her zaman geçerli)

- [ ] Çıktı önce `/drafts` altına yazıldı (CLAUDE.md madde 2)
- [ ] Ürün/fiyat/sağlık iddiası abartılmadı, doğrulanabilir (CLAUDE.md madde 5)
- [ ] PII (telefon, isim, müşteri detayı) çıktıya yazılmadı (CLAUDE.md güvenlik kuralı)
- [ ] Bu modülün kapsamı dışındaki bir karar varsa ilgili agent'a görev üretildi (kendi başına karar verilmedi)
