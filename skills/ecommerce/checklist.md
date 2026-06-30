# E-ticaret / Agentic Commerce — Kontrol Listesi

- [ ] Ürün önerisi Airtable Products tablosundaki güncel veriye mi dayanıyor?
- [ ] Fiyat/garanti/teknik spec uydurulmadı, mevcut kaynaktan mı alındı?
- [ ] TDS değeri → ürün eşleştirmesi mantığı belgelenmiş mi (neden bu ürün önerildi)?
- [ ] WhatsApp pre-fill mesajı doğru ürün/ihtiyaç bilgisini içeriyor mu?
- [ ] Kullanıcıya her adımda ne yapıldığı açıkça bildirildi mi (şeffaflık)?
- [ ] Ödeme veya kesin sipariş tamamlama girişimi YOK mu (kesin sınır)?
- [ ] Karşılaştırma tablosu objektif kriterlere dayanıyor mu (öznel pazarlama dili değil)?

## Genel BUZSU Kuralları (her zaman geçerli)

- [ ] Çıktı önce `/drafts` altına yazıldı (CLAUDE.md madde 2)
- [ ] Ürün/fiyat/sağlık iddiası abartılmadı, doğrulanabilir (CLAUDE.md madde 5)
- [ ] PII (telefon, isim, müşteri detayı) çıktıya yazılmadı (CLAUDE.md güvenlik kuralı)
- [ ] Bu modülün kapsamı dışındaki bir karar varsa ilgili agent'a görev üretildi (kendi başına karar verilmedi)
