# Güvenlik Denetimi — Kontrol Listesi

- [ ] SQLi: tüm sorgular parametreli mi?
- [ ] XSS: kullanıcı girdisi çıktıya basılmadan escape ediliyor mu?
- [ ] SSRF: dış istek yapan kod allowlist kullanıyor mu?
- [ ] Kırık erişim kontrolü: yetkisiz kullanıcı korumalı endpoint'e erişemiyor mu?
- [ ] API endpoint'lerinde rate limiting var mı?
- [ ] Secrets (.env, token, şifre) repoda düz metin olarak yok mu (CLAUDE.md güvenlik kuralı)?
- [ ] Bağımlılık taraması yapıldı mı, kritik zafiyet raporlandı mı?
- [ ] Bulgular kritiklik sırasına göre listelendi mi?

## Genel BUZSU Kuralları (her zaman geçerli)

- [ ] Çıktı önce `/drafts` altına yazıldı (CLAUDE.md madde 2)
- [ ] Ürün/fiyat/sağlık iddiası abartılmadı, doğrulanabilir (CLAUDE.md madde 5)
- [ ] PII (telefon, isim, müşteri detayı) çıktıya yazılmadı (CLAUDE.md güvenlik kuralı)
- [ ] Bu modülün kapsamı dışındaki bir karar varsa ilgili agent'a görev üretildi (kendi başına karar verilmedi)
